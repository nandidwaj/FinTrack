from flask import Blueprint,request,jsonify
from flask_jwt_extended import jwt_required,get_jwt_identity
from db.database import get_db_connection
from datetime import date
from dateutil.relativedelta import relativedelta

bills_bp = Blueprint("bills",__name__)

def get_next_due_date(current_due_date,frequency):
    if frequency == "monthly":
        return current_due_date+relativedelta(months=1)
    elif frequency == "yearly":
        return current_due_date+relativedelta(years=1)
    return current_due_date

@bills_bp.route("/",methods=["POST"])
@jwt_required()
def create_bill():
    user_id = get_jwt_identity()
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute(""" insert into recurring_bills(user_id,name,amount,category_id,frequency,next_due_date,end_date) values(%s,%s,%s,%s,%s,%s,%s)""",(user_id,data['name'],data['amount'],data["category_id"],data['frequency'],data['next_due_date'],data['end_date']))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"msg":"billed added"}),201

def process_bills(user_id):
    today = date.today()
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)

    cur.execute(""" select * from recurring_bills where user_id = %s and is_active = 1 """,(user_id,))

    bills = cur.fetchall()

    for bill in bills:
        if bill['end_date'] and today>bill['end_date']:
            cur.execute(""" update recurring_bills set is_active = 0 where bill_id =%s """,(bill["bill_id"],))
            continue
        if bill["next_due_date"] <= today:
            cur.execute(""" insert into transcations(user_id,amount,type,category_id,note,transcation_date) values(%s,%s,'expense',null,%s,%s)"""
                        ,(user_id,bill["amount"],f"Recurring Bill:{bill['name']}",today))
            next_date = get_next_due_date(bill["next_due_date"],bill["frequency"])
            cur.execute(""" update recurring_bills set last_paid_date=%s,next_due_date = %s where bill_id=%s """,(bill["next_due_date"],next_date,bill['bill_id']))
    conn.commit()
    cur.close()
    conn.close()

@bills_bp.route("/",methods=["GET"])
@jwt_required()

def get_bills():
    user_id = get_jwt_identity()

    process_bills(user_id)

    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)

    cur.execute(""" select bill_id,name,amount,frequency,next_due_date,end_date,is_active from recurring_bills where user_id=%s order by next_due_date""",(user_id,))
    bills = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(bills)

@bills_bp.route("/<int:bill_id>/deactivate",methods=["POST"])
@jwt_required()
def deactivate_bill(bill_id):
    user_id = get_jwt_identity()
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute(""" update recurring_bills set is_active=0 where bill_id = %s and user_id = %s""",(bill_id,user_id))
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"msg":"Bill deactivated"})

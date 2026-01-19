from flask import Blueprint,request,jsonify
from db.database import get_db_connection
from flask_jwt_extended import jwt_required,get_jwt_identity

budgets_bp = Blueprint("budgets",__name__)

@budgets_bp.route("/",methods=["POST"])
@jwt_required()
def create_budget():
    user_id = get_jwt_identity()
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute(""" insert into budgets (user_id,category_id,amount,month,year) values (%s,%s,%s,%s,%s) """
                ,(user_id,data['category_id'],data['amount'],data['month'],data['year']))
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"msg":"Budget created"}),201
@budgets_bp.route("/",methods=["GET"])
@jwt_required()
def get_budgets():
    user_id = get_jwt_identity()
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute(""" select b.budget_id,b.amount,b.month,b.year,c.name as category 
                from budgets b join categories c on b.category_id = c.category_id 
                where b.user_id=%s """,(user_id,))
    budgets = cur.fetchall()
    cur.close()
    conn.close()

    return jsonify(budgets)
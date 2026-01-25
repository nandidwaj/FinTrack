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
    search = request.args.get("search","")
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)

    query = """ select b.budget_id,b.amount as budget_amount,b.month,b.year,c.name as category,ifnull(sum(t.amount),0) as spent  
                from budgets b join categories c on b.category_id = c.category_id left join transcations t on t.category_id=b.category_id 
                and t.user_id=b.user_id and t.type='expense' and month(t.transcation_date)=b.month and year(t.transcation_date)=b.year 
                where b.user_id=%s 
            """
    
    params = [user_id]

    if search:
        query+="and (c.name like %s or t.note like %s)"
        params.extend([f"%{search}%",f"%{search}%"])

    query+=""" group by b.budget_id,b.amount,b.month,b.year,c.name"""
    cur.execute(query,params)
    data = cur.fetchall()
    cur.close()
    conn.close()

    return jsonify(data)
from flask import Blueprint,request,jsonify
from flask_jwt_extended import jwt_required,get_jwt_identity
from db.database import get_db_connection

transaction_bp = Blueprint("transactions",__name__)

@transaction_bp.route("/",methods=["POST"])
@jwt_required()
def add_transaction():
    user_id = get_jwt_identity()
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
    insert into transcations (user_id,category_id,amount,type,note,transcation_date) values(%s,%s,%s,%s,%s,%s)"""
                ,(user_id,data.get("category_id"),data['amount'],data['type'],data.get("description"),data['transaction_date']))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"msg":"Transaction added"}),201

@transaction_bp.route("/",methods=["GET"])
@jwt_required()
def get_transaction():
    user_id = get_jwt_identity()
    search = request.args.get("search","")
    t_type = request.args.get("type","")
    from_date = request.args.get("from_date")
    to_date = request.args.get("to_date")
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)

    query = """select t.transcation_id,t.amount,t.type,t.note,t.transcation_date,c.name as category_name
                from transcations t left join categories c on t.category_id = c.category_id 
                where t.user_id=%s
            """
    params = [user_id]

    if search:
        query+="and (c.name like %s or t.note like %s)"
        params.extend([f"%{search}%",f"%{search}%"])
    if t_type:
        query+="and t.type=%s"
        params.append(t_type)
    if from_date:
        query+="and t.transcation_date>=%s"
        params.append(from_date)
    if to_date:
        query+="and t.transcation_date<=%s"
        params.append(to_date)

    query+="order by t.transcation_date desc"

    cur.execute(query,params)
    data = cur.fetchall()
    cur.close()
    conn.close()

    return jsonify(data)


from flask import Blueprint,request,jsonify
from flask_jwt_extended import jwt_required,get_jwt_identity
from db.database import get_db_connection

pots_bp = Blueprint("pots",__name__)

@pots_bp.route("/",methods=["POST"])
@jwt_required()
def create_pots():
    user_id = get_jwt_identity()
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)

    cur.execute(""" insert into pots(user_id,name,target_amount,current_amount) values(%s,%s,%s,%s)""",(user_id,data['name'],data['target_amount'],0))
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"msg":"Pot created"}),201

@pots_bp.route("/<int:pot_id>/add",methods=["POST"])
@jwt_required()
def add_to_pot(pot_id):
    user_id = get_jwt_identity()
    amount = float(request.json['amount'])
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute(""" select pot_id from pots where pot_id=%s and user_id=%s""",(pot_id,user_id))
    if not cur.fetchone():
        return jsonify({"msg":"Pot not found"}),404
    cur.execute(""" update pots set current_amount = current_amount+%s where pot_id=%s and user_id=%s """,(amount,pot_id,user_id))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"msg":"Amount added"}),200

@pots_bp.route("/",methods=["GET"])
@jwt_required()
def get_pots():
    user_id = get_jwt_identity()
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)

    cur.execute("""  select pot_id,name,target_amount,current_amount from pots where user_id = %s order by pot_id desc""",(user_id,))

    pots = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(pots)



from flask import Blueprint,request,jsonify
from flask_jwt_extended import create_access_token
from db.database import get_db_connection
from utils.auth_utils import hash_password,verify_password

auth_bp = Blueprint("auth",__name__)

@auth_bp.route("/signup",methods=["POST"])
def signup():
    data = request.get_json()
    if not data:
        return jsonify({"msg":"Data not received"}),400
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)

    cur.execute("SELECT user_id from users where email=%s",(email,))
    if cur.fetchone():
        return jsonify({"msg":"email already exists"}),400
    cur.execute(
        "INSERT INTO users (name,email,password_hash) values(%s,%s,%s)" , (name,email,hash_password(password))
    )
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"msg":"Sign Up successfull"})

@auth_bp.route("/login",methods=["POST"])
def login():
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)
    cur.execute("SELECT user_id,password_hash from users where email=%s",(data['email'],))
    user = cur.fetchone()
    cur.close()
    conn.close()

    if not user:
        return jsonify({"msg":"Invalid Username or Password"}),401
    if not verify_password(data['password'],user["password_hash"]):
        return jsonify({"msg":"invalid credentials"}),401
    token = create_access_token(identity=str(user["user_id"]))
    return jsonify({"access_token":token})
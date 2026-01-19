from flask import Flask
from flask import Blueprint,request,jsonify
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config

from routes.auth import auth_bp
from routes.transactions import transaction_bp
from routes.dashboard import dashboard_bp
from routes.budgets import budgets_bp
from routes.pots import pots_bp
from routes.bills import bills_bp
app = Flask(__name__)
app.config["JWT_SECRET_KEY"]=Config.JWT_SECRET_KEY

CORS(app,resources={r"/api/*":{"origins":"http://localhost:5173"}})
JWTManager(app)

app.register_blueprint(auth_bp,url_prefix="/api/auth")
app.register_blueprint(transaction_bp,url_prefix="/api/transactions")
app.register_blueprint(dashboard_bp,url_prefix="/api/dashboard")
app.register_blueprint(budgets_bp,url_prefix="/api/budgets")
app.register_blueprint(pots_bp,url_prefix="/api/pots")
app.register_blueprint(bills_bp,url_prefix="/api/bills")
@app.route("/")
def home():
    return jsonify({"msg":"Fintrack running successfully"})

if __name__=="__main__":
    app.run(debug=True)
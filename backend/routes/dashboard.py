from flask import Blueprint,request,jsonify
from db.database import get_db_connection
from flask_jwt_extended import jwt_required,get_jwt_identity

dashboard_bp = Blueprint("dashboard",__name__)

@dashboard_bp.route("/",methods=["GET"])
@jwt_required()
def summary():
    user_id = get_jwt_identity()
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)

    cur.execute(""" select coalesce(sum(amount),0) as income from transcations where user_id=%s and type = 'income' """,(user_id,))
    income = cur.fetchone()["income"]

    cur.execute(""" select coalesce(sum(amount),0) as expense from transcations where user_id=%s and type = 'expense' """,(user_id,))
    expense = cur.fetchone()["expense"]

    balance = income - expense

    cur.execute(""" select coalesce(sum(current_amount),0) as savings from pots where user_id=%s """,(user_id,))
    savings = cur.fetchone()['savings']

    cur.execute("""select pot_id,name,target_amount,current_amount from pots where user_id=%s order by created_at desc limit 5""",(user_id,))
    pots=cur.fetchall()

    cur.execute(""" select t.transcation_id,t.amount,t.type,t.transcation_date,t.note,c.name as category from transcations t join categories c on t.category_id=c.category_id 
                    where t.user_id = %s order by t.transcation_date desc limit 5""",(user_id,))
    transactions = cur.fetchall()

    cur.execute(""" select b.budget_id,c.name as category_name,b.amount,b.month,b.year from budgets b 
                left join categories c on b.category_id = c.category_id where b.user_id=%s order by b.year desc limit 5""",(user_id,))
    budgets = cur.fetchall()

    cur.execute(""" select b.bill_id,b.name,b.amount,c.name as category_name,b.next_due_date from recurring_bills b left join categories c on b.category_id = c.category_id where b.user_id=%s order by b.next_due_date desc limit 5""",(user_id,))
    bills = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify({
        "balance":balance,
        "income":income,
        "expense":expense,
        "savings":savings,
        "pots":pots,
        "recent_transactions":transactions,
        "budgets":budgets,
        "bills":bills
    })
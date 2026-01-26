import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/monthlybudgetscard.css";

function MonthlyBudgetsCard() {
  const [monthlyBudgets, setMonthlyBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchMonthlyBudgets();
  }, []);

  const fetchMonthlyBudgets = async () => {
    try {
      const res = await api.get("/dashboard/");
      setMonthlyBudgets(res.data.budgets || []);
      setTransactions(res.data.recent_transactions || []);
    } catch (err) {
      console.error("Failed to load budgets card", err);
    }
  };

  const calculateSpent = (budget) => {
    return transactions
      .filter((tx) => {
        if (tx.type !== "expense") return false;

        if (
          tx.category_name?.toLowerCase() !==
          budget.category_name?.toLowerCase()
        )
          return false;

        const d = new Date(tx.transaction_date);
        if (isNaN(d)) return false;

        return (
          d.getMonth() + 1 === budget.month &&
          d.getFullYear() === budget.year
        );
      })
      .reduce((sum, tx) => sum + Number(tx.amount), 0);
  };

  return (
    <div className="monthly-budgets-card">
      <div className="monthly-budgets-header">
        <h3>Monthly Budgets</h3>
        <span className="see-details">See Details →</span>
      </div>

      <div className="monthly-budgets-table">
        <div className="monthly-budgets-table-head">
          <span>Category</span>
          <span className="right">Budget</span>
          <span className="right">Spent</span>
          <span className="right">Remaining</span>
        </div>

        {monthlyBudgets.map((b) => {
          const budget = Number(b.amount);
          const spent = calculateSpent(b);
          const remaining = budget - spent;

          return (
            <div key={b.budget_id} className="monthly-budgets-table-row">
              <span className="category">{b.category_name}</span>

              <span className="right">
                ${b.budget_amount.toLocaleString()}
              </span>

              <span className="right spent">
                ${b.spent.toLocaleString()}
              </span>

              <span
                className={`right ${
                  remaining < 0 ? "negative" : "positive"
                }`}
              >
                ${b.remaining.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MonthlyBudgetsCard;
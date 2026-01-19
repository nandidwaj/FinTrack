import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";
import "../styles/budgetscard.css";

const COLORS = ["#4f9da6", "#f4a261", "#2a9d8f", "#e76f51"];

function BudgetsCard() {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const res = await api.get("/dashboard/");
      const formatted = res.data.budgets.map((b) => ({
        name: b.category_name,
        value: Number(b.amount),
      }));
      setBudgets(formatted);
    } catch (err) {
      console.error("Failed to load budgets", err);
    }
  };

  const totalUsed = budgets.reduce((sum, b) => sum + b.value, 0);

  return (
    <div className="budgets-card">
      <div className="budgets-header">
        <h3>Budgets</h3>
        <span className="see-details">See Details →</span>
      </div>

      <div className="budgets-body">
        {/* PIE CHART */}
        <div className="budget-chart">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={budgets}
                dataKey="value"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={4}
              >
                {budgets.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="budget-center">
            <h4>${totalUsed.toLocaleString()}</h4>
            <span>Used</span>
          </div>
        </div>

        {/* CATEGORY LIST */}
        <div className="budget-list">
          {budgets.map((b, i) => (
            <div key={i} className="budget-item">
              <span className="dot" style={{ background: COLORS[i % COLORS.length] }} />
              <div className="budget-info">
                <p>{b.name}</p>
                <span>${b.value.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BudgetsCard;
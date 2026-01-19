import React from "react";
import "../styles/dashboard.css";

function SummaryCards({balance,income,expenses}){
    return(
        <div className="summary-cards">
            <div className="card card-dark">
                <p className="card-label">Current Balance</p>
                <h2>${Number(balance)}</h2>
            </div>

            <div className="card">
                <p className="card-label">Income</p>
                <h2>${Number(income)}</h2>
            </div>

            <div className="card">
                <p className="card-label">Expenses</p>
                <h2>${Number(expenses)}</h2>
            </div>

        </div>
    );
}

export default SummaryCards;
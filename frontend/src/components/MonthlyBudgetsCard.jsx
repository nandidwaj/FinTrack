import React from "react";
import { useState,useEffect } from "react";
import api from "../services/api";
import "../styles/monthlybudgetscard.css";

function MonthlyBudgetsCard(){

    const[monthlybudgets,setMonthlybudgets] = useState([]);
    const[recent_transactions,setRecent_transactions] = useState([]);

    useEffect(()=>{
        fetchmonthlybudgets();
    },[]);

    const fetchmonthlybudgets = async () =>{
        try{
            const res = await api.get("/dashboard/");
            setMonthlybudgets(res.data.budgets);
            setRecent_transactions(res.data.recent_transactions);
        }catch(err){
            console.error("Failed to load budgets card",err);
        }
    };

    const calculatespent = (monthlybudgets) =>{
        
        return recent_transactions.filter((tx)=>{
            if(tx.note !== "expense") return false;
            if(tx.category?.trim().toLowerCase()!==budget.category_name?.trim().toLowerCase()) return false;

            const date = new Date(tx.transaction_date);
            if(isNaN(date.getTime())) return false;
            return(date.getMonth()+1===monthlybudgets.month && date.getFullYear()===monthlybudgets.year);
        }).reduce((sum,tx) => sum+Number(tx.amount),0);
    }

    return(
        <div className="monthlybudgets-card">
            <div className="monthly-budgets-header">
                <h3>Monthly Budgets</h3>
                <span className="see-details">See Details →</span>
            </div>
            <div className="monthly-budgets-table">
                <div className="table-head">
                    <span>Category</span>
                    <span>Budget</span>
                    <span>Spent</span>
                    <span>Remaining</span>
                </div>
                {monthlybudgets.map((b)=>{
                    const budget = Number(b.amount);
                    const spent = calculatespent(b);
                    const remaining = budget-spent;

                    return(
                        <div key={b.budget_id} className="table-row">
                            <span>{b.category_name}</span>
                            <span>${budget.toLocaleString()}</span>
                            <span>${spent.toLocaleString()}</span>
                            <span className={remaining<0?"negative":"positive"}>{remaining.toLocaleString()}</span>
                        </div>
                    );

                })}
            </div>
        </div>
    );

}

export default MonthlyBudgetsCard;
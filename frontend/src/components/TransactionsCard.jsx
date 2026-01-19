import React from "react";
import { useState,useEffect } from "react";
import api from "../services/api";
import "../styles/transacrionscard.css"

function TransactionCard(){

    const[transactions,setTransactions] = useState([]);

    useEffect(()=>{
        fetchtransactions();
    },[]);

    const fetchtransactions = async ()=>{
        try{
            const res = await api.get("/dashboard/");
            setTransactions(res.data.recent_transactions);
        }catch(err){
            console.error("Failed to load transactions card",err);
        }
    };

    const formatDate = (dateStr) =>{
        if(!dateStr) return "";
        const parsed = new Date(dateStr);
        return isNaN(parsed.getTime()) ? " " : parsed.toLocaleDateString("en-GB",{
            day:"2-digit",
            month:"short",
            year:"numeric"
        });
    };

    return(
        <div className="transactions-card">
            <div className="transaction-header">
                <h3>Transactions</h3>
                <span className="see-details">See Details →</span>
            </div>
            <div className="transaction-list">
                {transactions.map((tx)=>(
                    <div key={tx.transcation_id} className="transaction-row">
                        <div className="transaction-info">
                            <p className="transaction-name">{tx.note||tx.category}</p>
                            <span className="transaction-date">{formatDate(tx.transcation_date)}</span>
                        </div>
                        <div className={`transaction_amount${tx.type==="income" ? "income" : "expense"}`}>
                            {tx.type==="income" ? "+" : "-" }${Number(tx.amount).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TransactionCard;
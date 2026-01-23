import React, { useState,useEffect } from "react";
import "../styles/dashboard.css";
import "../components/Sidebar"
import Sidebar from "../components/Sidebar";
import SummaryCards from "../components/SummaryCards";
import api from "../services/api"
import PotsCard from "../components/PotsCard";
import TransactionCard from "../components/TransactionsCard";
import BudgetsCard from "../components/BudgetsPieCard";
import MonthlyBudgetsCard from "../components/MonthlyBudgetsCard";
function Dashboard(){

    const[balance,setBalance] = useState(0);
    const[income,setIncome] = useState(0);
    const[expenses,setExpenses] = useState(0);

    useEffect(()=>{
        const fetchSummary = async()=>{
            try{
                const res=await api.get("/dashboard/");
                setBalance(res.data.balance);
                setIncome(res.data.income);
                setExpenses(res.data.expense);
            }catch(err){
                console.error("Failed to load dashboard summary",err)
            }
        };
        fetchSummary();
    },[]);

    return(
        <div className="dashboard-layout">
        <Sidebar/>
        <div className="dashboard-content">
            <h1 className="dashboard-title">Dashboard</h1>
            <SummaryCards balance={balance}
                          income={income}
                          expenses={expenses}
            />
            <div className="dashboard-grid">
                <div className="dashboard-left">
                    <div className="pots"><PotsCard/></div>
                    <TransactionCard/>
                </div>
                <div className="dashboard-right">
                    <BudgetsCard/>
                    <MonthlyBudgetsCard/>
                </div>
            </div>
            
        </div>
        </div>
    );
}

export default Dashboard;
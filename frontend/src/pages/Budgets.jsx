import Sidebar from "../components/Sidebar";
import AddButton from "../components/AddButton";
import SearchBar from "../components/SearchBar";
import Modal from "../button/Modal"
import "../styles/budgets.css"
import api from "../services/api";
import { useEffect, useState } from "react";
import AddBudgetForm from "../modal/forms/AddBudgetForm";
function Budgets(){

    const[budgets,setBudgets] = useState([]);
    const[open,setOpen] = useState(false);

    const fetchBudgets = async (filters={}) =>{
        try{
            const res = await api.get("/budgets/",{params:{
                    search:filters.query || "",
                    type:filters.type || "",
                    from_date:filters.fromDate || "",
                    to_date:filters.toDate || "",
                }
            });

            setBudgets(res.data);
        }catch(err){
            console.error("Failed to load Budgets",err);
        }
    }

    useEffect(()=>{
        fetchBudgets();
    },[]);

    return(
        <div className="budgets-layout">
            <Sidebar/>
            <div className="budgets-content">
                <div className="transactions-header">
                    <h1 className="transactions-title">Budgets</h1>
                    <div className="transactions-actions">
                        <SearchBar placeholder="Search Budgets" onSearch={fetchBudgets}/>
                    </div>
                    <AddButton label="Add Budget" onClick={()=>setOpen(true)}/>
                </div>
            <div className="budgets-table">
                <div className="budgets-header">
                    <span>Category</span>
                    <span>Budget</span>
                    <span>Spent</span>
                    <span>Remaining</span>
                </div>
                {budgets.map((bg)=>(
                    
                    <div key={bg.budget_id} className="budget-row">
                        <span>{bg.category}</span>
                        <span>{bg.budget_amount}</span>
                        <span>{bg.spent}</span>
                        <span>{Number(bg.budget_amount)-Number(bg.spent)}</span>
                    </div>
                ))}
                <Modal isOpen={open} onClose={()=>setOpen(false)}>
                    <AddBudgetForm onSuccess={fetchBudgets} onClose={()=>setOpen(false)}/>
                </Modal>
            </div>
        </div>
    </div>
    );
}

export default Budgets



import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/transactions.css"
import api from "../services/api"
import AddTransactionModal from "../components/AddTransactionModal";
import SearchBar from "../components/SearchBar";

function Transactions(){

    const[transactions,setTransactions] = useState([]);
    const[showModal,setShowModal] = useState(false);


    useEffect(()=>{
        fetchTransactions();
    },[]);

const fetchTransactions = async(filters={}) =>{
        try{
            const res = await api.get("/transactions/",{
                params:{
                    search:filters.query || "",
                    type:filters.type || "",
                    from_date:filters.fromDate || "",
                    to_date:filters.toDate || "",
                }
            });
            setTransactions(res.data);
        }catch(err){
            console.error("Failed to load transactions",err);
        }
    };

    const formatDate = (dateStr) =>{
        const d = new Date(dateStr);
        return isNaN(d)? " " : d.toLocaleDateString("en-GB");
    };

    return(
        <div className="transactions-layout">
            <Sidebar/>
            <div className="dashboard-content">
                <div className="transactions-header">
                    <h1 className="transactions-title">Transactions</h1>
                    <div className="transactions-actions">
                        <SearchBar placeholder="Search Transactions" onSearch={fetchTransactions}/>
                    </div>
                    <button className="add-btn" onClick={()=>setShowModal(true)}>+ Add Transaction</button>
                </div>
                <div className="transactions-table">
                    <div className="table-header">
                        <span>Date</span>
                        <span>Category</span>
                        <span>Note</span>
                        <span>Amount</span>
                    </div>
                    {transactions.map((tx)=>(
                        <div key={tx.transcation_id} className="table-row">
                            <span>{formatDate(tx.transcation_date)}</span>
                            <span>{tx.category_name}</span>
                            <span>{tx.note || "-"}</span>
                            <span className={tx.type === "income"?"income":"expense"}>{tx.type==="income"?"+":"-"}${Number(tx.amount).toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>
            {showModal && (<AddTransactionModal onClose={()=>setShowModal(false)} onSuccess={fetchTransactions}/>)}
        </div>
    );
}

export default Transactions
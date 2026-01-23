import { useState } from "react";
import api from "../services/api";
import "../styles/addtransactions.css"

function AddTransactionModal({onClose,onSuccess}){
    const [form,setForm] = useState({
        amount:"",
        type:"expense",
        category_id:"",
        note:"",
        transaction_date:new Date().toISOString().split("T")[0],
    });

    const handleChange = (e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const payload ={
            amount:form.amount,
            category_id:form.category_id,
            note:form.note,
            type:form.type,
            transaction_date:form.transaction_date
        }

        try{
            await api.post("/transactions/",payload);
            onSuccess();
            onClose();
        }catch(err){
            console.error("Failed to add transaction",err);
        }
    };

    return(
        <div className="modal-overlay">
            <div className="modal">
                <h3>Add Transactions</h3>
                <form onSubmit={handleSubmit}>
                    <input type="number" name="amount" placeholder="Amount" onChange={handleChange} required/>
                    <select name="type" onChange={handleChange}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                    <input name="category_id" placeholder="Category ID" onChange={handleChange} required/>
                    <input type="date" name="transcation_date" onChange={handleChange} required/>
                    <div className="modal-actions">
                        <button type="submit">Add</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTransactionModal;
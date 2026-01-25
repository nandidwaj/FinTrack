import { useState } from "react";
import api from "../../services/api";

function AddBudgetForm({onSuccess,onClose}){
    const[amount,setAmount] = useState("");
    const[categoryId,setCategoryId] = useState("");
    const[month,setMonth] = useState("");
    const[year,setYear] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const payload={
            category_id :categoryId,
            amount:amount,
            month:month,
            year:year
        };

        await api.post("/budgets/",payload);
        onSuccess();
        onClose();
    }

    return(
        <form onSubmit={handleSubmit}>
            <h3>Add Budget</h3>
            <input placeholder="Category ID" value={categoryId} onChange={(e)=>setCategoryId(e.target.value)} required/>
            <input placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)} required/>
            <input placeholder="Month" value={month} onChange={(e)=>setMonth(e.target.value)} required/>
            <input placeholder="Year" value={year} onChange={(e)=>setYear(e.target.value)} required/>
            <button type="submit">Save</button>
        </form>
    );
}

export default AddBudgetForm;
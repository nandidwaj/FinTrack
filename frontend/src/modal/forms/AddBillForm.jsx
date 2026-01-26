import { useState } from "react";
import api from "../../services/api";
import "../../styles/addform.css";


function AddBillForm({onSuccess,onClose}){
    const[amount,setAmount] = useState("");
    const[categoryId,setCategoryId] = useState("");
    const[name,setName] = useState("");
    const[frequency,setFrequency] = useState("");
    const[nextDueDate,setNextDueDate] = useState("");
    const[endDate,setEndDate] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const payload={
            category_id :categoryId,
            amount:amount,
            name:name,
            frequency:frequency,
            next_due_date:nextDueDate,
            end_date:endDate
        };

        await api.post("/bills/",payload);
        onSuccess();
        onClose();
    }

    return(
        <form className="add-budget-form" onSubmit={handleSubmit}>
            <h3>Add Budget</h3>
            <input placeholder="Bill Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
            <input placeholder="Category ID" value={categoryId} onChange={(e)=>setCategoryId(e.target.value)} required/>
            <input placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)} required/>
            <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                required
                >
                <option value="" disabled>Select Frequency</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>
            <input type="date" name="nextDueDate" placeholder="Next Due Date" onChange={(e)=>setNextDueDate(e.target.value)} required/>
            <input type="date" name="endDate" placeholder="End Date" onChange={(e)=>setEndDate(e.target.value)} required/>
            <div className="add-budget-actions">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            </div>
        </form>
    );
}

export default AddBillForm;
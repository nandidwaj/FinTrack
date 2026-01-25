import { useState } from "react";
import api from "../../services/api";
import "../../styles/addform.css";


function AddPotForm({onSuccess,onClose}){
    const[name,setName] = useState("");
    const[camount,setCamount] = useState("");
    const[tamount,setTamount] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const payload ={
            name:name,
            current_amount:camount,
            target_amount:tamount
        }

        await api.post("/pots/",payload);
        onSuccess();
        onClose();
    };

    return(
        <form className="add-budget-form" onSubmit={handleSubmit}>
            <h3>Add Pots</h3>
            <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
            <input placeholder="Current Amount" value={camount} onChange={(e)=>setCamount(e.target.value)} required/>
            <input placeholder="Target Amount" value={tamount} onChange={(e)=>setTamount(e.target.value)} required/>
            <div className="add-budget-actions">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            </div>
        </form>
    );
}

export default AddPotForm;
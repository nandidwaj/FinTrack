import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import api from "../services/api";
function Signup(){
    
    const navigate = useNavigate();
    const [form,setForm] = useState({
        name:"",
        email:"",
        password:""
    });
    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value});
    };
    const handleSignup = async(e)=>{
       e.preventDefault();
       try{
        const payload={
            name:form.name,
            email:form.email,
            password:form.password
        };
        console.log("Sending data:",payload)
            await api.post("/auth/signup",payload);
        alert ("Signup successfull. Please login");
        navigate("/login");
       }catch(err){
        alert(err.response?.data?.msg || "Signup failed");
       }
    };
    return(
        <div className="auth-page">
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="brand">Fintrack</h2>
            <h2>Create an Account</h2>
            <form>
                <input name = "name" placeholder="Full Name" onChange={handleChange} required/>
                <input name = "email" type="email" placeholder="Email" onChange={handleChange} required/>
                <input name = "password" type="password" placeholder="Password" onChange={handleChange} required/>
                <button type="submit" className="primary-btn" onClick={handleSignup}>Sign Up</button>
                <p className="divider">or</p>
                <button className="oauth-btn google">Continue with Google</button>
                <button className="oauth-btn facebook">Continue with Facebook</button>
            </form>
            <p className="switch-text">Already have an account?{" "}<span className="login" onClick={()=>navigate("/login")}>Login</span></p>
            </div>
        </div>
        </div>
    );
}

export default Signup
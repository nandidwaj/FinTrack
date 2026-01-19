import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Signup from "./Signup";
import "../styles/login.css"

function Login(){
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError] = useState("");

    const navigate = useNavigate();
    const handleLogin = async(e) =>{
        e.preventDefault();
        setError("");

        try{
            const res = await api.post("/auth/login",{
                email,
                password,
            });
            localStorage.setItem("token",res.data.access_token);
            navigate("/dashboard");
        }catch(err){
            setError("Invalid email or password");
        }
    };

    return(
        <div className="auth-page">
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="brand">Fintrack</h2>
                <h3>Welcome Back</h3>
                <p className="subtitle">Login to your Account</p>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    <button type="submit">Login</button>
                    <p className="divider">or</p>
                    <button className="oauth-btn google">Continue with Google</button>
                    <button className="oauth-btn facebook">Continue with Facebook</button>
                </form>
                <p className="link-text">Don't have an account? <span className="login" onClick={()=>navigate("/signup")}>Sign up</span></p>
            </div>
        </div>
        </div>
    );

}

export default Login;
import { useNavigate } from 'react-router-dom';
import "../styles/dashboard.css"

function Sidebar(){
    const navigate = useNavigate();
    return(
        <>
        <aside className='sidebar'>
            <h2 className='logo'>Fintrack</h2>
            <nav>
                <a className='active' onClick={()=>navigate("/dashboard")}>Dashboard</a>
                <a onClick={()=>navigate("/transactions")}>Transactions</a>
                <a onClick={()=>navigate("/budgets")}>Budgets</a>
                <a onClick={()=>navigate("/pots")}>Pots</a>
                <a onClick={()=>navigate("/bills")}>Bills</a>
            </nav>
            <button className='logout'>Log out</button>
        </aside>
        </>
    );
}

export default Sidebar;
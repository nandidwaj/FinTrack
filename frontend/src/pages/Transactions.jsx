import Sidebar from "../components/Sidebar";
import "../styles/transactions.css"
function Transactions(){
    return(
        <div className="transactions-layout">
        <Sidebar/>
        <div className="dashboard-content">
            {/* cards will come here */}
        </div>
        </div>
    );
}

export default Transactions
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AddPotForm from "../modal/forms/AddPotForm";
import AddButton from "../components/AddButton";
import Modal from "../button/Modal";
import "../styles/pots.css";
import api from "../services/api";

function Pots() {
    const [pots, setPots] = useState([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [activePot, setActivePot] = useState(null);
    const [amount, setAmount] = useState("");

    const fetchPots = async (query = "") => {
        try {
            const res = await api.get("/pots/", {
                params: { search: query }
            });
            setPots(res.data);
        } catch (err) {
            console.error("Failed to load Pots", err);
        }
    };

    useEffect(() => {
        fetchPots();
    }, []);

    const handleSearch = () => {
        fetchPots(search);
    };

    const handleAddAmount = async () => {
        try {
            await api.post(`/pots/${activePot}/add`, {
                amount: amount
            });
            setAmount("");
            setActivePot(null);
            fetchPots();
        } catch (err) {
            console.error("Failed to update pot amount", err);
        }
    };

    return (
        <div className="pots-layout">
            <Sidebar />

            <div className="pots-content">
                <div className="pots-header">
                    <h1 className="pots-title">Pots</h1>

                    <div className="pots-search">
                        <input
                            type="text"
                            placeholder="Search Pots..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>

                    <AddButton label="Add Pot" onClick={() => setOpen(true)} />
                </div>

                <div className="pots-table">
                    <div className="pots-table-header">
                        <span>Name</span>
                        <span>Current Amount</span>
                        <span>Target Amount</span>
                        <span></span>
                    </div>

                    {pots.map((p) => (
                        <div key={p.pot_id} className="pots-row">
                            <span>{p.name}</span>
                            <span>${Number(p.current_amount).toLocaleString()}</span>
                            <span>${Number(p.target_amount).toLocaleString()}</span>

                            <button
                                className="add-amount-btn"
                                onClick={() => setActivePot(p.pot_id)}
                            >
                                + Add
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Pot Modal */}
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <AddPotForm onSuccess={fetchPots} onClose={() => setOpen(false)} />
            </Modal>

            {/* Add Amount Modal */}
            <Modal isOpen={!!activePot} onClose={() => setActivePot(null)}>
                <div className="add-amount-form">
                    <h3>Add Amount</h3>

                    <input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <div className="add-amount-actions">
                        <button className="save-btn" onClick={handleAddAmount}>
                            Save
                        </button>
                        <button
                            className="cancel-btn"
                            onClick={() => setActivePot(null)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Pots;
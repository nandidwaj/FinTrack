import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "../styles/bills.css";
import AddButton from "../components/AddButton";
import Modal from "../button/Modal";
import AddBillForm from "../modal/forms/AddBillForm";

function Bills() {
  const [bills, setBills] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchbills = async (filters = {}) => {
    try {
      const res = await api.get("/bills/", {
        params: {
          search: filters.query || "",
          frequency: filters.frequency || "",
          due_date: filters.fromDate || "",
          end_date: filters.toDate || "",
        },
      });
      setBills(res.data);
    } catch (err) {
      console.log("Failed to load Bills", err);
    }
  };

  useEffect(() => {
    fetchbills();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return isNaN(d) ? "-" : d.toLocaleDateString("en-GB");
  };

  const handleDeactivate = async (billId) => {
    try {
      await api.post(`/bills/${billId}/deactivate`);
      fetchbills(); // refresh list
    } catch (err) {
      console.error("Failed to deactivate bill", err);
    }
  };

  return (
    <div className="bills-layout">
      <Sidebar />
      <div className="bills-content">
        <div className="bills-header">
          <h1 className="bills-title">Bills</h1>
          <div className="bills-actions">
            <SearchBar placeholder="Search Bills..." onSearch={fetchbills} />
          </div>
          <AddButton label="Add Bill" onClick={() => setOpen(true)} />
        </div>

        <div className="bills-table">
          <div className="table-header">
            <span>Name</span>
            <span>Amount</span>
            <span>Next Due Date</span>
            <span>End Date</span>
            <span>Frequency</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {bills.map((b) => (
            <div key={b.bill_id} className="table-row">
              <span>{b.name}</span>
              <span>₹{Number(b.amount).toLocaleString()}</span>
              <span>{formatDate(b.next_due_date)}</span>
              <span>{formatDate(b.end_date)}</span>
              <span>{b.frequency}</span>
              <span className={b.is_active ? "status-active" : "status-inactive"}>
                {b.is_active ? "Active" : "Inactive"}
              </span>
              <span>
                <button
                  className="deactivate-btn"
                  disabled={!b.is_active}
                  onClick={() => handleDeactivate(b.bill_id)}
                >
                  Deactivate
                </button>
              </span>
            </div>
          ))}

          <Modal isOpen={open} onClose={() => setOpen(false)}>
            <AddBillForm
              onSuccess={() => {
                fetchbills();
                setOpen(false);
              }}
              onClose={() => setOpen(false)}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Bills;
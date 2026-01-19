import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/potsCard.css";

function PotsCard() {
  const [pots, setPots] = useState([]);

  useEffect(() => {
    fetchPots();
  }, []);

  const fetchPots = async () => {
    try {
      const res = await api.get("/dashboard/");
      setPots(res.data.pots);
    } catch (err) {
      console.error("Failed to load pots", err);
    }
  };

  const totalSaved = pots.reduce(
    (sum, pot) => sum + Number(pot.current_amount),
    0
  );

  return (
    <div className="pots-card">
      <div className="pots-header">
        <h3>Pots</h3>
        <span className="see-details">See Details →</span>
      </div>
      <div className="pots-total">
        <div className="pots-icon">💰</div>
        <div>
          <p>Total Saved</p>
          <h2>${totalSaved.toLocaleString()}</h2>
        </div>
      </div>
      <div className="pots-list">
        {pots.slice(0, 3).map((pot) => {
          const percent =
            (Number(pot.current_amount) / Number(pot.target_amount)) * 100;

          return (
            <div className="pot-row" key={pot.pot_id}>
              <div className="pot-info">
                <span>{pot.name}</span>
                <small>
                  ${pot.current_amount} of ${pot.target_amount}
                </small>
              </div>

              <div className="pot-bar">
                <div
                  className="pot-bar-fill"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PotsCard;

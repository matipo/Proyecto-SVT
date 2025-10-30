import { useState } from "react";

export default function PurchaseTickets() {
  const [count, setCount] = useState(1);

  const [ticketType, setTicketType] = useState("general");

  const handleIncrease = () => {
    if (count < 10) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <div>
      <h2>Purchase Tickets</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="ticket">Ticket Type</label>
        <select
          id="ticket"
          name="ticket"
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value)}
        >
          <option value="general">General</option>
          <option value="vip">VIP</option>
        </select>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button onClick={handleDecrease}>-</button>
        <p style={{ margin: 0 }}>{count}</p>
        <button onClick={handleIncrease}>+</button>
      </div>
    </div>
  );
}

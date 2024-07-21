import React, { useState } from 'react';
import './PerformanceForm.css';  // Ensure to import the CSS file for styling

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const PerformanceForm = ({ addPerformance, item }) => {
  const [month, setMonth] = useState(months[0]);
  const [amount, setAmount] = useState('');
  const [target, setTarget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addPerformance(item, { month, amount, target });
    setMonth(months[0]);
    setAmount('');
    setTarget('');
  };

  return (
    <form onSubmit={handleSubmit} className="performance-form">
      <div className="form-row">
        <div className="form-group">
          <label>Month:</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)} required>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Target:</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PerformanceForm;


import React, { useState, useEffect } from "react";
import PerformanceForm from "./components/PerformanceForm";
import PerformanceTable from "./components/PerformanceTable";
import PerformanceChart from "./components/PerformanceChart";
import "./App.css";

function App() {
  const [data, setData] = useState({ assets: [], liabilities: [], profitability: [] });
  const [currentItem, setCurrentItem] = useState("assets");

  useEffect(() => {
    fetchData(currentItem);
  }, [currentItem]);

  const fetchData = async (item) => {
    const response = await fetch(`http://localhost:5000/api/performance/${item}`);
    const result = await response.json();
    setData((prevData) => ({ ...prevData, [item]: result }));
  };

  const addPerformance = async (item, performance) => {
    await fetch(`http://localhost:5000/api/performance/${item}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(performance),
    });
    fetchData(item);
  };

  const deletePerformance = async (item, id) => {
    await fetch(`http://localhost:5000/api/performance/${item}/${id}`, {
      method: "DELETE",
    });
    fetchData(item);
  };

  return (
    <div className="App">
      <h1>Naalya Performance Tracker</h1>
      <div className="form-container">
        <label>
          Select Item:
          <select value={currentItem} onChange={(e) => setCurrentItem(e.target.value)}>
            <option value="assets">Assets</option>
            <option value="liabilities">Liabilities</option>
            <option value="profitability">Profitability</option>
          </select>
        </label>
        <PerformanceForm addPerformance={addPerformance} item={currentItem} />
      </div>
      <div className="table-container">
        <PerformanceTable data={data[currentItem]} deletePerformance={deletePerformance} item={currentItem} />
      </div>
      <div className="chart-container">
        <PerformanceChart data={data[currentItem]} item={currentItem} />
      </div>
    </div>
  );
}

export default App;


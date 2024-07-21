import React from "react";

function PerformanceTable({ data, deletePerformance, item }) {
  return (
    <table className="performance-table">
      <thead>
        <tr>
          <th>Month</th>
          <th>Amount</th>
          <th>Target</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.month}</td>
            <td>{row.amount}</td>
            <td>{row.target}</td>
            <td>
              <button onClick={() => deletePerformance(item, row.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PerformanceTable;


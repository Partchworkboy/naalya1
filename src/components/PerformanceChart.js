import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

function PerformanceChart({ data, item }) {
  const chartData = {
    labels: data.map((row) => row.month),
    datasets: [
      {
        label: `Amount (${item})`,
        data: data.map((row) => row.amount),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: `Target (${item})`,
        data: data.map((row) => row.target),
        borderColor: "rgba(255,99,132,1)",
        fill: false,
      },
    ],
  };

  return (
    <div className="performance-chart">
      <Line data={chartData} />
    </div>
  );
}

export default PerformanceChart;


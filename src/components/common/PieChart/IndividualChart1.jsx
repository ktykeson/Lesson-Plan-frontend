import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IndividualChart1 = ({ data }) => {
  const chartData = {
    labels: ["Klas", "Levi"],
    datasets: [
      {
        label: "Correct",
        data: [data.classCorrect, data.individualCorrect],
        backgroundColor: "#4c9aff",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Gemaakt",
        data: [data.classMade, data.individualMade],
        backgroundColor: "#82ca9d",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default IndividualChart1;

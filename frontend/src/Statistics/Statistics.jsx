import React, { useContext, useEffect } from "react";
import { ListContext } from "../Context/ListContext";
import { ScoreContext } from "../Context/ScoreContext";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./Statistics.css";
import ThemeToggle from "../Reuseable/ThemeToggle";

Chart.register(ChartDataLabels);
// Component for displaying statistics to users using doughnut chart
function Statistics() {
  const { list } = useContext(ListContext); // Get list for display
  const { storedScore, updateStoredScore } = useContext(ScoreContext); // Get score to display
  const seen = list.filter((item) => item.status === "seen");
  const learned = list.filter((item) => item.status === "learned");
  const mastered = list.filter((item) => item.status === "mastered");
  const left = 1001 - (seen.length + learned.length + mastered.length); //Unseen
  const percentage =
    storedScore.wordsTested === 0
      ? "0"
      : ((storedScore.wordsCorrect / storedScore.wordsTested) * 100).toFixed(0); // Overall score across all tests

  const data = {
    labels: [
      "Words you haven't seen",
      "Words You're Learning",
      "Words You've Learned",
      "Words You've Mastered",
    ],

    datasets: [
      {
        label: "Word Stats",
        data: [left, seen.length, learned.length, mastered.length],
        backgroundColor: [
          "rgba(192, 115, 115, 1)", 
          "rgba(130, 205, 228, 1)", 
          "rgba(249, 220, 118, 1)", 
          "rgba(145, 241, 143, 1)", 
        ],
        borderColor: [
          "rgba(192, 115, 115, 1)", 
          "rgba(130, 205, 228, 1)", 
          "rgba(249, 220, 118, 1)", 
          "rgba(145, 241, 143, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = { 
    // Chart options
    plugins: {
      datalabels: {
        font: {
          size: 20, 
          family: "Raleway", 
          weight: "400",
        },
        formatter: (value, context) => {
          return value > 10 ? value : null;
        },
        display: (context) => {
          return context.dataset.data[context.dataIndex] !== 0;
        },
      },
      tooltip: {
        enabled: false, 
      },
      legend: {
        position: "bottom",
        display: true,
        labels: {
          font: {
            size: 20,
            family: "Raleway", 
          },
          boxWidth: 20, 
          padding: 20,
        },
      },
    },
    interaction: {
      mode: "point",
      intersect: false,
    },
    hover: {
      mode: null, 
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  
  return (
    <div className="stats-container">
      <ThemeToggle />
      <h1>Your Stats</h1>
      <div className="score-container">
        <div>
          <p>Tests Taken </p>
          <p style={{textAlign:"center"}}>{storedScore.tests}</p>
        </div>
        <p>|</p>
        <div>
          <p>Overall Score</p>
          <p style={{textAlign:"center"}}>{percentage}%</p>
        </div>
      </div>
      <div className="chart-container">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

export default Statistics;
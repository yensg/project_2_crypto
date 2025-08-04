import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { lineChartData } from "./dataset";

const LineGraph = (props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "BTCUSD Price Trend",
        font: {
          size: 18,
        },
      },
    },
  };
  //   const data = {};

  return <Line options={options} data={props.formattedData} />;
};
export default LineGraph;

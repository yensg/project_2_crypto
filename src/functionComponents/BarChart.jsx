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
import { barChartData } from "../featureComponents/dataset";
const BarChart = () => {
  const options = {};
  return <Bar options={options} data={barChartData} />;
};

export default BarChart;

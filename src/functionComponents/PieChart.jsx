import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

import { pieChartData } from "../featureComponents/dataset";

const PieChart = () => {
  const options = {};
  return <Pie options={options} data={pieChartData} />;
};

export default PieChart;

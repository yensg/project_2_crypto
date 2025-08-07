import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { use } from "react";
import LineGraph from "../functionComponents/LineGraph";
// import BarChart from "../functionComponents/BarChart";
// import PieChart from "../functionComponents/PieChart";

const DisplayGraph = (props) => {
  const queryClient = useQueryClient();
  const [formattedData, setFormattedData] = useState({
    labels: [],

    datasets: [
      {
        label: "Historical Price Trend",
        data: [],
        borderColor: "rgb(75,192,192)",
        tension: 0.4, // smooths the line
      },
    ],
  });

  const getCandles = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER +
        "/v2/candles/" +
        props.selectedPairToGraph +
        "/1day"
    );
    if (!res.ok) {
      throw new Error("error getting data");
    }

    return await res.json();
  };
  const query = useQuery({
    queryKey: ["candles", props.selectedPairToGraph],
    queryFn: getCandles,
    initialData: [],
  });

  // const formatted = query.data.map((candle) => ({
  //   time: new Date(candle[0]).toLocaleString(), // or use .toISOString()
  //   open: candle[1],
  //   high: candle[2],
  //   low: candle[3],
  //   close: candle[4],
  //   volume: candle[5],
  // }));
  // console.table(formatted);

  const sortData = () => {
    if (query.isSuccess) {
      const unsortedData = query.data.sort((candle) => {
        return candle;
      });

      const sortedData = unsortedData.sort((a, b) => {
        return a[0] - b[0];
      });

      const formattedData = sortedData.map((candle) => {
        return candle[4];
      });

      const formattedLabels = sortedData.map((candle) =>
        new Date(candle[0]).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      );

      return [formattedLabels, formattedData];
    } else {
      return [];
    }
  };
  useEffect(() => {
    // const labels = sortLabels();
    // const data = sortData();

    const [labels, data] = sortData();

    const temp = {
      labels: labels,

      datasets: [
        {
          label: "Historical Price Trend",
          data: data,
          borderColor: "#466D5B",
          tension: 0.4, // smooths the line
        },
      ],
    };

    setFormattedData(temp);
  }, [query.data]);

  return (
    <>
      <div className="container d-flex">
        {
          <LineGraph
            selectedPairToGraph={props.selectedPairToGraph}
            formattedData={formattedData}
          />
        }
      </div>
    </>
  );
};

export default DisplayGraph;

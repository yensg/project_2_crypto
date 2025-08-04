import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { use } from "react";
import LineGraph from "../functionComponents/LineGraph";
import BarChart from "../functionComponents/BarChart";
import PieChart from "../functionComponents/PieChart";

const DisplayGraph = () => {
  const queryClient = useQueryClient();
  const [candles, setCandles] = useState([]);

  const getCandles = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/v2/candles/BTCUSD/1day"
    );
    if (!res.ok) {
      throw new Error("error getting data");
    }
    return await res.json();
  };
  const query = useQuery({
    queryKey: ["candles"],
    queryFn: getCandles,
  });
  useEffect(() => {
    if (query.isSuccess) {
      setCandles(query.data);
    }
  }, [query.data, query.isSuccess]);

  //   const formatted = candles.map((candle) => ({
  //     time: new Date(candle[0]).toLocaleString(), // or use .toISOString()
  //     open: candle[1],
  //     high: candle[2],
  //     low: candle[3],
  //     close: candle[4],
  //     volume: candle[5],
  //   }));

  const unsortedLabels = candles.map((candle) => {
    return new Date(candle[0]).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  });
  const labels = unsortedLabels.sort((a, b) => {
    return a - b;
  });

  const unsortedData = candles.map((candle) => {
    return candle[4];
  });

  const data = unsortedData.sort((a, b) => {
    return a - b;
  });

  const formattedData = {
    labels: labels,

    datasets: [
      {
        label: "Historical Price Trend",
        data: data,
        borderColor: "rgb(75,192,192)",
        tension: 0.4, // smooths the line
      },
    ],
  };

  return (
    <>
      <div className="container d-flex flex-wrap">
        <LineGraph formattedData={formattedData} />
        <BarChart />
        <PieChart />
      </div>
    </>
  );
};

export default DisplayGraph;

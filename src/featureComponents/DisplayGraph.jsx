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

  //   const formatted = candles.map((candle) => ({
  //     time: new Date(candle[0]).toLocaleString(), // or use .toISOString()
  //     open: candle[1],
  //     high: candle[2],
  //     low: candle[3],
  //     close: candle[4],
  //     volume: candle[5],
  //   }));

  // const sortLabels = () => {
  //   if (query.isSuccess) {
  //     const unsortedLabels = query.data.map((candle) => {
  //       return new Date(candle[0]).toLocaleDateString("en-GB", {
  //         day: "numeric",
  //         month: "short",
  //         year: "numeric",
  //       });
  //     });

  //     const labels = unsortedLabels.sort((a, b) => {
  //       return a - b;
  //     });

  //     return labels;
  //   } else {
  //     return [];
  //   }
  // };

  const sortLabels = () => {
    if (query.isSuccess) {
      const unsortedLabels = query.data.map((candle) => {
        return candle[0];
      });
      // console.table(unsortedLabels);
      const sortedlabels = unsortedLabels.sort((a, b) => {
        return a - b;
      });
      // console.table(sortedlabels);
      const formattedlabels = sortedlabels.map((timestamp) =>
        new Date(timestamp).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      );
      console.table(formattedlabels[326]);
      return formattedlabels;
    } else {
      return [];
    }
  };

  const sortData = () => {
    if (query.isSuccess) {
      const unsortedData = query.data.map((candle) => {
        return candle[4];
      });

      const data = unsortedData.sort((a, b) => {
        return a - b;
      });
      console.table(data[326]);
      return data;
    } else {
      return [];
    }
  };

  useEffect(() => {
    const labels = sortLabels();
    const data = sortData();

    const temp = {
      labels: labels,

      datasets: [
        {
          label: "Historical Price Trend",
          data: data,
          borderColor: "#4c7766",
          tension: 0.4, // smooths the line
        },
      ],
    };

    setFormattedData(temp);
  }, [query.data]);

  return (
    <>
      <div className="container d-flex flex-wrap">
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

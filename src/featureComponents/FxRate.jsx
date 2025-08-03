import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const FxRate = () => {
  const queryClient = useQueryClient();
  const [symbol, setSymbol] = useState();
  const getData = async () => {
    const res = await fetch("https://api.gemini.com/v1/symbols");
    if (!res.ok) {
      throw new Error("error getting data");
    }
    return await res.json();
  };

  const query = useQuery({
    queryKey: ["symbols"],
    queryFn: getData,
  });

  useEffect(() => {
    if (query.isSuccess) {
      setSymbol(query.data);
    }
  }, [query.isSuccess, query.data]);

  return (
    <div>
      <div>Hello</div>
      {JSON.stringify(symbol)}
      {/* {symbol.map((symbol, idx) => {
        return <div key={idx}>{symbol}</div>;
      })} */}
    </div>
  );
};

export default FxRate;

//   const now = Date.now();
//     const specificTime = new Date("2023-10-01T00:00:00Z").getTime();
//   const specificTime = 1696118400000;
//   const queryClient = useQueryClient();
//   const getData = async () => {
//     const res = await fetch(
//       `https://api.gemini.com/v2/fxrate/sgdusd/${specificTime}`
//     );
//     if (!res.ok) {
//       throw new Error("error getting data");
//     }
//     return await res.json();
//   };

//   const query = useQuery({
//     queryKey: ["symbols", specificTime],
//     queryFn: getData,
//   });

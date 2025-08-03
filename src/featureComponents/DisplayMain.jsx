import React, { useContext, useEffect, useState } from "react";
import Input from "../functionComponents/Input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DisplayCoin from "./DisplayCoin";
import BootstrapContext from "../context/bootstrap-context";
import "../main.css";
import DisplayCoinSum from "./DisplayCoinSum";

const DisplayMain = () => {
  const { blue, green, red, orange, lightblue, white } =
    useContext(BootstrapContext);
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [coinData, setCoinData] = useState([]);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [displayCoinSum, setDisplayCoinSum] = useState([]);

  const updateSearch = (event) => {
    setSearch(event.target.value);
  };

  const clickSearch = () => {
    const result = coinData.filter((item) => {
      return item.pair.toLowerCase().includes(search.toLowerCase());
    });
    setDisplayCoin(result);
    setSearch("");
  };

  const getCoinData = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/v1/pricefeed");
    if (!res.ok) {
      throw new Error("error getting data");
    }
    return await res.json();
  };

  const query = useQuery({
    queryKey: ["coins"],
    queryFn: getCoinData,
  });

  useEffect(() => {
    if (query.isSuccess) {
      setCoinData(query.data);
      setDisplayCoin(query.data);
    }
  }, [query.data, query.isSuccess]);

  //   const displayCoinNames = displayCoin.map((item) => item.pair);

  const displayCoinNames = [
    "ETHBTC",
    "BTCUSD",
    "LTCBTC",
    "LINKBTC",
    "BTCSGD",
    "BTCUSDT",
    "BTCGBP",
    "BTCEUR",
    "BTCGUSDPERP",
    "BTCGUSD",
    "DOGEBTC",
    "SOLBTC",
  ];

  const getCoinSumData = async () => {
    // if (search) {
    let arrOfCoinSumData = [];
    for (const eachCoinName of displayCoinNames) {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/v2/ticker/" + eachCoinName
      );
      if (!res.ok) {
        throw new Error("error getting data");
      }
      const data = await res.json();
      arrOfCoinSumData.push(data);
    }
    return arrOfCoinSumData;
  };
  //   };
  const queryCoinSumData = useQuery({
    queryKey: ["coinsSum"],
    queryFn: getCoinSumData,
  });

  useEffect(() => {
    if (queryCoinSumData.isSuccess) {
      setDisplayCoinSum(queryCoinSumData.data);
    }
  }, [queryCoinSumData.data, queryCoinSumData.isSuccess]);

  //    const getCoinSumData = async () => {
  //     const res = await fetch(
  //       import.meta.env.VITE_SERVER + "/v2/ticker/" + displayCoinNames
  //     );
  //     if (!res.ok) {
  //       throw new Error("error getting data");
  //     }
  //     return await res.json();
  //   };
  //   const queryCoinSumData = useQuery({
  //     queryKey: ["coinsSum"],
  //     queryFn: getCoinSumData,
  //   });

  //   useEffect(() => {
  //     if (queryCoinSumData.isSuccess) {
  //       setDisplayCoinSum(queryCoinSumData.data);
  //     }
  //   }, [queryCoinSumData.data, queryCoinSumData.isSuccess]);

  return (
    <>
      <div className="d-flex flex-column gap-2 p-2">
        <Input inputFn={updateSearch} buttonFn={clickSearch} value={search}>
          Search
        </Input>
        {/* {JSON.stringify(result)} */}
        {/* {JSON.stringify(displayCoinNames)} */}
        {/* {JSON.stringify(displayCoinSum)} */}
        <div
          className={`container ${orange} d-flex flex-wrap gap-2 p-2 overflow-auto scroll-white`}
          style={{ maxHeight: "200px" }}
        >
          {displayCoin.map((item, idx) => {
            return (
              <DisplayCoin pair={item.pair} price={item.price} key={idx} />
            );
          })}
        </div>
        <div
          className={`container ${orange} d-flex flex-wrap gap-2 p-2 overflow-auto scroll-white`}
          style={{ maxHeight: "400px" }}
        >
          {displayCoinSum.map((item, idx) => {
            return (
              <DisplayCoinSum
                symbol={item.symbol}
                open={item.open}
                high={item.high}
                low={item.low}
                close={item.close}
                key={idx}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DisplayMain;

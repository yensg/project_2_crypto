import React, { useContext, useEffect, useRef, useState } from "react";
import Input from "../functionComponents/Input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DisplayCoin from "./DisplayCoin";
import BootstrapContext from "../context/bootstrap-context";
import "../main.css";
import DisplayCoinSum from "./DisplayCoinSum";
import coinContext from "../context/coin-context";
import DisplayFav from "./DisplayFav";

const DisplayMain = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [coinData, setCoinData] = useState([]);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [displayCoinSum, setDisplayCoinSum] = useState([]);
  const displayCoinNames = useRef([]);
  const [searchHappened, setSearchHappened] = useState(false);

  const updateSearch = (event) => {
    setSearch(event.target.value);
  };
  const clickSearch = () => {
    const result = coinData.filter((item) => {
      return item.pair.toLowerCase().includes(search.toLowerCase());
    });
    setDisplayCoin(result);
    setSearch("");
    setSearchHappened(true);
  };
  const clickClear = () => {
    setDisplayCoin(coinData);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      clickSearch();
    }
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

  // put in root of component is very messy because we dont know when will it run. use useState or useRef.
  // const displayCoinNames = displayCoin.map((item) => item.pair);
  useEffect(() => {
    // To get the searched Coins' names and get coinSummaryData
    displayCoinNames.current = displayCoin.map((item) => item.pair);
  }, [displayCoin]);
  const getCoinSumData = async () => {
    // to fetch individual coinSummaryData
    const arrOfCoinSumData = [];
    for (const eachCoinName of displayCoinNames.current) {
      if (eachCoinName !== "EFILUSD" && eachCoinName !== "EURUSDC") {
        console.warn(eachCoinName);
        const res = await fetch(
          import.meta.env.VITE_SERVER + "/v2/ticker/" + eachCoinName
        );
        if (!res.ok) {
          throw new Error("error getting data");
        }
        const data = await res.json();
        arrOfCoinSumData.push(data);
      }
    }
    return arrOfCoinSumData;
  };
  const queryCoinSumData = useQuery({
    queryKey: ["coinsSum", displayCoin],
    queryFn: getCoinSumData,
    // not run on mount
    enabled: false,
  });
  useEffect(() => {
    if (queryCoinSumData.isSuccess) {
      setDisplayCoinSum(queryCoinSumData.data);
    }
  }, [queryCoinSumData.data, queryCoinSumData.isSuccess]);
  useEffect(() => {
    if (searchHappened) {
      queryCoinSumData.refetch();
      // queryClient.invalidateQueries(["coinsSum"]);
      setSearchHappened(false);
    }
  }, [displayCoin]);
  // how to use useMutation()? as it requires a POST, UPDATE or DELETE.
  // we cannot as we didnt run on mount queryClient.invalidateQueries(["coinsSum"]);

  return (
    <>
      <div
        className="d-flex flex-column gap-2 p-2"
        style={{
          borderRadius: "10px",
        }}
      >
        <Input
          handleKeyDown={handleKeyDown}
          inputFn={updateSearch}
          buttonFn={clickSearch}
          clickClear={clickClear}
          value={search}
        >
          Search
        </Input>
        <div
          className={`container d-flex flex-wrap gap-2 p-2 overflow-auto scroll-white`}
          style={{
            maxHeight: "300px",
            backgroundColor: "#ebe6e0",
            color: "#466D5B",
            border: "1px solid #466D5B",
            borderRadius: "5px",
          }}
        >
          {displayCoin.map((item, idx) => {
            return (
              <DisplayCoin
                pair={item.pair}
                price={item.price}
                percentChange24h={item.percentChange24h}
                key={idx}
              />
            );
          })}
        </div>
        <div
          className={`container d-flex flex-wrap gap-2 p-2 overflow-auto scroll-white`}
          style={{
            maxHeight: "300px",
            backgroundColor: "#ebe6e0",
            color: "#466D5B",
            border: "1px solid #466D5B",
            borderRadius: "5px",
          }}
        >
          {queryCoinSumData.isLoading && "Is Loading..."}
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

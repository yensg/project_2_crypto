import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useEffect, useRef, useState } from "react";
import DisplayFavCoin from "./DisplayFavCoin";
import BootstrapContext from "../context/bootstrap-context";
import Button from "../functionComponents/Button";
import DisplayGraph from "./DisplayGraph";

// Favourite Page
const DisplayFav = () => {
  const { blue, green, red, orange, lightblue, white } =
    useContext(BootstrapContext);
  const queryClient = useQueryClient();
  const symbolRef = useRef();
  const qtyRef = useRef();
  const targetEntryPriceRef = useRef();
  const [showGraph, setShowGraph] = useState(false);
  const [selectedPairToGraph, setSelectedPairToGraph] = useState("0");

  const getData = async () => {
    const res = await fetch(import.meta.env.VITE_AIRTABLE, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_AIRTABLE_TOKEN,
      },
    });
    if (!res.ok) {
      throw new Error("error getting data");
    }
    return res.json();
  };
  const queryAirTable = useQuery({
    queryKey: ["airTable"],
    queryFn: getData,
  });

  const addData = async () => {
    const res = await fetch(import.meta.env.VITE_AIRTABLE, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_AIRTABLE_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          pair: symbolRef.current.value,
          qty: Number(qtyRef.current.value),
          targetEntryPrice: Number(targetEntryPriceRef.current.value),
        },
      }),
    });
    if (!res.ok) {
      throw new Error("error getting data");
    }
    return res.json();
  };
  const mutation = useMutation({
    mutationFn: addData,
    onSuccess: () => {
      (symbolRef.current.value = ""),
        (qtyRef.current.value = ""),
        queryClient.invalidateQueries(["airTable"]);
    },
  });

  useEffect(() => {
    if (selectedPairToGraph === "0") {
      setShowGraph(false);
    } else {
      setShowGraph(true);
    }
  }, [selectedPairToGraph]);

  return (
    <>
      <h4>Portfolio Assumption</h4>
      <div className={`${red}`}></div>
      <div className="container">
        <div className={`d-flex  ${lightblue} align-items-baseline`}>
          <label>Symbol: </label>
          <input
            className="col-sm-1"
            type="text"
            ref={symbolRef}
            placeholder="Symbol"
          ></input>
          <label>Quantity: </label>
          <input
            className="col-sm-1"
            type="text"
            ref={qtyRef}
            placeholder="Qty"
          ></input>
          <label>Target Price: </label>
          <input
            className="col-sm-2"
            type="text"
            ref={targetEntryPriceRef}
            placeholder="Target Entry Price"
          ></input>
          <Button buttonFn={mutation.mutate}>Add</Button>
        </div>
      </div>
      <div className="container">
        <label>Show Graph</label>
        <select
          onChange={(event) => {
            setSelectedPairToGraph(event.target.value);
          }}
          value={selectedPairToGraph}
        >
          <option value="0">Select Coin</option>
          {queryAirTable.isSuccess &&
            queryAirTable.data.records.map((item) => {
              return <option key={item.id}>{item.fields.pair}</option>;
            })}
        </select>
      </div>
      <br />
      <div className="container">
        <div
          className={`d-flex  ${lightblue} justify-content-between align-items-baseline`}
        >
          <div className="col-sm-1">Symbol</div>
          <div className="col-sm-1">Qty</div>
          <div className="col-sm-2">Price</div>
          <div className="col-sm-2">Current Value</div>
          <div className="col-sm-2">Target Price</div>
          <div className="col-sm-2">Target Value</div>
          <div className="col-sm-2"></div>
        </div>
      </div>
      <div className={`container gap-2`}>
        {queryAirTable.isSuccess &&
          queryAirTable.data.records.map((item) => {
            return (
              <DisplayFavCoin id={item.id} fields={item.fields} key={item.id} />
            );
          })}
      </div>
      {showGraph && <DisplayGraph selectedPairToGraph={selectedPairToGraph} />}
    </>
  );
};

export default DisplayFav;

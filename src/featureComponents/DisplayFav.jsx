import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useEffect, useRef, useState } from "react";
import DisplayFavCoin from "./DisplayFavCoin";
import BootstrapContext from "../context/bootstrap-context";
import Button from "../functionComponents/Button";
import DisplayGraph from "./DisplayGraph";

// Favourite Page
const DisplayFav = () => {
  const { currencyFormatter } = useContext(BootstrapContext);
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
      <h5 className="m-0 fw-semibold text-center">Portfolio Assumption</h5>

      <div className="container">
        <div
          className={`d-flex  align-items-baseline justify-content-between`}
          style={{
            backgroundColor: "#466D5B",
            color: "#ebe6e0",
            borderRadius: "8px",
            padding: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          <label className="me-2 mb-0 fw-semibold">Symbol: </label>
          <input
            className="col-sm-2 "
            style={{
              backgroundColor: "#f4f0ec",
              color: "#000",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            type="text"
            ref={symbolRef}
            placeholder="Symbol"
          ></input>
          <label className="me-2 mb-0 fw-semibold">Quantity: </label>
          <input
            className="col-sm-2"
            style={{
              backgroundColor: "#f4f0ec",
              color: "#000",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            type="text"
            ref={qtyRef}
            placeholder="Qty"
          ></input>
          <label className="me-2 mb-0 fw-semibold">Entry Price: </label>
          <input
            className="col-sm-2"
            style={{
              backgroundColor: "#f4f0ec",
              color: "#000",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            type="text"
            ref={targetEntryPriceRef}
            placeholder="Entry Price"
          ></input>
          <Button buttonFn={mutation.mutate}>Add</Button>
        </div>
      </div>
      <br />
      <div className="container">
        <label className="me-2 mb-0 fw-semibold">Price Trend</label>
        <select
          className="col-sm-3"
          style={{
            backgroundColor: "#f4f0ec",
            color: "#000",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
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
          className={`d-flex justify-content-between align-items-baseline`}
          style={{
            backgroundColor: "#466D5B",
            color: "#ebe6e0",
            borderRadius: "8px",
            padding: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className="col-sm-1">Symbol</div>
          <div className="col-sm-1">Qty</div>
          <div className="col-sm-2">Price</div>
          <div className="col-sm-2">Current Value</div>
          <div className="col-sm-2">Entry Price</div>
          <div className="col-sm-2">Entry Value</div>
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
      {showGraph && (
        <div className="container-fluid px-0">
          <DisplayGraph selectedPairToGraph={selectedPairToGraph} />
        </div>
      )}
    </>
  );
};

export default DisplayFav;

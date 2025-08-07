import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import styles from "./ModalFavCoin.module.css";
import ReactDOM from "react-dom";
import Button from "../functionComponents/Button";

const ModalFavCoin = (props) => {
  const queryClient = useQueryClient();
  const symbolRef = useRef();
  const qtyRef = useRef();
  const targetEntryPriceRef = useRef();
  // const [render, setRender] = useState(false);

  const updateData = async () => {
    const res = await fetch(import.meta.env.VITE_AIRTABLE + "/" + props.id, {
      method: "PATCH",
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
    mutationFn: updateData,
    onSuccess: () => {
      (symbolRef.current.value = ""),
        (qtyRef.current.value = ""),
        (targetEntryPriceRef.current.value = ""),
        props.updateShowModal();
      queryClient.invalidateQueries(["airTable"]);
      // queryAirTable.refetch(["airTable"]);
      queryClient.invalidateQueries(["favCoins"]); // Qn: cant refresh
      // queryClient.refetchQueries(["favCoins"]);
      // query.refetch(["favCoins"]);
      // props.query.refetch(["favCoins"]);
      // setRender(true);
    },
  });

  return (
    <div className={styles.backdrop}>
      <div
        className={`container d-flex flex-column justify-content-center ${styles.modal}`}
      >
        <div className="row">
          <label className="col-sm-3 fw-semibold">Symbol:</label>
          <input
            className="col-sm-8"
            type="text"
            ref={symbolRef}
            placeholder="Symbol"
          ></input>
        </div>
        <div className="row">
          <label className="col-sm-3 fw-semibold">Quantity:</label>
          <input
            className="col-sm-8"
            type="text"
            ref={qtyRef}
            placeholder="Qty"
          ></input>
        </div>
        <div className="row">
          <label className="col-sm-3 fw-semibold">Entry Price:</label>
          <input
            className="col-sm-8"
            type="text"
            ref={targetEntryPriceRef}
            placeholder="Entry Price"
          ></input>
          <div className="container d-flex justify-content-end">
            <button
              id="button"
              className="col-sm-4 btn btn-sm btn-3d"
              style={{ backgroundColor: "#466D5B", color: "#ebe6e0" }}
              onClick={mutation.mutate}
            >
              Add
            </button>
            <div className="p-2"></div>
          </div>
          <div className="container d-flex justify-content-end">
            <button
              id="button"
              className="col-sm-4 btn btn-sm btn-3d"
              style={{ backgroundColor: "#466D5B", color: "#ebe6e0" }}
              onClick={props.updateShowModal}
            >
              Cancel
            </button>
            <div className="p-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Overlay = (props) => {
  return (
    <div>
      {ReactDOM.createPortal(
        <ModalFavCoin
          // query={props.query}
          updateShowModal={props.updateShowModal}
          id={props.id}
        />,
        document.querySelector("#modal-root")
      )}
    </div>
  );
};

export default Overlay;

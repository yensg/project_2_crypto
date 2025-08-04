import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import styles from "./ModalFavCoin.module.css";
import ReactDOM from "react-dom";
import Button from "../functionComponents/Button";

const ModalFavCoin = (props) => {
  const queryClient = useQueryClient();
  const symbolRef = useRef();
  const qtyRef = useRef();
  const targetEntryPriceRef = useRef();

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
    },
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="row">
          <input
            className="col-sm-1"
            type="text"
            ref={symbolRef}
            placeholder="Symbol"
          ></input>
        </div>
        <div className="row">
          <input
            className="col-sm-1"
            type="text"
            ref={qtyRef}
            placeholder="Qty"
          ></input>
        </div>
        <div className="row">
          <input
            className="col-sm-2"
            type="text"
            ref={targetEntryPriceRef}
            placeholder="Target Entry Price"
          ></input>
          <div className="row">
            <Button buttonFn={mutation.mutate}>Add</Button>
          </div>
          <div className="row">
            <Button buttonFn={props.updateShowModal}>Cancel</Button>
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
        <ModalFavCoin updateShowModal={props.updateShowModal} id={props.id} />,
        document.querySelector("#modal-root")
      )}
    </div>
  );
};

export default Overlay;

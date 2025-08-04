import React, { useContext, useState } from "react";
import BootstrapContext from "../context/bootstrap-context";
import Button from "../functionComponents/Button";
import coinContext from "../context/coin-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Overlay from "./ModalFavCoin";

const DisplayFavCoin = (props) => {
  const { blue, green, red, orange, lightblue, white } =
    useContext(BootstrapContext);
  //   const coinData = useContext(coinContext);
  //   const queryClient = useQueryClient();
  //   const coinData = queryClient.getQueryData(["coins"]);
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  const deleteData = async () => {
    const res = await fetch(import.meta.env.VITE_AIRTABLE + "/" + props.id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_AIRTABLE_TOKEN,
      },
    });
    if (!res.ok) {
      throw new Error("book deletion error");
    }
  };
  const mutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries(["airTable"]);
    },
  });

  let totalTargetValue = props.fields.targetEntryPrice * props.fields.qty;

  const updateShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal && <Overlay updateShowModal={updateShowModal} id={props.id} />}
      {/* {JSON.stringify(coinData)} */}
      <div
        className={`d-flex  ${lightblue} justify-content-between align-items-baseline`}
      >
        <div className="col-sm-1">{props.fields.pair}</div>
        <div className="col-sm-1">{props.fields.qty}</div>
        <div className="col-sm-2">Price</div>
        <div className="col-sm-2">Total Current Value</div>
        <div className="col-sm-2">{props.fields.targetEntryPrice}</div>
        <div className="col-sm-2">
          {props.fields.targetEntryPrice &&
            props.fields.qty &&
            totalTargetValue}
        </div>
        <Button buttonFn={updateShowModal}>Update</Button>
        <Button buttonFn={mutation.mutate}>Delete</Button>
      </div>
    </>
  );
};

export default DisplayFavCoin;

import React, { useContext, useEffect, useRef, useState } from "react";
import BootstrapContext from "../context/bootstrap-context";
import Button from "../functionComponents/Button";
import coinContext from "../context/coin-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Overlay from "./ModalFavCoin";

// Under DisplayFav, individual FavCoin level
const DisplayFavCoin = (props) => {
  const { currencyFormatter } = useContext(BootstrapContext);
  const queryClient = useQueryClient();
  // const coinData = queryClient.getQueryData(["coins"]);
  const [showModal, setShowModal] = useState(false);
  const [favCoinPrice, setFavCoinPrice] = useState();

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

  const getData = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/v1/pricefeed");
    if (!res.ok) {
      throw new Error("error getting data");
    }
    return await res.json();
  };
  const query = useQuery({
    queryKey: ["favCoins"],
    queryFn: getData,
    staleTime: 0,
  });
  useEffect(() => {
    if (query.isSuccess) {
      const matched = query.data.find((item) => {
        return item.pair === props.fields.pair;
      });

      //use this to check
      // console.log(matched);
      // if (!matched) {
      //   console.log("matched");
      // }
      // if (Number(matched.price)) {
      //   console.log("number");
      // }

      //this doesnt work
      // if (!matched && Number(matched.price)) {
      //   setFavCoinPrice(Number(matched.price));
      // } else {
      //   setFavCoinPrice(0);
      // }

      if (matched !== undefined && Number(matched.price)) {
        setFavCoinPrice(Number(matched.price));
      } else {
        setFavCoinPrice(0);
      }

      // if (!isNaN(Number(matched?.price))) {
      //   setFavCoinPrice(Number(matched.price));
      // } else {
      //   setFavCoinPrice(0);
      // }
      // this is not efficient because we always want to run the closes to the numbers.
      // if (matched === undefined && !Number(matched.price)) {
      //   setFavCoinPrice(0);
      // } else {
      //   setFavCoinPrice(Number(matched.price));
      // }
    }
  }, [query.data, query.isSuccess]);

  // Update FavCoin
  const updateShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="mb-1">
      {showModal && (
        <Overlay
          // query={query}
          updateShowModal={updateShowModal}
          id={props.id}
        />
      )}
      <div
        className={`d-flex  justify-content-between align-items-baseline`}
        style={{
          backgroundColor: "#ebe6e0",
          color: "#466D5B",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          fontSize: "0.85rem",
          padding: "4px",
          borderRadius: "4px",
        }}
      >
        <div className="col-sm-1">{props.fields.pair}</div>
        <div className="col-sm-1">{props.fields.qty}</div>
        <div className="col-sm-2">{currencyFormatter(favCoinPrice)}</div>
        <div className="col-sm-2">
          {currencyFormatter(
            favCoinPrice && props.fields.qty && favCoinPrice * props.fields.qty
          )}
        </div>
        <div className="col-sm-2">
          {currencyFormatter(props.fields.targetEntryPrice)}
        </div>
        <div className="col-sm-2">
          {currencyFormatter(
            props.fields.targetEntryPrice &&
              props.fields.qty &&
              props.fields.targetEntryPrice * props.fields.qty
          )}
        </div>
        <Button buttonFn={updateShowModal}>Update</Button>
        <Button buttonFn={() => mutation.mutate()}>Delete</Button>
      </div>
    </div>
  );
};

export default DisplayFavCoin;

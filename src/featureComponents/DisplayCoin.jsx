import React, { useContext } from "react";
import BootstrapContext from "../context/bootstrap-context";

// Under DisplayMain
const DisplayCoin = (props) => {
  const { currencyFormatter, formattedPercentage } =
    useContext(BootstrapContext);

  return (
    <div
      className={`p-3 rounded`}
      style={{
        backgroundColor: "#466D5B",
        color: "#ebe6e0",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div>{props.pair}</div>
      <div>{currencyFormatter(props.price)}</div>
      <div
        style={{
          color:
            props.percentChange24h > 0
              ? "#50C878"
              : props.percentChange24h < 0
              ? "#E63946"
              : "#f4f0ec",
        }}
      >
        {formattedPercentage(props.percentChange24h)}
      </div>
    </div>
  );
};

export default DisplayCoin;

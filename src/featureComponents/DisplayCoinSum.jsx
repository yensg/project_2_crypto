import React, { useContext } from "react";
import BootstrapContext from "../context/bootstrap-context";

// Under DisplayMain
const DisplayCoinSum = (props) => {
  const { currencyFormatter } = useContext(BootstrapContext);

  return (
    <div
      className={`p-2 rounded`}
      style={{
        backgroundColor: "#f4f0ec",
        color: "#466D5B",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div>Symbol: {props.symbol}</div>
      <div>Open:{currencyFormatter(props.open)}</div>
      <div>High: {currencyFormatter(props.high)}</div>
      <div>Low: {currencyFormatter(props.low)}</div>
      <div>Close: {currencyFormatter(props.close)}</div>
    </div>
  );
};

export default DisplayCoinSum;

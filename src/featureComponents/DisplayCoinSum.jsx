import React, { useContext } from "react";
import BootstrapContext from "../context/bootstrap-context";

// Under DisplayMain
const DisplayCoinSum = (props) => {
  const { blue, green, red, orange, lightblue, white } =
    useContext(BootstrapContext);

  return (
    <div
      className={`p-2 rounded`}
      style={{ backgroundColor: "#f4f0ec", color: "#4c7766" }}
    >
      <div>Symbol: {props.symbol}</div>
      <div>Open: ${props.open}</div>
      <div>High: ${props.high}</div>
      <div>Low: ${props.low}</div>
      <div>Close: ${props.close}</div>
    </div>
  );
};

export default DisplayCoinSum;

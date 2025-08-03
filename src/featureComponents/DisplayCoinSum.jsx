import React, { useContext } from "react";
import BootstrapContext from "../context/bootstrap-context";

const DisplayCoinSum = (props) => {
  const { blue, green, red, orange, lightblue, white } =
    useContext(BootstrapContext);

  return (
    <div className={`${green} p-2 rounded`}>
      <div>Symbol: {props.symbol}</div>
      <div>Open: ${props.open}</div>
      <div>High: ${props.high}</div>
      <div>Low: ${props.low}</div>
      <div>Close: ${props.close}</div>
    </div>
  );
};

export default DisplayCoinSum;

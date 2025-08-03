import React, { useContext } from "react";
import BootstrapContext from "../context/bootstrap-context";
const DisplayCoin = (props) => {
  const { blue, green, red, orange, lightblue, white } =
    useContext(BootstrapContext);

  return (
    <div className={`${green} p-2 rounded`}>
      <div>{props.pair}</div>
      <div>${props.price}</div>
    </div>
  );
};

export default DisplayCoin;

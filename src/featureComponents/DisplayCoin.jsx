import React, { useContext } from "react";
import BootstrapContext from "../context/bootstrap-context";

// Under DisplayMain
const DisplayCoin = (props) => {
  const { blue, green, red, orange, lightblue, white } =
    useContext(BootstrapContext);

  return (
    <div
      className={`p-3 rounded`}
      style={{
        backgroundColor: "#4c7766",
        color: "#ebe6e0",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div>{props.pair}</div>
      <div>${props.price}</div>
    </div>
  );
};

export default DisplayCoin;

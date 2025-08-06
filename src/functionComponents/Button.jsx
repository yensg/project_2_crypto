import React, { useContext } from "react";
import BootstrapContext from "../context/bootstrap-context";
import "../main.css";

const Button = (props) => {
  const { blue, green, red, orange, lightblue, white } =
    useContext(BootstrapContext);

  return (
    <>
      <button
        id="button"
        className="col-sm-1 btn btn-sm"
        style={{ backgroundColor: "#4c7766", color: "#ebe6e0" }}
        onClick={props.buttonFn}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;

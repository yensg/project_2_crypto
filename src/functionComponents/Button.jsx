import React, { useContext } from "react";
import BootstrapContext from "../context/bootstrap-context";
import "../main.css";

const Button = (props) => {
  return (
    <>
      <button
        id="button"
        className="col-sm-1 btn btn-sm btn-3d"
        style={{ backgroundColor: "#466D5B", color: "#ebe6e0" }}
        onClick={props.buttonFn}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;

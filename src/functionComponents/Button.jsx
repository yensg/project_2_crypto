import React, { useContext } from "react";
import BootstrapContext from "../context/bootstrap-context";

const Button = (props) => {
  const { blue, green, red, orange, lightblue, white } =
    useContext(BootstrapContext);

  return (
    <>
      <button
        className="col-sm-1 btn btn-light btn-sm"
        onClick={props.buttonFn}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;

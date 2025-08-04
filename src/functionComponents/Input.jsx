import React, { useContext } from "react";
import BootstrapContext from "../context/bootstrap-context";

const Input = (props) => {
  const { blue, green, red, orange, lightblue, white } =
    useContext(BootstrapContext);

  return (
    <div className={`${green}`}>
      <label className="col-sm-2">{props.children}:</label>
      <input
        className="col-sm-8"
        type="text"
        value={props.value}
        onChange={props.inputFn}
        placeholder={props.children}
        onKeyDown={props.handleKeyDown}
      />
      <button
        className="col-sm-1 btn btn-light btn-sm"
        onClick={props.buttonFn}
      >
        Submit
      </button>
      <button
        className="col-sm-1 btn btn-light btn-sm"
        onClick={props.clickClear}
      >
        Clear
      </button>
    </div>
  );
};

export default Input;

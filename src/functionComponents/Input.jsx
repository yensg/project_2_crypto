import React, { useContext } from "react";
import BootstrapContext from "../context/bootstrap-context";

const Input = (props) => {
  const { blue, green, red, orange, lightblue, white } =
    useContext(BootstrapContext);

  return (
    <div
      className="d-flex justify-content-between align-items-center"
      style={{
        backgroundColor: "#4c7766",
        color: "#ebe6e0",
        borderRadius: "8px",
        padding: "5px",
      }}
    >
      <label className="col-sm-2">{props.children}:</label>
      <input
        className="col-sm-6"
        type="text"
        value={props.value}
        onChange={props.inputFn}
        placeholder={props.children}
        onKeyDown={props.handleKeyDown}
      />
      <div className="col-sm-1"></div>
      <button
        className="col-sm-1 btn btn-sm d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#ebe6e0", color: "#4c7766" }}
        onClick={props.buttonFn}
      >
        Submit
      </button>

      <button
        className="col-sm-1 btn btn-sm d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#ebe6e0", color: "#4c7766" }}
        onClick={props.clickClear}
      >
        Clear
      </button>
    </div>
  );
};

export default Input;

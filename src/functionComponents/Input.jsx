import React, { useContext } from "react";
import BootstrapContext from "../context/bootstrap-context";

const Input = (props) => {
  return (
    <div
      className="d-flex justify-content-between align-items-center"
      style={{
        backgroundColor: "#466D5B",
        color: "#ebe6e0",
        borderRadius: "8px",
        padding: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
      }}
    >
      <label className="col-sm-2 me-2 mb-0 fw-semibold">
        {props.children}:
      </label>
      <input
        className="col-sm-6"
        style={{
          backgroundColor: "#f4f0ec",
          color: "#000",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
        type="text"
        value={props.value}
        onChange={props.inputFn}
        placeholder={props.children}
        onKeyDown={props.handleKeyDown}
      />
      <div className="col-sm-1"></div>
      <button
        className="col-sm-1 btn btn-sm d-flex justify-content-center align-items-center btn-3d"
        style={{ backgroundColor: "#ebe6e0", color: "#466D5B" }}
        onClick={props.buttonFn}
      >
        Submit
      </button>

      <button
        className="col-sm-1 btn btn-sm d-flex justify-content-center align-items-center btn-3d"
        style={{ backgroundColor: "#ebe6e0", color: "#466D5B" }}
        onClick={props.clickClear}
      >
        Clear
      </button>
    </div>
  );
};

export default Input;

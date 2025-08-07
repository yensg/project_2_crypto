import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import NavBar from "./featureComponents/NavBar";
import { Route, Routes } from "react-router-dom";
import DisplayMain from "./featureComponents/DisplayMain";
import DisplayFav from "./featureComponents/DisplayFav";
import styles from "./App.module.css";
import BootstrapContext from "./context/bootstrap-context";

const queryClient = new QueryClient();

function App() {
  const blue = "border border-primary";
  const green = "border border-success";
  const red = "border border-danger";
  const orange = "border border-warning";
  const lightblue = "border border-info";
  const white = "border border-white";
  const currencyFormatter = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 10,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formattedPercentage = (percentage) => {
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(percentage);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <BootstrapContext.Provider
        value={{
          blue,
          green,
          red,
          orange,
          lightblue,
          white,
          currencyFormatter,
          formattedPercentage,
        }}
      >
        <div className="container p-3">
          <div className="d-flex justify-content-between align-items-center">
            <NavBar />
            <p className="m-0 fw-semibold text-end">Yen's Crypto Tracker</p>
          </div>
          <div
            style={{
              backgroundColor: "#ebe6e0",
              color: "#4c7766",
              border: "1px solid #4c7766",
              borderRadius: "10px",
              padding: "2px",
            }}
          >
            <Routes>
              <Route path="/" element={<DisplayMain />} />
              <Route path="main" element={<DisplayMain />} />
              <Route path="fav" element={<DisplayFav />} />
            </Routes>
          </div>
        </div>
      </BootstrapContext.Provider>
    </QueryClientProvider>
  );
}

export default App;

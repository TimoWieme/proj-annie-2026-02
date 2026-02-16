import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// Import the style for the react-range-slider-input component
import "react-range-slider-input/dist/style.css";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Wrap the app in a BrowserRouter so we can use it throughout the app*/}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

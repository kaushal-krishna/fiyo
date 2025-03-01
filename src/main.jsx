import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ContextProviders from "./context/ContextProviders";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProviders>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextProviders>
  </React.StrictMode>
);

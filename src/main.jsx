import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import NewBook from "./pages/NewBook/NewBookPage.jsx";
import { BrowserRouter } from "react-router-dom";







ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import QuizContextProvider from "./contexts/QuizContextProvider.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QuizContextProvider>
        <App />
      </QuizContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

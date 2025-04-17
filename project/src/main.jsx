import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ContextReducer from "./context/ContextReducer.jsx";

createRoot(document.getElementById("root")).render(
  <ContextReducer>
    <StrictMode>
      <App />
    </StrictMode>
  </ContextReducer>
);

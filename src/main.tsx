import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./ds/tokens.css";
import "./ds/themes.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import CryptoContext from "./CryptoContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CryptoContext>
        <App />
      </CryptoContext>
    </BrowserRouter>
  </StrictMode>
);

//wrap App with BrowserRouter to enable routing

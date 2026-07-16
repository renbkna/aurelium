import React from "react";
import ReactDOM from "react-dom/client";
import { MotionConfig } from "framer-motion";
import App from "./App";
import { applyTheme, resolveInitialTheme, ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";

const rootElement = document.querySelector("#root");
if (!rootElement) {
  throw new Error("Root element not found");
}

applyTheme(resolveInitialTheme());

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MotionConfig>
  </React.StrictMode>,
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WordsContextProvider } from "./context/WordContext.tsx";
import './i18n';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WordsContextProvider>
      <App />
    </WordsContextProvider>
  </React.StrictMode>
);

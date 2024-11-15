import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { App } from "./components/App/App.tsx";
import { WebAppProvider } from "@vkruglikov/react-telegram-web-app";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WebAppProvider
      options={{
        smoothButtonsTransition: true,
      }}
    >
      <App />
    </WebAppProvider>
  </React.StrictMode>
);

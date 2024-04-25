import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./store/configureStore.ts";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PayPalScriptProvider
      options={{
        clientId:
          "AbMRMQ2KAg1sgWoOwL70oSNvGVTUr7I0yS-bIwy1b5nXmA10Kyze5msn_Z2gxf880BQUbsdw5yKORTAV",
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </PayPalScriptProvider>
  </React.StrictMode>
);

// DO NOT MODIFY ANYTHING HERE

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import configureAppStore from "./helperFunctions/ConfigureStore";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "react-datepicker/dist/react-datepicker.css";
import "./index.sass";
const store = configureAppStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

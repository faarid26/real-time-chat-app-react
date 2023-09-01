import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import reducer from "./store/reducer.js";
import store from "./store/index.js";
// const store = legacy_createStore(reducer);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

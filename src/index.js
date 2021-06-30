import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./ThemeProvider";
// core components

import "assets/css/material-dashboard-react.css?v=1.9.0";
import "bootstrap/dist/css/bootstrap.css";
import "assets/css/tailwind.css";

import { Provider } from "react-redux";

import store from "./store";

import firebase from "firebase";
import { firebaseConfig } from "services/firebaseConfig";
import App from "./App";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const hist = createBrowserHistory();
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={hist}>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

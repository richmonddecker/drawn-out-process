import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createBrowserHistory } from "history"
import { ConnectedRouter } from "connected-react-router/immutable";

import configureStore from "./store";

import "bootstrap/dist/css/bootstrap.css";
import "./styles/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const history = createBrowserHistory()

ReactDOM.render((
  <Provider store={configureStore()}>
    <ConnectedRouter history={createBrowserHistory()}>
      <App />
    </ConnectedRouter>
  </Provider>
), document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from "react";
import PropTypes from "prop-types";

import { ConnectedRouter } from "connected-react-router/immutable";
import Routes from "./routes";

import { Switch, Route } from "react-router-dom"
import Home from "./components/Home";
import RepetitiveIndex from "./components/RepetitiveIndex";
import Repetitive from "./components/Repetitive";
import NavigationBar from "./components/NavigationBar";

const App = ({ history }) => {
  console.log("ROUTES: ", Routes.length);
  return (
  <ConnectedRouter history={history}>
    <Routes />
  </ConnectedRouter>
)};

App.propTypes = {
  history: PropTypes.object
};

export default App;

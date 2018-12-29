import React from "react";
import { Switch, Route } from "react-router-dom"
import HomePage from "../components/HomePage";
import RepetitiveIndex from "../components/RepetitiveIndex";
import Content from "../components/Content";
import Control from "../components/Control";

const NoMatch = () => (
  <div>404</div>
);

export const ApplicationRoutes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/:category" component={RepetitiveIndex} />
    <Route path="/:category/:element" component={Content} />
    <Route component={NoMatch} />
  </Switch>
);

export const ControlRoutes = () => (
  <Switch>
    <Route path="/:category/:element" component={Control} />
  </Switch>
);
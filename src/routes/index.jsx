import React from "react";
import { Switch, Route } from "react-router-dom"
import HomePage from "../components/HomePage";
import RepetitiveIndex from "../components/RepetitiveIndex";
import Content from "../components/Content";

import CreativeConfiguration from "../components/CreativeConfiguration";
import GenerativeConfiguration from "../components/GenerativeConfiguration";
import RepetitiveConfiguration from "../components/RepetitiveConfiguration";


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

export const ConfigurationRoutes = () => (
  <Switch>
    <Route path="/repetitive/:name" component={RepetitiveConfiguration} />
    <Route path="/creative/:name" component={CreativeConfiguration} />
    <Route path="/generative/:name" component={GenerativeConfiguration} />
  </Switch>
);
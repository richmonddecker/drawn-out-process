import React from "react";
import { Switch, Route } from "react-router-dom"
import HomePage from "../components/HomePage";
import RepetitiveIndex from "../components/RepetitiveIndex";
import Repetitive from "../components/Repetitive";
import P5Container from "../components/P5Container";

import CreativeConfiguration from "../components/CreativeConfiguration";
import GenerativeConfiguration from "../components/GenerativeConfiguration";
import RepetitiveConfiguration from "../components/RepetitiveConfiguration";


const NoMatch = () => (
  <div>404</div>
);

export const ApplicationRoutes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/repetitive" component={RepetitiveIndex} />
    <Route path="/repetitive/:name" component={Repetitive} />
    <Route path="/creative/:name" component={P5Container} />
    <Route path="/generative/:name" component={P5Container} />
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
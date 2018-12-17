import React from "react";
import { Switch, Route } from "react-router-dom"
import Home from "../components/Home";
import RepetitiveIndex from "../components/RepetitiveIndex";
import Repetitive from "../components/Repetitive";
import NavigationBar from "../components/NavigationBar";

const NoMatch = () => (
  <div>404</div>
);

const ToolBar = () => null;

const Routes = () => (
  <main>
  	<NavigationBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/repetitive" component={RepetitiveIndex} />
      <Route path="/repetitive/:name" component={Repetitive} />
      <Route component={NoMatch} />
    </Switch>
    <ToolBar />
  </main>
);

export default Routes;
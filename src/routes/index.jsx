import React from "react";
import { Switch, Route } from "react-router-dom"
import Home from "../components/Home";
import RepetitiveIndex from "../components/RepetitiveIndex";
import Repetitive from "../components/Repetitive";
import NavigationBar from "../components/NavigationBar";
import P5Container from "../components/P5Container";
import ToolBar from "../components/ToolBar";

const NoMatch = () => (
  <div>404</div>
);

const Routes = () => (
  <main>
  	<NavigationBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/repetitive" component={RepetitiveIndex} />
      <Route path="/repetitive/:name" component={Repetitive} />
      <Route path="/creative/:name" component={P5Container} />
      <Route path="/generative/:name" component={P5Container} />
      <Route component={NoMatch} />
    </Switch>
    <ToolBar />
  </main>
);

export default Routes;
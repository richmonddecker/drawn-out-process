import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom"
import HomePage from "../components/HomePage";
import NoMatch from "../components/NoMatch";
import {ContentFilter, IndexFilter} from "../components/filters";
import Control from "../components/Control";


export const ApplicationRoutes = () => (
  <Switch>
    <Redirect exact strict from="//" to="/" />
    <Redirect exact strict from="/:a/" to="/:a" />
    <Redirect exact strict from="/:a/:b/" to="/:a/:b" />
    <Redirect exact from="/informative" to="/" />
    <Route exact path="/" component={HomePage} />
    <Route exact path="/:category" component={IndexFilter} />
    <Route exact path="/:category/:element" component={ContentFilter} />
    <Route component={NoMatch} />
  </Switch>
);

export const ControlRoutes = () => (
  <Switch>
    <Route path="/:category/:element" component={Control} />
  </Switch>
);
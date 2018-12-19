import React from "react";
import { connect } from "react-redux";
import Fullscreen from "react-full-screen";

import Navigation from "./components/Navigation";
import Application from "./components/Application";
import Configuration from "./components/Configuration";

import { setFullScreen } from "./actions/configuration";

const App = (props) => (
  <div>
    <Fullscreen
      enabled={props.fullScreen}
      onChange={isFull => props.setFullScreen(isFull)}
    >
      <Navigation />
      <Application />
      <Configuration />
    </Fullscreen>
  </div>
);

const mapStateToProps = (state) => ({
  fullScreen: state.configuration.fullScreen
});

const mapDispatchToProps = (dispatch) => ({
  setFullScreen: (full) => dispatch(setFullScreen(full))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

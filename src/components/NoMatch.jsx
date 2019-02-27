import React from "react";
import { connect } from "react-redux";
import P5Canvas from "./P5Canvas";
import sketch from "../sketches/no-match";

import { setInvalidUrl, setCurrentElement, setCurrentInteractivity } from "../actions/interface";

class NoMatch extends React.Component {
  componentDidMount() {
    this.props.dispatch(setInvalidUrl(true));
    this.props.dispatch(setCurrentElement("404", "404", "404 Not Found"));
    this.props.dispatch(setCurrentInteractivity(false));
  }

  componentWillUnmount() {
    this.props.dispatch(setInvalidUrl(false));
  }

  render() {
    return <P5Canvas sketch={sketch} tag="404" />;
  }
}

export default connect()(NoMatch);
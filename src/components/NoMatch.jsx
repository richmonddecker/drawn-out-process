import React from "react";
import { connect } from "react-redux";
import P5Canvas from "./P5Canvas";
import sketch from "../sketches/no-match";

import { setInvalidUrl } from "../actions/interface";

class NoMatch extends React.Component {
  componentDidMount() {
    this.props.dispatch(setInvalidUrl(true));
  }

  componentWillUnmount() {
    this.props.dispatch(setInvalidUrl(false));
  }

  render() {
    return <P5Canvas sketch={sketch} />;
  }
}

export default connect()(NoMatch);
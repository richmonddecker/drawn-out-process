import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { resetTrigger } from "../actions/trigger";

class Repetitive extends React.Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  render() {
    return (
      <div className="fill-screen">
        <video src={this.props.video} height={this.state.height} width={this.state.width} autoPlay loop muted>
        </video>
      </div>
    );
  }

  updateDimensions() {
    const dimension = Math.min(window.innerWidth, window.innerHeight);
    this.setState({width: dimension, height: dimension});
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnMount() {
    window.removeEventListener("resize");
  }
}

// TODO: Make this stuff have an effect.

const mapStateToProps = (state) => ({
  save: state.trigger.saveFrame,
  reset: state.trigger.resetFrame
});

const mapDispatchToProps = (dispatch) => ({
  clearSave: () => dispatch(resetTrigger("saveFrame")),
  clearReset: () => dispatch(resetTrigger("resetFrame"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Repetitive);
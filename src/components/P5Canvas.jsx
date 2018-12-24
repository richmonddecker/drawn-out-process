/*
  Modifed from Andreas Wolf's react-p5-wrapper
  https://github.com/NeroCor/react-p5-wrapper
*/

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import p5 from "p5";

import { resetTrigger } from "../actions/trigger.js";

class P5Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.passProps = this.passProps.bind(this);
    this.makeCanvas = this.makeCanvas.bind(this);
    this.resetCanvas = this.resetCanvas.bind(this);
    this.handleTriggers = this.handleTriggers.bind(this);
  }
  
  passProps(props) {
    // If the mouse is over the side bars, we should inhibit interaction.
    this.canvas.isBlocked = props.isBlocked;
    if (this.canvas.interpretProps) {
      this.canvas.interpretProps(props);
    }
  }

  makeCanvas(props) {
    this.canvas = new p5(props.sketch, this.wrapper);
  }

  resetCanvas(props) {
    this.wrapper.removeChild(this.wrapper.childNodes[0]);
    this.makeCanvas(props);
  }

  handleTriggers(props) {
    if (props.trigger.save) {
      props.clearTrigger.save();
      this.canvas.saveCanvas(props.name, "png");
    }
    if (props.trigger.reset) {
      props.clearTrigger.reset();
      this.resetCanvas(props);
    }
  }

  componentDidMount() {
    this.makeCanvas(this.props);
    this.passProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.sketch !== newProps.sketch) {
      this.resetCanvas(newProps);
    }
    this.passProps(newProps);
    this.handleTriggers(newProps);
  }

  render() {
    return <div class="fill-screen" ref={wrapper => this.wrapper = wrapper}></div>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  isBlocked: state.navigation.barsOpen,
  trigger: {
    save: state.trigger.saveFrame,
    reset: state.trigger.resetFrame
  },
  controls: state.controls[ownProps.name]
});

const mapDispatchToProps = (dispatch) => ({
  clearTrigger: {
    save: () => dispatch(resetTrigger("saveFrame")),
    reset: () => dispatch(resetTrigger("resetFrame"))
  }
});

P5Canvas.propTypes = {
  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(P5Canvas);

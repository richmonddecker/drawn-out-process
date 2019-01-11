/*
  Heavily modifed from Andreas Wolf's react-p5-wrapper
  https://github.com/NeroCor/react-p5-wrapper
*/

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import p5 from "p5";

import { resetTrigger } from "../actions/trigger";
import { resetAttributes } from "../actions/control";

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
    this.canvas.settings = {...this.canvas.settings, ...props.control.parameters};
  }

  makeCanvas(props) {
    this.canvas = new p5(props.sketch, this.wrapper);
    this.canvas.settings = {
      ...this.canvas.settings,
      ...props.control.parameters,
      ...props.control.attributes,
      ...props.control.changes
    };
    this.canvas.isSquare = props.isSquare;
    this.canvas.setup();
  }

  resetCanvas(props) {
    this.wrapper.removeChild(this.wrapper.childNodes[0]);
    this.canvas.remove();
    this.makeCanvas(props);
  }

  handleTriggers(props) {
    if (props.trigger.save) {
      props.clearTrigger.save();
      this.canvas.saveCanvas(props.tag, "png");
    }
    if (props.trigger.reset) {
      props.clearTrigger.reset();
      props.resetAttributes();
      this.resetCanvas(this.props);
    }
  }

  componentDidMount() {
    this.makeCanvas(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.sketch !== newProps.sketch) {
      this.resetCanvas(newProps);
    }
    this.passProps(newProps);
    this.handleTriggers(newProps);
  }

  componentWillUnmount() {
    this.wrapper.removeChild(this.wrapper.childNodes[0]);
    this.canvas.remove();
  }

  render() {
    return <div className="fillScreen" ref={wrapper => this.wrapper = wrapper}></div>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  isBlocked: state.interface.barsOpen,
  isSquare: state.configuration.squareScreen,
  trigger: {
    save: state.trigger.saveFrame,
    reset: state.trigger.resetFrame
  },
  control: state.control[ownProps.category] ? state.control[ownProps.category][ownProps.element] : {}
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  clearTrigger: {
    save: () => dispatch(resetTrigger("saveFrame")),
    reset: () => dispatch(resetTrigger("resetFrame"))
  },
  resetAttributes: ownProps.category ? () => dispatch(resetAttributes(ownProps.category, ownProps.element)) : () => null
});

P5Canvas.propTypes = {
  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(P5Canvas);

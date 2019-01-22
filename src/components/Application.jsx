import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { ApplicationRoutes } from "../routes";
import { closeBars, hideCursor, showCursor } from "../actions/interface";
import { toggleFullScreen, toggleBarTabs, toggleSquareScreen, toggleBarLock } from "../actions/configuration";
import { pullTrigger } from "../actions/trigger";

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.resetInterval = this.resetInterval.bind(this);
    this.startBarTimer = this.startBarTimer.bind(this);
    this.clearBarTimer = this.clearBarTimer.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  resetInterval() {
    this.props.showCursor();
    clearTimeout(this.mouseTimer);
    this.mouseTimer = setTimeout(this.props.hideCursor, 2000);
  }

  startBarTimer() {
    this.barTimer = setTimeout(this.props.closeBars, 1000);
  }

  clearBarTimer() {
    clearTimeout(this.barTimer);
  }

  handleKeyPress(event) {
    if (["b", "B"].includes(event.key)) {
      this.props.toggleBarLock();
    }
    if (["t", "T"].includes(event.key)) {
      this.props.toggleBarTabs();
    }
    if (["f", "F"].includes(event.key)) {
      this.props.toggleFullScreen();
      setTimeout(() => this.props.pullTrigger("resetFrame"), 800);
    }
    if (["x", "X"].includes(event.key)) {
      this.props.toggleSquareScreen();
      setTimeout(() => this.props.pullTrigger("resetFrame"), 200);
    }
    if (["s", "S"].includes(event.key)) {
      this.props.pullTrigger("saveFrame");
    }
    if (["r", "R"].includes(event.key)) {
      this.props.pullTrigger("resetFrame");
    }
  }

  render() {
    return (
      <div
        id="application"
        tabIndex="0"
        className={`fillScreen${this.props.cursorHidden ? " mouseGone" : ""}`}
        onMouseOver={this.startBarTimer}
        onMouseLeave={this.clearBarTimer}
        onMouseDown={this.props.closeBars}
        onMouseMove={this.resetInterval}
        onKeyPress={this.handleKeyPress}
      >
        <ApplicationRoutes />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  cursorHidden: state.interface.cursorHidden
})

const mapDispatchToProps = (dispatch) => ({
  closeBars: () => dispatch(closeBars()),
  hideCursor: () => dispatch(hideCursor()),
  showCursor: () => dispatch(showCursor()),
  toggleFullScreen: () => dispatch(toggleFullScreen()),
  toggleBarTabs: () => dispatch(toggleBarTabs()),
  toggleBarLock: () => dispatch(toggleBarLock()),
  toggleSquareScreen: () => dispatch(toggleSquareScreen()),
  pullTrigger: (name) => dispatch(pullTrigger(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);

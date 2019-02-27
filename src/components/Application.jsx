import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { withRouter } from "react-router";

import { ApplicationRoutes } from "../routes";
import { closeBars, hideCursor, showCursor, incrementTimer, resetTimer } from "../actions/interface";
import { toggleFullScreen, toggleBarTabs, toggleSquareScreen, toggleBarLock, toggleShuffle, toggleKeepCategory, toggleInfo } from "../actions/configuration";
import { pullTrigger } from "../actions/trigger";

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.resetInterval = this.resetInterval.bind(this);
    this.startBarTimer = this.startBarTimer.bind(this);
    this.clearBarTimer = this.clearBarTimer.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goPrevious = this.goPrevious.bind(this);
  }

  startSlideshowCounter() {
    this.slideshowCounter = setInterval(
      () => {
        this.props.incrementTimer();
        if (this.props.slideshow && this.props.timer >= this.props.slideshow) {
          this.goNext();
        }
      },
      1000
    );
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

  goNext() {
    this.props.push(`/${this.props.next.category}/${this.props.next.element}`);
  }

  goPrevious() {
    // TODO: This assumes no custom URLS.
    this.props.push(`/${this.props.previous.category}/${this.props.previous.element}`);
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
    if (["r", "R"].includes(event.key)) {
      this.props.pullTrigger("resetFrame");
    }
    if (["s", "S"].includes(event.key)) {
      this.props.pullTrigger("saveFrame");
    }
    if (["c", "C"].includes(event.key)) {
      this.props.toggleKeepCategory();
    }
    if (["m", "M"].includes(event.key)) {
      this.props.toggleShuffle();
    }
    if (this.props.interactivity) {
      if (["p", "P"].includes(event.key)) {
        this.goPrevious();
      }
      if (["n", "N"].includes(event.key)) {
        this.goNext();
      }
      if (["i", "I"].includes(event.key)) {
        this.props.toggleInfo();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.resetTimer();
      clearInterval(this.slideshowCounter);
      this.startSlideshowCounter();
    }
  }

  componentDidMount() {
    this.props.resetTimer();
    this.startSlideshowCounter();
  }


  render() {
    return (
      <div
        id="application"
        tabIndex="0"
        className={this.props.cursorHidden ? " mouseGone" : ""}
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
  cursorHidden: state.interface.cursorHidden,
  next: state.interface.next,
  previous: state.interface.previous,
  timer: state.interface.timer,
  slideshow: state.interface.slideshow,
  interactivity: state.interface.interactivity
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeBars: () => dispatch(closeBars()),
  hideCursor: () => dispatch(hideCursor()),
  showCursor: () => dispatch(showCursor()),
  toggleFullScreen: () => dispatch(toggleFullScreen()),
  toggleBarTabs: () => dispatch(toggleBarTabs()),
  toggleBarLock: () => dispatch(toggleBarLock()),
  toggleInfo: () => dispatch(toggleInfo()),
  toggleSquareScreen: () => dispatch(toggleSquareScreen()),
  toggleShuffle: () => dispatch(toggleShuffle()),
  toggleKeepCategory: () => dispatch(toggleKeepCategory()),
  incrementTimer: () => dispatch(incrementTimer()),
  resetTimer: () => dispatch(resetTimer()),
  pullTrigger: (name) => dispatch(pullTrigger(name)),
  push: (path) => dispatch({
    type: "@@router/LOCATION_CHANGE",
    payload: {
      location: {
        pathname: path,
        search: ownProps.location.search,
        hash: ownProps.location.hash
      },
      action: "PUSH"
    }
  })
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Application));

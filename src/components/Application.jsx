import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { ApplicationRoutes } from "../routes";
import { closeBars, hideCursor, showCursor } from "../actions/interface";

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.resetInterval = this.resetInterval.bind(this);
  }

  resetInterval() {
    this.props.showCursor();
    clearTimeout(this.mouseTimer);
    this.mouseTimer = setTimeout(this.props.hideCursor, 2000);
  }

  render() {
    return (
      <div
        id="application"
        className={`fillScreen${this.props.cursorHidden ? " mouseGone" : ""}`}
        onMouseOver={this.props.closeBars}
        onClick={this.props.closeBars}
        onMouseMove={this.resetInterval}
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
  showCursor: () => dispatch(showCursor())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);

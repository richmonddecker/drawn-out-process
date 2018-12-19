import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import images from "../scripts/images";

import TwoButtons from "./TwoButtons";
import FullscreenButton from "./FullscreenButton";
import { openBars, closeBars } from "../actions/navigation.js";


class Configuration extends React.Component {
  render() {
    return (
      <div class="navigation-container">
        <div className="side-bar tool-bar" style={this.props.style}>
          <FullscreenButton />
          <TwoButtons />
        </div>
        <div class="bar-tab right-tab"
          onMouseOver={this.props.openBars}
          onClick={this.props.openBars}
        >
          <span id="rightTab">&#8647;</span>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  style: {
    right: state.navigation.barsOpen ? "0" : "-200px",
    opacity: state.navigation.barsOpen ? 1 : 0
  }
});

const mapDispatchToProps = (dispatch) => ({
  openBars: () => dispatch(openBars()),
  closeBars: () => dispatch(closeBars())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Configuration);

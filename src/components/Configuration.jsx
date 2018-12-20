import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import images from "../scripts/images";

import TwoButtons from "./TwoButtons";
import FullscreenButton from "./FullscreenButton";
import SidebarButtons from "./SidebarButtons";
import { openBars, closeBars } from "../actions/navigation.js";


class Configuration extends React.Component {
  render() {
    return (
      <div class="navigation-container">
        <div className="side-bar tool-bar" style={this.props.barStyle}>
          <FullscreenButton />
          <TwoButtons />
          <SidebarButtons />
        </div>
        <div class="bar-tab" style={this.props.tabStyle}
          onMouseOver={this.props.openBars}
          onClick={this.props.openBars}
        >
          <span id="rightTab">&#8647;</span>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const showBars = state.navigation.barsOpen ||  state.configuration.barLock;
  return ({
    barStyle : {
      right: showBars ? "0" : "-200px",
      opacity: showBars ? 1 : 0
    },
    tabStyle : {
      right: showBars ? "200px" : "0",
      opacity: showBars || !state.configuration.barTabs ? 0 : 1,
      width: showBars ? "0" : "30px"
    }
  });
};

const mapDispatchToProps = (dispatch) => ({
  openBars: () => dispatch(openBars()),
  closeBars: () => dispatch(closeBars())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Configuration);

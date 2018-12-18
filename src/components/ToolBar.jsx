import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import images from "../scripts/images";

import TwoButtons from "./TwoButtons";


const openFullScreen = () => {

};

class ToolBar extends React.Component {
  render() {
    return (
      <div className="side-bar tool-bar" style={this.props.style}>
        <TwoButtons />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  style: {
    right: state.navigation.barsOpen ? "0" : "-170px",
    opacity: state.navigation.barsOpen ? 1 : 0
  }
});


export default connect(
  mapStateToProps
)(ToolBar);

import React from "react";
import { connect } from "react-redux";

import left from "../images/left.png";
import right from "../images/right.png";

import { openBars } from "../actions/navigation";


const BarTab = (props) => (
  <div
    id={props.right ? "rightTab" : "leftTab"}
    className={`barTab ${props.isOpen ? "tabOpen" : "tabClosed"}${props.isHidden ? " tabHidden" : ""}`}
    onMouseOver={props.isOpen ? null : props.openBars}
    onClick={props.isOpen ? null : props.openBars}
  >
    <img
      width={50}
      height={50}
      src={props.right ? left : right}
    />
  </div>
);

const mapStateToProps = (state) => ({
  isOpen: state.navigation.barsOpen,
  isHidden: !state.configuration.barTabs
});

const mapDispatchToProps = (dispatch) => ({
  openBars: () => dispatch(openBars())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BarTab);

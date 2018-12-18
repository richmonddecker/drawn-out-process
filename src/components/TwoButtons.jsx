import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { pullTrigger } from "../actions/trigger.js";

const openFullScreen = () => {

};

const TwoButtons = (props) => (
  <div className="toolbar">
    <button onClick={props.save}>Save</button>
    <button onClick={props.reset}>Reset</button>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  save: () => dispatch(pullTrigger("saveFrame")),
  reset: () => dispatch(pullTrigger("resetFrame"))
});

export default connect(
  null,
  mapDispatchToProps
)(TwoButtons);

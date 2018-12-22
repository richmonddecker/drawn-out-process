import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Button } from "reactstrap";

import { pullTrigger } from "../actions/trigger.js";


const JumpButtons = (props) => (
  <div>
    <Button onClick={props.random}>Random</Button>
    <Button onClick={props.previous}>Previous</Button>
    <Button onClick={props.next}>Next
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  save: () => dispatch(pullTrigger("saveFrame")),
  reset: () => dispatch(pullTrigger("resetFrame"))
});

export default connect(
  null,
  mapDispatchToProps
)(JumpButtons);

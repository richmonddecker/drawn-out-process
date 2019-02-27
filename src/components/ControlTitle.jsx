import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { toggleInfo } from "../actions/configuration";


const ControlTitle = (props) => (
  <div>
    <Button
      color="warning"
      block
      size="lg"
      outline={!props.info}
      onClick={props.toggleInfo}
      disabled={!props.interactivity}
    >
      {props.member.title}
      {" "}
      <span role="emoji" ariaLabel="info">{props.info ? "ℹ️" : "❓"}</span>
    </Button>
  </div>
);


const mapStateToProps = (state) => ({
  info: state.configuration.info,
  interactivity: state.interface.interactivity
});

const mapDispatchToProps = (dispatch) => ({
  toggleInfo: () => dispatch(toggleInfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlTitle);
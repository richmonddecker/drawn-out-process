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
      outline={!props.showInfo}
      onClick={props.toggleInfo}
      disabled={!props.interactivity}
    >
      {props.title}
      {" "}
      <span role="emoji" ariaLabel="info">{props.showInfo ? "ℹ️" : "❓"}</span>
    </Button>
  </div>
);


const mapStateToProps = (state) => ({
  showInfo: state.configuration.info,
  title: state.interface.title,
  interactivity: state.interface.interactivity
});

const mapDispatchToProps = (dispatch) => ({
  toggleInfo: () => dispatch(toggleInfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlTitle);
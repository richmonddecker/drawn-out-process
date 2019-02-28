import React from "react";
import { connect } from "react-redux"; 
import { Button } from "reactstrap";
import { toggleInfo } from "../actions/interface";


const InfoButton = (props) => (
  <div>
    <Button
      color="success"
      block
      size="lg"
      outline={!props.showInfo}
      onClick={props.toggleInfo}
      disabled={!props.interactivity}
    >
      {props.title}
      {
        props.interactivity ?
          <span role="emoji" ariaLabel="info">{props.showInfo ? " ℹ️" : " ❓"}</span>
        :
          null
      }
    </Button>
  </div>
);


const mapStateToProps = (state) => ({
  showInfo: state.interface.info,
  title: state.interface.title,
  interactivity: state.interface.interactivity
});

const mapDispatchToProps = (dispatch) => ({
  toggleInfo: () => dispatch(toggleInfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoButton);
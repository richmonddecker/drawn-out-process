import React from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "reactstrap";

import { pullTrigger } from "../actions/trigger";


const TwoButtons = (props) => {
  return (
    <ButtonGroup>
      <Button
        className="halfButton"
        color="primary"
        disabled={!props.interactivity && !props.invalidUrl}
        onClick={props.save}
      >
        <span>Save </span>
        <span role="emoji" ariaLabel="save">💾</span>
      </Button>
      <Button
        className="halfButton"
        color="danger"
        disabled={!props.interactivity && !props.invalidUrl}
        onClick={props.reset}
      >
        <span>Reset </span>
        <span role="emoji" ariaLabel="reset">↩️</span>
      </Button>
    </ButtonGroup>
  );
};

const mapStateToProps = (state) => ({
  interactivity: state.interface.interactivity,
  invalidUrl: state.interface.invalidUrl
});

const mapDispatchToProps = (dispatch) => ({
  save: () => dispatch(pullTrigger("saveFrame")),
  reset: () => dispatch(pullTrigger("resetFrame")),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TwoButtons);

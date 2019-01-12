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
        onClick={props.save}
      >
        Save 💾
      </Button>
      <Button
        className="halfButton"
        color="warning"
        onClick={props.reset}
      >
        Reset ↩️
      </Button>
    </ButtonGroup>
  );
};

const mapDispatchToProps = (dispatch) => ({
  save: () => dispatch(pullTrigger("saveFrame")),
  reset: () => dispatch(pullTrigger("resetFrame"))
});

export default connect(
  null,
  mapDispatchToProps
)(TwoButtons);

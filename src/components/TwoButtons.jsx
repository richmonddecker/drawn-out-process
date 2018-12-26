import React from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "reactstrap";

import { pullTrigger } from "../actions/trigger";
import { BAR_WIDTH } from "../scripts/constants";


const TwoButtons = (props) => {
  const style = {width: BAR_WIDTH / 2};
  return (
    <ButtonGroup>
      <Button
        style={style}
        color="primary"
        onClick={props.save}
      >
        Save 💾
      </Button>
      <Button
        style={style}
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

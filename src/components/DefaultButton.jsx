import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";

import defaults from "../scripts/defaults";
import { setAttributes, setParameters } from "../actions/control";

const DefaultButton = ({ setDefaults }) => {
  return (
    <Button
      block
      color="warning"
      onClick={setDefaults}
    >
      Defaults
    </Button>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setDefaults: () => {
    dispatch(setParameters(
      ownProps.category,
      ownProps.element,
      defaults[ownProps.category][ownProps.element].parameters
    ));
    dispatch(setAttributes(
      ownProps.category,
      ownProps.element,
      defaults[ownProps.category][ownProps.element].attributes
    ));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(DefaultButton);

import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";

import { toggleFullScreen } from "../actions/configuration";
import { getContentFromTags } from "../scripts/organization";

const FullscreenButton = (props) => {
  const character = props.fullScreen ? <b>&#10539;</b> : <b>&#10542;</b>;
  return (
    <div>
      <Button
        color="info"
        block
        outline={!props.fullScreen}
        
        onClick={props.toggleFullScreen}
      >
        {"Full Screen     "}{character}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  fullScreen: state.configuration.fullScreen
})

const mapDispatchToProps = (dispatch) => ({
  toggleFullScreen: () => dispatch(toggleFullScreen())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullscreenButton);

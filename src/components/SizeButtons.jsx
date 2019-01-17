import React from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "reactstrap";

import { toggleSquareScreen, toggleFullScreen } from "../actions/configuration";

const SizeButtons = (props) => {
  return (
    <ButtonGroup>
      <Button
        className="halfButton"
        color="info"
        outline={!props.squareScreen}
        onClick={props.toggleSquareScreen}
      >
        {"Square     "}{props.squareScreen ? "⬜" : "⬛"}
      </Button>
      <Button
        className="halfButton"
        color="info"
        outline={!props.fullScreen}    
        onClick={props.toggleFullScreen}
      >
        {"Full     "}{props.fullScreen ? <b>&#10539;</b> : <b>&#10542;</b>}
      </Button>
    </ButtonGroup>
  );
};

const mapStateToProps = (state) => ({
  fullScreen: state.configuration.fullScreen,
  squareScreen: state.configuration.squareScreen
})

const mapDispatchToProps = (dispatch) => ({
  toggleFullScreen: () => dispatch(toggleFullScreen()),
  toggleSquareScreen: () => dispatch(toggleSquareScreen())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SizeButtons);

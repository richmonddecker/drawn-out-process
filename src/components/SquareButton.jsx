import React from "react";
import { connect } from "react-redux";
import { Button, Glyphicon } from "reactstrap";

import { toggleSquareScreen } from "../actions/configuration";
import { getContentFromTags } from "../scripts/organization";

const SquareButton = (props) => {
  const character = props.squareScreen ? "⬜" : "⬛";
  return (
    <div>
      <Button
        color="info"
        block
        outline={!props.squareScreen}
        onClick={props.toggleSquareScreen}
      >
        {"Square     "}{character}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  squareScreen: state.configuration.squareScreen
})

const mapDispatchToProps = (dispatch) => ({
  toggleSquareScreen: () => dispatch(toggleSquareScreen())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SquareButton);

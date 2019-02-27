import React from "react";
import { connect } from "react-redux";
import { toggleKeepCategory, toggleShuffle } from "../actions/configuration";
import { Button, ButtonGroup } from "reactstrap";

const JumpConfig = (props) => (
  <ButtonGroup>
    <Button
      className="halfButton"
      color="secondary"
      outline={!props.keepCategory}
      onClick={props.toggleKeepCategory}
    >
      {"Category "}{props.keepCategory ? "▶" : "⏩"}
    </Button>
    <Button
      className="halfButton"
      color="secondary"
      outline={!props.shuffle}    
      onClick={props.toggleShuffle}
    >
      {"Shuffle "}{props.shuffle ? "🔀" : "➡️"}
    </Button>
  </ButtonGroup>
);

const mapStateToProps = (state, ownProps) => ({
  keepCategory: state.configuration.keepCategory,
  shuffle: state.configuration.shuffle
});

const mapDispatchToProps = (dispatch) => ({
  toggleKeepCategory: () => dispatch(toggleKeepCategory()),
  toggleShuffle: () => dispatch(toggleShuffle())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JumpConfig);

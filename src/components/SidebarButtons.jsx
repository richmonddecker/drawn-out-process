import React from "react";
import { connect } from "react-redux";
import { Button, Glyphicon } from "reactstrap";

import { toggleBarTabs, toggleBarLock } from "../actions/configuration.js";

const SidebarButtons = (props) => {
  const character = props.fullScreen ? <b>&#10539;</b> : <b>&#10542;</b>;
  return (
    <div>
      <Button
        color="info"
        block
        outline={!props.barLock}
        onClick={props.toggleBarLock}
      >
        Bar Lock
      </Button>
      <Button
        color="info"
        block
        outline={!props.barTabs}
        onClick={props.toggleBarTabs}
      >
        Bar Tabs
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  barLock: state.configuration.barLock,
  barTabs: state.configuration.barTabs
})

const mapDispatchToProps = (dispatch) => ({
  toggleBarLock: () => dispatch(toggleBarLock()),
  toggleBarTabs: () => dispatch(toggleBarTabs())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarButtons);

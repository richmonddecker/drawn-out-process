import React from "react";
import { connect } from "react-redux";
import { Button, ButtonToolbar } from "reactstrap";

import { toggleBarTabs, toggleBarLock } from "../actions/configuration.js";

const SidebarButtons = (props) => {
  const lock = props.barLock ? <b>🔒</b> : <b>🔓</b>;
  const tab = props.barTabs ? <b>⬅️</b> : <b>⚫</b>
  return (
    <ButtonToolbar>
      <Button
        color="info"
        outline={!props.barLock}
        onClick={props.toggleBarLock}
      >
        Bar Lock {lock}
      </Button>
      <Button
        color="info"
        outline={!props.barTabs}
        onClick={props.toggleBarTabs}
      >
        Tabs {tab}
      </Button>
    </ButtonToolbar>
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

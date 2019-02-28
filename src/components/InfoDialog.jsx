import React from "react";
import { connect } from "react-redux";
import Modal from "react-awesome-modal";

import { toggleInfo } from "../actions/configuration";

const InfoDialog = (props) => {
  return (
    <Modal
      visible={props.isOpen}
      width={`${window.innerWidth - 500}`}
      height={`${window.innerHeight - 100}`}
      onClickAway={props.close}
    >
      HI THERE
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.configuration.info
});

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(toggleInfo())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoDialog);

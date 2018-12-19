import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Routes from "../routes";
import { closeBars } from "../actions/navigation.js";

const Application = ({ closeBars }) => (
  <div
    id="application"
    class="fill-screen"
    onMouseOver={closeBars}
    onClick={closeBars}
  >
    <Routes />
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  closeBars: () => dispatch(closeBars())
});

export default connect(
  null,
  mapDispatchToProps
)(Application);

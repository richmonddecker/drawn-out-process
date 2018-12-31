import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { ApplicationRoutes } from "../routes";
import { closeBars } from "../actions/navigation.js";

const Application = ({ closeBars }) => (
  <div
    id="application"
    className="fill-screen"
    onMouseOver={closeBars}
    onClick={closeBars}
  >
    <ApplicationRoutes />
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  closeBars: () => dispatch(closeBars())
});

export default connect(
  null,
  mapDispatchToProps
)(Application);

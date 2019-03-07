import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { CardBody } from "reactstrap";

const NavigationItem = (props) => (
  <NavLink to={props.match}>
    <CardBody style={props.active ? {"backgroundColor": "purple", "color": "white", "fontWeight": "bold", "cursor": "default"} : {}}>
      <img src={props.thumb} width={32} height={32} alt="" />
      <span style={{"padding-left": "7px"}}>{props.title}</span>
    </CardBody>
  </NavLink>
);

const mapStateToProps = (state, ownProps) => {
  const match = ownProps.url || `/${ownProps.category}/${ownProps.element}`;
  return ({
    match: match,
    active: match === state.router.location.pathname
  });
};

NavigationItem.propTypes = {
  category: PropTypes.string,
  element: PropTypes.string,
  url: PropTypes.string
};

export default connect(
  mapStateToProps
)(NavigationItem);

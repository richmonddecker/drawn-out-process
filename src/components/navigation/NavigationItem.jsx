import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { CardBody } from "reactstrap";

const NavigationItem = (props) => (
  <NavLink to={`/${props.category}/${props.element}`}>
    <CardBody>
      <img src={props.thumb} width={32} height={32} alt={`${props.element} Thumbnail`} />
      {"    "}
      {props.active ? <b><u>{props.title}</u></b> : <i>{props.title}</i>}
    </CardBody>
  </NavLink>
);

const mapStateToProps = (state, ownProps) => ({
  active: `/${ownProps.category}/${ownProps.element}` === state.router.location.pathname
});

NavigationItem.propTypes = {
  category: PropTypes.string,
  element: PropTypes.string,
  url: PropTypes.string
};

export default connect(
  mapStateToProps
)(NavigationItem);

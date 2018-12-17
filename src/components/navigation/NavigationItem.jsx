import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { CardBody } from "reactstrap";

const NavigationItem = (props) => (
  <NavLink to={props.url}>
    <CardBody>
      <img src={props.thumb} width={32} height={32} alt={`${props.thumb} Thumbnail`} />
      {"    "}
      {props.active ? <b><u>{props.name}</u></b> : <i>{props.name}</i>}
    </CardBody>
  </NavLink>
);

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.url === state.router.location.pathname
});

NavigationItem.propTypes = {
  name: PropTypes.string,
  thumb: PropTypes.string,
  url: PropTypes.string
};

export default connect(
  mapStateToProps
)(NavigationItem);

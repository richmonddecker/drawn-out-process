import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { CardHeader } from "reactstrap";

class NavigationHeader extends React.Component {
  render() {
    const navHeader = (
      <CardHeader>
        {this.props.title}
      </CardHeader>
    );
    const navLink = (
      <NavLink to={`/${this.props.tag}`}>
        {navHeader}
      </NavLink>
    );
    return this.props.open || this.props.empty ? navLink : navHeader;
  }
}

NavigationHeader.propTypes = {
  empty: PropTypes.bool,
  title: PropTypes.string,
  thumb: PropTypes.string,
  open: PropTypes.string,
  tag: PropTypes.string
};

export default NavigationHeader;

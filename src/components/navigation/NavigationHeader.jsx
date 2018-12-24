import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { CardHeader } from "reactstrap";

class NavigationHeader extends React.Component {
  render() {
    const navHeader = (
      <CardHeader>
        {this.props.name}
      </CardHeader>
    );
    const navLink = (
      <NavLink to={this.props.url}>
        {navHeader}
      </NavLink>
    );
    return this.props.open || !this.props.children ? navLink : navHeader;
  }
}

NavigationHeader.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  name: PropTypes.string,
  thumb: PropTypes.string,
  url: PropTypes.string
};

export default NavigationHeader;

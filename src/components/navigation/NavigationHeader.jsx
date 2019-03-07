import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { CardHeader } from "reactstrap";

class NavigationHeader extends React.Component {
  render() {
    let style = {"cursor": this.props.active && this.props.open ? "default": "pointer"};
    if (this.props.active) {
      style = {...style, "backgroundColor": "purple", "color": "white", "fontWeight": "bold"};
    } else if (this.props.parental && !this.props.invalidUrl) {
      style = {...style, "backgroundColor": "violet", "color": "white", "fontWeight": "bold"};
    }
    const navHeader = (
      <CardHeader style={style}>
        {this.props.title}
      </CardHeader>
    );
    const navLink = (
      <NavLink to={this.props.match}>
        {navHeader}
      </NavLink>
    );
    return this.props.open || this.props.empty ? navLink : navHeader;
  }
}

const mapStateToProps = (state, ownProps) => {
  const match = ownProps.url || `/${ownProps.tag}`;
  return ({
    match: match,
    active: state.router.location.pathname === match,
    invalidUrl: state.interface.invalidUrl,
    parental: state.router.location.pathname.startsWith(`/${ownProps.tag}`)
  });
};

NavigationHeader.propTypes = {
  category: PropTypes.string,
  element: PropTypes.string,
  url: PropTypes.string
};

export default connect(
  mapStateToProps
)(NavigationHeader);

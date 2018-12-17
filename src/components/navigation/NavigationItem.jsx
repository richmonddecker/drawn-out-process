import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { CardBody } from "reactstrap";

class NavigationItem extends React.Component {
  render() {
    return (
      <NavLink to={this.props.url}>
        <CardBody>
          <img src={this.props.thumb} width={32} height={32} alt={`${this.props.thumb} Thumbnail`} />
          {this.props.name}
        </CardBody>
      </NavLink>
    );
  }
}

NavigationItem.propTypes = {
  name: PropTypes.string,
  thumb: PropTypes.string,
  url: PropTypes.string
};

export default NavigationItem;

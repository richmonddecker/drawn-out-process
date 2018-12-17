import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Card, Collapse } from "reactstrap";
import NavigationHeader from "./NavigationHeader";

class NavigationSection extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {open: false};
    this.openSection = this.openSection.bind(this)
  }

  openSection() {
    console.log("CALLED");
    this.setState({open: true});
  }

  render() {
    return (
      <Card onClick={this.openSection}>
        <NavigationHeader open={this.state.open} {...this.props} />
        {this.props.children ?
          <Collapse isOpen={this.state.open}>
            {this.props.children}
          </Collapse>
          :
          null
        }
      </Card>
    );
  }
}

NavigationSection.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  thumb: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element)
};

export default NavigationSection;

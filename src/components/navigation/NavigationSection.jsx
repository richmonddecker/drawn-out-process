import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Collapse } from "reactstrap";
import NavigationHeader from "./NavigationHeader";
import { setOpenNavSection } from "../../actions/actions.js"

class NavigationSection extends React.Component {
  render() {
    return (
      <Card onClick={this.props.openSection}>
        <NavigationHeader open={this.props.open} {...this.props} />
        {this.props.children ?
          <Collapse isOpen={this.props.open}>
            {this.props.children}
          </Collapse>
          :
          null
        }
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  open: ownProps.url === state.navigation.openNavSection
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  openSection: () => dispatch(setOpenNavSection(ownProps.url))
});

NavigationSection.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  thumb: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationSection);

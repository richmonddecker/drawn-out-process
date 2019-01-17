import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Collapse } from "reactstrap";
import NavigationHeader from "./NavigationHeader";
import { setOpenNavSection } from "../../actions/interface";

class NavigationSection extends React.Component {
  render() {
    return (
      <Card onClick={this.props.openSection}>
        <NavigationHeader
          open={this.props.open}
          empty={this.props.empty}
          title={this.props.title}
          tag={this.props.tag}
          url={this.props.url}
        />
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
  empty: !Boolean(ownProps.children),
  open: ownProps.tag === state.interface.openNavSection
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  openSection: () => dispatch(setOpenNavSection(ownProps.tag))
});

NavigationSection.propTypes = {
  title: PropTypes.string,
  tag: PropTypes.string,
  thumb: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationSection);

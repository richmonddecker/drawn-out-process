import React from "react";
import { connect } from "react-redux";
import { getContentFromTags } from "../scripts/organization";
import { setCurrentElement } from "../actions/interface";
import NoMatch from "./NoMatch";

class Content extends React.Component {
  render() {
    const content = getContentFromTags(this.props.match.params.category, this.props.match.params.element);
    if (content === undefined) {
      return <NoMatch />;
    }
    if (content.component) {
      return <content.component {...this.props.match.params} {...content.member} />;
    }
    return <content.member.component {...this.props.match.params} {...content.member} />;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.category !== nextProps.match.params.category || this.props.match.params.element !== nextProps.match.params.element) {
      this.props.setCurrentElement(nextProps);
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  setCurrentElement: (props) => {
    const content = getContentFromTags(props.match.params.category, props.match.params.element);
    dispatch(setCurrentElement(content.tag, content.member.tag));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Content);

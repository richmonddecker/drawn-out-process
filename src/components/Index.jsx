import React from "react";
import { connect } from "react-redux";
import { getContentFromTag } from "../scripts/organization";
import { setCurrentElement, setCurrentInteractivity } from "../actions/interface";
import IndexThumb from "./IndexThumb";

class Index extends React.Component {
  render() {
    const content = getContentFromTag(this.props.match.params.category);
    return (
      <div className="page">
        <h1 className="pageTitle">{content.title}</h1>
        <br />
        <p>{content.info}</p>
        <div className="indexGrid">
          {content.members.map((member) => <IndexThumb member={member} category={content.tag} />)}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.setTheElement(this.props.category)
  }
};
  
const mapStateToProps = (state, ownProps) => ({
  category: ownProps.match.params.category
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setTheElement: (category) => {
    const content = getContentFromTag(category);
    dispatch(setCurrentElement(content.tag, content.tag, content.title));
    dispatch(setCurrentInteractivity(false));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
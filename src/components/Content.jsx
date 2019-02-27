import React from "react";
import { connect } from "react-redux";
import { getContentFromTags } from "../scripts/organization";
import { setCurrentElement, setCurrentPassivity, setCurrentInteractivity, setNext, setPrevious, setSlideshow, resetTimer } from "../actions/interface";
import { resetTrigger } from "../actions/trigger";
import { Tracker } from "../scripts/order";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.updateNextPrevious = this.updateNextPrevious.bind(this);
  }

  render() {
    const content = getContentFromTags(this.props.category, this.props.element);
    if (content.component) {
      return <content.component {...this.props.match.params} {...content.member} />;
    }
    return <content.member.component {...this.props.match.params} {...content.member} />;
  }

  componentWillReceiveProps(nextProps) {
    let different = false;
    if (this.props.category !== nextProps.category || this.props.element !== nextProps.element) {
      this.props.setTheElement(nextProps);
      this.props.resetTriggers();
      this.tracker.changeElement(nextProps.category, nextProps.element);
      different = true;
    }
    if (this.props.keepCategory !== nextProps.keepCategory) {
      this.tracker.handleKeepCategory(nextProps.keepCategory);
      different = true;
    }
    if (this.props.shuffle !== nextProps.shuffle) {
      this.tracker.handleShuffle(nextProps.shuffle);
      different = true;
    }
    if (different) {
      this.updateNextPrevious()
    }
  }

  componentDidMount() {
    this.tracker = new Tracker(this.props.category, this.props.element, this.props.keepCategory, this.props.shuffle);
    this.props.setTheElement(this.props);
    this.updateNextPrevious();
  }

  updateNextPrevious() {
    const next = this.tracker.nextElement();
    const previous = this.tracker.previousElement();
    this.props.setNext(next.category, next.tag);
    this.props.setPrevious(previous.category, previous.tag); 
  }
}

const mapStateToProps = (state, ownProps) => ({
  category: ownProps.match.params.category,
  element: ownProps.match.params.element,
  keepCategory: state.configuration.keepCategory,
  shuffle: state.configuration.shuffle
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setTheElement: (props) => {
    const content = getContentFromTags(props.match.params.category, props.match.params.element);
    dispatch(setCurrentElement(content.tag, content.member.tag));
    dispatch(setCurrentPassivity(content.passive));
    dispatch(setCurrentInteractivity(!content.noInteraction));
    if (content.passive !== true) {
      dispatch(setSlideshow(0));
      dispatch(resetTimer());
    }
  },
  resetTriggers: (props) => {
    dispatch(resetTrigger("saveFrame"));
    dispatch(resetTrigger("resetFrame"));
  },
  setNext: (category, element) => dispatch(setNext(category, element)),
  setPrevious: (category, element) => dispatch(setPrevious(category, element))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);

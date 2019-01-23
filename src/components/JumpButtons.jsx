import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Button, ButtonGroup } from "reactstrap";

import { getContentFromTags } from "../scripts/organization";

import { pullTrigger } from "../actions/trigger.js";


const JumpButtons = (props) => (
  <ButtonGroup>
    <Link to={props.previousUrl}>
      <Button
        color="success"
        className="halfButton"
      >
        <span>Prev </span>
        <img src={props.previousThumb} width={24} height={24} alt={props.previousTitle} />
      </Button>
    </Link>
    <Link to={props.nextUrl}>
      <Button
        color="success"
        className="halfButton"
      >
        <span>Next </span>
        <img src={props.nextThumb} width={24} height={24} alt={props.nextTitle} />
      </Button>
    </Link>
  </ButtonGroup>
);

const mapStateToProps = (state, ownProps) => {
  const nextMember = getContentFromTags(state.interface.next.category, state.interface.next.element);
  const previousMember = getContentFromTags(state.interface.previous.category, state.interface.previous.element);
  if (!nextMember || !previousMember) {
    return {nextUrl: "", previousUrl: ""};
  }
  return ({
    nextTitle: nextMember.member.title,
    previousTitle: previousMember.member.title,
    nextUrl: nextMember.url || `/${state.interface.next.category}/${state.interface.next.element}`,
    previousUrl: previousMember.url || `/${state.interface.previous.category}/${state.interface.previous.element}`,
    nextThumb: nextMember.member.thumbnail,
    previousThumb: previousMember.member.thumbnail
  });
};

const mapDispatchToProps = (dispatch) => ({
  // save: () => dispatch(pullTrigger("saveFrame")),
  // reset: () => dispatch(pullTrigger("resetFrame"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JumpButtons);

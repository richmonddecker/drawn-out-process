import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Button, ButtonGroup } from "reactstrap";

import { getContentFromTags } from "../scripts/organization";

import { pullTrigger } from "../actions/trigger.js";


const JumpButtons = (props) => {
  const prevButton = (
    <Button
      color="success"
      className="halfButton"
      disabled={!props.interactivity}
    >
      <span>Prev </span>
      <img src={props.interactivity ? props.previousThumb : null} width={24} height={24} />
    </Button>
  );
  const nextButton = (
    <Button
      color="success"
      className="halfButton"
      disabled={!props.interactivity}
    >
      <span>Next </span>
      <img src={props.interactivity ? props.nextThumb : null} width={24} height={24} />
    </Button>
  );

  const showButton = (url, button) => (
    props.interactivity ?
      <Link to={url}>
        {button}
      </Link>
    :
      button
  )

  return (
    <ButtonGroup>
      {showButton(props.previousUrl, prevButton)}
      {showButton(props.nextUrl, nextButton)}
    </ButtonGroup>
  );
};

const mapStateToProps = (state, ownProps) => {
  const nextMember = getContentFromTags(state.interface.next.category, state.interface.next.element);
  const previousMember = getContentFromTags(state.interface.previous.category, state.interface.previous.element);
  if (!nextMember || !previousMember) {
    console.log("DERES NUTHIN")
    return {
      interactivity: state.interface.interactivity,
      nextUrl: "",
      previousUrl: ""
    };
  }
  return ({
    interactivity: state.interface.interactivity,
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

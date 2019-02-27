import React from "react";
import { getContentFromTags, getContentFromTag } from "../scripts/organization";
import NoMatch from "./NoMatch";
import Content from "./Content";
import Index from "./Index";

export const ContentFilter = (props) => {
  const content = getContentFromTags(props.match.params.category, props.match.params.element);
  if (content === undefined) {
    return <NoMatch />;
  }
  return <Content {...props} />;
};

export const IndexFilter = (props) => {
  const content = getContentFromTag(props.match.params.category);
  if (content === undefined) {
    return <NoMatch />;
  }
  return <Index {...props} />;
};
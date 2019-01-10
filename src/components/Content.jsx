import React from "react";
import { getContentFromTags } from "../scripts/organization";
import NoMatch from "./NoMatch";

const Content = ({ match }) => {
  const content = getContentFromTags(match.params.category, match.params.element);
  if (content === undefined) {
    return <NoMatch />;
  }
  if (content.component) {
    return <content.component {...match.params} {...content.member} />;
  }
  return <content.member.component {...match.params} {...content.member} />;
};

export default Content;

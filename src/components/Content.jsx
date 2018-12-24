import React from "react";
import { getContentFromTags } from "../scripts/organization";

const Content = ({ match }) => {
  const content = getContentFromTags(match.params.category, match.params.element);
  return <content.component {...content.member} />;
};

export default Content;

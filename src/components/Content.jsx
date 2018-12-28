import React from "react";
import { getContentFromTags } from "../scripts/organization";

const Content = ({ match }) => {
  const content = getContentFromTags(match.params.category, match.params.element);
  return <content.component {...match.params} {...content.member} />;
};

export default Content;

import React from "react";
import { getContentFromTag } from "../scripts/organization";
import NoMatch from "./NoMatch";

const Index = ({ match }) => {
  const content = getContentFromTag(match.params.category);
  if (content === undefined) {
    return <NoMatch />;
  }
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.info}</p>
    </div>
  );
};

export default Index;
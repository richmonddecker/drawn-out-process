import React from "react";
import { getContentFromTags } from "../scripts/organization";
import ParameterControl from "./ParameterControl";
import AttributeControl from "./AttributeControl";

const Control = ({ match }) => {
  const content = getContentFromTags(match.params.category, match.params.element);
  return (
    <div>
      {content.member.parameters && content.member.parameters.map((parameter) => (
        <ParameterControl category={content.tag} element={content.member.tag} {...parameter} />
      ))}
      {content.member.attributes && content.member.attributes.map((attribute) => (
        <AttributeControl category={content.tag} element={content.member.tag} {...attribute} />
      ))}
    </div>
  );
};

export default Control;
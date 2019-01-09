import React from "react";
import { getContentFromTags } from "../scripts/organization";
import ParameterControl from "./ParameterControl";
import AttributeControl from "./AttributeControl";
import DefaultButton from "./DefaultButton";



const Control = ({ match }) => {
  const content = getContentFromTags(match.params.category, match.params.element);
  const areParameters = Boolean(content.member.parameters);
  const areAttributes = Boolean(content.member.attributes);
  return (
    <div>
      {areParameters ? <b>Parameters</b> : null}
      {areParameters && content.member.parameters.map((parameter) => (
        <ParameterControl
          category={content.tag}
          element={content.member.tag}
          key={`${content.tag}.${content.member.tag}.${parameter.tag}`}
          {...parameter}
        />
      ))}
      {areAttributes ? <div><b>Attributes</b><span>(Must "Reset")</span></div> : null}
      {areAttributes && content.member.attributes.map((attribute) => (
        <AttributeControl
          category={content.tag}
          element={content.member.tag}
          key={`${content.tag}.${content.member.tag}.${attribute.tag}`}
          {...attribute}
        />
      ))}
      {areParameters || areAttributes ? <DefaultButton category={content.tag} element={content.member.tag} /> : null}
    </div>
  );
};

export default Control;
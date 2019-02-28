import React from "react";
import { connect } from "react-redux";
import { getContentFromTags } from "../scripts/organization";
import ParameterControl from "./ParameterControl";
import AttributeControl from "./AttributeControl";
import DefaultButton from "./DefaultButton";


const Control = ({ category, element }) => {
  const content = getContentFromTags(category, element);
  if (content === undefined) {
    return null;
  }
  const areParameters = Boolean(content.member.parameters);
  const areAttributes = Boolean(content.member.attributes);
  return (
    <div>
      {areParameters || areAttributes ? <DefaultButton category={content.tag} element={content.member.tag} /> : null}
      {areAttributes ? <h6 className="line"><span className="line">Attributes <i>("Reset")</i></span></h6> : null}
      {areAttributes && content.member.attributes.map((attribute) => (
        <AttributeControl
          category={content.tag}
          element={content.member.tag}
          key={`${content.tag}.${content.member.tag}.${attribute.tag}`}
          {...attribute}
        />
      ))}
      {areParameters ? <h6 className="line"><span className="line">Parameters</span></h6> : null}
      {areParameters && content.member.parameters.map((parameter) => (
        <ParameterControl
          category={content.tag}
          element={content.member.tag}
          key={`${content.tag}.${content.member.tag}.${parameter.tag}`}
          {...parameter}
        />
      ))}
      <h4 className="line"></h4>
    </div>
  );
};

const mapStateToProps = (state) => ({
  category: state.interface.category,
  element: state.interface.element
});

export default connect(mapStateToProps)(Control);
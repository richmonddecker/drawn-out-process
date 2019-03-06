import React from "react";
import { connect } from "react-redux";
import Modal from "react-awesome-modal";

import { getContentFromTags } from "../scripts/organization";
import { toggleInfo } from "../actions/interface";

const InfoDialog = (props) => {
  const content = getContentFromTags(props.category, props.element);
  if (content === undefined) {
    return null;
  }

  const variableLine = (parameter) => (
    <li>
      <b>{parameter.title}</b>
      {parameter.info ? <span><b>: </b>{parameter.info}</span> : null}
    </li>
  );

  return (
    <Modal
      visible={props.isOpen}
      width={`${props.window.width - 500}`}
      height={`${props.window.height - 100}`}
      
    >
      <div className="dialogBox">
        <h2>{content.member.title}</h2>
        <p>{content.member.info}</p>
        {
          content.member.attributes ?
            <div>
              <h4>Attributes</h4>
              <ul>
                {content.member.attributes.map(variableLine)}
              </ul>
            </div>
          :
            null
        }
        {
          content.member.parameters ? 
            <div>
              <h4>Parameters</h4>
              <ul>
                {content.member.parameters.map(variableLine)}
              </ul>
            </div>
          :
            null
        }
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.interface.info,
  category: state.interface.category,
  element: state.interface.element,
  window: state.interface.window
});

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(toggleInfo())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoDialog);

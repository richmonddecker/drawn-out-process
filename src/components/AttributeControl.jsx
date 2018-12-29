import React from "react";
import { connect } from "react-redux";
import { setAttribute } from "../actions/control";

const AttributeControl = (props) => {
  const display = props.change || props.value;
  const current = props.change && props.change != props.value ? props.value : null;
  const parentheses = current ? <span>({current})</span> : <span />
  return (
    <div>
      <label htmlFor={props.tag}>{props.title}: {parentheses}</label>
      <input
        type="text"
        value={display}
        onChange={props.update}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  value: state.control[ownProps.category][ownProps.element].attributes[ownProps.tag],
  change: state.control[ownProps.category][ownProps.element].changes[ownProps.tag]

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  update: ({target}) => dispatch(setAttribute(ownProps.category, ownProps.element, ownProps.tag, target.value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttributeControl);

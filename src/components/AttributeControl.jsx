import React from "react";
import { connect } from "react-redux";
import { setAttribute } from "../actions/control";

const AttributeControl = (props) => {
  const display = props.change !== undefined ? props.change : props.value;
  const current = props.change !== undefined && props.change != props.value ? props.value : null;
  const parentheses = current ? <span>({current})</span> : <span />
  return (
    <div>
      <label htmlFor={props.tag}>{props.title}: {parentheses}</label>
      <br/>
      <props.widget
        value={display}
        onChange={props.update}
        {...props.widgetProps}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  value: state.control[ownProps.category][ownProps.element].attributes[ownProps.tag],
  change: state.control[ownProps.category][ownProps.element].changes[ownProps.tag]

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  update: (val) => {
    let value = val.target ? val.target.value : val;
    if (ownProps.map) {
      value = ownProps.map(value);
    } else if (value.value) {
      value = value.value;
    }
    dispatch(setAttribute(ownProps.category, ownProps.element, ownProps.tag, value))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttributeControl);

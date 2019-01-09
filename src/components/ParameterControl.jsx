import React from "react";
import { connect } from "react-redux";
import { setParameter } from "../actions/control";
import { BAR_WIDTH } from "../scripts/constants";

const ParameterControl = (props) => {
  return (
    <div>
      <label htmlFor={props.tag}>{props.title}:</label>
      <br/>
      <props.widget
        value={props.value}
        onChange={props.update}
        {...props.widgetProps}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  value: state.control[ownProps.category][ownProps.element].parameters[ownProps.tag]
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  update: (val) => {
    let value = val;
    if (ownProps.widget.map) {
      value = ownProps.widget.map(value);
    }
    if (ownProps.map) {
      value = ownProps.map(value);
    }
    dispatch(setParameter(ownProps.category, ownProps.element, ownProps.tag, value))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParameterControl);

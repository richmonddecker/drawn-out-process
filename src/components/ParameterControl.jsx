import React from "react";
import { connect } from "react-redux";
import { setParameter } from "../actions/control";
import { BAR_WIDTH } from "../scripts/constants";

const ParameterControl = (props) => {
  return (
    <div>
      <label htmlFor={props.tag}>{props.title}:</label>
      <props.widget
        value={props.value}
        onChange={props.update}
        {...props.widgetProps}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  value: state.control[ownProps.category][ownProps.element].parameters[ownProps.tag],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  update: (val) => {
    console.log("VAL MIN MAX", val, ownProps.min, ownProps.max)
    if (ownProps.widgetProps.min && val < ownProps.widgetProps.min) {
      console.log("IT HAPPENED");
      val = ownProps.widgetProps.min;
    }
    if (ownProps.widgetProps.max && val > ownProps.widgetProps.max) {
      val = ownProps.widgetProps.max;
    }
    dispatch(setParameter(ownProps.category, ownProps.element, ownProps.tag, val));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParameterControl);

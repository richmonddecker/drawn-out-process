import React from "react";
import { connect } from "react-redux";
import { setParameter } from "../actions/control";

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
  update: (val) => dispatch(setParameter(ownProps.category, ownProps.element, ownProps.tag, val))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParameterControl);

import React from "react";
import NumericInput from "react-numeric-input";
import Dropdown from "react-dropdown";
import Switch from "react-switch";
import "react-dropdown/style.css";
import { HuePicker } from "react-color";

export const NumberWidget = (props) => (
  <NumericInput
    className="numberWidget"

    {...props}
  />
);

export class ChoiceWidget extends React.Component {
  render() {
    return <Dropdown {...this.props} />;
  }

  static map(thing) {
    return thing.value;
  }
}

export class TextWidget extends React.Component {
  render() {
    return <input type="text" {...this.props} />;
  }

  static map(thing) {
    return thing.target.value;
  }
}

export class ColorWidget extends React.Component {
  render() {
    return <HuePicker width={200} color={this.props.value} {...this.props} />;
  }

  static map(thing) {
    return thing.hex;
  }
}


export class CheckboxWidget extends React.Component {
  render() {
    return <Switch checked={this.props.value} {...this.props} />;
  }

  static map(thing) {
    return thing;
  }
}
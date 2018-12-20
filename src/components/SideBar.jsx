import React from "react";
import TwoButtons from "./TwoButtons";
import FullscreenButton from "./FullscreenButton";

const ConfigurationBar = (props) => (
  <div class="navigation-container">
    <div className="side-bar tool-bar" style={this.props.style}>
      <FullscreenButton />
      <TwoButtons />
    </div>
  </div>
);

export default ConfigurationBar;

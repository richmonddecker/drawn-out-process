import React from "react";
import TwoButtons from "./TwoButtons";
import CanvasControls from "./controls/CanvasControls";

const GenerativeConfiguration = ({match}) => (
  <div>
    <CanvasControls category="generative" name={match.params.name} />
    <TwoButtons />
  </div>
);

export default GenerativeConfiguration;

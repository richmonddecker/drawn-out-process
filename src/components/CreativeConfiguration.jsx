import React from "react";
import TwoButtons from "./TwoButtons";
import CanvasControls from "./controls/CanvasControls";

const CreativeConfiguration = ({match}) => (
  <div>
    <CanvasControls category="creative" name={match.params.name} />
    <TwoButtons />
  </div>
);

export default CreativeConfiguration;

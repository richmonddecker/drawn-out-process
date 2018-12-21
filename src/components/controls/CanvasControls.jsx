import React from "react";
import ChordArtControls from "./ChordArtControls";

const controls = {
  creative: {
    "chord-art": <ChordArtControls />
  },
  generative: {}
};

const CanvasControls = ({category, name}) => (
  <div>
    {controls[category][name]}
  </div>
);

export default CanvasControls;

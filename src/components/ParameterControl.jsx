import React from "react";
import { connect } from "react-redux";
import { Button, Glyphicon } from "reactstrap";
import { Control, Form, actions } from "react-redux-form";
import Slider from "@material-ui/lab/Slider";

const ParameterControl = (props) => {
  const path = (label) => `controls.chord-art.${label}`;
  return (
    <div>
      <label htmlFor={path("hueCycles")}>Hue Cycles:</label>
      <Control
        model={path("hueCycles")}
        id={path("hueCycles")}
        component={Slider}
        controlProps={{
          min: 0,
          max: 100,
          step: 1
        }}
      />
    </div>
  );
};

export default ChordArtControls;

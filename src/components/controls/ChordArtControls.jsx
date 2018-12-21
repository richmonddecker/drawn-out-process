import React from "react";
import { connect } from "react-redux";
import { Button, Glyphicon } from "reactstrap";
import { Control, Form, actions } from "react-redux-form";

const ChordArtControls = (props) => {
  const path = (label) => `controls.chord-art.${label}`;
  return (
    <Form
      model="controls.chord-art"
    >
      <label htmlFor={path("hueCycles")}>Hue Cycles:</label>
      <Control.text model={path("hueCycles")} id={path("hueCycles")} />

      <label htmlFor={path("hueOffset")}>Hue Offset:</label>
      <Control.text model={path("hueOffset")} id={path("hueOffset")} />

      <label htmlFor={path("lineSpeed")}>Line Speed:</label>
      <Control.text model={path("lineSpeed")} id={path("lineSpeed")} />

      <label htmlFor={path("lineThickness")}>Line Thickness:</label>
      <Control.text model={path("lineThickness")} id={path("lineThickness")} />

      <label htmlFor={path("lineOpacity")}>Line Opacity:</label>
      <Control.text model={path("lineOpacity")} id={path("lineOpacity")} />

      <label htmlFor={path("spanPower")}>Span Power:</label>
      <Control.text model={path("spanPower")} id={path("spanPower")} />

      <label htmlFor={path("colorPower")}>Color Power:</label>
      <Control.text model={path("colorPower")} id={path("colorPower")} />

    </Form>
  );
};

export default ChordArtControls;

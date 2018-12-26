import React from "react";
import { connect } from "react-redux";
import { Button, Glyphicon } from "reactstrap";
import { Control, Form, actions } from "react-redux-form";
import Slider from "@material-ui/lab/Slider";

const ChordArtControls = (props) => {
  const path = (label) => `controls.chord-art.${label}`;
  return (
    <Form
      model="controls.chord-art"
    >
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

      <label htmlFor={path("hueOffset")}>Hue Offset:</label>
      <Control
        model={path("hueOffset")}
        id={path("hueOffset")}
        component={Slider}
        controlProps={{
          min: 0,
          max: 360,
          step: 1
        }}
      />

      <label htmlFor={path("lineSpeed")}>Line Speed:</label>
      <Control
        model={path("lineSpeed")}
        id={path("lineSpeed")}
        component={Slider}
        controlProps={{
          min: 0,
          max: 50000,
          step: 1000
        }}
      />

      <label htmlFor={path("lineThickness")}>Line Thickness:</label>
      <Control
        model={path("lineThickness")}
        id={path("lineThickness")}
        component={Slider}
        controlProps={{
          min: 1,
          max: 100,
          step: 1
        }}
      />

      <label htmlFor={path("lineOpacity")}>Line Opacity:</label>
      <Control
        model={path("lineOpacity")}
        id={path("lineOpacity")}
        component={Slider}
        controlProps={{
          min: 0,
          max: 100,
          step: 1
        }}
      />

      <label htmlFor={path("spanPower")}>Span Power:</label>
      <Control
        model={path("spanPower")}
        id={path("spanPower")}
        component={Slider}
        controlProps={{
          min: 0,
          max: 10,
          step: 0.1
        }}
      />

      <label htmlFor={path("colorPower")}>Color Power:</label>
      <Control
        model={path("colorPower")}
        id={path("colorPower")}
        component={Slider}
        controlProps={{
          min: 0,
          max: 10,
          step: 0.1
        }}
      />

    </Form>
  );
};

export default ChordArtControls;

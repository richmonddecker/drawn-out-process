import React from "react";
import P5Canvas from "./P5Canvas";
import sketches from "../scripts/sketches";

const P5Container = (props) => (
  <P5Canvas
    sketch={props.sketch}
    name={props.tag}
    {...props}
  />
);

export default P5Container;
import React from "react";
import P5Canvas from "./P5Canvas";
import sketches from "../scripts/sketches";

const P5Container = (props) => (
  <P5Canvas
    sketch={sketches[props.match.params.name]}
    name={props.match.params.name}
    {...props}
  />
);

export default P5Container;
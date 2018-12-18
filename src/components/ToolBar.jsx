import React from "react";
import { Link, NavLink } from "react-router-dom";
import images from "../scripts/images";


const openFullScreen = () => {

};

class NavigationBar extends React.Component {
  render() {
    return (
      <div className="toolbar">
        <button onClick={() =>alert("hi")}>hi</button>
      </div>
    );
  }
}


export default NavigationBar;

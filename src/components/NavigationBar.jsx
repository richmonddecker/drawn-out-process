import React from "react";
import { Link, NavLink } from "react-router-dom";
import NavigationSection from "./navigation/NavigationSection";
import NavigationHeader from "./navigation/NavigationHeader";
import NavigationItem from "./navigation/NavigationItem";
import images from "../scripts/images";

class NavigationBar extends React.Component {
  render() {
    return (
      <div className="sidenav">
        <NavigationSection url="/" name="Home"/>
        <NavigationSection url="/creative" name="Creative">
          <NavigationItem url="/creative/chord-art" name="Chord Art" />
        </NavigationSection>
        <NavigationSection url="/generative" name="Generative">
          <NavigationItem url="/generative/targets" name="Targets" />
        </NavigationSection>
        <NavigationSection url="/repetitive" name="Repetitive">
          <NavigationItem url="/repetitive/kochpinski" name="Kochpinski" thumb={images["kochpinski"]} />
          <NavigationItem url="/repetitive/snowflake" name="Snowflake" thumb={images["snowflake"]} />
          <NavigationItem url="/repetitive/plasma-ball" name="Plasma Ball" thumb={images["plasma-ball"]} />
        </NavigationSection>
      </div>
    );
  }
}


export default NavigationBar;

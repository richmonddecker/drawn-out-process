import React from "react";
import { Link, NavLink } from "react-router-dom";
import NavigationSection from "./navigation/NavigationSection";
import NavigationHeader from "./navigation/NavigationHeader";
import NavigationItem from "./navigation/NavigationItem";
import images from "../scripts/images";

class Navigation extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: true
    };
  }

  handleSelect(activeKey) {
    console.log("Activedd key is: ", activeKey);
    this.setState({ activeKey });
  }

  render() {
    //console.log("ACTIVE KEY IS: ", this.state.activeKey);
    return (
      <div className="sidenav">
        <NavigationSection url="/" name="Home"/>
        <NavigationSection url="/creative" name="Creative">
          <NavigationItem url="/creative/chord-art" name="Chord Art" />
        </NavigationSection>
        <NavigationSection url="/generative" name="Generative" />
        <NavigationSection url="/repetitive" name="Repetitive">
          <NavigationItem url="/repetitive/kochpinski" name="Kochpinski" thumb={images["kochpinski"]} />
          <NavigationItem url="/repetitive/snowflake" name="Snowflake" thumb={images["snowflake"]} />
          <NavigationItem url="/repetitive/plasma-ball" name="Plasma Ball" thumb={images["plasma-ball"]} />
        </NavigationSection>
      </div>
    );
  }
}


export default Navigation;

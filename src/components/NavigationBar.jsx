import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import NavigationSection from "./navigation/NavigationSection";
import NavigationHeader from "./navigation/NavigationHeader";
import NavigationItem from "./navigation/NavigationItem";
import images from "../scripts/images";

import { openBars, closeBars } from "../actions/navigation.js";

class NavigationBar extends React.Component {
  render() {
    return (
      <div
        onMouseOver={this.props.openBars}
        onMouseLeave={this.props.closeBars}
        onclick={this.props.openBars}
        onblur={this.props.openBars}
      >
        <div className="side-bar navigation-bar" style={this.props.style}>
          <NavigationSection url="/" name="Home"/>
          <NavigationSection url="/creative" name="Creative">
            <NavigationItem url="/creative/chord-art" name="Chord Art" thumb={images["chord-art"]} />
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
        <div class="bar-tab" id="myTab"
        >
          <span id="myArrow">&#8649;</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  style : {
    left: state.navigation.barsOpen ? "0" : "-170px",
    opacity: state.navigation.barsOpen ? 1 : 0
  }
});

const mapDispatchToProps = (dispatch) => ({
  openBars: () => dispatch(openBars()),
  closeBars: () => dispatch(closeBars())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);

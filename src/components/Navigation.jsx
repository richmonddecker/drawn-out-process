import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import NavigationSection from "./navigation/NavigationSection";
import NavigationHeader from "./navigation/NavigationHeader";
import NavigationItem from "./navigation/NavigationItem";
import images from "../scripts/images";

import { openBars, closeBars } from "../actions/navigation.js";

class Navigation extends React.Component {
  render() {
    return (
      <div id="navigation-container">
        <div className="side-bar navigation-bar" style={this.props.barStyle}>
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
            <NavigationItem url="/repetitive/xt-square" name="XT-Square" thumb={images["xt-square"]} />
            <NavigationItem url="/repetitive/hexagon-star" name="Hexagon Star" thumb={images["hexagon-star"]} />
            <NavigationItem url="/repetitive/pentaspiral" name="Pentaspiral" thumb={images["pentaspiral"]} />
            <NavigationItem url="/repetitive/oscillating-rose" name="Oscillating Rose" thumb={images["oscillating-rose"]} />
          </NavigationSection>
        </div>
        <div class="bar-tab" id="myTab" style={this.props.tabStyle}
          onMouseOver={this.props.openBars}
          onClick={this.props.openBars}
        >
          <span id="leftTab">&#8649;</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const showBars = state.navigation.barsOpen ||  state.configuration.barLock;
  return ({
    barStyle : {
      left: showBars ? "0" : "-200px",
      opacity: showBars ? 1 : 0
    },
    tabStyle : {
      left: showBars ? "200px" : "0",
      opacity: showBars || !state.configuration.barTabs ? 0 : 1,
      width: showBars ? "0" : "30px"
    }
  });
};

const mapDispatchToProps = (dispatch) => ({
  openBars: () => dispatch(openBars()),
  closeBars: () => dispatch(closeBars())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);

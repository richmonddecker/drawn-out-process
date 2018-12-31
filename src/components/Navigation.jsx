import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import NavigationSection from "./navigation/NavigationSection";
import NavigationHeader from "./navigation/NavigationHeader";
import NavigationItem from "./navigation/NavigationItem";
import { contents } from "../scripts/organization";

import { openBars, closeBars } from "../actions/navigation.js";

class Navigation extends React.Component {
  render() {
    return (
      <div id="navigation-container">
        <div className="side-bar navigation-bar" style={this.props.barStyle}>
          <NavigationSection url="/" name="Home"/>
          {
            contents.map((category) => (
              <NavigationSection title={category.title} tag={category.tag} key={category.tag}>
                {
                  category.members.map((element) => (
                    <NavigationItem
                      category={category.tag}
                      element={element.tag}
                      title={element.title}
                      thumb={element.thumbnail}
                      key={element.tag}
                    />
                  ))
                }
              </NavigationSection>
            ))
          }
        </div>
        <div className="bar-tab" id="myTab" style={this.props.tabStyle}
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

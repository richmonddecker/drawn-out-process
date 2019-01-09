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
          {
            contents.map((category) => (
              <NavigationSection
                title={category.title}
                tag={category.tag}
                key={category.tag}
                url={category.url}
              >
                {
                  category.members.map((element) => (
                    <NavigationItem
                      category={category.tag}
                      element={element.tag}
                      title={element.title}
                      thumb={element.thumbnail}
                      key={element.tag}
                      url={element.url}
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
      left: showBars ? "0" : "-250px",
      opacity: showBars ? 1 : 0
    },
    tabStyle : {
      left: showBars ? "250px" : "0",
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

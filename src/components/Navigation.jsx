import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import NavigationSection from "./navigation/NavigationSection";
import NavigationHeader from "./navigation/NavigationHeader";
import NavigationItem from "./navigation/NavigationItem";
import { contents } from "../scripts/organization";
import BarTab from "./BarTab";


const Navigation = ({ barClass }) => (
  <div>
    <div id="leftBar" className={barClass}>
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
    <BarTab />
  </div>
);

const mapStateToProps = (state) => ({
  barClass: `sideBar ${state.navigation.barsOpen ? "barOpen" : "barClosed"}`
});

export default connect(
  mapStateToProps
)(Navigation);

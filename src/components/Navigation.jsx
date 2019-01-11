import React from "react";
import NavigationSection from "./navigation/NavigationSection";
import NavigationHeader from "./navigation/NavigationHeader";
import NavigationItem from "./navigation/NavigationItem";
import { contents } from "../scripts/organization";
import BarTab from "./BarTab";


const Navigation = ({ isOpen }) => (
  <div>
    <div id="leftBar" className={`sideBar ${isOpen ? "barOpen" : "barClosed"}`}>
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
    <BarTab isOpen={isOpen} />
  </div>
);

export default Navigation;

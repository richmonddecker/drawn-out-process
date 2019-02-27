import React from "react";

const Instructions = (props) => (
  <div className="page">
    <h1 className="pageTitle">Instructions</h1>
    <br/>
    <h2 className="sectionHead">Navigation Bar</h2>
    <p>
      The Navigation Bar is located on the left, and allows you to easily navigate to anywhere on the site.
      All content is sorted into categories. The highlighted backgrounds indicate your current position.
    </p>
    <p>
      To explore your options, click on the category name to open that category's contents.
      Then click on the page you would like to visit. Double clicking a category name takes you to its index page.
    </p>
    <br/>
    <h2 className="sectionHead">Configuration Bar</h2>
    <p>
      The Configuration Bar is located on the left, and allows you to control your experience.
      The four buttons in the upper right control the appearance of the website and sidebars.
    </p>
    <p>
      To explore your options, click on the category name to open that category's contents.
      Then click on the page you would like to visit. Double clicking a category name takes you to its index page.
    </p>
  </div>
);

export default Instructions;

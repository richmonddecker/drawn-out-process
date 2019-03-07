import React from "react";

const Instructions = (props) => (
  <div className="page home">
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
      The Configuration Bar is located on the right, and allows you to control your experience.
      The four buttons in the Display section control the appearance of the website and sidebars:
      full screen, square screen, and whether the sidebars are locked or the tabs are hidden.
    </p>
    <p>
      The Route section helps you navigate your journey through the site. You can choose to remain
      in a single category or not, and shuffle the order of the content. A slideshow option is also 
      available to switch through passive content at a fixed rate. Remember you can always navigate to
      a particular element using the Navigation Bar.
    </p>
    <h2 className="sectionHead">Control Section</h2>
    <p>
      The Control section can be complicated, but gives you a lot of power. There is an Information button,
      which will pop up a dialog box with information about a given page. The Save button will download the
      current canvas as an image or video file, and Reset will restart the canvas. When present, the Defaults
      button resets an element's settings to the programmed default values.
    </p>
    <p>
      There are two similar ways to control content elements: Parameters and Attributes. These are basically the same,
      in that they allow you to change some value, such as the size of an object, the thickness of a line, a color, or
      any number of variables. The difference is simple. Parameter values are updated immediately as they are changed.
      In order for an Attribute's value to be updated, the canvas must be reset after its value is changed.
    </p>
    <h2 className="sectionHead">Key Shortcuts</h2>
    <p>
      This section is totally optional, and only relevant for computer viewing. These keyboard shortcuts work when the focus
      if off the sidebars. That is, once you have clicked on a page or POD. Lower or upper case work.
    </p>
    <ul style={{"color": "orange"}}>
      <li>F – toggle full screen</li>
      <li>B – lock/unlock the sidebars</li>
      <li>T – toggle on/off the side tabs</li>
      <li>X – toggle on/off "Square Screen" mode</li>
      <li>R – reset the POD</li>
      <li>S – save the current canvas</li>
      <li>C – toggle "One Category" mode</li>
      <li>M – toggle the shuffle mode in navigation</li>
      <li>P – jump to the previous POD</li>
      <li>N – jump to the next POD</li>
      <li>I – display info about the current POD</li>
    </ul>
  </div>
);

export default Instructions;

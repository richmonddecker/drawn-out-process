import React from "react";

const Technical = (props) => (
  <div className="page">
    <h1 className="pageTitle">Technical</h1>
    <br/>
    <h2 className="sectionHead">Website</h2>
    <p>
      The website itself is programmed using React and Redux. React is a Javascript framework by Facebook which
      allows the programmer to define and display custom components, allowing for the customized display that you see.
      Redux is a library for state management, which helps me ensure that the many components of the website work in sync.
      For example, all settings of the Configuration Bar, are controlled globally, and these settings are read and used
      by all components that need this information.
    </p>
    <p>
      The site uses React Router, which is a cool way to route URLs in a single page app. What this means, is that the whole
      website is in reality a single web page, but it works seamlessly with different URL addresses to simulate
      multiple web pages. And of course, there's plenty of CSS to customize the appearance and hopefully make the site look nice.
    </p>
    <h2 className="sectionHead">Content</h2>
    <p>
      Most of the PODs on this website are created using a package called p5.js. This is a Javascript adaptation of the Processing
      library. Essentially, it allows me to create a canvas on the webpage, where I can draw and color many kinds of simple shapes.
      Using this and the magic of functions and classes, I can create interesting and complex visual displays. It's quite fun.
    </p>
    <p>
      The Repetetive PODs are not generated with Javascript, but rather externally using Processing.py. I create and save all frames
      of the videos, and then assemble them together using GIMP. The code for these is therefore not part of the website's repository.
    </p>
    <h2 className="sectionHead">Code</h2>
    <p>
      The code for this website is completely open source, and the git repo can be found <a href="https://github.com/richmonddecker/drawn-out-process">here</a>.
      I try to organize the code well, but I absolutely do not guarantee that it is good or easy to understand. In fact, there are not many comments, and almost no tests.
      But what do you want from me? This is a personal project that I'm doing for fun, so I'll be damned if I'm going to include a comprehensive test suite.
    </p>
    <p>
      But if you're masochistic enough to explore it... As far as it interests you or is useful to you, you are welcome to view and use the code, and adapt anything how you feel.
      Of course, please be nice and credit me or this website if you do happen to use it.
    </p>
  </div>
);

export default Technical;

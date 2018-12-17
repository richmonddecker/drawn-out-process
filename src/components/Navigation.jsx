import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <div className="Navigation">
    <h2>Here is the Navbar.</h2>
    <a href="/">Home</a>
    <Link to="/static/videos/kochpinski.mp4" target="_self">Hoops</Link>
    <a href="/repetitive">Repetitives</a>
    <a href="/repetitive/kochpinski">Kochpinski</a>
    <a href="/repetitive/snowflake">Snowflake</a>
    <a href="/repetitive/plasma-ball">Plasma Ball</a>
  </div>
);

export default Navigation;

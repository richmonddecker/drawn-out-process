import React from "react";

import { ControlRoutes } from "../routes";

import TwoButtons from "./TwoButtons";
import SizeButtons from "./SizeButtons";
import SidebarButtons from "./SidebarButtons";
import JumpButtons from "./JumpButtons";
import JumpConfig from "./JumpConfig";
import Slideshow from "./Slideshow";
import BarTab from "./BarTab";


const Configuration = ({ isOpen }) => (
  <div>
    <div id="rightBar" className={`sideBar ${isOpen ? "barOpen" : "barClosed"}`}>
      <h5 className="line"><span className="line">Display</span></h5>
      <SizeButtons />
      <SidebarButtons />
      <h5 className="line"><span className="line">Route</span></h5>
      <JumpConfig />
      <JumpButtons />
      <Slideshow />
      <h5 className="line"><span className="line">Control</span></h5>
      <ControlRoutes />
      <TwoButtons />
    </div>
    <BarTab right isOpen={isOpen} />
  </div>
);

export default Configuration;

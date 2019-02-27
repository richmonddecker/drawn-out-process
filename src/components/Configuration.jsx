import React from "react";

import TwoButtons from "./TwoButtons";
import SizeButtons from "./SizeButtons";
import SidebarButtons from "./SidebarButtons";
import JumpButtons from "./JumpButtons";
import JumpConfig from "./JumpConfig";
import Slideshow from "./Slideshow";
import BarTab from "./BarTab";
import Control from "./Control";
import ControlTitle from "./ControlTitle";


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
      <ControlTitle />
      <Control />
      <TwoButtons />
    </div>
    <BarTab right isOpen={isOpen} />
  </div>
);

export default Configuration;

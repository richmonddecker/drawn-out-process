import React from "react";

import { ControlRoutes } from "../routes";

import TwoButtons from "./TwoButtons";
import SizeButtons from "./SizeButtons";
import SidebarButtons from "./SidebarButtons";
import JumpButtons from "./JumpButtons";
import JumpConfig from "./JumpConfig";
import BarTab from "./BarTab";


const Configuration = ({ isOpen }) => (
  <div>
    <div id="rightBar" className={`sideBar ${isOpen ? "barOpen" : "barClosed"}`}>
      <SizeButtons />
      <SidebarButtons />
      <JumpConfig />
      <JumpButtons />
      <ControlRoutes />
      <TwoButtons />
    </div>
    <BarTab right isOpen={isOpen} />
  </div>
);

export default Configuration;

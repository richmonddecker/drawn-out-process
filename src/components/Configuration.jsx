import React from "react";

import { ControlRoutes } from "../routes";

import TwoButtons from "./TwoButtons";
import FullscreenButton from "./FullscreenButton";
import SquareButton from "./SquareButton";
import SidebarButtons from "./SidebarButtons";
import BarTab from "./BarTab";


const Configuration = ({ isOpen }) => (
  <div>
    <div id="rightBar" className={`sideBar ${isOpen ? "barOpen" : "barClosed"}`}>
      <FullscreenButton />
      <SquareButton />
      <SidebarButtons />
      <ControlRoutes />
      <TwoButtons />
    </div>
    <BarTab right isOpen={isOpen} />
  </div>
);

export default Configuration;

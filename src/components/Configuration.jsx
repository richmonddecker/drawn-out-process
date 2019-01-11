import React from "react";
import { connect } from "react-redux";

import { ControlRoutes } from "../routes";

import TwoButtons from "./TwoButtons";
import FullscreenButton from "./FullscreenButton";
import SquareButton from "./SquareButton";
import SidebarButtons from "./SidebarButtons";
import BarTab from "./BarTab";


const Configuration = ({ barClass }) => (
  <div>
    <div id="rightBar" className={barClass}>
      <FullscreenButton />
      <SquareButton />
      <SidebarButtons />
      <ControlRoutes />
      <TwoButtons />
    </div>
    <BarTab right />
  </div>
);

const mapStateToProps = (state) => ({
  barClass: `sideBar ${state.navigation.barsOpen ? "barOpen" : "barClosed"}`
});

export default connect(
  mapStateToProps
)(Configuration);

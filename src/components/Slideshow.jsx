import React from "react";

import Dropdown from "react-dropdown";

const SlideshowControls = ({category, name}) => (
  
);

const mapStateToProps = (state) => ({
  isHidden: !state.configuration.barTabs
});

const mapDispatchToProps = (dispatch) => ({
  openBars: () => dispatch(openBars())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BarTab);

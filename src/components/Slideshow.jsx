import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-dropdown";

import { setSlideshow } from "../actions/interface";


const Slideshow = ({slideshow, setSlideshow, passivity, interactivity}) => {
  const options = [
    {value: 0, label: "Slideshow: Off"},
    {value: 10, label: "Slideshow: 10 sec"},
    {value: 20, label: "Slideshow: 20 sec"},
    {value: 30, label: "Slideshow: 30 sec"},
    {value: 60, label: "Slideshow: 1 min"},
    {value: 120, label: "Slideshow: 2 min"},
    {value: 180, label: "Slideshow: 3 min"},
    {value: 300, label: "Slideshow: 5 min"},
    {value: 600, label: "Slideshow: 10 min"}
  ];
  return (
    <div>
      <Dropdown
        disabled={passivity !== true || interactivity !== true}
        options={[
          {value: 0, label: "Slideshow: Off"},
          {value: 10, label: "Slideshow: 10 sec"},
          {value: 20, label: "Slideshow: 20 sec"},
          {value: 30, label: "Slideshow: 30 sec"},
          {value: 60, label: "Slideshow: 1 min"},
          {value: 120, label: "Slideshow: 2 min"},
          {value: 180, label: "Slideshow: 3 min"},
          {value: 300, label: "Slideshow: 5 min"},
          {value: 600, label: "Slideshow: 10 min"}
        ]}
        value={options.filter((o) => o.value === slideshow)[0]}
        onChange={setSlideshow}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  slideshow: state.interface.slideshow,
  passivity: state.interface.passivity,
  interactivity: state.interface.interactivity
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setSlideshow: (val) => dispatch(setSlideshow(val.value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slideshow);

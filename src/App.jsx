import React from "react";
import { connect } from "react-redux";
import Fullscreen from "react-full-screen";

import Navigation from "./components/Navigation";
import Application from "./components/Application";
import Configuration from "./components/Configuration";

import { setFullScreen } from "./actions/configuration";
import { setOpenNavSection } from "./actions/interface";

import { contents } from "./scripts/organization";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateNavSection = this.updateNavSection.bind(this)
  }

  updateNavSection(category) {
    // We will set the open navigation section based on the current URL.
    // If the URL is empty or invalid, default to "informative".
    if (contents.map((x) => x.tag).includes(category)) {
      this.props.setOpenNavSection(category);
    } else {
      this.props.setOpenNavSection("informative");
    }
  }

  componentWillMount() {
    this.updateNavSection(this.props.category);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.category !== nextProps.category) {
      this.updateNavSection(nextProps.category);
    }
  }

  render() {
    return (
      <div>
        <Fullscreen
          enabled={this.props.fullScreen}
          onChange={isFull => this.props.setFullScreen(isFull)}
        >
          <Navigation isOpen={this.props.barsOpen} />
          <Application />
          <Configuration isOpen={this.props.barsOpen} />
        </Fullscreen>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  barsOpen: state.interface.barsOpen || state.configuration.barLock || state.interface.info,
  fullScreen: state.configuration.fullScreen,
  category: state.router.location.pathname.split("/")[1]
});

const mapDispatchToProps = (dispatch) => ({
  setFullScreen: (full) => dispatch(setFullScreen(full)),
  setOpenNavSection: (section) => dispatch(setOpenNavSection(section))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

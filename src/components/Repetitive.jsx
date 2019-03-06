import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FileSaver from "file-saver";

import { resetTrigger } from "../actions/trigger";

class Repetitive extends React.Component {
  constructor(props) {
    super(props);
    this.handleTriggers = this.handleTriggers.bind(this);
  }

  render() {
    const dimension = Math.min(this.props.width, this.props.height);
    return (
      <div className="fillScreen">
        <video id="repetitiveVideo" src={this.props.video} height={dimension} width={dimension} autoPlay loop muted>
        </video>
      </div>
    );
  }

  handleTriggers(props) {
    if (props.save) {
      props.clearSave();
      // This will download/save the current video.
      FileSaver.saveAs(props.video, props.tag);
    }
    if (props.reset) {
      props.clearReset();
      // This resets the video to the start.
      document.getElementById("repetitiveVideo").currentTime = 0;
    }
  }

  componentWillReceiveProps(newProps) {
    this.handleTriggers(newProps);
  }

}

// TODO: Make this stuff have an effect.

const mapStateToProps = (state) => ({
  save: state.trigger.saveFrame,
  reset: state.trigger.resetFrame,
  ...state.interface.window
});

const mapDispatchToProps = (dispatch) => ({
  clearSave: () => dispatch(resetTrigger("saveFrame")),
  clearReset: () => dispatch(resetTrigger("resetFrame"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Repetitive);
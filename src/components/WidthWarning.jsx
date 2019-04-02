import React from "react";
import { connect } from "react-redux";
import Modal from "react-awesome-modal";


class WidthWarning extends React.Component {
  constructor(props) {
    super(props);

    this.isTooNarrow = this.isTooNarrow.bind(this);

  }

  isTooNarrow() {
    return this.props.window.width < 600;
  }

  render() {
    return (
      <Modal
        visible={this.isTooNarrow()}
        width={`${this.props.window.width - 50}`}
        height="321"
      >
        <div className="dialogBox warningBox">
          <h2><u>Screen Too Narrow</u>! :(</h2>
          <br/>
          <h4 style={{"text-align": "center"}}>This site is a thicc boi.</h4>
          <br/>
          <h4><i>If you are on a computer...</i></h4>
          <h4 style={{"text-align": "right"}}><b>Please widen the window.</b></h4>
          <br/>
          <h4><i>If you are on a mobile device...</i></h4>
          <h4 style={{"text-align": "right"}}><b>Please turn it sideways.</b></h4>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  window: state.interface.window,
  barsOpen: state.interface.barsOpen || state.configuration.barLock
});

export default connect(mapStateToProps)(WidthWarning);

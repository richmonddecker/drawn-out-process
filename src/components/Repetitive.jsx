import React from "react";
import videos from "../scripts/videos";

class Repetitive extends React.Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  render() {
    const name = this.props.match.params.name;
    return (
      <div className="fill-screen">
        <video src={videos[name]} height={this.state.height} width={this.state.width} autoPlay loop muted>
        </video>
      </div>
    );
  }

  updateDimensions() {
    const dimension = Math.min(window.innerWidth, window.innerHeight);
    this.setState({width: dimension, height: dimension});
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnMount() {
    window.removeEventListener("resize");
  }
}

export default Repetitive;

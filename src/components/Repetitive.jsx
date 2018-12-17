import React from "react";
import videos from "../scripts/videos";
import "../styles/App.css";

class Repetitive extends React.Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  render() {
    const name = this.props.match.params.name;
    console.log("HEY!", videos[name]);
    return (
      <div class="fill-screen">
        <video height={this.state.height} width={this.state.width} autoPlay loop muted>
          <source src={videos[name]} type="video/mp4"/>
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
    window.removeEventListener("resize", this.updateDimensions);
  }
}

export default Repetitive;

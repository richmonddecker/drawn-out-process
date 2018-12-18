/*
  Modifed from Andreas Wolf's react-p5-wrapper
  https://github.com/NeroCor/react-p5-wrapper
*/

import React from 'react';
import p5 from 'p5';

export default class P5Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.passProps = this.passProps.bind(this);
    this.makeCanvas = this.makeCanvas.bind(this);
  }
  
  passProps(props) {
    if (this.canvas.interpretProps) {
      this.canvas.interpretProps(props);
    }
  }

  makeCanvas(props) {
    this.canvas = new p5(props.sketch, this.wrapper);
  }

  componentDidMount() {
    this.makeCanvas(this.props);
    this.passProps(this.canvas, this.props);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.sketch !== newProps.sketch) {
      this.wrapper.removeChild(this.wrapper.childNodes[0]);
      this.makeCanvas(newProps);
    }
    this.passProps(this.canvas, newProps)
  }

  render() {
    return <div class="fill-screen" ref={wrapper => this.wrapper = wrapper}></div>;
  }
}
const fs = require("./shaders/steamy-dream.fs");

const sketch = (p) => {

  let sizes = {};
  let theShader;
  p.isSquare = false;
  p.settings = {
    changeRate: 0.09,
    baseFreq: 10.0,
    numFreqs: 4
  }

  function getCanvasSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (p.isSquare) {
      return {width: p.min(width, height), height: p.min(width, height)}
    }
    return {width, height};
  }


  p.mousePressed = function() {
  }

  function setupShader() {
    const varying = "precision highp float; varying vec2 vPos;";

    const vs =
      varying +
      "attribute vec3 aPosition;" +
      "void main() { vPos = (gl_Position = vec4(aPosition,1.0)).xy; }";
    console.log("FS IS:", fs);
    theShader = p.createShader(vs, fs);
    p.shader(theShader);

  }

  function updateShader() {
    theShader.setUniform("change_rate", p.settings.changeRate / 100);
    theShader.setUniform("base_freq", p.settings.baseFreq);
    theShader.setUniform("num_freqs", p.settings.numFreqs); 
  }

  p.windowResized = function() {
    sizes = getCanvasSize();
    p.resizeCanvas(sizes.width, sizes.height);
  }

  p.setup = function() {
    p.colorMode(p.HSB, 1);
    sizes = getCanvasSize();
    p.resizeCanvas(sizes.width, sizes.height);
    setupShader();
  }

  p.draw = function() {
    p.background(0);
    updateShader();
    p.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  }

};

export default sketch;

import { Driftable } from "./utility/randomness";

const sketch = (p) => {
  let wedges;
  let radius;
  let sizes = {};
  let drawing = false;
  p.settings = {
    slices: 30,
    colorSpeed: 10,
    radialSpeed: 10,
    axialSpeed: 10
  };

  //TODO: MAKE THE SPANS CHANGE LIKE RANDOMISH
  //TODO: MAKE THE RADII CHANGE TOO

  class Wedge {
    constructor(radius, span, orientation) {
      this.radius = radius;
      this.span = span;
      this.orientation = orientation;
      this.color = randomColor();
      this.color_rate = p.pow(10, p.random(-5.3, -2.3)) / p.sqrt(p.settings.slices);
      this.radial_steps = p.ceil(p.random(3, 20.0));
      this.radial_value = p.ceil(p.random(2, this.radial_steps));
      this.radius_rate = this.radial_steps * p.pow(10, p.random(-6.5, -3.5)) / p.sqrt(p.settings.slices);
      this.axial_rate = p.pow(10, p.random(-7.1, -4.1)) * p.sqrt(p.settings.slices);
    }

    draw() {
      console.log(this.radius_rate, this.color_rate)
      p.fill(this.color, 1, 1);
      p.arc(
        0, 0,
        2 * this.radius * this.radial_value / this.radial_steps,
        2 * this.radius * this.radial_value / this.radial_steps,
        this.orientation * p.TWO_PI / p.settings.slices,
        (this.orientation + this.span) * p.TWO_PI / p.settings.slices,
        p.PIE
      );
    }

    changeRadius() {
      if (this.radial_value == this.radial_steps) {
        this.radial_value -= 1;
      } else if (this.radial_value < 3) {
        this.radial_value += 1;
      } else if (p.random(0, 1) < 0.5 + (this.radial_steps - this.radial_value) / this.radial_steps * 0.25) {
        this.radial_value += 1;
      } else {
        this.radial_value -= 1;
      }
    }

    increaseAngle() {
      this.span += 1;
      if (p.random(0, 1) < 0.5) {
        this.orientation -= 1;
      }
    }

    decreaseAngle() {
      this.span -= 1;
      if (p.random(0, 1) < 0.5) {
        this.orientation += 1;
      }
    }

    changeAngle() {
      if (this.span === 1) {
        this.increaseAngle();
      } else if (this.span + 1 >= p.settings.slices / 4) {
        this.decreaseAngle();
      } else if (p.random(0, 1) < 0.5 - 4 * (p.settings.slices / 4 - this.span) / p.settings.slices * 0.25) {
        this.increaseAngle();
      } else {
        this.decreaseAngle();
      }
    }

    newColor() {
      this.color = randomColor();
    }

    passFrame() {
      if (p.random(0, 1) < this.color_rate * p.settings.colorSpeed * p.pow(p.log(120)/p.log(100), p.settings.colorSpeed)) {
        this.newColor();
      }
      if (p.random(0, 1) < this.radius_rate * p.settings.radialSpeed * p.pow(p.log(120)/p.log(100), p.settings.radialSpeed)) {
        this.changeRadius();
      }
      if (p.random(0, 1) < this.axial_rate * p.settings.axialSpeed * p.pow(p.log(120)/p.log(100), p.settings.axialSpeed)) {
        this.changeAngle();
      }
    }
  }

  function randomColor() {
    let r = p.random(0, 1);
    let g = p.random(0, 1);
    let b = p.random(0, 1);
    while (p.max(r, g, b) < 0.5 || p.min(r, g, b) > 0.5) {
      r = p.random(0, 1);
      g = p.random(0, 1);
      b = p.random(0, 1);
    }
    console.log("RGB", r, g, b);
    return p.color(r, g, b);
  }

  function getCanvasSize() {
    if (p.isSquare) {
      sizes.width = p.min(window.innerWidth, window.innerHeight);
      sizes.height = sizes.width;
    } else {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
    }
    radius = p.min(sizes.width, sizes.height) / 2;
  }

  p.windowResized = function() {
    getCanvasSize();
    p.resizeCanvas(sizes.width, sizes.height);
  }

  function resetWedges() {
    wedges = [...Array(p.settings.slices).keys()].map((i) => new Wedge(radius, 1, i, {x: sizes.width/2, y: sizes.height/2}));
  }

  p.setup = function() {
    p.frameRate(30);
    getCanvasSize();
    p.createCanvas(sizes.width, sizes.height);
    p.colorMode(p.RGB, 1);
    p.strokeWeight(5);
    p.background(0);
    resetWedges();
  }

  p.draw = function() {
    p.background(0);
    p.translate(sizes.width/2, sizes.height/2);
    p.rotate(p.frameCount * p.PI/100);
    wedges.forEach((w) => {w.passFrame(); w.draw()});
    p.push();
    p.noStroke();
    p.fill(0, 0, 0);
    p.ellipse(0, 0, 60, 60);
    p.pop();
  }

  p.mouseReleased = function() {
    if (p.isBlocked) {
      return;
    }
    resetWedges();
  }


};

export default sketch;

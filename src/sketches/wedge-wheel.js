import { Driftable } from "./utility/randomness";

const sketch = (p) => {
  let angle = 0;
  let rotationSpeed = new (Driftable(p))(-p.PI/3000, p.PI/3000, p.PI/30000);
  let wedges;
  let radius;
  let sizes = {};
  let drawing = false;
  let rings = [];
  p.settings = {
    numWedges: 24,
    changeRate: 10,
    numRings: 12
  };

  //TODO: MAKE THE SPANS CHANGE LIKE RANDOMISH
  //TODO: MAKE THE RADII CHANGE TOO

  class Wedge {
    constructor(radius, span, orientation) {
      this.radius = radius;
      this.span = span;
      this.orientation = orientation;
      this.color = randomColor();
      this.color_rate = p.pow(10, p.random(-5.3, -2.3)) / p.sqrt(p.settings.numWedges);
      this.radial_steps = p.ceil(p.random(3, 20.0));
      this.radial_value = p.ceil(p.random(2, this.radial_steps));
      this.radius_rate = this.radial_steps * p.pow(10, p.random(-6.5, -3.5)) / p.sqrt(p.settings.numWedges);
      this.axial_rate = p.pow(10, p.random(-7.1, -4.1)) * p.sqrt(p.settings.numWedges);
    }

    draw() {
      p.fill(this.color, 1, 1);
      p.arc(
        0, 0,
        2 * radius * this.radius * this.radial_value / this.radial_steps,
        2 * radius * this.radius * this.radial_value / this.radial_steps,
        this.orientation * p.TWO_PI / p.settings.numWedges,
        (this.orientation + this.span) * p.TWO_PI / p.settings.numWedges,
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
      } else if (this.span + 1 >= p.settings.numWedges / 4) {
        this.decreaseAngle();
      } else if (p.random(0, 1) < 0.5 - 4 * (p.settings.numWedges / 4 - this.span) / p.settings.numWedges * 0.25) {
        this.increaseAngle();
      } else {
        this.decreaseAngle();
      }
    }

    newColor() {
      this.color = randomColor();
    }

    passFrame() {
      if (p.random(0, 1) < this.color_rate * p.settings.changeRate * p.pow(p.log(120)/p.log(100), p.settings.changeRate)) {
        this.newColor();
      }
      if (p.random(0, 1) < this.radius_rate * p.settings.changeRate * p.pow(p.log(120)/p.log(100), p.settings.changeRate)) {
        this.changeRadius();
      }
      if (p.random(0, 1) < this.axial_rate * p.settings.changeRate * p.pow(p.log(120)/p.log(100), p.settings.changeRate)) {
        this.changeAngle();
      }
    }
  }

  class Ring {
    constructor(index) {
      this.index = index;
      this.on = p.random(0, 1) < 0.25;
      this.ring_rate = p.sqrt(p.settings.numRings) * p.pow(10, p.random(-6.8, -3.8));
    }

    step() {
      if (p.random(0, 1) < this.ring_rate * p.settings.changeRate * p.pow(p.log(120)/p.log(100), p.settings.changeRate)) {
        if (this.on) {
          this.on = false;
        } else {
          if (p.random(0, 1) < 0.25) {
            this.on = true
          }
        }
      }
    }

    draw() {
      if (!this.on) {
        return;
      }
      p.push();
      const thickness = radius / p.settings.numRings;
      p.strokeWeight(thickness);
      p.noFill();
      p.stroke(0, 0, 0);
      p.ellipse(0, 0, 2 * (1 + this.index) * thickness, 2 * (1 + this.index) * thickness);
      p.pop();
    }
  }

  function randomColor() {
    let r = p.random(0, 1);
    let g = p.random(0, 1);
    let b = p.random(0, 1);
    while (p.max(p.max(r, g), b) < 0.5 || p.min(p.min(r, g), b) > 0.5) {
      r = p.random(0, 1);
      g = p.random(0, 1);
      b = p.random(0, 1);
    }
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
    console.log("HERE MAN");
    p.resizeCanvas(sizes.width, sizes.height);
    console.log(sizes)
  }

  function resetWedges() {
    wedges = [...Array(p.settings.numWedges).keys()].map((i) => new Wedge(1, 1, i, {x: sizes.width/2, y: sizes.height/2}));
    rings = [...Array(p.settings.numRings).keys()].map((i) => new Ring(i));
  }

  function innerCircle() {
    const thatRadius = p.max(60, 2 * radius / p.settings.numRings);
    p.push();
    p.noStroke();
    p.fill(0, 0, 0);
    p.ellipse(0, 0, thatRadius, thatRadius);
    p.pop();
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
    rotationSpeed.delta = p.settings.changeRate * p.PI/30000;
    rotationSpeed.step();
    angle += rotationSpeed.value * p.settings.changeRate;
    p.rotate(angle);
    wedges.forEach((w) => {w.passFrame(); w.draw()});
    rings.forEach((r) => {r.step(); r.draw()});
    innerCircle();
  }

  p.mouseReleased = function() {
    if (p.isBlocked) {
      return;
    }
    resetWedges();
  }


};

export default sketch;

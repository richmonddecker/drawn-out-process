import { fitPointsToSize } from "./utility/geometry";
import { Driftable } from "./utility/randomness";

const sketch = (p) => {

  class Circle {
    constructor(r) {
      this.r = r;
    }

    drawCircle() {
      p.ellipse(0, 0, 2 * this.r, 2 * this.r);
    }

    clearCircle() {
      p.push();
      p.noStroke();
      this.drawCircle();
      p.pop();
    }
  }

  class Ring {
    constructor(petal, angle, inner, outer, color=null) {
      this.petal = petal;
      this.angle = angle;
      this.inner = inner;
      this.outer = outer;
      this.offset = 0.0;
      this.factor = 1.0;
      this.span = p.TWO_PI;
      this.color = color;
    }

    drawRing() {
      this.cleanRing();
      p.push();
      p.rotate(this.offset);
      for (let i = 0; i < p.floor(this.span / this.angle); i++) {
        this.petal.drawPetal(this.inner, this.outer, this.angle, this.factor);
      }
      p.pop();
    }

    cleanRing() {
      if (this.color) {
        p.fill(this.color);
      }
      (new Circle(this.outer)).drawCircle();
    }
  }

  class Petal {
    constructor(color=null) {
      this.color = color;
    }
    
    drawPetal(inner, outer, angle, factor=1.0) {
      if (this.color) {
        p.fill(this.color);
      }
      this._draw(inner, outer, angle * factor / 2);
      p.rotate(angle);
    }
  }

  // class EllipsePetal(Petal):
  //     def _draw(self, r1, r2, a):
  //         c = cos(a)
  //         s = sin(a)
  //         x1a, y1a = c * r1, -s * r1
  //         x2a, y2a = c * r2, -s * r2
  //         x1b, y1b = c * r1, s * r1
  //         x2b, y2b = c * r2, s * r2
  //         bezier(x1a, y1a, x2a, y2a, x2b, y2b, x1b, y1b)


  class BezierPetal extends Petal {
    _draw(r1, r2, a) {
      let c = p.cos(a);
      let s = p.sin(a);
      let b = {
        x1a: c * r1,
        y1a: -s * r1,
        x2a: c * r2,
        y2a: -s * r2,
        x1b: c * r1,
        y1b: s * r1,
        x2b: c * r2,
        y2b: s * r2
      };
      p.bezier(b.x1a, b.y1a, b.x2a, b.y2a, b.x2b, b.y2b, b.x1b, b.y1b);
    }
  }


  class LeafPetal extends Petal {
    _draw(r1, r2, a) {
      let c = p.cos(a);
      let s = p.sin(a);
      let b = {
        x1a: c * r1,
        y1a: -s * r1,
        x2a: c * r2,
        y2a: -s * r2,
        x1b: c * r1,
        y1b: s * r1,
        x2b: c * r2,
        y2b: s * r2
      };
      p.bezier(b.x1a, b.y1a, b.x2a, b.y2a, r1, 0, r2, 0);
      p.bezier(b.x1b, b.y1b, b.x2b, b.y2b, r1, 0, r2, 0);
    }
  }


  class CirclePetal extends Petal {
    _draw(r1, r2, a) {
      p.push();
      p.translate(0, (r1 + r2) / 2);
      let radius = this.maxRadius(r1, r2, a);
      (new Circle(radius)).drawCircle();
      p.pop();
    }
    
    maxRadius(r1, r2, a) {
      let inout = (r2 - r1) / 2 - 2;
      let around = (r1 + r2) * p.sqrt((1 - p.cos(a)) / 2);
      return p.min(inout, around);
    }
  }


  class SawtoothPetal extends Petal {
    _draw(r1, r2, a) {
      let c = p.cos(a);
      let s = p.sin(a);
      p.triangle(c * r1, -s * r1, r2, 0, c * r1, s * r1);
    }
  }

  class SquareWavePetal extends Petal {
    _draw(r1, r2, a) {
      a = p.abs(a);
      p.arc(0, 0, 2 * r1, 2 * r1, -a, a, p.PIE);
      p.arc(0, 0, 2 * r2, 2 * r2, -a / 2, a / 2, p.PIE);
    }
  }

  function randomFlower(radius, number) {
    let petals = [BezierPetal, LeafPetal, SawtoothPetal, CirclePetal, SquareWavePetal]; //#BandPetal, SolidPetal];
    let counts = [4, 6, 8, 10, 12, 14, 16, 18, 20];
    let diff = radius / (number + 1);
    // Circle(radius).drawCircle()
    let rings = [];
    for (let i = 0; i < number; i++) {
      let r2 = radius * (1 - i / (number + 1.0));
      let r1 = r2 - diff;
      let petal = petals[p.floor(p.random(petals.length))];
      let count = counts[p.floor(p.random(counts.length))];
      let cp = p.color(p.random(1), 1, 1);
      let cr = p.color(p.random(1), 1, 1);
      rings.push(new Ring(new petal(cp), p.TWO_PI / count, r1, r2, cr));
    }
    return rings;
  }


  // class CustomPetal extends Petal {
  //   constructor(r1, r2, f) {}
  // }

  class RadiiList {
    
    constructor(count, radius) {
      this.radius = radius;
      this.radii = Array(count).fill().map(_ => p.random(radius));
      this.radii.sort((a, b) => a - b);
      this.speed = Array(count).fill().map(_ => new (Driftable(p))(-1, 1, 0.1));
    }
    
    alter(ellapsed) {
      for (let i = 0; i < this.radii.length; i++) {
        this.radii[i] += ellapsed * this.speed[i].value * p.settings.radialSpeed * this.radius / radialDivisor;
        if (this.radii[i] > this.radius) {
          this.radii[i] = 2 * this.radius - this.radii[i];
          this.speed[i].value *= -1;
        }
        if (this.radii[i] < 0) {
          this.radii[i] = -this.radii[i];
          this.speed[i].value *= -1;
        }
        this.radii[i] = p.constrain(this.radii[i], 0, this.radius);
        this.speed[i].step();
      }
    }

    scaleBy(factor) {
      this.radii = this.radii.map((r) => r * factor);
      this.radius *= factor;
    }
    
    getPairs() {
      let sortRadii = this.radii.slice(0);
      sortRadii.sort((a, b) => b - a);
      let reversed = [this.radius].concat(sortRadii);
      return Array(reversed.length - 1).fill().map((_, i) => [reversed[i], reversed[i+1]]);
    }

  }
  
  p.settings = {
    numRings: 10,
    axialSpeed: 10,
    petalSpeed: 10,
    radialSpeed: 10,
    changeRate: 6
  };

  const axialDivisor = 25;
  const petalDivisor = 20;
  const radialDivisor = 120;

  let lastChange = 0;
  let lastMillis = 0;
  let rings = [];
  let speeds = [];
  let factspeeds = [];
  let diagonal;
  let radii;
  let centColor;
  let driftable;

  function getCanvasSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const canvas = (
      p.isSquare ?
        {width: p.min(width, height), height: p.min(width, height)}
      :
        {width, height}
    );
    return canvas;
  }

  function checkChange() {
    // Checks if it is time to change the mandala.
    const changeEllapsed = p.millis() - lastChange;
    if (changeEllapsed > 60000 / p.settings.changeRate) {
      makeChange();
    }
  }

  function makeChange() {
    // Implements the change by generating a random mandala.
    centColor = p.random(1);
    p.translate(p.width/2, p.height/2)
    diagonal = p.mag(p.width/2, p.height/2);
    rings = randomFlower(diagonal, p.settings.numRings);
    lastChange = p.millis();
  }

  p.windowResized = function() {
    const newCanvas = getCanvasSize();
    p.resizeCanvas(newCanvas.width, newCanvas.height);
    const newDiagonal = p.mag(p.width/2, p.height/2);
    radii.scaleBy(newDiagonal / diagonal);
    diagonal = newDiagonal;
  }

  p.setup = function() {
    p.colorMode(p.HSB, 1);
    const canvas = getCanvasSize();
    p.createCanvas(canvas.width, canvas.height);
    diagonal = p.mag(p.width/2, p.height/2);
    speeds = Array(p.settings.numRings).fill().map(_ => new (Driftable(p))(-1, 1, 0.1));
    factspeeds = Array(p.settings.numRings).fill().map(_ => new (Driftable(p))(-1, 1, 0.1));
    radii = new RadiiList(p.settings.numRings, diagonal);
    driftable = new (Driftable(p))(4.5, 5, 1);
    makeChange();
  }

  p.draw = function() {
    const millis = p.millis();
    const ellapsed = (millis - lastMillis) / 1000;
    lastMillis = millis;
    p.background(0);
    p.translate(p.width/2, p.height/2);
    const radiiPairs = radii.getPairs();
    for (let i = 0; i < rings.length; i++) {
      rings[i].offset += ellapsed * speeds[i].value * p.settings.axialSpeed / axialDivisor;
      rings[i].factor = p.abs(((rings[i].factor + ellapsed * factspeeds[i].value * p.settings.petalSpeed / petalDivisor) + 3) % 2) - 1;
      rings[i].outer = radiiPairs[i][0];
      rings[i].inner = radiiPairs[i][1];
      speeds[i].step();
      factspeeds[i].step();
      rings[i].drawRing();
    }
    p.fill(centColor, 1, 1);
    (new Circle(radiiPairs[radiiPairs.length - 1][1])).drawCircle();
    radii.alter(ellapsed);
    checkChange();
  }

  p.mouseReleased = function() {
    if (p.isBlocked) {
      return;
    }
    makeChange();
  }
};

export default sketch;

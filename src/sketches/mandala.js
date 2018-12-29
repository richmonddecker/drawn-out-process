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
    constructor(petal, angle, inner, outer, offset=0.0, factor=1.0, span=TWO_PI, color=null) {
      this.petal = petal;
      this.angle = angle;
      this.inner = inner;
      this.outer = outer;
      this.offset = offset;
      this.factor = factor;
      this.span = span;
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
      Circle(this.outer).drawCircle();
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
      Circle(radius).drawCircle();
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
      p.arc(0, 0, 2 * r1, 2 * r1, -a, a, PI);
      p.arc(0, 0, 2 * r2, 2 * r2, -a / 2, a / 2, PI);
    }
  }

  function randomFlower(radius, number) {
    p.colorMode(HSB);
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
      let cp = p.color(p.random(255), 255, 255);
      let cr = p.color(p.random(255), 255, 255);
      rings.append(Ring(petal(cp), TWO_PI / count, r1, r2, color=cr));
    }
    return rings;
  }


  class CustomPetal extends Petal {
    constructor(r1, r2, f) {}
  }

  class RadiiList {
    
    constructor(count, radius) {
      this.radius = radius
      this.radii = sorted([p.random(radius) for i in range(count)])
      this.speed = [p.random(-radius/1000.0, radius/1000.0) for i in range(count)]
    }
    
    alter() {
      for i in range(len(self.radii)):
        self.radii[i] += self.speed[i]
        if self.radii[i] > self.radius:
          self.radii[i] = 2 * self.radius - self.radii[i]
          self.speed[i] *= -1
        if self.radii[i] < 0:
          self.radii[i] = -self.radii[i]
          self.speed[i] *= -1
        self.radii[i] = constrain(self.radii[i], 0, self.radius)
        self.speed[i] += random(-self.radius/10000.0, self.radius/10000.0)
    }
    
    getPairs() {
      reversed = [self.radius] + sorted(self.radii)[::-1];
      return zip(reversed[:-1], reversed[1:]);
    }

  }
    
  let rings = [];
  let speeds = [];
  let factspeeds = [];
  let diagonal;
  let radii;
  let backColor;
  let centColor;
  let numRings = 8;

  // def GET_RADIUS():
  //     return sqrt(width**2

  p.setup = function() {
    p.size(800, 600)
    diagonal = sqrt(sq(width/2) + sq(height/2))
    speeds = [random(-.01, .01) for i in range(numRings)]
    factspeeds = [random(-0.01, 0.01) for i in range(numRings)]
    radii = RadiiList(numRings, diagonal)
    p.mouseReleased()
  }

  p.draw = function() {
    p.colorMode(HSB)
    p.background(*backColor)
    p.translate(p.width/2, p.height/2)
    radiiPairs = radii.getPairs()
    for i in range(len(rings)):
      rings[i].offset += speeds[i]
      rings[i].factor = ((rings[i].factor + factspeeds[i]) + 1) % 2 - 1
      rings[i].outer = radiiPairs[i][0]
      rings[i].inner = radiiPairs[i][1]
      #rings[i].color = 
      speeds[i] += p.random(-0.001, 0.001)
      factspeeds[i] += p.random(-0.001, 0.001)
      rings[i].drawRing()
    p.fill(*centColor)
    Circle(radiiPairs[-1][1]).drawCircle()
    radii.alter()
  }

  p.mouseReleased = function() {
    // drawNodes()
    backColor = [p.random(255), 255, 255]
    centColor = [p.random(255), 255, 255]
    p.translate(width/2, height/2)
    diagonal = p.mag(p.width/2, p.height/2);
    rings = randomFlower(diagonal, numRings)
  }
};

export default sketch;

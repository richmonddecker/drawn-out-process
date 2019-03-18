const sketch = (p) => {

  let pointers = [];
  let sizes = {};
  let counts = {}; // how many pointers in x/y directions
  let spacing = 0; // spacing between pointers
  let waves = new Set([]);
  let lastDrawn = 0;
  let lastHue = 0;
  p.isSquare = false;
  p.settings = {
    frequency: 5,
    velocity: 100,
    thickness: 2,
    opacity: 100
  }

  class Wave {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 0;
      this.lastTime = p.millis();
      if (p.mouseIsPressed) {
        this.hue = (lastHue + 0.5 / p.settings.frequency) % 1;
      } else {
        this.hue = p.random(1);
      }
      lastHue = this.hue;
      waves.add(this);
    }

    updateRadius() {
      this.radius += p.settings.velocity * (p.millis() - this.lastTime) / 1000.0;
      this.lastTime = p.millis();
    }

    checkTooBig(radius) {
      this.updateRadius();
      if (radius > p.mag(sizes.width, sizes.height)) {
        waves.delete(this);
      }
    }

    draw(thickness) {
      p.strokeWeight(thickness);
      p.stroke(this.hue, 1, 1, p.settings.opacity / 100);
      p.noFill();
      p.ellipse(this.x, this.y, 2 * this.radius);
    }

  }

  function getCanvasSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (p.isSquare) {
      return {width: p.min(width, height), height: p.min(width, height)}
    }
    return {width, height};
  }

  function makeWave() {
    new Wave(p.mouseX, p.mouseY)
  }

  function checkTiming() {
    if ((p.millis() - lastDrawn) > 1000 / p.settings.frequency) {
      new Wave(p.mouseX, p.mouseY);
      lastDrawn = p.millis();
    }
  }

  function cleanWaves() {
    for (let wave of waves) {
      wave.checkTooBig(wave.radius);
    }
  }

  function drawWaves() {
    for (let wave of waves) {
      wave.draw(p.settings.thickness);
    }
  }

  p.mousePressed = function() {
    const randomPoint = {x: p.random(0, p.width), y: p.random(0, p.height)};
    pointers.forEach((x) => {
      x.armTrigger(randomPoint.x, randomPoint.y)
      x.pointTo(randomPoint.x, randomPoint.y)
    });
  }


  p.windowResized = function() {
    sizes = getCanvasSize();
    p.resizeCanvas(sizes.width, sizes.height);
  }

  p.setup = function() {
    p.colorMode(p.HSB, 1);
    sizes = getCanvasSize();
    p.resizeCanvas(sizes.width, sizes.height);
  }

  p.draw = function() {
    p.background(0);
    cleanWaves();
    checkTiming();
    drawWaves();
  }

};

export default sketch;

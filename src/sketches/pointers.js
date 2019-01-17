const sketch = (p) => {

  let pointers = [];
  let sizes = {};
  let counts = {}; // how many pointers in x/y directions
  let spacing = 0; // spacing between pointers
  p.isSquare = false;
  p.settings = {
    thickness: 1,
    length: 1,
    count: 50,
    speed: 10
  }

  class Pointer {
    constructor(x, y, colorFun) {
      this.x = x;
      this.y = y;
      this.angle = p.atan2(y - p.height / 2, x - p.width / 2);
      this.velocity = 0;
      this.colorFun = colorFun;
      this.trigger = Infinity;
      this.triggers = [];
    }

    addTrigger(time, x, y) {
      this.triggers.unshift({x, y, t: time});
    }

    armTrigger(x, y) {
      this.setTriggerTime(p.millis() + 1000 * p.mag(x - this.x, y - this.y) / (spacing * p.settings.speed));
    }

    setTriggerTime(time) {
      if (time < this.trigger) {
        this.trigger = time;
      }
    }

    checkTrigger() {
      if (p.millis() >= this.trigger) {
        this.angle = this.newAngle;
        this.trigger = Infinity;
      }
    }

    defaultColorFun() {
      const hue = (this.angle + p.PI) / p.TWO_PI;
      const difference = (p.atan2(p.mouseX - p.width / 2, p.mouseY - p.height / 2) + p.PI) / p.TWO_PI;
      return p.color((hue + difference) % 1, 1, 1);
    }

    pointTo(x, y) {
      this.newAngle = p.atan2(y - this.y, x - this.x);
    }

    draw(length, thickness) {
      const theLength = (p.height / (p.settings.count - 1) - thickness) * length;
      const dx = theLength * p.cos(this.angle) / 2;
      const dy = theLength * p.sin(this.angle) / 2;
      p.strokeWeight(thickness);
      p.stroke(this.defaultColorFun());
      p.line(this.x + dx, this.y + dy, this.x - dx, this.y - dy);
    }
  }

  function getCounts() {
    // Figure out how many pointers in the x and y directions.
    counts.y = p.settings.count;
    counts.x = p.ceil(counts.y * p.width / p.height);
    spacing = p.height / (counts.y - 1);
  }


  function getCanvasSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (p.isSquare) {
      return {width: p.min(width, height), height: p.min(width, height)}
    }
    return {width, height};
  }

  function makePointers() {
    pointers = [];
    for (let i = 0; i < counts.x; i++) {
      for (let j = 0; j < counts.y; j++) {
        pointers.push(new Pointer(
          spacing * i,
          spacing * j
        ));
      }
    }
  }

  p.mousePressed = function() {
    const randomPoint = {x: p.random(0, p.width), y: p.random(0, p.height)};
    pointers.forEach((x) => {
      x.armTrigger(randomPoint.x, randomPoint.y)
      x.pointTo(randomPoint.x, randomPoint.y)
    });
  }

  p.mouseMoved = function() {
    if (p.mouseX > p.width || p.mouseY > p.height || p.mouseX < 0 || p.mouseY < 0) {
      return;
    }
    pointers.forEach((x) => {
      x.armTrigger(p.mouseX, p.mouseY);
      x.pointTo(p.mouseX, p.mouseY);
    });
  }

  p.touchMoved = function() {
    p.mouseMoved();
  }

  p.windowResized = function() {
    sizes = getCanvasSize();
    p.resizeCanvas(sizes.width, sizes.height);
    getCounts();
    makePointers();
  }

  p.setup = function() {
    p.colorMode(p.HSB, 1);
    sizes = getCanvasSize();
    p.resizeCanvas(sizes.width, sizes.height);
    getCounts()
    makePointers();
  }

  p.draw = function() {
    p.background(0);
    pointers.forEach((x) => {
      x.checkTrigger();
      x.draw(p.settings.length, p.settings.thickness);
    });
  }

};

export default sketch;

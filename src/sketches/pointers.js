import { fitPointsToSize } from "./utility/geometry";

const sketch = (p) => {

  let pointers = [];
  let position = {};
  let velocity = {};
  let sizes = {};
  let counts = {}; // how many pointers in x/y directions
  let spacing = 0; // spacing between pointers
  p.isSquare = false;
  p.settings = {
    thickness: 1,
    length: 1,
    count: 30,
    speed: 400
  }

  class Pointer {
    constructor(x, y, length, thickness, colorFun) {
      this.x = x;
      this.y = y;
      this.length = length;
      this.thickness = thickness;
      this.angle = p.atan2(y - p.height / 2, x - p.width / 2);
      this.velocity = 0;
      this.colorFun = colorFun;
      this.trigger = Infinity;
    }

    armTrigger(x, y) {
      this.setTriggerTime(p.millis() + 1000 * p.mag(x - this.x, y - this.y) / p.settings.speed, x, y);
    }

    setTriggerTime(time, x, y) {
      if (time < this.trigger) {
        this.trigger = time;
        this.nextPoint = {x, y};
      }
    }

    checkTrigger() {
      if (p.millis() >= this.trigger) {
        this.pointTo(this.nextPoint.x, this.nextPoint.y);
        this.trigger = Infinity;
      }
    }

    defaultColorFun() {
      const hue = (this.angle + p.PI) / p.TWO_PI;
      const difference = (p.atan2(p.mouseX - p.width / 2, p.mouseY - p.height / 2) + p.PI) / p.TWO_PI;
      return p.color((hue + difference) % 1, 1, 1);
    }

    pointTo(x, y) {
      this.angle = p.atan2(y - this.y, x - this.x);
    }

    draw() {
      const dx = this.length * p.cos(this.angle) / 2;
      const dy = this.length * p.sin(this.angle) / 2;
      p.strokeWeight(this.thickness);
      p.stroke(this.defaultColorFun());
      p.line(this.x + dx, this.y + dy, this.x - dx, this.y - dy);
    }
  }

  function getCounts() {
    // Figure out how many pointers in the x and y directions.
    if (p.width > p.height) {
      counts.x = p.settings.count;
      counts.y = p.floor(counts.x * p.height / p.width);
      spacing = p.width / (counts.x - 1);
    } else {
      counts.y = p.settings.count;
      counts.x = p.floor(counts.y * p.width / p.height);
      spacing = p.height / (counts.y - 1);
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

  function makePointers() {
    const count = p.settings.count;
    const countX = p.floor(count * p.width / p.height);
    pointers = [];
    for (let i = 0; i < countX; i++) {
      for (let j = 0; j < count; j++) {
        pointers.push(new Pointer(
          p.width * i / countX,
          p.height * j / count,
          (p.height / count - p.settings.thickness) * p.settings.length,
          p.settings.thickness
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
    console.log(p.mouseX, p.mouseY);
    if (p.mouseX > p.width || p.mouseY > p.height || p.mouseX < 0 || p.mouseY < 0) {
      return;
    }
    pointers.forEach((x) => {
      x.armTrigger(p.mouseX, p.mouseY);
    });
  }

  p.touchMoved = function() {
    p.mouseMoved();
  }

  p.windowResized = function() {
    sizes = getCanvasSize();
    p.resizeCanvas(sizes.width, sizes.height);
    makePointers();
  }

  p.setup = function() {
    p.colorMode(p.HSB, 1);
    sizes = getCanvasSize();
    p.resizeCanvas(sizes.width, sizes.height);
    makePointers();
  }

  p.draw = function() {
    p.background(0);
    pointers.forEach((x) => {
      x.checkTrigger();
      x.draw();
    });
  }

};

export default sketch;

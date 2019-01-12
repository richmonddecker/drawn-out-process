import { fitPointsToSize } from "./utility/geometry";

const sketch = (p) => {

  let pointers = [];
  let position = {};
  let velocity = {};
  let sizes = {};
  let infoSpeed = 400;
  p.isSquare = false;
  p.settings = {
    string: "",
    size: 100,
    color: "#ff0000",
    font: "Arial",
    angle: 45,
    speed: 200
  }

  class Pointer {
    constructor(x, y, length, thickness, colorFun) {
      this.x = x;
      this.y = y;
      this.length = length;
      this.thickness = thickness;
      this.angle = p.atan2(y - p.mouseY, x - p.mouseX);
      this.velocity = 0;
      this.colorFun = colorFun;
      this.trigger = Infinity;
    }

    armTrigger(x, y) {
      this.setTriggerTime(p.millis() + 1000 * p.mag(x - this.x, y - this.y) / infoSpeed);
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

    draw() {
      const dx = this.length * p.cos(this.angle) / 2;
      const dy = this.length * p.sin(this.angle) / 2;
      p.strokeWeight(this.thickness);
      p.stroke(this.defaultColorFun());
      p.line(this.x + dx, this.y + dy, this.x - dx, this.y - dy);
    }
  }

  function getTextSize(string, size, font) {
    p.textSize(size);
    p.textFont(font);
    return {height: size, width: p.textWidth(string)};
  }

  function getCanvasSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (p.isSquare) {
      console.log("IS SAWUER)");
      return {width: p.min(width, height), height: p.min(width, height)}
    }
    return {width, height};
  }

  function getSizes(string, size, font, canvas) {
    // Determine the appropriate field size based on the text.
    const text = getTextSize(string, size, font);
    const field = {width: canvas.width - text.width, height: canvas.height - text.height * 0.8};
    return {text, field};
  }

  function randomPlacement(width, height, speed, angle) {
    position = {x: p.random(0, width), y: p.random(0, height)};
    velocity = {x: speed * p.cos(p.PI/180 * angle), y: speed * p.sin(p.PI/180 * angle)};
    const directionPicker = p.random(0, 4);
    if (directionPicker < 1) {
      velocity.x = -velocity.x;
      velocity.y = -velocity.y;
    } else if (directionPicker < 2) {
      velocity.x = -velocity.x;
    } else if (directionPicker < 3) {
      velocity.y = -velocity.y;
    }
  }

  function makePointers() {
    const count = 16;
    const thick = 4;
    const countX = p.floor(count * p.width / p.height);
    pointers = [];
    for (let i = 0; i < countX; i++) {
      for (let j = 0; j < count; j++) {
        pointers.push(new Pointer(p.width * i / countX, p.height * j / count, p.height / count - thick, thick));
      }
    }
  }

  p.mouseMoved = function() {
    console.log(p.mouseX, p.mouseY);
    if (p.mouseX > p.width || p.mouseY > p.height || p.mouseX < 0 || p.mouseY < 0) {
      return;
    }
    pointers.forEach((x) => {x.armTrigger(p.mouseX, p.mouseY); x.pointTo(p.mouseX, p.mouseY)});
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

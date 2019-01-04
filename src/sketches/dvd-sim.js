import { fitPointsToSize } from "./utility/geometry";

// TODO: Figure out why there's weird glitch stuff in "square" mode.
// TODO: Fix the power parameters to be more linear or whatever.

const sketch = (p) => {
  let lastMillis = 0;
  let position = {};
  let velocity = {};
  let sizes = {};
  p.isSquare = false;
  p.settings = {
    string: "",
    size: 100,
    color: "#ff0000",
    font: "Arial",
    angle: 45,
    speed: 200
  }

  function getTextSize(string, size, font) {
    p.textSize(size);
    p.textFont(font);
    return {height: size, width: p.textWidth(string)};
  }

  function getCanvasSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const canvas = (
      p.isSquare ?
        {width: p.min(width, height), height: p.min(width, height)}
      :
        {width, height}
    );
    return {canvas};
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

  function setVelocity(speed, angle) {
    velocity.x = (velocity.x < 0 ? -speed : speed) * p.cos(p.PI / 180 * angle);
    velocity.y = (velocity.y < 0 ? -speed : speed) * p.sin(p.PI / 180 * angle);
  }

  function getEllapsedTime() {
    const currentMillis = p.millis();
    const ellapsed = (currentMillis - lastMillis) / 1000.0;
    lastMillis = currentMillis;
    return ellapsed;
  }

  function isInField(x, y, width, height) {
    return !(x > width || x < 0 || y > height || y < 0);
  }

  function canFit() {
    // Check if the word can even fit in this field.
    return sizes.field.height > 0 && sizes.field.width > 0;
  }

  function bounceWord() {
    if (position.x > sizes.field.width) {
      position.x -= 2 * (position.x - sizes.field.width);
      velocity.x = -velocity.x;
    }
    if (position.y > sizes.field.height) {
      position.y -= 2 * (position.y - sizes.field.height);
      velocity.y = -velocity.y;
    }
    if (position.x < 0) {
      position.x = -position.x;
      velocity.x = -velocity.x;
    }
    if (position.y < 0) {
      position.y = -position.y;
      velocity.y = -velocity.y;
    }
  }

  function stepWord(ellapsed) {
    position.x += ellapsed * velocity.x;
    position.y += ellapsed * velocity.y;
    if (!isInField(position.x, position.y, sizes.field.width, sizes.field.height)) {
      bounceWord();
    }
    if (sizes.field.height <= 0) {
      position.y = 0;
    }
    if (sizes.field.width <= 0) {
      position.x = 0;
    }
  }

  p.windowResized = function() {
    sizes = getCanvasSize();
    p.resizeCanvas(sizes.canvas.width, sizes.canvas.height);
  }

  p.setup = function() {
    console.log("SETTING UP");
    sizes = getCanvasSize();
    p.createCanvas(sizes.canvas.width, sizes.canvas.height);
    sizes = {...sizes, ...getSizes(p.settings.string, p.settings.size, p.settings.font, sizes.canvas)};
    randomPlacement(sizes.field.width, sizes.field.height, p.settings.speed, p.settings.angle);
  }

  p.draw = function() {
    //console.log("HERE DAWG");
    sizes = {...sizes, ...getSizes(p.settings.string, p.settings.size, p.settings.font, sizes.canvas)};
    setVelocity(p.settings.speed, p.settings.angle);
    stepWord(getEllapsedTime());
    p.background(0);
    p.fill(p.settings.color);
    p.text(p.settings.string, position.x, position.y + p.settings.size * 0.75);
  }

};

export default sketch;

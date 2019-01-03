import { fitPointsToSize } from "./utility/geometry";

// TODO: Figure out why there's weird glitch stuff in "square" mode.
// TODO: Fix the power parameters to be more linear or whatever.

const sketch = (p) => {
  let millis;
  let position = {};
  let velocity = {};
  let sizes = {};
  p.isSquare = false;
  p.settings = {
    string: "DRAWN OUT PROCESS",
    size: 50,
    color: "#ffaacc",
    font: "Helvetica",
    angle: 45,
    speed: 200
  }

  function getTextSize(string, size, font) {
    p.textSize(size);
    p.textFont(font);
    return {height: size, width: p.textWidth(string)};
  }

  function getSizes(string, size, font) {
    // Determine the appropriate canvas and flower size.
    // The flower width is always equal to the canvas width.
    const width = window.innerWidth;
    const height = window.innerHeight;
    const canvas = (
      p.isSquare ?
        {width: p.min(width, height), height: p.min(width, height)}
      :
        {width, height}
    );
    const text = getTextSize(string, size, font);
    const field = {width: canvas.width - text.width, height: canvas.height - text.height};
    return {canvas, text, field};
  }

  function randomPlacement(width, height, speed, angle) {
    const position = {x: p.random(0, width), y: p.random(0, height)};
    let velocity = {x: speed * p.cos(p.PI/180 * angle), y: speed * p.sin(p.PI/180 * angle)};
    const directionPicker = p.random(0, 4);
    if (directionPicker < 1) {
      continue;
    } else if (directionPicker < 2) {
      velocity.x = -velocity.x;
    } else if (directionPicker < 3) {
      velocity.y = -velocity.y;
    } else {
      velocity.x = -velocity.x;
      velocity.y = -velocity.y;
    }
    return {position, velocity}
  }

  p.setup = function() {
    sizes = getSizes(p.settings.string, p.settings.size, p.settings.font);
    {velocity, position} = randomPlacement(sizes.field.width, sizes.field.height, p.settings.speed, p.settings.angle);
    p.createCanvas(sizes.canvas.width, sizes.canvas.height);
  }

  p.draw = function() {
    if (shouldDraw()) {
      const point = mousePoint();
      if (checkMousePoint(point, flower.scale, p.settings.numPetals, p.settings.petalRatio)) {
        drawConnectors();
        drawOuterFlower(flower);
      }
    }
  }

};

export default sketch;

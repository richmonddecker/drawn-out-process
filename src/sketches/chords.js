import p5 from "p5";

var radius;
var sliders;
var lastMillis = 0;

const chords = (p5) => {
  
}

function setup() {
  radius = p5.min(windowWidth, windowHeight) / 2;
  canvas = p5.createCanvas(2 * radius, 2 * radius);
  canvas.parent("canvas-container");
  colorMode(HSB, 1);
  clearCircle();
  makeTheButtons();
  makeTheSliders();
}

function clearCircle() {
  background(255);
  drawBorder();
}

function resizeCircle() {
  let newRadius = min(windowWidth, windowHeight) / 2;
    resizeCanvas(windowWidth, windowHeight);
    radius = newRadius;
    clearCircle();
}

function draw() {
  let ellapsed = getEllapsedTime();
  let coords = getCoords();
  let settings = getSettings();
  if (shouldDraw()) {
    makeLines(coords, settings, ellapsed);
  }
    drawBorder();
}

function drawBorder() {
  let r = 10000;
  push();
  translate(width/2, height/2);
  stroke(0);
  noFill();
  strokeWeight(r - 2*radius);
  ellipse(0, 0, r, r);
  pop();
}

function getCoords() {
  let x = mouseX - width/2;
  let y = mouseY - height/2;
  return {
    x: x,
    y: y,
    r: sqrt(sq(x) + sq(y)),
    th: PI + atan2(y, x)
  };
}

function getColor(coords, settings) {
  if (coords.r > radius) {
    return color(0, 0, 0, 1);
  }
  h = (settings.hueCycles * (coords.th / TWO_PI + 1.75) + 1 + settings.hueOffset / 360.0) % 1.0
  s = pow(coords.r / radius, 1.0 / settings.colorPower);
  b = (0.5 + 0.5 * pow(coords.r / radius, 1.0 / settings.colorPower));
  a = settings.lineAlpha / 100.0;
  return color(h, s, b, a);
}

function getAngleSpan(coords, settings) {
  return PI * pow((radius - coords.r) / radius, settings.spanPower);
}

function getEllapsedTime() {
  let nextMillis = millis();
  let ellapsed = nextMillis - lastMillis;
  lastMillis = nextMillis;
  return ellapsed / 1000.0;
}

function getNumLines(settings, ellapsed) {
  let factor = ellapsed * settings.lineSpeed;
  let numLines = floor(factor);
  if (random(0, 1) < factor % 1) {
    numLines += 1;
  }
  return numLines;
}

function drawLine(span) {
  push();
  rotate(random(-span/2, span/2));
  line(0, -2 * radius, 0, 2 * radius);
  pop();
}

function makeLines(coords, settings, ellapsed) {
  if (coords.r > radius) {
    return;
  }
  numLines = getNumLines(settings, ellapsed);
  span = getAngleSpan(coords, settings);
  push();
  translate(coords.x + width/2, coords.y + height/2);
  rotate(coords.th);
  strokeWeight(settings.lineThickness);
  stroke(getColor(coords, settings));
  for (let i = 0; i < numLines; i++) {
    drawLine(span);
  }
  pop();
}

function toggleFullscreen() {
  fullscreen(!fullscreen());
}

function shouldDraw() {
  return mouseIsPressed;
}

function keyReleased() {
  // if (keyCode === ESCAPE) {
  //  toggleFullscreen();
  // }
}

function makeTheButtons() {
  let button;
    
    button = createButton("Reset");
    button.mouseClicked(resizeCircle);
    button.position(20, 20);
    
    button = createButton("Full Screen");
  button.mouseClicked(toggleFullscreen);
    button.position(20, 40);
}


function makeTheSliders() {
  sliders = {};
  sliders.hueCycles = createSlider(0, 36, 6, 1);
  sliders.hueCycles.position(20, 60);
  sliders.lineSpeed = createSlider(1, 10000, 1000);
  sliders.lineSpeed.position(20, 80);
  sliders.lineThickness = createSlider(1, 20, 1, 1);
  sliders.lineThickness.position(20, 100);
  sliders.lineAlpha = createSlider(1, 100, 50, 1);
  sliders.lineAlpha.position(20, 120);
  sliders.spanPower = createSlider(0.1, 10, 1, 0.1);
  sliders.spanPower.position(20, 140);
  sliders.colorPower = createSlider(0.1, 10, 2, 0.1);
  sliders.colorPower.position(20, 160);
  sliders.hueOffset = createSlider(0, 360, 0, 1);
  sliders.hueOffset.position(20, 180);
}

function getSettings() {
  return {
    hueCycles: sliders.hueCycles.value(),
    lineSpeed: sliders.lineSpeed.value(),
    lineThickness: sliders.lineThickness.value(),
    lineAlpha: sliders.lineAlpha.value(),
    spanPower: sliders.spanPower.value(),
    colorPower: sliders.colorPower.value(),
    hueOffset: sliders.hueOffset.value()
  }
}

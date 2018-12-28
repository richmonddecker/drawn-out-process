const sketch = (p) => {
  let radius = 0;
  let lastMillis = 0;
  let settings = {
    hueCycles: 3,
    hueOffset: 0,
    lineSpeed: 1000,
    lineThickness: 1,
    lineOpacity: 50,
    spanPower: 1,
    colorPower: 2
  }

  function clearCircle() {
    p.background(255);
    drawBorder();
  }

  p.setup = function() {
    radius = p.min(window.innerWidth, window.innerHeight) / 2;
    p.createCanvas(2 * radius, 2 * radius);
    p.colorMode(p.HSB, 1);
    clearCircle();
  }

  p.draw = function() {
    let ellapsed = getEllapsedTime();
    let coords = getCoords();
    if (shouldDraw()) {
      makeLines(coords, settings, ellapsed);
    }
    drawBorder();
  }

  p.interpretProps = function({ controls }) {
    settings.hueCycles = parseFloat(controls.hueCycles, 10);
    settings.hueOffset = parseFloat(controls.hueOffset, 10);
    settings.lineSpeed = parseFloat(controls.lineSpeed, 10);
    settings.lineThickness = parseFloat(controls.lineThickness, 10);
    settings.lineOpacity = parseFloat(controls.lineOpacity, 10);
    settings.spanPower = parseFloat(controls.spanPower, 10);
    settings.colorPower = parseFloat(controls.colorPower, 10);
  }

  function drawBorder() {
    let r = 10000;
    p.push();
    p.translate(p.width/2, p.height/2);
    p.stroke(0);
    p.noFill();
    p.strokeWeight(r - 2 * radius);
    p.ellipse(0, 0, r, r);
    p.pop();
  }

  function getCoords() {
    let x = p.mouseX - p.width/2;
    let y = p.mouseY - p.height/2;
    return {
      x: x,
      y: y,
      r: p.sqrt(p.sq(x) + p.sq(y)),
      th: p.PI + p.atan2(y, x)
    };
  }

  function getColor(coords, settings) {
    if (coords.r > radius) {
      return p.color(0, 0, 0, 1);
    }
    let h = (settings.hueCycles * (coords.th / p.TWO_PI + 1.75) + 1 + settings.hueOffset / 360.0) % 1.0
    let s = p.pow(coords.r / radius, 1.0 / settings.colorPower);
    let b = (0.5 + 0.5 * p.pow(coords.r / radius, 1.0 / settings.colorPower));
    let a = settings.lineOpacity / 100.0;
    return p.color(h, s, b, a);
  }

  function getAngleSpan(coords, settings) {
    return p.PI * p.pow((radius - coords.r) / radius, settings.spanPower);
  }

  function getEllapsedTime() {
    let nextMillis = p.millis();
    let ellapsed = nextMillis - lastMillis;
    lastMillis = nextMillis;
    return ellapsed / 1000.0;
  }

  function getNumLines(settings, ellapsed) {
    let factor = ellapsed * settings.lineSpeed;
    let numLines = p.floor(factor);
    if (p.random(0, 1) < factor % 1) {
      numLines += 1;
    }
    return numLines;
  }

  function drawLine(span) {
    p.push();
    p.rotate(p.random(-span/2, span/2));
    p.line(0, -2 * radius, 0, 2 * radius);
    p.pop();
  }

  function makeLines(coords, settings, ellapsed) {
    if (coords.r > radius) {
      return;
    }
    let numLines = getNumLines(settings, ellapsed);
    let span = getAngleSpan(coords, settings);
    p.push();
    p.translate(coords.x + p.width/2, coords.y + p.height/2);
    p.rotate(coords.th);
    p.strokeWeight(settings.lineThickness);
    p.stroke(getColor(coords, settings));
    for (let i = 0; i < numLines; i++) {
      drawLine(span);
    }
    p.pop();
  }

  function shouldDraw() {
    return !p.isBlocked && p.mouseIsPressed;
  }
};

export default sketch;


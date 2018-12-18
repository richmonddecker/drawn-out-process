const sketch = (p) => {
  let radius = 0;
  let lastMillis = 0;
  let settings = {
    hueCycles: 3,
    lineSpeed: 1000,
    lineThickness: 1,
    lineAlpha: 50,
    spanPower: 1,
    colorPower: 2,
    hueOffset: 0
  }

  function clearCircle() {
    p.background(255);
    drawBorder();
  }

  function resizeCircle() {
    let newRadius = p.min(p.windowWidth, p.windowHeight) / 2;
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    radius = newRadius;
    clearCircle();
  }

  p.setup = function() {
    radius = p.min(p.windowWidth, p.windowHeight) / 2;
    p.createCanvas(2 * radius, 2 * radius);
    p.colorMode(p.HSB, 1);
    clearCircle();
    //makeTheButtons();
    //makeTheSliders();
  }

  p.draw = function() {
    let ellapsed = getEllapsedTime();
    let coords = getCoords();
    //let settings = getSettings();
    if (shouldDraw()) {
      makeLines(coords, settings, ellapsed);
    }
    drawBorder();
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
    let a = settings.lineAlpha / 100.0;
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

  function toggleFullscreen() {
    p.fullscreen(!p.fullscreen());
  }

  function shouldDraw() {
    return p.mouseIsPressed;
  }
};

export default sketch;

// function makeTheButtons() {
//   let button;
    
//     button = createButton("Reset");
//     button.mouseClicked(resizeCircle);
//     button.position(20, 20);
    
//     button = createButton("Full Screen");
//     button.mouseClicked(toggleFullscreen);
//     button.position(20, 40);
// }


// function makeTheSliders() {
//   sliders = {};
//   sliders.hueCycles = createSlider(0, 36, 6, 1);
//   sliders.hueCycles.position(20, 60);
//   sliders.lineSpeed = createSlider(1, 10000, 1000);
//   sliders.lineSpeed.position(20, 80);
//   sliders.lineThickness = createSlider(1, 20, 1, 1);
//   sliders.lineThickness.position(20, 100);
//   sliders.lineAlpha = createSlider(1, 100, 50, 1);
//   sliders.lineAlpha.position(20, 120);
//   sliders.spanPower = createSlider(0.1, 10, 1, 0.1);
//   sliders.spanPower.position(20, 140);
//   sliders.colorPower = createSlider(0.1, 10, 2, 0.1);
//   sliders.colorPower.position(20, 160);
//   sliders.hueOffset = createSlider(0, 360, 0, 1);
//   sliders.hueOffset.position(20, 180);
// }

// function getSettings() {
//   return {
//     hueCycles: sliders.hueCycles.value(),
//     lineSpeed: sliders.lineSpeed.value(),
//     lineThickness: sliders.lineThickness.value(),
//     lineAlpha: sliders.lineAlpha.value(),
//     spanPower: sliders.spanPower.value(),
//     colorPower: sliders.colorPower.value(),
//     hueOffset: sliders.hueOffset.value()
//   }
// }

const sketch = (p) => {

  // TODO: Make follow while mouse held, and when released, do spring behavior

  let theTrail = [];
  let sizes = {};
  let theSticks = [];
  let thePoint = {};
  let theVector = {x: 0, y: 0};
  let isHeld = false;
  let lastMillis = 0;
  p.isSquare = false;
  p.settings = {
    thickness: 1,
    count: 20,
    ballSize: 20,
    trailLength: 100,
    force: 1,
    damping: 1
  }

  class Stick {
    constructor(x1, y1, x2, y2, h) {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.h = h || getHue(x2, y2);
    }

    draw() {
      p.strokeWeight(p.settings.thickness);
      p.stroke(this.h, 1, 1);
      p.line(this.x1, this.y1, this.x2, this.y2);
    }
  }

  function getHue(x, y) {
    return (2 * p.abs(y - sizes.height / 2) / sizes.height + 2 * p.abs(x - sizes.width / 2) / sizes.width) % 1;
  }

  function cornerToPointSticks(corner, point, number) {
    let sticks = [];
    let h1 = getHue(corner.x, point.y);
    let h2 = getHue(point.x, corner.y);
    if (h1 >= h2) {
      h2 += 1;
    }
    if (h2 - h1 < 0.5) {
      h2 += 1;
    }
    for (let i = 0; i <= number; i++) {
      sticks.push(new Stick(
        corner.x + (point.x - corner.x) / 2 + i * (point.x - corner.x) / number / 2,
        //corner.x + i * (point.x - corner.x) / number,
        corner.y,
        point.x,
        corner.y + i * (point.y - corner.y) / number
      ));
      sticks.push(new Stick(
        corner.x,
        corner.y + (point.y - corner.y) / 2 + i * (point.y - corner.y) / number / 2,
        //corner.y + i * (point.y - corner.y) / number,
        corner.x + i * (point.x - corner.x) / number,
        point.y
      ));
      sticks.push(new Stick(
        corner.x,
        (corner.y + point.y) / 2 + (corner.y - (corner.y + point.y) / 2) * i / number,
        (corner.x + point.x) / 2 + (corner.x - (corner.x + point.x) / 2) * (number - i) / number,
        corner.y,
        (((number - i) * h1 + i * h2) / number) % 1
      ));
    }
    return sticks;
  }


  function getCanvasSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (p.isSquare) {
      return {width: p.min(width, height), height: p.min(width, height)}
    }
    return {width, height};
  }

  function makeSticksFromPoint(point) {
    const sticks1 = cornerToPointSticks({x: 0, y: 0}, point, p.settings.count);
    const sticks2 = cornerToPointSticks({x: 0, y: sizes.height-1}, point, p.settings.count);
    const sticks3 = cornerToPointSticks({x: sizes.width-1, y: 0}, point, p.settings.count);
    const sticks4 = cornerToPointSticks({x: sizes.width-1, y: sizes.height-1}, point, p.settings.count);
    theSticks = sticks1.concat(sticks2, sticks3, sticks4);
    console.log(theSticks.map((s) => [s.x1, s.y1, s.x2, s.y2]))
  }

  function stepPoint() {
    if (!p.mouseIsPressed || p.isBlocked) {
      thePoint.x += theVector.x;
      thePoint.y += theVector.y;
      const direction = {x: sizes.width / 2 - thePoint.x, y: sizes.height / 2 - thePoint.y};
      accelerateVector(theVector, direction);
      dampVector(theVector, p.settings.damping);
      updateTrail(theTrail, thePoint);
    }
  }

  function updateTrail(trail, point) {
    if (trail.length >= p.settings.trailLength) {
      for (let i = 0; i <= trail.length - p.settings.trailLength; i++) {
        trail.shift();
      }
    }
    trail.push({x: point.x, y: point.y});
  }

  function drawTrail(trail) {
    let alpha, point;
    for (let i = 0; i < trail.length; i++) {
      alpha = 1 - p.sqrt((i + 1) / p.settings.trailLength);
      point = trail[trail.length - 1 - i];
      p.stroke(getHue(point.x, point.y), 1, 1, alpha);
      p.noFill();
      p.ellipse(point.x, point.y, p.settings.ballSize, p.settings.ballSize);
    }
  }

  function accelerateVector(vector, direction) {
    vector.x += p.sq(p.settings.force) * direction.x / 3000;
    vector.y += p.sq(p.settings.force) * direction.y / 3000;
  }

  function dampVector(vector, damping) {
    vector.x /= (1 + p.sqrt(p.abs(damping)) * damping / 300);
    vector.y /= (1 + p.sqrt(p.abs(damping)) * damping / 300);
  }

  p.mousePressed = function() {
    if (!p.isBlocked) {
      console.log("NOT BLOCKED");
      thePoint = {x: p.mouseX, y: p.mouseY};
      theVector = {x: 0, y: 0};
      theTrail = [];
      makeSticksFromPoint(thePoint);
    }
  }

  p.mouseMoved = function() {
    if (!p.isBlocked && p.mouseIsPressed) {
      isHeld = true;
      theVector = {x: p.mouseX - thePoint.x, y: p.mouseY - thePoint.y};
      thePoint = {x: p.mouseX, y: p.mouseY};
      makeSticksFromPoint(thePoint);
    }
  }

  p.mouseReleased = function() {
    isHeld = false;
  }

  p.touchMoved = function() {
    p.mouseMoved();
  }

  p.windowResized = function() {
    sizes = getCanvasSize();
    p.resizeCanvas(sizes.width, sizes.height);
    theTrail = [];
  }

  p.setup = function() {
    p.colorMode(p.HSB, 1);
    p.frameRate(40);
    sizes = getCanvasSize();
    p.resizeCanvas(sizes.width, sizes.height);
    thePoint = {x: sizes.width / 2, y: sizes.height / 2};
    theVector = {x: 0, y: 0}
  }

  p.draw = function() {
    p.background(0);
    stepPoint();
    makeSticksFromPoint(thePoint);
    drawTrail(theTrail);
    theSticks.forEach((s) => s.draw());
    p.fill(0, 0, 1, 1);
    p.stroke(getHue(thePoint.x, thePoint.y), 1, 1);
    p.ellipse(thePoint.x, thePoint.y, p.settings.ballSize, p.settings.ballSize);
  }

};

export default sketch;

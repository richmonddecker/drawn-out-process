// TODO HERE: FIX REDUX FORM CONTROLS TO PASS REAL INTS

const sketch = (p) => {
  let canvas;
  let polygon;
  let points = [];
  p.isSquare = false;
  p.settings = {
    numSides: 6,
    lineThickness: 2,
    hueCycles: 3,
    hueOffset: 0,
    lineOpacity: 60
  }

  function polygonRatio(n) {
    // Return the ratio of the polygon's width to its height.
    if (n % 4 === 0) {
      return 1;
    }
    if (n % 2 === 0) {
      return 1 / p.cos(p.PI / n);
    }
    console.log("TESTER: ", n, p.floor((1 + n) / 4))
    console.log("WHAT: ", p.floor(5/4), p.floor(6/4), p.floor(7/4));
    const top = 2 * p.sin(p.TWO_PI / n * p.floor((n + 1) / 4));
    const bottom = 1 + p.cos(p.PI / n);
    console.log("TOP, BOTTOM:", n, top, bottom);
    // This is how to get the width ratio of an odd-sided polygon.
    return 2 * p.sin(p.TWO_PI * p.floor((n + 1) / 4) / n) / (1 + p.cos(p.PI / n));
  }

  function getSizes(n, square) {
    // Determine the appropriate canvas and polygon size.
    // The polygon width is always equal to the canvas width.
    const ratio = polygonRatio(n);
    console.log("THE RATIO IS: ", n, ratio)
    let canvas = {};
    let polygon = {};
    if (square) {
      // The canvas width and height are the same.
      canvas.height = p.min(window.innerWidth, window.innerHeight);
      canvas.width = canvas.height;
      polygon.height = canvas.width / ratio;
    } else {
      // The canvas will perfectly fit the polygon.
      canvas.height = p.min(window.innerHeight, window.innerWidth / ratio);
      canvas.width = canvas.height * ratio;
      polygon.height = canvas.height;
    }
    polygon.width = canvas.width;
    // Now compute where the center of the polygon will be.
    let center = {x: canvas.width / 2};
    let radius = {}
    if (n % 2 === 0) {
      radius.little = polygon.height / 2;
      radius.big = radius.little / p.cos(p.PI / n);
      center.y = canvas.height / 2;
    } else {
      const a = polygon.height / (1 / p.tan(p.PI / n) + 1 / p.sin(p.PI / n));
      radius.little = a / p.tan(p.PI / n);
      radius.big = a / p.sin(p.PI / n);
      center.y = (canvas.height - polygon.height) / 2 + radius.big;
    }
    polygon.radius = radius;
    polygon.center = center;
    return {canvas, polygon};
  }

  function clearPolygon(n) {
    p.background(0);
    drawPolygon(n);
    drawOuterPolygon(n);
  }

  p.setup = function() {
    p.settings.numSides = parseInt(p.settings.numSides, 10);
    const answer = getSizes(p.settings.numSides, p.isSquare);
    polygon = answer.polygon;
    canvas = answer.canvas
    p.createCanvas(canvas.width, canvas.height);
    p.colorMode(p.HSB, 1);
    clearPolygon(p.settings.numSides);
  }

  p.draw = function() {
    if (shouldDraw()) {
      drawLines();
      drawOuterPolygon(p.settings.numSides);
    }
  }

  function drawOuterPolygon() {
    p.push();
    p.translate(polygon.center.x, polygon.center.y);
    p.noFill();
    p.stroke(0);
    p.strokeWeight(2 * polygon.radius.little);
    p.beginShape();
    points.forEach((point) => {
      p.vertex(2 * point.x, 2 * point.y);
    });
    p.endShape(p.CLOSE);
    p.pop();
  }

  function drawPolygon(n) {
    const angleOffset = n % 2 ? -p.PI / 2 : -p.PI / 2 + p.PI / n;
    points = [];
    p.push();
    p.translate(polygon.center.x, polygon.center.y);
    p.noStroke();
    p.fill(1);
    p.beginShape();
    let angle;
    for (let i = 0; i < n; i++) {
      angle = angleOffset + p.TWO_PI * i / n;
      let point = {x: polygon.radius.big * p.cos(angle), y: polygon.radius.big * p.sin(angle)};
      p.vertex(point.x, point.y);
      points.push(point);
    }
    points.push(points[0]);
    p.endShape(p.CLOSE);
    p.pop();
  }

  function getPointIntersection(point, pa, pb) {
    // Check if the point p can intersect orthogonally with the ray pa-pb.
    // Also we will check if the mouse is outside the polygon.
    let na = {x: pa.x - point.x, y: pa.y - point.y};
    let nb = {x: pb.x - point.x, y: pb.y - point.y};
    const angle = -p.atan2(nb.y - na.y, nb.x - na.x) + p.PI;
    let ra = {x: p.cos(angle) * na.x - p.sin(angle) * na.y, y: p.sin(angle) * na.x + p.cos(angle) * na.y};
    let rb = {x: p.cos(angle) * nb.x - p.sin(angle) * nb.y, y: p.sin(angle) * nb.x + p.cos(angle) * nb.y};
    const fraction = p.abs(ra.x) / p.abs(rb.x - ra.x);
    const intersectX = pa.x * (1 - fraction) + pb.x * fraction;
    const intersectY = pa.y * (1 - fraction) + pb.y * fraction;
    if (ra.x * rb.x < 0) {
      return {
        x: intersectX,
        y: intersectY,
        outside: ra.y < 0
      };
    }
    return null;
  }

  function drawLines() {
    const mousePoint = {x: p.mouseX - polygon.center.x, y: p.mouseY - polygon.center.y};
    let linePoints = [];
    let intersection;
    for (let i = 0; i < p.settings.numSides; i++) {
      intersection = getPointIntersection(mousePoint, points[i], points[i+1]);
      if (intersection) {
        if (intersection.outside) {
          linePoints = [];
          break;
        }
        linePoints.push(intersection);
      }
    }
    p.push();
    p.strokeWeight(p.settings.lineThickness);
    p.translate(polygon.center.x, polygon.center.y);
    linePoints.forEach((point) => {
      let dist = p.dist(mousePoint.x, mousePoint.y, point.x, point.y);
      let hue = (p.settings.hueCycles * dist / (2 * polygon.radius.little) + p.settings.hueOffset / 100.0) % 1;
      p.stroke(hue, 1, 1, p.settings.lineOpacity / 100);
      p.line(mousePoint.x, mousePoint.y, point.x, point.y);
    });
    p.pop();
    return {mouse: mousePoint, lines: linePoints};
  }

  function shouldDraw() {
    return !p.isBlocked && p.mouseIsPressed;
  }
};

export default sketch;

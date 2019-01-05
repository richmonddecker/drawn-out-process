import { fitPointsToSize } from "./utility/geometry";

export default const sketch = (p) => {
  let canvas;
  let polygon;
  let center;
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
    // This is how to get the width ratio of an odd-sided polygon.
    return 2 * p.sin(p.TWO_PI * p.floor((n + 1) / 4) / n) / (1 + p.cos(p.PI / n));
  }

  function polygonPoints(n) {
    let points = [];
    const angleOffset = n % 2 ? -p.PI / 2 : -p.PI / 2 + p.PI / n;
    let angle;
    for (let i = 0; i < n; i++) {
      angle = angleOffset + p.TWO_PI * i / n;
      points.push([p.cos(angle), p.sin(angle)]);
    }
    return points;
  }

  function getSizes(n, square) {
    // Determine the appropriate canvas and polygon size.
    // The polygon width is always equal to the canvas width.
    const polyPoints = polygonPoints(n);
    const fit = fitPointsToSize(polyPoints, square);
    //console.log("SHEE", fit)
    canvas = fit.canvas;
    polygon = fit.object;
    polygon.center = fit.center;
    polygon.points = fit.points;
    if (n % 2 === 0) {
      polygon.radius = polygon.height / 2;
    } else {
      const a = polygon.height / (1 / p.tan(p.PI / n) + 1 / p.sin(p.PI / n));
      polygon.radius = a / p.tan(p.PI / n);
    }
    return {canvas, polygon};
  }

  function clearPolygon(polygon) {
    p.background(0);
    drawPolygon(polygon);
    drawOuterPolygon(polygon);
  }

  p.setup = function() {
    const answer = getSizes(p.settings.numSides, p.isSquare);
    canvas = answer.canvas;
    polygon = answer.polygon;
    p.createCanvas(canvas.width, canvas.height);
    p.colorMode(p.HSB, 1);
    clearPolygon(polygon);
  }

  p.draw = function() {
    if (shouldDraw()) {
      drawLines();
      drawOuterPolygon(polygon);
    }
  }

  function drawOuterPolygon(polygon) {
    p.push();
    p.translate(polygon.center.x, polygon.center.y);
    p.noFill();
    p.stroke(0);
    p.strokeWeight(2 * polygon.radius);
    p.beginShape();
    polygon.points.forEach((point) => {
      p.vertex(2 * point.x, 2 * point.y);
    });
    p.endShape(p.CLOSE);
    p.pop();
  }

  function drawPolygon(polygon) {
    p.push();
    p.translate(polygon.center.x, polygon.center.y);
    p.noStroke();
    p.fill(1);
    p.beginShape();
    polygon.points.forEach((point) => {
      p.vertex(point.x, point.y);
    });
    p.endShape(p.CLOSE);
    p.pop();
  }


  function getPointIntersection(point, pa, pb) {
    // Check if the point p can intersect orthogonally with the ray pa-pb.
    // Also we will check if the mouse is outside the polygon.
    console.log(point, pa, pb);
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
      intersection = getPointIntersection(mousePoint, polygon.points[i], polygon.points[(i+1)%p.settings.numSides]);
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
      let hue = (p.settings.hueCycles * dist / (2 * polygon.radius) + p.settings.hueOffset / 100.0) % 1;
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

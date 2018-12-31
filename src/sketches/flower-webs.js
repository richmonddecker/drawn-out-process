import { fitPointsToSize } from "./utility/geometry";

const sketch = (p) => {
  const count = 1000;
  let canvas;
  let flower
  p.isSquare = false;
  p.settings = {
    numPetals: 6,
    petalRatio: 2,
    hueCycles: 3,
    hueOffset: 0,
    lineOpacity: 60
  }

  function flower(n, r) {
    return (theta) => {
      let shift = 0;
      if (n % 2) {
        shift += p.PI / 2;
      } else if (n % 4 === 0) {
        shift += p.PI / n;
      }
      return 1 + r * p.abs(p.cos(n * (theta + shift) / 2));
    };
  }

  function flowerPoints(n, r, count) {
    let points = [];
    const angleOffset = n % 2 ? -p.PI / 2 : -p.PI / 2 + p.PI / n;
    let angle;
    let radius;
    for (let i = 0; i < count+1; i++) {
      angle = p.TWO_PI * i / count;
      radius = flower(n, r)(angle);
      points.push([radius * p.cos(angle), radius * p.sin(angle)]);
    }
    return points;
  }

  function getSizes(n, r, square) {
    // Determine the appropriate canvas and flower size.
    // The flower width is always equal to the canvas width.
    const polyPoints = flowerPoints(n, r);
    const fit = fitPointsToSize(polyPoints, square);
    //console.log("SHEE", fit)
    canvas = fit.canvas;
    flower = fit.object;
    flower.center = fit.center;
    flower.points = fit.points;
    return {canvas, flower};
  }

  function clearFlower(flower) {
    p.background(0);
    drawFlower(flower);
    drawOuterFlower(flower);
  }

  p.setup = function() {
    const answer = getSizes(p.settings.numSides, p.isSquare);
    canvas = answer.canvas;
    flower = answer.flower;
    p.createCanvas(canvas.width, canvas.height);
    p.colorMode(p.HSB, 1);
    clearFlower(flower);
  }

  p.draw = function() {
    if (shouldDraw()) {
      drawLines();
      drawOuterFlower(flower);
    }
  }

  function drawOuterFlower(flower) {
    p.push();
    p.translate(flower.center.x, flower.center.y);
    p.noFill();
    p.stroke(0);
    p.strokeWeight(2 * flower.radius);
    p.beginShape();
    flower.points.forEach((point) => {
      p.vertex(2 * point.x, 2 * point.y);
    });
    p.endShape(p.CLOSE);
    p.pop();
  }

  function drawFlower(flower) {
    p.push();
    p.translate(flower.center.x, flower.center.y);
    p.noStroke();
    p.fill(1);
    p.beginShape();
    flower.points.forEach((point) => {
      p.vertex(point.x, point.y);
    });
    p.endShape(p.CLOSE);
    p.pop();
  }


  function getPointIntersection(point, pa, pb) {
    // Check if the point p can intersect orthogonally with the ray pa-pb.
    // Also we will check if the mouse is outside the flower.
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
    const mousePoint = {x: p.mouseX - flower.center.x, y: p.mouseY - flower.center.y};
    let linePoints = [];
    let intersection;
    for (let i = 0; i < p.settings.numSides; i++) {
      intersection = getPointIntersection(mousePoint, flower.points[i], flower.points[(i+1)%p.settings.numSides]);
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
    p.translate(flower.center.x, flower.center.y);
    linePoints.forEach((point) => {
      let dist = p.dist(mousePoint.x, mousePoint.y, point.x, point.y);
      let hue = (p.settings.hueCycles * dist / (2 * flower.radius) + p.settings.hueOffset / 100.0) % 1;
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

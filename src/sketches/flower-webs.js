import { fitPointsToSize } from "./utility/geometry";

const sketch = (p) => {
  const count = 1000;
  const count2 = 100;
  let canvas;
  let flower
  p.isSquare = false;
  p.settings = {
    numPetals: 5,
    petalRatio: 2,
    sinePower: 4,
    hueCycles: 3,
    hueOffset: 0,
    lineOpacity: 60
  }

  function flowerFun(n, r) {
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

  function flowerPoints(n, r, cnt) {
    let points = [];
    const angleOffset = n % 2 ? -p.PI / 2 : -p.PI / 2 + p.PI / n;
    let angle;
    let radius;
    for (let i = 0; i < cnt+1; i++) {
      angle = p.TWO_PI * i / cnt;
      radius = flowerFun(n, r)(angle);
      points.push([radius * p.cos(angle), radius * p.sin(angle)]);
    }
    return points;
  }

  function getSizes(n, r, square) {
    // Determine the appropriate canvas and flower size.
    // The flower width is always equal to the canvas width.
    const points = flowerPoints(n, r, count);
    const fit = fitPointsToSize(points, square);
    canvas = fit.canvas;
    flower = fit.object;
    flower.center = fit.center;
    flower.points = fit.points;
    flower.scale = fit.scale;
    return {canvas, flower};
  }

  function clearFlower(flower) {
    p.background(0);
    drawFlower(flower);
    drawOuterFlower(flower);
  }

  p.setup = function() {
    const answer = getSizes(p.settings.numPetals, p.settings.petalRatio, p.isSquare);
    canvas = answer.canvas;
    flower = answer.flower;
    p.createCanvas(canvas.width, canvas.height);
    p.colorMode(p.HSB, 1);
    clearFlower(flower);
  }

  p.draw = function() {
    if (shouldDraw()) {
      const point = mousePoint();
      console.log("POINTL: ", point);
      if (checkMousePoint(point, flower.scale, p.settings.numPetals, p.settings.petalRatio)) {
        drawConnectors();
        drawOuterFlower(flower);
      }
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
    console.log("I'M HERE", flower);
    p.beginShape();
    flower.points.forEach((point) => {
      p.vertex(point.x, point.y);
    });
    p.endShape(p.CLOSE);
    p.pop();
  }

  function mousePoint() {
    const point = {x: p.mouseX - flower.center.x, y: p.mouseY - flower.center.y};
    point.r = p.mag(point.x, point.y);
    point.th = p.atan2(point.y, point.x);
    return point;
  }

  function checkMousePoint(point, scale, n, r) {
    return point.r < scale * flowerFun(n, r)(point.th);
  }


  function drawConnectors() {
    const mousePoint = {x: p.mouseX - flower.center.x, y: p.mouseY - flower.center.y};
    const r = p.mag(mousePoint.x, mousePoint.y);
    p.push();
    const angle = p.TWO_PI + p.atan2(mousePoint.y, mousePoint.x);
    p.translate(flower.center.x, flower.center.y);
    p.rotate(angle);
    p.noFill();
    const hue = ((angle + p.PI / 2) * p.settings.hueCycles / p.TWO_PI + p.settings.hueOffset / 100.0) % 1;
    console.log("HUE: ", hue);
    p.stroke(hue, 1, 1, p.settings.lineOpacity / 100.0);
    let factor;
    let th;
    console.log("SHOOPS", p.settings)
    for (let i = 0; i < p.settings.numPetals - 2; i++) {
      p.rotate(p.TWO_PI / p.settings.numPetals);
      p.beginShape();
      for (let j = 0; j < 2 * count2; j++) {
        th = p.TWO_PI / p.settings.numPetals * j / count2;
        factor = 1 - p.settings.petalRatio / (1.0 + p.settings.petalRatio) * p.pow(p.sin(p.settings.numPetals * th / 2), 1.0 / p.settings.sinePower);
        p.vertex(r * factor * p.cos(th), r * factor * p.sin(th));
      }
      p.vertex((r - 1) * p.cos(p.TWO_PI / p.settings.numPetals), (r - 1) * p.sin(p.TWO_PI / p.settings.numPetals));
      p.endShape();
    }
    p.pop();
  }

  function shouldDraw() {
    return !p.isBlocked && p.mouseIsPressed;
  }
};

export default sketch;

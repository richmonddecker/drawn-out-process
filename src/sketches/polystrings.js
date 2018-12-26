const sketch = (p) => {
  const aspect = 2 / p.sqrt(3);
  let radius = 0;
  let lastMillis = 0;
  let points = [];
  let center;
  let settings = {
    numSides: 3,
    lineThickness: 4,
    lineOpacity: 50
  }

  function clearPolygon(n) {
    p.background(0.3);
    drawPolygon(n);
  }

  p.setup = function() {
    //if (window.innerHeight < 4)
    radius = p.min(window.innerWidth, window.innerHeight) / 2;
    p.createCanvas(3 * radius, 2 * radius);
    p.colorMode(p.HSB, 1);
    clearPolygon(settings.numSides);
  }

  p.draw = function() {
    if (shouldDraw()) {
      drawLines();
    }
  }

  p.interpretProps = function({ controls }) {
    console.log("SETTINGS NOW: ")
  }

  function sidewaysFactor(n) {
    // Get the horizontal factor for a polygon of n sides.
    let cosineSum = 0;
    for (let i = 0; i < p.floor((n + 1) / 4); i++) {
      cosineSum += p.cos(p.TWO_PI * i / n);
    }
    return cosineSum * 2 * p.sin(p.PI / n);
  }

  function drawPolygon(n) {
    points = [];
    const factor = sidewaysFactor(n);
    const h = 2 * radius;
    const bigRadius = n % 2 ? h / (1 + p.cos(p.PI / n)) : h / 2 / p.cos(p.PI / n);
    const yOffset = n % 2 ? bigRadius : radius;
    const angleOffset = n % 2 ? -p.PI / 2 : -p.PI / 2 + p.PI / n;
    center = {x: p.width / 2, y: yOffset};
    p.push();
    p.translate(center.x, center.y);
    p.noStroke();
    p.fill(1);
    p.beginShape();
    let angle;
    for (let i = 0; i < n; i++) {
      angle = angleOffset + p.TWO_PI * i / n;
      let point = {x: bigRadius * p.cos(angle), y: bigRadius * p.sin(angle)};
      p.vertex(point.x, point.y);
      points.push(point);
    }
    points.push(points[0]);
    p.endShape(p.CLOSE);
    p.pop();
  }

  function getPointIntersection(point, pa, pb) {
    // Check if the point p can intersect orthogonally with the ray pa-pb.
    let na = {x: pa.x - point.x, y: pa.y - point.y};
    let nb = {x: pb.x - point.x, y: pb.y - point.y};
    const angle = -p.atan2(nb.y - na.y, nb.x - na.x);
    let ra = {x: p.cos(angle) * na.x - p.sin(angle) * na.y, y: p.sin(angle) * na.x + p.cos(angle * na.y)};
    let rb = {x: p.cos(angle) * nb.x - p.sin(angle) * nb.y, y: p.sin(angle) * nb.x + p.cos(angle * nb.y)};
    if (ra.x < 0 && rb.x > 0) {
      const fraction = p.abs(ra.x) / (rb.x - ra.x);
      return {x: pa.x * (1 - fraction) + pb.x * fraction, y: pa.y * (1 - fraction) + pb.y * fraction};
    }
    return null;
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

  function drawLines() {
    const mousePoint = {x: p.mouseX - center.x, y: p.mouseY - center.y};
    let linePoints = [];
    let intersection;
    for (let i = 0; i < settings.numSides; i++) {
      intersection = getPointIntersection(mousePoint, points[i], points[i+1]);
      if (intersection) {
        linePoints.push(intersection);
      }
    }
    p.push();
    p.strokeWeight(settings.lineThickness);
    p.translate(center.x, center.y);
    linePoints.forEach((point) => {
      let dist = p.dist(mousePoint.x, mousePoint.y, point.x, point.y);
      let hue = (2 * dist / (2 * radius)) % 1;
      p.stroke(hue, 1, 1, settings.lineOpacity / 100);
      console.log("HERE:", dist / (2 * radius));
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

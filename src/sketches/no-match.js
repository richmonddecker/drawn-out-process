const sketch = (p) => {
  let size;
  const string = "¯\\_(ツ)_/¯";
  const period = 5000;
  let zero;
  p.settings = {
    string: "",
    size: 100,
    color: "#ff0000",
    font: "Arial",
    angle: 45,
    speed: 200
  }

  function getTextSize(string, size) {
    // Calculate the maximum font size for a given canvas width.
    p.textSize(100);
    const theWidthAt100 = p.textWidth(string);
    const ratio = size / theWidthAt100;
    const fontSize = ratio * 100;
    return fontSize;
  }

  function getCanvasSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    size = p.min(width, height);
    return size;
  }

  function getEllapsed() {
    return p.millis() - zero;
  }

  function getColor(ellapsed, period) {
    return (0.5 * (ellapsed / period)) % 1.0;
  }

  function getSize(ellapsed, period, size) {
    return size * (0.67 - 0.33 * p.cos(ellapsed / period * p.TWO_PI));
  }

  p.windowResized = function() {
    size = getCanvasSize();
    p.resizeCanvas(size, size);
  }

  p.setup = function() {
    zero = p.millis();
    size = getCanvasSize();
    p.createCanvas(size, size);
    p.colorMode(p.HSB, 1);
  }

  p.draw = function() {
    p.background(0);
    p.fill(getColor(getEllapsed(), period), 1, 1);
    p.translate(p.width/2, p.height/2);
    const maxSize = getTextSize(string, size);
    const textSize = getSize(getEllapsed(), period, maxSize);
    p.textSize(textSize);
    p.text(string, -p.textWidth(string) / 2, textSize / 3.2);
  }

};

export default sketch;

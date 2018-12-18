const sketch = (p) => {
  let radius = 0;
  let word = "none";

  p.setup = function() {
    radius = p.min(p.windowWidth, p.windowHeight) / 2;
    p.createCanvas(2 * radius, 2 * radius);
    p.colorMode(p.HSB, 1);
  }

  p.draw = function() {
    p.translate(p.width / 2, p.height / 2);
    p.background(0);
    for (let i = 0; i < 10; i++) {
      p.fill(i / 10, 1, 1);
      p.ellipse(0, 0, radius * (1 - i / 10), radius * (1 - i / 10));
    }
    p.fill(255);
    p.textSize(50);
    p.text(word, 0, 0);
  }

  p.interpretProps = function(props) {
    word = props.word || word;
  }
}

export default sketch;
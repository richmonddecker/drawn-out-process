const sketch = (p) => {
  let sizes = {};
  let drawing = false;
  let trees = [];
  let speed = 1.0;
  let lastCompletion = 0.0;
  let completion = 0.0;
  let lastMillis = 0;
  let drawingPoint = {x: 0, y: 0};
  let lastPoint = {x: 0, y: 0};
  p.settings = {
    speed: 1.0,
    widthFactor: 1,
    leafNumber: 2,
    persistence: 1,
    flipside: false
  };

  // TODO: HAVE AN EASY MODE WHERE THE TREE MOVES AT CONSTANT SPEED UP OR DOWN INSTEAD OF EXACTLY WITH THE MOUSE
  // TODO: HAVE A MAX NUMBER OF LEAVES TO PREVENT LAG

  class Tree {
    constructor(point, width, number, probability, level=0) {
      if (level === 0) {
        this.width = p.settings.widthFactor * sizes.width * (1.0 - 1.0 / number);
      } else {
        this.width = width;
      }
      this.point = point;
      this.number = number;
      this.probability = probability;
      this.level = level;
      this.setActiveBranches();
    }

    setActiveBranches() {
      this.branches = [];
      for (let i = 0; i < this.number; i++) {
        if (p.random() > this.probability) {
          this.branches.push(0);
        } else {
          this.branches.push(1);
        }
      }
      if (this.level === 0 && this.branches.every(x => x === 0)) {
        this.branches[p.random(0, this.number) | 0] = 1;
      }
    }

    getChildTrees() {
      let newTrees = [];
      let newX;
      // Here we prevent things from getting too huge.
      const theNumber = p.pow(this.number, this.level) >= 500 ? 1 : this.number; 
      for (let i = 0; i < theNumber; i++) {
        if (this.branches[i]) {
          newX = this.point + 0.5 * this.width * (-1.0 + i * 2.0 / (this.number - 1));
        }
        newTrees.push(new Tree(newX, this.width / this.number, this.number, this.probability, this.level + 1));
      }
      return newTrees;
    }
  }

  function drawBackground() {
    p.push();
    p.noStroke();
    p.fill(0);
    p.pop();
  }

  function handleTime() {
    const newMillis = p.millis();
    const ellapsed = newMillis - lastMillis;
    completion += ellapsed / 1000.0 * p.settings.speed;
    lastMillis = newMillis;
    if (completion > 1.0) {
      getNextTreeLevel();
      completion = completion - 1.0;
      lastCompletion = 0.0;
    }
  }

  function getNextTreeLevel() {
    let newTrees = [];
    trees.forEach((tree) => {
      newTrees = newTrees.concat(tree.getChildTrees());
    })
    trees = newTrees;
  }

  p.setup = function() {
    if (p.isSquare) {
      sizes.width = p.min(window.innerWidth, window.innerHeight);
      sizes.height = sizes.width;
    } else {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
    }
    p.createCanvas(sizes.width, sizes.height);
    p.colorMode(p.HSB, 1);
    p.background(255);
    p.stroke(0);
    p.strokeWeight(10);
    drawBackground();
  }

  function treePoint(base, tree, i, completion) {
    return base.x + tree.point + 0.5 * tree.width * completion * (-1 + i * 2.0 / (tree.number - 1));
  }

  p.draw = function() {
    drawingPoint = {x: p.mouseX, y: p.mouseY};
    handleTime();
    if (!drawing) {
      return;
    }
    p.stroke(completion, 1, 0.8);
    trees.forEach((tree) => {
      for (let i = 0; i < tree.branches.length; i++) {
        if (tree.branches[i]) {
          const oldPoint = treePoint(lastPoint, tree, i, lastCompletion);
          const newPoint = treePoint(drawingPoint, tree, i, completion);
          p.line(oldPoint, lastPoint.y, newPoint, drawingPoint.y);
        }
      }
    });
    lastCompletion = completion;
    lastPoint = drawingPoint;
    drawBackground();
  }

  p.mousePressed = function() {
    drawing = true;
    completion = 0.0;
    lastPoint = {x: p.mouseX, y: p.mouseY};
    drawingPoint = {x: p.mouseX, y: p.mouseY};
    trees.push(new Tree(0, null, p.settings.leafNumber, p.settings.persistence));
  }

  p.mouseReleased = function() {
    drawing = false;
  }

  p.mouseMoved = function() {
    trees = [];
    completion = 0.0;
    lastCompletion = 0.0;
    trees.push(new Tree(0, null, p.settings.leafNumber, p.settings.persistence));
    drawingPoint = {x: p.mouseX, y: p.mouseY};
  }

  function shouldDraw() {
    return !p.isBlocked && p.mouseIsPressed;
  }
};

export default sketch;

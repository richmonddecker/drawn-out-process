const sketch = (p) => {
  let sizes = {};
  let drawing = false;
  let trees = [];
  let speed = 1.0;
  let completion = 0.0;
  let lastMillis = 0;
  let drawingPoint = {x: 0, y: 0};
  p.settings = {
    height: 100,
    speed: 1.0,
    widthFactor: 1,
    leafNumber: 2,
    persistence: 1,
    flipside: false
  };

  class Tree {
    constructor(point, height, widthFactor, number, probability, isRoot=false) {
      this.point = point;
      this.height = height;
      this.widthFactor = widthFactor;
      this.number = number;
      this.probability = probability;
      this.isRoot = isRoot;
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
      if (this.isRoot && this.branches.every(x => x === 0)) {
        this.branches[p.random(0, this.number) | 0] = 1;
      }
    }

    getChildTrees() {
      let newTrees = [];
      const newY = this.point.y + this.height * (p.settings.flipside ? -1 : 1);
      let newX;
      for (let i = 0; i < this.number; i++) {
        if (this.branches[i]) {
          newX = this.point.x - this.height * this.widthFactor * (-1.0 + i * 2.0 / (this.number - 1));
        }
        newTrees.push(new Tree({x: newX, y: newY}, this.height / this.number, this.widthFactor, this.number, this.probability, false));
      }
      return newTrees;
    }
  }

  function handleTime() {
    const newMillis = p.millis();
    const ellapsed = newMillis - lastMillis;
    completion += ellapsed / 1000.0 * p.settings.speed;
    lastMillis = newMillis;
    if (completion > 1.0) {
      console.log("COMPLETION IS: ", completion)
      getNextTreeLevel();
      completion = completion - 1.0;
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
  }

  p.draw = function() {
    drawingPoint = {x: p.mouseX, y: p.mouseY};
    handleTime();
    if (!drawing) {
      return;
    }
    p.stroke(completion, 1, 0.8);
    trees.forEach((tree) => {
      console.log("PRINTING A THING:", tree.point, completion, tree.branches)
      for (let i = 0; i < tree.branches.length; i++) {
        if (tree.branches[i]) {
          p.point(
            drawingPoint.x + tree.point.x - tree.widthFactor * tree.height * completion * (-1 + i * 2.0 / (tree.number - 1)),
            drawingPoint.y + tree.point.y + tree.height * completion * (p.settings.flipside ? -1 : 1)
          );
        }
      }
    });
  }

  p.mousePressed = function() {
    drawing = true;
    completion = 0.0;
    drawingPoint = {x: p.mouseX, y: p.mouseY};
    trees.push(new Tree({x: 0, y: 0}, p.settings.height, p.settings.widthFactor, p.settings.leafNumber, p.settings.persistence, true));
  }

  p.mouseReleased = function() {
    drawing = false;
  }

  p.mouseMoved = function() {
    trees = [];
    completion = 0.0;
    trees.push(new Tree({x: 0, y: 0}, p.settings.height, p.settings.widthFactor, p.settings.leafNumber, p.settings.persistence, true));
    drawingPoint = {x: p.mouseX, y: p.mouseY};
  }

  function shouldDraw() {
    return !p.isBlocked && p.mouseIsPressed;
  }
};

export default sketch;

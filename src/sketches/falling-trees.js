const sketch = (p) => {
  let sizes = {};
  let drawing = false;
  let trees = [];
  let speed = 1.0;
  let lastCompletion = 0.0;
  let completion = 0.0;
  let lastMillis = 0;
  let ellapsed = 0;
  let drawingPoint = {x: 0, y: 0};
  let lastPoint = {x: 0, y: 0};
  let clickPoint = {x: 0, y: 0};
  p.settings = {
    speed: 1.0,
    scaleFactor: 0.5,
    thickness: 5,
    opacity: 100,
    steepness: 1,
    leafNumber: 2,
    persistence: 1,
    flipside: false,
    easyMode: false
  };

  // TODO: HAVE AN EASY MODE WHERE THE TREE MOVES AT CONSTANT SPEED UP OR DOWN INSTEAD OF EXACTLY WITH THE MOUSE

  class Tree {
    constructor(point, scale, number, probability, level=0) {
      this.dimension = p.settings.flipside ? sizes.height : sizes.width;
      if (level === 0) {
        this.scale = p.settings.scaleFactor * this.dimension * (1.0 - 1.0 / number);
      } else {
        this.scale = scale;
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
      let newP;
      // Here we prevent things from getting too huge.
      const theNumber = p.pow(this.number, this.level) >= 100 ? 1 : this.number; 
      for (let i = 0; i < theNumber; i++) {
        if (this.branches[i]) {
          newP = this.point + 0.5 * this.scale * (-1.0 + i * 2.0 / (this.number - 1));
        }
        newTrees.push(new Tree(newP, this.scale / this.number, this.number, this.probability, this.level + 1));
      }
      return newTrees;
    }
  }

  function drawBackground() {
    p.push();
    p.strokeWeight(1000);
    p.stroke(0);
    p.noFill();
    p.ellipse(sizes.width/2, sizes.height/2, sizes.width + 1000, sizes.height + 1000)
    p.pop();
  }

  function handleTime() {
    const newMillis = p.millis();
    ellapsed = newMillis - lastMillis;
    completion += ellapsed / 1000.0 * p.settings.speed / 50;
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
    lastMillis = p.millis();
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
    // Here we get the center x/y value of a certain leaf of the tree.
    if (p.settings.flipside) {
      return base.y + tree.point + 0.5 * tree.scale * completion * (-1 + i * 2.0 / (tree.number - 1));
    }
    return base.x + tree.point + 0.5 * tree.scale * completion * (-1 + i * 2.0 / (tree.number - 1));
  }

  p.draw = function() {
    handleTime();
    drawingPoint = {...lastPoint};
    if (p.settings.easyMode && trees[0]) {
      const difference = ellapsed / 1000 * p.settings.steepness * p.settings.speed / 50 * getScale() / p.pow(p.settings.leafNumber, trees[0].level);
      if (p.settings.flipside) {
        if (p.mouseX > drawingPoint.x + 1) {
          drawingPoint.x += difference;
        } else if (p.mouseX <= drawingPoint.x - 1) {
          drawingPoint.x -= difference;
        }
      } else {
        if (p.mouseY >= drawingPoint.y + 1) {
          drawingPoint.y += difference;
        } else if (p.mouseY <= drawingPoint.y - 1) {
          drawingPoint.y -= difference;
        }
      }
    } else {
      drawingPoint = {x: p.mouseX, y: p.mouseY};
    }
    // drawingPoint = {x: p.mouseX, y: p.mouseY};
    if (!drawing || !shouldDraw()) {
      return;
    }
    p.stroke(completion, 1, 0.8, p.settings.opacity / 100);
    p.strokeWeight(p.settings.thickness);
    trees.forEach((tree) => {
      for (let i = 0; i < tree.branches.length; i++) {
        if (tree.branches[i]) {
          const oldPoint = treePoint(lastPoint, tree, i, lastCompletion);
          const newPoint = treePoint(drawingPoint, tree, i, completion);
          if (p.settings.flipside) {
            p.line(lastPoint.x, oldPoint, drawingPoint.x, newPoint);
          } else {
            p.line(oldPoint, lastPoint.y, newPoint, drawingPoint.y);
          }
        }
      }
    });
    lastCompletion = completion;
    lastPoint = {...drawingPoint};
    drawBackground();
  }

  function getScale() {
    return p.settings.scaleFactor * (p.settings.flipside ? sizes.height : sizes.width) * (p.settings.leafNumber - 1) / p.settings.leafNumber;
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
    trees = [];
  }

  p.mouseMoved = function() {
    trees = [];
    completion = 0.0;
    lastCompletion = 0.0;
    trees.push(new Tree(0, null, p.settings.leafNumber, p.settings.persistence));
  }

  function shouldDraw() {
    return !p.isBlocked && p.mouseIsPressed;
  }
};

export default sketch;

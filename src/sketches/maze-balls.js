const sketch = (p) => {

  class CellGrid {
    constructor(maze, thickness=1) {
      this.maze = maze;
      this.rows = (maze.length - 2) / 2;
      this.cols = (maze[0].length - 2) / 2;
      this.grid = {};
      for (let c = 0; c < this.cols; c++) {
        this.grid[c] = {};
        for (let r = 0; r < this.rows; r++) {
          this.grid[c][r] = new Cell(c, r, maze[2*r+1][2*c+2], maze[2*r+2][2*c+1], maze[2*r+1][2*c], maze[2*r][2*c+1]);
        }
      }
    }
  }

  class Cell {
    constructor(x, y, wr, wd, wl, wu) {
      this.x = x;
      this.y = y;
      this.wr = wr;
      this.wd = wd;
      this.wl = wl;
      this.wu = wu;
    }
  }

  class BallSet {
    constructor(n, cells, black=false) {
      this.balls = [];
      this.cells = cells;
      this.black = black;
      for (let i = 0; i < n; i++) {
        this.balls.push(this.makeRandomBall(i / n));
      }
    }

    makeRandomBall(hue) {
      const randoms = Ball.randomBall();
      return new Ball(randoms.x, randoms.y, randoms.dx, randoms.dy, hue, this.cells, this.black);
    }

    step() {
      this.balls.forEach((ball) => ball.step());
    }
    
    draw() {
      this.balls.forEach((ball) => ball.draw());
    }
  }

  class Ball {
    
    constructor(x, y, dx, dy, hue, cells, black=false) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.cells = cells;
      this.clock = p.millis();
      this.hue = p.random(0, 1);
      this.black = black;
    }

    static randomBall() {
      const row = p.floor(p.random(p.settings.numRows));
      const col = p.floor(p.random(numCols));
      const xOff = p.random(bounceBuffer, 1 - bounceBuffer);
      const yOff = p.random(bounceBuffer, 1 - bounceBuffer);
      const x = col + xOff;
      const y = row + yOff;
      const dx = p.random(-1, 1);
      const dy = p.random(-1, 1);

      return {x, y, dx, dy};
    }

    randomize() {
      const randoms = Ball.randomBall();
      this.x = randoms.x;
      this.y = randoms.y;
      this.dx = randoms.dx;
      this.dy = randoms.dy;
    }
    
    step() {
      let clock = p.millis()
      let ellapsed = (clock - this.clock) / 1000.0;
      this.clock = clock;

      let x = this.x + this.dx * p.settings.ballSpeed * ellapsed;
      let y = this.y + this.dy * p.settings.ballSpeed * ellapsed;

      // Handle the case that breaks everything.
      if (this.cells.grid[p.floor(this.x)] === undefined ||
          this.cells.grid[p.floor(this.x)][p.floor(this.y)] === undefined) {
        this.randomize();
        return;
      }

      const theCell = this.cells.grid[p.floor(this.x)][p.floor(this.y)];

      if (!theCell.wr && !theCell.wd && p.mag(p.ceil(x) - x, p.ceil(y) - y) < bounceBuffer ||
          !theCell.wl && !theCell.wu && p.mag(p.floor(x) - x, p.floor(y) - y) < bounceBuffer ||
          !theCell.wu && !theCell.wr && p.mag(p.ceil(x) - x, p.floor(y) - y) < bounceBuffer ||
          !theCell.wl && !theCell.wd && p.mag(p.floor(x) - x, p.ceil(y) - y) < bounceBuffer) {
        this.randomize();
        return;
      }
      
      if (x < bounceBuffer) {
        x = 2 * bounceBuffer - x;
        this.dx = -this.dx;
      }
      if (x > (this.cells.cols - bounceBuffer)) {
        x = 2 * (this.cells.cols - bounceBuffer) - x;
        this.dx = -this.dx;
      }
      if (y < bounceBuffer) {
        y = 2 * bounceBuffer - y;
        this.dy = -this.dy;
      }
      if (y > (this.cells.rows - bounceBuffer)) {
        y = 2 * (this.cells.rows - bounceBuffer) - y;
        this.dy = -this.dy;
      }

      if (p.floor(x + bounceBuffer) > p.floor(this.x) && theCell.wr) {
        x = 2 * (p.floor(this.x) + 1 - bounceBuffer) - x;
        this.dx = -this.dx;
      }
      if (p.floor(x - bounceBuffer) < p.floor(this.x) && theCell.wl) {
        x = 2 * (p.floor(this.x) + bounceBuffer) - x;
        this.dx = -this.dx;
      }
      if (p.floor(y + bounceBuffer) > p.floor(this.y) && theCell.wd) {
        y = 2 * (p.floor(this.y) + 1 - bounceBuffer) - y;
        this.dy = -this.dy;
      }
      if (p.floor(y - bounceBuffer) < p.floor(this.y) && theCell.wu) {
        y = 2 * (p.floor(this.y) + bounceBuffer) - y;
        this.dy = -this.dy;
      }

      this.x = x;
      this.y = y;
    }
    
    draw() {
      p.noStroke();
      if (this.black) {
        p.fill(0, 0, 0, p.settings.opacity / 100.0);
      } else {
        p.fill(this.hue, 1, 1, p.settings.opacity / 100.0);
      }
      p.ellipse(this.x, this.y, p.settings.ballSize / 100, p.settings.ballSize / 100);
    }
  }

  function maze(h, w) {
    // Only odd shapes
    const nrows = h * 2 + 1;
    const ncols = w * 2 + 1;
    // Adjust complexity and density relative to maze size
    const complexity = 5 * (nrows + ncols); // number of components
    const density = p.floor(nrows / 2) * p.floor(ncols / 2); // size of components
    // Build actual maze
    let z = Array(nrows + 1);
    for (let r = 0; r < nrows + 1; r++) {
      z[r] = Array(ncols + 1);
      for (let c = 0; c < ncols + 1; c++) {
        z[r][c] = r === 0 || r === nrows - 1 || c === 0 || c === ncols - 1 ? 1 : 0;
      }
    }
    // Fill borders
    // Make aisles
    let x, y, x0, y0, neighbours;
    for (let i = 0; i < density; i++) {
      x = p.floor(p.random(0, p.floor(ncols / 2) + 1)) * 2;
      y = p.floor(p.random(0, p.floor(nrows / 2) + 1)) * 2; // pick a random position
      z[y][x] = 1;
      for(let j = 0; j < complexity; j++) {
        neighbours = [];
        if (x > 1) {
          neighbours.push([y, x - 2]);
        }
        if (x < ncols - 2) {
          neighbours.push([y, x + 2]);
        }
        if (y > 1) {
          neighbours.push([y - 2, x]);
        }
        if (y < nrows - 2) {
          neighbours.push([y + 2, x]);
        }
        if (neighbours.length) {
          [y0, x0] = neighbours[p.floor(p.random(0, neighbours.length))];
          if (z[y0][x0] === 0) {
            z[y0][x0] = 1;
            z[y0 + p.floor((y - y0) / 2)][x0 + p.floor((x - x0) / 2)] = 1;
            x = x0;
            y = y0;
          }
        }
      }
    }
    fillEmpty(z);
    return z;
  }

  function fillEmpty(maze) {
    for (let r = 2; r < maze.length - 1; r += 2) {
      for (let c = 2; c < maze[0].length; c += 2) {
        maze[r][c] = 1;
        let neighbors = [maze[r-1][c], maze[r+1][c], maze[r][c-1], maze[r][c+1]];
        if (neighbors == [0, 0, 0, 0]) {
          let choice = p.floor(p.random(0, 4));
          if (choice === 0) {
            maze[r-1][c] = 1;
          } else if (choice === 1) {
            maze[r+1][c] = 1;
          } else if (choice === 2) {
            maze[r][c-1] = 1;
          } else {
            maze[r][c+1] = 1;
          }
        }
      }
    }
  }

  let balls, blacks, theMaze;
  let numCols;
  let gridSize;
  let bounceBuffer;
  let numBalls;
  p.isSquare = false;
  p.settings = {
    numRows: 10,
    wallSize: 0.3, // max 0.5
    ballSize: 0.4, // max 0.5
    ballDensity: 21, // percentage
    ballSpeed: 4,
    opacity: 5 // percentage
  }

  function getSizes() {
    let height, width;
    if (p.isSquare) {
      numCols = p.settings.numRows;
      height = p.min(window.innerWidth, window.innerHeight);
      width = height;
    } else {
      // The nunber of rows is fixed. The columns and rows have same scale.
      // So, find the max number of columns that can fit in this rectange.
      // Then, set the width of the canvas to match.
      height = window.innerHeight;
      const totalWidth = window.innerWidth;
      const rowHeight = height / p.settings.numRows;
      numCols = p.floor(totalWidth / rowHeight);
      width = numCols * rowHeight;
    }
    gridSize = height / p.settings.numRows;
    bounceBuffer = (p.settings.wallSize / 100 + p.settings.ballSize / 100) / 2;
    // Calculate the total number of balls.
    numBalls = p.settings.ballDensity / 100 * numCols * p.settings.numRows;
    return {width, height};
  }

  p.setup = function() {
    const sizes = getSizes();
    p.createCanvas(sizes.width, sizes.height);
    p.background(0);
    p.colorMode(p.HSB, 1);
    makeBalls();
  };

  p.draw = function() {
    p.scale(gridSize, gridSize);
    p.strokeWeight(1);
    p.stroke(0, 0, 0);
    for (let i = 0; i < balls.cells.rows; i++) {
      for (let j = 0; j < balls.cells.cols; j++) {
        if (theMaze[2*i+1][2*j+1] === 1 && theMaze[2*i+2][2*j+1] === 1) {
          p.line(j, i, j, (i+1))
        }
        if (theMaze[2*i+1][2*j+1] === 1 && theMaze[2*i+1][2*j+2] === 1) {
          p.line(j, i, (j+1), i);
        }
      }
    }
    
    balls.draw();
    balls.step();
    blacks.draw();
    blacks.step();
  };

  function makeBalls() {
    theMaze = maze(p.settings.numRows, numCols);
    balls = new BallSet(numBalls, new CellGrid(theMaze));
    blacks = new BallSet(numBalls, new CellGrid(theMaze), true); 
  }

};

export default sketch;

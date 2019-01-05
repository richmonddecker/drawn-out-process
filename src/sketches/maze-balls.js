const sketch = (p) => {

  let RADIUS = 0.2;
  let THICK = 0.1;
  let ALPHA = 0.02;
  let SPEED = 1;

  class CellGrid {
    constructor(maze, thickness=1) {
      this.maze = maze;
      this.rows = (maze.length - 2) / 2;
      this.cols = (maze[0].length - 2) / 2;
      this.grid = {};
      Array(this.cols).keys().forEach((c) => {
        this.grid[c] = {};
        Array(this.rows).keys().forEach((r) => {
          this.grid[c][r] = new Cell(c, r, maze[2*r+1][2*c+2], maze[2*r+2][2*c+1], maze[2*r+1][2*c], maze[2*r][2*c+1]);
        });
      });
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
    constructor(n, cells, black=False) {
      this.balls = [];
      this.cells = cells;
      Array(n).keys().forEach((i) => {
        this.balls.push(new Ball(p.random(0, cells.cols), p.random(0, cells.rows), p.random(-SPEED, SPEED), p.random(-SPEED, SPEED), cells, black));
      });
    }

    step() {
      this.balls.forEach((ball) => ball.step());
    }
    
    draw() {
      this.balls.forEach((ball) => ball.draw());
    }
  }

  class Ball {
    
    constructor(x, y, dx, dy, cells, black=false):
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.cells = cells;
      this.clock = p.millis();
      this.hue = p.random(0, 1);
      this.black = black;
    
    step() {
      let clock = millis()
      let ellapsed = (clock - this.clock) / 1000.0;
      let x = this.x + this.dx * ellapsed;
      let y = this.y + this.dy * ellapsed;
      if (this.x > this.cells.cols or this.y > this.cells.rows) {
        console.log("PROLBME", this.x, this.y);
      }
      
      if (x < (RADIUS + THICK)) {
        x = 2 * (RADIUS + THICK) - x;
        this.dx = -this.dx;
      }
      if (x > (this.cells.cols - RADIUS - THICK)) {
        x = 2 * (this.cells.cols - RADIUS - THICK) - x;
        this.dx = -this.dx;
      }
      if (y < (RADIUS + THICK)) {
        y = 2 * (RADIUS + THICK) - y;
        this.dy = -this.dy;
      }
      if (y > (this.cells.rows - RADIUS - THICK)) {
        y = 2 * (this.cells.rows - RADIUS - THICK) - y;
        this.dy = -this.dy;
      }

      if (int(x + (RADIUS + THICK)) > int(this.x) and this.cells.grid[int(this.x), int(this.y)].wr) {
        x = 2 * (int(this.x) + 1 - (RADIUS + THICK)) - x;
        this.dx = -this.dx;
      }
      if (int(x - (RADIUS + THICK)) < int(this.x) and this.cells.grid[int(this.x), int(y)].wl) {
        x = 2 * (int(this.x) + (RADIUS + THICK)) - x;
        this.dx = -this.dx;
      }
      if (int(y + (RADIUS + THICK)) > int(this.y) and this.cells.grid[int(x), int(this.y)].wd) {
        y = 2 * (int(this.y) + 1 - (RADIUS + THICK)) - y;
        this.dy = -this.dy;
      }
      if (int(y - (RADIUS + THICK)) < int(this.y) and this.cells.grid[int(x), int(this.y)].wu) {
        y = 2 * (int(this.y) + (RADIUS + THICK)) - y;
        this.dy = -this.dy;
      }

      if (x > this.cells.cols or y > this.cells.rows) {
        console.log("FIRST PROBLEM", this.x, this.y, x, y);
      }
      
      this.x = x;
      this.y = y;
      this.clock = clock;
    }
    
    draw() {
      p.noStroke();
      if (this.black) {
        p.fill(0, 0, 0, ALPHA);
      } else {
        p.fill(this.hue, 1, 1, ALPHA);
      }
      p.ellipse(this.x, this.y, 2*RADIUS, 2*RADIUS);
    }

};

export default sketch;

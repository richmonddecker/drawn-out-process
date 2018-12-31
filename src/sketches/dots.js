// const RED = p.color(1, 0, 0, 0.5);
// const YEL = p.color(1, 1, 0, 0.5);
// const GRN = p.color(0, 1, 0, 0.5);
// const BLU = p.color(0, 0, 1, 0.5);

// class Dots {
//   constructor(number) {
//     this.number = number;
//   }

  


// }




// class Dot {
//   constructor(color, x, y, r) {
//     this.color = color;
//     this.x = x;
//     this.y = y;
//     this.r = r;
//   }

  
//   move(x, y) {
//     this.x += x;
//     this.y += y;
//   }

//   resize(r) {
//     this.r = r;
//   }
// }


// const sketch = (p) => {
//   let size = 0;
//   let diameter = 0;
//   let lastMillis = 0;
//   let dots = {}
//   p.colorMode(RGB, 1);
//   p.settings = {
//     numGroups = 4;
//   }

//   function clearCircle() {
//     p.background(255);
//     drawBorder();
//   }

//   p.setup = function() {
//     size = p.min(window.innerWidth, window.innerHeight);
//     diameter = size / (8 * p.settings.numGroups);
//     p.createCanvas(size, size);

//   }

//   function createDots(n) {
//     for (let i = -2*n - 1; i <= 2*n + 1; i += 2) {
//       dots[i] = {};
//       for (let j = -2*n - 1; j <= 2*n + 1; j += 2) {
//         dots
//     }
//   }

//   p.draw = function() {
//     for (let i = 0; i < )
//     let ellapsed = getEllapsedTime();
//     let coords = getCoords();
//     if (shouldDraw()) {
//       makeLines(coords, p.settings, ellapsed);
//     }
//     drawBorder();
//   }

//   function drawBorder() {
//     let r = 10000;
//     p.push();
//     p.translate(p.width/2, p.height/2);
//     p.stroke(0);
//     p.noFill();
//     p.strokeWeight(r - 2 * radius);
//     p.ellipse(0, 0, r, r);
//     p.pop();
//   }

//   function getEllapsedTime() {
//     let nextMillis = p.millis();
//     let ellapsed = nextMillis - lastMillis;
//     lastMillis = nextMillis;
//     return ellapsed / 1000.0;
//   }
// };

// export default sketch;


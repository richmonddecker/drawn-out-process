import { Driftable } from "./utility/randomness";

const sketch = (p) => {

  let sizes = {};
  let helices = {};

  let lastMillis = 0;

  let theLength = 300;

  p.isSquare = false;
  p.settings = {
    maxFrequency: 0,
    maxLoops: 10,
    maxWaves: 2,
    numBalls: 50,
    ballSize: 10,
    widthFactor: 0.3
  }

  class Sphere {
    constructor(x, y, z, r, c) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.r = r;
      this.c = c;
    }

    draw() {
      p.push();
      p.ambientMaterial(this.c);
      p.translate(this.x, this.y, this.z)
      p.sphere(this.r);
      p.pop();
    }
  }

  class RadialInfo {
    constructor(radius, amplitude, waves, frequency) {
      this.radius = radius;
      this.amplitude = amplitude;
      this.waves = waves;
      this.frequency = frequency;
      this.lastMillis = p.millis();
      this.currentPhase = p.random(p.TWO_PI);
    }

    step() {
      this.radius.step();
      this.amplitude.step();
      this.waves.step();
      this.frequency.step();
      const newMillis = p.millis();
      const ellapsed = (newMillis - this.lastMillis) / 1000;
      this.currentPhase += p.settings.maxFrequency * this.frequency.value * p.TWO_PI * ellapsed;
      this.lastMillis = newMillis;
    }

    currentValues() {
      return ({
        amplitude: this.amplitude.value * p.cos(this.currentPhase),
        radius: this.radius.value,
        waves: this.waves.value
      });
    }
  }

  class AxialInfo {
    constructor(length, amplitude, frequency) {
      this.length = length;
      this.amplitude = amplitude;
      this.frequency = frequency;
      this.lastMillis = p.millis();
      this.currentPhase = p.random(p.TWO_PI);
    }

    step() {
      this.length.step();
      this.amplitude.step();
      this.frequency.step();
      const newMillis = p.millis();
      const ellapsed = (newMillis - this.lastMillis) / 1000;
      this.currentPhase += p.settings.maxFrequency * this.frequency.value * p.TWO_PI * ellapsed;
      this.lastMillis = newMillis;
    }

    currentValues() {
      return {length: this.length.value * (1 + this.amplitude.value * p.sin(this.currentPhase))};
    }
  }

  class RotationInfo {
    constructor(frequency) {
      this.frequency = frequency;
      this.currentPhase = p.random(p.TWO_PI);
      this.lastMillis = p.millis();
    }

    step() {
      this.frequency.step();
      const newMillis = p.millis();
      const ellapsed = (newMillis - this.lastMillis) / 1000;
      this.currentPhase += p.settings.maxFrequency * this.frequency.value * p.TWO_PI * ellapsed;
      this.lastMillis = newMillis;
    }

    currentValues() {
      return {phase: this.currentPhase};
    }
  }

  class ColorInfo {
    constructor(cycles, frequency) {
      this.cycles = cycles;
      this.frequency = frequency;
      this.currentColor = p.random(1);
      this.lastMillis = p.millis();
    }

    step() {
      this.cycles.step();
      this.frequency.step();
      const newMillis = p.millis();
      const ellapsed = (newMillis - this.lastMillis) / 1000;
      this.currentColor = (10 + this.currentColor + p.settings.maxFrequency * this.frequency.value * ellapsed) % 1;
      this.lastMillis = newMillis;
    }

    currentValues() {
      return ({
        startColor: this.currentColor,
        colorCycles: this.cycles.value
      });
    }
  }

  class OtherInfo {
    constructor(number, ballSize, loops) {
      this.number = number;
      this.ballSize = ballSize;
      this.loops = loops;
      console.log("SUP: ", this.loops, this.loops.value)
    }

    step() {
      this.number.step();
      this.ballSize.step();
      this.loops.step();
    }

    currentValues() {
      console.log("BUDDY: ", this.number.value, this.ballSize.value)
      return ({
        number: this.number.value,
        ballSize: this.ballSize.value,
        loops: this.loops.value
      });
    }

  }

  class Helix {
    constructor(radius, radiusAmplitude, radiusWaves, radiusFrequency, length, lengthAmplitude,
                lengthFrequency, rotationFrequency, number, ballSize, loops, colorCycles, colorFrequency) {
      this.radialInfo = new RadialInfo(radius, radiusAmplitude, radiusWaves, radiusFrequency);
      this.axialInfo = new AxialInfo(length, lengthAmplitude, lengthFrequency);
      this.rotationInfo = new RotationInfo(rotationFrequency);
      this.colorInfo = new ColorInfo(colorCycles, colorFrequency)
      this.otherInfo = new OtherInfo(number, ballSize, loops);
    }

    step() {
      this.radialInfo.step();
      this.axialInfo.step();
      this.rotationInfo.step();
      this.colorInfo.step();
      this.otherInfo.step();
    }

    currentValues() {
      //console.log("HEY THERE:", this.radialInfo.currentValues());
      //console.log("AXIAL: ", this.axialInfo.currentValues());
      //console.log("OTHER: ", this.otherInfo.currentValues());
      return this.mapValues({
        ...this.radialInfo.currentValues(),
        ...this.axialInfo.currentValues(),
        ...this.rotationInfo.currentValues(),
        ...this.colorInfo.currentValues(),
        ...this.otherInfo.currentValues()
      });
    }

    mapValues(vals) {
      vals.loops *= p.settings.maxLoops;
      vals.colorCycles *= p.settings.numBalls / 10;
      vals.radius *= p.settings.widthFactor * theLength;
      vals.length *= theLength;
      vals.waves *= p.settings.maxWaves;
      return vals;
    }

    getSpheres() {
      const vals = this.currentValues();
      //console.log("SHEEP", vals)
      let spheres = [];
      for (let i = 0; i < vals.number; i++) {
        // Calculate coordinate
        const z = vals.length * (2 * i - vals.number + 1) / (vals.number - 1);
        const a = p.PI * vals.loops * (2 * i - vals.number + 1) / (vals.number - 1) + vals.phase;
        const x = vals.radius * p.cos(a) * (1 - vals.amplitude * p.cos(vals.waves * p.TWO_PI * i / vals.number));
        const y = vals.radius * p.sin(a) * (1 - vals.amplitude * p.cos(vals.waves * p.TWO_PI * i / vals.number));

        // Calculate color
        const h = (vals.startColor + vals.colorCycles * i / vals.number) % 1;
        const c = p.color(h, 1, 1);

        // Calculate size
        const r = vals.ballSize;

        spheres.push(new Sphere(x, y, z, r, c));
      }
      return spheres;
    }

  }

  function makeHelix() {
    return new Helix(
      new (Driftable(p))(-1, 1, 0.05),
      new (Driftable(p))(-1, 1, 0.1),
      new (Driftable(p))(-1, 1, 0.1),
      new (Driftable(p))(-1, 1, 0.1),
      new (Driftable(p))(-1, 1, 0.05),
      new (Driftable(p))(-1, 1, 0.1),
      new (Driftable(p))(-1, 1, 0.1),
      new (Driftable(p))(-1, 1, 0.1),
      new (Driftable(p))(p.settings.numBalls, p.settings.numBalls, 0),
      new (Driftable(p))(p.settings.ballSize, p.settings.ballSize, 0),
      new (Driftable(p))(-1, 1, 0.1),
      new (Driftable(p))(-1, 1, 0.1),
      new (Driftable(p))(-1, 1, 0.1)
    );
  }

  function makeHelices() {
    helices.x = makeHelix();
    helices.y = makeHelix();
    helices.z = makeHelix();
  }
  
  function getCanvasSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (p.isSquare) {
      return {width: p.min(width, height), height: p.min(width, height)}
    }
    return {width, height};
  }

  p.windowResized = function() {
    sizes = getCanvasSize();
    p.resizeCanvas(sizes.width, sizes.height);
  }

  p.setup = function() {
    p.colorMode(p.HSB, 1);
    sizes = getCanvasSize();
    p.createCanvas(sizes.width, sizes.height, p.WEBGL);
    p.noStroke();
    makeHelices();
  }

  p.draw = function() {
    p.background(0);
    p.orbitControl();

    p.pointLight(0, 0, 1, 0, 0, 0);
    p.pointLight(0, 0, 1, 0, 0, 130);
    p.pointLight(0, 0, 1, 0, 0, 140);
    p.pointLight(0, 0, 1, 0, 0, 150);
    p.pointLight(0, 0, 1, 0, 0, 160);
    p.pointLight(0, 0, 1, 0, 0, 170);
    p.pointLight(0, 0, 1, 0, 0, 180);
    p.pointLight(0, 0, 1, 0, 0, 0);
    p.pointLight(0, 0, 1, 0, 0, 0);
    p.pointLight(0, 0, 1, 0, 0, 0);
    p.pointLight(0, 0, 1, 0, 0, 0);
    p.pointLight(0, 0, 1, 0, 0, 0);

    helices.x.step();
    helices.y.step();
    helices.z.step();

    //console.log("HEY: ", helices.z, helices.z.getSpheres())
    helices.z.getSpheres().forEach((sphere) => sphere.draw());
    p.rotateY(p.PI/2);
    helices.x.getSpheres().forEach((sphere) => sphere.draw());
    p.rotateX(p.PI/2);
    helices.y.getSpheres().forEach((sphere) => sphere.draw());
  }

};

export default sketch;

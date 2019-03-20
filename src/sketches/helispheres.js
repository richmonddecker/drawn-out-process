import { Driftable } from "./utility/randomness";

const sketch = (p) => {

  let sizes = {};
  let helices = {};

  let lastMillis = 0;

  let theLength = 300;

  p.isSquare = false;
  p.settings = {
    maxFrequency: 1,
    maxAmplitude: 0.5,
    maxLoops: 10,
    numBalls: 50,
    ballSize: 1
  }

  function getBallSize() {
    return 3 * p.settings.ballSize * theLength * (1 - p.settings.maxAmplitude / 2) / p.settings.numBalls / 2;
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
    constructor(radius, amplitude, waveFrequency, frequency) {
      this.radius = radius;
      this.amplitude = amplitude;
      this.frequency = frequency;
      this.waveFrequency = waveFrequency;
      this.lastMillis = p.millis();
      this.currentWaves = p.random(-1, 1);
      this.currentPhase = p.random(p.TWO_PI);
    }

    step() {
      this.radius.step();
      this.amplitude.step();
      this.waveFrequency.step();
      this.frequency.step();
      const newMillis = p.millis();
      const ellapsed = (newMillis - this.lastMillis) / 1000;
      this.currentPhase += p.settings.maxFrequency * this.frequency.value * p.TWO_PI * ellapsed;
      this.currentWaves += this.waveFrequency.value * p.settings.maxFrequency * ellapsed;
      if (this.currentWaves > 1) {
        this.currentWaves = 2 - this.currentWaves;
        this.waveFrequency.value = -this.waveFrequency.value;
      }
      if (this.currentWaves < -1) {
        this.currentWaves = -2 - this.currentWaves;
        this.waveFrequency.value = -this.waveFrequency.value;
      }
      this.lastMillis = newMillis;
    }

    currentValues() {
      return ({
        amplitude: p.settings.maxAmplitude * this.amplitude.value * p.cos(this.currentPhase),
        radius: this.radius.value,
        waves: this.currentWaves
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
      return {length: this.length.value * (1 + 0.5 * p.settings.maxAmplitude * this.amplitude.value * p.sin(this.currentPhase))};
    }
  }

  class RotationInfo {
    constructor(rotationFrequency, loopFrequency) {
      this.rotationFrequency = rotationFrequency;
      this.loopFrequency = loopFrequency;
      this.currentPhase = p.random(p.TWO_PI);
      this.currentLoops = p.random(-1, 1);
      this.lastMillis = p.millis();
    }

    step() {
      this.rotationFrequency.step();
      this.loopFrequency.step();
      const newMillis = p.millis();
      const ellapsed = (newMillis - this.lastMillis) / 1000;
      this.currentPhase += p.settings.maxFrequency * this.rotationFrequency.value * p.TWO_PI * ellapsed;
      this.currentLoops += this.loopFrequency.value * p.settings.maxFrequency * ellapsed;
      if (this.currentLoops > 1) {
        this.currentLoops = 2 - this.currentLoops;
        this.loopFrequency.value = -this.loopFrequency.value;
      }
      if (this.currentLoops < -1) {
        this.currentLoops = -2 - this.currentLoops;
        this.loopFrequency.value = -this.loopFrequency.value;
      }
      this.lastMillis = newMillis;
    }

    currentValues() {
      return ({
        phase: this.currentPhase,
        loops: this.currentLoops
      });
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
    constructor(number, ballSize) {
      this.number = number;
      this.ballSize = ballSize;
    }

    step() {
      this.number.step();
      this.ballSize.step();
    }

    currentValues() {
      return ({
        number: this.number.value,
        ballSize: this.ballSize.value
      });
    }

  }

  class Helix {
    constructor(radius, radiusAmplitude, waveFrequency, radiusFrequency, length, lengthAmplitude,
                lengthFrequency, rotationFrequency, number, ballSize, loopFrequency, colorCycles, colorFrequency) {
      this.radialInfo = new RadialInfo(radius, radiusAmplitude, waveFrequency, radiusFrequency);
      this.axialInfo = new AxialInfo(length, lengthAmplitude, lengthFrequency);
      this.rotationInfo = new RotationInfo(rotationFrequency, loopFrequency);
      this.colorInfo = new ColorInfo(colorCycles, colorFrequency);
      this.otherInfo = new OtherInfo(number, ballSize);
    }

    step() {
      this.radialInfo.step();
      this.axialInfo.step();
      this.rotationInfo.step();
      this.colorInfo.step();
      this.otherInfo.step();
    }

    currentValues() {
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
      vals.colorCycles *= p.sqrt(p.settings.numBalls / 10);
      vals.radius *= 0.25 * theLength;
      vals.length *= theLength;
      vals.waves *= p.settings.maxLoops / 2;
      vals.ballSize *= getBallSize();
      vals.number *= p.settings.numBalls;
      return vals;
    }

    getSpheres() {
      const vals = this.currentValues();
      let spheres = [];
      for (let i = 0; i < vals.number; i++) {
        // Calculate coordinate
        const z = vals.length * (2 * i - vals.number + 1) / (vals.number - 1);
        const a = p.PI * vals.loops * (2 * i - vals.number + 1) / (vals.number - 1) + vals.phase;
        const x = vals.radius * p.cos(a) * (1 - vals.amplitude * p.cos(vals.waves * p.TWO_PI * i / vals.number));
        const y = vals.radius * p.sin(a) * (1 - vals.amplitude * p.cos(vals.waves * p.TWO_PI * i / vals.number));

        // Calculate color
        const h = (p.ceil(p.settings.numBalls / 10) + vals.startColor + vals.colorCycles * i / vals.number) % 1;
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
      new (Driftable(p))(.9, 1.1, 0.01),
      new (Driftable(p))(-1, 1, 0.1),
      new (Driftable(p))(-0.2, 0.2, 0.04),
      new (Driftable(p))(-1, 1, 0.1),
      new (Driftable(p))(.9, 1.1, 0.01),
      new (Driftable(p))(-1, 1, 0.1),
      new (Driftable(p))(-1, 1, 0.1),
      new (Driftable(p))(-1, 1, 0.1),
      new (Driftable(p))(1, 1, 0),
      new (Driftable(p))(1, 1, 0),
      new (Driftable(p))(-0.2, 0.2, 0.04),
      new (Driftable(p))(-1, 1, 0.3),
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
    theLength = sizes.height / 2;
  }

  p.setup = function() {
    p.colorMode(p.HSB, 1);
    sizes = getCanvasSize();
    theLength = sizes.height / 2;
    p.createCanvas(sizes.width, sizes.height, p.WEBGL);
    p.noStroke();
    makeHelices();
  }

  p.draw = function() {
    p.background(0);
    p.orbitControl();

    p.pointLight(0, 0, 1, 0, 0, 0);
    p.pointLight(0, 0, 1, 0, 0, 0);
    p.pointLight(0, 0, 1, 0, 0, 0);
    p.pointLight(0, 0, 1, 0, 0, 0);
    p.pointLight(0, 0, 1, 0, 0, 0);
    p.pointLight(0, 0, 1, 0, 0, 0);

    helices.x.step();
    helices.y.step();
    helices.z.step();

    helices.z.getSpheres().forEach((sphere) => sphere.draw());
    p.rotateY(p.PI/2);
    helices.x.getSpheres().forEach((sphere) => sphere.draw());
    p.rotateX(p.PI/2);
    helices.y.getSpheres().forEach((sphere) => sphere.draw());
  }

};

export default sketch;

export const Driftable = (p) => {
  class DriftableClass {
    constructor(min, max, delta) {
      this.minValue = min;
      this.maxValue = max;
      this.value = p.random(min, max);
      this.delta = delta;
      this.time = p.millis();
    }

    step() {
      const newTime = p.millis();
      const ellapsed = (newTime - this.time) / 1000;
      this.time = newTime;
      const newValue = this.value + p.random(-ellapsed * this.delta, ellapsed * this.delta);
      this.value = p.constrain(newValue, this.minValue, this.maxValue);
    }

    changeRange(min, max) {
      this.minValue = min;
      this.maxValue = max;
    }
  }
  
  return DriftableClass;
}

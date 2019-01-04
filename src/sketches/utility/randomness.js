
class Driftable {
  constructor(min, max, speed, acc) {
    this.minValue = min;
    this.maxValue = max;
    this.maxDelta = speed;
    this.minDelta = -speed;
    this.accRange = acc;
  }
}
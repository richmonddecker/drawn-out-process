
const order = {
  creative: [
    "chord-art"
  ],
  generative: [
    "targets"
  ],
  repetitive: [
    "kochpinski",
    "snowflake",
    "plasma-ball",
    "xt-square",
    "hexagon-star",
    "pentaspiral",
    "bouncy-rose"
  ]
};

const mapPrev = (array) => {
  const prevMap = {[array[0]]: array[array.length - 1]};
  for (let i = 1; i < array.length; i++) {
    prevMap[array[i]] = array[i - 1];
  }
  return prevMap;
}

const mapNext = (array) => {
  const nextMap = {[array[array.length - 1]]: array[0]};
  for (let i = 0; i < array.length - 1; i++) {
    nextMap[array[i]] = array[i + 1];
  }
  return nextMap;
}

let prevs = {};
let nexts = {};

Object.keys(order).forEach((key) => {
  prevs[key] = mapPrev(order[key]);
  nexts[key] = mapNext(order[key]);
});

export prevs;
export nexts;
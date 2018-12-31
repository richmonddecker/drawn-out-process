export function getInfoFromPoints(points) {
  // Get useful ratios given a set of points centered around the origin.
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const mins = {
    x: Math.min.apply(null, xs),
    y: Math.min.apply(null, ys)
  };
  const maxs = {
    x: Math.max.apply(null, xs),
    y: Math.max.apply(null, ys)
  }
  const dimensions = {
    width: maxs.x - mins.x,
    height: maxs.y - mins.y
  };
  const ratios = {
    aspect: dimensions.width / dimensions.height,
    horizontal: maxs.x / Math.abs(mins.x),
    vertical: maxs.y / Math.abs(mins.y)
  }
  return {mins, maxs, dimensions, ratios}
}


export function getCanvasAndObjectSize(ratio, square) {
  // Figure out necessary dimensions given the ratio of width to height.
  let canvas = {};
  let object = {};
  if (square) {
    canvas.height = Math.min(window.innerWidth, window.innerHeight);
    canvas.width = canvas.height;
    if (ratio > 1) {
      object.height = canvas.width / ratio;
      object.width = canvas.width;
    } else {
      object.width = canvas.height * ratio;
      object.height = canvas.height;
    }
  } else {
    if (ratio > 1) {
      canvas.height = Math.min(window.innerHeight, window.innerWidth / ratio);
      canvas.width = canvas.height * ratio;
    } else {
      canvas.width = Math.min(window.innerHeight * ratio, window.innerWidth);
      canvas.height = canvas.width / ratio;
    }
    object.height = canvas.height;
    object.width = canvas.width;
  }
  return {canvas, object};
}


export function fitPointsToSize(initialPoints, square) {
  // Given a set of points to fit inside a canvas, we return a scale, and an offset to help position.
  const {mins, maxs, ratios, dimensions} = getInfoFromPoints(initialPoints);
  const {canvas, object} = getCanvasAndObjectSize(ratios.aspect, square);
  const scale = object.width / dimensions.width;
  const points = initialPoints.map((xy) => ({x: scale * xy[0], y: scale * xy[1]}));
  const center = {
    x: (canvas.width - object.width) / 2 - mins.x * scale,
    y: (canvas.height - object.height) / 2 - mins.y * scale
  };
  return {canvas, object, points, center, scale}
}
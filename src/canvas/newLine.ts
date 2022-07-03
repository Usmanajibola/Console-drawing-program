
function axisParallelLine(sameVal: number, isXvalueSame: boolean, diffVal1: number, diffVal2: number) {
  const lineData = [];
  let length;
  let start;
  if (diffVal1 < diffVal2) {
    length = diffVal2 + 1;
    start = diffVal1;
  } else {
    length = diffVal1 + 1;
    start = diffVal2;
  }
  if (isXvalueSame) {
    for (let i = start; i < length; i++) {
      const coordinate = [sameVal, i];
      lineData.push(coordinate);
    }
  } else {
    for (let i = start; i < length; i++) {
      const coordinate = [i, sameVal];
      lineData.push(coordinate);
    }
  }
  return lineData;
}

function noAxisParallelLine(x1: number, y1: number, x2: number, y2: number) {
  const lineData = [];
  const slope = (y2 - y1) / (x2 - x1);
  const yIntercept = y1 - (slope * x1);
  let length;
  let start;
  if (x1 < x2) {
    length = x2 + 1;
    start = x1;
  } else {
    length = x1 + 1;
    start = x2;
  }
  for (let i = start; i < length; i++) {
    const coordinate = [i, i * slope + yIntercept];
    lineData.push(coordinate);
  }
  return lineData;
}

function getLineData(x1: any, y1: any, x2: any, y2: any) {
  let lineData;
  if (x1 === x2) {
    lineData = axisParallelLine(x1, true, y1, y2);
  } else if (y1 === y2) {
    lineData = axisParallelLine(y1, false, x1, x2);
  } else {
    lineData = noAxisParallelLine(x1, y1, x2, y2);
  }
  return lineData;
}

function newLine(data: any) {
  const lineData = getLineData(data.x1, data.y1, data.x2, data.y2);
  return lineData;
}

export default newLine;

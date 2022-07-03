let startCoordStack: any[];
let currentCanvasData: any[];
let emptyDrawValue: any;
let drawValue: any;

// if a up or down row's coord is connected to its left coord,
// no need to add it to the stack because it has the same start coord.
let noNeedToAddUpRowCoord: boolean;
let noNeedToAddDownRowCoord: boolean;

function moveUp(coord: Array<any>) {
  const x = coord[0];
  const y = coord[1];
  return [x, y - 1];
}

function moveDown(coord: Array<any>) {
  const x = coord[0];
  const y = coord[1];
  return [x, y + 1];
}

function moveLeft(coord: Array<any>) {
  const x = coord[0];
  const y = coord[1];
  return [x - 1, y];
}

function moveRight(coord: Array<any>) {
  const x = coord[0];
  const y = coord[1];
  return [x + 1, y];
}

function fillColor(coord: Array<any>) {
  const x = coord[0];
  const y = coord[1];
  currentCanvasData[y][x].fill = drawValue;
}

function getNoNeedToAddRowCoordFlag(isUp: boolean) {
  return isUp ? noNeedToAddUpRowCoord : noNeedToAddDownRowCoord;
}

function setNoNeedToAddRowCoordFlag(isUp: boolean, flag: boolean) {
  if (isUp) {
    noNeedToAddUpRowCoord = flag;
  } else {
    noNeedToAddDownRowCoord = flag;
  }
}

function addRowCoordToStack(coord: Array<any>, isUp: boolean) {
  if (canFillCoord(coord)) {
    if (!getNoNeedToAddRowCoordFlag(isUp)) {
      const startCoord = getStartCoordForOneRow(coord);
      startCoordStack.push(startCoord);
      setNoNeedToAddRowCoordFlag(isUp, true);
    }
  } else {
    setNoNeedToAddRowCoordFlag(isUp, false);
  }
}

function addUpRowCoordToStack(coord: Array<any>) {
  const upRowCoord = moveUp(coord);
  addRowCoordToStack(upRowCoord, true);
}

function addDownRowCoordToStack(coord: Array<any>) {
  const downRowCoord = moveDown(coord);
  addRowCoordToStack(downRowCoord, false);
}

function proceedWithStartCoord(coord: Array<any>) {
  fillColor(coord);
  setNoNeedToAddRowCoordFlag(true, false);
  setNoNeedToAddRowCoordFlag(false, false);
  addUpRowCoordToStack(coord);
  addDownRowCoordToStack(coord);
}

/**
 * Find the leftest positioned one among connected coordinates from target
 * @param {array} target target coordinate
 * @returns {array} start coordinate
 */
function getStartCoordForOneRow(target: any[]) {
  let startCoord = target;
  let loop = true;
  while (loop) {
    let temp = moveLeft(startCoord);
    if (canFillCoord(temp)) {
      startCoord = temp;
    } else {
      loop = false;
    }
  }
  return startCoord;
}

function handleRightCoord(coord: Array<any>) {
  fillColor(coord);
  addUpRowCoordToStack(coord);
  addDownRowCoordToStack(coord);
}

function processLeftToRight(startCoord: any) {
  let loop = true;
  let current = startCoord;
  while (loop) {
    let next = moveRight(current);
    if (canFillCoord(next)) {
      handleRightCoord(next);
      current = next;
    } else {
      loop = false;
    }
  }
}

function doFill(coord: Array<any>) {
  let loop = true;
  let currentCoord = getStartCoordForOneRow(coord);
  while (loop) {
    proceedWithStartCoord(currentCoord);
    processLeftToRight(currentCoord);
    if (startCoordStack.length < 1) {
      loop = false;
    } else {
      currentCoord = startCoordStack.pop();
    }
  }
}

function canFillCoord(target: any[]) {
  const x = target[0];
  const y = target[1];
  if (currentCanvasData[y] && currentCanvasData[y][x]) {
    const coord = currentCanvasData[y][x];
    return !(coord.draw !== emptyDrawValue || coord.fill === drawValue);
  } else {
    return false;
  }
}

function fill(data: any, canvasData: any, initDrawValue:any, color?: any) {
  startCoordStack = [];
  currentCanvasData = canvasData;
  emptyDrawValue = initDrawValue;
  if (!color && !drawValue) {
    drawValue = 'x'
  } 
  if (color && !drawValue) {
    drawValue = color
  }
  if (color && drawValue) {
    drawValue = color
  }
  const coord = [data.x, data.y];
  if (canFillCoord(coord)) {
    doFill(coord);
  }
}

export default fill;

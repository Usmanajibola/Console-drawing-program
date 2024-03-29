import fillApi from './fill'
import newLineApi from './newLine';
import { newRectangle as newRectangleApi } from './newRectangle';


const xBorderValue = '-';
const yBorderValue = '|';
const initDrawValue = ' ';
const defaultDrawValue = 'x';

function render(canvasData: any[]) {
  if (!canvasData) {
    return;
  }
  const yAxisArr = canvasData;
  const height = yAxisArr.length;
  const width = yAxisArr[0].length;
  for (let y = 0; y < height; y++) {
    const xAxisArr = yAxisArr[y];
    let oneLineData = '';
    for (let x = 0; x < width; x++) {
      const xVal = xAxisArr[x];
      if (xVal.draw === initDrawValue) {
        oneLineData += (xVal.fill || initDrawValue);
      } else {
        oneLineData += xVal.draw;
      }
    }
    console.log(oneLineData);
  }
}

function createCanvas(data: any) {
  if (data.w === 0 || data.h === 0) {
    return;
  }
  const yAxisArr = [];
  const border = 2;
  const height = data.h + border;
  const yAxisEnd = height - 1;
  const width = data.w + border;
  const xAxisEnd = width - 1;
  for (let y = 0; y < height; y++) {
    const xAxisArr = [];
    for (let x = 0; x < width; x++) {
      let drawValue = initDrawValue;
      if (y === 0 || y === yAxisEnd) {
        drawValue = xBorderValue;
      } else if (x === 0 || x === xAxisEnd) {
        drawValue = yBorderValue;
      }
      xAxisArr.push({
        draw: drawValue,
      });
    }
    yAxisArr.push(xAxisArr);
  }
  return yAxisArr;
}

function updateCanvasData(updateData: any[], canvasData: any[]) {
  const len = updateData.length;
  for (let i = 0; i < len; i++) {
    const dataCoordinate = updateData[i];
    const x = dataCoordinate[0];
    const y = dataCoordinate[1];
    if (canvasData[y] && canvasData[y][x]) {
      const canvasDataCoordinate = canvasData[y][x];
      if (canvasDataCoordinate.draw === initDrawValue) {
        canvasDataCoordinate.draw = defaultDrawValue;
      }
    }
  }
}

function newLine(data: any, canvasData: any) {
  const newLineData = newLineApi(data);
  updateCanvasData(newLineData, canvasData);
}

function newRectangle(data: any, canvasData: any) {
  const newRectangleData = newRectangleApi(data);
  updateCanvasData(newRectangleData, canvasData);
}

function fill(data: any, canvasData: any[]) {
  fillApi(data, canvasData, initDrawValue);
}

function color(data: any, canvasData: any[]) {
  fillApi(data, canvasData, initDrawValue, data.c)
}

export  {
  createCanvas,
  newLine,
  newRectangle,
  fill,
  render,
  color
};


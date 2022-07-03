import * as inquirer from 'inquirer'
import constant from './utils/constants'
import validator from './utils/validators'
import { createCanvas, newLine, newRectangle, fill, render, color } from './canvas'


let canvasData: Array<any> ;

function hasCanvasData() {
  if (canvasData) {
    return true;
  }
  console.log(constant.ERR_MSG.NO_CANVAS);
  return false;
}

function handleCommand(data: any) {
  if (data.command === constant.VALIDATE_RESULT.INCORRECT_COMMAND) {
    console.log(constant.VALIDATE_RESULT.INCORRECT_COMMAND + '..!!');
    return;
  }

  if (data.command === constant.VALIDATE_RESULT.NEW_CANVAS) {
    console.log(data);
    canvasData = createCanvas(data) || [];
    render(canvasData);
    return;
  }

  if (data.command === constant.VALIDATE_RESULT.NEW_LINE && hasCanvasData()) {
    console.log(data);
    newLine(data, canvasData);
    render(canvasData);
    return;
  }

  if (data.command === constant.VALIDATE_RESULT.NEW_RECTANGLE && hasCanvasData()) {
    console.log(data);
    newRectangle(data, canvasData);
    render(canvasData);
    return;
  }

  if (data.command === constant.VALIDATE_RESULT.FILL && hasCanvasData()) {
    console.log(data);
    fill(data, canvasData);
    render(canvasData);
    return;
  }

  if (data.command === constant.VALIDATE_RESULT.COLOR && hasCanvasData()) {
    console.log(data);
    color(data, canvasData);
    render(canvasData);
    return;
  }

  if (data.command === constant.VALIDATE_RESULT.QUIT) {
    console.log(constant.VALIDATE_RESULT.QUIT + '..!!');
    process.exit();
  }
}

function ask() {
  inquirer.prompt([constant.QUESTION]).then(answers => {
    console.log('\n');
    const data = validator(answers.command);
    handleCommand(data);
    console.log('\n');
    ask();
  });
}

ask();



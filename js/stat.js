'use strict';

const CLOUD_WIDTH = 500;
const CLOUD_HEIGHT = 200;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const TEXT_WIDTH = 75;
const BAR_WIDTH = 40;
const BAR_HEIGHT = 150;
const BAR_PADDING = 50;


const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = (arr) => {
  const maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};


window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = '#000000';

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';

  ctx.fillText('Ура вы победили', CLOUD_X + GAP, GAP * 4);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, GAP * 6);

  // const maxTimes = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    ctx.fillText(names[i], CLOUD_X + GAP * 4, CLOUD_Y + GAP);
    ctx.fillRect(CLOUD_X + GAP * 4 + (BAR_WIDTH + BAR_PADDING) * i, CLOUD_HEIGHT, BAR_WIDTH, BAR_HEIGHT);
  }


  console.log(names);
  console.log(times);
};


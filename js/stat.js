'use strict';

(function () {
  const CLOUD_WIDTH = 420;
  const CLOUD_HEIGHT = 270;
  const CLOUD_X = 100;
  const CLOUD_Y = 10;
  const GAP = 10;
  const BAR_WIDTH = 40;
  const BAR_HEIGHT = 150;
  const BAR_PADDING = 50;

  const renderCloudElement = (ctx, x, y, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  const renderCloud = (ctx) => {
    renderCloudElement(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.7)`);
    renderCloudElement(ctx, CLOUD_X, CLOUD_Y, `#ffffff`);
  };

  const getMaxElement = (arr) => {
    let maxElement = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  const renderText = (ctx) => {
    ctx.fillStyle = `#000000`;
    ctx.font = `16px PT Mono`;
    ctx.textBaseline = `hanging`;
    ctx.fillText(`Ура вы победили`, CLOUD_X + GAP, GAP * 4);
    ctx.fillText(`Список результатов:`, CLOUD_X + GAP, GAP * 6);
  };

  const renderPlayersResult = (ctx, names, times) => {
    const maxTime = getMaxElement(times);

    for (let i = 0; i < names.length; i++) {
      const playerTime = Math.round(BAR_HEIGHT * times[i] / maxTime);
      const columnX = CLOUD_X + GAP * 4 + (BAR_WIDTH + BAR_PADDING) * i;
      const colorSaturation = `hsl(240, ${Math.round(Math.random() * 100) + `%`}, 50%)`;
      ctx.fillStyle = `#000000`;
      ctx.fillText(names[i], columnX, CLOUD_HEIGHT - GAP);
      ctx.fillStyle = colorSaturation;
      if (names[i] === `Вы`) {
        ctx.fillStyle = `rgba(255, 0, 0, 1)`;
      }
      ctx.fillRect(columnX, CLOUD_HEIGHT - GAP * 3 - playerTime, BAR_WIDTH, playerTime);
    }
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx);
    renderText(ctx);
    renderPlayersResult(ctx, names, times);
  };
})();

'use strict';

(() => {
  const ENTER_KEYCODE = 13;
  const ESC_KEYCODE = 27;

  const getUtilRandomProperty = (array) => {
    return array[Math.floor(array.length * Math.random())];
  };

  const isUtilEscEvent = (evt, action) => {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      action();
    }
  };

  const isUtilEnterEvent = (evt, action) => {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
      action();
    }
  };

  const startCoords = {
    x: ``,
    y: ``
  };

  const recordUtilCoords = () => {
    const defaultCoords = {
      x: window.setup.offsetLeft,
      y: window.setup.offsetTop
    };
    startCoords.x = defaultCoords.x;
    startCoords.y = defaultCoords.y;
  };

  const returnUtilCoords = () => {
    window.setup.style.left = startCoords.x + `px`;
    window.setup.style.top = startCoords.y + `px`;
  };

  window.setup = document.querySelector(`.setup`);
  window.WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  window.WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  window.WIZARD_COLOR_COATS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  window.WIZARD_COLOR_EYES = [`black`, `red`, `blue`, `yellow`, `green`];
  window.WIZARD_COLOR_FIERBALL = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `e848d5`, `e6e848`];
  window.util = {
    getRandomProperty: getUtilRandomProperty,
    isEscEvent: isUtilEscEvent,
    isEnterEvent: isUtilEnterEvent,
    recordBeginningCoords: recordUtilCoords,
    returnBeginningCoords: returnUtilCoords
  };

})();

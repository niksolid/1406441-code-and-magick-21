'use strict';

(function () {
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = window.setup.querySelector(`.setup-close`);

  const onPopupEscPress = (evt) => {
    if (evt.target !== userNameInput) {
      window.util.isEscEvent(evt, window.closePopup);
    }
  };

  window.openPopup = () => {
    window.setup.classList.remove(`hidden`);
    window.util.recordBeginningCoords();
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  window.closePopup = () => {
    window.util.returnBeginningCoords();
    window.setup.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onPopupEscPress, true);
  };

  setupOpen.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    window.openPopup();
  });

  setupOpen.addEventListener(`keydown`, (evt) => {
    window.util.isEnterEvent(evt, window.openPopup);
  });

  setupClose.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    window.closePopup();
  });

  setupClose.addEventListener(`keydown`, (evt) => {
    window.util.isEnterEvent(evt, window.closePopup);
  });

  const userNameInput = document.querySelector(`.setup-user-name`);
  userNameInput.addEventListener(`invalid`, () => {
    if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity(`Обязательное поле`);
    } else {
      userNameInput.setCustomValidity(``);
    }
  });
  const setupWizard = window.setup.querySelector(`.setup-wizard`);
  const wizardCoat = setupWizard.querySelector(`.wizard-coat`);
  const wizardEyes = setupWizard.querySelector(`.wizard-eyes`);
  const wizardFireball = window.setup.querySelector(`.setup-fireball-wrap`);
  const inputCoat = window.setup.querySelector(`.coat-color`);
  const inputEyes = window.setup.querySelector(`.eyes-color`);
  const inputFireball = wizardFireball.querySelector(`input`);

  const replaceColor = (domElement, arrayColors, input, styleProperty) => {
    const color = window.util.getRandomProperty(arrayColors);
    if (styleProperty === `fill`) {
      domElement.style.fill = color;
    }
    if (styleProperty === `background`) {
      domElement.style.background = color;
    }
    input.value = color;
  };

  wizardCoat.addEventListener(`click`, () => {
    replaceColor(wizardCoat, window.WIZARD_COLOR_COATS, inputCoat, `fill`);
  });

  wizardEyes.addEventListener(`click`, () => {
    replaceColor(wizardEyes, window.WIZARD_COLOR_EYES, inputEyes, `fill`);
  });

  wizardFireball.addEventListener(`click`, () => {
    replaceColor(wizardFireball, window.WIZARD_COLOR_FIERBALL, inputFireball, `background`);
  });
})();

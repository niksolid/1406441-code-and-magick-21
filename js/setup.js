'use strict';

(function () {
  const similarListElement = window.setup.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content;

  const getWizard = () => {
    return {
      name: `${window.util.getRandomProperty(window.WIZARD_NAMES)} ${window.util.getRandomProperty(window.WIZARD_SURNAMES)}`,
      coatColor: window.util.getRandomProperty(window.WIZARD_COLOR_COATS),
      eyesColor: window.util.getRandomProperty(window.WIZARD_COLOR_EYES)
    };
  };

  const wizards = [];
  while (wizards.length < 4) {
    wizards.push(getWizard());
  }

  const renderWizard = (wizard) => {
    const wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

    return wizardElement;
  };

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);

  document.querySelector(`.setup-similar`).classList.remove(`hidden`);

  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = window.setup.querySelector(`.setup-close`);

  const onPopupEscPress = (evt) => {
    if (evt.target !== userNameInput) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  const openPopup = () => {
    window.setup.classList.remove(`hidden`);
    window.util.recordBeginningCoords();
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  const closePopup = () => {
    window.util.returnBeginningCoords();
    window.setup.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onPopupEscPress, true);
  };

  setupOpen.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    openPopup();
  });

  setupOpen.addEventListener(`keydown`, (evt) => {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    closePopup();
  });

  setupClose.addEventListener(`keydown`, (evt) => {
    window.util.isEnterEvent(evt, closePopup);
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

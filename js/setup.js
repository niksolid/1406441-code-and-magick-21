'use strict';

(function () {
  const similarListElement = window.setup.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content;

  const getPlayersWizards = (wizards) => {
    const wizardPlayers = [];
    while (wizardPlayers.length < 4) {
      const wizardNumber = window.util.getRandomNumber(0, wizards.length - 1);
      const wizardChosen = wizards[wizardNumber];
      if (wizardPlayers.indexOf(wizardChosen) === -1) {
        wizardPlayers.push(wizardChosen);
      }
    }
    return wizardPlayers;
  };

  const renderWizard = (wizard) => {
    const wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  const successHandler = function (wizards) {
    const fragment = document.createDocumentFragment();
    const wizardPlayers = getPlayersWizards(wizards);
    wizardPlayers.forEach((wizard) => {
      fragment.appendChild(renderWizard(wizard));
    });
    similarListElement.appendChild(fragment);
    window.setup.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.backend.load(successHandler, errorHandler);

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

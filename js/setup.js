'use strict';

(function () {
  const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  const WIZARD_COLOR_COATS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const WIZARD_COLOR_EYES = [`black`, `red`, `blue`, `yellow`, `green`];
  const WIZARD_COLOR_FIERBALL = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `e848d5`, `e6e848`];

  const setup = document.querySelector(`.setup`);

  const similarListElement = setup.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content;

  const getRandomProperty = (array) => {
    return array[Math.floor(array.length * Math.random())];
  };

  const getWizard = () => {
    return {
      name: `${getRandomProperty(WIZARD_NAMES)} ${getRandomProperty(WIZARD_SURNAMES)}`,
      coatColor: getRandomProperty(WIZARD_COLOR_COATS),
      eyesColor: getRandomProperty(WIZARD_COLOR_EYES)
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
  const setupClose = setup.querySelector(`.setup-close`);

  const onPopupEscPress = (evt) => {
    if (evt.keyCode === 27 && evt.target !== userNameInput) {
      evt.preventDefault();
      closePopup();
    }
  };

  const openPopup = () => {
    setup.classList.remove(`hidden`);

    document.addEventListener(`keydown`, onPopupEscPress);
  };

  const closePopup = () => {
    setup.classList.add(`hidden`);

    document.removeEventListener(`keydown`, onPopupEscPress, true);
  };

  setupOpen.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    openPopup();
  });

  setupOpen.addEventListener(`keydown`, (evt) => {
    // console.log(evt.target);
    // console.log(userNameInput);
    if (evt.keyCode === 13) {
      openPopup();
    }
  });

  setupClose.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    closePopup();
  });

  setupClose.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === 13) {
      closePopup();
    }
  });

  const userNameInput = document.querySelector(`.setup-user-name`);
  userNameInput.addEventListener(`invalid`, () => {
    if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity(`Обязательное поле`);
    } else {
      userNameInput.setCustomValidity(``);
    }
  });

  const setupWizard = setup.querySelector(`.setup-wizard`);
  const wizardCoat = setupWizard.querySelector(`.wizard-coat`);
  const wizardEyes = setupWizard.querySelector(`.wizard-eyes`);
  const wizardFireball = setup.querySelector(`.setup-fireball-wrap`);
  const inputCoat = setup.querySelector(`.coat-color`);
  const inputEyes = setup.querySelector(`.eyes-color`);
  const inputFireball = wizardFireball.querySelector(`input`);

  const replaceColor = (domElement, arrayColors, input, styleProperty) => {
    const color = getRandomProperty(arrayColors);
    if (styleProperty === `fill`) {
      domElement.style.fill = color;
    }
    if (styleProperty === `background`) {
      domElement.style.background = color;
    }
    input.value = color;
  };

  wizardCoat.addEventListener(`click`, () => {
    replaceColor(wizardCoat, WIZARD_COLOR_COATS, inputCoat, `fill`);
  });

  wizardEyes.addEventListener(`click`, () => {
    replaceColor(wizardEyes, WIZARD_COLOR_EYES, inputEyes, `fill`);
  });

  wizardFireball.addEventListener(`click`, () => {
    replaceColor(wizardFireball, WIZARD_COLOR_FIERBALL, inputFireball, `background`);
  });
})();

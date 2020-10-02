'use strict';

(function () {
  const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  const WIZARD_COLOR_COATS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const WIZARD_COLOR_EYES = [`black`, `red`, `blue`, `yellow`, `green`];

  const userDialog = document.querySelector(`.setup`);
  userDialog.classList.remove(`hidden`);

  const similarListElement = userDialog.querySelector(`.setup-similar-list`);
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
  document.addEventListener('keydown',  (evt) => {
    console.log(evt.keyCode);
  });

  // const setup = document.querySelector(`.setup`);
  // const setupOpen = document.querySelector(`.setup-open`);
  // const setupClose = setup.querySelector(`.setup-close`);

  // const onPopupEscPress = (evt) => {
  //   if (evt.key === 'Escape') {
  //     evt.preventDefault();
  //     closePopup();
  //   }
  // };

  // const openPopup = () => {
  //   setup.classList.remove('hidden');

  //   document.addEventListener('keydown', onPopupEscPress);
  // };

  // const closePopup = () => {
  //   setup.classList.add('hidden');

  //   document.removeEventListener('keydown', onPopupEscPress);
  // };

  // setupOpen.addEventListener('click', function () {
  //   openPopup();
  // });

  // setupOpen.addEventListener('keydown', function (evt) {
  //   console.log(evt.key);
  //   if (evt.key === 'Enter') {
  //     openPopup();
  //   }
  // });

  // setupClose.addEventListener('click', function () {
  //   closePopup();
  // });

  // setupClose.addEventListener('keydown', function (evt) {
  //   if (evt.key === 'Enter') {
  //     closePopup();
  //   }
  // });

})();

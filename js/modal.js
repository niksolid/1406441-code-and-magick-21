'use strict';

(() => {
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

  const loadSuccessHandler = (wizards) => {
    const fragment = document.createDocumentFragment();
    const wizardPlayers = getPlayersWizards(wizards);
    wizardPlayers.forEach((wizard) => {
      fragment.appendChild(renderWizard(wizard));
    });
    similarListElement.appendChild(fragment);
    window.setup.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.backend.load(loadSuccessHandler, errorHandler);

  const setupForm = window.setup.querySelector(`.setup-wizard-form`);
  const submitHandler = (evt) => {
    window.backend.save(new FormData(setupForm), window.closePopup, errorHandler);
    evt.preventDefault();
  };
  setupForm.addEventListener(`submit`, submitHandler);

  // const saveSuccessHandler = () => {
  // closePopup();
  // };

})();

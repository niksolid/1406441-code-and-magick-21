'use strict';

(() => {
  const DATA_URL = `https://21.javascript.pages.academy/code-and-magick/data`;
  const SEND_URL = `https://21.javascript.pages.academy/code-and-magick`;
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const backendLoad = (onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });
    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, DATA_URL);
    xhr.send();
  };

  const backendSave = (data, onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    // if (xhr.status === StatusCode)
    xhr.addEventListener(`load`, () => {
      onLoad(xhr.response);
    });
    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.open(`POST`, SEND_URL);
    xhr.send(data);
  };

  window.backend = {
    load: backendLoad,
    save: backendSave
  };
})();

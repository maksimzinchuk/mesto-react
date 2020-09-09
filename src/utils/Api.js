class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _getError(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._getError);
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._getError);
  }

  saveUserData(inputValues) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.about,
      }),
    }).then(this._getError);
  }

  addCard(inputs) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: inputs.name,
        link: inputs.link,
      }),
    }).then(this._getError);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getError);
  }

  putLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._getError);
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getError);
  }

  avatarChange(input) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: input.link,
      }),
    }).then(this._getError);
  }
}

export const ApiEntity = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-14",
  headers: {
    authorization: "53f63733-0798-40e6-804e-4dfb424b0ce2",
    "Content-Type": "application/json",
  }
})
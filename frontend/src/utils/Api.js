class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      credentials: "include",
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        console.log(err);
      });
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: "include",
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        console.log(err);
      });
  }

  editUser({name, about}) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        console.log(err);
      });
  }

  addCard({name, link}) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        console.log(err);
      });
  }

  changeLikeCardStatus(cardId, status) {
    if (status) {
          return fetch(`${this._url}/cards/${cardId}/likes `, {
            headers: this._headers,
            method: "PUT",
            credentials: "include",
          })
            .then((res) => this._getResponseData(res))
            .catch((err) => {
              console.log(err);
            });
    } else {
        return fetch(`${this._url}/cards/${cardId}/likes `, {
          headers: this._headers,
          method: "DELETE",
          credentials: "include",
        })
          .then((res) => this._getResponseData(res))
          .catch((err) => {
            console.log(err);
          });
    }
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId} `, {
      headers: this._headers,
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        console.log(err);
      });
  }

  editAvatar(url) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      credentials: 'include',
      body: JSON.stringify({
        avatar: url,
      }),
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        console.log(err);
      });
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}

export const api = new Api({
  url: "https://evgeny.nomoredomains.xyz",
  headers: {
    "Content-Type": "application/json",
  },
});

class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl
        this._headers = headers
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    getInitCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET', 
            credentials: 'include',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    editProfile(userData) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          credentials: 'include',
          headers: this._headers,
          body: JSON.stringify(userData)
        })
          .then(this._checkResponse)
      }

    editAvatar(userAvatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          credentials: 'include',
          headers: this._headers,
          body: JSON.stringify(userAvatar)
        })
          .then(this._checkResponse);
      }

      addCard(cardData) {
        return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          credentials: 'include',
          headers: this._headers,
          body: JSON.stringify(cardData)
        })
          .then(this._checkResponse)
      }

    removeCard(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    changeLikeCardStatus(cardId, like) {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        method: like ? 'PUT' : 'DELETE',
        credentials: 'include',
        headers: this._headers,
      })
        .then(this._checkResponse)
      }
}

export default new Api({
    baseUrl: 'https://api.ethereal.students.nomoredomains.icu',
    headers: {
      'Content-Type': 'application/json'
    }
});
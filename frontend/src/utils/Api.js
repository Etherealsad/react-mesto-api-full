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
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    getInitCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET', 
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    editProfile(userData) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify(userData)
        })
          .then(this._checkResponse)
      }

    editAvatar(userAvatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify(userAvatar)
        })
          .then(this._checkResponse);
      }

      addCard(cardData) {
        return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify(cardData)
        })
          .then(this._checkResponse)
      }

    removeCard(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    changeLikeCardStatus(cardId, isLiked) {
        const putLike = {
          headers: this._headers,
          method:'PUT',
        }
        const delLike = {
          headers: this._headers,
          method:'DELETE',
        }
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, isLiked ? delLike : putLike)
          .then(this._checkResponse)
      }
}

export default new Api({
    baseUrl: 'https://ethereal.students.nomoredomains.icu',
    headers: {
      'Content-Type': 'application/json'
    }
});
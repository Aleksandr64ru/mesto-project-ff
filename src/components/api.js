const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
  headers: {
    authorization: 'a10858c0-a82a-4b67-a8a1-00223439122d',
    'Content-Type': 'application/json'
  }
}

const request = (url, method, body) => {
  return fetch(url, {
      method: method,
      headers: config.headers,
      body: JSON.stringify(body)
  })
      .then((res) => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
  })
}

const getInitialCards = () => {
  return request(`${config.baseUrl}/cards`, 'GET')
}

const addCard = (name, link) => {
  return request(`${config.baseUrl}/cards`, 'POST', {
      name,
      link
  })
}

const deleteCard = (cardId) => {
  return request(`${config.baseUrl}/cards/${cardId}`, 'DELETE')
}

const addLike = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, 'PUT')
}

const deleteLike = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, 'DELETE')
}

const getPersonInfo = () => {
  return request(`${config.baseUrl}/users/me`, 'GET') 
}

const editPersonInfo = (name, about) => {
  return request(`${config.baseUrl}/users/me`, 'PATCH', {
      name: name,
      about: about
  });
}

const updateAvatar = (avatar) => {
  return request(`${config.baseUrl}/users/me/avatar`, 'PATCH', {
      avatar: avatar
  }) 
}


export { updateAvatar, editPersonInfo, getPersonInfo, deleteLike, addLike, deleteCard, addCard, getInitialCards}
// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
// const cardTemplate = document.getElementById("card-template").content;
// const placesList = document.querySelector(".places__list");
// function createCard(name, link, deleteCallback) {
//   const cardElement = cardTemplate.cloneNode(true);

//   const cardImage = cardElement.querySelector(".card__image");
//   cardImage.src = link;
//   cardImage.alt = name;
//   cardElement.querySelector(".card__title").textContent = name;

//   const deleteButton = cardElement.querySelector(".card__delete-button");
//   deleteButton.addEventListener("click", deleteCallback);

//   return cardElement;
// }

// function deleteCard(event) {
//   event.target.closest(".card").remove();
// }

// initialCards.forEach((card) => {
//   const newCard = createCard(card.name, card.link, deleteCard);
//   placesList.appendChild(newCard);
// });
// import './styles/index.css';

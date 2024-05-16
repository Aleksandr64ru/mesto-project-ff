// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.getElementById("card-template").content;
const placesList = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");

function createCard(name, link, deleteCallback) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector(".card__image").src = link;
    cardElement.querySelector(".card__image").alt = name;
    cardElement.querySelector(".card__title").textContent = name;

    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", deleteCallback);

    placesList.appendChild(cardElement);
}

function deleteCard(event) {
    event.target.closest(".card").remove();
}

initialCards.forEach((card) => {
    createCard(card.name, card.link, deleteCard);
});

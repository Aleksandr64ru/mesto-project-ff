const cardTemplate = document.getElementById("card-template").content;

function createCard(name, link, deleteCallback, openImageModal, toggleLike) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCallback);

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", toggleLike);

  cardImage.addEventListener("click", () => {
    openImageModal(name, link);
  });

  return cardElement;
}

function deleteCard(event) {
  event.target.closest(".card").remove();
}

function toggleLike(event) {
  const likeButton = event.target;
  likeButton.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, cardTemplate, toggleLike };

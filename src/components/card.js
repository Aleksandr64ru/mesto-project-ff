const cardTemplate = document.querySelector("#card-template").content;


function createCard(card, personId, handleCardDelete, handleCardLike, handleCardPreview) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCountElement = cardElement.querySelector(".card__like-count");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  const isLiked = card.likes.some((like) => like._id === personId)

  if (isLiked) {
    toggleCardLike(cardLikeButton)
  }
  if(card.owner._id !== personId) {
    cardDeleteButton.classList.add("card__delete-button-visible")
  }
  cardLikeCountElement.textContent = card.likes.length;

  cardDeleteButton.addEventListener("click", () => handleCardDelete(cardElement, card._id));
  cardLikeButton.addEventListener("click", () => handleCardLike(
    cardLikeButton.classList.contains("card__like-button_is-active"), card._id, cardLikeButton, cardLikeCountElement)
  );
  cardImage.addEventListener("click", handleCardPreview);

  return cardElement;
}

function updateLikeCounter(cardLikeCountElement, count) {
  cardLikeCountElement.textContent = count;
}

function toggleCardLike(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}


export {createCard,  updateLikeCounter, toggleCardLike}
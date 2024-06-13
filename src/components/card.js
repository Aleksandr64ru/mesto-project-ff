import { openModal } from "./modal.js";
import { closeModal } from "./modal.js"
import { initialCards } from "../cards.js"

const cardTemplate = document.getElementById("card-template").content;
const placesList = document.querySelector(".places__list");
const newPlaceForm = document.querySelector('.popup__form[name="new-place"]');
const inputPlace = document.querySelector('.popup__input[name="place-name"]');
const inputLink = document.querySelector('.popup__input[name="link"]');

function openImageModal(name, link) {
  const popup = document.querySelector('.popup_type_image');
  const image = popup.querySelector('.popup__image');
  const imageCaption = popup.querySelector('.popup__caption');
  
  image.src = link;
  image.alt = name;
  imageCaption.textContent = name;
  openModal(popup); 

  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    closeModal(popup);
  });
}


function createCard(name, link, deleteCallback, openImageModal) {
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


initialCards.forEach((card) => {
 
 
  const newCard = createCard(card.name, card.link, deleteCard, openImageModal, toggleLike);
  placesList.appendChild(newCard);
});



newPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const placeName = inputPlace.value;
  const placeImage = inputLink.value;
  const newCard = createCard(placeName, placeImage, deleteCard, openImageModal);

  placesList.prepend(newCard);
  
  newPlaceForm.reset();
  closeModal(newPlaceForm.closest('.popup'));
});


export { createCard, deleteCard, openImageModal, newPlaceForm, cardTemplate }
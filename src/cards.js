import imageArhyz from "./images/arkhyz.jpg";
import imageChelyabinsk from "./images/chelyabinsk-oblast.jpg";
import imageIvanovo from "./images/ivanovo.jpg";
import imageKamchatka from "./images/kamchatka.jpg";
import imageKholmogorsky from "./images/kholmogorsky-rayon.jpg";
import imageBaikal from "./images/baikal.jpg";


const initialCards = [
  {
    name: "Архыз",
    link: imageArhyz,
  },
  {
    name: "Челябинская область",
    link: imageChelyabinsk,
  },
  {
    name: "Иваново",
    link: imageIvanovo,
  },
  {
    name: "Камчатка",
    link: imageKamchatka,
  },
  {
    name: "Холмогорский район",
    link: imageKholmogorsky,
  },
  {
    name: "Байкал",
    link: imageBaikal,
  },
];

const cardTemplate = document.getElementById("card-template").content;
const placesList = document.querySelector(".places__list");
const newPlaceForm = document.querySelector('.popup__form[name="new-place"]');
const inputPlace = document.querySelector('.popup__input[name="place-name"]');
const inputLink = document.querySelector('.popup__input[name="link"]');

function openImageModal(imageUrl) {
  const popup = document.querySelector('.popup_type_image');
  const image = popup.querySelector('.popup__image');
  
  image.src = imageUrl;
  image.alt = 'Image';
  popup.classList.add('popup_is-opened');

  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    popup.classList.remove('popup_is-opened');
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
    openImageModal(link);
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
  const newCard = createCard(card.name, card.link, deleteCard, openImageModal);
  placesList.appendChild(newCard);
});



newPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const placeName = inputPlace.value;
  const placeImage = inputLink.value;
  const newCard = createCard(placeName, placeImage, deleteCard);

  placesList.prepend(newCard);
  
  newPlaceForm.reset();
});


export { initialCards, cardTemplate, createCard, deleteCard, newPlaceForm, openImageModal };


import "./pages/index.css";
import { initialCards } from "./cards.js";
import {
  createCard,
  deleteCard,
  cardTemplate,
  toggleLike,
} from "./components/card.js";
import {
  openModal,
  closeModal,
  clickOutsidePopup,
  escKeyHandler,
} from "./components/modal.js";

const placesList = document.querySelector(".places__list");
const newPlaceForm = document.querySelector('.popup__form[name="new-place"]');
const inputPlace = document.querySelector('.popup__input[name="place-name"]');
const inputLink = document.querySelector('.popup__input[name="link"]');
const popup = document.querySelector(".popup_type_image");
const image = popup.querySelector(".popup__image");
const imageCaption = popup.querySelector(".popup__caption");

function openImageModal(name, link) {
  image.src = link;
  image.alt = name;
  imageCaption.textContent = name;
  openModal(popup);
}

initialCards.forEach((card) => {
  const newCard = createCard(
    card.name,
    card.link,
    deleteCard,
    openImageModal,
    toggleLike
  );
  placesList.appendChild(newCard);
});

newPlaceForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const placeName = inputPlace.value;
  const placeImage = inputLink.value;
  const newCard = createCard(
    placeName,
    placeImage,
    deleteCard,
    openImageModal,
    toggleLike
  );

  placesList.prepend(newCard);

  closeModal(newPlaceForm.closest(".popup"));
});

const modals = document.querySelectorAll(".popup");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeModalButtons = document.querySelectorAll(".popup__close");
const openModalButtons = [editButton, addButton];

openModalButtons[0].addEventListener("click", () => {
  const activeModal = document.querySelector(".popup.popup_is-active");
  if (!activeModal) {
    openModal(modals[0]);
  }
  nameField.value = nameValue;
  aboutMeField.value = aboutMeValue;
});

openModalButtons[1].addEventListener("click", () => {
  const activeModal = document.querySelector(".popup.popup_is-active");
  if (!activeModal) {
    openModal(modals[1]);
  }
  newPlaceForm.reset();
});

closeModalButtons[0].addEventListener("click", () => {
  closeModal(modals[0]);
});

closeModalButtons[1].addEventListener("click", () => {
  closeModal(modals[1]);
});

const formEditProfile = document.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input");
const jobInput = formEditProfile.querySelector(".popup__input");

function submitEditProfileForm(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const profileName = document.querySelector(".popup__input_type_name");
  const profileJob = document.querySelector(".popup__input_type_description");

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  closeModal(formEditProfile.closest(".popup"));
}

formEditProfile.addEventListener("submit", submitEditProfileForm);

const nameValue = document.querySelector(".profile__title").textContent;
const aboutMeValue = document.querySelector(
  ".profile__description"
).textContent;

const nameField = document.querySelector(".popup__input_type_name");
const aboutMeField = document.querySelector(".popup__input_type_description");

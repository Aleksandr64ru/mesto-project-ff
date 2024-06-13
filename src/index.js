import "./pages/index.css";
import { initialCards } from "./cards.js";
import {
  createCard,
  deleteCard,
  newPlaceForm,
  cardTemplate,
  openImageModal,
} from "./components/card.js";
import {
  openModal,
  closeModal,
  clickOutsidePopup,
  escKeyHandler,
} from "./components/modal.js";

document.addEventListener("click", clickOutsidePopup);
document.addEventListener("keydown", escKeyHandler);

const modals = document.querySelectorAll(".popup");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeModalButtons = document.querySelectorAll(".popup__close");
const openModalButtons = [editButton, addButton];

for (let i = 0; i < openModalButtons.length; i++) {
  openModalButtons[i].addEventListener("click", () => {
    const activeModal = document.querySelector(".popup.popup_is-active");
    if (!activeModal) {
      openModal(modals[i]);
    }
  });
}

for (let i = 0; i < closeModalButtons.length; i++) {
  closeModalButtons[i].addEventListener("click", () => {
    closeModal(modals[i]);
  });
}

const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input");
const jobInput = formElement.querySelector(".popup__input");

function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const profileName = document.querySelector(".popup__input_type_name");
  const profileJob = document.querySelector(".popup__input_type_description");

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  formElement.reset();
  closeModal(formElement.closest(".popup"));
}

formElement.addEventListener("submit", handleFormSubmit);

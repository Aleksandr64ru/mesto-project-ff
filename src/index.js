import "./pages/index.css";
import { initialCards, cardTemplate, createCard, deleteCard, newPlaceForm, openImageModal } from "./cards.js";
import {
  modals,
  openModalButtons,
  closeModalButtons,
  openModal,
  closeModal,
  clickOutsidePopup,
  escKeyHandler,
} from "./modal.js";



document.addEventListener("click", clickOutsidePopup);
document.addEventListener("keydown", escKeyHandler);

const placesList = document.querySelector(".places__list");
const modal = document.querySelector(".popup");


openModalButtons.forEach((openButton, index) => {
  openButton.addEventListener("click", () => {
    openModal(modals[index]);
  });
});

closeModalButtons.forEach((closeButton, index) => {
  closeButton.addEventListener("click", () => {
    closeModal(modals[index]);
  });
});

const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

 const profileName = document.querySelector('.popup__input');
 const profileJob = document.querySelector('.popup__input');

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
}

formElement.addEventListener('submit', handleFormSubmit);




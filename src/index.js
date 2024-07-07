import "./pages/index.css";
import {
  createCard,
  updateLikeCounter,
  toggleCardLike,
} from "./components/card.js";
import { handlePopupClick, openPopup, closePopup } from "./components/modal.js";
import {
  enableValidation,
  clearValidation,
  isValid,
  toggleButtonState,
} from "./components/validation.js";
import {
  getInitialCards,
  getPersonInfo,
  addCard,
  deleteCard,
  editPersonInfo,
  addLike,
  deleteLike,
  updateAvatar,
} from "./components/api.js";

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editForm = document.forms.namedItem("edit-profile");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description"
);
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditSubmitButton = editForm.querySelector(".popup__button");

const cardAddButton = document.querySelector(".profile__add-button");
const imageUrlInput = document.querySelector(".popup__input_type_url");
const imageDescriptionInput = document.querySelector(
  ".popup__input_type_card-name"
);
const addForm = document.forms.namedItem("new-place");
const addSubmitButton = addForm.querySelector(".popup__button");

const editAvatarButton = document.querySelector(".profile__avatar-edit-button");
const editAvatarPopup = document.querySelector(".popup_type_edit-avatar");
const avatarUrlInput = document.querySelector(".popup__input_new_avatar_url");
const editAvatarForm = document.forms.namedItem("avatar");
const editAvatarSubmitButton = editAvatarForm.querySelector(".popup__button");
const avatarImage = document.querySelector(".profile__image");

const popupImagePreview = document.querySelector(".popup_type_image");
const popupImage = popupImagePreview.querySelector(".popup__image");
const popupImageCaption = popupImagePreview.querySelector(".popup__caption");

const cardContainer = document.querySelector(".places__list");
const editPopupElement = document.querySelector(".popup_type_edit");
const addPopupElement = document.querySelector(".popup_type_new-card");
const popupsArray = Array.from(document.querySelectorAll(".popup"));

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function renderInitialCards() {
  Promise.all([getInitialCards(), getPersonInfo()])
    .then(([cards, personalInfo]) => {
      profileTitle.textContent = personalInfo.name;
      profileDescription.textContent = personalInfo.about;
      avatarImage.style.backgroundImage = `url(${personalInfo.avatar})`;

      cards.forEach((card) => {
        const newCard = createCard(
          card,
          personalInfo._id,
          deleteCardHandler,
          likeCardHandler,
          prevewCard
        );
        cardContainer.append(newCard);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteCardHandler(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function likeCardHandler(
  isActive,
  cardId,
  cardLikeButton,
  cardLikeCountElement
) {
  if (isActive) {
    deleteLike(cardId)
      .then((card) => {
        updateLikeCounter(cardLikeCountElement, card.likes.length);
        toggleCardLike(cardLikeButton);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLike(cardId)
      .then((card) => {
        updateLikeCounter(cardLikeCountElement, card.likes.length);
        toggleCardLike(cardLikeButton);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function prevewCard(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupImageCaption.textContent = evt.target.alt;

  openPopup(popupImagePreview);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  updateSaveButtonState(true, addSubmitButton);
  addCard(imageDescriptionInput.value, imageUrlInput.value)
    .then((newCard) => {
      const createdCard = createCard(
        newCard,
        newCard.owner._id,
        deleteCardHandler,
        likeCardHandler,
        prevewCard
      );
      cardContainer.prepend(createdCard);
      closePopup(addPopupElement);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      updateSaveButtonState(false, addSubmitButton);
    });
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();

  updateSaveButtonState(true, editAvatarSubmitButton);
  updateAvatar(avatarUrlInput.value)
    .then((avatar) => {
      avatarImage.style.backgroundImage = `url(${avatar.avatar})`;
      closePopup(editAvatarPopup);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      updateSaveButtonState(false, editAvatarSubmitButton);
    });
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  updateSaveButtonState(true, profileEditSubmitButton);
  editPersonInfo(nameInput.value, descriptionInput.value)
    .then((newPersonInfo) => {
      profileTitle.textContent = newPersonInfo.name;
      profileDescription.textContent = newPersonInfo.about;
      closePopup(editPopupElement);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      updateSaveButtonState(false, profileEditSubmitButton);
    });
}

function updateSaveButtonState(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранить...";
  } else {
    button.textContent = "Сохранить";
  }
}

function handleEditPopupOpen() {
  openPopup(editPopupElement);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  clearValidation(editPopupElement, validationSettings);

  const formInputArray = Array.from(
    editPopupElement.querySelectorAll(validationSettings.inputSelector)
  );
  const buttonElement = editPopupElement.querySelector(
    validationSettings.submitButtonSelector
  );
  formInputArray.forEach((inputElement) => {
    isValid(editPopupElement, inputElement, validationSettings);
  });
  toggleButtonState(formInputArray, buttonElement, validationSettings);
}

function handleAddPopupOpen() {
  openPopup(addPopupElement);
}

function handleEditAvatarPopupOpen() {
  openPopup(editAvatarPopup);
}

profileEditButton.addEventListener("click", () => {
  handleEditPopupOpen();
});

cardAddButton.addEventListener("click", () => {
  handleAddPopupOpen();
});

editAvatarButton.addEventListener("click", () => {
  handleEditAvatarPopupOpen();
});

editForm.addEventListener("submit", (evt) => {
  handleEditFormSubmit(evt);
});

addForm.addEventListener("submit", (evt) => {
  handleAddFormSubmit(evt);
});

editAvatarForm.addEventListener("submit", (evt) => {
  handleEditAvatarFormSubmit(evt);
});

popupsArray.forEach((popup) => {
  popup.addEventListener("click", handlePopupClick);
});

enableValidation(validationSettings);

renderInitialCards();

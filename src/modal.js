export const modals = document.querySelectorAll(".popup");
export const openModalButtons = document.querySelectorAll(".profile__edit-button, .profile__add-button");
export const closeModalButtons = document.querySelectorAll(".popup__close");

export const openModal = (modal) => {
  modal.classList.add("active");
};

export const closeModal = (modal) => {
  modal.classList.remove("active");
};

export const clickOutsidePopup = (event) => {
  modals.forEach((modal) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
};

export const escKeyHandler = (event) => {
  if (event.key === "Escape") {
    modals.forEach((modal) => {
      if (modal.classList.contains("active")) {
        closeModal(modal);
      }
    });
  }
};

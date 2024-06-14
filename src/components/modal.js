const openModal = (modal) => {
  modal.classList.add("popup_is-active");
  document.addEventListener("click", clickOutsidePopup);
  document.addEventListener("keydown", escKeyHandler);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_is-active");
  document.removeEventListener("click", clickOutsidePopup);
  document.removeEventListener("keydown", escKeyHandler);
};

const clickOutsidePopup = (event) => {
  const activeModal = document.querySelector(".popup.popup_is-active");
  if (event.target === activeModal) {
    closeModal(activeModal);
  }
};

const escKeyHandler = (event) => {
  if (event.key === "Escape") {
    const activeModal = document.querySelector(".popup.popup.popup_is-active");
    if (activeModal) {
      closeModal(activeModal);
    }
  }
};

export { openModal, closeModal, clickOutsidePopup, escKeyHandler };

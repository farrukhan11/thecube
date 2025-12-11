(() => {
  const modal = document.querySelector("[data-homepage-modal]");
  if (!modal) {
    return;
  }

  const overlay = modal.querySelector("[data-homepage-modal-overlay]");
  const closeButton = modal.querySelector(".homepage-modal__close");
  const openModal = () => {
    modal.classList.add("is-visible");
  };

  const closeModal = () => {
    modal.classList.remove("is-visible");
  };

  const attachEvents = () => {
    if (closeButton) {
      closeButton.addEventListener("click", closeModal);
    }

    if (overlay) {
      overlay.addEventListener("click", closeModal);
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-visible")) {
        closeModal();
      }
    });
  };

  const init = () => {
    attachEvents();
    window.requestAnimationFrame(openModal);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

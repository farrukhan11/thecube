(() => {
  const modal = document.querySelector("[data-homepage-modal]");
  if (!modal) {
    return;
  }

  const overlay = modal.querySelector("[data-homepage-modal-overlay]");
  const closeButton = modal.querySelector(".homepage-modal__close");
  const modalImage = modal.querySelector(".homepage-modal__image");
  const images = ["assets/img/modal-pic.jpg", "assets/img/modal-pic2.jpg"];
  const switchDelayMs = 2500;
  const transitionMs = 500;
  let currentIndex = 0;
  let sliderIntervalId = null;

  if (modalImage) {
    modalImage.src = images[currentIndex];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }

  const openModal = () => {
    modal.classList.add("is-visible");
  };

  const closeModal = () => {
    modal.classList.remove("is-visible");
  };

  const switchModalImage = () => {
    if (!modalImage) {
      return;
    }
    modalImage.classList.add("is-sliding-out");

    window.setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length;
      modalImage.src = images[currentIndex];
      modalImage.classList.remove("is-sliding-out");
      modalImage.classList.add("is-sliding-in");

      window.requestAnimationFrame(() => {
        modalImage.classList.remove("is-sliding-in");
      });
    }, transitionMs);
  };

  const startAutoSlider = () => {
    if (!modalImage || sliderIntervalId) {
      return;
    }
    sliderIntervalId = window.setInterval(switchModalImage, switchDelayMs);
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
    startAutoSlider();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

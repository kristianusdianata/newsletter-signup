export function carousel() {
  const carousel = document.querySelector(".carousel");
  const carouselSlider = carousel.querySelector(".carousel__slider");
  let indexItem = 0;
  let state = false;
  const slideTransitionTime = 250;

  function getState() {
    return state;
  }

  function slideHandler() {
    if (state) {
      carouselSlider.style.transform = `translateX(-${indexItem * 100}%)`;
      carouselSlider.style.transition = `transform ${
        slideTransitionTime / 1000
      }s ease-in-out`;
    }
  }

  async function slideToIndex(index) {
    indexItem = index;
    if (!state) {
      state = true;

      slideHandler();

      // wait for the slide transition to complete
      await new Promise((resolve) => {
        setTimeout(resolve, slideTransitionTime);
      });

      state = false;
    }
  }

  return { slideToIndex, getState };
}

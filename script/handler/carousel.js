export function carousel() {
  const carousel = document.querySelector(".carousel");
  const carousel_slider = carousel.querySelector(".carousel__slider");
  let index_item = 0;
  let state = false;
  const slide_transition_time = 250;

  function getState() {
    return state;
  }

  function slideHandler() {
    if (state) {
      carousel_slider.style.transform = `translateX(-${index_item * 100}%)`;
      carousel_slider.style.transition = `transform ${
        slide_transition_time / 1000
      }s ease-in-out`;
    }
  }

  async function slideToIndex(index) {
    index_item = index;
    if (!state) {
      state = true;

      slideHandler();

      // wait for the slide transition to complete
      await new Promise((resolve) => {
        setTimeout(resolve, slide_transition_time);
      });

      state = false;
    }
  }

  return { slideToIndex, getState };
}

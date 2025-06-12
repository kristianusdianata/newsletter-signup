import { handler } from "./handler.js";
import { state } from "./state.js";

export function main() {
  const carousel = document.querySelector(".carousel");
  const carouselSlider = carousel.querySelector(".carousel__slider");
  const slideTransitionTime = 250;

  const stateFunc = state();
  const handlerFunc = handler();

  async function runSlider() {
    stateFunc.isSlideCallback(
      async () => {
        handlerFunc.onSlideHandler(
          carouselSlider,
          stateFunc.getIndexItem(),
          slideTransitionTime
        );

        // wait for the slide transition to complete
        await new Promise((resolve) => {
          setTimeout(resolve, slideTransitionTime);
        });

        stateFunc.setIsSlide(false);
      },
      () => {}
    );
  }

  async function slideToIndex(index) {
    stateFunc.setIndexItem(index);

    stateFunc.isSlideCallback(
      () => {},
      async () => {
        stateFunc.setIsSlide(true);
        await runSlider();
      }
    );
  }

  return {
    slideToIndex,
  };
}

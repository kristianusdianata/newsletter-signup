export function handler() {
  function onSlideHandler(sliderElement, slideToIndex = 0, transitionTime = 1) {
    sliderElement.style.transform = `translateX(-${slideToIndex * 100}%)`;
    sliderElement.style.transition = `transform ${
      transitionTime / 1000
    }s ease-in-out`;
  }

  return {
    onSlideHandler,
  };
}

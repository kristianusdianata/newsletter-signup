export function state() {
  let indexItem = 0;
  let isSlide = false;

  function getIsSlide() {
    return isSlide;
  }

  function getIndexItem() {
    return indexItem;
  }

  function setIsSlide(slide) {
    isSlide = slide;
  }

  function setIndexItem(index) {
    indexItem = index;
  }

  function isSlideCallback(onTrueCallback, onFalseCallback) {
    if (isSlide && onTrueCallback) onTrueCallback();
    else if (!isSlide && onFalseCallback) onFalseCallback();
  }

  return {
    getIsSlide,
    getIndexItem,
    setIndexItem,
    setIsSlide,
    isSlideCallback,
  };
}

export function attributeHandler(targetElement) {
  const element = targetElement;

  function callback(element) {
    const element_ = element;

    if (!element_) return;

    function updateAttribute(attr, callback) {
      if (attr && callback) return callback(element_, attr);
    }

    return { updateAttribute };
  }

  function addClass(className) {
    const callbackHandler = callback(element);
    callbackHandler.updateAttribute(className, (element, className) => {
      element.classList.add(className);
    });
  }

  function removeClass(className) {
    const callbackHandler = callback(element);
    callbackHandler.updateAttribute(className, (element, className) => {
      element.classList.remove(className);
    });
  }

  function removeAttribute(attr) {
    const callbackHandler = callback(element);
    callbackHandler.updateAttribute(attr, (element, attr) => {
      element.removeAttribute(attr);
    });
  }

  function addAttribute(attr) {
    const callbackHandler = callback(element);
    callbackHandler.updateAttribute(attr, (element, attr) => {
      element.setAttribute(attr, "");
    });
  }

  return {
    addClass,
    addAttribute,
    removeClass,
    removeAttribute,
  };
}

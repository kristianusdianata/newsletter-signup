export function attributeHandler(targetElement) {
  const element = targetElement;

  function callbackHandler(element, attr, callback) {
    if (element && attr && callback) callback(element, attr);
  }

  function addClass(className) {
    callbackHandler(element, className, (element, className) => {
      element.classList.add(className);
    });
  }

  function removeClass(className) {
    callbackHandler(element, className, (element, className) => {
      element.classList.remove(className);
    });
  }

  function removeAttribute(attr) {
    callbackHandler(element, attr, (element, attr) => {
      element.removeAttribute(attr);
    });
  }

  function addAttribute(attr) {
    callbackHandler(element, attr, (element, attr) => {
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

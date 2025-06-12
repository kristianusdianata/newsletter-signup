export function attributeHandler(targetElement) {
  if (!targetElement) return;

  function updateCallback(attr, callback) {
    if (attr && callback) return callback(targetElement, attr);
  }

  function addClass(className) {
    updateCallback(className, (element, className) => {
      if (!element.classList.contains(className)) {
        element.classList.add(className);
      }
    });
  }

  function removeClass(className) {
    updateCallback(className, (element, className) => {
      if (element.classList.contains(className)) {
        element.classList.remove(className);
      }
    });
  }

  function removeAttribute(attrName) {
    updateCallback(attrName, (element, attrName) => {
      element.removeAttribute(attrName);
    });
  }

  function addAttribute(attrName) {
    updateCallback(attrName, (element, attrName) => {
      element.setAttribute(attrName, "");
    });
  }

  return {
    addClass,
    addAttribute,
    removeClass,
    removeAttribute,
  };
}

import { attributeHandler } from "../core.js";

export function ui() {
  function carouselItem(element) {
    const activeClass = "is-active";
    const attrName = "inert";
    const attrFunc = attributeHandler(element);

    return {
      onActiveTrue: () => {
        attrFunc.addClass(activeClass);
        attrFunc.removeAttribute(attrName);
      },
      onActiveFalse: () => {
        attrFunc.removeClass(activeClass);
        attrFunc.addAttribute(attrName);
      },
    };
  }

  function labelEmail(element, email = "") {
    return {
      onActiveTrue: () => {
        element.innerHTML = email;
      },
      onActiveFalse: () => {
        element.innerHTML = "";
      },
    };
  }

  return {
    carouselItem,
    labelEmail,
  };
}

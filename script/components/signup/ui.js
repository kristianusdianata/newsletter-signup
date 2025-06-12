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

  function inputForm(element) {
    const errorClass = "signup__form-input--danger";
    const attrFunc = attributeHandler(element);

    return {
      onErrorTrue: () => {
        attrFunc.addClass(errorClass);
      },
      onErrorFalse: () => {
        attrFunc.removeClass(errorClass);
        element.value = "";
      },
    };
  }

  function errorLabel(element, errMsg = "") {
    return {
      onErrorTrue: () => {
        element.innerHTML = errMsg;
      },
      onErrorFalse: () => {
        element.innerHTML = "";
      },
    };
  }

  return {
    carouselItem,
    inputForm,
    errorLabel,
  };
}

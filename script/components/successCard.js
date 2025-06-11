import { carousel } from "../handlers/index.js";
import { attributeHandler } from "./core.js";

export function successCard() {
  const carouselItem = document.querySelector(".carousel__item#success");
  const sucessCard = document.querySelector(".success");
  const successButton = sucessCard.querySelector(".success__button");
  const validatedEmailLabel = sucessCard.querySelector(".success__desc b");

  const activeClass = "is-active";
  const targetAttr = "inert";

  const carouselFunc = carousel();
  const carouselAttrHandler = attributeHandler(carouselItem);

  let isActive = false;
  let email = "";

  function onActiveCallback(onTrueCallback, onFalseCallback) {
    if (isActive && email && onTrueCallback) onTrueCallback();
    else if (!isActive && !email && onFalseCallback) onFalseCallback();
  }

  function updateState(isActive_, email_) {
    isActive = isActive_;
    email = email_;
  }

  function initialState() {
    isActive = false;
    email = "";
  }

  function updateElement() {
    onActiveCallback(
      () => {
        validatedEmailLabel.innerHTML = email;
      },
      () => {
        validatedEmailLabel.innerHTML = "";
      }
    );
  }

  function updateActiveClass() {
    onActiveCallback(
      () => carouselAttrHandler.addClass(activeClass),
      () => carouselAttrHandler.removeClass(activeClass)
    );
  }

  function updateAttribute() {
    onActiveCallback(
      () => carouselAttrHandler.removeAttribute(targetAttr),
      () => carouselAttrHandler.addAttribute(targetAttr)
    );
  }

  function onShow(validatedEmail) {
    updateState(true, validatedEmail);
    updateElement();
    updateActiveClass();
    updateAttribute();
  }

  async function onHide(callbackSignup) {
    initialState();
    updateElement();
    updateActiveClass();
    updateAttribute();
    callbackSignup();
    await carouselFunc.slideToIndex(0);
  }

  function onConfirm(callbackSignup) {
    successButton.addEventListener("click", function (e) {
      e.preventDefault();

      onActiveCallback(
        async () => {
          await onHide(callbackSignup);
        },
        () => {}
      );
    });
  }

  return {
    onConfirm,
    onShow,
  };
}

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

  function callback(activeState, email) {
    const activeState_ = activeState;
    const email_ = email;

    /**
     * true : activeState_ && email_
     * false : !activeState_ && !email_
     */
    let screenIsActive = false;

    if (activeState_ && email_) screenIsActive = true;
    else if (!activeState_ && !email_) screenIsActive = false;

    function isActive(onTrueCallback, onFalseCallback) {
      if (screenIsActive && onTrueCallback) onTrueCallback();
      else if (!screenIsActive && onFalseCallback) onFalseCallback();
    }

    return { isActive };
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
    const callbackHandler = callback(isActive, email);
    callbackHandler.isActive(
      () => {
        validatedEmailLabel.innerHTML = email;
      },
      () => {
        validatedEmailLabel.innerHTML = "";
      }
    );
  }

  function updateActiveClass() {
    const callbackHandler = callback(isActive, email);
    callbackHandler.isActive(
      () => carouselAttrHandler.addClass(activeClass),
      () => carouselAttrHandler.removeClass(activeClass)
    );
  }

  function updateAttribute() {
    const callbackHandler = callback(isActive, email);
    callbackHandler.isActive(
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

      const callbackHandler = callback(isActive, email);
      callbackHandler.isActive(
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

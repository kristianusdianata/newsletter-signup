import { validation, carousel } from "../handlers/index.js";
import { attributeHandler } from "./core.js";
import { helper } from "../helper.js";

export function signupCard() {
  const carouselItem = document.querySelector(".carousel__item#signup");
  const signupCard = document.querySelector(".signup");
  const signupForm = signupCard.querySelector(".signup__form");
  const signupInput = signupForm.querySelector(".signup__form-input");
  const signupErrorLabel = signupForm.querySelector(".signup__form-error");

  const errorClass = "signup__form-input--danger";
  const activeClass = "is-active";
  const targetAttr = "inert";

  const helperFunc = helper();
  const validationFunc = validation();
  const carouselFunc = carousel();
  const carouselAttrHandler = attributeHandler(carouselItem);
  const inputAttrHandler = attributeHandler(signupInput);

  let isError = false;
  let isActive = true;

  function callback(activeState) {
    const activeState_ = activeState;

    function isActive(onTrueCallback, onFalseCallback) {
      if (activeState_ && onTrueCallback) onTrueCallback();
      else if (!activeState_ && onFalseCallback) onFalseCallback();
    }

    function isError(errorState, onTrueCallback, onFalseCallback) {
      const errorState_ = errorState;

      if (!activeState_) return;

      if (errorState_ && onTrueCallback) onTrueCallback();
      else if (!errorState_ && onFalseCallback) onFalseCallback();
    }

    return { isActive, isError };
  }

  function updateState(isActive_, isError_) {
    isActive = isActive_;
    isError = isError_;
  }

  function initialState() {
    updateState(true, false);
  }

  function updateElement(errorMsg = "", email = "") {
    const callbackHandler = callback(isActive);
    callbackHandler.isError(
      isError,
      () => {
        signupErrorLabel.innerHTML = errorMsg;
        signupInput.value = email;
        inputAttrHandler.addClass(errorClass);
      },
      () => {
        signupErrorLabel.innerHTML = "";
        signupInput.value = "";
        inputAttrHandler.removeClass(errorClass);
      }
    );
  }

  function updateActiveClass() {
    const callbackHandler = callback(isActive);
    callbackHandler.isActive(
      () => {
        carouselAttrHandler.addClass(activeClass);
      },
      () => {
        carouselAttrHandler.removeClass(activeClass);
      }
    );
  }

  function updateAttribute() {
    const callbackHandler = callback(isActive);
    callbackHandler.isActive(
      () => {
        carouselAttrHandler.removeAttribute(targetAttr);
      },
      () => {
        carouselAttrHandler.addAttribute(targetAttr);
      }
    );
  }

  function onShow() {
    initialState();
    updateElement();
    updateActiveClass();
    updateAttribute();
  }

  async function onHide(email, callbackSuccess) {
    updateState(false, false);
    updateElement();
    updateActiveClass();
    updateAttribute();
    callbackSuccess(email);
    await carouselFunc.slideToIndex(1);
  }

  async function submitHandler(email, callbackSuccess) {
    initialState();

    try {
      const response = await helperFunc.asyncCallback((resolve, reject) => {
        validationFunc.email(
          email,
          (validatedEmail) => resolve(validatedEmail),
          (message) => reject(message)
        );
      });

      await onHide(response, callbackSuccess);
    } catch (errorMsg) {
      updateState(true, true);
      updateElement(errorMsg, email);
    }
  }

  function onSubmit(callbackSuccess) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const callbackHandler = callback(isActive);
      callbackHandler.isActive(
        async () => {
          const email = signupInput.value.toString().replace(/\s+/g, "");
          await submitHandler(email, callbackSuccess);
        },
        () => {}
      );
    });
  }

  return {
    onSubmit,
    onShow,
  };
}

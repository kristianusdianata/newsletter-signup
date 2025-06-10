import { helper } from "../helper.js";
import { validation, carousel } from "../handlers/index.js";

export function signupCard() {
  const carouselItem = document.querySelector(".carousel__item#signup");
  const signupCard = document.querySelector(".signup");
  const signupForm = signupCard.querySelector(".signup__form");
  const signupInput = signupForm.querySelector(".signup__form-input");
  const signupErrorLabel = signupForm.querySelector(".signup__form-error");

  const errorClass = "signup__form-input--danger";
  const activeClass = "is-active";

  const helperFunc = helper();
  const validationFunc = validation();
  const carouselFunc = carousel();

  let isError = false;
  let isActive = true;

  function onActiveCallback(onTrueCallback, onFalseCallback) {
    if (isActive && onTrueCallback) onTrueCallback();
    else if (!isActive && onFalseCallback) onFalseCallback();
  }

  function onErrorCallback(onTrueCallback, onFalseCallback) {
    if (isActive && isError && onTrueCallback) onTrueCallback();
    else if (isActive && !isError && onFalseCallback) onFalseCallback();
  }

  function updateState(isActive_, isError_) {
    isActive = isActive_;
    isError = isError_;
  }

  function initialState() {
    updateState(true, false);
  }

  function updateElement(errorMsg = "", email = "") {
    onErrorCallback(
      () => {
        signupErrorLabel.innerHTML = errorMsg;
        signupInput.value = email;
        helperFunc.updateClass(
          signupInput,
          errorClass,
          () => {},
          () => signupInput.classList.add(errorClass)
        );
      },
      () => {
        signupErrorLabel.innerHTML = "";
        signupInput.value = "";
        helperFunc.updateClass(
          signupInput,
          errorClass,
          () => signupInput.classList.remove(errorClass),
          () => {}
        );
      }
    );
  }

  function updateActiveClass() {
    onActiveCallback(
      () => {
        helperFunc.updateClass(
          signupCard,
          activeClass,
          () => {},
          () => signupCard.classList.add(activeClass)
        );
      },
      () => {
        helperFunc.updateClass(
          signupCard,
          activeClass,
          () => signupCard.classList.remove(activeClass),
          () => {}
        );
      }
    );
  }

  function updateAttribute() {
    onActiveCallback(
      () => {
        helperFunc.updateAttribute(
          carouselItem,
          "inert",
          () => {
            carouselItem.removeAttribute("inert");
          },
          () => {}
        );
      },
      () => {
        helperFunc.updateAttribute(
          carouselItem,
          "aria-hidden",
          () => {},
          () => {
            carouselItem.setAttribute("inert", "");
          }
        );
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

      onActiveCallback(
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

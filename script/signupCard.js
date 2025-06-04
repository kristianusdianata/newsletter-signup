import { helper } from "./helper.js";
import { cardState } from "./handler/index.js";

export function signupCard() {
  const signupCard = document.querySelector(".signup");
  const signupForm = signupCard.querySelector(".signup__form");
  const signupInput = signupForm.querySelector(".signup__form-input");
  const signupErrorLabel = signupForm.querySelector(".signup__form-error");
  const signupSubmitButton = signupForm.querySelector(".signup__submit-button");

  const focusableElement = [signupInput, signupSubmitButton];
  const errorClass = "signup__form-input--danger";
  const activeClass = "is-active";

  const helperFunc = helper();
  const stateFunc = cardState();

  stateFunc.setState(true); // default state

  function getSubmitForm() {
    return signupForm;
  }

  function getInputField() {
    return signupInput;
  }

  function getState() {
    return stateFunc.getState();
  }

  function initialState() {
    signupErrorLabel.innerHTML = "";
    signupInput.value = "";
    helperFunc.updateClass(
      signupInput,
      errorClass,
      () => signupInput.classList.remove(errorClass),
      () => {}
    );
  }

  function updateClass() {
    helperFunc.stateCallback(
      stateFunc.getState(),
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

  function updateTabindex() {
    helperFunc.stateCallback(
      stateFunc.getState(),
      () => {
        focusableElement.forEach((element) => {
          helperFunc.updateAttribute(element, "tabindex", () => {
            element.setAttribute("tabindex", "0");
          });
        });
      },
      () => {
        focusableElement.forEach((element) => {
          helperFunc.updateAttribute(element, "tabindex", () => {
            element.setAttribute("tabindex", "-1");
          });
        });
      }
    );
  }

  function onError(errorMsg, email) {
    helperFunc.stateCallback(
      stateFunc.getState(),
      () => {
        initialState();
        signupErrorLabel.innerHTML = errorMsg;
        signupInput.value = email;
        helperFunc.updateClass(
          signupInput,
          errorClass,
          () => {},
          () => signupInput.classList.add(errorClass)
        );
      },
      () => {}
    );
  }

  function onHide() {
    stateFunc.setState(false);
    helperFunc.stateCallback(
      stateFunc.getState(),
      () => {},
      () => {
        updateTabindex();
        updateClass();
      }
    );
  }

  function onShow() {
    stateFunc.setState(true);
    helperFunc.stateCallback(
      stateFunc.getState(),
      () => {
        updateTabindex();
        updateClass();
        initialState();
      },
      () => {}
    );
  }

  return {
    getSubmitForm,
    getInputField,
    onError,
    onHide,
    onShow,
    getState,
  };
}

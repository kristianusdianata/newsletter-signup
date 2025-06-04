import { helper } from "./helper.js";
import { cardState } from "./handler/index.js";

export function successCard() {
  const sucessCard = document.querySelector(".success");
  const successButton = sucessCard.querySelector(".success__button");
  const validatedEmailLabel = sucessCard.querySelector(".success__desc b");

  const focusableElement = [successButton];
  const activeClass = "is-active";

  const helperFunc = helper();
  const stateFunc = cardState();

  stateFunc.setState(false); // default state

  function getConfirmButton() {
    return successButton;
  }

  function initialState() {
    validatedEmailLabel.innerHTML = "";
  }

  function updateClass() {
    helperFunc.stateCallback(
      stateFunc.getState(),
      () => {
        helperFunc.updateClass(
          sucessCard,
          activeClass,
          () => {},
          () => sucessCard.classList.add(activeClass)
        );
      },
      () => {
        helperFunc.updateClass(
          sucessCard,
          activeClass,
          () => sucessCard.classList.remove(activeClass),
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

  function onHide() {
    stateFunc.setState(false);
    stateFunc.setEmail("");
    helperFunc.stateCallback(
      stateFunc.getState(),
      () => {},
      () => {
        updateTabindex();
        updateClass();
      }
    );
  }

  function onShow(validatedEmail) {
    stateFunc.setState(true);
    stateFunc.setEmail(validatedEmail);
    helperFunc.stateCallback(
      stateFunc.getState(),
      () => {
        updateTabindex();
        updateClass();
        initialState();
        validatedEmailLabel.innerHTML = stateFunc.getEmail();
      },
      () => {}
    );
  }

  return {
    getConfirmButton,
    onShow,
    onHide,
  };
}

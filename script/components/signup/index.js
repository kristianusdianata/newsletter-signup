import { handler } from "./handler.js";
import { ui } from "./ui.js";
import { state } from "./state.js";
import { main as carousel } from "../carousel/index.js";

export function main() {
  const carouselItem = document.querySelector(".carousel__item#signup");
  const signupCard = document.querySelector(".signup");
  const form = signupCard.querySelector(".signup__form");
  const inputForm = form.querySelector(".signup__form-input");
  const errorLabel = form.querySelector(".signup__form-error");

  const stateFunc = state();
  const handlerFunc = handler();
  const uiFunc = ui();
  const carouselFunc = carousel();

  function mutateElement(errMsg = "") {
    const carouselItem_ = uiFunc.carouselItem(carouselItem);
    const inputForm_ = uiFunc.inputForm(inputForm);
    const errorLabel_ = uiFunc.errorLabel(errorLabel, errMsg);

    stateFunc.isActiveCallback(
      () => {
        carouselItem_.onActiveTrue();
      },
      () => {
        carouselItem_.onActiveFalse();
      }
    );

    stateFunc.isErrorCallback(
      () => {
        inputForm_.onErrorTrue();
        errorLabel_.onErrorTrue();
      },
      () => {
        inputForm_.onErrorFalse();
        errorLabel_.onErrorFalse();
      }
    );
  }

  function onShow() {
    stateFunc.setActiveState(true);
    stateFunc.setErrorState(false);
    mutateElement();
  }

  async function onHide(email, callbackSuccess) {
    stateFunc.setActiveState(false);
    stateFunc.setErrorState(false);
    mutateElement();

    callbackSuccess(email);
    await carouselFunc.slideToIndex(1);
  }

  function onSubmit(callbackSuccess) {
    const onSuccessCallback = async (response) => {
      await onHide(response, callbackSuccess);
    };

    const onErrorCallback = (errMsg) => {
      stateFunc.setErrorState(true);
      mutateElement(errMsg);
    };

    const onSubmitCallback = (e) => {
      e.preventDefault();
      stateFunc.isActiveCallback(
        async () => {
          const email = inputForm.value.toString().replace(/\s+/g, "");
          await handlerFunc.onSubmitHandler(
            email,
            onSuccessCallback,
            onErrorCallback
          );
        },
        () => {}
      );
    };

    form.addEventListener("submit", onSubmitCallback);
  }

  return {
    onShow,
    onSubmit,
  };
}

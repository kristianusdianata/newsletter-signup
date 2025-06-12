import { state } from "./state.js";
import { ui } from "./ui.js";
import { main as carousel } from "../carousel/index.js";

export function main() {
  const carouselItem = document.querySelector(".carousel__item#success");
  const sucessCard = document.querySelector(".success");
  const confirmButton = sucessCard.querySelector(".success__button");
  const emailLabel = sucessCard.querySelector(".success__desc b");

  const carouselFunc = carousel();
  const stateFunc = state();
  const uiFunc = ui();

  function mutateElement() {
    const email = stateFunc.getEmail();
    const carouselItem_ = uiFunc.carouselItem(carouselItem);
    const emailLabel_ = uiFunc.labelEmail(emailLabel, email);

    stateFunc.isActiveCallback(
      () => {
        carouselItem_.onActiveTrue();
        emailLabel_.onActiveTrue();
      },
      () => {
        carouselItem_.onActiveFalse();
        emailLabel_.onActiveFalse();
      }
    );
  }

  function onShow(validatedEmail) {
    stateFunc.setActiveState(true);
    stateFunc.setEmail(validatedEmail);
    mutateElement();
  }

  async function onHide(callbackSignup) {
    stateFunc.setActiveState(false);
    stateFunc.setEmail("");
    mutateElement();

    callbackSignup();
    await carouselFunc.slideToIndex(0);
  }

  function onConfirm(callbackSignup) {
    const onConfirmCallback = (e) => {
      e.preventDefault();

      stateFunc.isActiveCallback(
        async () => {
          await onHide(callbackSignup);
        },
        () => {}
      );
    };

    confirmButton.addEventListener("click", onConfirmCallback);
  }

  return {
    onConfirm,
    onShow,
  };
}

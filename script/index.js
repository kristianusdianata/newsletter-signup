import { signupCard, successCard } from "./components/index.js";

function main() {
  const singupCardComponent = signupCard();
  const successCardComponent = successCard();

  function signupOnSubmit() {
    singupCardComponent.onSubmit(successCardComponent.onShow);
  }

  function successCardOnConfirm() {
    successCardComponent.onConfirm(singupCardComponent.onShow);
  }

  return {
    signupOnSubmit,
    successCardOnConfirm,
  };
}

const signupPage = main();
signupPage.signupOnSubmit();
signupPage.successCardOnConfirm();

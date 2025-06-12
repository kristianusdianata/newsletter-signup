import { signup, success } from "./components/index.js";

function main() {
  const singupCard = signup();
  const successCard = success();

  function signupOnSubmit() {
    singupCard.onSubmit(successCard.onShow);
  }

  function successCardOnConfirm() {
    successCard.onConfirm(singupCard.onShow);
  }

  return {
    signupOnSubmit,
    successCardOnConfirm,
  };
}

const page = main();
page.signupOnSubmit();
page.successCardOnConfirm();

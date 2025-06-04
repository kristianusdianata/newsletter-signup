import { carousel, validation } from "./handler/index.js";
import { signupCard } from "./signupCard.js";
import { successCard } from "./successCard.js";
import { helper } from "./helper.js";

function main() {
  const mySignupCard = signupCard();
  const mySuccessCard = successCard();
  const myCarousel = carousel();
  const myHelper = helper();
  const myValidate = validation();

  const signupForm = mySignupCard.getSubmitForm();
  const signupInputField = mySignupCard.getInputField();
  const successConfirmBUtton = mySuccessCard.getConfirmButton();

  function onSignupSubmit() {
    signupForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = signupInputField.value.toString().replace(/\s+/g, "");

      try {
        const response = await myHelper.asyncCallback((resolve, reject) => {
          myValidate.email(
            email,
            (validatedEmail) => resolve(validatedEmail),
            (message) => reject(message)
          );
        });

        mySignupCard.onHide();
        mySuccessCard.onShow(response);
        await myCarousel.slideToIndex(1);
      } catch (errorMsg) {
        mySignupCard.onError(errorMsg, email);
      }
    });
  }

  function onSuccessConfirm() {
    successConfirmBUtton.addEventListener("click", async function (e) {
      e.preventDefault();
      mySuccessCard.onHide();
      mySignupCard.onShow();
      await myCarousel.slideToIndex(0);
    });
  }

  return {
    onSignupSubmit,
    onSuccessConfirm,
  };
}

const myMain = main();
myMain.onSignupSubmit();
myMain.onSuccessConfirm();

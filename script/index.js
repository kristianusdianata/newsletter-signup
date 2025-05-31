import { carousel, validation } from "./handler/index.js";

function myCard() {
  const signup_card = document.querySelector(".card-signup");
  const signup_form = signup_card.querySelector(".card-signup__body .form");
  const signup_input_field = signup_form.querySelector(".form__input-field");
  const signup_error_label = signup_form.querySelector(".form__input-error");

  const notification_card = document.querySelector(".card-notification");
  const notfication_confirm_button = notification_card.querySelector(
    ".button[type=button]"
  );
  const validated_email_label = notification_card.querySelector("header p b");

  const carouselCard = carousel();
  const validate = validation();

  function initialState() {
    signup_error_label.innerHTML = "";
    if (signup_input_field.classList.contains("input--danger")) {
      signup_input_field.classList.remove("input--danger");
    }
    signup_input_field.value = "";
    validated_email_label.innerHTML = "";
  }

  function validateAsync(email) {
    return new Promise((resolve, reject) => {
      validate.email(
        email,
        (validatedEmail) => resolve(validatedEmail),
        (message) => reject(message)
      );
    });
  }

  function onSubmitForm() {
    signup_form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = signup_input_field.value;

      try {
        const response = await validateAsync(
          email.toString().replace(/\s+/g, "")
        );

        initialState();
        validated_email_label.innerHTML = response;
        await carouselCard.slideToIndex(1);
      } catch (errorMsg) {
        initialState();
        signup_input_field.classList.add("input--danger");
        signup_input_field.value = email;
        signup_error_label.innerHTML = errorMsg;
      }
    });
  }

  function onNotificationConfirm() {
    notfication_confirm_button.addEventListener("click", async function (e) {
      e.preventDefault();
      initialState();
      await carouselCard.slideToIndex(0);
    });
  }
  return {
    onSubmitForm,
    onNotificationConfirm,
  };
}

const card = myCard();
card.onSubmitForm();
card.onNotificationConfirm();

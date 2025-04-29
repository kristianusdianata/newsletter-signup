/**
 * ----------------------------------------------------
 * Global variables
 * ----------------------------------------------------
 */
let form = null;
let button_dismiss = null;
let card_section = null;
let card_wrapper = null;
let notif_section = null;
let notif_wrapper = null;
let input_email = null;
let error_message = null;
const undefined_message = "Please enter your email address";
const invalid_message = "Valid email required";

/**
 * ----------------------------------------------------
 * Helper function
 * ----------------------------------------------------
 */
function isValidEmail(email) {
  const emailRegex =
    /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}

/** ------------- State function ------------- */
function setErrorState(message) {
  input_email.classList.add("danger__input"); // add error class on input field
  error_message.innerText = message; // set error message
  input_email.focus();
}

function resetErrorState() {
  input_email.classList.remove("danger__input"); // remove error class on input field
  error_message.innerText = "";
}

function showSuccessNotif() {
  card_wrapper.classList.remove("active");
  notif_wrapper.classList.add("active");
}

function setDefaultState() {
  card_wrapper.classList.add("active");
  notif_wrapper.classList.remove("active");
  input_email.value = "";
  resetErrorState();
}
/** ------------- State function end ------------- */

/** ------------- Transition function ------------- */
function defaultTransition() {
  // ------ remove all transition class on card section ------
  const cardSectionTransition = Array.from(card_section.classList).find(
    (className) => className.startsWith("slide--")
  );

  if (cardSectionTransition) {
    card_section.classList.remove(cardSectionTransition);
  }

  // ------ add default transition class to card section ------
  card_section.classList.add("slide--to-center");

  // ------ remove all transition class on notification section ------
  const notifSectionTransition = Array.from(notif_section.classList).find(
    (className) => className.startsWith("slide--")
  );

  if (notifSectionTransition) {
    notif_section.classList.remove(notifSectionTransition);
  }

  // ------ add default transition class to  notification section ------
  notif_section.classList.add("slide--to-right");
}

function setOnSuccessTransition() {
  // remove default card-content transition
  if (card_section.classList.contains("slide--to-center")) {
    card_section.classList.remove("slide--to-center");
  }
  card_section.classList.add("slide--to-left"); // add new transition class

  // remove default notification-content transition
  if (notif_section.classList.contains("slide--to-right")) {
    notif_section.classList.remove("slide--to-right");
  }
  notif_section.classList.add("slide--to-center"); // add new transition class
}
/** ------------- Transition function end ------------- */

function validationInput(input) {
  const newInput = input.replace(/\s+/g, ""); // remove spaces from input

  if (!newInput) {
    setErrorState(undefined_message); // Do something if input is undefined
  } else if (isValidEmail(newInput)) {
    // Do something if validation success
    showSuccessNotif();
    setOnSuccessTransition();
  } else {
    setErrorState(invalid_message); // Do something if validation falied
  }
}

/**
 * ----------------------------------------------------
 * Setup function
 * ----------------------------------------------------
 */
function handleValidation() {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = input_email.value;
    validationInput(email);
  });
}

function handleResetError() {
  input_email.addEventListener("input", function (e) {
    resetErrorState();
  });
}

function handleDismissNotif() {
  button_dismiss.addEventListener("click", function (e) {
    e.preventDefault();
    setDefaultState();
    defaultTransition();
  });
}

/**
 * ----------------------------------------------------
 * Invoke function
 * ----------------------------------------------------
 */
function init() {
  form = document.querySelector("form");
  button_dismiss = document.querySelector(".notification .dismiss__button");
  card_section = document.querySelector("section#card__content");
  card_wrapper = document.querySelector("section#card__content .card__wrapper");
  notif_section = document.querySelector("section#notification__content");
  notif_wrapper = document.querySelector(
    "section#notification__content .notification__wrapper"
  );
  input_email = document.querySelector("form .email__input");
  error_message = document.querySelector("form .error-message");

  if (
    !form &&
    !button_dismiss &&
    !card_section &&
    !card_wrapper &&
    !notif_section &&
    !notif_wrapper &&
    !input_email &&
    !error_message
  )
    return;

  handleValidation();
  handleResetError();
  handleDismissNotif();
}

init();

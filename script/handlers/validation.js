import { error } from "./error.js";

export function validation() {
  const validate = error();
  let errMsg = "";

  function initialState() {
    validate.isError(false);
    errMsg = "";
  }

  function email(email, onSuccessCallback, onErrorCallback) {
    initialState();
    const emailRegex =
      /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

    if (email) {
      const isValid = emailRegex.test(email);
      errMsg = isValid ? "" : "Valid email required";
    } else {
      errMsg = "Please enter your email address";
    }

    if (errMsg) {
      validate.isError(true);
      if (onErrorCallback) validate.errorHandler(errMsg, onErrorCallback);
      else {
        validate.isError(false);
        console.error("onErrorCallback is missing");
      }
    } else {
      if (onSuccessCallback) onSuccessCallback(email);
    }
  }

  return { email };
}

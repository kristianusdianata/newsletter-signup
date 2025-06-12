import { validation } from "../../handlers/index.js";
import { helper } from "../../helper.js";

export function handler() {
  const validateFunc = validation();
  const helperFunc = helper();

  async function onSubmitHandler(email, onSuccessCallback, onErrorCallback) {
    try {
      const response = await helperFunc.asyncCallback((resolve, reject) => {
        validateFunc.email(
          email,
          (validatedEmail) => resolve(validatedEmail),
          (message) => reject(message)
        );
      });

      onSuccessCallback(response);
    } catch (errorMsg) {
      onErrorCallback(errorMsg);
    }
  }

  return {
    onSubmitHandler,
  };
}

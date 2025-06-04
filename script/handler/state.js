export function cardState() {
  let state = false;
  let email = "";

  function getState() {
    return state;
  }

  function setState(newState) {
    state = newState;
  }

  function getEmail() {
    return email;
  }

  function setEmail(validatedEmail) {
    email = validatedEmail;
  }

  return {
    getState,
    setState,
    getEmail,
    setEmail,
  };
}

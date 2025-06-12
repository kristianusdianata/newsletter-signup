export function state() {
  let isActive = false;
  let email = "";

  function getActiveState() {
    return isActive;
  }
  function getEmail() {
    return email;
  }

  function setActiveState(newState) {
    isActive = newState;
  }
  function setEmail(newEmail) {
    email = newEmail;
  }

  function isActiveCallback(onTrueCallback, onFalseCallback) {
    let screenIsActive = false;

    if (isActive && email) screenIsActive = true;
    else if (!isActive && !email) screenIsActive = false;

    if (screenIsActive && onTrueCallback) onTrueCallback();
    else if (!screenIsActive && onFalseCallback) onFalseCallback();
  }

  return {
    getActiveState,
    getEmail,
    setActiveState,
    setEmail,
    isActiveCallback,
  };
}

export function state() {
  let isError = false;
  let isActive = true;

  function getActiveState() {
    return isActive;
  }
  function getErrorState() {
    return isError;
  }

  function setActiveState(newState) {
    isActive = newState;
  }
  function setErrorState(newState) {
    isError = newState;
  }

  function isActiveCallback(onTrueCallback, onFalseCallback) {
    if (isActive && onTrueCallback) onTrueCallback();
    else if (!isActive && onFalseCallback) onFalseCallback();
  }

  function isErrorCallback(onTrueCallback, onFalseCallback) {
    if (!isActive) return;

    if (isError && onTrueCallback) onTrueCallback();
    else if (!isError && onFalseCallback) onFalseCallback();
  }

  return {
    getActiveState,
    getErrorState,
    setActiveState,
    setErrorState,
    isErrorCallback,
    isActiveCallback,
  };
}

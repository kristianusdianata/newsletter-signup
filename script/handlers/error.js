export function error() {
  let state = false;

  function getState() {
    return state;
  }

  function isError(newstate) {
    state = newstate;
  }

  function errorHandler(errMsg, callback) {
    if (state && callback) {
      callback(errMsg);
    }
  }

  return { isError, errorHandler, getState };
}

export function helper() {
  function stateCallback(state, onTrueState, onFalseState) {
    if (state && onTrueState) onTrueState();
    else if (!state && onFalseState) onFalseState();
  }

  function asyncCallback(callback) {
    return new Promise((resolve, reject) => {
      callback(resolve, reject);
    });
  }

  function updateAttribute(element, attribute, callback) {
    if (
      element &&
      attribute &&
      callback &&
      element.hasAttribute(`${attribute}`)
    ) {
      callback();
    }
  }

  function updateClass(element, targetClass, onRemove, onAdd) {
    if (element && onRemove && element.classList.contains(targetClass)) {
      onRemove();
    } else if (element && onAdd && !element.classList.contains(targetClass)) {
      onAdd();
    }
  }

  return {
    updateAttribute,
    updateClass,
    stateCallback,
    asyncCallback,
  };
}

export function helper() {
  function asyncCallback(callback) {
    return new Promise((resolve, reject) => {
      callback(resolve, reject);
    });
  }

  function updateAttribute(
    element,
    attribute,
    onRemoveCallback,
    onCreateCallback
  ) {
    if (element && attribute) {
      if (onRemoveCallback && element.hasAttribute(`${attribute}`)) {
        onRemoveCallback();
      } else if (onCreateCallback && !element.hasAttribute(`${attribute}`)) {
        onCreateCallback();
      }
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
    asyncCallback,
  };
}

export function helper() {
  function asyncCallback(callback) {
    return new Promise((resolve, reject) => {
      callback(resolve, reject);
    });
  }

  return {
    asyncCallback,
  };
}

const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      console.log(store);
    },
  };
}());

global.localStorage = localStorageMock();

it('sets data into local storage', () => {
  const jsonId = '222';
  const newJson = "{ data: 'json data' }";
  window.localStorage.setItem(jsonId, newJson);
  expect(localStorage.getItem(jsonId)).toEqual(
    JSON.stringify(newJson),
  );
});
it('has data in local storage', () => {
  const jsonId = '123';
  const newJson = { data: 'json data' };
  window.localStorage.setItem(jsonId, JSON.stringify(newJson));
  // run function
});

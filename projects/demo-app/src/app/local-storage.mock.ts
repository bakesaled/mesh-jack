let store = {};
export const mockLocalStorage = {
  getItem: (key: string): string => {
    return store[key];
  },
  setItem: (key: string, value: string) => {
    store[key] = `${value}`;
  },
  removeItem: (key: string) => {
    delete store[key];
  },
  clear: () => {
    store = {};
  }
};

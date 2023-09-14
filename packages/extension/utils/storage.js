export function Localstorage() {
  return {
    setItem: (key, value) => {
      return new Promise((resolve) => {
        chrome.storage.local.set({ [key]: value }, () => {
          if (chrome.runtime.lastError) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    },
    getItem: (key) => {
      return new Promise((resolve) => {
        chrome.storage.local.get([key], (result) => {
          if (chrome.runtime.lastError || !result[key]) {
            resolve(null);
          } else {
            resolve(result[key]);
          }
        });
      });
    },
    removeItem: (key) => {
      return new Promise((resolve) => {
        chrome.storage.local.remove(key, () => {
          if (chrome.runtime.lastError) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    },
  };
}

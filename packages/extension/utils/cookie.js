export function Cookies() {
  return {
    get: (name, url) => {
      return new Promise((resolve) => {
        chrome.cookies.get({ name, url }, (cookie) => {
          resolve(cookie);
        });
      });
    },
    getAll: (url) => {
      return new Promise((resolve) => {
        chrome.cookies.getAll({ url }, (cookies) => {
          resolve(cookies);
        });
      });
    },
    set: (cookie) => {
      return new Promise((resolve) => {
        chrome.cookies.set(cookie, (result) => {
          resolve(result);
        });
      });
    },
    remove: (name, url) => {
      return new Promise((resolve) => {
        chrome.cookies.remove({ name, url }, (details) => {
          resolve(details);
        });
      });
    },
  };
}

// extract sessionId from localstorage
var nocredSessionId = localStorage.getItem("@nocred_ext");

setTimeout(() => {
  // send sessionId to background script
  if (nocredSessionId !== null) {
    chrome.runtime.sendMessage({ sessionId: nocredSessionId }, () => {
      console.log("[NOCRED EVENT FIRED]");
    });
  }
}, 500);

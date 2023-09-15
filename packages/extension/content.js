// extract sessionId from localstorage
var nocredSessionId = localStorage.getItem("@nocred_ext");

if (nocredSessionId !== null) {
  // send sessionId to background.js script
  chrome.runtime.sendMessage({ sessionId: nocredSessionId }, () => {
    console.log("[NOCRED EVENT FIRED]");
    localStorage.removeItem("@nocred_ext");
    console.log("NOCRED EXT CLEARED");
  });
}

import { Cookies } from "./utils/cookie.js";
import { Localstorage } from "./utils/storage.js";

const storage = Localstorage();

// run this script in background
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    if (tab.url?.startsWith("chrome://")) return undefined;
    // execute content script
    executeScript(activeInfo?.tabId);
    saveExtId(tab.url);
  });
});

// listen for event from content.js file
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.sessionId !== null && message.sessionId.length > 0) {
    const url = "https://elearn.nou.edu.ng";
    handleCookiesInjecttion(url, message.sessionId);
  }
});

// execute content.js file on tab change.
function executeScript(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ["content.js"],
  });
}

// store a key in cookies to detect if user has extention installed or not
// this function wont execute if user hasn't installed the extention

async function saveExtId(url) {
  const cookieDetails = {
    url: url,
    name: "Nocred_Ext_Installed",
    value: "true",
    path: "/",
  };
  const cookie = Cookies();
  await cookie.set(cookieDetails);
}

// ! Remember to work on removing the cookie first before invoking handleCookieInjection

async function handleCookiesInjecttion(url, sessionId) {
  const cookies = Cookies();
  const key = "MoodleSession";
  const nounSessionCookie = await cookies.get(key, url);
  const domain = nounSessionCookie?.domain.replace(/^\./, "");

  //   check if cookie has been saved previously.
  const hasCookieSaved = await storage.getItem(sessionId);

  if (hasCookieSaved !== null) {
    await storage.removeItem(sessionId);
    console.log(`[COOKIE CLEARED]:${sessionId}`);
    return;
  }

  console.log(nounSessionCookie, url, domain);

  await cookies.remove(key, url);

  setTimeout(async () => {
    await cookies.set({
      url,
      name: key,
      value: sessionId,
      domain,
      secure: true,
      sameSite: "unspecified",
    });
    console.log("NOUN COOKIE MODIFIED");

    await storage.setItem(sessionId, sessionId);
    console.log(`[NEW COOKIE SAVED]:${sessionId}`);
  }, 3000);
}

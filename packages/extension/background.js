import { Cookies } from "./utils/cookie.js";
import { sleep } from "./utils/index.js";
import { Localstorage } from "./utils/storage.js";

const storage = Localstorage();
const cookies = Cookies();

// run this script in background
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    if (tab.url?.startsWith("chrome://")) return undefined;
    // execute content script
    // executeScript(activeInfo?.tabId);
    saveExtId(tab.url);
  });
});

// listen for event from content.js file
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.sessionId !== null && message.sessionId.length > 0) {
    const url = "https://elearn.nou.edu.ng";
    await cookies.remove("MoodleSession", url);
    handleCookiesInjecttion(url, message.sessionId);

    // only re-execute content.js script when an event is triggered from the file.
    executeScript(sender?.tab?.id);
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

async function handleCookiesInjecttion(url, sessionId) {
  const key = "MoodleSession";
  const nounSessionCookie = await cookies.get(key, url);
  const domain = nounSessionCookie?.domain.replace(/^\./, "");

  await cookies.set({
    url,
    name: key,
    value: sessionId,
    domain,
    secure: true,
    sameSite: "unspecified",
  });
  console.log("NOUN COOKIE MODIFIED");
}

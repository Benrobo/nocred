import { Cookies } from "./utils/cookie.js";
import { Localstorage } from "./utils/storage.js";

// run this script in background
chrome.tabs.onActivated.addListener(function (activeInfo) {
  // how to fetch tab url using activeInfo.tabid
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    const { hostname } = new URL(tab.url);
    const validHostNames = ["elearn.nou.edu.ng"];
    if (validHostNames.includes(hostname)) {
      handleCookiesInjecttion(tab.url);
    }

    saveExtId(tab.url);
  });
});

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

async function handleCookiesInjecttion(url) {
  const cookies = Cookies();
  const storage = Localstorage();
  const key = "MoodleSession";
  const nounSessionCookie = await cookies.get(key, url);

  // check storage if userId exists, if it does this means user has generated one
  // this would prevent modifying loggedIn user sesssion with another user session (if the user hasn't generate a nocred url)
  const data = await storage.getItem(key);
  console.log(data, nounSessionCookie.domain);
  if (data !== null) {
    // modify cookie
    // await cookies.remove(key, url);
    await cookies.set({
      url,
      name: key,
      value: data,
      domain: nounSessionCookie.domain.startWith(".")
        ? nounSessionCookie.domain.slice(1)
        : nounSessionCookie.domain,
      secure: true,
    });
    await storage.removeItem(key);
    console.log("NOUN COOKIE MODIFIED");
  }
}

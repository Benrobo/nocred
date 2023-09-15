import { Localstorage } from "./utils/storage.js";

const $ = (elem) => document.querySelector(elem);
const $all = (elem) => document.querySelectorAll(elem);
const len = (arr) => arr.length;

const createTab = $(".create-tab");
const linksTab = $(".links-tab");
const navItems = $all(".nav-item");
const createTabContents = $(".create-main-cont");
// const linksTabContents = $(".link-main-cont");
const pageStatusIcon = $(".page-status-icon");
const pageStatusMsg = $(".page-status-msg");
const tabDomain = $(".domain-text");
const domainEmoji = $(".domain-emoji");
const pageStatusEmoji = $(".page-status-emoji");
const expiryCont = $(".expiry-cont");
const createCont = $(".create-cont");
const createLinkBtn = $(".create-button");
const expiryRadioInp = $all(".expiry-inp");
const nocredUrlCont = $(".nocred-url-cont");
const nocredUrlInp = $(".nocred-url-inp");
const nocredCopyBtn = $(".nocred-copy-btn");
const alertCont = $(".alert-cont");
const alertContMsg = $(".alert-cont-msg");

// backend api url
// const API_URL = `http://localhost:3000/api`;
// const CLIENT_URL = `http://localhost:3000`;

const API_URL = `https://nocred.vercel.app/api`;
const CLIENT_URL = `https://nocred.vercel.app`;

const storage = Localstorage();

// expiry values
let linkExpiration = "1day";
let sessionId = null;
let nocredUrl = null;

window.addEventListener("load", async () => {
  const tabInfo = await getActiveTabInfo();
  renderActiveTabStatus(tabInfo.data);
});

// handle tab switching (would work on this later)
// navItems.forEach((tab) => {
//   tab.onclick = () => setActiveTab(tab);
// });

// handle creating link
createLinkBtn.onclick = () => createNocredLink();

// copy link to clipboard
nocredCopyBtn.onclick = async () => {
  const link = nocredUrlInp.value;
  await navigator.clipboard.writeText(link);
  renderAlertMessage("Link copied to clipboard", true);
};

// handle expiration
expiryRadioInp.forEach((inp) => {
  inp.addEventListener("change", (e) => {
    linkExpiration = e.target.value;
  });
});

function setActiveTab(tab) {
  navItems.forEach((item) => {
    const itemSpan = item.querySelector("span");
    itemSpan.classList.toggle("active", item === tab);
  });

  if (createTabContents.classList.contains("hide")) {
    createTabContents.classList.remove("hide");
    createTabContents.classList.add("show");
    // linksTabContents.classList.add("hide");
    // linksTabContents.classList.remove("show");
  } else {
    // linksTabContents.classList.remove("hide");
    // linksTabContents.classList.add("show");
    createTabContents.classList.add("hide");
    createTabContents.classList.remove("show");
  }
}

// extract noun loggedIn user elearn cookie from browser
function getActiveTabInfo() {
  return new Promise((resolve, reject) => {
    // Get the currently active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (!tabs || tabs.length === 0) {
        reject("No active tab found");
        return;
      }

      const tabId = tabs[0].id;
      const faviconUrl = tabs[0].favIconUrl;
      const url = tabs[0].url;

      // Use the URL to fetch cookies
      chrome.cookies.getAll({ url: url }, function (cookies) {
        const info = {
          data: {
            url: url,
            icon: faviconUrl,
            tabId: tabId,
            cookies: [],
            domain: "",
          },
        };

        if (cookies.length > 0) {
          cookies.forEach((data) => {
            info.data.cookies.push({
              name: data.name,
              path: data.path,
              value: data.value,
            });
            info.data.domain = data.domain;
          });
        } else {
          info.data = null;
        }

        resolve(info);
      });
    });
  });
}

// render active tab status
function statusMsg(msg, dEmoji, pEmoji, success) {
  if (success === false) {
    pageStatusIcon.classList.add("invalid");
    pageStatusIcon.classList.remove("valid");
    pageStatusMsg.innerHTML = msg;
    domainEmoji.innerHTML = `${dEmoji}`;
    pageStatusEmoji.innerHTML = `${pEmoji}`;
    expiryCont.classList.add("invalid");
    createLinkBtn.classList.add("invalid");
    createLinkBtn.setAttribute("disabled", true);
  } else {
    pageStatusIcon.classList.add("valid");
    pageStatusIcon.classList.remove("invalid");
    pageStatusMsg.innerHTML = msg;
    domainEmoji.innerHTML = `${dEmoji}`;
    pageStatusEmoji.innerHTML = `${pEmoji}`;
    expiryCont.classList.remove("invalid");
    createLinkBtn.classList.remove("invalid");
    createLinkBtn.removeAttribute("disabled");
  }
}

async function renderActiveTabStatus(data) {
  // console.log({ data });

  // If the active tab is not 'elearn.nou.edu'
  if (
    data === null ||
    typeof data?.url === "undefined" ||
    data?.url?.length === 0
  ) {
    statusMsg("Current tab domain isn't supported!.", "⚠️", "😔", false);
    return;
  }

  // If the active tab is 'elearn.nou.edu' or has defined cookies
  if (
    data !== null &&
    typeof data?.cookies !== "undefined" &&
    data?.cookies?.length > 0
  ) {
    // if logged in, check if "MoodleSession & MOODLEID1_" is available
    // If user isn't loggedin MOODLEID1_ won't be available.
    const cookies = data?.cookies;
    const cookiesLen = len(data?.cookies);
    const moduleIdExists = cookies.find((d) => d.name === "MOODLEID1_");
    const sessionIdExists = cookies.find((d) => d.name === "MoodleSession");

    // console.log(cookies, cookiesLen, moduleIdExists);

    if (
      cookiesLen.length === 1 ||
      typeof moduleIdExists === "undefined" ||
      typeof sessionIdExists === "undefined"
    ) {
      statusMsg("You must be logged in to continue.", "⚠️", "🔐", false);
      return;
    }

    sessionId = sessionIdExists?.value;
    statusMsg("You're all set.", "✅", "🎉", true);
  }
  // it not 'elearn.nou.edu' and user isn't loggedIn
  if (data === null || typeof data.cookies === "undefined") {
    statusMsg("Current tab domain isn't supported!.", "⚠️", "😔", false);
  }
}

// render alert message
function renderAlertMessage(msg, success) {
  if (success) {
    alertCont.classList.remove("hide", "error");
    alertCont.classList.add("show", "success");
    alertContMsg.innerHTML = msg;
  } else {
    alertCont.classList.remove("hide", "success");
    alertCont.classList.add("error", "show");
    alertContMsg.innerHTML = msg;
  }
}

// interval to remove alert
setInterval(() => {
  if (alertCont.classList.contains("show")) {
    setTimeout(() => {
      alertCont.classList.remove("show", "success", "error");
      alertCont.classList.add("hide");
      console.log("ALERT REMOVED FROM DOM.");
    }, 5000);
  }
}, 2000);

// handle creating of link
async function createNocredLink() {
  // VALIDATE
  if (sessionId === null) {
    renderAlertMessage("Not logged in", false);
    return;
  }
  // generate userId first
  const storedId = await storage.getItem("@userId");
  let userId = null;

  if (storedId === null) {
    userId = uuid(12);
    await storage.setItem("@userId", userId);
  } else {
    userId = storedId;
  }

  try {
    createLinkBtn.innerHTML = `
    <span class="spinner-border text-dark" role="status"></span>
    `;
    createLinkBtn.setAttribute("disabled", true);
    const res = await fetch(`${API_URL}/url/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        expiration: {
          date: new Date().toISOString(),
          exp: linkExpiration,
        },
        sessionId,
      }),
    });
    const data = await res.json();
    createLinkBtn.removeAttribute("disabled");

    if (data?.errorStatus) {
      renderAlertMessage(data.message, false);
    } else {
      renderAlertMessage(data.message, true);
      nocredUrl = `${CLIENT_URL}/${data?.data?.url_Id}`;

      // hide the component necessary for creating link
      expiryCont.classList.remove("show");
      expiryCont.classList.add("hide");
      createCont.classList.remove("show");
      createCont.classList.add("hide");

      // show the copy link component
      nocredUrlCont.classList.remove("hide");
      nocredUrlCont.classList.add("show");
      nocredUrlInp.value = nocredUrl;
    }

    createLinkBtn.innerHTML = `Create URL`;
  } catch (e) {
    createLinkBtn.removeAttribute("disabled");
    console.log(`ERROR creating link: ${e.message}`);
    createLinkBtn.innerHTML = `Create URL`;
    renderAlertMessage(e.message, false);
  }
}

function uuid(len = 10) {
  let id = "";
  let char = "1234567890abcdefghi".split("");
  for (let i = 0; i <= len; i++) {
    const rand = Math.floor(Math.random() * char.length);
    id += char[rand];
  }
  return id;
}

/**
 * 
  {
    "url": "https://elearn.nou.edu.ng/my/",
    "icon": "https://elearn.nou.edu.ng/pluginfile.php/1/theme_catawesome/favicon/1693817408/favicon%281%29.ico",
    "tabId": 1474343042,
    "cookies": [
        {
            "name": "MoodleSession",
            "path": "/",
            "value": "74a6096d1dd1e7f70ce8c915e6995246"
        },
        {
            "name": "MOODLEID1_",
            "path": "/",
            "value": "%2584%25A1%2513%25A4q%2516.%25A7%25C3%25C7%25B3%2591"
        }
    ],
    "domain": "elearn.nou.edu.ng"
}
 */

const $ = (elem) => document.querySelector(elem);
const $all = (elem) => document.querySelectorAll(elem);

const createTab = $(".create-tab");
const linksTab = $(".links-tab");
const navItems = $all(".nav-item");

const createTabContents = $(".create-main-cont");
const linksTabContents = $(".link-main-cont");

// handle tab switching
navItems.forEach((tab) => {
  tab.onclick = () => setActiveTab(tab);
});

function setActiveTab(tab) {
  const spanElem = tab.querySelector("span");
  navItems.forEach((item) => {
    const itemSpan = item.querySelector("span");
    itemSpan.classList.toggle("active", item === tab);
  });

  if (createTabContents.classList.contains("hide")) {
    createTabContents.classList.remove("hide");
    createTabContents.classList.add("show");
    linksTabContents.classList.add("hide");
    linksTabContents.classList.remove("show");
  } else {
    linksTabContents.classList.remove("hide");
    linksTabContents.classList.add("show");
    createTabContents.classList.add("hide");
    createTabContents.classList.remove("show");
  }
}

function getActiveTabInfo() {
  // Get the currently active tab
  let info = {
    data: {
      url: "",
      icon: "",
      tabId: "",
      cookies: [],
      domain: "",
    },
  };
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Get the URL of the current tab
    const tabId = tabs[0].id;
    const faviconUrl = tabs[0].favIconUrl;
    const url = tabs[0].url;

    // Use the URL to fetch cookies
    chrome.cookies.getAll({ url: url }, function (cookies) {
      console.log({ cookies }); // Cookies for the current tab
      console.log(tabs);
      if (cookies.length > 0) {
        cookies.forEach((data) => {
          info.data.cookies.push({
            name: data.name,
            path: data.path,
            value: data.value,
          });
          info.data.domain = data.domain;
        });
        info.data.url = url;
        info.data.icon = faviconUrl;
        info.data.tabId = tabId;
      } else {
        info.data = null;
      }
    });
  });
  return info;
}

// console.log(createTab);

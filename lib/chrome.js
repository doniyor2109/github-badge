import browser from 'webextension-polyfill';

export function listenTabChanges(callback) {
  chrome.tabs.onUpdated.addListener((tabId, info) => {
    callback(tabId, info);
  });
}

export function sendMessageToTab(tabId, message) {
  return browser.tabs.sendMessage(tabId, message);
}

export function getGithubTabs() {
  return browser.tabs.query({ url: 'https://github.com/*' });
}

export function getActiveTab() {
  return browser.tabs.query({ active: true }).then(function(tabs) {
    return tabs[0];
  });
}

export function sendExtensionMessage(message) {
  return chrome.runtime.sendMessage(message);
}

export function onRuntimeMessage(callback) {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      callback(request, sender, sendResponse);
    });
}

export function sendMessageToAllTabs(message) {
  getGithubTabs().then(function(tabs) {
    tabs.forEach(function(tab) {
      sendMessageToTab(tab.id, message);
    });
  });
}

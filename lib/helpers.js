import browser from 'webextension-polyfill';

export function listenTabChanges(callback) {
  chrome.tabs.onUpdated.addListener((tabId, info) => {
    callback(tabId, info);
  });
}

export function sendMessageToTab(tabId, message) {
  return browser.tabs.sendMessage(tabId, message);
}

export function getGithubTabs(callback) {
  chrome.tabs.query({ url: 'https://github.com/*' }, callback);
}

export function getActiveTab() {
  return browser.tabs.query({ active: true }).then(function(tabs) {
    return tabs[0];
  });
}

export function sendExtensionMessage(message) {
  return chrome.runtime.sendMessage(message);
}

export function onExtensionMessage(callback) {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      callback(request, sender, sendResponse);
    }
  );
}

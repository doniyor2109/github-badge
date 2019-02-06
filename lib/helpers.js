export function listenTabChanges(callback) {
  chrome.tabs.onUpdated.addListener((tabId, info) => {
    callback(tabId, info);
  });
}

export function sendMessageToTab(tabId, message) {
  chrome.tabs.sendMessage(tabId, message, function(response) {});
}

export function getGithubTabs(callback) {
  chrome.tabs.query({ url: 'https://github.com/*' }, callback);
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

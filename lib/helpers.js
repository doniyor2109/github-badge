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

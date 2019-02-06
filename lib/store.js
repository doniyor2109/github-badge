const cache = {};

function getStoreLocal(field, defaultValue, callback) {
  callback(cache[field] || defaultValue);
}

function setStoreLocal(field, value, callback) {
  cache[field] = value;
  callback(true);
}

export function getStore(field, defaultValue, callback) {
  if (typeof chrome.storage == 'undefined') {
    return getStoreLocal;
  }
  chrome.storage.sync.get([field], function(result) {
    callback(result[field] || defaultValue);
  });
}

export function setStore(field, value, callback) {
  if (typeof chrome.storage == 'undefined') {
    return setStoreLocal;
  }
  chrome.storage.sync.set({[field]: value}, function() {
    callback && callback(true);
  });
}

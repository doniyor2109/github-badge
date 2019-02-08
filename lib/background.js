import { pageChangedMessage } from './message';
import { listenTabChanges, sendMessageToTab } from './helpers';
import { addToFutureTabs } from 'webext-dynamic-content-scripts';

listenTabChanges(function(tabId, {status}) {
  if (status === 'complete') {
    sendMessageToTab(tabId, pageChangedMessage());
  }
});

addToFutureTabs();

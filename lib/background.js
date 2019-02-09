import { addToFutureTabs } from 'webext-dynamic-content-scripts';
import { pageChangedMessage } from './message';
import { listenTabChanges, sendMessageToTab } from './chrome';

listenTabChanges(function(tabId, {status}) {
  if (status === 'complete') {
    sendMessageToTab(tabId, pageChangedMessage());
  }
});

addToFutureTabs();

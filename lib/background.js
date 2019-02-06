import { pageChangedMessage } from './message';
import { listenTabChanges, sendMessageToTab } from './helpers';

listenTabChanges(function(tabId, {status}) {
  if (status === 'complete') {
    sendMessageToTab(tabId, pageChangedMessage());
  }
});

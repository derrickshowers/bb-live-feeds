function onWebNav(details) {
  if (details.frameId === 0) {
    chrome.pageAction.show(details.tabId);
  }
}
var filter = {
  url: [{
    hostSuffix: 'cbs.com'
  }]
};
chrome.webNavigation.onCommitted.addListener(onWebNav, filter);
chrome.webNavigation.onHistoryStateUpdated.addListener(onWebNav, filter);

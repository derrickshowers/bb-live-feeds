(function() {
  var turnOnOffButtonEl = document.querySelector('#turn-on-off'),
      debugModeCheckbox = document.querySelector('#debug-mode-checkbox'),
      bodyEl = document.querySelector('body'),
      disabledClass = 'disabled';

  // functions to send messages to content script
  function sendEnabledState() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        enabled: !bodyEl.classList.contains(disabledClass)
      });
    });
  }
  function sendDebugModeState() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        debugMode: debugModeCheckbox.checked
      });
    });
  }

  // setup initial state
  if (localStorage.getItem('debugMode') === 'true') {
    debugModeCheckbox.checked = true;
    sendDebugModeState();
  }
  if (localStorage.getItem('enabled') === 'false') {
    bodyEl.classList.add(disabledClass);
    bodyEl.classList.add(disabledClass);
    sendEnabledState();
    turnOnOffButtonEl.textContent = 'Enable';
  }

  turnOnOffButtonEl.addEventListener('click', function() {
    if (bodyEl.classList.contains(disabledClass)) {
      bodyEl.classList.remove(disabledClass);
      turnOnOffButtonEl.textContent = 'Disable';
    } else {
      bodyEl.classList.add(disabledClass);
      turnOnOffButtonEl.textContent = 'Enable';
    }
    sendEnabledState();
    localStorage.setItem('enabled', !bodyEl.classList.contains(disabledClass));
  });

  debugModeCheckbox.addEventListener('change', function() {
    sendDebugModeState();
    localStorage.setItem('debugMode', debugModeCheckbox.checked);
  });

})();

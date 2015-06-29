(function() {
  var turnOnOffButtonEl = document.querySelector('#turn-on-off'),
      debugModeCheckbox = document.querySelector('#debug-mode-checkbox'),
      bodyEl = document.querySelector('body'),
      disabledClass = 'disabled';

  // setup initial state
  if (localStorage.getItem('debugMode') === 'true') {
    debugModeCheckbox.checked = true;
  }
  if (localStorage.getItem('enabled') === 'false') {
    bodyEl.classList.add(disabledClass);
    bodyEl.classList.add(disabledClass);
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
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        enabled: !bodyEl.classList.contains(disabledClass)
      });
    });
    localStorage.setItem('enabled', !bodyEl.classList.contains(disabledClass));
  });

  debugModeCheckbox.addEventListener('change', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        debugMode: debugModeCheckbox.checked
      });
    });
    localStorage.setItem('debugMode', debugModeCheckbox.checked);
  });

})();

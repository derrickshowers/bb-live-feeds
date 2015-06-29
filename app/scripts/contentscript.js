(function() {
  var bodyEl = document.querySelector('body'),
      buttonEl = document.querySelector('#yes-still-watching'),
      bodyClassNoActivity = '.show-no-activity',
      secondsBetweenChecks = 5,
      debugMode = false,
      timer;

  function outputError(error) {
    console.error('There was some sort of error with the Big Brother 24/7 extension. \
    Try reloading it. If problem persists, hit up @derrickshowers on Twitter.');
    if (debugMode) {
      console.error('The error was: ', error);
    }
  }

  function setupTimer() {
    timer = window.setInterval(function() {
      if (debugMode) {
        console.log('timer fired');
      }
      try {
        if (bodyEl.classList.contains(bodyClassNoActivity)) {
          if (debugMode) {
            console.log('show-no-activity is active, clicking button');
          }
          buttonEl.click();
        }
      }
      catch(err) {
        window.clearInterval(timer);
        outputError(err);
      }
    }, secondsBetweenChecks * 1000);
  }

  function init() {
    // setup listener for popup communication
    chrome.runtime.onMessage.addListener(function(request) {
      // check if we're enabling/disabling
      if (request.enabled) {
        setupTimer();
      } else if (request.enabled !== undefined) {
        window.clearInterval(timer);
      }
      // check if debug mode is on
      if (request.debugMode) {
        debugMode = true;
      } else if (request.debugMode !== undefined) {
        debugMode = false;
      }
    });

    setupTimer();
  }

  init();

})();


// Single-language bootloader.
(function() {
  // Suppress harmless audio autoplay errors from Blockly Games
  // These errors occur when browsers block autoplay or when play() is interrupted by pause()
  window.addEventListener('unhandledrejection', function(event) {
    if (event.reason) {
      var message = event.reason.message || '';
      var name = event.reason.name || '';
      
      // Suppress DOMException errors related to play() - these are expected
      // when browsers block autoplay or when play() is interrupted by pause()
      if (name === 'DOMException' && (
          message.indexOf('play()') !== -1 ||
          message.indexOf('play() request') !== -1 ||
          message.indexOf('pause()') !== -1 ||
          message.indexOf('interrupted') !== -1
      )) {
        event.preventDefault();
        return;
      }
    }
  });

  // Also suppress general errors related to audio playback
  window.addEventListener('error', function(event) {
    if (event.message && (
        event.message.indexOf('play()') !== -1 ||
        event.message.indexOf('play() request') !== -1 ||
        event.message.indexOf('pause()') !== -1 ||
        event.message.indexOf('interrupted') !== -1
    )) {
      event.preventDefault();
      return;
    }
  }, true);

  // Application path.
  var appName = location.pathname.match(/\/([-\w]+)(\.html)?$/);
  appName = appName ? appName[1].replace('-', '/') : 'index';

  // Only one language.
  var lang = 'en';
  window['BlocklyGamesLanguages'] = [lang];
  window['BlocklyGamesLang'] = lang;

  // Load the language pack.
  var script = document.createElement('script');
  script.src = appName + '/generated/' + lang + '/compressed.js';
  script.type = 'text/javascript';
  document.head.appendChild(script);
})();

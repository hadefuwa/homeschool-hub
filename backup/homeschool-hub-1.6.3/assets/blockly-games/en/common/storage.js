/**
 * @license
 * Copyright 2014 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Storage module for Blockly Games.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

// Suppress harmless audio autoplay errors
window.addEventListener('unhandledrejection', function(event) {
  if (event.reason && event.reason.name === 'DOMException') {
    var message = event.reason.message || '';
    if (message.includes('play()') || message.includes('pause()')) {
      event.preventDefault();
    }
  }
});

(function() {
  // Storage namespace for Blockly Games
  var STORAGE_PREFIX = 'BlocklyGames-';
  
  // Check if localStorage is available
  var hasStorage = (function() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  })();

  /**
   * Save a value to localStorage.
   * @param {string} key The key to save under.
   * @param {string} value The value to save.
   */
  function save(key, value) {
    if (hasStorage) {
      try {
        localStorage.setItem(STORAGE_PREFIX + key, value);
      } catch (e) {
        // Storage quota exceeded or other error
        console.warn('Failed to save to localStorage:', e);
      }
    }
  }

  /**
   * Load a value from localStorage.
   * @param {string} key The key to load.
   * @return {string|null} The value, or null if not found.
   */
  function load(key) {
    if (hasStorage) {
      try {
        return localStorage.getItem(STORAGE_PREFIX + key);
      } catch (e) {
        console.warn('Failed to load from localStorage:', e);
        return null;
      }
    }
    return null;
  }

  /**
   * Remove a value from localStorage.
   * @param {string} key The key to remove.
   */
  function remove(key) {
    if (hasStorage) {
      try {
        localStorage.removeItem(STORAGE_PREFIX + key);
      } catch (e) {
        console.warn('Failed to remove from localStorage:', e);
      }
    }
  }

  // Export functions to global scope
  window.BlocklyGamesStorage = {
    save: save,
    load: load,
    remove: remove,
    hasStorage: hasStorage
  };

  // Intercept navigation attempts to prevent external navigation
  // Blockly Games tries to navigate to next levels using window.location
  // We need to prevent it from navigating to external URLs or terms of service pages
  (function() {
    // Store original location methods
    const originalLocation = window.location;
    const originalHref = originalLocation.href;
    const originalAssign = originalLocation.assign;
    const originalReplace = originalLocation.replace;
    const originalProtocol = originalLocation.protocol;
    const originalHost = originalLocation.host;
    const originalPathname = originalLocation.pathname;
    
    // Override location.protocol and location.host to help Blockly Games construct correct URLs
    // When Blockly Games does: window.location.protocol + "//" + window.location.host + window.location.pathname
    // We want it to construct blockly:// URLs correctly
    try {
      Object.defineProperty(originalLocation, 'protocol', {
        get: function() {
          // Return 'blockly:' instead of 'blockly:' to help URL construction
          return originalProtocol || 'blockly:';
        },
        configurable: true
      });
      
      Object.defineProperty(originalLocation, 'host', {
        get: function() {
          // Return empty string for blockly:// protocol to avoid malformed URLs
          if (originalProtocol === 'blockly:') {
            return '';
          }
          return originalHost || '';
        },
        configurable: true
      });
    } catch (e) {
      // If we can't override these, that's okay
      console.log('Could not override location.protocol/host (expected in some cases)');
    }
    
    // Override location.href setter
    try {
      let locationDescriptor = Object.getOwnPropertyDescriptor(window, 'location') || 
                               Object.getOwnPropertyDescriptor(Object.getPrototypeOf(window), 'location');
      
      if (locationDescriptor && locationDescriptor.configurable) {
        Object.defineProperty(window, 'location', {
          get: function() {
            return originalLocation;
          },
          set: function(url) {
            handleNavigation(url);
          },
          configurable: true
        });
      }
    } catch (e) {
      // Fallback: override location.href directly
      try {
        Object.defineProperty(originalLocation, 'href', {
          get: function() {
            return originalHref;
          },
          set: function(url) {
            handleNavigation(url);
          },
          configurable: true
        });
      } catch (e2) {
        console.log('Could not override window.location (expected in some cases)');
      }
    }
    
    // Override location.assign and location.replace using defineProperty
    // These are read-only properties, so we need to use defineProperty
    try {
      if (originalAssign) {
        Object.defineProperty(originalLocation, 'assign', {
          value: function(url) {
            handleNavigation(url);
          },
          writable: false,
          configurable: true
        });
      }
    } catch (e) {
      // If we can't override assign, that's okay - we'll catch href assignments
      console.log('Could not override location.assign (expected in some cases)');
    }
    
    try {
      if (originalReplace) {
        Object.defineProperty(originalLocation, 'replace', {
          value: function(url) {
            handleNavigation(url);
          },
          writable: false,
          configurable: true
        });
      }
    } catch (e) {
      // If we can't override replace, that's okay - we'll catch href assignments
      console.log('Could not override location.replace (expected in some cases)');
    }
    
    function handleNavigation(url) {
      if (typeof url !== 'string') {
        return;
      }
      
      // Get current path to determine game type
      const currentPath = originalPathname || window.location.pathname;
      const isBlocklyGame = currentPath.includes('blockly-games') || 
                           currentPath.includes('pond') || 
                           currentPath.includes('maze') || 
                           currentPath.includes('bird') || 
                           currentPath.includes('turtle') || 
                           currentPath.includes('movie') || 
                           currentPath.includes('puzzle');
      
      // Check if this is a level progression within the same game
      // Blockly Games uses query parameters like ?level=2 or hash like #level2
      // Also check if URL contains the same game name (puzzle, maze, bird, turtle, movie, pond)
      const gameNames = ['puzzle', 'maze', 'bird', 'turtle', 'movie', 'pond'];
      const currentGame = gameNames.find(game => currentPath.includes(game));
      const isLevelProgression = url.includes('?level=') || 
                                 url.includes('#level') || 
                                 url.includes('level=') ||
                                 (currentGame && url.includes(currentGame)) ||
                                 (isBlocklyGame && !url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('//') && !url.startsWith('file://'));
      
      // Fix URLs that Blockly Games constructs incorrectly for blockly:// protocol
      // Blockly Games might construct: "blockly:////blockly-games/..." or similar
      if (url.includes('blockly://') || url.includes('/blockly-games/') || isLevelProgression) {
        // Normalize the URL to use blockly:// protocol correctly
        let normalizedUrl = url;
        
        // Fix double slashes after protocol
        normalizedUrl = normalizedUrl.replace(/blockly:\/\/\/+/g, 'blockly://');
        
        // If it's a relative path starting with /blockly-games/, convert to blockly://
        if (normalizedUrl.startsWith('/blockly-games/')) {
          normalizedUrl = 'blockly://' + normalizedUrl.substring(1);
        }
        
        // If it's a relative path (starts with /) and we're in a blockly game, convert to blockly://
        if (normalizedUrl.startsWith('/') && isBlocklyGame && !normalizedUrl.startsWith('//')) {
          // Extract the path after the first /
          const pathPart = normalizedUrl.substring(1);
          // If it doesn't already have blockly-games/, add it
          if (!pathPart.startsWith('blockly-games/')) {
            // Try to preserve the current game context
            if (isPondTutor && pathPart.includes('pond')) {
              normalizedUrl = 'blockly://blockly-games/en/' + pathPart;
            } else if (isPondDuck && pathPart.includes('pond')) {
              normalizedUrl = 'blockly://blockly-games/en/' + pathPart;
            } else {
              normalizedUrl = 'blockly://blockly-games/en/' + pathPart;
            }
          } else {
            normalizedUrl = 'blockly://' + pathPart;
          }
        }
        
        // If it has blockly:// but also has http:// or https://, extract the blockly part
        if (normalizedUrl.includes('blockly://') && (normalizedUrl.includes('http://') || normalizedUrl.includes('https://'))) {
          const blocklyMatch = normalizedUrl.match(/blockly:\/\/[^\s"']+/);
          if (blocklyMatch) {
            normalizedUrl = blocklyMatch[0];
          }
        }
        
        // Handle query parameters and hash for level progression
        if (isLevelProgression && !normalizedUrl.startsWith('blockly://')) {
          // Extract query params and hash from the URL
          const urlObj = new URL(url, 'http://dummy.com'); // Use dummy base for parsing
          const query = urlObj.search;
          const hash = urlObj.hash;
          const pathname = urlObj.pathname;
          
          // Reconstruct with blockly:// protocol
          if (pathname.startsWith('/blockly-games/')) {
            normalizedUrl = 'blockly://' + pathname.substring(1) + query + hash;
          } else if (pathname.startsWith('/')) {
            normalizedUrl = 'blockly://blockly-games/en' + pathname + query + hash;
          } else {
            normalizedUrl = 'blockly://blockly-games/en/' + pathname + query + hash;
          }
        }
        
        try {
          originalLocation.href = normalizedUrl;
          console.log('Navigating to:', normalizedUrl);
          return;
        } catch (e) {
          console.log('Navigation within blockly:// protocol:', e);
        }
        return;
      }
      
      // Allow relative URLs (same game, different level) - these are safe
      if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('//') && !url.startsWith('file://')) {
        try {
          // For relative URLs in blockly games, ensure they use blockly:// protocol
          if (isBlocklyGame) {
            let relativeUrl = url;
            if (relativeUrl.startsWith('/')) {
              relativeUrl = 'blockly://blockly-games/en' + relativeUrl;
            } else {
              // Relative path - construct from current location
              const currentUrl = originalHref || window.location.href;
              if (currentUrl.includes('blockly://')) {
                const basePath = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
                relativeUrl = basePath + relativeUrl;
              } else {
                relativeUrl = 'blockly://blockly-games/en/' + relativeUrl;
              }
            }
            originalLocation.href = relativeUrl;
            console.log('Navigating to relative URL:', relativeUrl);
          } else {
            originalLocation.href = url;
            console.log('Navigating to relative URL:', url);
          }
        } catch (e) {
          console.log('Navigation with relative URL failed:', e);
        }
        return;
      }
      
      // Block external navigation (http://, https://, //, file://) UNLESS it's a known Blockly Games domain
      // Allow blockly.games domain for level progression
      const isBlocklyGamesDomain = url.includes('blockly.games') || url.includes('blocklygames.appspot.com');
      
      if (isBlocklyGamesDomain && isLevelProgression) {
        // This is level progression on Blockly Games domain - convert to local blockly://
        let localUrl = url;
        // Extract path and query from the URL
        try {
          const urlObj = new URL(url);
          const path = urlObj.pathname;
          const query = urlObj.search;
          const hash = urlObj.hash;
          
          // Convert to blockly:// protocol
          if (path.startsWith('/')) {
            localUrl = 'blockly://blockly-games/en' + path + query + hash;
          } else {
            localUrl = 'blockly://blockly-games/en/' + path + query + hash;
          }
          
          originalLocation.href = localUrl;
          console.log('Converted external Blockly Games URL to local:', localUrl);
          return;
        } catch (e) {
          console.log('Failed to parse Blockly Games URL:', e);
        }
      }
      
      // Block external navigation (http://, https://, //, file://) to other domains
      // This prevents navigation to terms of service or external sites
      console.log('Blocked external navigation attempt:', url);
      
      // Notify parent window if available
      if (window.parent && window.parent !== window) {
        try {
          window.parent.postMessage({
            type: 'blockly-navigation-blocked',
            url: url,
            message: 'Navigation to external URL blocked - staying in current game'
          }, '*');
        } catch (e) {
          // Cross-origin restrictions may prevent this
        }
      }
      
      // Don't navigate - stay on current page/level
    }
  })();
})();

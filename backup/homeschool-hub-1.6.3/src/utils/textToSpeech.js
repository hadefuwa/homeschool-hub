/**
 * Text-to-Speech Utility Module
 * Uses edge-tts-universal (high-quality) in Electron, falls back to Web Speech API
 */

// Check if we're in Electron (has electronAPI)
const isElectron = () => {
  return typeof window !== 'undefined' && window.electronAPI && window.electronAPI.ttsSpeak;
};

// Check if Web Speech API is supported (fallback)
const isWebSpeechSupported = () => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
};

// Check if TTS is supported (either method)
const isSupported = () => {
  return isElectron() || isWebSpeechSupported();
};

// Audio player for edge-tts (Electron)
let currentAudioPlayer = null;

// Web Speech API state (fallback)
let voicesLoaded = false;
let voices = [];
let currentUtterance = null;

// Speech queue management to prevent overlapping
let isSpeechInProgress = false;
let speechQueue = [];
let stopRequested = false;
let currentRequestId = 0;

// Load Web Speech API voices (fallback only)
const loadVoices = () => {
  if (typeof window === 'undefined' || !isWebSpeechSupported()) {
    return [];
  }
  
  voices = window.speechSynthesis.getVoices();
  voicesLoaded = voices.length > 0;
  return voices;
};

// Load voices when they become available (fallback only)
if (typeof window !== 'undefined' && isWebSpeechSupported() && !isElectron()) {
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
  loadVoices();
  setTimeout(loadVoices, 100);
}

// Get user preferences from localStorage
const getPreferences = () => {
  try {
    const stored = localStorage.getItem('ttsPreferences');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to load TTS preferences:', e);
  }
  
  // Default preferences
  return {
    enabled: true,
    autoRead: false,
    readAnswers: true,
    voice: null, // Will use default voice
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
    useEdgeTTS: true, // Prefer edge-tts in Electron
  };
};

// Save user preferences to localStorage
const savePreferences = (prefs) => {
  try {
    localStorage.setItem('ttsPreferences', JSON.stringify(prefs));
  } catch (e) {
    console.warn('Failed to save TTS preferences:', e);
  }
};

/**
 * Speak text using TTS (edge-tts in Electron, Web Speech API as fallback)
 * @param {string} text - Text to speak
 * @param {Object} options - Optional settings (voice, rate, pitch, volume)
 * @returns {Promise} - Resolves when speech starts, rejects on error
 */
const speak = async (text, options = {}) => {
  if (!isSupported()) {
    return Promise.reject(new Error('Text-to-speech is not supported'));
  }

  if (!text || typeof text !== 'string') {
    return Promise.reject(new Error('Invalid text provided'));
  }

  // Increment request ID to invalidate any previous pending requests
  const requestId = ++currentRequestId;

  // Stop any current speech immediately
  stop();

  // Mark that speech is starting
  isSpeechInProgress = true;
  stopRequested = false;

  // Get preferences
  const prefs = getPreferences();

  // Try edge-tts first (Electron)
  if (isElectron() && (prefs.useEdgeTTS !== false)) {
    try {
      const voice = options.voice || prefs.voice || 'en-US-EmmaMultilingualNeural';
      
      // Call Electron main process to synthesize speech
      const result = await window.electronAPI.ttsSpeak(text, {
        voice,
      });

      // Check if this request is still the latest one
      if (requestId !== currentRequestId || stopRequested) {
        isSpeechInProgress = false;
        return Promise.reject(new Error('Speech was stopped or invalidated by a newer request'));
      }

      if (result.success && result.audioData) {
        // Convert base64 to blob URL for playback
        const base64Data = result.audioData;
        const mimeType = result.mimeType || 'audio/mpeg';
        
        // Convert base64 to binary
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        // Create blob and blob URL
        const blob = new Blob([bytes], { type: mimeType });
        const blobUrl = URL.createObjectURL(blob);
        
        // Play the audio
        const audio = new Audio(blobUrl);
        currentAudioPlayer = audio;
        
        // Set volume
        audio.volume = options.volume !== undefined ? options.volume : prefs.volume;
        
        // Play and return promise
        return new Promise((resolve, reject) => {
          audio.oncanplaythrough = () => {
            // Check again before playing
            if (requestId !== currentRequestId || stopRequested) {
              currentAudioPlayer = null;
              isSpeechInProgress = false;
              URL.revokeObjectURL(blobUrl);
              reject(new Error('Speech was stopped or invalidated'));
              return;
            }
            audio.play().then(() => {
              resolve();
            }).catch((err) => {
              isSpeechInProgress = false;
              reject(err);
            });
          };

          audio.onerror = (e) => {
            if (currentAudioPlayer === audio) {
              currentAudioPlayer = null;
              isSpeechInProgress = false;
            }
            URL.revokeObjectURL(blobUrl);
            reject(new Error('Failed to play audio'));
          };

          audio.onended = () => {
            if (currentAudioPlayer === audio) {
              currentAudioPlayer = null;
              isSpeechInProgress = false;
            }
            URL.revokeObjectURL(blobUrl);
          };

          // If already loaded, play immediately
          if (audio.readyState >= 2) {
            if (requestId !== currentRequestId || stopRequested) {
              currentAudioPlayer = null;
              isSpeechInProgress = false;
              URL.revokeObjectURL(blobUrl);
              reject(new Error('Speech was stopped or invalidated'));
              return;
            }
            audio.play().then(() => {
              resolve();
            }).catch((err) => {
              isSpeechInProgress = false;
              reject(err);
            });
          }
        });
      } else {
        throw new Error(result.error || 'TTS synthesis failed');
      }
    } catch (error) {
      console.warn('Edge TTS failed, falling back to Web Speech API:', error);
      // Fall through to Web Speech API
    }
  }

  // Fallback to Web Speech API
  if (isWebSpeechSupported()) {
    return new Promise((resolve, reject) => {
      try {
        // Create utterance
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set voice
        if (options.voice || prefs.voice) {
          const voiceName = options.voice || prefs.voice;
          const availableVoices = getVoices();
          const selectedVoice = availableVoices.find(v => 
            v.name === voiceName || v.voiceURI === voiceName
          );
          if (selectedVoice) {
            utterance.voice = selectedVoice;
          }
        }
        
        // Set properties
        utterance.rate = options.rate !== undefined ? options.rate : prefs.rate;
        utterance.pitch = options.pitch !== undefined ? options.pitch : prefs.pitch;
        utterance.volume = options.volume !== undefined ? options.volume : prefs.volume;
        
        let hasResolved = false;
        
        // Event handlers
        utterance.onstart = () => {
          // Check if this request is still valid when it actually starts
          if (requestId !== currentRequestId || stopRequested) {
            window.speechSynthesis.cancel();
            if (!hasResolved) {
              hasResolved = true;
              reject(new Error('Speech was stopped or invalidated'));
            }
            return;
          }
          
          currentUtterance = utterance;
          if (!hasResolved) {
            hasResolved = true;
            resolve();
          }
        };

        utterance.onend = () => {
          if (currentUtterance === utterance) {
            currentUtterance = null;
            if (requestId === currentRequestId) {
              isSpeechInProgress = false;
            }
          }
        };

        utterance.onerror = (event) => {
          if (currentUtterance === utterance) {
            currentUtterance = null;
            if (requestId === currentRequestId) {
              isSpeechInProgress = false;
            }
          }
          if (event.error === 'interrupted' || event.error === 'canceled') {
            if (!hasResolved) {
              hasResolved = true;
              resolve(); // Canceled is often intentional
            }
          } else {
            if (!hasResolved) {
              hasResolved = true;
              reject(new Error(`Speech synthesis error: ${event.error}`));
            }
          }
        };
        
        // Speak
        window.speechSynthesis.speak(utterance);
        
      } catch (error) {
        reject(error);
      }
    });
  }

  return Promise.reject(new Error('No TTS method available'));
};

/**
 * Stop current speech
 */
const stop = () => {
  // Set stop flag immediately
  stopRequested = true;
  isSpeechInProgress = false;

  // Stop edge-tts audio (Electron)
  if (currentAudioPlayer) {
    currentAudioPlayer.pause();
    currentAudioPlayer.currentTime = 0;
    // Revoke blob URL if it exists (cleanup)
    if (currentAudioPlayer.src && currentAudioPlayer.src.startsWith('blob:')) {
      URL.revokeObjectURL(currentAudioPlayer.src);
    }
    currentAudioPlayer = null;
  }

  // Stop Electron TTS if available
  if (isElectron() && window.electronAPI.ttsStop) {
    window.electronAPI.ttsStop().catch(() => {
      // Ignore errors
    });
  }

  // Stop Web Speech API (fallback)
  if (isWebSpeechSupported()) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
};

/**
 * Pause current speech
 */
const pause = () => {
  // Pause edge-tts audio (Electron)
  if (currentAudioPlayer) {
    currentAudioPlayer.pause();
  }
  
  // Pause Web Speech API (fallback)
  if (isWebSpeechSupported()) {
    window.speechSynthesis.pause();
  }
};

/**
 * Resume paused speech
 */
const resume = () => {
  // Resume edge-tts audio (Electron)
  if (currentAudioPlayer && currentAudioPlayer.paused) {
    currentAudioPlayer.play().catch(() => {
      // Ignore errors
    });
  }
  
  // Resume Web Speech API (fallback)
  if (isWebSpeechSupported()) {
    window.speechSynthesis.resume();
  }
};

/**
 * Get available voices
 * @returns {Array|Promise<Array>} Array of voice objects (async in Electron, sync for Web Speech API)
 */
const getVoices = () => {
  // Try to get edge-tts voices first (Electron) - returns Promise
  if (isElectron() && window.electronAPI.ttsGetVoices) {
    return (async () => {
      try {
        const result = await window.electronAPI.ttsGetVoices();
        if (result.success && result.voices) {
          return result.voices;
        }
      } catch (error) {
        console.warn('Failed to get edge-tts voices, using Web Speech API:', error);
      }
      
      // Fallback to Web Speech API voices if edge-tts fails
      if (isWebSpeechSupported()) {
        if (!voicesLoaded) {
          loadVoices();
        }
        return voices.length > 0 ? voices : window.speechSynthesis.getVoices();
      }
      
      return [];
    })();
  }
  
  // Fallback to Web Speech API voices (synchronous)
  if (isWebSpeechSupported()) {
    if (!voicesLoaded) {
      loadVoices();
    }
    return voices.length > 0 ? voices : window.speechSynthesis.getVoices();
  }
  
  return [];
};

/**
 * Check if currently speaking
 * @returns {boolean}
 */
const isSpeaking = () => {
  // Check edge-tts audio (Electron)
  if (currentAudioPlayer) {
    return !currentAudioPlayer.paused && currentAudioPlayer.currentTime > 0 && 
           currentAudioPlayer.currentTime < currentAudioPlayer.duration;
  }
  
  // Check Web Speech API (fallback)
  if (isWebSpeechSupported()) {
    return window.speechSynthesis.speaking;
  }
  
  return false;
};

/**
 * Check if currently paused
 * @returns {boolean}
 */
const isPaused = () => {
  // Check edge-tts audio (Electron)
  if (currentAudioPlayer) {
    return currentAudioPlayer.paused;
  }
  
  // Check Web Speech API (fallback)
  if (isWebSpeechSupported()) {
    return window.speechSynthesis.paused;
  }
  
  return false;
};

/**
 * Set default voice
 * @param {string} voiceName - Name or URI of the voice
 */
const setVoice = (voiceName) => {
  const prefs = getPreferences();
  prefs.voice = voiceName;
  savePreferences(prefs);
};

/**
 * Set speech rate
 * @param {number} rate - Rate between 0.1 and 10
 */
const setRate = (rate) => {
  const prefs = getPreferences();
  prefs.rate = Math.max(0.1, Math.min(10, rate));
  savePreferences(prefs);
};

/**
 * Set pitch
 * @param {number} pitch - Pitch between 0 and 2
 */
const setPitch = (pitch) => {
  const prefs = getPreferences();
  prefs.pitch = Math.max(0, Math.min(2, pitch));
  savePreferences(prefs);
};

/**
 * Set volume
 * @param {number} volume - Volume between 0 and 1
 */
const setVolume = (volume) => {
  const prefs = getPreferences();
  prefs.volume = Math.max(0, Math.min(1, volume));
  savePreferences(prefs);
};

/**
 * Set auto-read preference
 * @param {boolean} enabled
 */
const setAutoRead = (enabled) => {
  const prefs = getPreferences();
  prefs.autoRead = enabled;
  savePreferences(prefs);
};

/**
 * Set read answers preference
 * @param {boolean} enabled
 */
const setReadAnswers = (enabled) => {
  const prefs = getPreferences();
  prefs.readAnswers = enabled;
  savePreferences(prefs);
};

/**
 * Set TTS enabled state
 * @param {boolean} enabled
 */
const setEnabled = (enabled) => {
  const prefs = getPreferences();
  prefs.enabled = enabled;
  savePreferences(prefs);
  if (!enabled) {
    stop();
  }
};

export {
  isSupported,
  speak,
  stop,
  pause,
  resume,
  getVoices,
  isSpeaking,
  isPaused,
  getPreferences,
  savePreferences,
  setVoice,
  setRate,
  setPitch,
  setVolume,
  setAutoRead,
  setReadAnswers,
  setEnabled,
};

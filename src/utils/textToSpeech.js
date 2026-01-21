/**
 * Text-to-Speech Utility Module (DISABLED - GoogleTTSService is the primary TTS)
 * This file is kept for backward compatibility but all functions are disabled
 */

// Always return false - TTS disabled in this module
const isElectron = () => false;
const isWebSpeechSupported = () => false;
const isSupported = () => false;

// Speak function - disabled, just logs
const speak = (text, options = {}) => {
  // Silently do nothing - GoogleTTSService handles all TTS now
  return Promise.resolve();
};

// Stop function - disabled
const stop = () => {
  // No-op
};

// isSpeaking - always return false
const isSpeaking = () => false;

// Get voices - return empty
const getVoices = () => {
  return [];
};

// Get preferences - return defaults
const getPreferences = () => {
  return {
    enabled: false,
    autoRead: false,
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
    voice: null,
    preferredVoice: null
  };
};

// Save preferences - no-op
const savePreferences = () => {
  // No-op
};

// Export all functions (disabled)
const textToSpeech = {
  isElectron,
  isWebSpeechSupported,
  isSupported,
  speak,
  stop,
  isSpeaking,
  getVoices,
  getPreferences,
  savePreferences,
  autoRead: false
};

export default textToSpeech;
export { speak, stop, isSpeaking, isSupported, getVoices, getPreferences, savePreferences };


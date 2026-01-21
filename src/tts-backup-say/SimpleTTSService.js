/**
 * TTS Service using Electron IPC with say.js (native OS TTS)
 * High-quality speech using Windows SAPI or macOS speech engines
 */
class SimpleTTSService {
  constructor() {
    this.initialized = false;
    this.enabled = true;
    this.rate = 1.0;
    this.volume = 1.0;
    this.lastText = '';
    this.speaking = false;
    this.listeners = new Set();
    
    // Check if we're in Electron
    this.isElectron = window.electron !== undefined;
    
    // Initialize
    this.init();
  }

  async init() {
    if (this.initialized) return;
    
    try {
      if (this.isElectron) {
        // Test IPC connection
        const result = await window.electron.invoke('tts-get-voices');
        if (result.success) {
          console.log('TTS initialized with native OS voices:', result.voices.length);
        }
      }
      this.initialized = true;
      this.notifyListeners();
    } catch (error) {
      console.error('TTS initialization failed:', error);
    }
  }

  isSupported() {
    return this.isElectron && this.initialized;
  }

  async speak(text) {
    if (!this.isSupported() || !text || !this.enabled) return;
    
    try {
      this.lastText = text;
      this.speaking = true;
      this.notifyListeners();
      
      console.log('TTS speaking:', text.substring(0, 50));
      
      const result = await window.electron.invoke('tts-speak', { text });
      
      if (!result.success) {
        console.error('TTS speak failed:', result.error);
      }
      
      this.speaking = false;
      this.notifyListeners();
    } catch (error) {
      console.error('Speak error:', error);
      this.speaking = false;
      this.notifyListeners();
    }
  }

  async stop() {
    if (!this.isSupported()) return;
    
    try {
      await window.electron.invoke('tts-stop');
      this.speaking = false;
      this.notifyListeners();
    } catch (error) {
      console.error('Stop error:', error);
    }
  }

  replay() {
    if (this.lastText) {
      this.speak(this.lastText);
    }
  }

  isSpeaking() {
    return this.speaking;
  }

  setRate(rate) {
    this.rate = Math.max(0.5, Math.min(2.0, rate));
    this.notifyListeners();
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.notifyListeners();
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    if (!enabled) {
      this.stop();
    }
    this.notifyListeners();
  }

  getState() {
    return {
      enabled: this.enabled,
      speaking: this.speaking,
      lastText: this.lastText,
      rate: this.rate,
      volume: this.volume,
      initialized: this.initialized
    };
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.getState()));
  }
}

// Create singleton instance
const ttsService = new SimpleTTSService();

// Also expose on window for easy access anywhere
if (typeof window !== 'undefined') {
  window.ttsService = ttsService;
}

export default ttsService;

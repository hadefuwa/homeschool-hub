/**
 * Modern TTS Service using Microsoft Edge TTS
 * Natural neural voices with high quality speech
 */
class EdgeTTSService {
  constructor() {
    this.initialized = false;
    this.enabled = true;
    this.rate = 1.0;
    this.pitch = 0;
    this.lastText = '';
    this.speaking = false;
    this.listeners = new Set();
    this.audioElement = null;
    this.voices = [];
    this.currentVoice = 'en-US-AriaNeural'; // Default to natural female voice
    
    // Check if we're in Electron
    this.isElectron = window.electron !== undefined;
    
    // Initialize
    this.init();
  }

  async init() {
    if (this.initialized) return;
    
    try {
      if (this.isElectron) {
        // Get available Edge TTS voices
        const result = await window.electron.invoke('tts-get-voices');
        if (result.success) {
          this.voices = result.voices;
          console.log('Edge TTS initialized with', this.voices.length, 'neural voices');
        }
      }
      this.initialized = true;
      this.notifyListeners();
    } catch (error) {
      console.error('Edge TTS initialization failed:', error);
    }
  }

  isSupported() {
    return this.isElectron && this.initialized;
  }

  async speak(text) {
    if (!this.isSupported() || !text || !this.enabled) return;
    
    try {
      // Stop any current speech
      await this.stop();
      
      this.lastText = text;
      this.speaking = true;
      this.notifyListeners();
      
      console.log('Edge TTS speaking:', text.substring(0, 50));
      
      // Get audio data from Edge TTS
      const result = await window.electron.invoke('tts-speak', { 
        text,
        voice: this.currentVoice,
        rate: this.rate,
        pitch: this.pitch
      });
      
      if (result.success && result.audioData) {
        // Play the audio
        await this.playAudio(result.audioData);
      } else {
        console.error('Edge TTS speak failed:', result.error);
        this.speaking = false;
        this.notifyListeners();
      }
    } catch (error) {
      console.error('Speak error:', error);
      this.speaking = false;
      this.notifyListeners();
    }
  }

  async playAudio(base64Audio) {
    return new Promise((resolve, reject) => {
      try {
        // Create audio element
        this.audioElement = new Audio();
        this.audioElement.src = `data:audio/mp3;base64,${base64Audio}`;
        
        this.audioElement.onended = () => {
          this.speaking = false;
          this.notifyListeners();
          resolve();
        };

        this.audioElement.onerror = (error) => {
          console.error('Audio playback error:', error);
          this.speaking = false;
          this.notifyListeners();
          reject(error);
        };

        this.audioElement.play();
      } catch (error) {
        this.speaking = false;
        this.notifyListeners();
        reject(error);
      }
    });
  }

  async stop() {
    if (!this.isSupported()) return;
    
    try {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.src = '';
        this.audioElement = null;
      }
      
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

  setVoice(voiceName) {
    this.currentVoice = voiceName;
    this.notifyListeners();
  }

  setRate(rate) {
    this.rate = Math.max(0.5, Math.min(2.0, rate));
    this.notifyListeners();
  }

  setPitch(pitch) {
    this.pitch = Math.max(-10, Math.min(10, pitch));
    this.notifyListeners();
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    if (!enabled) {
      this.stop();
    }
    this.notifyListeners();
  }

  getVoices() {
    return this.voices;
  }

  getState() {
    return {
      enabled: this.enabled,
      speaking: this.speaking,
      lastText: this.lastText,
      rate: this.rate,
      pitch: this.pitch,
      currentVoice: this.currentVoice,
      voices: this.voices,
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
const edgeTTSService = new EdgeTTSService();

// Also expose on window for easy access anywhere
if (typeof window !== 'undefined') {
  window.edgeTTSService = edgeTTSService;
}

export default edgeTTSService;

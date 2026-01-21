/**
 * Modern TTS Service using ResponsiveVoice API
 * Provides natural, high-quality voices for better user experience
 */
class ModernTTSService {
  constructor() {
    this.initialized = false;
    this.enabled = true;
    this.rate = 1.0;
    this.pitch = 1.0;
    this.volume = 1.0;
    this.lastText = '';
    this.speaking = false;
    this.listeners = new Set();
    this.currentVoice = 'US English Female'; // Default high-quality voice
    this.voices = [];
    
    // Initialize ResponsiveVoice
    this.init();
  }

  async init() {
    if (this.initialized) return;
    
    try {
      // Wait for ResponsiveVoice to load
      if (typeof responsiveVoice !== 'undefined') {
        await new Promise((resolve) => {
          if (responsiveVoice.voiceSupport()) {
            this.voices = responsiveVoice.getVoices();
            console.log('ModernTTS initialized with', this.voices.length, 'voices');
            resolve();
          } else {
            // Fallback - wait for voices to load
            responsiveVoice.addEventListener('OnReady', () => {
              this.voices = responsiveVoice.getVoices();
              console.log('ModernTTS initialized with', this.voices.length, 'voices');
              resolve();
            });
          }
        });
      } else {
        console.warn('ResponsiveVoice not available, loading from CDN...');
        await this.loadResponsiveVoice();
      }
      
      this.initialized = true;
      this.notifyListeners();
    } catch (error) {
      console.error('ModernTTS initialization failed:', error);
    }
  }

  async loadResponsiveVoice() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://code.responsivevoice.org/responsivevoice.js?key=YOUR_KEY'; // Free version
      script.onload = () => {
        if (responsiveVoice) {
          responsiveVoice.OnLoad = () => {
            this.voices = responsiveVoice.getVoices();
            resolve();
          };
        }
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  isSupported() {
    return this.initialized && typeof responsiveVoice !== 'undefined';
  }

  async speak(text) {
    if (!this.enabled || !text) return;
    
    await this.init();
    
    if (!this.isSupported()) {
      console.warn('ResponsiveVoice not available');
      return;
    }
    
    try {
      this.stop(); // Stop any current speech
      
      this.lastText = text;
      this.speaking = true;
      this.notifyListeners();
      
      console.log('ModernTTS speaking:', text.substring(0, 50));
      
      responsiveVoice.speak(text, this.currentVoice, {
        rate: this.rate,
        pitch: this.pitch,
        volume: this.volume,
        onend: () => {
          this.speaking = false;
          this.notifyListeners();
        },
        onerror: (error) => {
          console.error('Speech error:', error);
          this.speaking = false;
          this.notifyListeners();
        }
      });
    } catch (error) {
      console.error('Speak error:', error);
      this.speaking = false;
      this.notifyListeners();
    }
  }

  stop() {
    if (this.isSupported()) {
      responsiveVoice.cancel();
      this.speaking = false;
      this.notifyListeners();
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
    this.rate = Math.max(0.1, Math.min(10, rate));
    this.notifyListeners();
  }

  setPitch(pitch) {
    this.pitch = Math.max(0, Math.min(2, pitch));
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
      volume: this.volume,
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
const modernTTSService = new ModernTTSService();

// Expose on window
if (typeof window !== 'undefined') {
  window.modernTTSService = modernTTSService;
}

export default modernTTSService;

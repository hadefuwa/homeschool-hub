/**
 * Modern TTS Service using enhanced Web Speech API
 * Automatically selects the best available neural voices
 */
class BrowserTTSService {
  constructor() {
    this.initialized = false;
    this.enabled = true;
    this.rate = 1.0;
    this.pitch = 1.0;
    this.volume = 1.0;
    this.lastText = '';
    this.speaking = false;
    this.listeners = new Set();
    this.voices = [];
    this.currentVoice = null;
    this.utterance = null;
    
    // Check if Speech Synthesis is supported
    this.isSupported = 'speechSynthesis' in window;
    
    if (this.isSupported) {
      this.init();
    }
  }

  async init() {
    if (this.initialized) return;
    
    try {
      // Load voices
      await this.loadVoices();
      
      // Select best default voice
      this.selectBestVoice();
      
      this.initialized = true;
      console.log('BrowserTTS initialized with', this.voices.length, 'voices');
      console.log('Selected voice:', this.currentVoice?.name);
      this.notifyListeners();
    } catch (error) {
      console.error('BrowserTTS initialization failed:', error);
    }
  }

  async loadVoices() {
    return new Promise((resolve) => {
      // Get voices immediately if available
      let voices = speechSynthesis.getVoices();
      
      if (voices.length > 0) {
        this.voices = voices;
        resolve(voices);
      } else {
        // Wait for voices to load
        speechSynthesis.addEventListener('voiceschanged', () => {
          this.voices = speechSynthesis.getVoices();
          resolve(this.voices);
        }, { once: true });
        
        // Timeout fallback
        setTimeout(() => {
          this.voices = speechSynthesis.getVoices();
          resolve(this.voices);
        }, 1000);
      }
    });
  }

  selectBestVoice() {
    if (this.voices.length === 0) return;
    
    // Priority order for high-quality voices
    const preferredVoiceNames = [
      'Microsoft Zira - English (United States)',
      'Microsoft David - English (United States)',
      'Google US English',
      'Google UK English Female',
      'Microsoft Mark - English (United States)',
      'Samantha',
      'Alex',
      'Karen',
      'Victoria'
    ];

    // Try to find a preferred voice
    for (const preferred of preferredVoiceNames) {
      const voice = this.voices.find(v => v.name.includes(preferred));
      if (voice) {
        this.currentVoice = voice;
        return;
      }
    }

    // Look for any English neural/natural voice
    const neuralVoice = this.voices.find(v => 
      v.lang.startsWith('en') && (
        v.name.toLowerCase().includes('natural') ||
        v.name.toLowerCase().includes('neural') ||
        v.name.toLowerCase().includes('premium')
      )
    );
    
    if (neuralVoice) {
      this.currentVoice = neuralVoice;
      return;
    }

    // Fallback to first English voice
    this.currentVoice = this.voices.find(v => v.lang.startsWith('en-US')) ||
                        this.voices.find(v => v.lang.startsWith('en')) ||
                        this.voices[0];
  }

  async speak(text) {
    if (!this.isSupported || !this.enabled || !text) return;
    
    await this.init();
    
    try {
      // Stop any current speech
      this.stop();
      
      this.lastText = text;
      this.speaking = true;
      this.notifyListeners();
      
      console.log('BrowserTTS speaking with', this.currentVoice?.name, ':', text.substring(0, 50));
      
      // Create utterance
      this.utterance = new SpeechSynthesisUtterance(text);
      this.utterance.voice = this.currentVoice;
      this.utterance.rate = this.rate;
      this.utterance.pitch = this.pitch;
      this.utterance.volume = this.volume;
      
      // Event handlers
      this.utterance.onend = () => {
        this.speaking = false;
        this.notifyListeners();
      };
      
      this.utterance.onerror = (error) => {
        console.error('Speech error:', error);
        this.speaking = false;
        this.notifyListeners();
      };
      
      // Speak
      speechSynthesis.speak(this.utterance);
    } catch (error) {
      console.error('Speak error:', error);
      this.speaking = false;
      this.notifyListeners();
    }
  }

  stop() {
    if (this.isSupported) {
      speechSynthesis.cancel();
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
    const voice = this.voices.find(v => v.name === voiceName);
    if (voice) {
      this.currentVoice = voice;
      this.notifyListeners();
    }
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

  getEnglishVoices() {
    return this.voices.filter(v => v.lang.startsWith('en'));
  }

  getState() {
    return {
      enabled: this.enabled,
      speaking: this.speaking,
      lastText: this.lastText,
      rate: this.rate,
      pitch: this.pitch,
      volume: this.volume,
      currentVoice: this.currentVoice?.name,
      voices: this.voices.map(v => ({ name: v.name, lang: v.lang })),
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
const browserTTSService = new BrowserTTSService();

// Expose on window
if (typeof window !== 'undefined') {
  window.browserTTSService = browserTTSService;
}

export default browserTTSService;

/**
 * Clean TTS Service
 * React-friendly implementation - components control what gets read
 */

class TTSService {
  constructor() {
    this.enabled = true;
    this.autoRead = false;
    this.rate = 1.0;
    this.pitch = 1.0;
    this.lang = 'en-US';
    this.speaking = false;
    this.lastText = '';
    this.lastReadContent = '';
    this.listeners = new Set();
    this.selectedVoice = null;
    this.readTimeout = null;
    
    // Load voices for Web Speech API fallback
    if (typeof window !== 'undefined') {
      this.loadVoices();
    }
    
    console.log('TTS Service initialized');
  }

  loadVoices() {
    if (!('speechSynthesis' in window)) return;
    
    const loadVoicesWhenReady = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Prioritize female voices: Susan > Hazel > Zira > Emma
        this.selectedVoice = 
          voices.find(v => v.name.includes('Susan')) ||
          voices.find(v => v.name.includes('Hazel')) ||
          voices.find(v => v.name.includes('Zira')) ||
          voices.find(v => v.name.includes('Emma')) ||
          voices.find(v => v.name.includes('Microsoft') && v.lang.startsWith('en-GB')) ||
          voices.find(v => v.name.includes('Microsoft') && v.lang === 'en-US') ||
          voices.find(v => v.lang.startsWith('en')) ||
          voices[0];
        
        console.log('Selected voice:', this.selectedVoice?.name);
      }
    };
    
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoicesWhenReady;
    }
    
    loadVoicesWhenReady();
    setTimeout(loadVoicesWhenReady, 100);
    setTimeout(loadVoicesWhenReady, 500);
  }

  setupAutoRead() {
    // Listen to route changes (hashchange for React Router hash routing)
    const readPageContent = () => {
      if (!this.autoRead || !this.enabled || this.speaking) return;
      
      // Clear any pending read
      if (this.readTimeout) {
        clearTimeout(this.readTimeout);
      }
      
      // Wait for content to load, then read once
      this.readTimeout = setTimeout(() => {
        const content = this.extractPageContent();
        if (content && content !== this.lastReadContent && content.length > 5) {
          this.lastReadContent = content;
          this.speak(content);
        }
      }, 800);
    };
    
    // Read on route change
    window.addEventListener('hashchange', () => {
      this.stop();
      this.lastReadContent = '';
      readPageContent();
    });
    
    // Initial read on page load
    if (document.readyState === 'complete') {
      readPageContent();
    } else {
      window.addEventListener('load', readPageContent);
    }
  }

  extractPageContent() {
    // Get main lesson/quiz container
    const mainContent = document.querySelector('.lesson-container') ||
                        document.querySelector('.quiz-container') ||
                        document.querySelector('main') ||
                        document.body;
    
    if (!mainContent) return '';
    
    // Skip navigation and controls
    const skipSelectors = [
      '.simple-tts-bar',
      '.top-navigation',
      'nav',
      'header',
      'button',
      '.navigation'
    ];
    
    // Get text from lesson content
    const contentSelectors = [
      'h2:not(.lesson-title)',
      '.word',
      '.question-text',
      '.question',
      'p'
    ];
    
    const textParts = [];
    
    contentSelectors.forEach(selector => {
      const elements = mainContent.querySelectorAll(selector);
      elements.forEach(el => {
        // Skip if inside skip selector
        let shouldSkip = false;
        skipSelectors.forEach(skipSel => {
          if (el.closest(skipSel)) shouldSkip = true;
        });
        
        if (shouldSkip) return;
        
        const text = el.textContent?.trim();
        if (text && text.length > 2 && !textParts.includes(text) && !/^[\u{1F300}-\u{1F9FF}]+$/u.test(text)) {
          textParts.push(text);
        }
      });
    });
    
    // Limit to 100 words
    const fullText = textParts.join('. ');
    const words = fullText.split(/\s+/).slice(0, 100);
    return words.join(' ');
  }

  setAutoRead(enabled) {
    this.autoRead = enabled;
    if (!enabled) {
      this.lastReadContent = '';
    }
    this.notifyListeners();
  }

  async speak(text, options = {}) {
    if (!text || !this.enabled) return;

    console.log('[TTS] speak', {
      text,
      options,
      autoRead: this.autoRead,
      enabled: this.enabled,
    });

    // Stop any current speech first
    if (this.speaking) {
      await this.stop();
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    this.speaking = true;
    this.lastText = text;
    this.notifyListeners();
    
    const rate = options.rate || this.rate;
    
    try {
      // Try Electron say.js first (better quality)
      if (typeof window !== 'undefined' && window.electronAPI?.ttsSpeak) {
        const result = await window.electronAPI.ttsSpeak(text, {});
        
        if (result.success) {
          // Estimate duration
          const duration = text.split(' ').length * 400 / rate;
          await new Promise(resolve => setTimeout(resolve, duration));
          this.speaking = false;
          this.notifyListeners();
          return;
        }
      }
      
      // Fallback to Web Speech API
      if ('speechSynthesis' in window) {
        await new Promise((resolve, reject) => {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = rate;
          utterance.pitch = this.pitch;
          utterance.lang = this.lang;
          
          if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
          }
          
          utterance.onend = () => {
            this.speaking = false;
            this.notifyListeners();
            resolve();
          };
          
          utterance.onerror = (error) => {
            this.speaking = false;
            this.notifyListeners();
            reject(error);
          };
          
          window.speechSynthesis.speak(utterance);
        });
      }
    } catch (error) {
      console.error('TTS error:', error);
      this.speaking = false;
      this.notifyListeners();
    }
  }

  async stop() {
    // Stop Electron TTS
    if (typeof window !== 'undefined' && window.electronAPI?.ttsStop) {
      try {
        await window.electronAPI.ttsStop();
      } catch (error) {
        console.warn('Failed to stop Electron TTS:', error);
      }
    }
    
    // Stop Web Speech API
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    this.speaking = false;
    this.notifyListeners();
  }

  replay() {
    if (this.lastText) {
      this.speak(this.lastText);
    }
  }

  isSpeaking() {
    return this.speaking;
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    if (!enabled) {
      this.stop();
    }
    this.notifyListeners();
  }

  setRate(rate) {
    this.rate = Math.max(0.1, Math.min(10, rate));
    this.notifyListeners();
  }

  getState() {
    return {
      enabled: this.enabled,
      autoRead: this.autoRead,
      speaking: this.speaking,
      lastText: this.lastText,
      rate: this.rate,
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

// Create singleton
const ttsService = new TTSService();

if (typeof window !== 'undefined') {
  window.ttsService = ttsService;
}

export default ttsService;

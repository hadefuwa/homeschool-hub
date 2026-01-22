/**
 * Phonics Text-to-Speech Utility
 * Generates pure phoneme sounds for phonics lessons
 * Uses edge-tts (high-quality) in Electron, falls back to Web Speech API
 */
import { speak as baseSpeak, stop as baseStop } from './textToSpeech';

// Phoneme mappings for pure sounds
const PHONEME_MAP = {
  // Vowels
  'a': 'æ', // as in "cat"
  'e': 'ɛ', // as in "bed"
  'i': 'ɪ', // as in "sit"
  'o': 'ɒ', // as in "hot"
  'u': 'ʌ', // as in "cup"
  
  // Consonants
  'm': 'm',
  's': 's',
  't': 't',
  'b': 'b',
  'c': 'k',
  'd': 'd',
  'f': 'f',
  'g': 'g',
  'h': 'h',
  'j': 'dʒ',
  'k': 'k',
  'l': 'l',
  'n': 'n',
  'p': 'p',
  'q': 'kw',
  'r': 'r',
  'v': 'v',
  'w': 'w',
  'x': 'ks',
  'y': 'j',
  'z': 'z',
};

// Blends and words with phonetic pronunciation
const BLEND_PRONUNCIATIONS = {
  'ma': 'mæ',
  'me': 'mɛ',
  'mo': 'mɒ',
  'at': 'æt',
  'it': 'ɪt',
  'on': 'ɒn',
  'cat': 'kæt',
  'mat': 'mæt',
  'sun': 'sʌn',
  'dog': 'dɒg',
  'hat': 'hæt',
};

/**
 * Speak a pure phoneme sound
 * @param {string} letter - Single letter to speak
 * @param {Object} options - TTS options
 */
export const speakPhoneme = async (letter, options = {}) => {
  if (!letter || letter.length === 0) return;
  
  const lowerLetter = letter.toLowerCase();
  const phoneme = PHONEME_MAP[lowerLetter];
  
  // Use centralized TTS (edge-tts in Electron, Web Speech API fallback)
  // Note: edge-tts doesn't support rate/pitch, but volume works
  // The goal is to speak the most accurate phoneme sound possible
  try {
    if (phoneme) {
        // For a limited set of phonemes, we might have a direct "sound-alike" string
        // Otherwise, the TTS engine will just speak the letter.
        // This is a pragmatic workaround given limitations of generic TTS for pure phonemes.
        const soundAlikeText = {
            'a': 'ah', // for short 'a'
            'e': 'eh', // for short 'e'
            'i': 'ih', // for short 'i'
            'o': 'oh', // for short 'o'
            'u': 'uh', // for short 'u'
            'm': 'mmm',
            's': 'sss',
            't': 'tuh',
            'b': 'buh',
            'c': 'kuh',
            'd': 'duh',
            'f': 'fff',
            'g': 'guh',
            'h': 'huh',
            'j': 'juh',
            'k': 'kuh',
            'l': 'lll',
            'n': 'nnn',
            'p': 'puh',
            'q': 'kwuh', // 'qu' sound
            'r': 'rrr',
            'v': 'vvv',
            'w': 'wuh',
            'x': 'ks',
            'y': 'yuh',
            'z': 'zzz',
        }[lowerLetter];

        await baseSpeak(soundAlikeText || lowerLetter, { // Speak sound-alike or just the letter
            volume: options.volume !== undefined ? options.volume : 1.0,
            rate: options.rate !== undefined ? options.rate : 0.7,
            pitch: options.pitch !== undefined ? options.pitch : 1.2,
        });
    } else {
        // Fallback to speaking the letter name
        await speakLetter(letter, options);
    }
  } catch (error) {
    console.error('Error speaking phoneme:', error);
    throw error;
  }
};

/**
 * Speak a letter name
 */
export const speakLetter = async (letter, options = {}) => {
  // Use centralized TTS (edge-tts in Electron, Web Speech API fallback)
  try {
    await baseSpeak(letter.toUpperCase(), {
      volume: options.volume !== undefined ? options.volume : 1.0,
      rate: options.rate || 0.8, // For Web Speech API fallback
      pitch: options.pitch || 1.2, // For Web Speech API fallback
    });
  } catch (error) {
    console.error('Error speaking letter:', error);
    throw error;
  }
};

/**
 * Speak a blend or word
 */
export const speakBlend = async (blend, options = {}) => {
  // Use phonetic pronunciation if available
  const pronunciation = BLEND_PRONUNCIATIONS[blend.toLowerCase()] || blend;
  
  // Use centralized TTS (edge-tts in Electron, Web Speech API fallback)
  try {
    await baseSpeak(pronunciation, {
      volume: options.volume !== undefined ? options.volume : 1.0,
      rate: options.rate || 0.6, // Slower for blending (Web Speech API fallback)
      pitch: options.pitch || 1.2, // Slightly higher pitch (Web Speech API fallback)
    });
  } catch (error) {
    console.error('Error speaking blend:', error);
    throw error;
  }
};

/**
 * Speak a word slowly, then blended
 */
export const speakWordSlowlyThenBlended = async (word, options = {}) => {
  // First speak each letter sound slowly
  for (let i = 0; i < word.length; i++) {
    await speakPhoneme(word[i], { rate: 0.6, ...options });
    await new Promise(resolve => setTimeout(resolve, 300)); // Pause between sounds
  }
  
  // Then speak the word blended
  await new Promise(resolve => setTimeout(resolve, 500));
  await speakBlend(word, { rate: 0.8, ...options });
};



/**
 * Stop current speech
 */
export const stopSpeech = () => {
  // Use centralized stop function
  baseStop();
};

/**
 * Wait for voices to load
 */
export const waitForVoices = () => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve([]);
      return;
    }
    
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }
    
    window.speechSynthesis.onvoiceschanged = () => {
      resolve(window.speechSynthesis.getVoices());
    };
    
    // Timeout after 2 seconds
    setTimeout(() => {
      resolve(window.speechSynthesis.getVoices());
    }, 2000);
  });
};

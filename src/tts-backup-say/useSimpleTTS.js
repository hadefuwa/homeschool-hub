import { useState, useEffect } from 'react';
import ttsService from '../services/SimpleTTSService';

/**
 * Simple hook to use TTS service
 */
export function useSimpleTTS() {
  const [state, setState] = useState(ttsService.getState());

  useEffect(() => {
    const unsubscribe = ttsService.subscribe(setState);
    return unsubscribe;
  }, []);

  return {
    ...state,
    speak: (text) => ttsService.speak(text),
    stop: () => ttsService.stop(),
    replay: () => ttsService.replay(),
    setRate: (rate) => ttsService.setRate(rate),
    setVolume: (volume) => ttsService.setVolume(volume),
    setEnabled: (enabled) => ttsService.setEnabled(enabled),
  };
}

/**
 * Hook to auto-read text when component mounts or text changes
 */
export function useAutoSpeak(text, dependencies = []) {
  useEffect(() => {
    if (text && ttsService.enabled) {
      const timer = setTimeout(() => {
        ttsService.speak(text);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [text, ...dependencies]);
}

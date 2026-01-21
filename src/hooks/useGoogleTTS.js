import { useState, useEffect } from 'react';
import ttsService from '../services/GoogleTTSService';

/**
 * Hook for using TTS in components
 */
export const useGoogleTTS = () => {
  const [state, setState] = useState(ttsService.getState());

  useEffect(() => {
    const unsubscribe = ttsService.subscribe((newState) => {
      setState(newState);
    });

    return unsubscribe;
  }, []);

  return {
    ...state,
    speak: (text, options) => ttsService.speak(text, options),
    stop: () => ttsService.stop(),
    replay: () => ttsService.replay(),
    setRate: (rate) => ttsService.setRate(rate),
    setEnabled: (enabled) => ttsService.setEnabled(enabled),
    setAutoRead: (enabled) => ttsService.setAutoRead(enabled),
  };
};

/**
 * Hook for auto-speaking text when component mounts or content changes
 * Use this in lesson/quiz components to automatically read content
 */
export const useAutoSpeak = (text, options = {}) => {
  const { enabled } = useGoogleTTS();
  const { delay = 500, deps = [] } = options;

  useEffect(() => {
    if (!text || !enabled) return;

    // Stop any current speech and start new one after delay
    const timer = setTimeout(async () => {
      await ttsService.stop();
      await ttsService.speak(text, options);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [text, enabled, ...deps]);
};

export default useGoogleTTS;

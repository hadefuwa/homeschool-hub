import { useState, useEffect } from 'react';
import edgeTTSService from '../services/EdgeTTSService';

/**
 * Hook for using Edge TTS in components
 */
export const useEdgeTTS = () => {
  const [state, setState] = useState(edgeTTSService.getState());

  useEffect(() => {
    const unsubscribe = edgeTTSService.subscribe((newState) => {
      setState(newState);
    });

    return unsubscribe;
  }, []);

  return {
    ...state,
    speak: (text) => edgeTTSService.speak(text),
    stop: () => edgeTTSService.stop(),
    replay: () => edgeTTSService.replay(),
    setRate: (rate) => edgeTTSService.setRate(rate),
    setPitch: (pitch) => edgeTTSService.setPitch(pitch),
    setVoice: (voice) => edgeTTSService.setVoice(voice),
    setEnabled: (enabled) => edgeTTSService.setEnabled(enabled),
  };
};

/**
 * Hook for auto-speaking text when component mounts or content changes
 */
export const useAutoSpeak = (text, deps = []) => {
  const { speak, enabled } = useEdgeTTS();

  useEffect(() => {
    if (text && enabled) {
      const timer = setTimeout(() => {
        speak(text);
      }, 300); // Small delay to ensure page is ready

      return () => clearTimeout(timer);
    }
  }, [text, enabled, ...deps]);
};

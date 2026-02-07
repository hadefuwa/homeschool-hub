import { getDefaultData } from '../data/defaultData.js';

const DATA_KEY = 'ks2lab_app_data_v1';
const ACTIVITY_KEY = 'ks2lab_activity_log_v1';
const DRAWING_PREFIX = 'drawing_';

const readJson = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`[webElectronApiShim] Failed to parse ${key}:`, error);
    return fallback;
  }
};

const writeJson = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const ensureData = () => {
  const existing = readJson(DATA_KEY, null);
  if (existing) return existing;

  const defaults = getDefaultData();
  writeJson(DATA_KEY, defaults);
  return defaults;
};

export const installWebElectronApiShim = () => {
  if (typeof window === 'undefined' || window.electronAPI) return;

  const api = {
    loadData: async () => ensureData(),

    saveData: async (data) => {
      writeJson(DATA_KEY, data);
      return { success: true };
    },

    writeActivityLog: async (entry) => {
      const current = readJson(ACTIVITY_KEY, []);
      current.push({ timestamp: new Date().toISOString(), ...entry });
      writeJson(ACTIVITY_KEY, current);
      return { success: true };
    },

    readActivityLog: async (limit = 50) => {
      const entries = readJson(ACTIVITY_KEY, []);
      return entries.slice(-limit).reverse();
    },

    checkForUpdates: async () => ({ success: false, message: 'Not available on web' }),
    downloadUpdate: async () => ({ success: false, message: 'Not available on web' }),
    installUpdate: async () => ({ success: false, message: 'Not available on web' }),
    getAppVersion: async () => ({ success: true, version: 'web' }),

    onUpdateDownloadProgress: () => {},
    removeUpdateDownloadProgressListener: () => {},

    ttsSpeak: async () => ({ success: false, message: 'Use browser TTS on web' }),
    ttsStop: async () => ({ success: true }),
    ttsGetVoices: async () => ({ success: true, voices: [] }),

    saveDrawing: async ({ imageData, lessonId, studentId }) => {
      const key = `${DRAWING_PREFIX}${lessonId}_${studentId}`;
      window.localStorage.setItem(key, imageData);
      return { success: true, filePath: 'localStorage' };
    },

    loadDrawing: async (filePath) => {
      const value = window.localStorage.getItem(filePath);
      if (!value) return { success: false, error: 'Drawing not found' };
      return { success: true, imageData: value };
    },

    openExternal: async (url) => {
      window.open(url, '_blank', 'noopener,noreferrer');
      return { success: true };
    },
  };

  window.electronAPI = api;
};

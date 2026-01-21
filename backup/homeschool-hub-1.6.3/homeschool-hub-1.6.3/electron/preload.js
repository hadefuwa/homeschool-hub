const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  loadData: () => ipcRenderer.invoke('load-data'),
  saveData: (data) => ipcRenderer.invoke('save-data', data),
  writeActivityLog: (entry) => ipcRenderer.invoke('write-activity-log', entry),
  readActivityLog: (limit) => ipcRenderer.invoke('read-activity-log', limit),
  // Auto-updater functions
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  downloadUpdate: () => ipcRenderer.invoke('download-update'),
  installUpdate: () => ipcRenderer.invoke('install-update'),
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  // Listen for update download progress
  onUpdateDownloadProgress: (callback) => {
    ipcRenderer.on('update-download-progress', (event, progress) => callback(progress));
  },
  removeUpdateDownloadProgressListener: () => {
    ipcRenderer.removeAllListeners('update-download-progress');
  },
  // TTS functions
  ttsSpeak: (text, options) => ipcRenderer.invoke('tts-speak', { text, ...options }),
  ttsStop: () => ipcRenderer.invoke('tts-stop'),
  ttsGetVoices: () => ipcRenderer.invoke('tts-get-voices'),
  // Drawing functions
  saveDrawing: (data) => ipcRenderer.invoke('save-drawing', data),
  loadDrawing: (filePath) => ipcRenderer.invoke('load-drawing', filePath),
  // Utility functions
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
});


import { app, BrowserWindow, ipcMain, Menu, globalShortcut, protocol, session, dialog, shell } from 'electron';
import pkg from 'electron-updater';
const { autoUpdater } = pkg;
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { loadData, saveData, writeActivityLog, readActivityLog } from './persistence.js';
import say from 'say';

// Load GitHub token for private repo updates
let GITHUB_TOKEN = null;
try {
  const configPath = path.join(__dirname, 'update-config.js');
  if (fs.existsSync(configPath)) {
    // Read and parse the config file directly
    const configContent = fs.readFileSync(configPath, 'utf-8');
    const tokenMatch = configContent.match(/GITHUB_TOKEN\s*=\s*['"]([^'"]+)['"]/);
    if (tokenMatch) {
      GITHUB_TOKEN = tokenMatch[1];
      // Set as environment variable for electron-updater to use
      process.env.GH_TOKEN = GITHUB_TOKEN;
    }
  }
} catch (error) {
  console.log('No update config found, using environment token if available');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register custom protocol scheme before app is ready
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'blockly',
    privileges: {
      secure: true,
      standard: true,
      corsEnabled: true,
      supportFetchAPI: true,
    },
  },
  {
    scheme: 'htmlgame',
    privileges: {
      secure: true,
      standard: true,
      corsEnabled: true,
      supportFetchAPI: true,
    },
  },
]);

// Default data function - returns empty structure for fresh installs
// Lessons will be added by mergeDefaultLessons in the React app
const getDefaultDataFunc = () => {
  return {
    students: [],
    lessons: [],
    quizzes: [],
    progress: [],
    videoResources: [],
    rewards: [],
    purchases: [],
    pointsBalance: 0,
  };
};

let mainWindow;

// Configure auto-updater
autoUpdater.autoDownload = false; // Don't auto-download, let user choose
autoUpdater.autoInstallOnAppQuit = false; // Don't auto-install - user must click button (Windows workaround)

// Disable signature verification for unsigned updates (Windows workaround)
// This allows the download to complete, but Windows will still block auto-installation
// Solution: User-initiated installation via shell.openPath() (Option B workaround)
if (process.platform === 'win32') {
  // Override signature verification to allow download to proceed
  autoUpdater.verifyUpdateCodeSignature = async (publisherNames, filePath) => {
    console.warn('Signature verification disabled for unsigned updates (Windows workaround)');
    return null; // Return null to indicate "verification passed" (bypassed)
  };
}

// Auto-updater event handlers
autoUpdater.on('checking-for-update', () => {
  console.log('Checking for updates...');
});

autoUpdater.on('update-available', (info) => {
  console.log('Update available:', info.version);
  const showDialog = () => {
    const targetWindow = mainWindow || BrowserWindow.getAllWindows()[0];
    if (targetWindow) {
      dialog.showMessageBox(targetWindow, {
        type: 'info',
        title: 'Update Available',
        message: `A new version (${info.version}) is available!`,
        detail: 'Click "Update" to download the latest version from GitHub.',
        buttons: ['Update', 'Later'],
        defaultId: 0,
        cancelId: 1
      }).then((result) => {
        if (result.response === 0) {
          // Open GitHub releases for download
          shell.openExternal(`https://github.com/hadefuwa/homeschool-hub/releases/tag/v${info.version}`);
        }
      });
    } else {
      // Window not ready yet, wait a bit and try again
      setTimeout(showDialog, 1000);
    }
  };
  showDialog();
});

autoUpdater.on('update-not-available', (info) => {
  console.log('Update not available. Current version is latest.');
});

autoUpdater.on('error', (err) => {
  console.error('Error in auto-updater:', err);
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    code: err.code
  });
  
  // Don't show error dialogs for expected errors
  const errorMessage = err.message || '';
  const is404Error = errorMessage.includes('404') || errorMessage.includes('Not Found');
  const isNetworkError = errorMessage.includes('ENOTFOUND') || errorMessage.includes('network');
  const isLatestYmlError = errorMessage.includes('latest.yml') || errorMessage.includes('Cannot find latest.yml');
  const isAuthError = errorMessage.includes('401') || errorMessage.includes('403') || errorMessage.includes('Unauthorized');
  const isSignatureError = errorMessage.includes('not signed') || 
                          errorMessage.includes('digitally signed') || 
                          errorMessage.includes('SignerCertificate') ||
                          errorMessage.includes('publisherNames') ||
                          errorMessage.includes('execution policy') ||
                          errorMessage.includes('cannot run this script');
  
  if (isSignatureError) {
    // Windows is blocking the unsigned executable - this cannot be bypassed
    console.error('Windows is blocking unsigned update. Code signing certificate required.');
    const targetWindow = mainWindow || BrowserWindow.getAllWindows()[0];
    if (targetWindow) {
      dialog.showMessageBox(targetWindow, {
        type: 'error',
        title: 'Update Blocked by Windows',
        message: 'Windows is blocking the update because it is not digitally signed.',
        detail: 'Windows security requires all executables to be digitally signed. The auto-update cannot proceed.\n\nSOLUTION:\nPlease manually download and install the update from GitHub:\n\n1. Click "Open GitHub Releases" below\n2. Download the latest installer\n3. Run the installer (you may need to click "More info" and "Run anyway" if Windows shows a warning)\n\nWe are working on getting a code signing certificate to enable automatic updates.',
        buttons: ['Open GitHub Releases', 'OK'],
        defaultId: 0,
        cancelId: 1
      }).then((result) => {
        if (result.response === 0) {
          // Open GitHub releases page
          shell.openExternal('https://github.com/hadefuwa/homeschool-hub/releases');
        }
      });
    }
  } else if (isAuthError) {
    console.error('Update check: Authentication error. Check GitHub token configuration.');
  } else if (isLatestYmlError) {
    console.error('Update check: latest.yml file not found in release. Upload latest.yml to your GitHub release to enable auto-updates.');
  } else if (is404Error || isNetworkError) {
    console.log('Update check: No releases found yet or network issue. This is normal if you haven\'t published your first release.');
  } else {
    // Show dialog for unexpected errors
    const targetWindow = mainWindow || BrowserWindow.getAllWindows()[0];
    if (targetWindow) {
      dialog.showErrorBox('Update Error', err.message || 'An error occurred while checking for updates.');
    }
  }
});

autoUpdater.on('download-progress', (progressObj) => {
  const message = `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total})`;
  console.log(message);
  // You can send this to renderer to show progress bar
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('update-download-progress', progressObj);
  }
});

// Store downloaded update info for user-initiated installation
let downloadedUpdateInfo = null;

autoUpdater.on('update-downloaded', (info) => {
  console.log('Update downloaded:', info.version);
  console.log('Update file path:', info.downloadedFile || info.path);
  
  // Store update info for user-initiated installation
  downloadedUpdateInfo = {
    version: info.version,
    filePath: info.downloadedFile || info.path || null
  };
  
  const showDialog = () => {
    const targetWindow = mainWindow || BrowserWindow.getAllWindows()[0];
    if (targetWindow) {
      // Option B: User-initiated installation (Windows workaround for unsigned executables)
      // Instead of auto-installing (which Windows blocks), prompt user to click a button
      // This moves from "background script" to "user-initiated action"
      dialog.showMessageBox(targetWindow, {
        type: 'info',
        title: 'Update Ready',
        message: `Update downloaded! Version ${info.version} is ready to install.`,
        detail: 'Click "Install Now" to launch the installer.\n\nNote: Windows may show a security warning because the update is not digitally signed. Click "More info" then "Run anyway" to proceed.',
        buttons: ['Install Now', 'Later'],
        defaultId: 0,
        cancelId: 1
      }).then((result) => {
        if (result.response === 0) {
          // User-initiated installation: Use shell.openPath() to launch the installer
          // This works because it's a user action, not a background script
          // Note: electron-updater doesn't expose the file path directly, so we need to find it
          
          let installerPath = null;
          
          // Check common electron-updater cache locations on Windows
          const searchPaths = [
            // Primary location: AppData\Local\<app-name>\pending
            path.join(app.getPath('userData'), 'pending'),
            // Alternative: AppData\Local\<app-name>\updates\pending
            path.join(app.getPath('userData'), 'updates', 'pending'),
            // Temp directory
            path.join(app.getPath('temp'), 'electron-updater'),
            // Direct LOCALAPPDATA path
            path.join(process.env.LOCALAPPDATA || process.env.APPDATA || '', 'homeschool-hub', 'pending'),
          ];
          
          // Search for the installer .exe file
          for (const searchPath of searchPaths) {
            try {
              if (fs.existsSync(searchPath)) {
                const files = fs.readdirSync(searchPath);
                // Look for the installer .exe (usually contains "Setup" and version number)
                const exeFile = files.find(f => 
                  f.endsWith('.exe') && 
                  (f.includes('Setup') || f.includes('Homeschool') || f.includes(info.version))
                );
                if (exeFile) {
                  installerPath = path.join(searchPath, exeFile);
                  console.log('Found installer in cache:', installerPath);
                  break;
                }
              }
            } catch (err) {
              // Continue searching other paths
              console.log(`Searched ${searchPath}, not found or error:`, err.message);
            }
          }
          
          if (installerPath && fs.existsSync(installerPath)) {
            console.log('Launching installer via shell.openPath:', installerPath);
            shell.openPath(installerPath).then((error) => {
              if (error) {
                console.error('Failed to open installer:', error);
                dialog.showErrorBox('Installation Error', 
                  `Failed to launch installer: ${error}\n\nPlease manually download from GitHub releases.`);
              } else {
                // Installer launched successfully - close app so installer can run
                console.log('Installer launched successfully, closing app...');
                app.quit();
              }
            });
          } else {
            // Last resort: Open GitHub releases for manual download
            console.warn('Could not find downloaded installer, opening GitHub releases');
            shell.openExternal(`https://github.com/hadefuwa/homeschool-hub/releases/tag/v${info.version}`);
            dialog.showMessageBox(targetWindow, {
              type: 'warning',
              title: 'Installer Not Found',
              message: 'Could not locate the downloaded installer automatically.',
              detail: 'Opening GitHub releases page. Please download and run the installer manually.\n\nWindows may show a security warning - click "More info" then "Run anyway" to proceed.',
              buttons: ['OK']
            });
          }
        }
      });
    } else {
      // Window not ready yet, wait a bit and try again
      setTimeout(showDialog, 1000);
    }
  };
  showDialog();
});

function createWindow() {
  const isDev = !app.isPackaged;
  
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: 'Homeschool Hub',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js').replace(/\\/g, '/'),
    },
    show: false,
  });

  // Remove menu bar completely
  Menu.setApplicationMenu(null);
  
  // Load the app
  const chromeUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36';
  mainWindow.webContents.setUserAgent(chromeUA);

  if (isDev) {
    // Development: load from Vite dev server
    mainWindow.loadURL('http://localhost:3000');
    // Don't auto-open dev tools, but they're still available via F12 or Ctrl+Shift+I
  } else {
    // Production: load from built files
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.maximize();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
  });
}

// IPC handlers for data persistence
ipcMain.handle('load-data', async () => {
  try {
    return await loadData(getDefaultDataFunc);
  } catch (error) {
    console.error('Error loading data:', error);
    return getDefaultDataFunc();
  }
});

ipcMain.handle('save-data', async (event, data) => {
  try {
    await saveData(data);
    return { success: true };
  } catch (error) {
    console.error('Error saving data:', error);
    return { success: false, error: error.message };
  }
});

// IPC handlers for activity logging
ipcMain.handle('write-activity-log', async (event, entry) => {
  try {
    await writeActivityLog(entry);
    return { success: true };
  } catch (error) {
    console.error('Error writing activity log:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('read-activity-log', async (event, limit) => {
  try {
    const entries = await readActivityLog(limit);
    return { success: true, entries };
  } catch (error) {
    console.error('Error reading activity log:', error);
    return { success: false, error: error.message, entries: [] };
  }
});

// IPC handlers for auto-updater
ipcMain.handle('check-for-updates', async () => {
  if (app.isPackaged) {
    try {
      const result = await autoUpdater.checkForUpdates();
      return { success: true, updateInfo: result?.updateInfo || null };
    } catch (error) {
      console.error('Error checking for updates:', error);
      return { success: false, error: error.message };
    }
  } else {
    return { success: false, error: 'Update check only available in production' };
  }
});

ipcMain.handle('download-update', async () => {
  if (app.isPackaged) {
    try {
      await autoUpdater.downloadUpdate();
      return { success: true };
    } catch (error) {
      console.error('Error downloading update:', error);
      return { success: false, error: error.message };
    }
  } else {
    return { success: false, error: 'Update download only available in production' };
  }
});

ipcMain.handle('install-update', async () => {
  if (app.isPackaged) {
    try {
      autoUpdater.quitAndInstall(false, true);
      return { success: true };
    } catch (error) {
      console.error('Error installing update:', error);
      return { success: false, error: error.message };
    }
  } else {
    return { success: false, error: 'Update install only available in production' };
  }
});

ipcMain.handle('get-app-version', () => {
  return { version: app.getVersion() };
});

ipcMain.handle('open-external', async (event, url) => {
  try {
    await shell.openExternal(url);
    return { success: true };
  } catch (error) {
    console.error('Error opening external URL:', error);
    return { success: false, error: error.message };
  }
});

// TTS state management using say.js (native OS TTS)
let currentTTSProcess = null;

// IPC handlers for TTS using say.js (native OS TTS - Windows SAPI)
ipcMain.handle('tts-speak', async (event, { text, voice }) => {
  try {
    // Stop any current speech
    if (currentTTSProcess) {
      say.stop();
      currentTTSProcess = null;
    }

    if (!text || typeof text !== 'string') {
      return { success: false, error: 'Invalid text provided' };
    }

    // Try multiple voice names - prefer female voices
    const voicePriority = [
      'Microsoft Susan - English (United Kingdom)',
      'Microsoft Hazel - English (United Kingdom)',
      'Microsoft Zira Desktop - English (United States)',
      'Microsoft Zira Desktop',
      'Microsoft Emma - English (United States)',
      'Microsoft Emma',
      'Microsoft Aria Online - English (United States)',
      'Microsoft Aria',
      'Microsoft David Desktop',
      'Microsoft George - English (United Kingdom)'
    ];
    
    let selectedVoice = voice;
    if (!selectedVoice) {
      // Try each voice in priority order
      const availableVoices = say.getInstalledVoices();
      console.log('Available voices:', availableVoices);
      
      for (const tryVoice of voicePriority) {
        if (availableVoices && availableVoices.includes(tryVoice)) {
          selectedVoice = tryVoice;
          console.log('Selected voice:', selectedVoice);
          break;
        }
      }
      
      if (!selectedVoice) {
        selectedVoice = availableVoices && availableVoices[0];
        console.log('Using first available voice:', selectedVoice);
      }
    }
    
    return new Promise((resolve) => {
      say.speak(text, selectedVoice, 1.0, (err) => {
        currentTTSProcess = null;
        if (err) {
          console.error('TTS error:', err);
          resolve({ success: false, error: err.message });
        } else {
          resolve({ success: true });
        }
      });
      currentTTSProcess = true;
    });
  } catch (error) {
    console.error('Error in TTS speak:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('tts-stop', async () => {
  try {
    say.stop();
    currentTTSProcess = null;
    return { success: true };
  } catch (error) {
    console.error('Error stopping TTS:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('tts-get-voices', async () => {
  try {
    // Get available voices from the OS
    const voices = say.getInstalledVoices() || [];
    return { success: true, voices };
  } catch (error) {
    console.error('Error getting voices:', error);
    return { success: false, error: error.message, voices: [] };
  }
});

// IPC handler for saving drawings
ipcMain.handle('save-drawing', async (event, { imageData, lessonId, lessonTitle, studentId }) => {
  try {
    // Create drawings directory in the same location as data.json (Desktop/HomeschoolHub/drawings)
    const userHome = app.getPath('home');
    const desktopPath = path.join(userHome, 'Desktop');
    const appDir = path.join(desktopPath, 'HomeschoolHub');
    const drawingsDir = path.join(appDir, 'drawings');
    
    if (!fs.existsSync(drawingsDir)) {
      fs.mkdirSync(drawingsDir, { recursive: true });
    }
    
    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `drawing_student${studentId}_lesson${lessonId}_${timestamp}.png`;
    const filePath = path.join(drawingsDir, filename);
    
    // Convert base64 to buffer and save
    const base64Data = imageData.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filePath, buffer);
    
    console.log('Drawing saved to:', filePath);
    
    return { 
      success: true, 
      filePath: filePath,
      filename: filename 
    };
  } catch (error) {
    console.error('Error saving drawing:', error);
    return { success: false, error: error.message };
  }
});

// IPC handler for loading drawing images (for parent review)
ipcMain.handle('load-drawing', async (event, filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error('Drawing file not found');
    }
    
    const imageBuffer = fs.readFileSync(filePath);
    const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;
    
    return { success: true, imageData: base64Image };
  } catch (error) {
    console.error('Error loading drawing:', error);
    return { success: false, error: error.message };
  }
});

// Register custom protocol for serving blockly-games files
function registerBlocklyProtocol() {
  const isDev = !app.isPackaged;
  
  protocol.registerFileProtocol('blockly', (request, callback) => {
    let url = request.url.replace('blockly://', '').replace(/\/$/, ''); // Remove trailing slash
    
    // Handle relative paths that don't include the full blockly-games path
    // When browser resolves relative paths in custom protocols, it sometimes
    // resolves them incorrectly (e.g., common/storage.js from blockly-games/en/maze.html
    // might resolve to blockly-games/common/storage.js instead of blockly-games/en/common/storage.js)
    
    // Check for mis-resolved paths that should be in en/common/ but are in common/
    // This handles: blockly-games/common/storage.js -> blockly-games/en/common/storage.js
    if (url.startsWith('blockly-games/common/')) {
      // This is a mis-resolved relative path - fix it to include 'en/'
      url = url.replace('blockly-games/common/', 'blockly-games/en/common/');
    } 
    // Check for any blockly-games path that references common/ but doesn't have en/ in it
    else if (url.startsWith('blockly-games/') && 
             !url.includes('/en/') && 
             url.includes('/common/')) {
      // Another case of mis-resolved path - insert 'en/' after 'blockly-games/'
      url = url.replace('blockly-games/', 'blockly-games/en/');
    }
    
    // Ensure it starts with blockly-games
    if (!url.startsWith('blockly-games/')) {
      url = 'blockly-games/' + url;
    }
    
    let filePath;
    
    if (isDev) {
      // Development: serve from public folder
      filePath = path.join(__dirname, '../public', url);
    } else {
      // Production: serve from dist folder (packaged in resources)
      // In packaged app, dist folder is at resources/app/dist
      const appPath = app.getAppPath();
      filePath = path.join(appPath, 'dist', url);
    }
    
    // Normalize path separators for Windows
    filePath = path.normalize(filePath);
    
    console.log('[Blockly Protocol] Request:', request.url);
    console.log('[Blockly Protocol] Resolved URL:', url);
    console.log('[Blockly Protocol] File Path:', filePath);
    
    // Check if file exists, if not, try to find it
    if (!fs.existsSync(filePath)) {
      console.warn('[Blockly Protocol] File not found:', filePath);
      // Try alternative paths
      const alternatives = [
        path.join(__dirname, '../public/blockly-games/en/common/storage.js'),
        path.join(__dirname, '../public', url.replace('blockly-games/', '')),
      ];
      
      for (const altPath of alternatives) {
        const normalizedAlt = path.normalize(altPath);
        if (fs.existsSync(normalizedAlt)) {
          console.log('[Blockly Protocol] Using alternative path:', normalizedAlt);
          callback({ path: normalizedAlt });
          return;
        }
      }
      
      console.error('[Blockly Protocol] File not found and no alternatives found:', filePath);
      callback({ error: -6 }); // FILE_NOT_FOUND
      return;
    }
    
    callback({ path: filePath });
  });
}

// Register custom protocol for serving HTML game files
function registerHTMLGameProtocol() {
  const isDev = !app.isPackaged;
  
  protocol.registerFileProtocol('htmlgame', (request, callback) => {
    let url = request.url.replace('htmlgame://', '').replace(/\/$/, ''); // Remove trailing slash
    
    // Ensure it starts with html-games
    if (!url.startsWith('html-games/')) {
      url = 'html-games/' + url;
    }
    
    let filePath;
    
    if (isDev) {
      // Development: serve from public folder
      filePath = path.join(__dirname, '../public', url);
    } else {
      // Production: serve from dist folder (packaged in resources)
      // In packaged app, dist folder is at resources/app/dist
      const appPath = app.getAppPath();
      filePath = path.join(appPath, 'dist', url);
    }
    
    // Normalize path separators for Windows
    filePath = path.normalize(filePath);
    
    console.log('[HTMLGame Protocol] Request:', request.url);
    console.log('[HTMLGame Protocol] Resolved URL:', url);
    console.log('[HTMLGame Protocol] File Path:', filePath);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error('[HTMLGame Protocol] File not found:', filePath);
      callback({ error: -6 }); // FILE_NOT_FOUND
      return;
    }
    
    callback({ path: filePath });
  });
}

// Modify headers and CSP for security and functionality
function setupHeadersAndCSP() {
  const isDev = !app.isPackaged;
  const rendererUrl = isDev ? 'http://localhost:3000' : 'file://'; // Base for Referer

  // Add Referer and User-Agent for YouTube requests
  session.defaultSession.webRequest.onBeforeSendHeaders(
    { urls: ['*://*.youtube.com/*', '*://*.googlevideo.com/*', '*://*.youtube-nocookie.com/*'] },
    (details, callback) => {
      const { url, resourceType, requestHeaders } = details;
      const isYouTube = url.includes('youtube.com') || url.includes('youtube-nocookie.com') || url.includes('googlevideo.com');
      
      if (isYouTube) {
        // Use a "public" looking domain only for the initial iframe load (subFrame)
        // to bypass the domain restriction (Error 152-4)
        const publicDomain = 'https://homeschool-hub.io';
        
        if (resourceType === 'subFrame') {
          requestHeaders['Referer'] = publicDomain;
          requestHeaders['Origin'] = publicDomain;
          requestHeaders['Sec-Fetch-Site'] = 'cross-site';
          requestHeaders['Sec-Fetch-Mode'] = 'navigate';
          requestHeaders['Sec-Fetch-Dest'] = 'iframe';
        } else if (resourceType === 'xhr' || resourceType === 'fetch') {
          // For internal API calls (youtubei/v1/player), let YouTube's own context work.
          // Don't force our fake public domain here as it triggers 403 Forbidden (CORS).
          const originHost = url.includes('youtube-nocookie.com') ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com';
          requestHeaders['Origin'] = originHost;
          // Referer for API calls is usually the embed URL
          if (!requestHeaders['Referer'] || !requestHeaders['Referer'].includes('youtube')) {
             requestHeaders['Referer'] = `${originHost}/`;
          }
          requestHeaders['Sec-Fetch-Site'] = 'same-origin';
          requestHeaders['Sec-Fetch-Mode'] = 'cors';
          requestHeaders['Sec-Fetch-Dest'] = 'empty';
        }

        // Standard recent Chrome UA
        requestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36';

        // Strip Electron signals
        Object.keys(requestHeaders).forEach(key => {
          if (key.toLowerCase().startsWith('sec-ch-ua')) {
            delete requestHeaders[key];
          }
        });
      }
      
      callback({ requestHeaders });
    }
  );

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const responseHeaders = { ...details.responseHeaders };
    const { url } = details;
    
    // Fix CORS for googlevideo.com which sometimes sends the wrong Access-Control-Allow-Origin
    // (e.g., sends https://www.youtube.com when the origin is https://www.youtube-nocookie.com)
    if (url.includes('googlevideo.com')) {
      // Force allow the origin from which the request was made
      responseHeaders['Access-Control-Allow-Origin'] = ['https://www.youtube-nocookie.com'];
      responseHeaders['Access-Control-Allow-Methods'] = ['GET, POST, OPTIONS, HEAD'];
      responseHeaders['Access-Control-Allow-Headers'] = ['Range, Content-Type, x-client-data, x-goog-visitor-id'];
      responseHeaders['Access-Control-Expose-Headers'] = ['Content-Length, Content-Range, X-Content-Type-Options'];
      responseHeaders['Access-Control-Allow-Credentials'] = ['true'];
      
      // Remove any conflicting CSP or frame-options from googlevideo
      delete responseHeaders['x-frame-options'];
      delete responseHeaders['content-security-policy'];
    }

    // Modify CSP to allow custom protocols in frames and YouTube embeds
    if (responseHeaders['content-security-policy']) {
      responseHeaders['content-security-policy'] = [
        "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: file: blockly: htmlgame: https://www.gstatic.com https://fonts.gstatic.com https://cdn.jsdelivr.net; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com https://cdn.jsdelivr.net https://www.youtube.com https://www.youtube-nocookie.com https://s.ytimg.com https://static.doubleclick.net https://www.google.com; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "connect-src 'self' https://www.gstatic.com https://fonts.gstatic.com https://cdn.jsdelivr.net https://www.youtube.com https://www.youtube-nocookie.com https://*.googlevideo.com https://*.doubleclick.net https://*.googleadservices.com https://*.google.com https://*.googleapis.com; " +
        "img-src 'self' data: blob: file: https:; " +
        "font-src 'self' data: file: https://fonts.gstatic.com; " +
        "worker-src 'self' blob:; " +
        "child-src 'self' blob:; " +
        "frame-src *; "
      ];
    }
    
    // Filter out problematic Permissions-Policy headers
    if (responseHeaders['permissions-policy']) {
      const policies = responseHeaders['permissions-policy'];
      if (Array.isArray(policies)) {
        responseHeaders['permissions-policy'] = policies.map(policy => {
          if (typeof policy === 'string') {
            return policy.split(',').filter(p => !p.trim().includes('ch-ua-form-factors')).join(',');
          }
          return policy;
        }).filter(p => p && p.trim().length > 0);
      } else if (typeof policies === 'string') {
        const filtered = policies.split(',').filter(p => !p.trim().includes('ch-ua-form-factors')).join(',');
        if (filtered) responseHeaders['permissions-policy'] = [filtered];
        else delete responseHeaders['permissions-policy'];
      }
    }
    
    callback({ responseHeaders });
  });
}


app.whenReady().then(async () => {
  // Clear storage data to prevent any sticky "video unavailable" issues based on cached state
  try {
    await session.defaultSession.clearStorageData({
      storages: ['cookies', 'localstorage', 'caches'],
    });
    console.log('Cleared storage data for fresh session');
  } catch (error) {
    console.error('Error clearing storage data:', error);
  }

  // Setup headers and CSP for YouTube and other external resources
  setupHeadersAndCSP();

  // Register custom protocols before creating window
  registerBlocklyProtocol();
  registerHTMLGameProtocol();
  
  createWindow();
  
  // Check for updates after app is ready (only in production)
  if (!app.isPackaged) {
    console.log('Skipping update check in development mode');
  } else {
    // Wait a moment for window to be ready, then check for updates
    setTimeout(() => {
      console.log('Checking for updates...');
      autoUpdater.checkForUpdates().catch(err => {
        console.error('Error initiating update check:', err);
      });
    }, 2000);
    
    // Check for updates every 4 hours
    setInterval(() => {
      console.log('Periodic update check...');
      autoUpdater.checkForUpdates().catch(err => {
        console.error('Error in periodic update check:', err);
      });
    }, 4 * 60 * 60 * 1000);
  }

  // Register keyboard shortcuts for dev tools
  globalShortcut.register('CommandOrControl+Shift+I', () => {
    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
      focusedWindow.webContents.toggleDevTools();
    }
  });
  
  // Also register F12
  globalShortcut.register('F12', () => {
    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
      focusedWindow.webContents.toggleDevTools();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // Unregister all shortcuts when app closes
  globalShortcut.unregisterAll();
  
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  // Unregister all shortcuts before quitting
  globalShortcut.unregisterAll();
});

app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    require('electron').shell.openExternal(navigationUrl);
  });
});


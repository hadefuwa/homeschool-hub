import { app, BrowserWindow, ipcMain, Menu, globalShortcut, protocol, session } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadData, saveData } from './persistence.js';

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
]);

// Default data function - returns empty structure
// Lessons will be added by mergeDefaultLessons in the React app
const getDefaultDataFunc = () => {
  return {
    students: [],
    lessons: [],
    quizzes: [],
    progress: [],
    videoResources: [],
  };
};

let mainWindow;

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

// Register custom protocol for serving blockly-games files
function registerBlocklyProtocol() {
  const isDev = !app.isPackaged;
  
  protocol.registerFileProtocol('blockly', (request, callback) => {
    const url = request.url.replace('blockly://', '');
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
    
    console.log('[Blockly Protocol] Serving:', url, '->', filePath);
    callback({ path: filePath });
  });
}

// Modify CSP headers to allow blockly:// protocol and be more permissive for frames
function setupCSPModification() {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const responseHeaders = { ...details.responseHeaders };
    
    // Modify CSP to allow custom protocols in frames
    if (responseHeaders['content-security-policy']) {
      // Replace existing CSP with one that allows blockly:// and is more permissive for frames
      responseHeaders['content-security-policy'] = [
        "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: file: blockly: https://www.gstatic.com https://fonts.gstatic.com; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "connect-src 'self' https://www.gstatic.com https://fonts.gstatic.com; " +
        "img-src 'self' data: blob: file: https:; " +
        "font-src 'self' data: file: https://fonts.gstatic.com; " +
        "frame-src *; "  // Allow all sources in frames (needed for custom protocols)
      ];
    }
    
    callback({ responseHeaders });
  });
}

app.whenReady().then(() => {
  // Setup CSP modification to allow blockly:// protocol
  setupCSPModification();
  
  // Register custom protocol before creating window
  registerBlocklyProtocol();
  
  createWindow();

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


# Electron Setup Guide

This guide explains how to use the Electron version of Homeschool Hub.

## Overview

The app is built with Electron, which wraps a web-based interface in a native desktop application. This provides:
- Easy distribution as a standalone executable
- Cross-platform support (Windows, macOS, Linux)
- Native desktop experience
- Automatic updates capability (can be configured)

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   flutter pub get
   ```

2. **Build Flutter web app:**
   ```bash
   flutter build web
   ```

3. **Run Electron app:**
   ```bash
   npm start
   ```

## Development Workflow

### Running in Development

1. Make changes to your code in `lib/`
2. Rebuild the web app:
   ```bash
   flutter build web
   ```
3. Restart Electron:
   ```bash
   npm start
   ```

### Hot Reload (Web Development)

For faster development, you can run a web dev server and point Electron to it:

1. Start web dev server:
   ```bash
   flutter run -d chrome --web-port=8080
   ```

2. Modify `main.js` to load from `http://localhost:8080` in development mode (already configured)

## Building for Distribution

### Build All Platforms
```bash
npm run dist
```

This command will:
1. Build the web app (`flutter build web`)
2. Package it with Electron Builder
3. Create installers for:
   - **Windows**: NSIS installer (`.exe`)
   - **macOS**: DMG file
   - **Linux**: AppImage

Output files will be in the `dist/` directory.

### Platform-Specific Builds

You can also build for specific platforms:

```bash
# Windows only
npm run dist -- --win

# macOS only
npm run dist -- --mac

# Linux only
npm run dist -- --linux
```

## Project Structure

```
.
├── main.js              # Electron main process
├── package.json         # Node.js dependencies and build config
├── build/
│   └── web/            # Web build output (generated)
├── lib/                # Source code
└── dist/               # Electron build output (generated)
```

## Configuration

### Window Settings

Edit `main.js` to customize the Electron window:
- Window size (width, height)
- Minimum size (minWidth, minHeight)
- Window title
- Icon

### Build Configuration

Edit `package.json` under the `build` section to customize:
- App ID
- Product name
- Icons
- Installer settings

## Troubleshooting

### Electron app shows blank screen

1. Check that web build exists:
   ```bash
   ls build/web/index.html
   ```

2. Rebuild web app:
   ```bash
   flutter clean
   flutter build web
   ```

3. Check Electron console for errors (DevTools will open in development)

### Build fails

1. Ensure all dependencies are installed:
   ```bash
   npm install
   flutter pub get
   ```

2. Clean and rebuild:
   ```bash
   flutter clean
   flutter build web
   npm run dist
   ```

### Path issues on Windows

If you encounter path issues, ensure you're using forward slashes in `main.js` or use `path.join()` (already implemented).

## Advanced Features

### Auto-Updates

To add auto-update functionality, consider using:
- `electron-updater` for automatic updates
- Code signing for distribution

### Native Integrations

Electron allows you to add native features:
- File system access
- System notifications
- Native menus
- Tray icons

See `main.js` for examples of security best practices.

## Security Notes

The Electron app is configured with security best practices:
- `nodeIntegration: false` - Prevents Node.js access from renderer
- `contextIsolation: true` - Isolates context
- `webSecurity: true` - Enables web security features

## Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [Electron Builder Documentation](https://www.electron.build/)


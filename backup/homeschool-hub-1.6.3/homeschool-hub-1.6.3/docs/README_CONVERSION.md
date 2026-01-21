# React + Electron Conversion - Setup Guide

## What's Been Converted

✅ **Data Models** - All Flutter models converted to JavaScript classes
✅ **Data Store** - Zustand store replacing Flutter's Provider/ChangeNotifier
✅ **Persistence Layer** - Electron file system integration
✅ **React App Structure** - Basic React app with routing
✅ **First Screen** - SubjectSelectionScreen converted
✅ **Build Configuration** - Vite + Electron setup

## Project Structure

```
.
├── electron/
│   ├── main.js          # Electron main process
│   ├── preload.js       # Preload script (IPC bridge)
│   └── persistence.js   # File I/O operations
├── src/
│   ├── models/          # Data models (Student, Lesson, Quiz, etc.)
│   ├── store/           # Zustand store (dataStore.js)
│   ├── screens/         # React screen components
│   ├── data/            # Default data
│   ├── App.jsx          # Root React component
│   └── main.jsx         # React entry point
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```

## Installation

```bash
npm install
```

## Development

### Run in Development Mode

```bash
npm start
```

This will:
1. Start Vite dev server on http://localhost:3000
2. Wait for server to be ready
3. Launch Electron app

### Run Separately

```bash
# Terminal 1: Start Vite dev server
npm run dev

# Terminal 2: Start Electron (after Vite is running)
npm run electron
```

## Building for Production

```bash
# Build React app
npm run build

# Package Electron app
npm run dist
```

## Next Steps

1. **Convert Remaining Screens** - Convert all 15 screens to React components
2. **Add Lesson Data** - Import and convert all lesson data from Flutter
3. **Implement Games** - Convert clicking/keyboard games to Canvas
4. **Add Styling** - Implement Material Design or custom theme
5. **Testing** - Test all functionality

## Current Status

- ✅ Core infrastructure complete
- ✅ Data layer converted
- ✅ First screen working
- ⏳ Remaining screens to convert
- ⏳ Lesson data to import
- ⏳ Games to convert



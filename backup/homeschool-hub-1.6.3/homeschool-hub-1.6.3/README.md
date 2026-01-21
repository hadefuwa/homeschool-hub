# Homeschool Hub

A cross-platform homeschool learning management application built with **React** and **Electron**. This desktop app allows students to access lessons, take quizzes, watch educational videos, and track their progress across multiple subjects and year levels.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Electron](https://img.shields.io/badge/Electron-28.0.0-47848F?logo=electron)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)

## 🚀 Features

### Core Features
- **📚 Subject Management**: Organize lessons by subject (Maths, English, Science, History, etc.)
- **📖 Interactive Lessons**: Browse and complete lessons with markdown content and embedded YouTube videos
- **✅ Quizzes**: Take interactive quizzes with automatic scoring and progress tracking
- **🎥 Video Resources**: Watch educational videos integrated into lessons
- **📊 Progress Tracking**: View completion history, quiz scores, and overall progress
- **🎮 Interactive Games**: Educational games like clicking and keyboard games
- **👥 Student Management**: Track progress for multiple students
- **📱 Cross-Platform**: Runs on Windows, macOS, and Linux

### Upcoming Features
- **🔊 Text-to-Speech (TTS)**: Read quiz questions and answers aloud (see [TTS_IMPLEMENTATION_PLAN.md](./docs/TTS_IMPLEMENTATION_PLAN.md))
- Enhanced accessibility features
- More interactive learning games

### Auto-Updates
- **🔄 Automatic Updates**: The app automatically checks for and installs updates (see [AUTO_UPDATE_SETUP.md](./docs/AUTO_UPDATE_SETUP.md))

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2.0
- **Desktop Framework**: Electron 28.0.0
- **Build Tool**: Vite 5.0.8
- **State Management**: Zustand 4.4.7
- **Routing**: React Router DOM 6.20.0
- **Content Rendering**: React Markdown 9.0.1
- **Data Storage**: Local JSON files (via Electron IPC)

## 📋 Prerequisites

- **Node.js** (v16 or higher) and npm
- **Git** (for cloning the repository)

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hadefuwa/homeschool-hub.git
   cd homeschool-hub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Verify installation:**
   ```bash
   npm run electron
   ```

## 🎮 Running the App

### Development Mode

Run the app in development mode with hot reload:

```bash
npm start
```

This will:
- Start the Vite dev server on `http://localhost:3000`
- Launch the Electron app
- Enable hot module replacement for React components

### Development (Separate Commands)

You can also run the dev server and Electron separately:

```bash
# Terminal 1: Start Vite dev server
npm run dev

# Terminal 2: Start Electron (after dev server is running)
npm run electron
```

### Production Build

Build the app for production:

```bash
npm run build
```

This creates optimized production files in the `dist/` directory.

## 📦 Building for Distribution

Package the app for distribution on Windows, macOS, and Linux:

```bash
npm run dist
```

This will:
1. Build the React app for production
2. Package it into an Electron app
3. Create installers:
   - **Windows**: NSIS installer (`.exe`)
   - **macOS**: DMG file
   - **Linux**: AppImage

Output files will be in the `dist/` directory.

### Build Configuration

The build configuration is in `package.json`. Icons and app metadata can be customized there.

## 📁 Project Structure

```
homeschool-hub-electron/
├── electron/              # Electron main process files
│   ├── main.js           # Main Electron process
│   ├── preload.js        # Preload script (IPC bridge)
│   └── persistence.js    # Data persistence utilities
├── src/                   # React application source
│   ├── components/       # Reusable React components
│   │   ├── ClickingGame.jsx
│   │   ├── MarkdownWithYouTube.jsx
│   │   ├── TopNavigation.jsx
│   │   └── YouTubeEmbed.jsx
│   ├── screens/          # Main application screens
│   │   ├── SubjectSelectionScreen.jsx
│   │   ├── LessonsListScreen.jsx
│   │   ├── LessonViewScreen.jsx
│   │   └── QuizScreen.jsx
│   ├── models/           # Data models
│   │   ├── AppData.js
│   │   ├── Lesson.js
│   │   ├── Quiz.js
│   │   ├── Question.js
│   │   └── ...
│   ├── store/            # State management (Zustand)
│   │   └── dataStore.js
│   ├── data/             # Default data and lessons
│   │   ├── defaultData.js
│   │   └── lessons/      # Lesson data by year
│   ├── utils/            # Utility functions
│   │   └── youtube.js
│   ├── App.jsx           # Main React component
│   └── main.jsx          # React entry point
├── assets/               # Static assets
│   ├── quizzes.json
│   └── videos/          # Local video files
├── scripts/              # Utility scripts
│   └── convert-*.js     # Data conversion scripts
├── docs/                 # Documentation and planning documents
├── package.json          # Node.js dependencies and scripts
└── vite.config.js       # Vite configuration
```

## 💾 Data Storage

The app stores all data locally in JSON format. Data is automatically saved to:

- **Windows**: `%LOCALAPPDATA%\HomeschoolHub\data.json`
- **macOS**: `~/Library/Application Support/HomeschoolHub/data.json`
- **Linux**: `~/.local/share/HomeschoolHub/data.json`

### Data Structure

The app stores:
- Student profiles
- Lesson progress and completion
- Quiz scores and results
- Custom lessons and quizzes (if added)

All data persists between app sessions automatically.

## 📚 Default Content

The app comes with sample educational content:

- **Subjects**: Maths, English, Science, History, Geography, Art, Design & Technology
- **Year Levels**: Nursery, Reception, Year 1-6
- **Lessons**: Pre-configured lessons for each subject and year
- **Quizzes**: Interactive quizzes with automatic scoring
- **Videos**: YouTube video integration for lessons

## 🎯 Usage

1. **Select a Subject**: Choose a subject from the home screen
2. **Browse Lessons**: View available lessons for the selected subject
3. **Complete Lessons**: Read lesson content and watch embedded videos
4. **Take Quizzes**: Complete quizzes to test understanding
5. **Track Progress**: View your progress and scores

## 🔧 Development

### Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run electron` - Launch Electron app
- `npm start` - Run dev server and Electron concurrently
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run dist` - Build and package for distribution

### Hot Reload

The app supports hot module replacement in development mode. Changes to React components will automatically reload in the Electron window.

### Debugging

- **DevTools**: Press `F12` or `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (macOS) to open DevTools
- **Console Logs**: Check the Electron console for main process logs
- **React DevTools**: Install the React DevTools browser extension for component inspection

## 🗺️ Roadmap

### Planned Features
- [x] Basic lesson and quiz functionality
- [x] Progress tracking
- [x] Video integration
- [ ] **Text-to-Speech (TTS)** - See [TTS_IMPLEMENTATION_PLAN.md](./docs/TTS_IMPLEMENTATION_PLAN.md)
- [ ] Enhanced accessibility features
- [ ] More interactive games
- [ ] Export/import progress
- [ ] Custom lesson creation UI

## 📖 Documentation

- [TTS Implementation Plan](./docs/TTS_IMPLEMENTATION_PLAN.md) - Detailed plan for adding text-to-speech functionality
- [Electron Setup Guide](./docs/ELECTRON_SETUP.md) - Electron-specific setup instructions
- [Conversion Plan](./docs/CONVERSION_PLAN.md) - Migration and conversion documentation

## 🐛 Troubleshooting

### App won't start
- Ensure Node.js (v16+) is installed: `node --version`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Build errors
- Clear build cache: `rm -rf dist`
- Rebuild: `npm run build`

### Data not persisting
- Check file permissions in the data directory
- Verify Electron IPC is working (check console for errors)

### Video playback issues
- Ensure internet connection for YouTube videos
- Check browser console for CORS or network errors

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Electron](https://www.electronjs.org/)
- UI powered by [React](https://react.dev/)
- State management with [Zustand](https://zustand-demo.pmnd.rs/)
- Build tool: [Vite](https://vitejs.dev/)

## 📧 Contact

For questions or issues, please open an issue on GitHub.

---

**Note**: This app was originally built with Flutter/Dart but has been migrated to React with Electron. The legacy code has been removed.

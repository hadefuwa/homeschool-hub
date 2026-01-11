# Homeschool Hub - Electron

A cross-platform homeschool learning management application built with Electron. This app allows students to access lessons, take quizzes, watch educational videos, and track their progress.

## Migration to Electron

**This application has been converted to Electron** for easy desktop distribution. The app uses Electron to wrap a web-based interface, providing native desktop experience on Windows, macOS, and Linux.

### Key Features:
- **Framework**: Electron (Node.js + Chromium)
- **UI Framework**: Web-based interface
- **Navigation**: Client-side routing
- **State Management**: Provider pattern
- **Platform Support**: Cross-platform desktop (Windows, macOS, Linux)
- **Data Storage**: JSON file (local storage)
- **Video Embedding**: Web-based video players

All features have been preserved and enhanced in the Electron version.

## Features

- **Student Management**: Create and manage multiple student profiles
- **Lessons**: Browse and complete lessons in various subjects (Maths, Arduino, etc.)
- **Quizzes**: Take interactive quizzes with automatic scoring
- **Video Resources**: Watch educational videos (Fusion 360 tutorials, etc.)
- **Progress Tracking**: View completion history and quiz scores
- **Cross-Platform Desktop**: Runs on Windows, macOS, and Linux

## Prerequisites

### For Electron (Recommended)
- **Node.js** (v16 or higher) and npm
- **Flutter SDK** (latest stable version)
- **Dart SDK** (comes with Flutter)

### For Flutter Native Desktop
- Flutter SDK (latest stable version)
- Dart SDK (comes with Flutter)
- Platform-specific SDKs:
  - **Windows**: Windows SDK
  - **macOS**: Xcode
  - **Linux**: Development tools
  - **iOS**: Xcode (macOS only)
  - **Android**: Android Studio

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd homeschool-hub-electron
   ```

2. **Install Flutter dependencies:**
   ```bash
   flutter pub get
   ```

3. **Install Electron dependencies:**
   ```bash
   npm install
   ```

4. **Verify Flutter setup:**
   ```bash
   flutter doctor
   ```

5. **Build Flutter web app (required for Electron):**
   ```bash
   flutter build web
   ```

## Running the App

### Electron (Recommended for Desktop)
The app has been converted to Electron for easy desktop distribution:

1. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

2. **Build Flutter web app:**
   ```bash
   flutter build web
   ```

3. **Run Electron app:**
   ```bash
   npm start
   ```

4. **Package for distribution:**
   ```bash
   npm run dist
   ```

### Flutter Native Desktop

#### Windows
```bash
flutter run -d windows
```

#### macOS
```bash
flutter run -d macos
```

#### Linux
```bash
flutter run -d linux
```

### Mobile Platforms

#### iOS (macOS only)
```bash
flutter run -d ios
```

#### Android
```bash
flutter run -d android
```

## Building for Release

### Electron (Recommended)
Build and package the Electron app for distribution:
```bash
npm run dist
```

This will:
1. Build the Flutter web app
2. Package it into an Electron app
3. Create installers for Windows (NSIS), macOS (DMG), and Linux (AppImage)

Output will be in the `dist/` directory.

### Flutter Native

#### Windows
```bash
flutter build windows --release
```

#### macOS
```bash
flutter build macos --release
```

#### Linux
```bash
flutter build linux --release
```

#### iOS
```bash
flutter build ios --release
```

#### Android
```bash
flutter build apk --release
# or for app bundle:
flutter build appbundle --release
```

## Project Structure

```
lib/
├── main.dart                 # App entry point
├── models/                  # Data models
│   ├── student.dart
│   ├── lesson.dart
│   ├── quiz.dart
│   ├── question.dart
│   ├── progress.dart
│   └── video_resource.dart
├── data/                    # Data layer
│   ├── app_data.dart
│   ├── data_store.dart
│   └── default_data.dart
├── screens/                 # UI screens
│   ├── main_screen.dart
│   ├── student_selection_screen.dart
│   ├── lesson_list_screen.dart
│   ├── lesson_view_screen.dart
│   ├── quiz_list_screen.dart
│   ├── quiz_screen.dart
│   ├── video_list_screen.dart
│   ├── video_screen.dart
│   └── progress_screen.dart
├── widgets/                 # Reusable widgets
│   ├── category_card.dart
│   ├── lesson_card.dart
│   ├── quiz_card.dart
│   ├── video_card.dart
│   └── progress_item.dart
├── utils/                   # Utilities
│   ├── constants.dart
│   └── paths.dart
├── providers/               # State management
│   └── data_store_provider.dart
└── router/                 # Navigation
    └── app_router.dart
```

## Data Storage

The app stores data locally in JSON format. Data is saved to:
- **Windows**: `%LOCALAPPDATA%\HomeschoolHub\data.json`
- **macOS**: `~/Library/Application Support/HomeschoolHub/data.json`
- **Linux**: `~/.local/share/HomeschoolHub/data.json`

## Default Data

The app comes with sample data:
- **Maths Lessons**: Introduction to Numbers, Basic Addition
- **Arduino Lessons**: Introduction to Arduino, Programming Basics
- **Vikings Quiz**: History quiz with 5 questions
- **Fusion 360 Videos**: Tutorial videos (YouTube video IDs need to be updated)

## Dependencies

- `path_provider`: Local file storage paths
- `go_router`: Navigation
- `provider`: State management
- `youtube_player_flutter`: YouTube video playback
- `flutter_markdown`: Markdown rendering for lesson content
- `intl`: Date formatting

## Development

### Hot Reload
While the app is running, press `r` in the terminal to hot reload, or `R` for a full restart.

### Debugging
Use Electron DevTools (press F12 or Cmd+Option+I) or your IDE's debugger.

## Troubleshooting

### Node.js/Electron not found
Make sure Node.js is installed and added to your PATH.

### Dependencies not installing
Run `flutter pub get` again. If issues persist, try:
```bash
flutter clean
flutter pub get
```

### Platform-specific issues
- **Windows**: Ensure Windows desktop development is enabled: `flutter config --enable-windows-desktop`
- **macOS**: Ensure macOS desktop development is enabled: `flutter config --enable-macos-desktop`
- **Linux**: Ensure Linux desktop development is enabled: `flutter config --enable-linux-desktop`

## License

This project is an Electron-based desktop application for cross-platform homeschool management.

## Notes

- YouTube video IDs in `default_data.dart` are placeholders and should be replaced with actual video IDs
- The app uses Material Design 3 for the UI
- Data persists between app sessions automatically


# Flutter to Electron/JavaScript Conversion Plan

This document maps your Flutter codebase to pure JavaScript/HTML/CSS for Electron.

## 1. UI Layout Code

### Flutter Widgets Found:
- `MaterialApp` → Main app wrapper
- `Scaffold` → Page layout container
- `AppBar` → Header navigation
- `GridView` → Grid layouts (category cards)
- `Column/Row` → Flexbox layouts
- `Container` → Div elements with CSS
- `Card` → Card components
- `ElevatedButton` → Button elements
- `TextField` → Input elements
- `ListView` → Scrollable lists

### Conversion Target:
**Framework Choice: React (Recommended)**
- Material-UI or MUI for Material Design components
- Or Tailwind CSS for utility-first styling
- Component structure maps 1:1 with Flutter widgets

### Screens to Convert (15 total):
1. `MainScreen` → Home page with category grid
2. `SubjectSelectionScreen` → Subject selection page
3. `SequentialLessonsScreen` → Lessons list page
4. `YearsDashboardScreen` → Year selection
5. `SubjectsScreen` → Subject list
6. `CategoriesScreen` → Category list
7. `LessonsScreen` → Lesson list
8. `LessonViewScreen` → Lesson detail/viewer
9. `QuizScreen` → Quiz interface
10. `QuizListScreen` → Quiz list
11. `ResultsScreen` → Progress/results dashboard
12. `ProgressScreen` → Progress tracking
13. `StudentSelectionScreen` → Student management
14. `ClickingGameScreen` → Interactive game (Canvas)
15. `KeyboardGameScreen` → Interactive game (Canvas)

**Action Items:**
- [ ] Create React component structure
- [ ] Set up routing (React Router)
- [ ] Convert each screen to React component
- [ ] Implement Material Design theme

---

## 2. State Management

### Flutter Pattern:
- `ChangeNotifier` (DataStore class)
- `Provider` for dependency injection
- `setState` in StatefulWidgets (games)

### Conversion Target:
**Option A: Zustand (Recommended - Simple)**
```javascript
// store/dataStore.js
import create from 'zustand';

const useDataStore = create((set) => ({
  students: [],
  lessons: [],
  quizzes: [],
  progress: [],
  adminMode: false,
  
  loadData: async () => { /* ... */ },
  saveData: async () => { /* ... */ },
  toggleAdminMode: () => set((state) => ({ adminMode: !state.adminMode })),
}));
```

**Option B: Redux Toolkit (More structured)**
- Better for complex state management
- More boilerplate but more scalable

**Option C: React Context + useReducer**
- Built-in, no dependencies
- Good for medium complexity

### Source of Truth Variables:
- `students` - Student list
- `lessons` - All lessons
- `quizzes` - All quizzes
- `progress` - Completion tracking
- `adminMode` - Admin toggle
- Game state: `score`, `hits`, `misses`, `timeRemaining`, `isPlaying`

**Action Items:**
- [ ] Extract DataStore logic to pure functions
- [ ] Create JavaScript store module
- [ ] Convert all state mutations
- [ ] Set up store provider/wrapper

---

## 3. Navigation and Routing

### Flutter Pattern:
- `GoRouter` with named routes
- Query parameters for passing data
- 15+ routes defined

### Conversion Target:
**React Router v6**
```javascript
// router.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<SubjectSelectionScreen />} />
  <Route path="/lessons" element={<SequentialLessonsScreen />} />
  <Route path="/lesson/:id" element={<LessonViewScreen />} />
  <Route path="/quiz/:id" element={<QuizScreen />} />
  // ... etc
</Routes>
```

### Route Mapping:
| Flutter Route | JavaScript Route |
|--------------|------------------|
| `/` | `/` |
| `/sequential-lessons?subjectId=X` | `/lessons?subjectId=X` |
| `/lesson-view?id=X` | `/lesson/:id` |
| `/quiz?id=X` | `/quiz/:id` |
| `/results` | `/results` |
| `/student-selection` | `/students` |

**Action Items:**
- [ ] Set up React Router
- [ ] Convert all routes
- [ ] Handle query parameters
- [ ] Implement navigation helpers

---

## 4. Assets

### Flutter Assets:
- Videos: `assets/videos/fusion360/*.mp4`
- Icons: `web/icons/*.png`
- Fonts: Material Icons (from package)

### Conversion Target:
**Static Assets Folder**
```
public/
  videos/
    fusion360/
      *.mp4
  icons/
    *.png
  fonts/
    MaterialIcons-Regular.woff2
```

**Loading:**
- Videos: `<video>` tag or HTML5 video player
- Images: `<img>` tags
- Fonts: CSS `@font-face`

**Action Items:**
- [ ] Copy all assets to `public/` folder
- [ ] Update all asset references
- [ ] Set up video player component
- [ ] Configure font loading

---

## 5. Persistence

### Flutter Pattern:
- `File` I/O with JSON
- Saves to Desktop/HomeschoolHub/data.json
- Uses `path_provider` for paths

### Conversion Target:
**Electron + Node.js File System**
```javascript
// store/persistence.js
import { app } from 'electron';
import { promises as fs } from 'fs';
import path from 'path';
import { desktopDir } from '@tauri-apps/api/path'; // or use Electron's app.getPath

const getDataPath = () => {
  const userHome = app.getPath('home');
  return path.join(userHome, 'Desktop', 'HomeschoolHub', 'data.json');
};

export const loadData = async () => {
  try {
    const dataPath = getDataPath();
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return getDefaultData();
  }
};

export const saveData = async (data) => {
  const dataPath = getDataPath();
  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
};
```

**Alternative: IndexedDB (Browser-only)**
- If you want browser compatibility
- More complex but works offline

**Action Items:**
- [ ] Create persistence module
- [ ] Implement file I/O in Electron main process
- [ ] Set up IPC communication (main ↔ renderer)
- [ ] Migrate data loading/saving logic

---

## 6. Plugins and Native APIs

### Flutter Dependencies:
- `path_provider` → Node.js `path` + `fs`
- `video_player` → HTML5 `<video>` or video.js
- `url_launcher` → Electron `shell.openExternal()`
- `flutter_markdown` → `react-markdown` or `marked`
- `go_router` → `react-router-dom`
- `provider` → Zustand/Redux/Context

### Platform Checks:
**Flutter:**
```dart
Platform.isWindows
Platform.isMacOS
Platform.isLinux
```

**Electron:**
```javascript
process.platform === 'win32'
process.platform === 'darwin'
process.platform === 'linux'
```

**Action Items:**
- [ ] Replace all platform checks
- [ ] Convert video player
- [ ] Set up markdown renderer
- [ ] Implement URL launcher via Electron

---

## 7. Drawing/Canvas (Games)

### Flutter Pattern:
- `ClickingGameScreen` - Custom target rendering
- `KeyboardGameScreen` - Custom rendering
- Uses `Timer` for game loops
- Custom painting logic

### Conversion Target:
**HTML5 Canvas + RequestAnimationFrame**
```javascript
// games/ClickingGame.js
import { useEffect, useRef } from 'react';

function ClickingGame() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationId;
    const gameLoop = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw targets
      targets.forEach(target => {
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
        ctx.fillStyle = target.color;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(gameLoop);
    };
    
    gameLoop();
    
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  return <canvas ref={canvasRef} onClick={handleClick} />;
}
```

**Alternative: PixiJS**
- Better for complex 2D games
- More features but larger bundle

**Action Items:**
- [ ] Convert game logic to pure functions
- [ ] Implement Canvas rendering
- [ ] Replace Timer with requestAnimationFrame
- [ ] Port game state management

---

## 8. App Entry and Structure

### Flutter Structure:
```
main() → runApp() → MaterialApp.router → Screens
```

### Electron Structure:
```
main.js (Electron) → BrowserWindow → index.html → renderer.js → React App
```

**New Structure:**
```
electron/
  main.js              # Electron main process
  preload.js           # Preload script (security)
src/
  index.js             # React entry point
  App.jsx              # Root component
  components/          # Reusable components
  screens/             # Page components
  store/               # State management
  utils/               # Helper functions
  router.jsx           # Routing config
public/
  index.html          # HTML template
  assets/              # Static assets
```

**Action Items:**
- [ ] Set up React app structure
- [ ] Configure Electron main process
- [ ] Set up build tools (Vite/Webpack)
- [ ] Create entry points

---

## Conversion Phases

### Phase 1: Core Setup (Week 1)
- [ ] Set up React + Electron project
- [ ] Create basic routing
- [ ] Set up state management store
- [ ] Implement data persistence

### Phase 2: UI Components (Week 2)
- [ ] Convert all screens to React components
- [ ] Set up Material Design theme
- [ ] Implement navigation
- [ ] Port all widgets

### Phase 3: Data Layer (Week 3)
- [ ] Convert DataStore to JavaScript
- [ ] Implement all CRUD operations
- [ ] Port models (Student, Lesson, Quiz, Progress)
- [ ] Test data persistence

### Phase 4: Games & Interactive (Week 4)
- [ ] Convert clicking game to Canvas
- [ ] Convert keyboard game
- [ ] Port game logic
- [ ] Test game mechanics

### Phase 5: Polish & Testing (Week 5)
- [ ] Fix all bugs
- [ ] Test on all platforms
- [ ] Optimize performance
- [ ] Package for distribution

---

## Key Conversion Functions

### Extract Game Logic First:
```javascript
// games/logic.js - Pure functions, no Flutter dependencies
export function nextRound(currentRound, difficulty) {
  // Game logic here
}

export function makeChoices(options) {
  // Choice generation
}

export function checkAnswer(userAnswer, correctAnswer) {
  // Validation logic
}
```

### Data Models:
```javascript
// models/Student.js
export class Student {
  constructor(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
  
  toJSON() { /* ... */ }
  static fromJSON(json) { /* ... */ }
}
```

---

## Estimated Effort

- **Total Screens**: 15
- **Complex Screens** (Games): 2
- **Data Models**: 7
- **Estimated Time**: 4-6 weeks for full conversion

## Next Steps

1. **Start with core logic**: Extract game logic and data operations to pure JavaScript
2. **Build UI incrementally**: Convert one screen at a time
3. **Test frequently**: Ensure each converted screen works before moving on
4. **Keep Flutter version**: Maintain both versions during transition



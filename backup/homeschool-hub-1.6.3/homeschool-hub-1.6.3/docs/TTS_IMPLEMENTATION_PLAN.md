# Text-to-Speech Implementation Plan

## Overview
This document outlines the plan for adding text-to-speech (TTS) functionality to the Homeschool Hub quiz application, allowing quiz questions and answers to be read aloud to students.

## Goals
- Enable students to hear quiz questions read aloud
- Provide option to read answer choices
- Support accessibility for students with reading difficulties
- Maintain a simple, user-friendly interface
- Work offline (no internet connection required)

## Options Analysis

### Option 1: Web Speech API (RECOMMENDED) ⭐
**Pros:**
- Built into Chromium (Electron uses Chromium)
- No dependencies required
- Free and unlimited
- Works offline using system voices
- Simple implementation (~20-30 lines of code)
- Cross-platform (Windows, Mac, Linux)
- Supports multiple languages and voices

**Cons:**
- Voice quality depends on system voices
- Limited customization compared to cloud services
- Some older systems may have limited voice options

**Difficulty:** ⭐ Easy (30-60 minutes)

### Option 2: Talkify Library
**Pros:**
- Additional features like form reading
- More control over TTS events
- Open source

**Cons:**
- Requires npm package installation
- Adds dependency
- More complex than Web Speech API
- May have compatibility issues

**Difficulty:** ⭐⭐ Medium (1-2 hours)

### Option 3: Cloud Services (Amazon Polly, Google TTS)
**Pros:**
- High-quality, natural-sounding voices
- Extensive language support
- Advanced features (SSML, custom lexicons)

**Cons:**
- Requires API keys and setup
- Costs money (usage-based pricing)
- Requires internet connection
- More complex integration
- Privacy concerns (text sent to cloud)

**Difficulty:** ⭐⭐⭐ Hard (3-4 hours + setup)

## Recommended Solution: Web Speech API

### Why Web Speech API?
1. **Zero Dependencies** - Already available in Electron
2. **Free** - No API costs
3. **Offline** - Works without internet
4. **Simple** - Minimal code required
5. **Privacy** - All processing happens locally
6. **Sufficient Quality** - Modern system voices are quite good

## Implementation Plan

### Phase 1: Core TTS Functionality

#### Step 1: Create TTS Utility Module
**File:** `src/utils/textToSpeech.js`

**Features:**
- `speak(text, options)` - Main function to speak text
- `stop()` - Stop current speech
- `pause()` - Pause speech
- `resume()` - Resume paused speech
- `getVoices()` - Get available system voices
- `setVoice(voiceName)` - Set preferred voice
- `setRate(rate)` - Set speech rate (0.1 to 10)
- `setPitch(pitch)` - Set pitch (0 to 2)
- `setVolume(volume)` - Set volume (0 to 1)

**Implementation Details:**
- Use `window.speechSynthesis` API
- Handle browser compatibility checks
- Store user preferences (voice, rate, pitch, volume)
- Provide fallback for unsupported browsers

#### Step 2: Add TTS Controls to Quiz Screen
**File:** `src/screens/QuizScreen.jsx`

**UI Components to Add:**
1. **TTS Toggle Button** - Enable/disable auto-read
2. **Play/Pause Button** - Manual control
3. **Stop Button** - Stop current speech
4. **Settings Button** - Voice selection, speed, pitch controls
5. **Visual Indicator** - Show when TTS is active

**Features:**
- Auto-read question when it appears
- Option to read answer choices
- Read selected answer when clicked
- Pause/stop on navigation
- Resume on return to question

#### Step 3: TTS Settings Panel (Optional)
**File:** `src/components/TTSSettings.jsx` (new component)

**Settings:**
- Voice selection dropdown
- Speech rate slider (0.5x to 2x)
- Pitch slider
- Volume slider
- Auto-read toggle
- Read answers toggle
- Language selection

### Phase 2: Enhanced Features

#### Step 4: Smart Text Processing
- Handle special characters and numbers
- Format mathematical expressions for better pronunciation
- Handle abbreviations and acronyms
- Add pauses for better comprehension

#### Step 5: User Preferences Persistence
- Save TTS preferences to localStorage
- Remember user's voice choice
- Remember speed/pitch/volume settings
- Per-student preferences (if multiple students)

#### Step 6: Keyboard Shortcuts
- Spacebar: Play/Pause
- Escape: Stop
- Ctrl/Cmd + T: Toggle TTS
- Arrow keys: Navigate and auto-read

### Phase 3: Polish & Accessibility

#### Step 7: Visual Feedback
- Highlight text as it's being read
- Show progress indicator
- Animate play/pause icons
- Visual cues for TTS state

#### Step 8: Error Handling
- Handle TTS errors gracefully
- Fallback messages if TTS unavailable
- Browser compatibility warnings
- Voice loading errors

#### Step 9: Testing
- Test on Windows, Mac, Linux
- Test with different system voices
- Test with long questions
- Test with special characters
- Test pause/resume functionality
- Test multiple rapid clicks
- Test navigation during speech

## Technical Implementation Details

### Web Speech API Usage

```javascript
// Basic usage
const utterance = new SpeechSynthesisUtterance(text);
utterance.voice = selectedVoice;
utterance.rate = 1.0; // 0.1 to 10
utterance.pitch = 1.0; // 0 to 2
utterance.volume = 1.0; // 0 to 1
speechSynthesis.speak(utterance);

// Stop speech
speechSynthesis.cancel();

// Pause/Resume
speechSynthesis.pause();
speechSynthesis.resume();

// Get available voices
const voices = speechSynthesis.getVoices();
```

### Integration Points

1. **QuizScreen Component**
   - Add TTS controls to header
   - Auto-read on question change
   - Read answers on selection (optional)

2. **Question Display**
   - Add "Read Aloud" button next to question
   - Add "Read Answers" button

3. **Answer Options**
   - Optional: Read answer when hovered
   - Optional: Read answer when selected

### State Management

**New State Variables:**
- `ttsEnabled` - Boolean
- `isSpeaking` - Boolean
- `isPaused` - Boolean
- `selectedVoice` - Voice object
- `ttsSettings` - Object with rate, pitch, volume

**User Preferences (localStorage):**
```json
{
  "ttsEnabled": true,
  "autoRead": true,
  "readAnswers": false,
  "voice": "Microsoft Zira - English (United States)",
  "rate": 1.0,
  "pitch": 1.0,
  "volume": 1.0
}
```

## File Structure

```
src/
├── utils/
│   └── textToSpeech.js          # TTS utility functions
├── components/
│   └── TTSSettings.jsx          # TTS settings panel (optional)
└── screens/
    └── QuizScreen.jsx           # Updated with TTS controls
```

## UI/UX Design Considerations

### Button Placement
- TTS controls in quiz header (top right)
- Compact icon buttons to save space
- Tooltips for accessibility

### Visual Design
- Use standard play/pause/stop icons
- Show active state (highlighted when speaking)
- Disable buttons when TTS unavailable
- Loading state while voices load

### User Experience
- Auto-read should be opt-in (user enables it)
- Provide clear feedback when TTS is active
- Allow easy stopping/pausing
- Don't interrupt user interactions

## Testing Checklist

- [ ] TTS works on Windows
- [ ] TTS works on Mac
- [ ] TTS works on Linux
- [ ] Multiple voices available
- [ ] Voice selection works
- [ ] Speed adjustment works
- [ ] Pitch adjustment works
- [ ] Volume adjustment works
- [ ] Auto-read on question change
- [ ] Manual play/pause works
- [ ] Stop button works
- [ ] Navigation stops speech
- [ ] Long questions read completely
- [ ] Special characters handled
- [ ] Numbers read correctly
- [ ] Preferences persist
- [ ] Error handling works
- [ ] No console errors
- [ ] Performance is acceptable

## Future Enhancements

1. **Highlight Text as Read**
   - Word-by-word highlighting
   - Sentence-by-sentence highlighting

2. **Multiple Language Support**
   - Auto-detect question language
   - Switch voices based on content

3. **SSML Support** (if using cloud service)
   - Better pronunciation control
   - Emphasis and pauses

4. **Voice Preview**
   - Test voices before selection
   - Sample phrases

5. **Per-Question Settings**
   - Different voice for different subjects
   - Adjust speed per question type

6. **Accessibility Features**
   - Screen reader compatibility
   - Keyboard-only navigation
   - High contrast mode support

## Timeline Estimate

- **Phase 1 (Core):** 1-2 hours
- **Phase 2 (Enhanced):** 2-3 hours
- **Phase 3 (Polish):** 1-2 hours
- **Total:** 4-7 hours

## Dependencies

**None!** Web Speech API is built-in.

If we later want to add Talkify:
```bash
npm install talkify
```

## Browser Compatibility

- ✅ Chrome/Chromium (Electron uses this)
- ✅ Edge
- ✅ Safari (with limitations)
- ⚠️ Firefox (limited support)
- ❌ Internet Explorer (not supported)

Since Electron uses Chromium, compatibility is excellent.

## Privacy & Security

- ✅ All processing happens locally
- ✅ No data sent to external servers
- ✅ No API keys required
- ✅ Works offline
- ✅ No privacy concerns

## Success Criteria

1. ✅ Users can enable/disable TTS
2. ✅ Questions are read aloud clearly
3. ✅ Users can control playback (play/pause/stop)
4. ✅ Settings persist across sessions
5. ✅ Works on all target platforms
6. ✅ No performance issues
7. ✅ Accessible and user-friendly

## Notes

- Web Speech API voices load asynchronously - need to handle this
- Some systems may have limited voices - provide fallback
- Speech can be interrupted by navigation - handle cleanup
- Long text may need chunking for better performance
- Consider adding loading states while voices initialize

## References

- [MDN Web Speech API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [SpeechSynthesis API Reference](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
- [SpeechSynthesisUtterance API Reference](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)



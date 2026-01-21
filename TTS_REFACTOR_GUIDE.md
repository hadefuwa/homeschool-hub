# New TTS Implementation - Clean & React-Native

## What Changed

### ❌ Old Approach (Complex, Buggy)
- MutationObserver watching entire DOM
- Trying to scan and extract page content automatically
- Race conditions from hot reloading
- Global locks and multiple service instances
- Reading navigation, emojis, "Question 1 of 10", etc.
- Complex debouncing and throttling
- Fighting against React's lifecycle

### ✅ New Approach (Simple, Reliable)
- **No DOM scanning** - components tell TTS what to read
- **React hooks** - `useAutoSpeak` for automatic reading
- **Single service instance** - clean singleton pattern
- **Component-controlled** - lessons decide what and when to read
- **Route-aware** - stops speech on navigation automatically
- **Simple implementation** - ~180 lines vs 531 lines

## How to Use

### 1. Auto-Read on Component Mount

```jsx
import { useAutoSpeak } from '../hooks/useGoogleTTS';

function MyLesson() {
  const text = "Welcome to the lesson!";
  
  // Automatically reads when component mounts
  useAutoSpeak(text);
  
  return <div>{text}</div>;
}
```

### 2. Auto-Read When State Changes

```jsx
function QuizLesson() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions[questionIndex];
  
  // Re-reads when questionIndex changes
  useAutoSpeak(question.text, { 
    delay: 500,
    deps: [questionIndex] 
  });
  
  return <div>{question.text}</div>;
}
```

### 3. Manual Control

```jsx
import { useGoogleTTS } from '../hooks/useGoogleTTS';

function MyLesson() {
  const { speak, stop, speaking } = useGoogleTTS();
  
  return (
    <button onClick={() => speak("Hello!")} disabled={speaking}>
      🔊 Speak
    </button>
  );
}
```

### 4. Conditional Reading

```jsx
function ConditionalLesson() {
  const [showQuiz, setShowQuiz] = useState(false);
  
  // Only reads when showQuiz is true
  const text = showQuiz ? "Let's start the quiz!" : null;
  useAutoSpeak(text, { deps: [showQuiz] });
  
  return <div>...</div>;
}
```

## Benefits

1. **Simpler** - No complex DOM scanning logic
2. **Reliable** - No race conditions or multiple voices
3. **React-friendly** - Works with React's lifecycle
4. **Maintainable** - Easy to understand and modify
5. **Flexible** - Components have full control
6. **Performant** - No constant DOM observation

## Migration Guide

### For Phonics/Letter Lessons

**Before:** Relied on auto-detect scanning DOM
```jsx
// Old - nothing needed, auto-scanned
function LetterLesson() {
  return <h2>{word}</h2>;
}
```

**After:** Add useAutoSpeak hook
```jsx
import { useAutoSpeak } from '../hooks/useGoogleTTS';

function LetterLesson() {
  const word = "fish";
  const question = `Does ${word} start with the letter F?`;
  
  useAutoSpeak(question, { delay: 500 });
  
  return <h2>{word}</h2>;
}
```

### For Quiz Components

**Before:** Complex useEffect with speak() calls
```jsx
useEffect(() => {
  stop();
  setTimeout(async () => {
    await speak(question);
  }, 500);
}, [questionIndex]);
```

**After:** Simple useAutoSpeak
```jsx
useAutoSpeak(questions[questionIndex].text, { 
  delay: 500, 
  deps: [questionIndex] 
});
```

## API Reference

### useAutoSpeak(text, options)

Automatically speaks text when component mounts or dependencies change.

**Parameters:**
- `text` (string | null): Text to speak (null = don't speak)
- `options.delay` (number): Delay before speaking (default: 500ms)
- `options.deps` (array): Dependencies to trigger re-speak
- `options.rate` (number): Speech rate override

**Example:**
```jsx
useAutoSpeak("Hello world", { 
  delay: 1000, 
  deps: [currentPage],
  rate: 0.8 
});
```

### useGoogleTTS()

Returns TTS service state and control methods.

**Returns:**
- `speak(text, options)`: Speak text
- `stop()`: Stop current speech
- `replay()`: Replay last text
- `setRate(rate)`: Set speech rate
- `setEnabled(enabled)`: Enable/disable TTS
- `enabled`: Is TTS enabled
- `speaking`: Is currently speaking
- `rate`: Current speech rate

## Examples

See `src/components/TTSExamples.jsx` for complete working examples.

## Next Steps

1. Update GenericLetterLesson.jsx to use useAutoSpeak
2. Update PhonicsLesson.jsx to use useAutoSpeak  
3. Update any other quiz/lesson components
4. Remove old textToSpeech.js utility functions (keep as backup)
5. Test thoroughly on different lesson types

## Files Changed

- ✅ `src/services/GoogleTTSService.js` - Simplified from 531 to 180 lines
- ✅ `src/hooks/useGoogleTTS.js` - Added useAutoSpeak hook
- ✅ `src/components/GoogleTTSBar.jsx` - Removed auto-read toggle
- ✅ `src/components/TTSExamples.jsx` - Example implementations
- 📝 Backup: `src/services/GoogleTTSService.js.backup` - Old complex version

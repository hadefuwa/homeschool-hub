# YouTube Video Implementation Guide

## Overview
This document explains how YouTube video playback is currently implemented in the Homeschool Hub Electron app. This was created to help rollback to a previous version while preserving knowledge of how YouTube videos work.

**Last Updated:** January 21, 2026
**Commit Reference:** d6054e9 (feat: overhaul Year 2 English curriculum and fix YouTube playback issues)

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Component Structure](#component-structure)
3. [Electron Configuration](#electron-configuration)
4. [YouTube Embedding Process](#youtube-embedding-process)
5. [Security & CORS Handling](#security--cors-handling)
6. [Example Usage](#example-usage)
7. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

The YouTube implementation consists of three main layers:

1. **React Components** - Handle UI rendering and video embedding
2. **Utility Functions** - Extract and parse YouTube URLs
3. **Electron Main Process** - Configure security headers, CSP, and CORS

### Key Files

- `src/components/YouTubeEmbed.jsx` - YouTube iframe component
- `src/components/MarkdownWithYouTube.jsx` - Markdown renderer with automatic YouTube embedding
- `src/components/GenericLetterLesson.jsx` - Phonics lesson component using YouTube videos
- `src/utils/youtube.js` - YouTube URL parsing utilities
- `electron/main.js` - Electron security and CORS configuration (lines 780-906)

---

## Component Structure

### 1. YouTubeEmbed Component
**File:** `src/components/YouTubeEmbed.jsx`

This is the core component that renders YouTube videos using iframes.

**Key Features:**
- Uses `youtube-nocookie.com` domain for better privacy and fewer embedding restrictions
- Configures iframe with necessary permissions for playback
- Uses a mock public origin (`https://homeschool-hub.io`) to bypass localhost restrictions
- Responsive 16:9 aspect ratio container

**Props:**
- `videoId` (required) - YouTube video ID (e.g., "Yc59YQTFe6M")
- `width` (optional) - Default: "100%"
- `height` (optional) - Default: "400px"
- `options` (optional) - Object with autoplay, loop, start, end, mute, playlist settings

**Embed URL Parameters:**
```javascript
- modestbranding: 1 (minimal YouTube branding)
- rel: 0 (don't show related videos from other channels)
- origin: https://homeschool-hub.io (mock public origin for CORS)
- enablejsapi: 1 (enable YouTube JS API)
- widget_referrer: https://homeschool-hub.io
```

**iframe Permissions:**
```
allow="accelerometer; autoplay; clipboard-write; encrypted-media;
       gyroscope; picture-in-picture; web-share"
allowFullScreen
referrerPolicy="strict-origin-when-cross-origin"
```

### 2. MarkdownWithYouTube Component
**File:** `src/components/MarkdownWithYouTube.jsx`

Automatically detects YouTube links in markdown content and replaces them with embedded video players.

**Key Features:**
- Parses markdown content for YouTube URLs
- Extracts video IDs using regex patterns
- Replaces YouTube links with `YouTubeEmbed` components
- Supports interactive questions between content sections
- Makes emojis clickable with text-to-speech

**YouTube URL Formats Supported:**
```
[Link Text](https://www.youtube.com/watch?v=VIDEO_ID)
[Link Text](https://youtu.be/VIDEO_ID)
https://www.youtube.com/watch?v=VIDEO_ID
https://youtu.be/VIDEO_ID
```

**Process Flow:**
1. Extract all YouTube videos using `extractYouTubeVideosFromContent()` from `youtube.js`
2. Extract interactive questions (if any)
3. Split content into segments (markdown, YouTube embeds, questions)
4. Render each segment with appropriate component
5. Optionally remove title from markdown if `removeTitle={true}`

### 3. GenericLetterLesson Component
**File:** `src/components/GenericLetterLesson.jsx`

Used for phonics lessons (Letters A-Z) that include YouTube videos followed by interactive quizzes.

**Props:**
- `lesson` - Lesson object with metadata
- `letter` - Letter being taught (e.g., "k")
- `videoId` - YouTube video ID for Jolly Phonics video
- `questions` - Array of quiz questions

**Stages:**
1. **Video Stage** - Shows YouTube video with "Start the Quiz" button
2. **Quiz Stage** - Interactive yes/no questions with text-to-speech
3. **Result Stage** - Shows score with medals and navigation buttons

**Example Usage:**
```jsx
// src/components/LetterKLesson.jsx
function LetterKLesson({ lesson }) {
  return (
    <GenericLetterLesson
      lesson={lesson}
      letter="k"
      videoId="Yc59YQTFe6M"
      questions={questions}
    />
  );
}
```

---

## Electron Configuration

### Security Headers & CORS Setup
**File:** `electron/main.js` (lines 780-906)

The Electron main process configures special headers to make YouTube embedding work in a local app environment.

#### Function: `setupHeadersAndCSP()`

This function sets up two request interceptors:

### 1. onBeforeSendHeaders (lines 786-836)
Modifies outgoing requests to YouTube domains to appear as if they come from a regular browser.

**Target URLs:**
- `*://*.youtube.com/*`
- `*://*.googlevideo.com/*`
- `*://*.youtube-nocookie.com/*`

**For iframe requests (resourceType === 'subFrame'):**
```javascript
requestHeaders['Referer'] = 'https://homeschool-hub.io';
requestHeaders['Origin'] = 'https://homeschool-hub.io';
requestHeaders['Sec-Fetch-Site'] = 'cross-site';
requestHeaders['Sec-Fetch-Mode'] = 'navigate';
requestHeaders['Sec-Fetch-Dest'] = 'iframe';
```

**For API/video stream requests (xhr, fetch, googlevideo.com):**
```javascript
// Use youtube-nocookie.com for googlevideo requests
requestHeaders['Origin'] = 'https://www.youtube-nocookie.com';
requestHeaders['Referer'] = 'https://www.youtube-nocookie.com/';
requestHeaders['Sec-Fetch-Site'] = 'same-origin';
requestHeaders['Sec-Fetch-Mode'] = 'cors';
requestHeaders['Sec-Fetch-Dest'] = 'empty';
```

**User-Agent Spoofing:**
```javascript
requestHeaders['User-Agent'] =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
   (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36';
```

**Strip Electron Signals:**
Removes all `sec-ch-ua*` headers that identify the app as Electron.

### 2. onHeadersReceived (lines 838-906)
Modifies incoming response headers to allow cross-origin video playback.

**For googlevideo.com responses:**
```javascript
// Remove conflicting headers
delete responseHeaders['x-frame-options'];
delete responseHeaders['content-security-policy'];

// Add permissive CORS headers
responseHeaders['Access-Control-Allow-Origin'] =
  ['https://www.youtube-nocookie.com'];
responseHeaders['Access-Control-Allow-Methods'] =
  ['GET, POST, OPTIONS, HEAD'];
responseHeaders['Access-Control-Allow-Headers'] =
  ['Range, Content-Type, x-client-data, x-goog-visitor-id'];
responseHeaders['Access-Control-Expose-Headers'] =
  ['Content-Length, Content-Range, X-Content-Type-Options'];
responseHeaders['Access-Control-Allow-Credentials'] = ['true'];
```

**Content Security Policy (CSP):**
```javascript
"default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: file:
            blockly: htmlgame: https://www.gstatic.com ...;
script-src 'self' 'unsafe-inline' 'unsafe-eval'
           https://www.youtube.com https://www.youtube-nocookie.com ...;
connect-src 'self' https://www.youtube.com
            https://*.googlevideo.com ...;
frame-src *;"
```

### Additional Electron Configuration

**BrowserWindow Settings (line 300-306):**
```javascript
webPreferences: {
  nodeIntegration: false,
  contextIsolation: true,
  enableRemoteModule: false,
  webSecurity: true,  // Security enabled
  preload: path.join(__dirname, 'preload.js'),
}
```

**Session Storage Clearing (lines 910-918):**
On app startup, clears cookies, localStorage, and caches to prevent "video unavailable" issues from cached state.

```javascript
await session.defaultSession.clearStorageData({
  storages: ['cookies', 'localstorage', 'caches'],
});
```

---

## YouTube Embedding Process

### Step-by-Step Flow

1. **Lesson Content Creation**
   - Lesson author includes YouTube URL in markdown content or specifies videoId in component

2. **URL Detection (MarkdownWithYouTube)**
   - `extractYouTubeVideosFromContent()` finds all YouTube URLs
   - Extracts video IDs using regex patterns

3. **Component Rendering**
   - `YouTubeEmbed` component receives videoId
   - Builds embed URL with youtube-nocookie.com domain
   - Adds query parameters for privacy and functionality

4. **Electron Request Interception**
   - User's browser makes request to load YouTube iframe
   - `onBeforeSendHeaders` modifies request headers to appear as regular browser
   - Sets fake public origin (`homeschool-hub.io`)

5. **YouTube Response**
   - YouTube server returns iframe content
   - `onHeadersReceived` modifies response headers
   - Removes X-Frame-Options and restrictive CSP
   - Adds permissive CORS headers

6. **Video Stream Loading**
   - YouTube iframe makes requests to googlevideo.com
   - Same header modification process applies
   - CORS headers allow cross-origin video loading

7. **Playback**
   - Video plays in iframe with full controls
   - User can interact normally (play, pause, seek, fullscreen)

---

## Utility Functions

### File: `src/utils/youtube.js`

#### extractYouTubeVideoId(url)
Extracts video ID from various YouTube URL formats.

**Supported Formats:**
```javascript
// Pattern 1: Standard watch URL
https://www.youtube.com/watch?v=VIDEO_ID

// Pattern 2: Short URL
https://youtu.be/VIDEO_ID

// Pattern 3: Embed URL
https://www.youtube.com/embed/VIDEO_ID

// Pattern 4: Legacy format
https://www.youtube.com/v/VIDEO_ID
```

**Returns:** 11-character video ID or null

#### extractYouTubeVideosFromContent(content)
Finds all YouTube videos in markdown content.

**Pattern Matching:**
1. Markdown links: `[text](youtube_url)`
2. Direct URLs: `https://youtube.com/...` or `https://youtu.be/...`

**Returns:** Array of objects:
```javascript
[{
  id: "VIDEO_ID",
  url: "full_url",
  fullMatch: "matched_text",
  index: position_in_content
}]
```

#### getYouTubeEmbedUrl(videoId, options)
Builds complete YouTube embed URL with query parameters.

**Options:**
- `autoplay`, `loop`, `start`, `end`, `mute`, `playlist`
- Automatically adds `modestbranding=1` and `rel=0`

**Returns:** Full embed URL string

---

## Example Usage

### Example 1: Phonics Lesson (Letter K)

**Lesson Definition** (`src/data/lessons/nurseryLessons.js`):
```javascript
new Lesson({
  id: lessonId++,
  yearId: 'nursery',
  subjectId: 'english',
  lessonNumber: 11,
  title: "Phonics: Letter K Sound",
  emoji: '🔊',
  assessmentType: 'letter-k-video-quiz',
  content: `# Learn the Letter K Sound

Watch the video to learn about the letter K sound!

## What You'll Learn:
- The sound that the letter K makes
- Words that start with K
- How to form the letter K

After watching the video, you'll practice identifying words that start with K.`,
  quizId: null,
  categoryId: 'phonics',
})
```

**Component** (`src/components/LetterKLesson.jsx`):
```javascript
const questions = [
  { word: 'kangaroo', correct: true },
  { word: 'cat', correct: false },
  { word: 'kite', correct: true },
  // ... more questions
];

function LetterKLesson({ lesson }) {
  return (
    <GenericLetterLesson
      lesson={lesson}
      letter="k"
      videoId="Yc59YQTFe6M"
      questions={questions}
    />
  );
}
```

**Rendering** (`src/screens/LessonViewScreen.jsx`):
```javascript
case 'letter-k-video-quiz':
  return <LetterKLesson lesson={lesson} />;
```

### Example 2: Markdown with Embedded Videos

**Markdown Content:**
```markdown
# Ancient Egypt

Watch this video about pyramids:

[Egyptian Pyramids Documentary](https://www.youtube.com/watch?v=ABC123XYZ)

## Building Techniques

The ancient Egyptians used sophisticated methods...

<!-- QUESTION_START -->
What were pyramids used for?
<!-- OPTIONS -->
Tombs for pharaohs|Houses for workers|Storage buildings
<!-- CORRECT -->
0
<!-- EXPLANATION -->
Pyramids were monumental tombs for pharaohs.
<!-- QUESTION_END -->
```

**Component Usage:**
```javascript
<MarkdownWithYouTube
  content={lesson.content}
  removeTitle={true}
  onQuestionAnswer={handleQuestionAnswer}
/>
```

**Rendered Output:**
1. Title removed (if removeTitle=true)
2. Introductory text
3. YouTube video embedded (replaces link)
4. Additional text content
5. Interactive question component

### Example 3: Direct YouTube Embed

```javascript
import YouTubeEmbed from './components/YouTubeEmbed';

<YouTubeEmbed
  videoId="Yc59YQTFe6M"
  options={{
    autoplay: false,
    start: 10,
    end: 120
  }}
/>
```

---

## Security & CORS Handling

### Why All This Configuration?

**Problem 1: Localhost Restrictions**
YouTube blocks embedding from `file://` and `localhost` origins to prevent abuse.

**Solution:**
- Use fake public origin (`homeschool-hub.io`)
- Modify Referer and Origin headers to match this domain

**Problem 2: CORS Restrictions**
Video streams from `googlevideo.com` have strict CORS policies.

**Solution:**
- Intercept response headers
- Add `Access-Control-Allow-Origin` for youtube-nocookie.com
- Remove conflicting X-Frame-Options headers

**Problem 3: Electron Detection**
YouTube can detect Electron apps via User-Agent and client hints.

**Solution:**
- Spoof User-Agent as Chrome browser
- Remove `sec-ch-ua-*` headers that identify Electron

**Problem 4: Content Security Policy**
Electron's CSP can block YouTube scripts and iframes.

**Solution:**
- Modify CSP to allow YouTube, googlevideo, and related domains
- Set `frame-src *` to allow all iframe sources

### Security Considerations

**webSecurity: true**
Despite needing CORS workarounds, web security remains enabled for general protection.

**Origin Spoofing**
The fake origin (`homeschool-hub.io`) only affects YouTube requests, not the entire app.

**Session Isolation**
Storage data is cleared on startup to prevent cross-session issues.

**CSP Relaxation**
`unsafe-inline` and `unsafe-eval` are necessary for React and YouTube player scripts, but limited to specific sources.

---

## Troubleshooting

### Video Shows "Video Unavailable" or "Error 152-4"

**Cause:** YouTube blocking the embed due to origin detection

**Fix:**
1. Check that `setupHeadersAndCSP()` is called in `electron/main.js` (line 921)
2. Verify fake origin is set to `https://homeschool-hub.io` in both:
   - `YouTubeEmbed.jsx` (line 26)
   - `electron/main.js` (line 795)
3. Ensure session storage is cleared on startup (lines 910-918)

### Video Loads but Won't Play

**Cause:** CORS errors preventing video stream loading

**Fix:**
1. Check browser console for CORS errors
2. Verify `onHeadersReceived` handler is modifying googlevideo.com responses
3. Check that CORS headers match origin used in iframe (`youtube-nocookie.com`)

### CSP Violations in Console

**Cause:** Content Security Policy blocking required resources

**Fix:**
1. Add missing domains to CSP in `onHeadersReceived` handler (lines 872-884)
2. Ensure `frame-src *` allows all iframe sources
3. Check that `script-src` includes YouTube domains

### Videos Work in Development but Not Production

**Cause:** Different build/packaging affecting URL handling

**Fix:**
1. Verify protocol handlers are registered (lines 31-50)
2. Check that paths are correctly resolved in production
3. Ensure User-Agent spoofing works in packaged app

### Multiple Videos on Same Page Don't Load

**Cause:** Conflict in origin tracking or resource limits

**Fix:**
1. Ensure each `YouTubeEmbed` has unique `key` prop
2. Check that CORS headers allow multiple concurrent requests
3. Verify CSP doesn't limit number of iframes

### Performance Issues with Many Videos

**Cause:** Multiple heavy iframes loading simultaneously

**Fix:**
1. Consider lazy loading videos (IntersectionObserver)
2. Use thumbnail images with click-to-play
3. Limit autoplay videos to one at a time

---

## Migration Notes (for Rollback)

If you need to rollback to before YouTube videos worked, you'll need to:

### Remove YouTube Components
1. Delete or stub out:
   - `src/components/YouTubeEmbed.jsx`
   - `src/components/GenericLetterLesson.jsx`
   - `src/utils/youtube.js`

2. Update `MarkdownWithYouTube.jsx`:
   - Remove YouTube extraction logic (lines 15-16, 66-138)
   - Remove YouTubeEmbed import (line 3)

3. Update lesson components (LetterALesson.jsx through LetterZLesson.jsx):
   - Replace with simple text-based lessons
   - Or return placeholder components

### Remove Electron Configuration
1. In `electron/main.js`:
   - Remove `setupHeadersAndCSP()` function (lines 780-906)
   - Remove call to `setupHeadersAndCSP()` (line 921)
   - Optional: Remove session clearing (lines 910-918)

### Update Lesson Data
1. In `src/data/lessons/nurseryLessons.js` and other lesson files:
   - Remove YouTube URLs from markdown content
   - Change `assessmentType` from `letter-*-video-quiz` to simple quiz types
   - Update lesson content to not reference videos

### Test After Rollback
1. Verify app loads without errors
2. Check that lessons display correctly without video components
3. Ensure markdown rendering still works for non-video content
4. Test that other embedded content (Blockly, HTML games) still works

---

## Additional Resources

### Related Files
- `src/data/lessons/nurseryLessons.js` - Phonics lessons using YouTube
- `src/data/lessons/year1Lessons.js` - May contain YouTube videos
- `src/data/lessons/year2Lessons.js` - Year 2 curriculum with videos
- `src/screens/LessonViewScreen.jsx` - Lesson rendering logic

### Git History
- Commit `d6054e9`: "feat: overhaul Year 2 English curriculum and fix YouTube playback issues"
- Commit `39f5f27`: "Migrate from WinUI 3 to Flutter" (earlier architecture)

### Testing
To test YouTube functionality:
1. Navigate to Nursery > English > "Phonics: Letter K Sound"
2. Verify video loads and plays
3. Check browser console for errors
4. Test quiz functionality after video

### Future Improvements
Potential enhancements to consider:
- Lazy loading for better performance
- Offline video caching
- Alternative video sources (self-hosted)
- Progressive enhancement (fallback for video failures)
- Analytics for video completion tracking

---

## Summary

The YouTube implementation relies on three key mechanisms:

1. **Component Architecture** - Reusable components that handle video embedding with proper iframe configuration
2. **URL Parsing** - Robust utilities to extract video IDs from various URL formats
3. **Electron Security Configuration** - Header modification to bypass YouTube's embedding restrictions while maintaining app security

The most critical piece is the Electron configuration in `main.js`, which spoofs the app's origin and modifies CORS headers to make YouTube believe requests are coming from a legitimate public website rather than a local Electron app.

Without these configurations, YouTube videos will fail to load with "Video unavailable" errors or CORS violations.

---

**Document Created:** January 21, 2026
**For Questions:** Review the source files listed above or check git history for implementation details.

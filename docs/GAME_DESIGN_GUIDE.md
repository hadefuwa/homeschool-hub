GAME DESIGN GUIDE
=================

Purpose
-------
This guide standardizes how we build graphical, kid-friendly lesson games in the app.
Follow the rules below so all new lessons feel consistent, interactive, and clear.


Design Principles (Strict)
--------------------------
1) VISUAL-FIRST
   - Each question must include a visual representation, not just text and buttons.
   - Examples: blocks for arithmetic, empty slots on number lines, object groups for quantity.

2) INTERACTIVE AFFORDANCE
   - The UI must clearly show where the student should act (drop slot, tap target, etc.).
   - Avoid asking a student to place something where the answer is already visible.

3) MEANINGFUL FEEDBACK
   - Show clear feedback for correct vs incorrect actions.
   - If the interaction is drag-and-drop, highlight valid drop zones.

4) CONSISTENT LAYOUT
   - Header: game title + level/score.
   - Main panel: visual activity area (always centered).
   - Answer area: draggable/tappable choices aligned in a clean grid.

5) SIMPLE PHRASES
   - Use short, friendly instructions. Avoid verbose text.

6) ACCESSIBLE TARGETS
   - Tap areas must be at least 64px tall or wide.
   - Drag targets must be visually larger than the draggable cards.

7) NO HIDDEN ANSWERS
   - If the answer is on the board, it must be in a blank state (slot) until placed.

8) MOBILE-FIRST SPACING
   - Avoid tight clusters. Use padding and larger hit zones.


Visual Patterns We Use
----------------------
- Number blocks: small grid of colored squares to show count.
- Empty slots: rounded rectangles for drop targets.
- Linear number lines: thick gradient line with bold ticks and endpoints.
- “Target” callouts: card showing the target number/word.


Implementation Rules (Strict)
-----------------------------
- Use inline styles for quick, consistent visuals (existing style pattern).
- Use theme tokens from the component when present (e.g., theme.accent, theme.border).
- If a game uses drag-and-drop, provide:
  * a list of draggable cards
  * explicit drop slots
  * a tolerance radius for snap/accept
- For younger years (nursery/year 1/year 2):
  * Always include a visual model (blocks, dots, counters)
  * Avoid multi-step instructions
  * Provide 2-4 options at most


Example: Number Blocks for Addition/Subtraction
-----------------------------------------------
Add a visual block panel above the answer buttons.

```jsx
const renderNumberBlocks = (count, dimFromIndex = null) => {
  const columns = count > 10 ? 10 : 5;
  const colors = ['#ff8a65', '#4fc3f7', '#81c784', '#ba68c8', '#ffd54f'];
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${Math.min(columns, count || 1)}, 26px)`,
      gap: '6px',
      justifyContent: 'center',
      minHeight: '26px',
    }}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '6px',
            backgroundColor: colors[index % colors.length],
            boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.2)',
            opacity: dimFromIndex !== null && index >= dimFromIndex ? 0.3 : 1,
          }}
        />
      ))}
    </div>
  );
};

<div style={{ padding: '24px', borderRadius: '22px', backgroundColor: '#f7f9ff' }}>
  {renderNumberBlocks(a)}
  <div style={{ fontSize: '40px', fontWeight: 'bold' }}>+</div>
  {renderNumberBlocks(b)}
  <div style={{ fontSize: '40px', fontWeight: 'bold' }}>=</div>
  <div style={{ width: '70px', height: '70px', border: '3px dashed #9fa8da' }}>?</div>
</div>
```


Example: Empty Slots on a Number Line
-------------------------------------
Use 2-4 empty slots and allow drops only on those slots.

```jsx
const slots = [target, distractor1, distractor2].sort((a, b) => a - b);
const slotSet = new Set(slots);

// Render ticks: if tick is a slot, draw a blank box instead of a number label.
{ticks.map((value) => (
  slotSet.has(value) ? (
    <rect x={x - 16} y={y + 20} width={32} height={26} rx={8} />
  ) : (
    <text x={x} y={y + 36}>{value}</text>
  )
))}

// Accept drop only near a slot
const closestSlot = slots.reduce((closest, val) => {
  const dist = Math.abs(slotX(val) - dropX);
  return !closest || dist < closest.dist ? { val, dist } : closest;
}, null);
const isCorrect = closestSlot && closestSlot.val === target && closestSlot.dist <= 28;
```


Example: Target Callout Card
----------------------------
Use a prominent target callout with a short instruction.

```jsx
<div style={{
  backgroundColor: '#fff',
  border: '2px solid #d4e6ff',
  borderRadius: '16px',
  padding: '12px 16px',
  textAlign: 'center',
}}>
  <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
    Target
  </div>
  <div style={{ fontSize: '28px', fontWeight: '800', color: '#1f7af0' }}>
    {targetValue}
  </div>
  <div style={{ fontSize: '14px' }}>
    Drag the matching card to an empty box
  </div>
</div>
```


Do/Don’t Checklist
------------------
DO:
- Provide a visual model for every question
- Keep drop zones visible and distinct
- Use consistent typography and spacing
- Keep answer options to 2–4 for younger kids

DON’T:
- Show the correct value already placed on the line
- Mix multiple interaction styles in one question
- Use tiny buttons or cramped layouts


Component References
--------------------
- Math visuals live in `src/components/MathGame.jsx`
- Number line visuals live in `src/components/NumberLineGame.jsx`
- Phonics visuals live in `src/components/PhonicsGame.jsx`


How to Add a Lesson (Where Lessons Live)
----------------------------------------
Lessons are defined in year-based files and loaded in a single pipeline.

Where lessons are organized:
- `src/data/lessons/` contains year/subject lesson lists:
  - `nurseryLessons.js`
  - `receptionLessons.js`
  - `year1Lessons.js`
  - `year2Lessons.js`
  - `year3Lessons.js`
  - `year4Lessons.js`
  - `year5Lessons.js`
  - `year6Lessons.js`
  - `newMathsLessons.js`
  - `artLessons.js`

Where lessons are loaded:
- `src/data/defaultData.js` gathers all lessons in order inside `getDefaultLessons()`:
  - `getNurseryLessons(...)`
  - `getReceptionLessons(...)`
  - `getYear1Lessons(...)`
  - `getYear2Lessons(...)`
  - `getYear3Lessons(...)`
  - `getYear4Lessons(...)`
  - `getYear5Lessons(...)`
  - `getYear6Lessons(...)`
  - `getNewMathsLessons(...)`
  - `getArtLessons(...)`

Where lesson types are routed to games:
- `src/screens/LessonViewScreen.jsx` decides which component to render using `lesson.assessmentType`.


Steps to Add a New Lesson (Strict)
----------------------------------
1) Pick the correct file in `src/data/lessons/` for the year and subject.
2) Add a new `Lesson` object with:
   - `yearId`, `subjectId`, `lessonNumber`, `title`, `emoji`, `content`
   - `assessmentType` to pick a game or screen
   - `categoryId` if needed by a specific game (e.g., phonics)
3) Make sure `assessmentType` is handled in `LessonViewScreen.jsx`.
4) If the lesson uses a new game type, add a component and wire it in `LessonViewScreen.jsx`.


Example: Basic Lesson Entry
---------------------------
```js
new Lesson({
  id: lessonId++,
  yearId: 'year1',
  subjectId: 'maths',
  lessonNumber: 5,
  title: 'Adding Numbers',
  emoji: '➕',
  content: `# Adding Numbers\n\nUse blocks to add two numbers.`,
  quizId: null,
  assessmentType: 'maths-game',
  categoryId: null,
})
```


Checklist Before Shipping
-------------------------
- Lesson appears in the correct year list
- `assessmentType` routes to a working game in `LessonViewScreen.jsx`
- Visual model exists for each question (see rules above)


How to Import HTML Game Lessons
-------------------------------
We support HTML games via `HTMLGameEmbed`.

Steps (Strict):
1) Put your HTML file in `public/html-games/`.
   - Example: `public/html-games/my-game.html`
2) Add a lesson with `assessmentType: 'html-game'` in the correct year file.
3) Map the lesson title to the HTML file in `src/screens/LessonViewScreen.jsx`.
   - There are existing examples (search for `HTMLGameEmbed`).

Example mapping:
```jsx
<HTMLGameEmbed url="/html-games/my-game.html" height="100%" lesson={lesson} />
```

Optional: HTML Game → App messages
----------------------------------
From inside the HTML game, you can send messages to control TTS and completion.

```js
// Speak text
window.parent.postMessage({ type: 'html-game-tts', text: 'Hello!' }, '*');

// Stop TTS
window.parent.postMessage({ type: 'html-game-tts-stop' }, '*');

// Mark lesson complete
window.parent.postMessage({ type: 'html-game-complete' }, '*');
```

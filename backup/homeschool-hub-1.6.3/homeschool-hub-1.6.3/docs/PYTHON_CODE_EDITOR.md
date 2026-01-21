# Python Code Editor Integration

## Overview

The Python Code Editor component allows students to write, run, and verify Python code directly within the homeschool hub app. It uses Pyodide (Python compiled to WebAssembly) to execute code safely in the browser.

## Features

- ✅ **In-browser Python execution** - No server needed, runs entirely in the browser
- ✅ **Code verification** - Automatically checks if student code is correct
- ✅ **Real-time output** - See results immediately after running code
- ✅ **Error handling** - Clear error messages for debugging
- ✅ **Exercise system** - Built-in exercises for each lesson

## How It Works

1. **Pyodide Integration**: Uses Pyodide v0.27.3 loaded from CDN
2. **Code Execution**: Runs Python code in a sandboxed WebAssembly environment
3. **Output Capture**: Captures `print()` statements and displays them
4. **Verification**: Checks code against expected patterns, output, or content

## Adding Exercises to Lessons

### Method 1: JSON Format (Recommended)

Add exercise metadata in the lesson content:

```markdown
<!-- EXERCISE_START -->
{
  "instruction": "Write a program that prints 'Hello, World!'",
  "expectedOutput": "Hello, World!",
  "expectedContains": null,
  "codePattern": null
}
<!-- EXERCISE_END -->
```

### Method 2: Markdown Format

Add a simple exercise section:

```markdown
## Exercise: Write a program that prints your name
```

### Method 3: Default Exercises

If no exercise is specified, the component uses default exercises based on lesson number:
- Lesson 1: Print "Hello, World!"
- Lesson 2: Use print() function
- Lesson 3: Create variables
- Lesson 4: Use input() (with note about simulator limitations)
- Lesson 5: Write if statements
- Lesson 6: Write for loops
- Lesson 7: Create functions
- Lesson 8: Use turtle graphics

## Exercise Configuration Options

### `instruction` (required)
The text shown to the student explaining what to do.

### `expectedOutput` (optional)
Exact output that must match. Used for precise verification.

Example:
```json
{
  "instruction": "Print 'Hello, World!'",
  "expectedOutput": "Hello, World!"
}
```

### `expectedContains` (optional)
Text that must appear in the output. More flexible than exact match.

Example:
```json
{
  "instruction": "Print a greeting",
  "expectedContains": "Hello"
}
```

### `codePattern` (optional)
Regular expression pattern that must match the code.

Example:
```json
{
  "instruction": "Use the print() function",
  "codePattern": "print\\(.*\\)"
}
```

## Verification Logic

The component verifies code in this order:
1. If `expectedOutput` is set, checks for exact match
2. If `expectedContains` is set, checks if output contains the text
3. If `codePattern` is set, checks if code matches the regex
4. Otherwise, just checks that code runs without errors

## Limitations

### Input Function
The `input()` function doesn't work in the browser simulator. For exercises requiring user input:
- Use hardcoded values: `name = "Alice"`
- Or note in instructions that input() won't work

### Turtle Graphics
Turtle graphics may have limited functionality in Pyodide. Test thoroughly before using in exercises.

### Performance
Pyodide can be slow for complex code. Keep exercises simple for best experience.

### File System
No file system access. Can't read/write files.

## Integration

The Python Code Editor is automatically shown for:
- Lessons with title starting with "Python Lesson"
- Lessons with `subjectId === 'technology'` and `categoryId === 'python'`

To manually enable it, add to `LessonViewScreen.jsx`:

```jsx
lesson.title === 'Your Python Lesson Title' ? (
  <PythonCodeEditor lesson={lesson} />
) : ...
```

## Default Code

The component sets default starter code based on lesson number:
- Lesson 1: `print("Hello, World!")`
- Lesson 2: `print("Your name here")`
- Lesson 3: `name = "Your Name"\nprint(name)`
- Lesson 4: `name = input("What is your name? ")\nprint("Hello,", name)`
- Lesson 5: `number = 15\nif number > 10:\n    print("The number is greater than 10")`

## Future Enhancements

- [ ] Syntax highlighting with CodeMirror or Monaco Editor
- [ ] Code autocomplete
- [ ] Multiple exercise support per lesson
- [ ] Save/load code functionality
- [ ] Code history/undo
- [ ] Better error messages with line numbers
- [ ] Support for more Python libraries

## Testing

To test the Python Code Editor:

1. Navigate to any Python lesson (e.g., "Python Lesson 1: Getting Started")
2. The editor should appear automatically
3. Write code in the left panel
4. Click "Run Code" to execute
5. See output in the right panel
6. Complete the exercise to finish the lesson

## Troubleshooting

### Pyodide not loading
- Check internet connection (Pyodide loads from CDN)
- Check browser console for errors
- Try refreshing the page

### Code not running
- Check for syntax errors
- Make sure code is valid Python
- Check the error message in the output panel

### Verification not working
- Check exercise configuration
- Verify expected output/pattern matches your code
- Check browser console for errors

## Security Notes

- Code runs in a sandboxed WebAssembly environment
- No access to file system or network (except Pyodide CDN)
- Safe for student use
- No server-side code execution needed

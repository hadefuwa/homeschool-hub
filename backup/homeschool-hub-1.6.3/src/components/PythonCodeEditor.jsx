import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

function PythonCodeEditor({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextLessonAfter = useDataStore(state => state.getNextLessonAfter);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPyodideLoaded, setIsPyodideLoaded] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const pyodideRef = useRef(null);
  const consoleOriginalsRef = useRef(null);

  // Extract exercise requirements from lesson content
  const getExerciseRequirements = () => {
    if (!lesson || !lesson.content) return null;
    
    // Look for exercise markers in the content (JSON format)
    const exerciseMatch = lesson.content.match(/<!-- EXERCISE_START -->([\s\S]*?)<!-- EXERCISE_END -->/);
    if (exerciseMatch) {
      try {
        const parsed = JSON.parse(exerciseMatch[1]);
        // Ensure we have a valid instruction field
        if (parsed && typeof parsed === 'object' && parsed.instruction) {
          // Make sure instruction is a string, not an object
          const instruction = typeof parsed.instruction === 'string' 
            ? parsed.instruction 
            : String(parsed.instruction);
          
          return {
            instruction: instruction,
            expectedOutput: parsed.expectedOutput || null,
            expectedContains: parsed.expectedContains || null,
            codePattern: parsed.codePattern || null
          };
        }
        // If parsed but no instruction, treat as text
        return {
          instruction: exerciseMatch[1].trim(),
          expectedOutput: null,
          expectedContains: null,
          codePattern: null
        };
      } catch (e) {
        // If not JSON, try to parse as simple text
        return {
          instruction: exerciseMatch[1].trim(),
          expectedOutput: null,
          expectedContains: null,
          codePattern: null
        };
      }
    }
    
    // Look for exercise in markdown format: ## Exercise: ...
    const markdownExerciseMatch = lesson.content.match(/##\s*Exercise:?\s*(.+?)(?:\n|$)/i);
    if (markdownExerciseMatch) {
      return {
        instruction: markdownExerciseMatch[1].trim(),
        expectedOutput: null,
        expectedContains: null,
        codePattern: null
      };
    }
    
    // Default exercises based on lesson number
    const lessonNum = lesson.lessonNumber || 1;
    const defaults = {
      1: {
        instruction: 'Write a program that prints "Hello, World!"',
        expectedOutput: 'Hello, World!\n',
        expectedContains: 'Hello, World!',
        codePattern: 'print.*Hello.*World'
      },
      2: {
        instruction: 'Print your name using the print() function. Example: print("Your Name")',
        expectedContains: null, // Just check that print is used
        codePattern: 'print\\(.*\\)'
      },
      3: {
        instruction: 'Create a variable called "name" and set it to your name, then print it',
        codePattern: 'name\\s*=\\s*["\'].*["\']|name\\s*=\\s*input',
        expectedContains: null
      },
      4: {
        instruction: 'Ask the user for their name using input() and print a greeting. Note: input() won\'t work in this simulator, so use: name = "Your Name" then print("Hello,", name)',
        codePattern: 'name\\s*=\\s*["\'].*["\']',
        expectedContains: 'Hello'
      },
      5: {
        instruction: 'Write an if statement that checks if a number is greater than 10. Example: number = 15\nif number > 10:\n    print("Greater than 10")',
        codePattern: 'if\\s+.*>\\s*10|if\\s+.*>=.*10',
        expectedContains: null
      },
      6: {
        instruction: 'Write a for loop that prints numbers from 1 to 5',
        codePattern: 'for\\s+.*in\\s+range',
        expectedContains: null
      },
      7: {
        instruction: 'Create a function called greet() that prints "Hello!"',
        codePattern: 'def\\s+greet',
        expectedContains: null
      },
      8: {
        instruction: 'Use turtle to draw a square. Example: import turtle\nt = turtle.Turtle()\nfor i in range(4):\n    t.forward(100)\n    t.left(90)',
        codePattern: 'import\\s+turtle|turtle\\.',
        expectedContains: null
      }
    };
    
    return defaults[lessonNum] || {
      instruction: 'Write Python code to complete this exercise',
      expectedOutput: null,
      expectedContains: null,
      codePattern: null
    };
  };

  const exercise = getExerciseRequirements();

  // Load Pyodide
  useEffect(() => {
    let handleRejection = null;
    let originalErrorHandler = null;
    
    const loadPyodide = async () => {
      if (pyodideRef.current) {
        setIsPyodideLoaded(true);
        return;
      }

      setIsLoading(true);
      
      // Suppress Pyodide module loading warnings (these are harmless)
      const suppressedPatterns = [
        /Duplicate definition of module/i,
        /Loading.*failed/i,
        /stackframe/i,
        /error-stack-parser/i,
        /GET.*stackframe\.js.*404/i,
        /GET.*error-stack-parser\.js.*404/i,
        /Here are the modules that depend on it/i,
        /net::ERR_ABORTED/i,
        /Failed to load resource/i
      ];
      
      // Store original console functions
      if (!consoleOriginalsRef.current) {
        consoleOriginalsRef.current = {
          error: console.error,
          warn: console.warn
        };
      }
      
      const restoreConsole = () => {
        if (consoleOriginalsRef.current) {
          console.error = consoleOriginalsRef.current.error;
          console.warn = consoleOriginalsRef.current.warn;
        }
      };
      
      console.error = (...args) => {
        const message = args.join(' ');
        // Check if this is a suppressed error
        const shouldSuppress = suppressedPatterns.some(pattern => pattern.test(message));
        if (!shouldSuppress) {
          consoleOriginalsRef.current?.error.apply(console, args);
        }
      };
      
      console.warn = (...args) => {
        const message = args.join(' ');
        // Check if this is a suppressed warning
        const shouldSuppress = suppressedPatterns.some(pattern => pattern.test(message));
        if (!shouldSuppress) {
          consoleOriginalsRef.current?.warn.apply(console, args);
        }
      };
      
      // Suppress unhandled promise rejections from Pyodide module loading
      handleRejection = (event) => {
        try {
          // Handle both Error objects and Event objects
          let message = '';
          if (event.reason) {
            if (event.reason instanceof Error) {
              message = event.reason.message || event.reason.toString();
            } else if (event.reason.message) {
              message = event.reason.message;
            } else if (typeof event.reason === 'string') {
              message = event.reason;
            } else {
              message = String(event.reason);
            }
          } else if (event instanceof Error) {
            message = event.message || event.toString();
          } else {
            message = String(event);
          }
          
          // Check if this is a suppressed error
          if (suppressedPatterns.some(pattern => pattern.test(message))) {
            event.preventDefault();
            return;
          }
        } catch (e) {
          // If we can't parse the error, suppress it to avoid breaking Pyodide loading
          // These are usually harmless module loading errors
          if (suppressedPatterns.some(pattern => pattern.test(String(e)))) {
            event.preventDefault();
          }
        }
      };
      window.addEventListener('unhandledrejection', handleRejection);
      
      // Also suppress errors from script loading
      originalErrorHandler = window.onerror;
      window.onerror = (message, source, lineno, colno, error) => {
        const errorMessage = message || String(error) || '';
        if (suppressedPatterns.some(pattern => pattern.test(errorMessage))) {
          return true; // Suppress the error
        }
        if (originalErrorHandler) {
          return originalErrorHandler(message, source, lineno, colno, error);
        }
        return false;
      };
      
      try {
        // Load Pyodide from CDN - using latest stable version
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.3/full/pyodide.js';
        script.async = true;
        
        script.onload = async () => {
          try {
            // @ts-ignore - Pyodide is loaded from CDN
            const pyodide = await window.loadPyodide({
              indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.3/full/'
            });
            pyodideRef.current = pyodide;
            setIsPyodideLoaded(true);
            setIsLoading(false);
            
            // Restore console functions and error handlers
            restoreConsole();
            if (handleRejection) {
              window.removeEventListener('unhandledrejection', handleRejection);
            }
            if (originalErrorHandler !== null) {
              window.onerror = originalErrorHandler;
            }
          } catch (err) {
            consoleOriginalsRef.current?.error('Error initializing Pyodide:', err);
            setError('Failed to load Python interpreter. Please refresh the page.');
            setIsLoading(false);
            // Restore console functions and error handlers
            restoreConsole();
            if (handleRejection) {
              window.removeEventListener('unhandledrejection', handleRejection);
            }
            if (originalErrorHandler !== null) {
              window.onerror = originalErrorHandler;
            }
          }
        };
        
        script.onerror = () => {
          setError('Failed to load Python interpreter. Please check your internet connection.');
          setIsLoading(false);
          // Restore console functions and error handlers
          restoreConsole();
          if (handleRejection) {
            window.removeEventListener('unhandledrejection', handleRejection);
          }
          if (originalErrorHandler !== null) {
            window.onerror = originalErrorHandler;
          }
        };
        
        document.head.appendChild(script);
      } catch (err) {
        consoleOriginalsRef.current?.error('Error loading Pyodide:', err);
        setError('Failed to load Python interpreter.');
        setIsLoading(false);
        // Restore console functions and error handlers
        restoreConsole();
        if (handleRejection) {
          window.removeEventListener('unhandledrejection', handleRejection);
        }
        if (originalErrorHandler !== null) {
          window.onerror = originalErrorHandler;
        }
      }
    };

    loadPyodide();
    
    // Cleanup function to restore console and error handlers if component unmounts
    return () => {
      if (consoleOriginalsRef.current) {
        console.error = consoleOriginalsRef.current.error;
        console.warn = consoleOriginalsRef.current.warn;
      }
      if (handleRejection) {
        window.removeEventListener('unhandledrejection', handleRejection);
      }
      if (originalErrorHandler !== null) {
        window.onerror = originalErrorHandler;
      }
    };
  }, []);

  // Run Python code
  const runCode = async () => {
    if (!isPyodideLoaded || !pyodideRef.current) {
      setError('Python interpreter is still loading. Please wait...');
      return;
    }

    if (!code.trim()) {
      setError('Please write some code first!');
      return;
    }

    setError('');
    setOutput('');
    setIsLoading(true);

    try {
      // Capture print output
      let capturedOutput = '';
      pyodideRef.current.setStdout({
        batched: (text) => {
          capturedOutput += text;
        }
      });

      // Run the code
      await pyodideRef.current.runPython(code);
      
      setOutput(capturedOutput || '(No output)');
      setIsLoading(false);
      
      // Verify the code
      verifyCode(capturedOutput);
    } catch (err) {
      setError(err.message || 'An error occurred while running your code.');
      setOutput('');
      setIsLoading(false);
      setIsCorrect(false);
      setVerificationMessage('There was an error in your code. Please fix it and try again.');
    }
  };

  // Verify code correctness
  const verifyCode = (outputText) => {
    if (!exercise) {
      setIsCorrect(true);
      setVerificationMessage('✓ Code executed successfully!');
      return;
    }

    let correct = false;
    let message = '';

    // Check expected output
    if (exercise.expectedOutput) {
      const normalizedOutput = outputText.trim();
      const normalizedExpected = exercise.expectedOutput.trim();
      // Also try without newlines for comparison
      const outputNoNewlines = normalizedOutput.replace(/\n/g, '');
      const expectedNoNewlines = normalizedExpected.replace(/\n/g, '');
      
      if (normalizedOutput === normalizedExpected || outputNoNewlines === expectedNoNewlines) {
        correct = true;
        message = '✓ Perfect! Your output matches exactly!';
      } else {
        message = `✗ Expected: "${normalizedExpected}" but got: "${normalizedOutput}"`;
      }
    }
    // Check if output contains expected text
    else if (exercise.expectedContains) {
      if (outputText.includes(exercise.expectedContains)) {
        correct = true;
        message = `✓ Great! Your output contains "${exercise.expectedContains}"!`;
      } else {
        message = `✗ Your output should contain "${exercise.expectedContains}"`;
      }
    }
    // Check code pattern
    else if (exercise.codePattern) {
      const regex = new RegExp(exercise.codePattern, 'i');
      if (regex.test(code)) {
        correct = true;
        message = '✓ Good! Your code uses the correct pattern!';
      } else {
        message = '✗ Your code doesn\'t match the required pattern. Check the instructions.';
      }
    }
    // Just check that code runs without errors
    else {
      correct = true;
      message = '✓ Code executed successfully!';
    }

    setIsCorrect(correct);
    setVerificationMessage(message);
  };

  const handleComplete = async () => {
    if (!lesson || !isCorrect) return;
    
    try {
      const userId = getUserId();
      const progressId = getNextProgressId();
      const progress = new Progress({
        id: progressId,
        studentId: userId,
        activityType: 'Lesson',
        activityId: lesson.id,
        yearId: lesson.yearId,
        subjectId: lesson.subjectId,
        lessonNumber: lesson.lessonNumber,
        isCompleted: true,
        completedAt: new Date(),
        score: 100,
      });
      await addProgress(progress);
      await saveData();
      
      // Navigate to next lesson or back to subject
      const nextLesson = getNextLessonAfter(lesson);
      if (nextLesson && nextLesson.id) {
        navigate(`/lesson/${nextLesson.id}`);
      } else if (lesson.subjectId) {
        navigate(`/lessons?subjectId=${lesson.subjectId}`);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  // Reset all state when lesson changes
  useEffect(() => {
    if (lesson) {
      // Reset all state when lesson changes
      setIsCorrect(false);
      setVerificationMessage('');
      setOutput('');
      setError('');
      
      // Set default code based on lesson number
      if (lesson.lessonNumber) {
        const defaults = {
          1: 'print("Hello, World!")', // Lesson 1: Code pre-written for first lesson
          2: '', // Lesson 2: Students write their own code
          3: '', // Lesson 3: Students learn to create variables themselves
          4: '', // Lesson 4: Students learn input() and type conversion
          5: '', // Lesson 5: Students learn if statements and decision-making
          6: '', // Lesson 6: Students learn loops and repetition
          7: '', // Lesson 7: Students learn functions and code organization
          8: '', // Lesson 8: Students learn turtle graphics and creative coding
        };
        if (defaults[lesson.lessonNumber]) {
          setCode(defaults[lesson.lessonNumber]);
        } else {
          setCode('');
        }
      } else {
        setCode('');
      }
    }
  }, [lesson?.id]); // Reset when lesson ID changes

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      gap: '20px',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>🐍 Python Code Editor</h2>
        <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>
          Write Python code and run it to see the results!
        </p>
        {exercise && (() => {
          // Safely extract instruction text - handle various formats
          let instructionText = '';
          
          // First, try to get instruction from exercise object
          if (exercise && typeof exercise === 'object') {
            if (exercise.instruction) {
              instructionText = String(exercise.instruction);
            } else {
              // If no instruction property, exercise might be malformed
              return null;
            }
          } else if (typeof exercise === 'string') {
            // If exercise is a string, try to parse it as JSON
            try {
              const parsed = JSON.parse(exercise);
              if (parsed && parsed.instruction && typeof parsed.instruction === 'string') {
                instructionText = parsed.instruction;
              } else {
                return null; // Can't extract instruction
              }
            } catch {
              return null; // Not valid JSON
            }
          } else {
            return null; // Invalid exercise format
          }
          
          // If instruction looks like JSON (contains JSON structure), try to parse it to extract the actual instruction
          let trimmed = instructionText.trim();
          
          // More aggressive check for JSON - look for the pattern of a JSON object with instruction key
          const hasJsonStructure = trimmed.startsWith('{') && 
                                   (trimmed.includes('"instruction"') || trimmed.includes("'instruction'")) &&
                                   (trimmed.includes('"codePattern"') || trimmed.includes('"expectedContains"') || 
                                    trimmed.includes("'codePattern'") || trimmed.includes("'expectedContains'"));
          
          if (hasJsonStructure) {
            try {
              const parsed = JSON.parse(trimmed);
              if (parsed && parsed.instruction) {
                // Recursively extract if instruction is still JSON
                let extracted = String(parsed.instruction);
                if (extracted.trim().startsWith('{') && extracted.includes('"instruction"')) {
                  try {
                    const nestedParsed = JSON.parse(extracted);
                    extracted = nestedParsed.instruction || extracted;
                  } catch {
                    // Not nested JSON, use as is
                  }
                }
                instructionText = extracted;
              } else {
                return null; // Can't extract instruction from JSON
              }
            } catch (e) {
              // If JSON parsing fails, try to extract instruction manually using regex
              const instructionMatch = trimmed.match(/"instruction"\s*:\s*"([^"]+)"/);
              if (instructionMatch && instructionMatch[1]) {
                instructionText = instructionMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n');
              } else {
                return null; // Can't extract instruction
              }
            }
          }
          
          // Final validation - ensure we have clean instruction text (not JSON)
          trimmed = instructionText.trim();
          const stillLooksLikeJson = trimmed.startsWith('{') && 
                                     (trimmed.includes('"instruction"') || trimmed.includes("'instruction'")) &&
                                     (trimmed.includes('"codePattern"') || trimmed.includes('"expectedContains"'));
          
          if (!trimmed || trimmed === '' || stillLooksLikeJson) {
            return null;
          }
          
          return (
            <div style={{
              padding: '12px',
              backgroundColor: '#e7f3ff',
              borderRadius: '6px',
              border: '1px solid #b3d9ff',
              marginTop: '10px',
            }}>
              <div style={{ fontWeight: '600', marginBottom: '5px', color: '#004085' }}>
                Exercise:
              </div>
              <div style={{ color: '#004085', fontSize: '14px' }}>
                {trimmed}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Main content area */}
      <div style={{
        display: 'flex',
        flex: 1,
        gap: '20px',
        minHeight: 0,
      }}>
        {/* Code Editor */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ fontWeight: '600', fontSize: '14px', color: '#333' }}>
              Python Code
            </span>
            {!isPyodideLoaded && (
              <span style={{ fontSize: '12px', color: '#666' }}>
                Loading Python interpreter...
              </span>
            )}
          </div>
          <Editor
            height="100%"
            defaultLanguage="python"
            value={code}
            onChange={(value) => {
              setCode(value || '');
              setIsCorrect(false);
              setVerificationMessage('');
            }}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
              tabSize: 4,
              insertSpaces: true,
              wordWrap: 'on',
              padding: { top: 15, bottom: 15 },
            }}
          />
          <div style={{
            padding: '10px 15px',
            backgroundColor: '#f8f9fa',
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            gap: '10px',
          }}>
            <button
              onClick={runCode}
              disabled={!isPyodideLoaded || isLoading}
              style={{
                padding: '8px 16px',
                backgroundColor: isPyodideLoaded && !isLoading ? '#28a745' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isPyodideLoaded && !isLoading ? 'pointer' : 'not-allowed',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              {isLoading ? 'Running...' : '▶ Run Code'}
            </button>
            <button
              onClick={() => {
                setCode('');
                setOutput('');
                setError('');
                setIsCorrect(false);
                setVerificationMessage('');
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Output */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #e0e0e0',
            fontWeight: '600',
            fontSize: '14px',
            color: '#333',
          }}>
            Output
          </div>
          <div style={{
            flex: 1,
            padding: '15px',
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: '14px',
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
            whiteSpace: 'pre-wrap',
            minHeight: '100px',
          }}>
            {isLoading && <div style={{ color: '#ffa500' }}>Running code...</div>}
            {error && <div style={{ color: '#ff6b6b' }}>{error}</div>}
            {output && !error && <div style={{ color: '#51cf66' }}>{output}</div>}
            {!output && !error && !isLoading && (
              <div style={{ color: '#666' }}>Output will appear here after you run your code.</div>
            )}
          </div>
          {verificationMessage && (
            <div style={{
              padding: '12px 15px',
              backgroundColor: isCorrect ? '#d4edda' : '#f8d7da',
              borderTop: '1px solid #e0e0e0',
              color: isCorrect ? '#155724' : '#721c24',
              fontSize: '14px',
              fontWeight: '500',
            }}>
              {verificationMessage}
            </div>
          )}
        </div>
      </div>

      {/* Footer with complete button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <div style={{ fontSize: '14px', color: '#666' }}>
          {isCorrect ? (
            <span style={{ color: '#28a745', fontWeight: '600' }}>
              ✓ Exercise completed correctly!
            </span>
          ) : (
            <span>Complete the exercise to finish this lesson.</span>
          )}
        </div>
        <button
          onClick={handleComplete}
          disabled={!isCorrect}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: isCorrect ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isCorrect ? 'pointer' : 'not-allowed',
            fontWeight: 'bold',
          }}
        >
          Complete Lesson ✓
        </button>
      </div>
    </div>
  );
}

export default PythonCodeEditor;

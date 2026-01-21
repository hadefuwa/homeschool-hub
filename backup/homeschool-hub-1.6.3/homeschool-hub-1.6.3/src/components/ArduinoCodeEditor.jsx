import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import MarkdownWithYouTube from './MarkdownWithYouTube';
import InteractiveQuestion from './InteractiveQuestion';

function ArduinoCodeEditor({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextLessonAfter = useDataStore(state => state.getNextLessonAfter);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  
  // Track question answers for interactive lessons
  const [questionAnswers, setQuestionAnswers] = useState(new Map());
  const [hasIncorrectAnswer, setHasIncorrectAnswer] = useState(false);

  // Extract exercise requirements from lesson content
  const getExerciseRequirements = () => {
    if (!lesson || !lesson.content) return null;
    
    // Look for exercise markers in the content (JSON format)
    const exerciseMatch = lesson.content.match(/<!-- EXERCISE_START -->([\s\S]*?)<!-- EXERCISE_END -->/);
    if (exerciseMatch) {
      try {
        return JSON.parse(exerciseMatch[1]);
      } catch (e) {
        // If not JSON, try to parse as simple text
        return {
          instruction: exerciseMatch[1].trim(),
          expectedOutput: null,
          expectedContains: null,
          codePattern: null,
          requiredFunctions: null,
          requiredStatements: null
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
        codePattern: null,
        requiredFunctions: null,
        requiredStatements: null
      };
    }
    
    // Default exercises based on lesson number
    // Note: Arduino lessons in year2 start at lessonNumber 4
    const lessonNum = lesson.lessonNumber || 1;
    const defaults = {
      4: { // Arduino Lesson 1: setup()
        instruction: 'Write a complete Arduino sketch with a setup() function that sets pin 13 as OUTPUT',
        codePattern: 'void\\s+setup\\s*\\(\\s*\\)',
        requiredFunctions: ['setup'],
        requiredStatements: ['pinMode']
      },
      5: { // Arduino Lesson 3: Semicolons
        instruction: 'Write Arduino code with proper semicolons. Include at least one variable declaration and one function call, both with semicolons.',
        codePattern: ';',
        requiredStatements: ['pinMode', 'digitalWrite']
      },
      6: { // Arduino Lesson 4: Variables
        instruction: 'Declare a variable of type int and assign it a value. Example: int ledPin = 13;',
        codePattern: 'int\\s+\\w+\\s*=',
        requiredStatements: null
      },
      7: { // Arduino Lesson 5: Digital I/O
        instruction: 'Write code to set a pin as OUTPUT and use digitalWrite() to turn it HIGH',
        requiredFunctions: ['setup'],
        requiredStatements: ['pinMode', 'digitalWrite']
      },
      8: { // Arduino Lesson 6: Analog I/O
        instruction: 'Use analogRead() to read from an analog pin, or analogWrite() to write PWM to a pin',
        codePattern: 'analog(Read|Write)\\s*\\(',
        requiredStatements: null
      },
      9: { // Arduino Lesson 7: Control Structures
        instruction: 'Write an if statement or a for loop in your Arduino code',
        codePattern: '(if\\s*\\(|for\\s*\\()',
        requiredStatements: null
      },
      10: { // Arduino Lesson 8: Functions
        instruction: 'Create a custom function in your Arduino sketch',
        codePattern: 'void\\s+\\w+\\s*\\([^)]*\\)\\s*\\{',
        requiredFunctions: null
      },
      11: { // Arduino Lesson 9: Arrays
        instruction: 'Declare and use an array in your Arduino code',
        codePattern: '\\w+\\s+\\w+\\s*\\[\\s*\\d+\\s*\\]',
        requiredStatements: null
      },
      12: { // Arduino Lesson 10: Serial
        instruction: 'Use Serial.begin() in setup() and Serial.println() to send data',
        requiredFunctions: ['setup'],
        requiredStatements: ['Serial.begin', 'Serial.println']
      }
    };
    
    return defaults[lessonNum] || {
      instruction: 'Write Arduino code to complete this exercise',
      expectedOutput: null,
      expectedContains: null,
      codePattern: null,
      requiredFunctions: null,
      requiredStatements: null
    };
  };

  const exercise = getExerciseRequirements();

  // Extract questions from lesson content
  const getQuestions = () => {
    if (!lesson || !lesson.content) return [];
    
    const questionRegex = /<!-- QUESTION_START -->\s*([\s\S]*?)\s*<!-- OPTIONS -->\s*([\s\S]*?)\s*<!-- CORRECT -->\s*(\d+)\s*(?:<!-- EXPLANATION -->\s*([\s\S]*?))?\s*<!-- QUESTION_END -->/g;
    const questions = [];
    let match;
    
    questionRegex.lastIndex = 0;
    while ((match = questionRegex.exec(lesson.content)) !== null) {
      questions.push({
        question: match[1].trim(),
        options: match[2].split('|').map(opt => opt.trim()),
        correctIndex: parseInt(match[3]),
        explanation: match[4] ? match[4].trim() : null,
      });
    }
    
    return questions;
  };

  const questions = getQuestions();
  const totalQuestions = questions.length;
  // For Arduino lessons, show questions if they exist, regardless of assessmentType
  const isInteractiveLesson = lesson && totalQuestions > 0;

  // Handle question answer
  const handleQuestionAnswer = (questionId, isCorrect) => {
    setQuestionAnswers(prev => {
      const newMap = new Map(prev);
      newMap.set(questionId, isCorrect);
      return newMap;
    });
    
    if (!isCorrect) {
      setHasIncorrectAnswer(true);
    }
  };

  // Check if all questions are answered correctly
  const allQuestionsCorrect = isInteractiveLesson && 
    questionAnswers.size === totalQuestions &&
    Array.from(questionAnswers.values()).every(answer => answer === true) &&
    !hasIncorrectAnswer;

  // Validate Arduino code
  const validateCode = () => {
    if (!code.trim()) {
      setError('Please write some code first!');
      return false;
    }

    // Basic syntax checks
    const errors = [];
    
    // Check for balanced braces
    const openBraces = (code.match(/{/g) || []).length;
    const closeBraces = (code.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
      errors.push('Unbalanced braces: Make sure every { has a matching }');
    }

    // Check for balanced parentheses
    const openParens = (code.match(/\(/g) || []).length;
    const closeParens = (code.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
      errors.push('Unbalanced parentheses: Make sure every ( has a matching )');
    }

    // Check for basic Arduino structure (setup and loop functions)
    const hasSetup = /void\s+setup\s*\(\s*\)/.test(code);
    const hasLoop = /void\s+loop\s*\(\s*\)/.test(code);
    
    if (!hasSetup && !hasLoop) {
      errors.push('Warning: Arduino sketches typically need setup() and loop() functions');
    }

    if (errors.length > 0) {
      setError(errors.join('\n'));
      return false;
    }

    setError('');
    return true;
  };

  // Verify code correctness
  const verifyCode = () => {
    if (!exercise) {
      setIsCorrect(true);
      setVerificationMessage('✓ Code structure looks good!');
      return;
    }

    let correct = false;
    let message = '';
    const codeUpper = code.toUpperCase();
    const codeNormalized = code.replace(/\s+/g, ' ');

    // Check for required functions
    if (exercise.requiredFunctions) {
      const missingFunctions = exercise.requiredFunctions.filter(func => {
        const regex = new RegExp(`void\\s+${func}\\s*\\(\\s*\\)`, 'i');
        return !regex.test(code);
      });
      
      if (missingFunctions.length > 0) {
        message = `✗ Missing required function(s): ${missingFunctions.join(', ')}`;
        setIsCorrect(false);
        setVerificationMessage(message);
        return;
      }
    }

    // Check for required statements
    if (exercise.requiredStatements) {
      const missingStatements = exercise.requiredStatements.filter(stmt => {
        const regex = new RegExp(stmt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        return !regex.test(code);
      });
      
      if (missingStatements.length > 0) {
        message = `✗ Missing required statement(s): ${missingStatements.join(', ')}`;
        setIsCorrect(false);
        setVerificationMessage(message);
        return;
      }
    }

    // Check code pattern
    if (exercise.codePattern) {
      const regex = new RegExp(exercise.codePattern, 'i');
      if (regex.test(code)) {
        correct = true;
        message = '✓ Good! Your code uses the correct pattern!';
      } else {
        message = '✗ Your code doesn\'t match the required pattern. Check the instructions.';
      }
    } else if (exercise.requiredFunctions || exercise.requiredStatements) {
      // If we have required functions/statements and they all passed, it's correct
      correct = true;
      message = '✓ Excellent! Your code includes all required elements!';
    } else {
      // Just check that code has valid structure
      if (validateCode()) {
        correct = true;
        message = '✓ Code structure looks good!';
      } else {
        message = '✗ Please fix the syntax errors in your code.';
      }
    }

    setIsCorrect(correct);
    setVerificationMessage(message);
  };

  // Check code
  const checkCode = () => {
    if (!validateCode()) {
      setIsCorrect(false);
      return;
    }
    
    verifyCode();
  };

  const handleComplete = async () => {
    if (!lesson) return;
    
    // For interactive lessons, require both code and questions
    if (isInteractiveLesson) {
      if (!allQuestionsCorrect || !isCorrect) {
        return;
      }
    } else {
      // For non-interactive lessons, just require code
      if (!isCorrect) {
        return;
      }
    }
    
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
      setIsCorrect(false);
      setVerificationMessage('');
      setOutput('');
      setError('');
      setQuestionAnswers(new Map());
      setHasIncorrectAnswer(false);
      
      // Set default code based on lesson number
      // Note: Arduino lessons in year2 start at lessonNumber 4
      if (lesson.lessonNumber) {
        const defaults = {
          4: 'void setup() {\n  // Your code here\n}\n\nvoid loop() {\n  // Your code here\n}',
          5: 'void setup() {\n  pinMode(13, OUTPUT);\n  digitalWrite(13, HIGH);\n}\n\nvoid loop() {\n  // Your code here\n}',
          6: 'int ledPin = 13;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  // Your code here\n}',
          7: 'void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}',
          8: 'void setup() {\n  pinMode(9, OUTPUT);\n}\n\nvoid loop() {\n  analogWrite(9, 128);\n  delay(1000);\n}',
          9: 'void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  for (int i = 0; i < 10; i++) {\n    digitalWrite(13, HIGH);\n    delay(100);\n    digitalWrite(13, LOW);\n    delay(100);\n  }\n}',
          10: 'void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid blinkLED() {\n  digitalWrite(13, HIGH);\n  delay(500);\n  digitalWrite(13, LOW);\n  delay(500);\n}\n\nvoid loop() {\n  blinkLED();\n}',
          11: 'int pins[] = {13, 12, 11};\n\nvoid setup() {\n  for (int i = 0; i < 3; i++) {\n    pinMode(pins[i], OUTPUT);\n  }\n}\n\nvoid loop() {\n  // Your code here\n}',
          12: 'void setup() {\n  Serial.begin(9600);\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  Serial.println("Hello Arduino!");\n  delay(1000);\n}'
        };
        if (defaults[lesson.lessonNumber]) {
          setCode(defaults[lesson.lessonNumber]);
        } else {
          setCode('void setup() {\n  // Your code here\n}\n\nvoid loop() {\n  // Your code here\n}');
        }
      } else {
        setCode('void setup() {\n  // Your code here\n}\n\nvoid loop() {\n  // Your code here\n}');
      }
    }
  }, [lesson?.id]);

  // Split content to show questions separately
  const getContentWithoutQuestions = () => {
    if (!lesson || !lesson.content) return '';
    let content = lesson.content;
    // Remove questions
    content = content.replace(/<!-- QUESTION_START -->[\s\S]*?<!-- QUESTION_END -->/g, '');
    // Remove exercise JSON blocks and any preceding "## Exercise" headers
    // This handles both "## Exercise" and "## Exercise:" variations, with optional blank lines
    content = content.replace(/##\s*Exercise:?\s*[\s\n]*<!-- EXERCISE_START -->[\s\S]*?<!-- EXERCISE_END -->/g, '');
    // Also remove exercise blocks that might not have a header (fallback)
    content = content.replace(/<!-- EXERCISE_START -->[\s\S]*?<!-- EXERCISE_END -->/g, '');
    return content;
  };

  const canComplete = isInteractiveLesson 
    ? (allQuestionsCorrect && isCorrect)
    : isCorrect;

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
        <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>🔌 Arduino Code Editor</h2>
        <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>
          Write Arduino code and check it for correctness!
        </p>
        {exercise && (
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
              {exercise.instruction}
            </div>
          </div>
        )}
      </div>

      {/* Main content area - split between content/questions and code editor */}
      <div style={{
        display: 'flex',
        flex: 1,
        gap: '20px',
        minHeight: 0,
      }}>
        {/* Left side: Lesson content and questions */}
        <div style={{
          flex: '0 0 40%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}>
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            lineHeight: '1.6',
          }}>
            <MarkdownWithYouTube 
              content={getContentWithoutQuestions()}
            />
            
            {/* Questions */}
            {questions.map((q, idx) => (
              <InteractiveQuestion
                key={`question-${idx}`}
                questionId={idx}
                question={q.question}
                options={q.options}
                correctIndex={q.correctIndex}
                explanation={q.explanation}
                onAnswer={handleQuestionAnswer}
              />
            ))}
          </div>
        </div>

        {/* Right side: Code Editor */}
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
              Arduino Code (C++)
            </span>
          </div>
          <Editor
            height="100%"
            defaultLanguage="cpp"
            value={code}
            onChange={(value) => {
              setCode(value || '');
              setIsCorrect(false);
              setVerificationMessage('');
              setError('');
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
              tabSize: 2,
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
              onClick={checkCode}
              style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              ✓ Check Code
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
      </div>

      {/* Output/Feedback */}
      {(error || verificationMessage) && (
        <div style={{
          padding: '15px',
          backgroundColor: error ? '#f8d7da' : (isCorrect ? '#d4edda' : '#fff3cd'),
          borderRadius: '8px',
          border: `1px solid ${error ? '#dc3545' : (isCorrect ? '#28a745' : '#ffc107')}`,
          color: error ? '#721c24' : (isCorrect ? '#155724' : '#856404'),
          fontSize: '14px',
        }}>
          {error && <div style={{ fontWeight: '600', marginBottom: '5px' }}>Errors:</div>}
          {error && <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{error}</div>}
          {verificationMessage && <div>{verificationMessage}</div>}
        </div>
      )}

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
          {isInteractiveLesson ? (
            <>
              {canComplete ? (
                <span style={{ color: '#28a745', fontWeight: '600' }}>
                  ✓ Code and questions completed correctly!
                </span>
              ) : (
                <span>
                  {!allQuestionsCorrect && (
                    <span>Answer all {totalQuestions} questions correctly. </span>
                  )}
                  {!isCorrect && <span>Complete the code exercise. </span>}
                  Progress: {questionAnswers.size} / {totalQuestions} questions, Code: {isCorrect ? '✓' : '✗'}
                </span>
              )}
            </>
          ) : (
            <>
              {isCorrect ? (
                <span style={{ color: '#28a745', fontWeight: '600' }}>
                  ✓ Exercise completed correctly!
                </span>
              ) : (
                <span>Complete the exercise to finish this lesson.</span>
              )}
            </>
          )}
        </div>
        <button
          onClick={handleComplete}
          disabled={!canComplete}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: canComplete ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: canComplete ? 'pointer' : 'not-allowed',
            fontWeight: 'bold',
          }}
        >
          Complete Lesson ✓
        </button>
      </div>
    </div>
  );
}

export default ArduinoCodeEditor;

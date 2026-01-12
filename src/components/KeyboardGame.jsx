import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

const ARROWS = {
  up: '⬆️',
  down: '⬇️',
  left: '⬅️',
  right: '➡️',
};

const WASD_LETTERS = {
  up: 'W',
  down: 'S',
  left: 'A',
  right: 'D',
};

const KEY_MAPPINGS = {
  'ArrowUp': 'up',
  'ArrowDown': 'down',
  'ArrowLeft': 'left',
  'ArrowRight': 'right',
  'w': 'up',
  'W': 'up',
  's': 'down',
  'S': 'down',
  'a': 'left',
  'A': 'left',
  'd': 'right',
  'D': 'right',
};

const WASD_KEY_MAPPINGS = {
  'w': 'up',
  'W': 'up',
  's': 'down',
  'S': 'down',
  'a': 'left',
  'A': 'left',
  'd': 'right',
  'D': 'right',
};

function KeyboardGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextLessonAfter = useDataStore(state => state.getNextLessonAfter);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);
  
  // Determine game modes
  const isWASDMode = lesson && lesson.yearId === 'nursery' && lesson.lessonNumber === 3 && lesson.subjectId === 'technology';
  const isAZMode = lesson && lesson.yearId === 'nursery' && lesson.lessonNumber === 4 && lesson.subjectId === 'technology';
  const isNumbersMode = lesson && lesson.yearId === 'nursery' && lesson.lessonNumber === 5 && lesson.subjectId === 'technology';
  const isSymbolsMode = lesson && lesson.yearId === 'nursery' && lesson.lessonNumber === 6 && lesson.subjectId === 'technology';
  
  // A-Z letters array
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  
  // Numbers array (0-9)
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  
  // Symbols that require shift
  const symbols = ['!', '"', '£', '$', '%', '^', '&', '*', '(', ')'];
  const symbolKeyMappings = {
    '!': '1',
    '"': '2',
    '£': '3',
    '$': '4',
    '%': '5',
    '^': '6',
    '&': '7',
    '*': '8',
    '(': '9',
    ')': '0',
  };
  const [currentSymbolIndex, setCurrentSymbolIndex] = useState(0);
  
  const [score, setScore] = useState(0);
  const [correctKeys, setCorrectKeys] = useState(0);
  const [wrongKeys, setWrongKeys] = useState(0);
  const [arrowCount, setArrowCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentArrow, setCurrentArrow] = useState(null);
  const [currentLetter, setCurrentLetter] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [currentSymbol, setCurrentSymbol] = useState(null);
  const [arrowId, setArrowId] = useState(null);
  const arrowTimerRef = useRef(null);
  const isPlayingRef = useRef(false);
  const isGameOverRef = useRef(false);
  const arrowIntervalRef = useRef(2000);
  const arrowLifetimeRef = useRef(2500);
  const arrowCountRef = useRef(0);
  
  const initialArrowInterval = 2000; // Start at 2 seconds
  const fastArrowInterval = 1000; // After 8 arrows, speed up to 1 second
  const initialArrowLifetime = 2500; // Arrows stay for 2.5 seconds initially
  const fastArrowLifetime = 1500; // After 8 arrows, arrows stay for 1.5 seconds

  // Reset game state when lesson changes
  useEffect(() => {
    // Clear any existing timers
    if (arrowTimerRef.current) {
      clearTimeout(arrowTimerRef.current);
      arrowTimerRef.current = null;
    }
    
    // Reset all game state
    setIsPlaying(false);
    setIsGameOver(false);
    setScore(0);
    setCorrectKeys(0);
    setWrongKeys(0);
    setArrowCount(0);
    setCurrentArrow(null);
    setCurrentLetter(null);
    setCurrentNumber(null);
    setCurrentSymbol(null);
    setCurrentLetterIndex(0);
    setCurrentNumberIndex(0);
    setCurrentSymbolIndex(0);
    setArrowId(null);
    
    // Reset refs
    isPlayingRef.current = false;
    isGameOverRef.current = false;
    arrowCountRef.current = 0;
    arrowIntervalRef.current = initialArrowInterval;
    arrowLifetimeRef.current = initialArrowLifetime;
  }, [lesson?.id]); // Reset when lesson ID changes

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPlayingRef.current || isGameOverRef.current) return;
      
      const key = e.key;
      const code = e.code;
      const isShiftPressed = e.shiftKey;
      
      // Handle A-Z mode
      if (isAZMode && currentLetter) {
        const expectedKey = currentLetter.toUpperCase();
        if (key.toUpperCase() === expectedKey) {
          // Correct letter pressed
          setCorrectKeys(prev => prev + 1);
          setScore(prev => prev + 10);
          setCurrentLetter(null);
          
          if (arrowTimerRef.current) {
            clearTimeout(arrowTimerRef.current);
          }
          
          // Move to next letter
          // After spawnNextLetter() is called, currentLetterIndex is incremented
          // So currentLetterIndex already points to the next letter to show
          // Check if there are more letters to show (currentLetterIndex < alphabet.length)
          if (currentLetterIndex < alphabet.length) {
            spawnNextLetter();
          } else {
            // Completed all letters (just pressed Z, which is the last one)
            setTimeout(() => {
              endGame();
            }, 0);
          }
        } else if (key.length === 1 && /[A-Za-z]/.test(key)) {
          // Wrong letter pressed
          setWrongKeys(prev => prev + 1);
        }
        return;
      }
      
      // Handle numbers mode
      if (isNumbersMode && currentNumber) {
        if (key === currentNumber) {
          // Correct number pressed
          setCorrectKeys(prev => prev + 1);
          setScore(prev => prev + 10);
          setCurrentNumber(null);
          
          if (arrowTimerRef.current) {
            clearTimeout(arrowTimerRef.current);
          }
          
          // Move to next number
          if (currentNumberIndex < numbers.length - 1) {
            spawnNextNumber();
          } else {
            // Completed all numbers
            setTimeout(() => {
              endGame();
            }, 0);
          }
        } else if (/[0-9]/.test(key)) {
          // Wrong number pressed
          setWrongKeys(prev => prev + 1);
        }
        return;
      }
      
      // Handle symbols mode
      if (isSymbolsMode && currentSymbol) {
        // Ignore Shift key when pressed alone
        if (key === 'Shift') {
          return;
        }
        
        const expectedKey = symbolKeyMappings[currentSymbol];
        const expectedCode = `Digit${expectedKey}`;
        
        // Check if the key matches the expected symbol character (when Shift+number is pressed, key is the symbol)
        // Also check the code property as a fallback for better browser compatibility
        const isCorrectSymbol = (isShiftPressed && key === currentSymbol) || 
                                (isShiftPressed && code === expectedCode);
        
        if (isCorrectSymbol) {
          // Correct symbol pressed with shift
          setCorrectKeys(prev => prev + 1);
          setScore(prev => prev + 10);
          setCurrentSymbol(null);
          
          if (arrowTimerRef.current) {
            clearTimeout(arrowTimerRef.current);
          }
          
          // Move to next symbol
          if (currentSymbolIndex < symbols.length - 1) {
            spawnNextSymbol();
          } else {
            // Completed all symbols
            setTimeout(() => {
              endGame();
            }, 0);
          }
        } else {
          // Check if they pressed the number key without shift
          if (key === expectedKey && !isShiftPressed) {
            // Correct key but missing shift
            setWrongKeys(prev => prev + 1);
          } else if (/[0-9]/.test(key) && !isShiftPressed) {
            // Wrong number pressed (only count if shift is not pressed)
            setWrongKeys(prev => prev + 1);
          }
          // Other keys (including Shift+wrong numbers) are ignored (not counted as wrong)
        }
        return;
      }
      
      // Handle arrow/WASD modes
      const keyMappings = isWASDMode ? WASD_KEY_MAPPINGS : KEY_MAPPINGS;
      const direction = keyMappings[key];
      
      if (direction && currentArrow === direction) {
        // Correct key pressed
        setCorrectKeys(prev => prev + 1);
        setScore(prev => prev + 10);
        setCurrentArrow(null);
        setArrowId(null);
        
        // Clear the timeout for this arrow
        if (arrowTimerRef.current) {
          clearTimeout(arrowTimerRef.current);
        }
        
        // Schedule next arrow after interval (if not at 15 arrows yet)
        // For WASD mode, show next letter immediately (no delay)
        if (arrowCountRef.current < 15) {
          if (isWASDMode) {
            // Immediately show next letter for WASD mode
            spawnNextArrow();
          } else {
            setTimeout(() => {
              if (isPlayingRef.current && !isGameOverRef.current) {
                spawnNextArrow();
              }
            }, arrowIntervalRef.current);
          }
        } else {
          // Game over after 15 arrows
          setTimeout(() => {
            endGame();
          }, 0);
        }
      } else if (direction) {
        // Wrong key pressed
        setWrongKeys(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (arrowTimerRef.current) clearTimeout(arrowTimerRef.current);
    };
  }, [currentArrow, currentLetter, currentNumber, currentSymbol, currentLetterIndex, currentNumberIndex, currentSymbolIndex, isAZMode, isNumbersMode, isSymbolsMode, isWASDMode]);

  const startGame = () => {
    // Clear any existing timers
    if (arrowTimerRef.current) clearTimeout(arrowTimerRef.current);
    
    // Batch all state updates together to avoid multiple re-renders
    isPlayingRef.current = true;
    isGameOverRef.current = false;
    arrowIntervalRef.current = initialArrowInterval;
    arrowLifetimeRef.current = initialArrowLifetime;
    
    // Use a single state update batch
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setCorrectKeys(0);
    setWrongKeys(0);
    arrowCountRef.current = 0;
    setArrowCount(0);
    setCurrentArrow(null);
    setCurrentLetter(null);
    setCurrentNumber(null);
    setCurrentSymbol(null);
    setCurrentLetterIndex(0);
    setCurrentNumberIndex(0);
    setCurrentSymbolIndex(0);
    setArrowId(null);

    // Spawn first item based on mode
    setTimeout(() => {
      if (isAZMode) {
        spawnNextLetter();
      } else if (isNumbersMode) {
        spawnNextNumber();
      } else if (isSymbolsMode) {
        spawnNextSymbol();
      } else {
        spawnNextArrow();
      }
    }, 100);
  };
  
  const spawnNextLetter = () => {
    if (!isPlayingRef.current || isGameOverRef.current) return;
    
    if (currentLetterIndex >= alphabet.length) {
      setTimeout(() => {
        endGame();
      }, 0);
      return;
    }
    
    const letter = alphabet[currentLetterIndex];
    setCurrentLetter(letter);
    setCurrentLetterIndex(prev => prev + 1);
  };
  
  const spawnNextNumber = () => {
    if (!isPlayingRef.current || isGameOverRef.current) return;
    
    if (currentNumberIndex >= numbers.length) {
      setTimeout(() => {
        endGame();
      }, 0);
      return;
    }
    
    const number = numbers[currentNumberIndex];
    setCurrentNumber(number);
    setCurrentNumberIndex(prev => prev + 1);
  };
  
  const spawnNextSymbol = () => {
    if (!isPlayingRef.current || isGameOverRef.current) return;
    
    if (currentSymbolIndex >= symbols.length) {
      setTimeout(() => {
        endGame();
      }, 0);
      return;
    }
    
    const symbol = symbols[currentSymbolIndex];
    setCurrentSymbol(symbol);
    setCurrentSymbolIndex(prev => prev + 1);
  };

  const spawnNextArrow = () => {
    if (!isPlayingRef.current || isGameOverRef.current) return;

    // Don't spawn if we've already shown 15 arrows
    if (arrowCountRef.current >= 15) {
      setTimeout(() => {
        endGame();
      }, 0);
      return;
    }
    
    // Increment arrow count
    arrowCountRef.current += 1;
    setArrowCount(arrowCountRef.current);
    
    // Update speed after 8 arrows
    if (arrowCountRef.current >= 8) {
      arrowIntervalRef.current = fastArrowInterval;
      arrowLifetimeRef.current = fastArrowLifetime;
    }
    
    // Spawn the arrow
    const directions = ['up', 'down', 'left', 'right'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    const newArrowId = Date.now() + Math.random();
    
    setCurrentArrow(randomDirection);
    setArrowId(newArrowId);

    // Remove arrow after lifetime if not pressed
    arrowTimerRef.current = setTimeout(() => {
      setCurrentArrow(prevArrow => {
        if (prevArrow === randomDirection) {
          setWrongKeys(prevWrong => prevWrong + 1);
          return null;
        }
        return prevArrow;
      });
      setArrowId(null);
      
      // Check if we should spawn next arrow or end game
      if (arrowCountRef.current >= 15) {
        // End game after 15 arrows
        setTimeout(() => {
          endGame();
        }, 0);
      } else if (isPlayingRef.current && !isGameOverRef.current) {
        // Schedule next arrow after interval
        // For WASD mode, show next letter immediately (no delay)
        if (isWASDMode) {
          spawnNextArrow();
        } else {
          setTimeout(() => {
            if (isPlayingRef.current && !isGameOverRef.current) {
              spawnNextArrow();
            }
          }, arrowIntervalRef.current);
        }
      }
    }, arrowLifetimeRef.current);
  };

  const endGame = () => {
    const finalScore = score;
    
    setIsPlaying(false);
    setIsGameOver(true);
    isPlayingRef.current = false;
    isGameOverRef.current = true;
    if (arrowTimerRef.current) clearTimeout(arrowTimerRef.current);
    setCurrentArrow(null);
    setArrowId(null);

    // Mark lesson as complete - use setTimeout to ensure it's not during render
    if (lesson) {
      setTimeout(() => {
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
          score: finalScore,
        });
        addProgress(progress).then(() => {
          saveData();
        }).catch(err => {
          console.error('Error saving progress:', err);
        });
      }, 0);
    }
  };

  const accuracy = correctKeys + wrongKeys === 0 ? 0 : (correctKeys / (correctKeys + wrongKeys)) * 100;

  const getGrade = () => {
    // Different thresholds based on game mode
    if (isAZMode) {
      // A-Z game: 26 letters, max 260 points
      if (score >= 250 && accuracy === 100) return { name: 'Platinum', color: '#E5E4E2' };
      if (score >= 200 || (score >= 150 && accuracy === 100)) return { name: 'Gold', color: '#FFD700' };
      if (score >= 100 || accuracy >= 90) return { name: 'Silver', color: '#C0C0C0' };
      return { name: 'Bronze', color: '#CD7F32' };
    } else if (isNumbersMode) {
      // Numbers game: 10 numbers, max 100 points
      if (score >= 90 && accuracy === 100) return { name: 'Platinum', color: '#E5E4E2' };
      if (score >= 80 || (score >= 70 && accuracy === 100)) return { name: 'Gold', color: '#FFD700' };
      if (score >= 60 || accuracy >= 90) return { name: 'Silver', color: '#C0C0C0' };
      return { name: 'Bronze', color: '#CD7F32' };
    } else if (isSymbolsMode) {
      // Symbols game: 10 symbols, max 100 points
      if (score >= 90 && accuracy === 100) return { name: 'Platinum', color: '#E5E4E2' };
      if (score >= 80 || (score >= 70 && accuracy === 100)) return { name: 'Gold', color: '#FFD700' };
      if (score >= 60 || accuracy >= 90) return { name: 'Silver', color: '#C0C0C0' };
      return { name: 'Bronze', color: '#CD7F32' };
    } else {
      // Arrow/WASD game: 15 arrows, max 150 points
      if (score >= 140 && accuracy === 100) return { name: 'Platinum', color: '#E5E4E2' };
      if (score >= 120 || (score >= 100 && accuracy === 100)) return { name: 'Gold', color: '#FFD700' };
      if (score >= 80 || accuracy >= 85) return { name: 'Silver', color: '#C0C0C0' };
      return { name: 'Bronze', color: '#CD7F32' };
    }
  };

  const grade = getGrade();

  // Show start screen if game hasn't started
  if (!isPlaying && !isGameOver) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '40px',
        overflow: 'hidden',
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '500px',
        }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>⌨️</h1>
          <h2 style={{ marginBottom: '20px', fontSize: '28px' }}>
            {isAZMode ? 'A-Z Game' : isNumbersMode ? 'Numbers Game' : isSymbolsMode ? 'Symbols Game' : 'Keyboard Game'}
          </h2>
          <p style={{ marginBottom: '30px', fontSize: '16px', color: '#666' }}>
            {isAZMode ? (
              <>Type the letters A to Z in order!<br />Complete all 26 letters.</>
            ) : isNumbersMode ? (
              <>Type the numbers 0 to 9 in order!<br />Complete all 10 numbers.</>
            ) : isSymbolsMode ? (
              <>Type the symbols using Shift + number keys!<br />Complete all 10 symbols.</>
            ) : (
              <>Press the correct arrow keys as they appear!<br />Game ends after 15 arrows.</>
            )}
          </p>
          <button
            onClick={startGame}
            style={{
              padding: '15px 40px',
              fontSize: '20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  if (isGameOver) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '40px',
        overflow: 'hidden',
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '500px',
        }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🎉</h1>
          <h2 style={{ marginBottom: '10px', fontSize: '28px' }}>Game Over!</h2>
          <div style={{
            margin: '20px 0',
            padding: '20px',
            backgroundColor: grade.color,
            borderRadius: '8px',
            color: '#333',
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>
              {grade.name} Medal
            </div>
            <div style={{ fontSize: '18px' }}>Score: {score}</div>
          </div>
          <div style={{ marginTop: '20px', fontSize: '16px', color: '#666' }}>
            <p>Correct: {correctKeys}</p>
            <p>Wrong: {wrongKeys}</p>
            <p>Accuracy: {accuracy.toFixed(1)}%</p>
          </div>
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            marginTop: '30px',
          }}>
            <button
              onClick={startGame}
              style={{
                padding: '12px 30px',
                fontSize: '18px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Play Again
            </button>
            {lesson && (
              <button
                onClick={async () => {
                  await new Promise(resolve => setTimeout(resolve, 200));
                  const nextLesson = getNextLessonAfter(lesson);
                  if (nextLesson) {
                    navigate(`/lesson/${nextLesson.id}`);
                  } else {
                    navigate(`/lessons?subjectId=${lesson.subjectId}`);
                  }
                }}
                style={{
                  padding: '12px 30px',
                  fontSize: '18px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Next Lesson →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Stats Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderBottom: '2px solid #e0e0e0',
        marginBottom: '20px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: '#666' }}>Score</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{score}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: '#666' }}>{isWASDMode ? 'Keys' : 'Arrows'}</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
            {arrowCount}/15
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: '#666' }}>Correct</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>{correctKeys}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: '#666' }}>Wrong</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc3545' }}>{wrongKeys}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: '#666' }}>Accuracy</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{accuracy.toFixed(1)}%</div>
        </div>
      </div>

      {/* Game Area */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#f8f9fa',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        padding: '40px',
        overflow: 'hidden',
      }}>
        {(currentArrow || currentLetter || currentNumber || currentSymbol) && (
          <div style={{
            fontSize: '200px',
            animation: 'pulse 0.5s ease-in-out',
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
            {currentLetter && currentLetter}
            {currentNumber && currentNumber}
            {currentSymbol && currentSymbol}
            {currentArrow && (isWASDMode ? WASD_LETTERS[currentArrow] : ARROWS[currentArrow])}
          </div>
        )}
        <div style={{
          marginTop: '30px',
          fontSize: '18px',
          color: '#666',
          textAlign: 'center',
        }}>
          {currentLetter && (
            <div>Press {currentLetter}</div>
          )}
          {currentNumber && (
            <div>Press {currentNumber}</div>
          )}
          {currentSymbol && (
            <div>Press Shift + {symbolKeyMappings[currentSymbol]} for {currentSymbol}</div>
          )}
          {currentArrow && (
            <div>
              {isWASDMode ? (
                `Press ${WASD_LETTERS[currentArrow]}`
              ) : (
                `Press ${currentArrow === 'up' ? '↑ or W' : 
                       currentArrow === 'down' ? '↓ or S' : 
                       currentArrow === 'left' ? '← or A' : '→ or D'}`
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

export default KeyboardGame;


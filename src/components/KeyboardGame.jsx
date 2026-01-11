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

function KeyboardGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextLessonAfter = useDataStore(state => state.getNextLessonAfter);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);
  const [score, setScore] = useState(0);
  const [correctKeys, setCorrectKeys] = useState(0);
  const [wrongKeys, setWrongKeys] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(45);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentArrow, setCurrentArrow] = useState(null);
  const [arrowId, setArrowId] = useState(null);
  const gameTimerRef = useRef(null);
  const arrowTimerRef = useRef(null);
  const isPlayingRef = useRef(false);
  const isGameOverRef = useRef(false);
  const arrowIntervalRef = useRef(2000);
  const arrowLifetimeRef = useRef(2500);
  
  const initialArrowInterval = 2000; // Start at 2 seconds
  const minArrowInterval = 800; // Get down to 0.8 seconds (much faster)
  const initialArrowLifetime = 2500; // Arrows stay for 2.5 seconds initially
  const minArrowLifetime = 1200; // Get down to 1.2 seconds (much faster)

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPlayingRef.current || isGameOverRef.current) return;
      
      const key = e.key;
      const direction = KEY_MAPPINGS[key];
      
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
        
        // Schedule next arrow after interval
        setTimeout(() => {
          if (isPlayingRef.current && !isGameOverRef.current) {
            spawnNextArrow();
          }
        }, arrowIntervalRef.current);
      } else if (direction) {
        // Wrong key pressed
        setWrongKeys(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
      if (arrowTimerRef.current) clearTimeout(arrowTimerRef.current);
    };
  }, [currentArrow]);

  const startGame = () => {
    // Clear any existing timers
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    if (arrowTimerRef.current) clearTimeout(arrowTimerRef.current);
    
    setIsPlaying(true);
    setIsGameOver(false);
    isPlayingRef.current = true;
    isGameOverRef.current = false;
    setScore(0);
    setCorrectKeys(0);
    setWrongKeys(0);
    setTimeRemaining(45);
    setCurrentArrow(null);
    setArrowId(null);
    arrowIntervalRef.current = initialArrowInterval;
    arrowLifetimeRef.current = initialArrowLifetime;

    // Game countdown timer - strict 45 second limit
    gameTimerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          // Immediately end game when time reaches 0
          endGame();
          return 0;
        }
        // Update difficulty - more aggressive progression
        const progress = (45 - newTime) / 45.0;
        // Use exponential curve for more aggressive difficulty increase
        const easedProgress = progress * progress; // Quadratic easing for faster progression
        const newInterval = initialArrowInterval - (initialArrowInterval - minArrowInterval) * easedProgress;
        const newLifetime = initialArrowLifetime - (initialArrowLifetime - minArrowLifetime) * easedProgress;
        arrowIntervalRef.current = Math.max(newInterval, minArrowInterval);
        arrowLifetimeRef.current = Math.max(newLifetime, minArrowLifetime);
        return newTime;
      });
    }, 1000);

    // Spawn first arrow immediately
    setTimeout(() => spawnNextArrow(), 100);
  };

  const spawnNextArrow = () => {
    if (!isPlayingRef.current || isGameOverRef.current) return;

    const directions = ['up', 'down', 'left', 'right'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    const newArrowId = Date.now() + Math.random();
    
    setCurrentArrow(randomDirection);
    setArrowId(newArrowId);

    // Remove arrow after lifetime if not pressed
    arrowTimerRef.current = setTimeout(() => {
      setCurrentArrow(prev => {
        if (prev === randomDirection) {
          setWrongKeys(prevWrong => prevWrong + 1);
          return null;
        }
        return prev;
      });
      setArrowId(null);
      
      // Schedule next arrow after interval
      if (isPlayingRef.current && !isGameOverRef.current) {
        setTimeout(() => {
          if (isPlayingRef.current && !isGameOverRef.current) {
            spawnNextArrow();
          }
        }, arrowIntervalRef.current);
      }
    }, arrowLifetimeRef.current);
  };

  const endGame = () => {
    const finalScore = score;
    
    setIsPlaying(false);
    setIsGameOver(true);
    isPlayingRef.current = false;
    isGameOverRef.current = true;
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    if (arrowTimerRef.current) clearTimeout(arrowTimerRef.current);
    setCurrentArrow(null);
    setArrowId(null);

    // Mark lesson as complete if score is good enough - use setTimeout to ensure it's not during render
    if (lesson && finalScore >= 150) {
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
    if (score >= 200) return { name: 'Platinum', color: '#E5E4E2' };
    if (score >= 150) return { name: 'Gold', color: '#FFD700' };
    if (score >= 100) return { name: 'Silver', color: '#C0C0C0' };
    return { name: 'Bronze', color: '#CD7F32' };
  };

  const grade = getGrade();

  // Auto-start the game when component mounts
  useEffect(() => {
    // Small delay to ensure component is fully mounted and render is complete
    const timer = setTimeout(() => {
      if (!isPlayingRef.current && !isGameOverRef.current) {
        // Use requestAnimationFrame to ensure we're not in the middle of a render
        requestAnimationFrame(() => {
          if (!isPlayingRef.current && !isGameOverRef.current) {
            startGame();
          }
        });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isGameOver) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '40px',
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
          <div style={{ fontSize: '14px', color: '#666' }}>Time</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: timeRemaining <= 5 ? '#dc3545' : '#333' }}>
            {timeRemaining}s
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
        minHeight: '400px',
        backgroundColor: '#f8f9fa',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        padding: '40px',
      }}>
        {currentArrow ? (
          <div style={{
            fontSize: '200px',
            animation: 'pulse 0.5s ease-in-out',
            textAlign: 'center',
          }}>
            {ARROWS[currentArrow]}
          </div>
        ) : (
          <div style={{
            fontSize: '48px',
            color: '#999',
            textAlign: 'center',
          }}>
            Get ready...
          </div>
        )}
        <div style={{
          marginTop: '30px',
          fontSize: '18px',
          color: '#666',
          textAlign: 'center',
        }}>
          {currentArrow && (
            <div>
              Press {currentArrow === 'up' ? '↑ or W' : 
                     currentArrow === 'down' ? '↓ or S' : 
                     currentArrow === 'left' ? '← or A' : '→ or D'}
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


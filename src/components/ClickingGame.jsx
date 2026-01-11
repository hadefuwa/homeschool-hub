import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

function ClickingGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextLessonAfter = useDataStore(state => state.getNextLessonAfter);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [targets, setTargets] = useState([]);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const gameAreaRef = useRef(null);
  const gameTimerRef = useRef(null);
  const targetTimerRef = useRef(null);
  const isPlayingRef = useRef(false);
  const isGameOverRef = useRef(false);
  const targetSizeRef = useRef(100);
  const spawnIntervalRef = useRef(2000);
  const targetLifetimeRef = useRef(4000);
  
  // Progressive difficulty settings
  const [targetSize, setTargetSize] = useState(100);
  const [spawnInterval, setSpawnInterval] = useState(2000);
  const [targetLifetime, setTargetLifetime] = useState(4000);
  
  const initialTargetSize = 100;
  const minTargetSize = 30;
  const initialSpawnInterval = 2000;
  const minSpawnInterval = 500;
  const initialTargetLifetime = 4000;
  const minTargetLifetime = 1500;

  useEffect(() => {
    return () => {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
      if (targetTimerRef.current) clearTimeout(targetTimerRef.current);
    };
  }, []);

  const startGame = () => {
    // Clear any existing timers
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    if (targetTimerRef.current) clearTimeout(targetTimerRef.current);
    
    // Batch all state updates together to avoid multiple re-renders
    isPlayingRef.current = true;
    isGameOverRef.current = false;
    targetSizeRef.current = initialTargetSize;
    spawnIntervalRef.current = initialSpawnInterval;
    targetLifetimeRef.current = initialTargetLifetime;
    
    // Use a single state update batch
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setHits(0);
    setMisses(0);
    setTimeRemaining(30);
    setTargets([]);
    setTargetSize(initialTargetSize);
    setSpawnInterval(initialSpawnInterval);
    setTargetLifetime(initialTargetLifetime);

    // Game countdown timer
    gameTimerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        // Update difficulty
        const progress = (30 - prev + 1) / 30.0;
        const newSize = initialTargetSize - (initialTargetSize - minTargetSize) * progress;
        const newInterval = initialSpawnInterval - (initialSpawnInterval - minSpawnInterval) * progress;
        const newLifetime = initialTargetLifetime - (initialTargetLifetime - minTargetLifetime) * progress;
        setTargetSize(newSize);
        setSpawnInterval(newInterval);
        setTargetLifetime(newLifetime);
        targetSizeRef.current = newSize;
        spawnIntervalRef.current = newInterval;
        targetLifetimeRef.current = newLifetime;
        return prev - 1;
      });
    }, 1000);

    // Spawn first target immediately
    setTimeout(() => spawnTarget(), 100);
  };

  const spawnTarget = () => {
    if (!isPlayingRef.current || isGameOverRef.current || !gameAreaRef.current) return;

    const gameArea = gameAreaRef.current;
    const rect = gameArea.getBoundingClientRect();
    const currentSize = targetSizeRef.current;
    const padding = currentSize / 2;
    const maxX = rect.width - currentSize;
    const maxY = rect.height - currentSize;

    if (maxX < 0 || maxY < 0) return;

    const x = Math.random() * maxX + padding;
    const y = Math.random() * maxY + padding;
    const targetId = Date.now() + Math.random();

    setTargets(prev => [...prev, { id: targetId, x, y }]);

    // Remove target after lifetime if not clicked
    setTimeout(() => {
      setTargets(prev => {
        const exists = prev.some(t => t.id === targetId);
        if (exists) {
          setMisses(prevMisses => prevMisses + 1);
          return prev.filter(t => t.id !== targetId);
        }
        return prev;
      });
    }, targetLifetimeRef.current);

    // Schedule next spawn
    if (isPlayingRef.current && !isGameOverRef.current) {
      targetTimerRef.current = setTimeout(() => {
        spawnTarget();
      }, spawnIntervalRef.current);
    }
  };

  const handleTargetClick = (targetId) => {
    if (!isPlayingRef.current || isGameOverRef.current) return;

    setTargets(prev => prev.filter(t => t.id !== targetId));
    setHits(prev => prev + 1);
    setScore(prev => prev + 10);
  };

  const handleMissClick = () => {
    if (!isPlayingRef.current || isGameOverRef.current) return;
    setMisses(prev => prev + 1);
  };

  const endGame = () => {
    // Capture score before state updates
    const finalScore = score;
    
    setIsPlaying(false);
    setIsGameOver(true);
    isPlayingRef.current = false;
    isGameOverRef.current = true;
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    if (targetTimerRef.current) clearTimeout(targetTimerRef.current);
    setTargets([]);

    // Mark lesson as complete
    if (lesson) {
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
      // Save progress asynchronously - use setTimeout to ensure it's not during render
      setLessonCompleted(true);
      setTimeout(() => {
        addProgress(progress).then(() => {
          saveData();
        }).catch(err => {
          console.error('Error saving progress:', err);
        });
      }, 0);
    }
  };

  const accuracy = hits + misses === 0 ? 0 : (hits / (hits + misses)) * 100;

  const getGrade = () => {
    if (score >= 300) return { name: 'Platinum', color: '#E5E4E2' };
    if (score >= 200) return { name: 'Gold', color: '#FFD700' };
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
            <p>Hits: {hits}</p>
            <p>Misses: {misses}</p>
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
                  // Wait a moment for progress to be saved, then navigate
                  await new Promise(resolve => setTimeout(resolve, 200));
                  const nextLesson = getNextLessonAfter(lesson);
                  if (nextLesson) {
                    navigate(`/lesson/${nextLesson.id}`);
                  } else {
                    // If no next lesson, go back to lessons list
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
        marginBottom: '10px',
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
          <div style={{ fontSize: '14px', color: '#666' }}>Hits</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>{hits}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: '#666' }}>Misses</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc3545' }}>{misses}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: '#666' }}>Accuracy</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{accuracy.toFixed(1)}%</div>
        </div>
      </div>

      {/* Game Area */}
      <div
        ref={gameAreaRef}
        onClick={handleMissClick}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '500px',
          backgroundColor: '#f8f9fa',
          border: '2px solid #e0e0e0',
          borderRadius: '8px',
          overflow: 'hidden',
          cursor: 'crosshair',
        }}
      >
        {targets.map(target => (
          <div
            key={target.id}
            onClick={(e) => {
              e.stopPropagation();
              handleTargetClick(target.id);
            }}
            style={{
              position: 'absolute',
              left: `${target.x}px`,
              top: `${target.y}px`,
              width: `${targetSize}px`,
              height: `${targetSize}px`,
              backgroundColor: '#dc3545',
              borderRadius: '50%',
              border: '3px solid white',
              cursor: 'pointer',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              transition: 'transform 0.1s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ClickingGame;


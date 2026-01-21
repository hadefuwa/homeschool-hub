import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

function TapTapTapGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextLessonAfter = useDataStore(state => state.getNextLessonAfter);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);
  
  // Extract level from lesson title or use default
  const getLevel = () => {
    if (!lesson) return 1;
    const title = lesson.title || '';
    // Check for explicit level numbers first (more specific)
    if (title.includes('Level 6') || title.includes('Champion')) return 6;
    if (title.includes('Level 5') || title.includes('Master')) return 5;
    if (title.includes('Level 4') || title.includes('Expert')) return 4;
    if (title.includes('Level 3') || title.includes('Advanced')) return 3;
    if (title.includes('Level 2') || title.includes('Intermediate')) return 2;
    if (title.includes('Level 1') || title.includes('Beginner')) return 1;
    // Default based on year
    if (lesson.yearId === 'year6') return 6;
    if (lesson.yearId === 'year5') return 5;
    if (lesson.yearId === 'year4') return 4;
    if (lesson.yearId === 'year3') return 3;
    if (lesson.yearId === 'year2') return 2;
    if (lesson.yearId === 'year1') return 1;
    return 1;
  };

  const level = getLevel();
  
  // Level configurations
  const levelConfigs = {
    1: { 
      spawnInterval: 2000, 
      targetSize: 80, 
      gameDuration: 30, 
      speed: 2,
      bronze: 5, silver: 10, gold: 15, platinum: 20
    },
    2: { 
      spawnInterval: 1500, 
      targetSize: 70, 
      gameDuration: 30, 
      speed: 3,
      bronze: 10, silver: 20, gold: 30, platinum: 40
    },
    3: { 
      spawnInterval: 1200, 
      targetSize: 60, 
      gameDuration: 30, 
      speed: 4,
      bronze: 15, silver: 30, gold: 45, platinum: 60
    },
    4: { 
      spawnInterval: 1000, 
      targetSize: 50, 
      gameDuration: 30, 
      speed: 5,
      bronze: 20, silver: 40, gold: 60, platinum: 80
    },
    5: { 
      spawnInterval: 800, 
      targetSize: 45, 
      gameDuration: 30, 
      speed: 6,
      bronze: 25, silver: 50, gold: 75, platinum: 100
    },
    6: { 
      spawnInterval: 600, 
      targetSize: 40, 
      gameDuration: 30, 
      speed: 7,
      bronze: 30, silver: 60, gold: 90, platinum: 120
    },
  };

  const config = levelConfigs[level] || levelConfigs[1];
  
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(config.gameDuration);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const targetsRef = useRef([]);
  const gameTimerRef = useRef(null);
  const spawnTimerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastSpawnTimeRef = useRef(0);
  const isPlayingRef = useRef(false);
  const isGameOverRef = useRef(false);

  // Update refs when state changes
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    isGameOverRef.current = isGameOver;
  }, [isPlaying, isGameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 500;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(1, '#764ba2');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Use refs to get current state values
      const playing = isPlayingRef.current;
      const gameOver = isGameOverRef.current;

      if (!playing || gameOver) {
        // Draw start/game over screen
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(gameOver ? 'Game Over!' : 'Tap to Start', canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = '18px Arial';
        ctx.fillText('Tap the targets as they appear!', canvas.width / 2, canvas.height / 2 + 20);
        // Continue animation loop even when not playing
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      // Update and draw targets
      const currentTime = Date.now();
      for (let i = targetsRef.current.length - 1; i >= 0; i--) {
        const target = targetsRef.current[i];
        
        // Update target position (pulsing animation)
        target.pulse += 0.1;
        target.rotation += 0.05;
        
        // Remove targets that are too old
        if (currentTime - target.spawnTime > 2000) {
          targetsRef.current.splice(i, 1);
          continue;
        }

        // Draw target with pulsing effect
        ctx.save();
        ctx.translate(target.x, target.y);
        ctx.rotate(target.rotation);
        
        const pulseSize = target.size * (1 + Math.sin(target.pulse) * 0.1);
        
        // Outer circle
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, pulseSize);
        gradient.addColorStop(0, target.color);
        gradient.addColorStop(1, target.color.replace('1)', '0.6)'));
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner circle
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(0, 0, pulseSize * 0.6, 0, Math.PI * 2);
        ctx.fill();
        
        // Center dot
        ctx.fillStyle = target.color;
        ctx.beginPath();
        ctx.arc(0, 0, pulseSize * 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }

      // Always continue the animation loop
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleCanvasClick = (e) => {
    // Use refs to check current state
    if (!isPlayingRef.current) {
      startGame();
      return;
    }
    if (isGameOverRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked on a target
    let hit = false;
    for (let i = targetsRef.current.length - 1; i >= 0; i--) {
      const target = targetsRef.current[i];
      const dx = x - target.x;
      const dy = y - target.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < target.size) {
        // Hit the target!
        targetsRef.current.splice(i, 1);
        setScore(prev => prev + 1);
        hit = true;
        break;
      }
    }
  };

  const spawnTarget = () => {
    // Use refs to check current state (state updates are async)
    if (!isPlayingRef.current || isGameOverRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', 
      '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'
    ];
    
    targetsRef.current.push({
      x: Math.random() * (canvas.width - config.targetSize * 2) + config.targetSize,
      y: Math.random() * (canvas.height - config.targetSize * 2) + config.targetSize,
      size: config.targetSize,
      color: colors[Math.floor(Math.random() * colors.length)],
      spawnTime: Date.now(),
      pulse: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
    });
  };

  const startGame = () => {
    targetsRef.current = [];
    setScore(0);
    setTimeRemaining(config.gameDuration);
    setIsPlaying(true);
    setIsGameOver(false);
    // Update refs immediately (before state updates)
    isPlayingRef.current = true;
    isGameOverRef.current = false;
    lastSpawnTimeRef.current = Date.now();

    // Game timer
    gameTimerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Spawn targets - use a small delay to ensure refs are set
    setTimeout(() => {
      // Spawn targets
      const spawnLoop = () => {
        // Use refs to check current state
        if (!isPlayingRef.current || isGameOverRef.current) return;
        
        const now = Date.now();
        if (now - lastSpawnTimeRef.current >= config.spawnInterval) {
          spawnTarget();
          lastSpawnTimeRef.current = now;
        }
        
        spawnTimerRef.current = setTimeout(spawnLoop, 100);
      };
      
      spawnTarget(); // Spawn first target immediately
      spawnLoop();
    }, 50);
  };

  const endGame = () => {
    const finalScore = score;
    setIsPlaying(false);
    setIsGameOver(true);
    // Update refs immediately
    isPlayingRef.current = false;
    isGameOverRef.current = true;
    
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);

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

  useEffect(() => {
    return () => {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
    };
  }, []);

  const getGrade = () => {
    if (score >= config.platinum) return { name: 'Platinum', color: '#E5E4E2' };
    if (score >= config.gold) return { name: 'Gold', color: '#FFD700' };
    if (score >= config.silver) return { name: 'Silver', color: '#C0C0C0' };
    return { name: 'Bronze', color: '#CD7F32' };
  };

  const grade = getGrade();
  const canProgress = score >= config.bronze;

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
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🎯</h1>
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
            <div style={{ fontSize: '14px', marginTop: '5px', color: '#666' }}>
              Level {level}
            </div>
          </div>
          {!canProgress && (
            <div style={{
              marginTop: '15px',
              padding: '15px',
              backgroundColor: '#fff3cd',
              border: '2px solid #ffc107',
              borderRadius: '8px',
              color: '#856404',
            }}>
              ⚠️ You need at least {config.bronze} points (Bronze) to progress. Try again!
            </div>
          )}
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
            {lesson && canProgress && (
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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '600px',
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
          <div style={{ fontSize: '14px', color: '#666' }}>Level</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{level}</div>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{
          border: '3px solid #333',
          borderRadius: '8px',
          cursor: 'pointer',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <div style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
        Tap the targets as they appear! Be quick!
      </div>
    </div>
  );
}

export default TapTapTapGame;

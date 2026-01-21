import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

function BubblePopGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextLessonAfter = useDataStore(state => state.getNextLessonAfter);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);
  
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const bubblesRef = useRef([]);
  const gameTimerRef = useRef(null);
  const bubbleTimerRef = useRef(null);
  const animationFrameRef = useRef(null);
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
      
      // Draw background
      ctx.fillStyle = '#E0F7FA';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Use refs to get current state values
      const playing = isPlayingRef.current;
      const gameOver = isGameOverRef.current;

      if (!playing || gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(gameOver ? 'Game Over!' : 'Click to Start', canvas.width / 2, canvas.height / 2);
        // Continue animation loop even when not playing
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      // Update and draw bubbles
      for (let i = bubblesRef.current.length - 1; i >= 0; i--) {
        const bubble = bubblesRef.current[i];
        bubble.y -= bubble.speed;
        bubble.rotation += 0.05;

        // Remove bubbles that are off screen
        if (bubble.y + bubble.radius < 0) {
          bubblesRef.current.splice(i, 1);
          continue;
        }

        // Draw bubble
        ctx.save();
        ctx.translate(bubble.x, bubble.y);
        ctx.rotate(bubble.rotation);
        
        // Bubble gradient
        const gradient = ctx.createRadialGradient(-bubble.radius * 0.3, -bubble.radius * 0.3, 0, 0, 0, bubble.radius);
        gradient.addColorStop(0, bubble.color);
        gradient.addColorStop(1, bubble.color.replace('1)', '0.7)'));
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, bubble.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(-bubble.radius * 0.3, -bubble.radius * 0.3, bubble.radius * 0.4, 0, Math.PI * 2);
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

    // Check if clicked on a bubble
    for (let i = bubblesRef.current.length - 1; i >= 0; i--) {
      const bubble = bubblesRef.current[i];
      const dx = x - bubble.x;
      const dy = y - bubble.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < bubble.radius) {
        // Pop the bubble
        bubblesRef.current.splice(i, 1);
        setScore(prev => prev + 10);
        break;
      }
    }
  };

  const spawnBubble = () => {
    // Use refs to check current state (state updates are async)
    if (!isPlayingRef.current || isGameOverRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const colors = [
      'rgba(255, 100, 100, 1)',
      'rgba(100, 255, 100, 1)',
      'rgba(100, 100, 255, 1)',
      'rgba(255, 255, 100, 1)',
      'rgba(255, 100, 255, 1)',
      'rgba(100, 255, 255, 1)',
    ];
    
    bubblesRef.current.push({
      x: Math.random() * (canvas.width - 100) + 50,
      y: canvas.height + 50,
      radius: Math.random() * 30 + 20,
      speed: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
    });
  };

  const startGame = () => {
    bubblesRef.current = [];
    setScore(0);
    setTimeRemaining(30);
    setIsPlaying(true);
    setIsGameOver(false);
    // Update refs immediately (before state updates)
    isPlayingRef.current = true;
    isGameOverRef.current = false;

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

    // Spawn bubbles - use a small delay to ensure refs are set
    setTimeout(() => {
      spawnBubble(); // Spawn first bubble immediately
      bubbleTimerRef.current = setInterval(spawnBubble, 1000);
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
    if (bubbleTimerRef.current) clearInterval(bubbleTimerRef.current);

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
      if (bubbleTimerRef.current) clearInterval(bubbleTimerRef.current);
    };
  }, []);

  const getGrade = () => {
    if (score >= 200) return { name: 'Platinum', color: '#E5E4E2' };
    if (score >= 150) return { name: 'Gold', color: '#FFD700' };
    if (score >= 100) return { name: 'Silver', color: '#C0C0C0' };
    return { name: 'Bronze', color: '#CD7F32' };
  };

  const grade = getGrade();
  const canProgress = score >= 10; // At least bronze (10 points = 1 bubble)

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
          {!canProgress && (
            <div style={{
              marginTop: '15px',
              padding: '15px',
              backgroundColor: '#fff3cd',
              border: '2px solid #ffc107',
              borderRadius: '8px',
              color: '#856404',
            }}>
              ⚠️ You need at least 10 points (Bronze) to progress. Try again!
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
      </div>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{
          border: '3px solid #333',
          borderRadius: '8px',
          backgroundColor: '#E0F7FA',
          cursor: 'pointer',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <div style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
        Click on the bubbles to pop them!
      </div>
    </div>
  );
}

export default BubblePopGame;

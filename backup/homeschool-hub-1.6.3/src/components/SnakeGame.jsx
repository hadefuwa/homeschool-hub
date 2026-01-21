import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

function SnakeGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextLessonAfter = useDataStore(state => state.getNextLessonAfter);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);
  
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const snakeRef = useRef([{ x: 200, y: 200 }]);
  const directionRef = useRef({ x: 20, y: 0 });
  const nextDirectionRef = useRef({ x: 20, y: 0 });
  const foodRef = useRef({ x: 100, y: 100 });
  const gameLoopRef = useRef(null);
  const gridSize = 20;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;

    const draw = () => {
      // Clear canvas
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = '#16213e';
      ctx.lineWidth = 1;
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (!isPlaying || isGameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(isGameOver ? 'Game Over!' : 'Press Arrow Keys to Start', canvas.width / 2, canvas.height / 2);
        ctx.font = '16px Arial';
        ctx.fillText('Use arrow keys to move', canvas.width / 2, canvas.height / 2 + 40);
        return;
      }

      // Update direction
      directionRef.current = { ...nextDirectionRef.current };

      // Move snake
      const head = { ...snakeRef.current[0] };
      head.x += directionRef.current.x;
      head.y += directionRef.current.y;

      // Check wall collision
      if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        endGame();
        return;
      }

      // Check self collision
      for (let segment of snakeRef.current) {
        if (head.x === segment.x && head.y === segment.y) {
          endGame();
          return;
        }
      }

      snakeRef.current.unshift(head);

      // Check food collision
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore(prev => prev + 10);
        // Generate new food
        foodRef.current = {
          x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
          y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize,
        };
        // Make sure food is not on snake
        while (snakeRef.current.some(seg => seg.x === foodRef.current.x && seg.y === foodRef.current.y)) {
          foodRef.current = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize,
          };
        }
      } else {
        snakeRef.current.pop();
      }

      // Draw food
      ctx.fillStyle = '#ff6b6b';
      ctx.fillRect(foodRef.current.x, foodRef.current.y, gridSize, gridSize);
      ctx.fillStyle = '#ff4757';
      ctx.fillRect(foodRef.current.x + 2, foodRef.current.y + 2, gridSize - 4, gridSize - 4);

      // Draw snake
      snakeRef.current.forEach((segment, index) => {
        if (index === 0) {
          // Head
          ctx.fillStyle = '#4ecdc4';
          ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
          ctx.fillStyle = '#45b7b8';
          ctx.fillRect(segment.x + 2, segment.y + 2, gridSize - 4, gridSize - 4);
          // Eyes
          ctx.fillStyle = '#1a1a2e';
          ctx.fillRect(segment.x + 5, segment.y + 5, 3, 3);
          ctx.fillRect(segment.x + 12, segment.y + 5, 3, 3);
        } else {
          // Body
          ctx.fillStyle = '#95e1d3';
          ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
          ctx.fillStyle = '#4ecdc4';
          ctx.fillRect(segment.x + 2, segment.y + 2, gridSize - 4, gridSize - 4);
        }
      });
    };

    if (isPlaying && !isGameOver) {
      gameLoopRef.current = setInterval(draw, 150);
    } else {
      draw();
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [isPlaying, isGameOver, score]);

  const handleKeyPress = (e) => {
    if (!isPlaying) {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        startGame();
      }
      return;
    }

    if (isGameOver) return;

    const currentDir = directionRef.current;
    let newDir = { ...nextDirectionRef.current };

    switch (e.key) {
      case 'ArrowUp':
        if (currentDir.y === 0) newDir = { x: 0, y: -gridSize };
        break;
      case 'ArrowDown':
        if (currentDir.y === 0) newDir = { x: 0, y: gridSize };
        break;
      case 'ArrowLeft':
        if (currentDir.x === 0) newDir = { x: -gridSize, y: 0 };
        break;
      case 'ArrowRight':
        if (currentDir.x === 0) newDir = { x: gridSize, y: 0 };
        break;
    }

    nextDirectionRef.current = newDir;
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, isGameOver]);

  const startGame = () => {
    snakeRef.current = [{ x: 200, y: 200 }];
    directionRef.current = { x: 20, y: 0 };
    nextDirectionRef.current = { x: 20, y: 0 };
    foodRef.current = { x: 100, y: 100 };
    setScore(0);
    setIsPlaying(true);
    setIsGameOver(false);
  };

  const endGame = () => {
    const finalScore = score;
    setIsPlaying(false);
    setIsGameOver(true);
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }

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

  const getGrade = () => {
    if (score >= 100) return { name: 'Platinum', color: '#E5E4E2' };
    if (score >= 70) return { name: 'Gold', color: '#FFD700' };
    if (score >= 40) return { name: 'Silver', color: '#C0C0C0' };
    return { name: 'Bronze', color: '#CD7F32' };
  };

  const grade = getGrade();
  const canProgress = score >= 10; // At least bronze (10 points = 1 food)

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
        textAlign: 'center',
        padding: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px',
      }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '5px' }}>
          Score: {score}
        </div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          Use arrow keys to move
        </div>
      </div>
      <canvas
        ref={canvasRef}
        style={{
          border: '3px solid #333',
          borderRadius: '8px',
          backgroundColor: '#1a1a2e',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
}

export default SnakeGame;

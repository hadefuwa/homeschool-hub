import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

function CoordinateGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  const [targetPoint, setTargetPoint] = useState(null);
  const [clickedPoint, setClickedPoint] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [gridSize, setGridSize] = useState(10);
  const gridRef = useRef(null);

  const problems = [
    { point: [2, 3], gridSize: 5 },
    { point: [4, 1], gridSize: 5 },
    { point: [3, 4], gridSize: 5 },
    { point: [5, 5], gridSize: 10 },
    { point: [7, 3], gridSize: 10 },
  ];

  useEffect(() => {
    const problem = problems[level - 1] || problems[0];
    setTargetPoint(problem.point);
    setGridSize(problem.gridSize);
    setClickedPoint(null);
    setUserAnswer('');
    setShowSuccess(false);
  }, [level]);

  const handleGridClick = (e) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const cellSize = rect.width / (gridSize + 1);
    const gridX = Math.round(x / cellSize);
    const gridY = Math.round(y / cellSize);
    
    if (gridX >= 1 && gridX <= gridSize && gridY >= 1 && gridY <= gridSize) {
      setClickedPoint([gridX, gridY]);
      setUserAnswer(`(${gridX}, ${gridY})`);
    }
  };

  const handleSubmit = () => {
    if (!clickedPoint || !targetPoint) return;
    
    const isCorrect = clickedPoint[0] === targetPoint[0] && clickedPoint[1] === targetPoint[1];
    
    if (isCorrect) {
      setShowSuccess(true);
      setScore(prev => prev + 10);
      setTimeout(() => {
        if (level < problems.length) {
          setLevel(prev => prev + 1);
        } else {
          completeLesson();
        }
      }, 1500);
    }
  };

  const completeLesson = async () => {
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
        score: score + 50,
      });
      await addProgress(progress);
      saveData();
    }
  };

  const renderGrid = () => {
    const size = 400;
    const cellSize = size / (gridSize + 1);

    return (
      <svg width={size} height={size} style={{ display: 'block', border: '2px solid #333' }}>
        {/* Grid lines */}
        {Array.from({ length: gridSize + 2 }, (_, i) => (
          <g key={i}>
            <line
              x1={cellSize * (i + 0.5)}
              y1={cellSize * 0.5}
              x2={cellSize * (i + 0.5)}
              y2={size - cellSize * 0.5}
              stroke="#ccc"
              strokeWidth="1"
            />
            <line
              x1={cellSize * 0.5}
              y1={cellSize * (i + 0.5)}
              x2={size - cellSize * 0.5}
              y2={cellSize * (i + 0.5)}
              stroke="#ccc"
              strokeWidth="1"
            />
          </g>
        ))}

        {/* Axis labels */}
        {Array.from({ length: gridSize }, (_, i) => (
          <g key={i}>
            <text
              x={cellSize * (i + 1.5)}
              y={cellSize * 0.3}
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
            >
              {i + 1}
            </text>
            <text
              x={cellSize * 0.3}
              y={cellSize * (i + 1.5)}
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
            >
              {i + 1}
            </text>
          </g>
        ))}

        {/* Target point */}
        {targetPoint && (
          <circle
            cx={cellSize * (targetPoint[0] + 0.5)}
            cy={cellSize * (targetPoint[1] + 0.5)}
            r="15"
            fill="#ffc107"
            stroke="#ff9800"
            strokeWidth="3"
            opacity="0.7"
          />
        )}

        {/* Clicked point */}
        {clickedPoint && (
          <circle
            cx={cellSize * (clickedPoint[0] + 0.5)}
            cy={cellSize * (clickedPoint[1] + 0.5)}
            r="12"
            fill={clickedPoint[0] === targetPoint[0] && clickedPoint[1] === targetPoint[1] ? '#28a745' : '#dc3545'}
            stroke="#fff"
            strokeWidth="2"
          />
        )}
      </svg>
    );
  };

  return (
    <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Coordinate Game</h2>
        <div style={{ fontSize: '20px', marginBottom: '10px' }}>
          Level: {level} / {problems.length} | Score: {score}
        </div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3', marginBottom: '10px' }}>
          Click the point at ({targetPoint?.[0]}, {targetPoint?.[1]})
        </div>
        <div style={{ fontSize: '18px', color: '#666' }}>
          Yellow circle shows the target point
        </div>
      </div>

      <div
        ref={gridRef}
        onClick={handleGridClick}
        style={{
          cursor: 'crosshair',
          marginBottom: '20px',
        }}
      >
        {renderGrid()}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', width: '100%', maxWidth: '500px' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
          Your answer: {userAnswer || 'Click on the grid'}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!clickedPoint || showSuccess}
          style={{
            padding: '15px 40px',
            fontSize: '20px',
            fontWeight: 'bold',
            backgroundColor: showSuccess ? '#28a745' : '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: (!clickedPoint || showSuccess) ? 'default' : 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
        >
          {showSuccess ? '✓ Correct!' : 'Submit Answer'}
        </button>
      </div>

      {showSuccess && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#28a745',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
          zIndex: 2000,
        }}>
          ✓ Perfect!
        </div>
      )}
    </div>
  );
}

export default CoordinateGame;

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

function AngleGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  const [targetAngle, setTargetAngle] = useState(null);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [angleType, setAngleType] = useState(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const angleRef = useRef(null);

  const problems = [
    { angle: 45, type: 'acute' },
    { angle: 90, type: 'right' },
    { angle: 120, type: 'obtuse' },
    { angle: 180, type: 'straight' },
    { angle: 30, type: 'acute' },
  ];

  const getAngleType = (angle) => {
    if (angle === 90) return 'right';
    if (angle < 90) return 'acute';
    if (angle === 180) return 'straight';
    return 'obtuse';
  };

  useEffect(() => {
    const problem = problems[level - 1] || problems[0];
    setTargetAngle(problem.angle);
    setCurrentAngle(0);
    setAngleType(null);
    setShowSuccess(false);
  }, [level]);

  const handleAngleDrag = (e) => {
    if (!angleRef.current) return;
    const rect = angleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    const normalizedAngle = (angle + 90 + 360) % 360;
    setCurrentAngle(normalizedAngle);
    setAngleType(getAngleType(normalizedAngle));
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const checkAnswer = () => {
    const tolerance = 10;
    const angleMatch = Math.abs(currentAngle - targetAngle) < tolerance;
    const typeMatch = angleType === problems[level - 1].type;

    if (angleMatch && typeMatch) {
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

  const renderAngle = () => {
    const size = 300;
    const center = size / 2;
    const radius = size / 2 - 20;
    
    const angleRad = (currentAngle - 90) * (Math.PI / 180);
    const endX = center + radius * Math.cos(angleRad);
    const endY = center + radius * Math.sin(angleRad);

    return (
      <svg width={size} height={size} style={{ display: 'block' }}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#333"
          strokeWidth="2"
        />
        <line
          x1={center}
          y1={center}
          x2={center}
          y2={center - radius}
          stroke="#333"
          strokeWidth="3"
        />
        <line
          x1={center}
          y1={center}
          x2={endX}
          y2={endY}
          stroke="#2196F3"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle
          cx={center}
          cy={center}
          r="8"
          fill="#333"
        />
        <text
          x={center}
          y={center - radius - 20}
          textAnchor="middle"
          fontSize="20"
          fontWeight="bold"
        >
          {Math.round(currentAngle)}°
        </text>
      </svg>
    );
  };

  const problem = problems[level - 1] || problems[0];

  return (
    <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Angle Game</h2>
        <div style={{ fontSize: '20px', marginBottom: '10px' }}>
          Level: {level} / {problems.length} | Score: {score}
        </div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3', marginBottom: '10px' }}>
          Create a {problem.type} angle of {targetAngle}°
        </div>
      </div>

      <div
        ref={angleRef}
        onMouseMove={isDragging ? handleAngleDrag : null}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          marginBottom: '30px',
          backgroundColor: '#f0f8ff',
          borderRadius: '15px',
          padding: '20px',
          border: '3px solid #2196F3',
        }}
      >
        {renderAngle()}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', width: '100%', maxWidth: '500px' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#666' }}>
          Current: {Math.round(currentAngle)}° ({angleType || 'unknown'})
        </div>
        <div style={{ fontSize: '18px', color: '#666' }}>
          Target: {targetAngle}° ({problem.type})
        </div>
        <button
          onClick={checkAnswer}
          disabled={showSuccess}
          style={{
            padding: '15px 40px',
            fontSize: '20px',
            fontWeight: 'bold',
            backgroundColor: showSuccess ? '#28a745' : '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: showSuccess ? 'default' : 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
        >
          {showSuccess ? '✓ Correct!' : 'Check Answer'}
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
          ✓ Perfect Angle!
        </div>
      )}
    </div>
  );
}

export default AngleGame;

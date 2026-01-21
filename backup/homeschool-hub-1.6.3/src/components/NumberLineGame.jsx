import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

function NumberLineGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  const [targetValue, setTargetValue] = useState(null);
  const [numberLine, setNumberLine] = useState({ min: 0, max: 10, step: 1 });
  const [draggedValue, setDraggedValue] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [availableValues, setAvailableValues] = useState([]);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const numberLineRef = useRef(null);
  const gameAreaRef = useRef(null);

  // Check if this is a fractions lesson
  const isFractionsLesson = lesson?.title?.includes('Fractions on Number Line') || lesson?.title?.includes('fractions on number line');

  // Helper function to convert fraction to decimal
  const fractionToDecimal = (fraction) => {
    if (typeof fraction === 'number') return fraction;
    if (typeof fraction === 'string' && fraction.includes('/')) {
      const [num, den] = fraction.split('/').map(Number);
      return num / den;
    }
    return parseFloat(fraction);
  };

  // Generate problems based on lesson type
  const generateProblems = () => {
    if (isFractionsLesson) {
      // Fractions on number line - all problems should be fractions
      return [
        { target: '1/2', min: 0, max: 1, values: ['1/4', '1/2', '3/4'], type: 'fraction' },
        { target: '1/4', min: 0, max: 1, values: ['1/4', '1/2', '3/4', '1/8'], type: 'fraction' },
        { target: '3/4', min: 0, max: 1, values: ['1/4', '1/2', '3/4', '1'], type: 'fraction' },
        { target: '1/2', min: 0, max: 1, values: ['1/3', '1/2', '2/3', '3/4'], type: 'fraction' },
        { target: '1/4', min: 0, max: 1, values: ['1/4', '1/2', '3/4', '1/8'], type: 'fraction' },
      ];
    } else {
      // Default: mix of whole numbers, decimals, and fractions
      return [
        { target: 3, min: 0, max: 10, values: [1, 2, 3, 4, 5], type: 'whole' },
        { target: 7, min: 0, max: 10, values: [5, 6, 7, 8, 9], type: 'whole' },
        { target: 0.5, min: 0, max: 1, values: [0.25, 0.5, 0.75], type: 'decimal' },
        { target: 0.75, min: 0, max: 1, values: [0.25, 0.5, 0.75], type: 'decimal' },
        { target: '1/2', min: 0, max: 1, values: ['1/4', '1/2', '3/4'], type: 'fraction' },
      ];
    }
  };

  const problems = React.useMemo(() => generateProblems(), [lesson?.title]);

  useEffect(() => {
    const problem = problems[level - 1] || problems[0];
    setTargetValue(problem.target);
    setNumberLine({ min: problem.min, max: problem.max, step: problem.step });
    
    const values = problem.values.map((val, idx) => ({
      id: `val-${idx}`,
      value: val,
      x: 50 + (idx % 3) * 100,
      y: 50 + Math.floor(idx / 3) * 80,
    }));
    setAvailableValues(values);
    setShowSuccess(false);
  }, [level]);

  const handleMouseDown = (e, value) => {
    e.preventDefault();
    setIsDragging(true);
    setDraggedValue(value);
    const rect = e.currentTarget.getBoundingClientRect();
    dragStartPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !draggedValue) return;
    const gameArea = e.currentTarget;
    const rect = gameArea.getBoundingClientRect();
    const itemSize = 60;
    const x = e.clientX - rect.left - dragStartPos.current.x;
    const y = e.clientY - rect.top - dragStartPos.current.y;
    setAvailableValues(prev => prev.map(v =>
      v.id === draggedValue.id ? { ...v, x: Math.max(0, Math.min(x, rect.width - itemSize)), y: Math.max(0, Math.min(y, rect.height - itemSize)) } : v
    ));
  };

  const handleMouseUp = (e) => {
    if (!isDragging || !draggedValue) {
      setIsDragging(false);
      setDraggedValue(null);
      return;
    }

    if (numberLineRef.current) {
      const rect = numberLineRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const lineWidth = rect.width - 40;
      const relativeX = Math.max(0, Math.min(clickX - 20, lineWidth));
      const ratio = relativeX / lineWidth;
      const position = numberLine.min + ratio * (numberLine.max - numberLine.min);
      
      // Check if value matches target at this position
      const tolerance = (numberLine.max - numberLine.min) * 0.05;
      const targetDecimal = fractionToDecimal(targetValue);
      const draggedDecimal = fractionToDecimal(draggedValue.value);
      const isCorrect = Math.abs(position - targetDecimal) < tolerance && 
                       Math.abs(draggedDecimal - targetDecimal) < 0.01;
      
      if (isCorrect) {
        setShowSuccess(true);
        setScore(prev => prev + 10);
        setAvailableValues(prev => prev.filter(v => v.id !== draggedValue.id));
        setTimeout(() => {
          if (level < problems.length) {
            setLevel(prev => prev + 1);
          } else {
            completeLesson();
          }
        }, 1500);
      }
    }

    setIsDragging(false);
    setDraggedValue(null);
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

  const renderNumberLine = () => {
    const width = 600;
    const height = 100;
    
    if (isFractionsLesson && numberLine.min === 0 && numberLine.max === 1) {
      // Render fraction number line (0 to 1 with fraction markers)
      const fractions = [
        { value: 0, label: '0' },
        { value: 0.25, label: '1/4' },
        { value: 0.5, label: '1/2' },
        { value: 0.75, label: '3/4' },
        { value: 1, label: '1' },
      ];
      
      return (
        <svg width={width} height={height} style={{ display: 'block' }}>
          <line
            x1={20}
            y1={height / 2}
            x2={width - 20}
            y2={height / 2}
            stroke="#333"
            strokeWidth="4"
          />
          {fractions.map((frac, i) => {
            const x = 20 + (frac.value / (numberLine.max - numberLine.min)) * (width - 40);
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={height / 2 - 10}
                  x2={x}
                  y2={height / 2 + 10}
                  stroke="#333"
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y={height / 2 + 30}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="bold"
                >
                  {frac.label}
                </text>
              </g>
            );
          })}
        </svg>
      );
    } else {
      // Render whole number line
      const tickCount = numberLine.max - numberLine.min + 1;
      
      return (
        <svg width={width} height={height} style={{ display: 'block' }}>
          <line
            x1={20}
            y1={height / 2}
            x2={width - 20}
            y2={height / 2}
            stroke="#333"
            strokeWidth="4"
          />
          {Array.from({ length: tickCount }, (_, i) => {
            const value = numberLine.min + i;
            const x = 20 + (i / (tickCount - 1)) * (width - 40);
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={height / 2 - 10}
                  x2={x}
                  y2={height / 2 + 10}
                  stroke="#333"
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y={height / 2 + 30}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="bold"
                >
                  {value}
                </text>
              </g>
            );
          })}
        </svg>
      );
    }
  };

  return (
    <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>
          {isFractionsLesson ? 'Fractions on Number Line' : 'Number Line Game'}
        </h2>
        <div style={{ fontSize: '20px', marginBottom: '10px' }}>
          Level: {level} / {problems.length} | Score: {score}
        </div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3', marginBottom: '10px' }}>
          Place {targetValue} on the number line!
        </div>
      </div>

      <div
        ref={gameAreaRef}
        style={{
          flex: 1,
          minHeight: 0,
          position: 'relative',
          border: '3px solid #2196F3',
          borderRadius: '15px',
          backgroundColor: '#f0f8ff',
          overflow: 'hidden',
          cursor: isDragging ? 'grabbing' : 'default',
          padding: '20px',
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div ref={numberLineRef}>
            {renderNumberLine()}
          </div>
        </div>

        {availableValues.map(val => (
          <div
            key={val.id}
            onMouseDown={(e) => handleMouseDown(e, val)}
            style={{
              position: 'absolute',
              left: `${val.x}px`,
              top: `${val.y}px`,
              width: '80px',
              height: '60px',
              fontSize: '24px',
              fontWeight: 'bold',
              cursor: 'grab',
              userSelect: 'none',
              backgroundColor: '#fff',
              border: '3px solid #2196F3',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: isDragging && draggedValue?.id === val.id ? 'none' : 'all 0.2s',
              transform: isDragging && draggedValue?.id === val.id ? 'scale(1.2)' : 'scale(1)',
              zIndex: isDragging && draggedValue?.id === val.id ? 1000 : 1,
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}
          >
            {val.value}
          </div>
        ))}

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
            ✓ Correct!
          </div>
        )}
      </div>
    </div>
  );
}

export default NumberLineGame;

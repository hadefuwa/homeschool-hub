import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

function PlaceValueGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  const [targetNumber, setTargetNumber] = useState(0);
  const [tensDigit, setTensDigit] = useState(null);
  const [onesDigit, setOnesDigit] = useState(null);
  const [availableDigits, setAvailableDigits] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showFeedback, setShowFeedback] = useState(null);
  const [draggedDigit, setDraggedDigit] = useState(null);

  // Generate problems based on lesson title
  const generateProblems = () => {
    const isPlaceValue100 = lesson?.title?.includes('Place Value to 100') || lesson?.title?.includes('place value to 100');
    const isPlaceValue1000 = lesson?.title?.includes('Place Value to 1000') || lesson?.title?.includes('place value to 1000');
    const isPlaceValue10000 = lesson?.title?.includes('Place Value to 10,000') || lesson?.title?.includes('Place Value to 10000');

    if (isPlaceValue100) {
      // 2-digit numbers (10-99)
      return [
        { number: 24, tens: 2, ones: 4, options: [2, 4, 1, 3, 5, 6] },
        { number: 67, tens: 6, ones: 7, options: [6, 7, 2, 3, 8, 9] },
        { number: 89, tens: 8, ones: 9, options: [8, 9, 1, 2, 4, 5] },
        { number: 35, tens: 3, ones: 5, options: [3, 5, 1, 2, 6, 8] },
        { number: 48, tens: 4, ones: 8, options: [4, 8, 2, 3, 6, 9] },
        { number: 56, tens: 5, ones: 6, options: [5, 6, 1, 3, 7, 9] },
        { number: 72, tens: 7, ones: 2, options: [7, 2, 1, 4, 5, 8] },
        { number: 81, tens: 8, ones: 1, options: [8, 1, 2, 3, 5, 7] },
        { number: 93, tens: 9, ones: 3, options: [9, 3, 1, 2, 5, 6] },
        { number: 15, tens: 1, ones: 5, options: [1, 5, 2, 3, 6, 8] },
        { number: 28, tens: 2, ones: 8, options: [2, 8, 1, 4, 5, 9] },
        { number: 46, tens: 4, ones: 6, options: [4, 6, 2, 3, 7, 8] },
        { number: 59, tens: 5, ones: 9, options: [5, 9, 1, 3, 6, 7] },
        { number: 37, tens: 3, ones: 7, options: [3, 7, 1, 4, 5, 9] },
        { number: 64, tens: 6, ones: 4, options: [6, 4, 2, 3, 5, 8] },
      ];
    } else if (isPlaceValue1000) {
      // 3-digit numbers would need different structure
      return [
        { number: 24, tens: 2, ones: 4, options: [2, 4, 1, 3, 5, 6] },
      ];
    } else {
      // Default to 2-digit
      return [
        { number: 24, tens: 2, ones: 4, options: [2, 4, 1, 3, 5, 6] },
        { number: 67, tens: 6, ones: 7, options: [6, 7, 2, 3, 8, 9] },
      ];
    }
  };

  const problems = generateProblems();

  useEffect(() => {
    startLevel();
  }, [level]);

  const startLevel = () => {
    const problem = problems[level - 1] || problems[0];
    setTargetNumber(problem.number);
    setTensDigit(null);
    setOnesDigit(null);
    setAvailableDigits(problem.options);
    setShowFeedback(null);
  };

  const handleDigitClick = (digit, slot) => {
    if (slot === 'tens') {
      setTensDigit(digit);
      setAvailableDigits(prev => prev.filter(d => d !== digit));
      if (onesDigit !== null) {
        checkAnswer(digit, onesDigit);
      }
    } else if (slot === 'ones') {
      setOnesDigit(digit);
      setAvailableDigits(prev => prev.filter(d => d !== digit));
      if (tensDigit !== null) {
        checkAnswer(tensDigit, digit);
      }
    }
  };

  const checkAnswer = (tens, ones) => {
    const problem = problems[level - 1];
    const builtNumber = tens * 10 + ones;
    
    if (builtNumber === problem.number) {
      setShowFeedback('correct');
      setScore(prev => prev + 10);
      setTimeout(() => {
        if (level < problems.length) {
          setLevel(prev => prev + 1);
        } else {
          completeLesson();
        }
      }, 1500);
    } else {
      setShowFeedback('incorrect');
      setTimeout(() => {
        setShowFeedback(null);
        setTensDigit(null);
        setOnesDigit(null);
        setAvailableDigits(problem.options);
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

  const renderBlocks = (digit, isGroup) => {
    const colors = ['#ff8a65', '#4fc3f7', '#81c784', '#ba68c8', '#ffd54f'];
    
    if (digit === null) {
      return (
        <div style={{
          color: '#bbb',
          fontSize: '16px',
          fontStyle: 'italic',
        }}>
          Waiting...
        </div>
      );
    }

    if (isGroup) {
      // Render groups of 10
      return (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {Array.from({ length: digit }).map((_, groupIdx) => (
            <div key={groupIdx} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 18px)',
              gridTemplateRows: 'repeat(5, 18px)',
              gap: '2px',
              padding: '4px',
              backgroundColor: 'rgba(255,255,255,0.8)',
              borderRadius: '6px',
              border: `2px solid ${colors[1]}`,
            }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    backgroundColor: colors[1],
                    boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.2)',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      );
    } else {
      // Render individual blocks
      return (
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {Array.from({ length: digit }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '6px',
                backgroundColor: colors[0],
                boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.2)',
              }}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '900px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        padding: '16px',
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
          Place Value Game
        </div>
        <div style={{ fontSize: '18px', color: '#666' }}>
          Level {level} / {problems.length} • Score: {score}
        </div>
      </div>

      {/* Target Card */}
      <div style={{
        backgroundColor: '#fff',
        border: '3px solid #2196F3',
        borderRadius: '20px',
        padding: '20px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          color: '#666',
          marginBottom: '8px',
        }}>
          Build This Number
        </div>
        <div style={{
          fontSize: '64px',
          fontWeight: '800',
          color: '#2196F3',
        }}>
          {targetNumber}
        </div>
        <div style={{ fontSize: '16px', color: '#666', marginTop: '8px' }}>
          Tap a digit for tens, then tap a digit for ones
        </div>
      </div>

      {/* Drop Zones and Visual Blocks */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
      }}>
        {/* Tens Column */}
        <div style={{
          backgroundColor: '#f7f9ff',
          borderRadius: '20px',
          padding: '20px',
          border: '3px solid #d4e6ff',
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#666',
            marginBottom: '12px',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            Tens
          </div>
          <div
            onClick={() => {
              if (availableDigits.length > 0 && tensDigit === null) {
                // Waiting for click
              }
            }}
            style={{
              width: '100%',
              minHeight: '100px',
              border: tensDigit !== null ? '3px solid #4caf50' : '3px dashed #2196F3',
              borderRadius: '16px',
              backgroundColor: tensDigit !== null ? '#e8f5e9' : '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 'bold',
              marginBottom: '16px',
              cursor: tensDigit === null ? 'pointer' : 'default',
            }}
          >
            {tensDigit !== null ? tensDigit : '?'}
          </div>
          <div style={{
            minHeight: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {renderBlocks(tensDigit, true)}
          </div>
        </div>

        {/* Ones Column */}
        <div style={{
          backgroundColor: '#f7f9ff',
          borderRadius: '20px',
          padding: '20px',
          border: '3px solid #d4e6ff',
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#666',
            marginBottom: '12px',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            Ones
          </div>
          <div
            onClick={() => {
              if (availableDigits.length > 0 && onesDigit === null) {
                // Waiting for click
              }
            }}
            style={{
              width: '100%',
              minHeight: '100px',
              border: onesDigit !== null ? '3px solid #4caf50' : '3px dashed #2196F3',
              borderRadius: '16px',
              backgroundColor: onesDigit !== null ? '#e8f5e9' : '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 'bold',
              marginBottom: '16px',
              cursor: onesDigit === null ? 'pointer' : 'default',
            }}
          >
            {onesDigit !== null ? onesDigit : '?'}
          </div>
          <div style={{
            minHeight: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {renderBlocks(onesDigit, false)}
          </div>
        </div>
      </div>

      {/* Available Digits */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <div style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#666',
          marginBottom: '16px',
          textAlign: 'center',
        }}>
          {tensDigit === null ? 'Tap a digit for TENS' : onesDigit === null ? 'Now tap a digit for ONES' : 'Checking...'}
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))',
          gap: '12px',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          {availableDigits.map((digit, idx) => (
            <button
              key={idx}
              onClick={() => handleDigitClick(digit, tensDigit === null ? 'tens' : 'ones')}
              disabled={showFeedback !== null}
              style={{
                width: '70px',
                height: '70px',
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#333',
                backgroundColor: '#fff',
                border: '3px solid #2196F3',
                borderRadius: '12px',
                cursor: showFeedback === null ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                opacity: showFeedback !== null ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (showFeedback === null) {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.backgroundColor = '#e3f2fd';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#fff';
              }}
            >
              {digit}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: showFeedback === 'correct' ? '#4caf50' : '#f44336',
          color: 'white',
          padding: '40px 60px',
          borderRadius: '24px',
          fontSize: '48px',
          fontWeight: 'bold',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          zIndex: 1000,
          textAlign: 'center',
        }}>
          {showFeedback === 'correct' ? '✓ Correct!' : '✗ Try Again'}
        </div>
      )}

      <button
        onClick={() => {
          setTensDigit(null);
          setOnesDigit(null);
          const problem = problems[level - 1];
          setAvailableDigits(problem.options);
          setShowFeedback(null);
        }}
        style={{
          padding: '16px 32px',
          fontSize: '18px',
          fontWeight: 'bold',
          backgroundColor: '#ff9800',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          alignSelf: 'center',
        }}
      >
        Reset Level
      </button>
    </div>
  );
}

export default PlaceValueGame;

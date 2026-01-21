import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

function ShapePatternGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextLessonAfter = useDataStore(state => state.getNextLessonAfter);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  const [pattern, setPattern] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showFeedback, setShowFeedback] = useState(false);

  const patterns = [
    { sequence: ['🔷', '⬜', '🔷', '⬜'], next: '🔷', options: ['🔷', '⬜', '🔺', '⭕'] },
    { sequence: ['🔺', '🔺', '🔺', '🔺'], next: '🔺', options: ['🔷', '⬜', '🔺', '⭕'] },
    { sequence: ['⭕', '🔷', '⭕', '🔷'], next: '⭕', options: ['🔷', '⬜', '🔺', '⭕'] },
    { sequence: ['⬜', '⬜', '🔷', '⬜'], next: '⬜', options: ['🔷', '⬜', '🔺', '⭕'] },
    { sequence: ['🔺', '🔷', '🔺', '🔷'], next: '🔺', options: ['🔷', '⬜', '🔺', '⭕'] },
  ];

  const startNewPattern = () => {
    const patternData = patterns[level - 1] || patterns[Math.floor(Math.random() * patterns.length)];
    setPattern(patternData.sequence);
    setOptions([...patternData.options].sort(() => Math.random() - 0.5));
    setSelectedOption(null);
    setShowFeedback(false);
  };

  useEffect(() => {
    startNewPattern();
  }, [level]);

  const handleOptionClick = (option) => {
    if (showFeedback) return;
    setSelectedOption(option);
    const patternData = patterns[level - 1] || patterns[0];
    const isCorrect = option === patternData.next;
    setShowFeedback(true);

    if (isCorrect) {
      setScore(prev => prev + 10);
      setTimeout(() => {
        if (level < patterns.length) {
          setLevel(prev => prev + 1);
        } else {
          completeLesson();
        }
      }, 1500);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedOption(null);
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

  const patternData = patterns[level - 1] || patterns[0];
  const isCorrect = selectedOption === patternData.next;

  return (
    <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Shape Pattern Game</h2>
        <div style={{ fontSize: '20px', marginBottom: '10px' }}>
          Level: {level} / {patterns.length} | Score: {score}
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>
          What comes next in this pattern?
        </div>
        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {pattern.map((shape, index) => (
            <div
              key={index}
              style={{
                width: '100px',
                height: '100px',
                fontSize: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                border: '4px solid #2196F3',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
            >
              {shape}
            </div>
          ))}
          <div style={{
            width: '100px',
            height: '100px',
            fontSize: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            border: '4px dashed #999',
            borderRadius: '15px',
            color: '#999',
          }}>
            ?
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <div style={{ fontSize: '20px', marginBottom: '15px', fontWeight: 'bold' }}>
          Click the correct shape:
        </div>
        <div style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {options.map((option, index) => {
            const isSelected = selectedOption === option;
            const isCorrectOption = option === patternData.next;
            let backgroundColor = '#fff';
            let borderColor = '#2196F3';
            let transform = 'scale(1)';

            if (showFeedback) {
              if (isSelected && isCorrectOption) {
                backgroundColor = '#d4edda';
                borderColor = '#28a745';
                transform = 'scale(1.1)';
              } else if (isSelected && !isCorrectOption) {
                backgroundColor = '#f8d7da';
                borderColor = '#dc3545';
              } else if (isCorrectOption) {
                backgroundColor = '#d4edda';
                borderColor = '#28a745';
              } else {
                backgroundColor = '#f0f0f0';
                borderColor = '#ccc';
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                disabled={showFeedback}
                style={{
                  width: '120px',
                  height: '120px',
                  fontSize: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor,
                  border: `4px solid ${borderColor}`,
                  borderRadius: '15px',
                  cursor: showFeedback ? 'default' : 'pointer',
                  transition: 'all 0.3s',
                  transform,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                }}
                onMouseEnter={(e) => {
                  if (!showFeedback) {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.backgroundColor = '#e3f2fd';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showFeedback) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = '#fff';
                  }
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {showFeedback && (
        <div style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: isCorrect ? '#28a745' : '#dc3545',
          marginTop: '20px',
        }}>
          {isCorrect ? '✓ Correct!' : '✗ Try again!'}
        </div>
      )}
    </div>
  );
}

export default ShapePatternGame;

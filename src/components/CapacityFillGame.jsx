import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

const LEVELS = [
  { id: 'empty', label: 'Empty', fill: 0 },
  { id: 'half', label: 'Half full', fill: 0.5 },
  { id: 'full', label: 'Full', fill: 1 },
];

function Cup({ fill, label }) {
  const fillHeight = Math.round(fill * 100);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <div style={{
        width: '120px',
        height: '180px',
        border: '4px solid #4a90e2',
        borderRadius: '0 0 16px 16px',
        position: 'relative',
        backgroundColor: '#f5fbff',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 0 4px #e6f4ff',
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: `${fillHeight}%`,
          backgroundColor: '#7fd3ff',
          transition: 'height 200ms ease',
        }} />
      </div>
      <div style={{ fontSize: '18px', fontWeight: 600, color: '#333' }}>{label}</div>
    </div>
  );
}

function CapacityFillGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextLessonUrl = useDataStore(state => state.getNextLessonUrl);
  const disableStudyMode = useDataStore(state => state.disableStudyMode);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  const totalRounds = 6;
  const targets = useMemo(() => {
    const picks = [];
    for (let i = 0; i < totalRounds; i += 1) {
      picks.push(LEVELS[Math.floor(Math.random() * LEVELS.length)]);
    }
    return picks;
  }, [lesson?.id]);

  const [roundIndex, setRoundIndex] = useState(0);
  const [selection, setSelection] = useState(LEVELS[0]);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setRoundIndex(0);
    setSelection(LEVELS[0]);
    setFeedback('');
    setScore(0);
    setIsComplete(false);
  }, [lesson?.id]);

  const target = targets[roundIndex];

  const handleChoice = (level) => {
    setSelection(level);
    if (level.id === target.id) {
      setFeedback('Great match!');
      setScore(prev => prev + 10);
      setTimeout(() => {
        const next = roundIndex + 1;
        if (next >= totalRounds) {
          setIsComplete(true);
          completeLesson(score + 10);
        } else {
          setRoundIndex(next);
          setFeedback('');
        }
      }, 500);
    } else {
      setFeedback('Try again!');
    }
  };

  const completeLesson = async (finalScore) => {
    if (!lesson) return;
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
      score: Math.min(finalScore + 50, 100),
    });
    await addProgress(progress);
    await saveData();
  };

  const handleNextLesson = () => {
    const { url, shouldDisableStudyMode } = getNextLessonUrl(lesson);
    if (shouldDisableStudyMode) {
      disableStudyMode();
    }
    navigate(url);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '28px' }}>Capacity: Full and Empty</h2>
        <div style={{ marginTop: '6px', fontSize: '18px', color: '#555' }}>
          Round {Math.min(roundIndex + 1, totalRounds)} of {totalRounds}
        </div>
      </div>

      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '60px',
        background: 'linear-gradient(180deg, #f8fbff 0%, #eef7ff 100%)',
        borderRadius: '16px',
        padding: '20px',
        border: '2px solid #d6ebff',
      }}>
        <Cup fill={target.fill} label="Match this" />
        <Cup fill={selection.fill} label="Your cup" />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
        {LEVELS.map(level => (
          <button
            key={level.id}
            onClick={() => handleChoice(level)}
            style={{
              padding: '12px 20px',
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: '10px',
              border: '2px solid #4a90e2',
              backgroundColor: selection.id === level.id ? '#4a90e2' : 'white',
              color: selection.id === level.id ? 'white' : '#2c5aa0',
              cursor: 'pointer',
              minWidth: '120px',
            }}
          >
            {level.label}
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', minHeight: '26px', fontSize: '18px', fontWeight: 600, color: '#2c5aa0' }}>
        {feedback}
      </div>

      {isComplete && (
        <div style={{
          padding: '16px',
          backgroundColor: '#e6ffe6',
          border: '2px solid #28a745',
          borderRadius: '12px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#1c7c34' }}>Lesson complete!</div>
          <div style={{ marginTop: '8px', color: '#1c7c34' }}>Score: {score}</div>
          <div style={{ marginTop: '12px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)}
              style={{
                padding: '10px 18px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Back to Lessons
            </button>
            <button
              onClick={handleNextLesson}
              style={{
                padding: '10px 18px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Next Lesson
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CapacityFillGame;

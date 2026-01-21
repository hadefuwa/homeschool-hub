import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

function ClockGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextLessonAfter = useDataStore(state => state.getNextLessonAfter);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  const [targetTime, setTargetTime] = useState(null);
  const [hourHand, setHourHand] = useState(0);
  const [minuteHand, setMinuteHand] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const clockRef = useRef(null);

  const problems = [
    { hour: 3, minute: 0, text: '3:00' },
    { hour: 2, minute: 30, text: '2:30' },
    { hour: 4, minute: 15, text: '4:15' },
    { hour: 5, minute: 45, text: '5:45' },
    { hour: 6, minute: 0, text: '6:00' },
  ];

  const startNewProblem = () => {
    const problem = problems[level - 1] || problems[0];
    setTargetTime(problem);
    
    // Start with a random time (different from target) so child has to set it
    // Hour should be 1-12 for display, but we'll store it as 0-11 internally for easier math
    let randomHour = Math.floor(Math.random() * 12);
    let randomMinute = Math.floor(Math.random() * 60);
    
    // Make sure the random time is different from the target
    // Convert problem.hour (which might be 0 for 12) to 0-11 range for comparison
    const problemHourForComparison = problem.hour === 0 ? 12 : problem.hour;
    const randomHourForComparison = randomHour === 0 ? 12 : randomHour;
    while (randomHourForComparison === problemHourForComparison && randomMinute === problem.minute) {
      randomHour = Math.floor(Math.random() * 12);
      randomMinute = Math.floor(Math.random() * 60);
    }
    
    setHourHand(randomHour);
    setMinuteHand(randomMinute);
    setShowSuccess(false);
  };

  useEffect(() => {
    startNewProblem();
  }, [level]);

  const handleClockClick = (e) => {
    if (!clockRef.current) return;
    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    const distance = Math.sqrt(x * x + y * y);
    const maxRadius = rect.width / 2 - 40; // Same as radius in renderClock
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    const normalizedAngle = angle < 0 ? angle + 360 : angle;
    
    // Determine which hand to move based on distance from center
    // Inner 60% of radius = hour hand area, outer 40% = minute hand area
    const hourHandRadius = maxRadius * 0.6;
    
    if (distance < hourHandRadius) {
      // Click is in the inner area - move hour hand
      // Calculate hour (0-11, where 0 represents 12 o'clock)
      const hourAngle = normalizedAngle / 30;
      let hour = Math.round(hourAngle) % 12;
      setHourHand(hour);
    } else {
      // Click is in the outer area - move minute hand
      const minute = Math.round(normalizedAngle / 6) % 60;
      setMinuteHand(minute);
    }
  };

  const checkAnswer = () => {
    // Convert hourHand (0-11) to display format (1-12) for comparison
    const currentHour = hourHand === 0 ? 12 : hourHand;
    const currentMinute = minuteHand;
    // targetTime.hour is already in 1-12 format (0 represents 12)
    const targetHour = targetTime.hour === 0 ? 12 : targetTime.hour;
    const targetMinute = targetTime.minute;

    // Allow some tolerance for hour (should match exactly)
    const hourMatch = currentHour === targetHour;
    // Allow 2 minutes tolerance for minute hand
    const minuteMatch = Math.abs(currentMinute - targetMinute) <= 2;

    if (hourMatch && minuteMatch) {
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

  const renderClock = () => {
    const size = 400;
    const center = size / 2;
    const radius = size / 2 - 40;
    
    // Calculate hour hand angle: base hour position + offset based on minutes
    // The hour hand moves gradually as minutes pass (60 minutes = 30 degrees, so 30 minutes = 15 degrees)
    // hourHand is 0-11, where 0 represents 12 o'clock
    const hourValue = hourHand === 0 ? 12 : hourHand;
    const hourBaseAngle = (hourValue * 30 - 90) * (Math.PI / 180);
    const minuteOffset = (minuteHand / 60) * 30; // Each minute moves hour hand by 0.5 degrees
    const hourAngle = hourBaseAngle + (minuteOffset * Math.PI / 180);
    
    const minuteAngle = (minuteHand * 6 - 90) * (Math.PI / 180);
    
    const hourX = center + radius * 0.5 * Math.cos(hourAngle);
    const hourY = center + radius * 0.5 * Math.sin(hourAngle);
    const minuteX = center + radius * 0.8 * Math.cos(minuteAngle);
    const minuteY = center + radius * 0.8 * Math.sin(minuteAngle);

    return (
      <svg width={size} height={size} style={{ display: 'block' }}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="white"
          stroke="#333"
          strokeWidth="4"
        />
        {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = center + (radius - 20) * Math.cos(angle);
          const y = center + (radius - 20) * Math.sin(angle);
          return (
            <text
              key={num}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="24"
              fontWeight="bold"
            >
              {num}
            </text>
          );
        })}
        <line
          x1={center}
          y1={center}
          x2={hourX}
          y2={hourY}
          stroke="#333"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1={center}
          y1={center}
          x2={minuteX}
          y2={minuteY}
          stroke="#2196F3"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle
          cx={center}
          cy={center}
          r="12"
          fill="#333"
        />
      </svg>
    );
  };

  if (!targetTime) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Clock Game</h2>
        <div style={{ fontSize: '20px', marginBottom: '10px' }}>
          Level: {level} / {problems.length} | Score: {score}
        </div>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2196F3', marginBottom: '10px' }}>
          Set the time to: {targetTime.text}
        </div>
        <div style={{ fontSize: '20px', color: '#666' }}>
          Click near the center for hour hand, near the edge for minute hand!
        </div>
      </div>

      <div
        ref={clockRef}
        onClick={handleClockClick}
        style={{
          cursor: 'pointer',
          marginBottom: '30px',
          position: 'relative',
        }}
      >
        {renderClock()}
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

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
          Current: {hourHand === 0 ? 12 : hourHand}:{minuteHand.toString().padStart(2, '0')}
        </div>
        <button
          onClick={checkAnswer}
          disabled={showSuccess}
          style={{
            padding: '15px 30px',
            fontSize: '20px',
            fontWeight: 'bold',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: showSuccess ? 'default' : 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
          onMouseEnter={(e) => {
            if (!showSuccess) {
              e.currentTarget.style.backgroundColor = '#1976D2';
            }
          }}
          onMouseLeave={(e) => {
            if (!showSuccess) {
              e.currentTarget.style.backgroundColor = '#2196F3';
            }
          }}
        >
          Check Answer
        </button>
      </div>
    </div>
  );
}

export default ClockGame;

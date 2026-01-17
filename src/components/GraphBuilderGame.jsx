import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

function GraphBuilderGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  const [graphData, setGraphData] = useState([]);
  const [targetData, setTargetData] = useState(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const graphRef = useRef(null);

  // Check if this is a pie chart lesson
  const isPieChartLesson = lesson?.title?.includes('Pie Charts') || lesson?.title?.includes('Pie Chart');

  // Generate problems based on lesson type
  const generateProblems = () => {
    if (isPieChartLesson) {
      // Pie chart problems - data should add up to 100 or be percentages
      return [
        { type: 'pie', data: { 'Red': 30, 'Blue': 25, 'Green': 20, 'Yellow': 25 } },
        { type: 'pie', data: { 'Apples': 40, 'Bananas': 30, 'Oranges': 30 } },
        { type: 'pie', data: { 'Math': 35, 'English': 25, 'Science': 20, 'Art': 20 } },
        { type: 'pie', data: { 'Spring': 25, 'Summer': 30, 'Autumn': 25, 'Winter': 20 } },
        { type: 'pie', data: { 'Cats': 50, 'Dogs': 30, 'Birds': 20 } },
      ];
    } else {
      // Bar chart problems (default)
      return [
        { type: 'bar', data: { 'Apples': 5, 'Bananas': 3, 'Oranges': 4 } },
        { type: 'bar', data: { 'Red': 8, 'Blue': 6, 'Green': 7 } },
        { type: 'bar', data: { 'Cats': 4, 'Dogs': 6, 'Birds': 3 } },
        { type: 'bar', data: { 'Monday': 2, 'Tuesday': 4, 'Wednesday': 3, 'Thursday': 5 } },
        { type: 'bar', data: { 'A': 3, 'B': 5, 'C': 2, 'D': 4 } },
      ];
    }
  };

  const problems = generateProblems();

  useEffect(() => {
    const problem = problems[level - 1] || problems[0];
    setTargetData(problem);
    setGraphData([]);
    setShowSuccess(false);
  }, [level]);

  const handleBarClick = (label, isDecrease = false) => {
    setGraphData(prev => {
      const existing = prev.find(d => d.label === label);
      if (existing) {
        const increment = isPieChartLesson ? 5 : 1;
        const newValue = isDecrease 
          ? existing.value - increment 
          : existing.value + increment;
        const minValue = 0;
        const maxValue = isPieChartLesson ? 100 : Infinity;
        const clampedValue = Math.max(minValue, Math.min(newValue, maxValue));
        return prev.map(d => d.label === label ? { ...d, value: clampedValue } : d);
      } else {
        // Only add new bar if not decreasing
        if (!isDecrease) {
          return [...prev, { label, value: isPieChartLesson ? 5 : 1 }];
        }
        return prev;
      }
    });
  };

  const checkAnswer = () => {
    let isCorrect;
    if (isPieChartLesson) {
      // For pie charts, check if values match (allow small tolerance for rounding)
      isCorrect = Object.keys(targetData.data).every(label => {
        const targetValue = targetData.data[label];
        const actualValue = graphData.find(d => d.label === label)?.value || 0;
        return Math.abs(actualValue - targetValue) <= 2; // Allow 2% tolerance
      }) && graphData.length === Object.keys(targetData.data).length;
    } else {
      // For bar charts, exact match
      isCorrect = Object.keys(targetData.data).every(label => {
        const targetValue = targetData.data[label];
        const actualValue = graphData.find(d => d.label === label)?.value || 0;
        return actualValue === targetValue;
      }) && graphData.length === Object.keys(targetData.data).length;
    }

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

  const renderPieChart = () => {
    const labels = Object.keys(targetData.data);
    const size = 300;
    const radius = size / 2 - 20;
    const center = size / 2;
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
    
    // Calculate total of actual values
    const actualTotal = labels.reduce((sum, label) => {
      const actualValue = graphData.find(d => d.label === label)?.value || 0;
      return sum + actualValue;
    }, 0);
    
    // Calculate total of target values (should be 100 for pie charts)
    const targetTotal = Object.values(targetData.data).reduce((sum, val) => sum + val, 0);
    
    let currentAngle = -Math.PI / 2; // Start from top
    const slices = [];
    
    labels.forEach((label, idx) => {
      const targetValue = targetData.data[label];
      const actualValue = graphData.find(d => d.label === label)?.value || 0;
      
      // Calculate slice angle based on percentage of total (normalize to 100)
      const actualPercent = actualTotal > 0 ? (actualValue / actualTotal) * 100 : 0;
      const sliceAngle = (actualPercent / 100) * 2 * Math.PI;
      
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;
      
      const x1 = center + radius * Math.cos(startAngle);
      const y1 = center + radius * Math.sin(startAngle);
      const x2 = center + radius * Math.cos(endAngle);
      const y2 = center + radius * Math.sin(endAngle);
      
      const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;
      
      const pathData = [
        `M ${center} ${center}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');
      
      const isCorrect = Math.abs(actualValue - targetValue) <= 2;
      const color = colors[idx % colors.length];
      
      slices.push(
        <g key={idx}>
          <path
            d={pathData}
            fill={color}
            stroke="#fff"
            strokeWidth="3"
            opacity={isCorrect ? 1 : 0.7}
            style={{ cursor: 'pointer' }}
            onClick={() => handleBarClick(label, false)}
          />
          {/* Label text */}
          {actualValue > 0 && sliceAngle > 0.1 && (
            <text
              x={center + (radius * 0.7) * Math.cos(startAngle + sliceAngle / 2)}
              y={center + (radius * 0.7) * Math.sin(startAngle + sliceAngle / 2)}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#333"
              fontSize="16"
              fontWeight="bold"
            >
              {actualValue}%
            </text>
          )}
        </g>
      );
      
      currentAngle = endAngle;
    });
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <svg width={size} height={size} style={{ cursor: 'pointer' }}>
          <circle cx={center} cy={center} r={radius} fill="#f0f0f0" stroke="#ddd" strokeWidth="2" />
          {slices}
        </svg>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
          {labels.map((label, idx) => {
            const targetValue = targetData.data[label];
            const actualValue = graphData.find(d => d.label === label)?.value || 0;
            const isCorrect = Math.abs(actualValue - targetValue) <= 2;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 15px',
                  backgroundColor: isCorrect ? '#28a745' : '#2196F3',
                  color: 'white',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  border: isCorrect ? '3px solid #155724' : '3px solid #1976D2',
                  transition: 'all 0.3s',
                }}
              >
                <button
                  onClick={() => handleBarClick(label, false)}
                  style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    color: 'white',
                    border: '2px solid white',
                    borderRadius: '50%',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.5)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  +
                </button>
                <span>
                  {label}: {actualValue}% (Target: {targetValue}%)
                </span>
                <button
                  onClick={() => handleBarClick(label, true)}
                  disabled={actualValue === 0}
                  style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: actualValue === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
                    color: 'white',
                    border: '2px solid white',
                    borderRadius: '50%',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    cursor: actualValue === 0 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    opacity: actualValue === 0 ? 0.5 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (actualValue > 0) {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.5)';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (actualValue > 0) {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  −
                </button>
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: '16px', color: '#666', textAlign: 'center' }}>
          Click the + and - buttons to adjust values. Total should be 100%.
        </div>
      </div>
    );
  };

  const renderBarChart = () => {
    const maxValue = Math.max(...Object.values(targetData.data), 1);
    const barWidth = 60;
    const barMaxHeight = 200;
    const labels = Object.keys(targetData.data);

    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', height: '250px', padding: '20px' }}>
        {labels.map((label, idx) => {
          const targetValue = targetData.data[label];
          const actualValue = graphData.find(d => d.label === label)?.value || 0;
          const barHeight = (actualValue / maxValue) * barMaxHeight;
          const targetHeight = (targetValue / maxValue) * barMaxHeight;
          
          return (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              {/* Plus button */}
              <button
                onClick={() => handleBarClick(label, false)}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#218838';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#28a745';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                +
              </button>
              
              {/* Bar */}
              <div
                style={{
                  width: `${barWidth}px`,
                  height: `${barHeight}px`,
                  backgroundColor: actualValue === targetValue ? '#28a745' : '#2196F3',
                  borderRadius: '5px 5px 0 0',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: '10px',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  transition: 'all 0.3s',
                  border: actualValue === targetValue ? '3px solid #155724' : '3px solid #1976D2',
                  minHeight: actualValue === 0 ? '0px' : '20px',
                }}
              >
                {actualValue > 0 && actualValue}
              </div>
              
              {/* Minus button */}
              <button
                onClick={() => handleBarClick(label, true)}
                disabled={actualValue === 0}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: actualValue === 0 ? '#ccc' : '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  cursor: actualValue === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s',
                  opacity: actualValue === 0 ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                  if (actualValue > 0) {
                    e.currentTarget.style.backgroundColor = '#c82333';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (actualValue > 0) {
                    e.currentTarget.style.backgroundColor = '#dc3545';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                −
              </button>
              
              <div style={{ marginTop: '5px', fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>
                {label}
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                Target: {targetValue}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (!targetData) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Graph Builder Game</h2>
        <div style={{ fontSize: '20px', marginBottom: '10px' }}>
          Level: {level} / {problems.length} | Score: {score}
        </div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3', marginBottom: '10px' }}>
          {isPieChartLesson ? 'Build the pie chart! Click the + and - buttons to adjust values.' : 'Build the bar chart! Click the + and - buttons to adjust values.'}
        </div>
      </div>

      <div
        ref={graphRef}
        style={{
          flex: 1,
          minHeight: 0,
          border: '3px solid #2196F3',
          borderRadius: '15px',
          backgroundColor: '#f0f8ff',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {isPieChartLesson ? renderPieChart() : renderBarChart()}

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
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
            ✓ Perfect Graph!
          </div>
        )}
      </div>
    </div>
  );
}

export default GraphBuilderGame;

import React, { useState, useRef, useEffect } from 'react';
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
  const [selectedDigits, setSelectedDigits] = useState([]);
  const [availableDigits, setAvailableDigits] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDigit, setDragDigit] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [maxPlace, setMaxPlace] = useState(3); // 2 = tens, 3 = hundreds, etc.
  const dragStartPos = useRef({ x: 0, y: 0 });
  const placeValueRefs = useRef({});
  const gameAreaRef = useRef(null);

  // Generate problems based on lesson
  const generateProblems = () => {
    const isPlaceValue10000 = lesson?.title?.includes('Place Value to 10,000') || lesson?.title?.includes('Place Value to 10000') || lesson?.title?.includes('place value to 10,000') || lesson?.title?.includes('place value to 10000');
    const isPlaceValue1000 = lesson?.title?.includes('Place Value to 1000') || lesson?.title?.includes('place value to 1000');
    const isPlaceValue100 = lesson?.title?.includes('Place Value to 100') || lesson?.title?.includes('place value to 100');
    
    if (isPlaceValue10000) {
      // For "Place Value to 10,000", use 4-digit numbers (1000-9999)
      const numbers = [1234, 2345, 3456, 4567, 5678, 6789, 2345, 4567, 5678, 7890, 1234, 2345, 3456, 4567, 5678];
      return numbers.map(num => {
        const digits = num.toString().split('').map(Number);
        // Add some extra digits for distraction
        const extraDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].filter(d => !digits.includes(d));
        return {
          number: num,
          places: 4,
          digits: [...digits, ...extraDigits.slice(0, 2)],
        };
      });
    } else if (isPlaceValue1000) {
      // For "Place Value to 1000", use 3-digit numbers (100-999)
      const numbers = [156, 234, 345, 456, 567, 678, 789, 123, 234, 456, 567, 789, 234, 567, 890];
      return numbers.map(num => {
        const digits = num.toString().split('').map(Number);
        // Add some extra digits for distraction
        const extraDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(d => !digits.includes(d));
        return {
          number: num,
          places: 3,
          digits: [...digits, ...extraDigits.slice(0, 3)],
        };
      });
    } else if (isPlaceValue100) {
      // For "Place Value to 100", use 2-digit numbers (10-99)
      const numbers = [24, 67, 89, 35, 48, 56, 72, 81, 93, 15, 28, 46, 59, 37, 64];
      return numbers.map(num => {
        const digits = num.toString().split('').map(Number);
        const extraDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(d => !digits.includes(d));
        return {
          number: num,
          places: 2,
          digits: [...digits, ...extraDigits.slice(0, 4)],
        };
      });
    } else {
      // Default: mix of 2 and 3 digit numbers
      return [
        { number: 24, places: 2, digits: [2, 4, 1, 3, 5, 6] },
        { number: 67, places: 2, digits: [6, 7, 2, 3, 8, 9] },
        { number: 89, places: 2, digits: [8, 9, 1, 2, 4, 5] },
        { number: 156, places: 3, digits: [1, 5, 6, 2, 3, 4] },
        { number: 234, places: 3, digits: [2, 3, 4, 1, 5, 6] },
      ];
    }
  };

  // Generate problems based on lesson - memoize to avoid regeneration
  const problems = React.useMemo(() => generateProblems(), [lesson?.title]);

  useEffect(() => {
    const problem = problems[level - 1] || problems[0];
    setTargetNumber(problem.number);
    setMaxPlace(problem.places);
    
    // Create place value slots
    const places = [];
    for (let i = problem.places - 1; i >= 0; i--) {
      places.push({ place: i, value: null });
    }
    setSelectedDigits(places);
    
    // Create available digits - position them in a grid at the bottom
    const digitsPerRow = 4;
    const digitSize = 80;
    const digitSpacing = 20;
    const startX = 100;
    const startY = 300; // Position digits below place value boxes
    
    const digits = problem.digits.map((digit, idx) => ({
      id: `digit-${idx}`,
      value: digit,
      x: startX + (idx % digitsPerRow) * (digitSize + digitSpacing),
      y: startY + Math.floor(idx / digitsPerRow) * (digitSize + digitSpacing),
    }));
    setAvailableDigits(digits);
    setShowSuccess(false);
  }, [level]);

  const handleMouseDown = (e, digit) => {
    e.preventDefault();
    setIsDragging(true);
    setDragDigit(digit);
    const rect = e.currentTarget.getBoundingClientRect();
    dragStartPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragDigit) return;
    const gameArea = e.currentTarget;
    const rect = gameArea.getBoundingClientRect();
    const digitSize = 60;
    const x = e.clientX - rect.left - dragStartPos.current.x;
    const y = e.clientY - rect.top - dragStartPos.current.y;
    setAvailableDigits(prev => prev.map(d =>
      d.id === dragDigit.id ? { ...d, x: Math.max(0, Math.min(x, rect.width - digitSize)), y: Math.max(0, Math.min(y, rect.height - digitSize)) } : d
    ));
  };

  const handleMouseUp = (e) => {
    if (!isDragging || !dragDigit) {
      setIsDragging(false);
      setDragDigit(null);
      return;
    }

    // Check if dropped on a place value slot
    let droppedOnPlace = null;
    Object.keys(placeValueRefs.current).forEach(place => {
      const ref = placeValueRefs.current[place];
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const digitRect = {
          left: e.clientX - dragStartPos.current.x,
          top: e.clientY - dragStartPos.current.y,
          right: e.clientX - dragStartPos.current.x + 60,
          bottom: e.clientY - dragStartPos.current.y + 60,
        };
        if (
          digitRect.left < rect.right &&
          digitRect.right > rect.left &&
          digitRect.top < rect.bottom &&
          digitRect.bottom > rect.top
        ) {
          droppedOnPlace = parseInt(place);
        }
      }
    });

    if (droppedOnPlace !== null) {
      const newSelected = [...selectedDigits];
      const existingIndex = newSelected.findIndex(s => s.place === droppedOnPlace);
      if (existingIndex >= 0) {
        // Replace existing digit
        const oldDigit = newSelected[existingIndex].value;
        if (oldDigit !== null) {
          // Return old digit to available
          setAvailableDigits(prev => [...prev, {
            id: `digit-${Date.now()}`,
            value: oldDigit,
            x: 50 + Math.random() * 200,
            y: 50 + Math.random() * 200,
          }]);
        }
        newSelected[existingIndex].value = dragDigit.value;
      }
      setSelectedDigits(newSelected);
      setAvailableDigits(prev => prev.filter(d => d.id !== dragDigit.id));
      
      // Check if complete
      const builtNumber = newSelected.reduce((sum, slot, idx) => {
        return sum + (slot.value || 0) * Math.pow(10, slot.place);
      }, 0);
      
      if (builtNumber === targetNumber && newSelected.every(s => s.value !== null)) {
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
    }

    setIsDragging(false);
    setDragDigit(null);
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

  const placeNames = ['Ones', 'Tens', 'Hundreds', 'Thousands', 'Ten Thousands', 'Hundred Thousands'];
  const builtNumber = selectedDigits.reduce((sum, slot, idx) => {
    return sum + (slot.value || 0) * Math.pow(10, slot.place);
  }, 0);

  return (
    <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Place Value Game</h2>
        <div style={{ fontSize: '20px', marginBottom: '10px' }}>
          Level: {level} / {problems.length} | Score: {score}
        </div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3', marginBottom: '10px' }}>
          Build the number: {targetNumber}
        </div>
        <div style={{ fontSize: '18px', color: '#666' }}>
          Drag digits to the place value boxes!
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
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Place Value Boxes - Top Section */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '25px', 
          marginBottom: '50px', 
          flexWrap: 'wrap',
          paddingTop: '20px',
        }}>
          {selectedDigits.map((slot, idx) => (
            <div
              key={slot.place}
              ref={el => placeValueRefs.current[slot.place] = el}
              style={{
                width: '120px',
                height: '140px',
                border: '3px dashed #2196F3',
                borderRadius: '12px',
                backgroundColor: slot.value !== null ? '#d4edda' : '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px', fontWeight: 'bold' }}>
                {placeNames[slot.place]}
              </div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#333' }}>
                {slot.value !== null ? slot.value : '?'}
              </div>
            </div>
          ))}
        </div>

        {/* Available Digits - Bottom Section */}
        <div style={{ 
          marginTop: 'auto',
          paddingBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '15px',
        }}>
          {availableDigits.map(digit => (
            <div
              key={digit.id}
              onMouseDown={(e) => handleMouseDown(e, digit)}
              style={{
                position: 'absolute',
                left: `${digit.x}px`,
                top: `${digit.y}px`,
                width: '80px',
                height: '80px',
                fontSize: '42px',
                fontWeight: 'bold',
                cursor: 'grab',
                userSelect: 'none',
                backgroundColor: '#fff',
                border: '3px solid #2196F3',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: isDragging && dragDigit?.id === digit.id ? 'none' : 'all 0.2s',
                transform: isDragging && dragDigit?.id === digit.id ? 'scale(1.15)' : 'scale(1)',
                zIndex: isDragging && dragDigit?.id === digit.id ? 1000 : 1,
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
            >
              {digit.value}
            </div>
          ))}
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
            ✓ Correct! {targetNumber}
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '20px', color: '#666', fontWeight: 'bold', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
        Current number: <span style={{ color: '#2196F3', fontSize: '24px' }}>{builtNumber}</span>
      </div>
    </div>
  );
}

export default PlaceValueGame;

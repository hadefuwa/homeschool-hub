import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

function SubtractionDragGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextLessonAfter = useDataStore(state => state.getNextLessonAfter);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  const [currentProblem, setCurrentProblem] = useState(null);
  const [items, setItems] = useState([]);
  const [removedItems, setRemovedItems] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragItem, setDragItem] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [gameAreaSize, setGameAreaSize] = useState({ width: 800, height: 500 });
  const dragStartPos = useRef({ x: 0, y: 0 });
  const removedAreaRef = useRef(null);
  const gameAreaRef = useRef(null);

  const problems = [
    { start: 12, subtract: 5, emoji: '🍪', answer: 7 },
    { start: 15, subtract: 8, emoji: '🚗', answer: 7 },
    { start: 20, subtract: 6, emoji: '🌸', answer: 14 },
    { start: 18, subtract: 9, emoji: '⭐', answer: 9 },
    { start: 14, subtract: 5, emoji: '🎈', answer: 9 },
  ];

  // Update game area size on resize and initial load
  React.useEffect(() => {
    const updateSize = () => {
      if (gameAreaRef.current) {
        const rect = gameAreaRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setGameAreaSize({ width: rect.width, height: rect.height });
        }
      }
    };

    // Initial size after render
    setTimeout(updateSize, 100);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const startNewProblem = () => {
    const problem = problems[level - 1] || problems[Math.floor(Math.random() * problems.length)];
    setCurrentProblem(problem);
    
    // Use responsive positioning based on actual game area size
    const itemSize = Math.min(60, gameAreaSize.width * 0.08, gameAreaSize.height * 0.12);
    const maxX = gameAreaSize.width - itemSize - 20;
    const maxY = gameAreaSize.height - itemSize - 20;
    
    setItems(Array.from({ length: problem.start }, (_, i) => ({
      id: i,
      emoji: problem.emoji,
      x: Math.random() * Math.max(100, maxX - 100) + 20,
      y: Math.random() * Math.max(100, maxY - 100) + 20,
    })));
    setRemovedItems([]);
    setShowSuccess(false);
  };

  React.useEffect(() => {
    if (gameAreaSize.width > 0 && gameAreaSize.height > 0) {
      startNewProblem();
    }
  }, [level, gameAreaSize]);

  const handleMouseDown = (e, item) => {
    e.preventDefault();
    setIsDragging(true);
    setDragItem(item);
    const rect = e.currentTarget.getBoundingClientRect();
    dragStartPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragItem) return;

    const gameArea = e.currentTarget;
    const rect = gameArea.getBoundingClientRect();
    const itemSize = Math.min(60, rect.width * 0.08, rect.height * 0.12);
    const x = e.clientX - rect.left - dragStartPos.current.x;
    const y = e.clientY - rect.top - dragStartPos.current.y;

    setItems(prev => prev.map(item =>
      item.id === dragItem.id ? { 
        ...item, 
        x: Math.max(0, Math.min(x, rect.width - itemSize)), 
        y: Math.max(0, Math.min(y, rect.height - itemSize)) 
      } : item
    ));
  };

  const handleMouseUp = (e) => {
    if (!isDragging || !dragItem) {
      setIsDragging(false);
      setDragItem(null);
      return;
    }

    if (removedAreaRef.current && gameAreaRef.current) {
      const removedRect = removedAreaRef.current.getBoundingClientRect();
      const gameRect = gameAreaRef.current.getBoundingClientRect();
      const itemSize = Math.min(60, gameRect.width * 0.08, gameRect.height * 0.12);
      const itemRect = {
        left: e.clientX - dragStartPos.current.x,
        top: e.clientY - dragStartPos.current.y,
        right: e.clientX - dragStartPos.current.x + itemSize,
        bottom: e.clientY - dragStartPos.current.y + itemSize,
      };

      if (
        itemRect.left < removedRect.right &&
        itemRect.right > removedRect.left &&
        itemRect.top < removedRect.bottom &&
        itemRect.bottom > removedRect.top
      ) {
        // Item is in removed area
        const newRemovedItems = [...removedItems, dragItem];
        const newItems = items.filter(item => item.id !== dragItem.id);
        
        setRemovedItems(newRemovedItems);
        setItems(newItems);
        
        // Check answer after state update
        setTimeout(() => {
          if (newRemovedItems.length === currentProblem.subtract) {
            const remaining = newItems.length;
            if (remaining === currentProblem.answer) {
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
        }, 0);
      }
    }

    setIsDragging(false);
    setDragItem(null);
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

  if (!currentProblem) return <div>Loading...</div>;

  const itemSize = Math.min(60, gameAreaSize.width * 0.08, gameAreaSize.height * 0.12);
  const binSize = Math.min(120, gameAreaSize.width * 0.15, gameAreaSize.height * 0.2);

  return (
    <div style={{ 
      padding: '10px', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: 0,
      overflow: 'hidden',
    }}>
      <div style={{ 
        marginBottom: '10px', 
        textAlign: 'center',
        flexShrink: 0,
      }}>
        <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', marginBottom: '5px', marginTop: '0' }}>Subtraction Drag Game</h2>
        <div style={{ fontSize: 'clamp(14px, 2.5vw, 20px)', marginBottom: '5px' }}>
          Level: {level} / {problems.length} | Score: {score}
        </div>
        <div style={{ fontSize: 'clamp(18px, 3.5vw, 24px)', fontWeight: 'bold', color: '#2196F3', marginBottom: '5px' }}>
          {currentProblem.start} - {currentProblem.subtract} = ?
        </div>
        <div style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', color: '#666' }}>
          Drag {currentProblem.subtract} {currentProblem.emoji} to the bin!
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
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {items.map(item => (
          <div
            key={item.id}
            onMouseDown={(e) => handleMouseDown(e, item)}
            style={{
              position: 'absolute',
              left: `${item.x}px`,
              top: `${item.y}px`,
              width: `${itemSize}px`,
              height: `${itemSize}px`,
              fontSize: `${itemSize * 0.8}px`,
              cursor: 'grab',
              userSelect: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: isDragging && dragItem?.id === item.id ? 'none' : 'all 0.2s',
              transform: isDragging && dragItem?.id === item.id ? 'scale(1.2)' : 'scale(1)',
              zIndex: isDragging && dragItem?.id === item.id ? 1000 : 1,
            }}
          >
            {item.emoji}
          </div>
        ))}

        <div
          ref={removedAreaRef}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            width: `${binSize}px`,
            height: `${binSize}px`,
            backgroundColor: '#ff6b6b',
            borderRadius: '15px',
            border: '4px dashed #fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${binSize * 0.4}px`,
          }}
        >
          🗑️
        </div>

        {showSuccess && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(24px, 5vw, 48px)',
            fontWeight: 'bold',
            color: '#28a745',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: 'clamp(15px, 3vw, 30px)',
            borderRadius: '20px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
            zIndex: 2000,
            textAlign: 'center',
          }}>
            ✓ Correct! {currentProblem.answer} left!
          </div>
        )}
      </div>

      <div style={{ 
        marginTop: '10px', 
        textAlign: 'center', 
        fontSize: 'clamp(14px, 2.5vw, 18px)',
        flexShrink: 0,
      }}>
        Removed: {removedItems.length} / {currentProblem.subtract}
      </div>
    </div>
  );
}

export default SubtractionDragGame;

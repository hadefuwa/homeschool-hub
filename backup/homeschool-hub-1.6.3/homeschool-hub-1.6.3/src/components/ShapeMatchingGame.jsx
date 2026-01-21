import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

function ShapeMatchingGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  const [targetShape, setTargetShape] = useState(null);
  const [availableShapes, setAvailableShapes] = useState([]);
  const [matchedShapes, setMatchedShapes] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragShape, setDragShape] = useState(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const targetAreaRef = useRef(null);
  const gameAreaRef = useRef(null);

  // Check if this is a 3D shapes lesson
  const is3DShapes = lesson?.title?.includes('3D Shapes') || lesson?.title?.includes('3d shapes');

  const shapeTypes2D = {
    circle: { name: 'Circle', sides: 0, vertices: 0, emoji: '⭕' },
    triangle: { name: 'Triangle', sides: 3, vertices: 3, emoji: '🔺' },
    square: { name: 'Square', sides: 4, vertices: 4, emoji: '⬜' },
    rectangle: { name: 'Rectangle', sides: 4, vertices: 4, emoji: '▭' },
    pentagon: { name: 'Pentagon', sides: 5, vertices: 5, emoji: '⬟' },
    hexagon: { name: 'Hexagon', sides: 6, vertices: 6, emoji: '⬡' },
  };

  const shapeTypes3D = {
    cube: { name: 'Cube', faces: 6, edges: 12, vertices: 8, emoji: '🎲' },
    sphere: { name: 'Sphere', faces: 0, edges: 0, vertices: 0, emoji: '⚪' },
    cylinder: { name: 'Cylinder', faces: 3, edges: 2, vertices: 0, emoji: '🥫' },
    cone: { name: 'Cone', faces: 2, edges: 1, vertices: 1, emoji: '🍦' },
    pyramid: { name: 'Pyramid', faces: 5, edges: 8, vertices: 5, emoji: '🔺' },
    rectangularPrism: { name: 'Rectangular Prism', faces: 6, edges: 12, vertices: 8, emoji: '📦' },
  };

  const shapeTypes = is3DShapes ? shapeTypes3D : shapeTypes2D;

  const problems2D = [
    { target: 'circle', shapes: ['circle', 'triangle', 'square'], property: 'name' },
    { target: 'triangle', shapes: ['triangle', 'square', 'pentagon'], property: 'sides' },
    { target: 'square', shapes: ['square', 'rectangle', 'hexagon'], property: 'vertices' },
    { target: 'pentagon', shapes: ['pentagon', 'hexagon', 'triangle'], property: 'sides' },
    { target: 'hexagon', shapes: ['hexagon', 'pentagon', 'square'], property: 'vertices' },
  ];

  const problems3D = [
    { target: 'cube', shapes: ['cube', 'sphere', 'cylinder'], property: 'name' },
    { target: 'sphere', shapes: ['sphere', 'cube', 'cone'], property: 'name' },
    { target: 'cylinder', shapes: ['cylinder', 'cone', 'pyramid'], property: 'name' },
    { target: 'cone', shapes: ['cone', 'cylinder', 'cube'], property: 'name' },
    { target: 'pyramid', shapes: ['pyramid', 'cube', 'rectangularPrism'], property: 'name' },
  ];

  const problems = is3DShapes ? problems3D : problems2D;

  useEffect(() => {
    const problem = problems[level - 1] || problems[0];
    setTargetShape(shapeTypes[problem.target]);
    
    // Use percentage-based positioning for better responsiveness
    const shapes = problem.shapes.map((shape, idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      // Calculate positions as percentages
      const leftPercent = 20 + (col * 25); // Start at 20%, space by 25%
      const topPercent = 60 + (row * 15); // Start at 60%, space by 15%
      
      return {
        id: `shape-${idx}`,
        type: shape,
        ...shapeTypes[shape],
        leftPercent,
        topPercent,
      };
    });
    
    setAvailableShapes(shapes);
    setMatchedShapes([]);
    setShowSuccess(false);
  }, [level]);

  const handleMouseDown = (e, shape) => {
    e.preventDefault();
    setIsDragging(true);
    setDragShape(shape);
    const rect = e.currentTarget.getBoundingClientRect();
    dragStartPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragShape) return;
    const gameArea = e.currentTarget;
    const rect = gameArea.getBoundingClientRect();
    const shapeSize = Math.min(100, rect.width * 0.15);
    const x = e.clientX - rect.left - dragStartPos.current.x;
    const y = e.clientY - rect.top - dragStartPos.current.y;
    setAvailableShapes(prev => prev.map(s =>
      s.id === dragShape.id ? { 
        ...s, 
        x: Math.max(0, Math.min(x, rect.width - shapeSize)), 
        y: Math.max(0, Math.min(y, rect.height - shapeSize)),
        isDragging: true,
      } : s
    ));
  };

  const handleMouseUp = (e) => {
    if (!isDragging || !dragShape) {
      setIsDragging(false);
      setDragShape(null);
      return;
    }

    if (targetAreaRef.current) {
      const targetRect = targetAreaRef.current.getBoundingClientRect();
      const gameArea = e.currentTarget;
      const rect = gameArea.getBoundingClientRect();
      const shapeSize = Math.min(100, rect.width * 0.15);
      const shapeRect = {
        left: e.clientX - dragStartPos.current.x,
        top: e.clientY - dragStartPos.current.y,
        right: e.clientX - dragStartPos.current.x + shapeSize,
        bottom: e.clientY - dragStartPos.current.y + shapeSize,
      };

      if (
        shapeRect.left < targetRect.right &&
        shapeRect.right > targetRect.left &&
        shapeRect.top < targetRect.bottom &&
        shapeRect.bottom > targetRect.top
      ) {
        // Check if shape matches target
        const problem = problems[level - 1];
        const isMatch = dragShape.type === problem.target;
        
        if (isMatch) {
          setMatchedShapes(prev => [...prev, dragShape]);
          setAvailableShapes(prev => prev.filter(s => s.id !== dragShape.id));
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
    }

    setIsDragging(false);
    setDragShape(null);
    // Reset dragging state on shapes
    setAvailableShapes(prev => prev.map(s => ({ ...s, isDragging: false })));
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

  const problem = problems[level - 1] || problems[0];

  return (
    <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Shape Matching Game</h2>
        <div style={{ fontSize: '20px', marginBottom: '10px' }}>
          Level: {level} / {problems.length} | Score: {score}
        </div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3', marginBottom: '10px' }}>
          Match the {targetShape?.name}!
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
        {/* Target Area */}
        <div
          ref={targetAreaRef}
          style={{
            position: 'absolute',
            top: '2%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(150px, 20%)',
            height: 'min(150px, 20%)',
            minWidth: '120px',
            minHeight: '120px',
            border: '4px dashed #2196F3',
            borderRadius: '15px',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: '10px' }}>
            {targetShape?.emoji}
          </div>
          <div style={{ fontSize: 'clamp(12px, 1.5vw, 16px)', color: '#666', textAlign: 'center' }}>
            {targetShape?.name}
          </div>
        </div>

        {/* Available Shapes */}
        {availableShapes.map(shape => {
          const isDraggingThis = isDragging && dragShape?.id === shape.id;
          const shapeSize = gameAreaRef.current 
            ? Math.min(100, Math.max(80, gameAreaRef.current.offsetWidth * 0.15))
            : 100;
          
          // Calculate position based on dragging state
          let left, top, transform;
          if (shape.isDragging && shape.x !== undefined && shape.y !== undefined) {
            // When dragging, use pixel positions directly
            left = `${shape.x}px`;
            top = `${shape.y}px`;
            transform = isDraggingThis ? 'scale(1.2)' : 'scale(1)';
          } else {
            // When not dragging, use percentage with centering
            left = `${shape.leftPercent}%`;
            top = `${shape.topPercent}%`;
            transform = `translate(-50%, -50%) ${isDraggingThis ? 'scale(1.2)' : 'scale(1)'}`;
          }
          
          return (
            <div
              key={shape.id}
              onMouseDown={(e) => handleMouseDown(e, shape)}
              style={{
                position: 'absolute',
                left,
                top,
                transform,
                width: `${shapeSize}px`,
                height: `${shapeSize}px`,
                fontSize: 'clamp(32px, 4vw, 48px)',
                cursor: 'grab',
                userSelect: 'none',
                backgroundColor: '#fff',
                border: '3px solid #2196F3',
                borderRadius: '15px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: isDraggingThis ? 'none' : 'all 0.2s',
                zIndex: isDraggingThis ? 1000 : 1,
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
            >
              <div>{shape.emoji}</div>
              <div style={{ fontSize: 'clamp(10px, 1.2vw, 12px)', color: '#666', marginTop: '5px' }}>
                {shape.name}
              </div>
            </div>
          );
        })}

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
            ✓ Correct Match!
          </div>
        )}
      </div>
    </div>
  );
}

export default ShapeMatchingGame;

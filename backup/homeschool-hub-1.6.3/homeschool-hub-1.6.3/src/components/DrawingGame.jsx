import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

function DrawingGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextLessonAfter = useDataStore(state => state.getNextLessonAfter);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  // Determine shape based on lesson number
  const lessonNumber = lesson?.lessonNumber || 1;
  const shapeConfig = {
    1: { name: 'square', points: 4, angles: 90 },
    2: { name: 'triangle', points: 3, angles: 60 },
    3: { name: 'rectangle', points: 4, angles: 90 },
    4: { name: 'pentagon', points: 5, angles: 108 },
    5: { name: 'hexagon', points: 6, angles: 120 },
    6: { name: 'octagon', points: 8, angles: 135 },
  };
  const currentShape = shapeConfig[lessonNumber] || shapeConfig[1];

  const canvasRef = useRef(null);
  const storedLinesRef = useRef([]); // Corner points
  const [pointsCount, setPointsCount] = useState(0); // Trigger re-render
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  // Clear points when lesson changes
  useEffect(() => {
    storedLinesRef.current = [];
    setPointsCount(0);
    setLessonCompleted(false);
    setValidationMessage('');
  }, [lessonNumber]);

  // Generate example points for different shapes
  const generateExamplePoints = (shapeName, centerX, centerY, size) => {
    const points = [];
    const numPoints = currentShape.points;

    switch (shapeName) {
      case 'triangle':
        // Equilateral triangle pointing up
        points.push({ x: centerX, y: centerY - size / 2 }); // Top
        points.push({ x: centerX - size / 2, y: centerY + size / 2 }); // Bottom-left
        points.push({ x: centerX + size / 2, y: centerY + size / 2 }); // Bottom-right
        break;
      case 'rectangle':
        // Rectangle (wider than tall)
        const width = size * 1.5;
        const height = size;
        points.push({ x: centerX - width / 2, y: centerY - height / 2 }); // Top-left
        points.push({ x: centerX + width / 2, y: centerY - height / 2 }); // Top-right
        points.push({ x: centerX + width / 2, y: centerY + height / 2 }); // Bottom-right
        points.push({ x: centerX - width / 2, y: centerY + height / 2 }); // Bottom-left
        break;
      case 'pentagon':
        // Regular pentagon
        for (let i = 0; i < 5; i++) {
          const angle = (i * 2 * Math.PI / 5) - Math.PI / 2; // Start at top
          points.push({
            x: centerX + size * Math.cos(angle),
            y: centerY + size * Math.sin(angle)
          });
        }
        break;
      case 'hexagon':
        // Regular hexagon
        for (let i = 0; i < 6; i++) {
          const angle = (i * 2 * Math.PI / 6) - Math.PI / 2; // Start at top
          points.push({
            x: centerX + size * Math.cos(angle),
            y: centerY + size * Math.sin(angle)
          });
        }
        break;
      case 'octagon':
        // Regular octagon
        for (let i = 0; i < 8; i++) {
          const angle = (i * 2 * Math.PI / 8) - Math.PI / 2; // Start at top
          points.push({
            x: centerX + size * Math.cos(angle),
            y: centerY + size * Math.sin(angle)
          });
        }
        break;
      default: // square
        points.push({ x: centerX - size / 2, y: centerY - size / 2 }); // Top-left
        points.push({ x: centerX + size / 2, y: centerY - size / 2 }); // Top-right
        points.push({ x: centerX + size / 2, y: centerY + size / 2 }); // Bottom-right
        points.push({ x: centerX - size / 2, y: centerY + size / 2 }); // Bottom-left
    }
    return points;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw example shape in the center as a guide
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const exampleSize = 120; // Size of example shape
    const examplePoints = generateExamplePoints(currentShape.name, centerX, centerY, exampleSize);

    // Draw example square outline (light gray, dashed)
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(examplePoints[0].x, examplePoints[0].y);
    for (let i = 1; i < examplePoints.length; i++) {
      ctx.lineTo(examplePoints[i].x, examplePoints[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw example corner points (smaller, lighter)
    const exampleColors = ['#a0d4a0', '#a0c0ff', '#ffe0a0', '#ffa0a0', '#d4a0ff', '#ffa0d4', '#a0ffd4', '#ffd4a0'];
    examplePoints.forEach((point, index) => {
      ctx.fillStyle = exampleColors[index % exampleColors.length];
      ctx.beginPath();
      ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#666666';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText((index + 1).toString(), point.x, point.y);
    });

    // Draw the user's square shape
    if (storedLinesRef.current.length > 0) {
      ctx.strokeStyle = '#000000';
      ctx.fillStyle = '#FFD700'; // Gold/yellow fill color
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw the shape
      ctx.beginPath();
      ctx.moveTo(storedLinesRef.current[0].x, storedLinesRef.current[0].y);
      for (let i = 1; i < storedLinesRef.current.length; i++) {
        ctx.lineTo(storedLinesRef.current[i].x, storedLinesRef.current[i].y);
      }

      // Close the shape if we have the required number of points
      if (storedLinesRef.current.length === currentShape.points) {
        ctx.closePath();
        ctx.fill(); // Fill the shape
      }

      ctx.stroke(); // Draw the outline

      // Draw corner points as large, colorful circles
      const pointColors = ['#28a745', '#007bff', '#ffc107', '#dc3545', '#9b59b6', '#e67e22', '#1abc9c', '#e74c3c'];
      storedLinesRef.current.forEach((point, index) => {
        // Draw outer circle
        ctx.fillStyle = pointColors[index % pointColors.length];
        ctx.beginPath();
        ctx.arc(point.x, point.y, 12, 0, Math.PI * 2);
        ctx.fill();

        // Draw inner white circle
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
        ctx.fill();

        // Draw point number
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText((index + 1).toString(), point.x, point.y);
      });
    }
  }, [pointsCount, currentShape]);

  const handleCanvasClick = (e) => {
    if (lessonCompleted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // If we already have the required number of points, start over
    if (storedLinesRef.current.length >= currentShape.points) {
      clearCanvas();
    }

    // Add the point
    storedLinesRef.current.push({ x, y });
    setPointsCount(storedLinesRef.current.length);
    setValidationMessage('');

    // Auto-validate when required number of points are placed
    if (storedLinesRef.current.length === currentShape.points) {
      // Force re-render
      setTimeout(() => {
        validateShape();
      }, 100);
    }
  };

  const validateShape = () => {
    const points = storedLinesRef.current;

    if (points.length !== currentShape.points) {
      setValidationMessage(`Click exactly ${currentShape.points} points to make a ${currentShape.name}!`);
      return;
    }

    // Calculate side lengths
    const sides = [];
    for (let i = 0; i < currentShape.points; i++) {
      const next = (i + 1) % currentShape.points;
      const sideLength = Math.sqrt(
        Math.pow(points[next].x - points[i].x, 2) +
        Math.pow(points[next].y - points[i].y, 2)
      );
      sides.push(sideLength);
    }

    // Check minimum size
    const minSide = Math.min(...sides);
    if (minSide < 30) {
      setValidationMessage(`Try making a bigger ${currentShape.name}!`);
      return;
    }

    // For square and rectangle, check if sides are roughly equal
    if (currentShape.name === 'square') {
      const avgSide = sides.reduce((a, b) => a + b, 0) / 4;
      const maxVariance = avgSide * 0.4;
      const maxSide = Math.max(...sides);

      if (maxSide - minSide > maxVariance) {
        setValidationMessage('Try to make all 4 sides more similar in length!');
        return;
      }
    }

    // Check angles - should be roughly the target angle for the shape
    const angles = [];
    for (let i = 0; i < currentShape.points; i++) {
      const prev = (i - 1 + currentShape.points) % currentShape.points;
      const curr = i;
      const next = (i + 1) % currentShape.points;

      // Vectors from the current vertex to the previous and next vertices
      const v1 = {
        x: points[prev].x - points[curr].x,
        y: points[prev].y - points[curr].y
      };
      const v2 = {
        x: points[next].x - points[curr].x,
        y: points[next].y - points[curr].y
      };

      const dot = v1.x * v2.x + v1.y * v2.y;
      const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
      const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

      if (mag1 > 0 && mag2 > 0) {
        const angle = Math.acos(Math.max(-1, Math.min(1, dot / (mag1 * mag2))));
        angles.push(angle);
      }
    }

    // Check if angles are roughly correct (lenient tolerance for kids)
    const targetAngle = (currentShape.angles * Math.PI) / 180; // Convert to radians
    const angleTolerance = Math.PI / 2.5; // More lenient tolerance for kids (approx 72 degrees)
    const allAnglesGood = angles.every(angle =>
      Math.abs(angle - targetAngle) <= angleTolerance ||
      Math.abs(angle - (Math.PI * 2 - targetAngle)) <= angleTolerance
    );

    if (!allAnglesGood && currentShape.name !== 'rectangle') {
      setValidationMessage(`Try to make the corners more like a ${currentShape.name}!`);
      return;
    }

    // If we got here, it's the correct shape!
    setValidationMessage(`Great job! You drew a ${currentShape.name}! ✓`);

    if (!lessonCompleted && lesson) {
      setLessonCompleted(true);
      setTimeout(() => {
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
          score: 100,
        });
        addProgress(progress).then(() => {
          saveData();
        }).catch(err => {
          console.error('Error saving progress:', err);
        });
      }, 500);
    }
  };


  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    storedLinesRef.current = [];
    setPointsCount(0);
    setLessonCompleted(false);
    setValidationMessage('');
  };

  // Handle touch events for mobile/tablet
  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('click', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvasRef.current.dispatchEvent(mouseEvent);
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      minHeight: 0,
    }}>
      <div style={{
        flexShrink: 0,
        textAlign: 'center',
        marginBottom: '10px',
      }}>
        <h2 style={{
          fontSize: '24px',
          color: '#333',
          marginBottom: '10px',
        }}>
          Draw {currentShape.name === 'octagon' ? 'an' : 'a'} {currentShape.name.charAt(0).toUpperCase() + currentShape.name.slice(1)}! 🎨
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#666',
        }}>
          Look at the example {currentShape.name} in the center, then click {currentShape.points} points to make your own {currentShape.name}!
        </p>
        {pointsCount > 0 && pointsCount < currentShape.points && (
          <p style={{
            fontSize: '14px',
            color: '#007bff',
            marginTop: '5px',
            fontWeight: 'bold',
          }}>
            Points placed: {pointsCount} / {currentShape.points}
          </p>
        )}
        {validationMessage && (
          <p style={{
            fontSize: '16px',
            color: lessonCompleted ? '#28a745' : '#dc3545',
            fontWeight: 'bold',
            marginTop: '10px',
          }}>
            {validationMessage}
          </p>
        )}
      </div>

      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '3px solid #333',
        borderRadius: '8px',
        padding: '10px',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}>
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          onClick={handleCanvasClick}
          onTouchStart={handleTouchStart}
          style={{
            cursor: 'pointer',
            display: 'block',
            backgroundColor: '#fff',
          }}
        />
      </div>

      <div style={{
        flexShrink: 0,
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
      }}>
        <button
          onClick={clearCanvas}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Clear
        </button>

        {lessonCompleted && (
          <div style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: 'white',
            borderRadius: '6px',
            fontWeight: 'bold',
          }}>
            ✓ Perfect {currentShape.name.charAt(0).toUpperCase() + currentShape.name.slice(1)}!
          </div>
        )}

        {lesson && (
          <button
            onClick={async () => {
              await new Promise(resolve => setTimeout(resolve, 200));
              const nextLesson = getNextLessonAfter(lesson);
              if (nextLesson) {
                navigate(`/lesson/${nextLesson.id}`);
              } else {
                navigate(`/lessons?subjectId=${lesson.subjectId}`);
              }
            }}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Next Lesson →
          </button>
        )}
      </div>
    </div>
  );
}

export default DrawingGame;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, stop as stopTTS } from '../utils/textToSpeech';

const GRADE_TIERS = {
  PLATINUM: { name: 'Platinum', color: '#E5E4E2', icon: '💎', minScore: 95 },
  GOLD: { name: 'Gold', color: '#FFD700', icon: '🥇', minScore: 85 },
  SILVER: { name: 'Silver', color: '#C0C0C0', icon: '🥈', minScore: 70 },
  BRONZE: { name: 'Bronze', color: '#CD7F32', icon: '🥉', minScore: 50 },
  UNGRADED: { name: 'Not Graded Yet', color: '#9E9E9E', icon: '⏳', minScore: 0 },
};

function DrawingCanvas({ lesson, prompt }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);
  const allProgress = useDataStore(state => state.data?.progress || []);
  
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedImagePath, setSavedImagePath] = useState(null);
  const [existingProgress, setExistingProgress] = useState(null);
  const [hasSpoken, setHasSpoken] = useState(false);
  
  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'Red', value: '#FF0000' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Green', value: '#00FF00' },
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Orange', value: '#FFA500' },
    { name: 'Purple', value: '#800080' },
    { name: 'Pink', value: '#FFC0CB' },
    { name: 'Brown', value: '#8B4513' },
    { name: 'White', value: '#FFFFFF' },
  ];

  // Check for existing progress on mount
  useEffect(() => {
    if (lesson) {
      const userId = getUserId();
      const existing = allProgress.find(
        p => p.studentId === userId && 
             p.activityId === lesson.id && 
             p.activityType === 'Lesson'
      );
      if (existing) {
        setExistingProgress(existing);
        if (existing.imagePath) {
          setSavedImagePath(existing.imagePath);
        }
      }
    }
  }, [lesson, allProgress, getUserId]);

  // Initialize canvas with responsive sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      const ctx = canvas.getContext('2d');
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // Set canvas to fill container responsively
      canvas.width = Math.min(containerWidth - 20, 900);
      canvas.height = Math.min(containerHeight - 20, 600);
      
      // Fill with white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set default drawing settings
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Clear canvas and reset state when lesson changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !lesson) return;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    setHasDrawn(false);
    setSavedImagePath(null);
    setHasSpoken(false);
  }, [lesson?.id]);

  // Read prompt using TTS - only once
  useEffect(() => {
    if (prompt && !hasSpoken) {
      // Stop any existing speech first
      stopTTS();
      
      // Wait a bit to ensure previous TTS has stopped
      const timer = setTimeout(() => {
        const instruction = `Let's create some art! ${prompt}. Use the colors and brush to draw on the canvas. When you're done, click Save Drawing.`;
        speak(instruction, { volume: 1.0, rate: 0.85, pitch: 1.0 }).catch(() => {});
        setHasSpoken(true);
      }, 300);
      
      return () => {
        clearTimeout(timer);
        stopTTS();
      };
    }
  }, [prompt, hasSpoken]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    setIsDrawing(true);
    setHasDrawn(true);
    
    // Account for canvas scaling
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Account for canvas scaling
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    stopTTS();
    speak("Canvas cleared. Start drawing again!", { volume: 1.0, rate: 0.9 }).catch(() => {});
  };

  const saveDrawing = async () => {
    if (!hasDrawn || isSaving) return;
    
    setIsSaving(true);
    stopTTS();
    
    // Wait a bit for TTS to fully stop before starting new speech
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      // Speak saving message and wait for it to start
      await speak("Saving your beautiful artwork!", { volume: 1.0, rate: 0.9 }).catch(() => {});
      
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL('image/png');
      
      // Check if we're in Electron
      if (window.electronAPI && window.electronAPI.saveDrawing) {
        const result = await window.electronAPI.saveDrawing({
          imageData: dataURL,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          studentId: getUserId(),
        });
        
        if (result.success) {
          setSavedImagePath(result.filePath);
          
          // Save or update progress using addProgress (it handles both)
          const userId = getUserId();
          if (existingProgress) {
            // Update existing progress
            const updatedProgress = new Progress({
              ...existingProgress,
              imagePath: result.filePath,
              completedAt: new Date(),
            });
            await addProgress(updatedProgress);
          } else {
            // Create new progress
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
              score: 0, // Will be graded by parent
              imagePath: result.filePath,
            });
            await addProgress(progress);
          }
          
          await saveData();
          
          // Wait for the first speech to finish before starting the second
          await new Promise(resolve => setTimeout(resolve, 1500));
          stopTTS();
          await new Promise(resolve => setTimeout(resolve, 200));
          await speak("Your drawing has been saved! A parent can review and grade it later.", { volume: 1.0, rate: 0.85 }).catch(() => {});
        } else {
          throw new Error(result.error || 'Failed to save drawing');
        }
      } else {
        // Fallback: save to localStorage if not in Electron
        localStorage.setItem(`drawing_${lesson.id}_${getUserId()}`, dataURL);
        setSavedImagePath('localStorage');
        
        // Wait for the first speech to finish before starting the second
        await new Promise(resolve => setTimeout(resolve, 1500));
        stopTTS();
        await new Promise(resolve => setTimeout(resolve, 200));
        await speak("Your drawing has been saved!", { volume: 1.0, rate: 0.9 }).catch(() => {});
      }
    } catch (error) {
      console.error('Error saving drawing:', error);
      stopTTS();
      await new Promise(resolve => setTimeout(resolve, 200));
      await speak("Sorry, there was an error saving your drawing. Please try again.", { volume: 1.0, rate: 0.9 }).catch(() => {});
    } finally {
      setIsSaving(false);
    }
  };

  const getGradeInfo = () => {
    if (!existingProgress || existingProgress.score === 0) {
      return GRADE_TIERS.UNGRADED;
    }
    
    const score = existingProgress.score;
    if (score >= GRADE_TIERS.PLATINUM.minScore) return GRADE_TIERS.PLATINUM;
    if (score >= GRADE_TIERS.GOLD.minScore) return GRADE_TIERS.GOLD;
    if (score >= GRADE_TIERS.SILVER.minScore) return GRADE_TIERS.SILVER;
    if (score >= GRADE_TIERS.BRONZE.minScore) return GRADE_TIERS.BRONZE;
    return GRADE_TIERS.UNGRADED;
  };

  const grade = getGradeInfo();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      gap: '15px',
      overflow: 'hidden',
    }}>
      {/* Grade Badge - Only show if graded */}
      {existingProgress && existingProgress.score > 0 && (
        <div style={{
          padding: '10px 20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '8px',
          textAlign: 'center',
          color: 'white',
          fontSize: '1.1rem',
          fontWeight: 'bold',
        }}>
          <span style={{ marginRight: '8px' }}>{grade.icon}</span>
          {grade.name}
          <span style={{ marginLeft: '8px' }}>({existingProgress.score}%)</span>
        </div>
      )}

      {/* Canvas - Takes up most of the space */}
      <div 
        ref={containerRef}
        style={{
          flex: 1,
          backgroundColor: '#f5f5f5',
          borderRadius: '12px',
          padding: '15px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{
            backgroundColor: 'white',
            border: '3px solid #ddd',
            borderRadius: '8px',
            cursor: 'crosshair',
            touchAction: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        />
      </div>

      {/* Color Palette - Bottom */}
      <div style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '12px',
        justifyContent: 'center',
      }}>
        {colors.map(c => (
          <button
            key={c.value}
            onClick={() => {
              setColor(c.value);
              stopTTS();
              speak(c.name, { volume: 0.8, rate: 1.0 }).catch(() => {});
            }}
            style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              backgroundColor: c.value,
              border: color === c.value ? '4px solid #333' : '2px solid #999',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
            title={c.name}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.15)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        ))}
      </div>

      {/* Brush Size and Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '12px',
        justifyContent: 'space-between',
      }}>
        {/* Brush Size */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          minWidth: '200px',
        }}>
          <label style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Brush Size:</label>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            style={{ flex: 1, minWidth: '100px' }}
          />
          <span style={{
            width: `${Math.max(brushSize * 2, 16)}px`,
            height: `${Math.max(brushSize * 2, 16)}px`,
            borderRadius: '50%',
            backgroundColor: color,
            display: 'inline-block',
            border: '1px solid #333',
            flexShrink: 0,
          }} />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={clearCanvas}
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            🗑️ Clear
          </button>
          <button
            onClick={saveDrawing}
            disabled={!hasDrawn || isSaving}
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              backgroundColor: hasDrawn && !isSaving ? '#4CAF50' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: hasDrawn && !isSaving ? 'pointer' : 'not-allowed',
              fontWeight: 'bold',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              if (hasDrawn && !isSaving) e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {isSaving ? '💾 Saving...' : '💾 Save Drawing'}
          </button>
        </div>
      </div>

      {/* Status Message */}
      {savedImagePath && (
        <div style={{
          padding: '15px',
          backgroundColor: '#d4edda',
          border: '2px solid #c3e6cb',
          borderRadius: '8px',
          textAlign: 'center',
          color: '#155724',
          fontWeight: 'bold',
        }}>
          ✅ Your drawing has been saved! A parent will review and grade it soon.
        </div>
      )}
    </div>
  );
}

export default DrawingCanvas;

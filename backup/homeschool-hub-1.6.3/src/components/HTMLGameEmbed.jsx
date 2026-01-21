import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, isSpeaking, stop } from '../utils/textToSpeech';

/**
 * HTML Game Embed Component
 * Renders HTML games using an iframe
 * Supports both local file paths and remote URLs
 * Handles game completion and lesson progress
 */
function HTMLGameEmbed({ url = '/html-games/days.html', width = '100%', height = '100%', lesson }) {
  const [isLoading, setIsLoading] = useState(true);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showCompletionOverlay, setShowCompletionOverlay] = useState(false);
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);
  const getNextLessonAfter = useDataStore(state => state.getNextLessonAfter);
  const iframeRef = useRef(null);

  // Convert local file paths to use custom protocol in Electron
  const getFinalUrl = () => {
    if (window.electronAPI) {
      // In Electron, convert /html-games/... to htmlgame://html-games/...
      if (url.startsWith('/html-games/')) {
        return `htmlgame://${url.substring(1)}`;
      }
      // Handle other local paths
      if (url.startsWith('/')) {
        return `htmlgame://${url.substring(1)}`;
      }
    }
    // For web or if no electronAPI, use the path as-is (Vite will serve from public)
    return url;
  };
  
  const finalUrl = getFinalUrl();

  // Listen for messages from the iframe (completion and TTS requests)
  useEffect(() => {
    const handleMessage = async (event) => {
      // Handle TTS stop requests from HTML games
      if (event.data && event.data.type === 'html-game-tts-stop') {
        stop();
        return;
      }
      
      // Handle TTS requests from HTML games
      if (event.data && event.data.type === 'html-game-tts') {
        try {
          // Stop any current speech before starting new speech
          stop();
          // Small delay to ensure stop completes
          await new Promise(resolve => setTimeout(resolve, 100));
          await speak(event.data.text, { 
            volume: event.data.volume || 1.0, 
            rate: event.data.rate || 0.8, 
            pitch: event.data.pitch || 1.1 
          });
        } catch (error) {
          console.error('Error speaking text from HTML game:', error);
        }
        return;
      }
      
      // Only accept messages from our HTML game
      if (event.data && event.data.type === 'html-game-complete') {
        setGameCompleted(true);
        
        // Save progress if lesson is provided
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
            score: 100, // Perfect score for completing the game
          });
          addProgress(progress);
          saveData();
        }
        
        // If this is the Days of the Week game, read all days in order
        if (event.data.game === 'days-of-the-week') {
          const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
          
          // Helper function to wait for speech to complete
          const waitForSpeechToComplete = () => {
            return new Promise((resolve) => {
              const checkInterval = setInterval(() => {
                if (!isSpeaking()) {
                  clearInterval(checkInterval);
                  resolve();
                }
              }, 100); // Check every 100ms
            });
          };
          
          // Read each day, waiting for each to complete before starting the next
          for (let i = 0; i < daysOfWeek.length; i++) {
            try {
              await speak(daysOfWeek[i], { volume: 1.0, rate: 0.8, pitch: 1.1 });
              // Wait for speech to complete before moving to next day
              await waitForSpeechToComplete();
              // Small pause between days
              await new Promise(resolve => setTimeout(resolve, 300));
            } catch (error) {
              console.error('Error speaking day:', error);
            }
          }
        }
        
        // Show overlay after a short delay to let the game's celebration be seen first
        setTimeout(() => {
          setShowCompletionOverlay(true);
        }, 2000); // 2 second delay
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [lesson, getUserId, getNextProgressId, addProgress, saveData]);

  const handleNextLesson = () => {
    if (lesson) {
      const nextLesson = getNextLessonAfter(lesson);
      if (nextLesson && nextLesson.id) {
        navigate(`/lesson/${nextLesson.id}`);
      } else if (lesson.subjectId) {
        navigate(`/lessons?subjectId=${lesson.subjectId}`);
      } else {
        navigate('/');
      }
    }
  };

  const handlePlayAgain = () => {
    setGameCompleted(false);
    setShowCompletionOverlay(false);
    // Reload the iframe to restart the game
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  // If height is 100%, use flex layout instead of fixed height
  const useFlexHeight = height === '100%';
  
  return (
    <div style={{
      width: '100%',
      ...(useFlexHeight ? {
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
      } : {
        height: height,
      }),
      position: 'relative',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
      isolation: 'isolate',
    }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          zIndex: 1,
        }}>
          <p style={{ color: '#666', fontSize: '16px' }}>Loading game...</p>
        </div>
      )}
      <iframe
        ref={iframeRef}
        width={width}
        height={height}
        src={finalUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          flex: useFlexHeight ? 1 : undefined,
          minHeight: useFlexHeight ? 0 : undefined,
        }}
        title="HTML Game"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          console.error('Failed to load HTML game:', finalUrl);
        }}
      />
      {showCompletionOverlay && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          borderRadius: '8px',
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            textAlign: 'center',
            maxWidth: '500px',
            width: '90%',
          }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>🎉</div>
            <h2 style={{ 
              fontSize: '32px', 
              marginBottom: '15px', 
              color: '#333',
              marginTop: 0,
            }}>
              Great Job!
            </h2>
            <p style={{ 
              fontSize: '18px', 
              color: '#666', 
              marginBottom: '30px' 
            }}>
              You completed the game!
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handlePlayAgain}
                style={{
                  padding: '15px 30px',
                  fontSize: '18px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Play Again
              </button>
              {lesson && (
                <button
                  onClick={handleNextLesson}
                  style={{
                    padding: '15px 30px',
                    fontSize: '18px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Next Lesson →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HTMLGameEmbed;

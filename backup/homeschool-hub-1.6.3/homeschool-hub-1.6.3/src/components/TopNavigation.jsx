import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import UpdateChecker from './UpdateChecker';

function TopNavigation() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  // Use stable selectors to prevent unnecessary re-renders
  const getNextLessonAfter = useDataStore(useCallback(state => state.getNextLessonAfter, []));
  const addProgress = useDataStore(useCallback(state => state.addProgress, []));
  const getNextProgressId = useDataStore(useCallback(state => state.getNextProgressId, []));
  const getUserId = useDataStore(useCallback(state => state.getUserId, []));
  const saveData = useDataStore(useCallback(state => state.saveData, []));
  const getLesson = useDataStore(useCallback(state => state.getLesson, []));
  const hasCompletedLesson = useDataStore(useCallback(state => state.hasCompletedLesson, []));
  // Only subscribe to pointsBalance, not the entire data object
  const pointsBalance = useDataStore(useCallback(state => state.data?.pointsBalance || 0, []));
  // Get lessons array reference for skip logic (avoid subscribing to entire data)
  const lessons = useDataStore(useCallback(state => state.data?.lessons || [], []));
  
  // Determine if we're on a lesson page
  const isLessonPage = location.pathname.startsWith('/lesson/');
  
  // Extract lessonId from params or pathname
  let lessonId = null;
  if (isLessonPage) {
    // Try params first
    if (params.lessonId) {
      const parsed = parseInt(params.lessonId);
      lessonId = isNaN(parsed) ? null : parsed;
    }
    
    // If params didn't work, try extracting from pathname
    if (!lessonId) {
      const match = location.pathname.match(/\/lesson\/(\d+)/);
      if (match && match[1]) {
        const parsed = parseInt(match[1]);
        lessonId = isNaN(parsed) ? null : parsed;
      }
    }
  }
  
  const lesson = lessonId ? getLesson(lessonId) : null;
  
  const handleSkipLesson = async () => {
    console.log('Skip button clicked!', { lessonId, lesson, pathname: location.pathname });
    // Wait a moment for lesson data to load if needed
    let currentLesson = lesson || (lessonId ? getLesson(lessonId) : null);
    
    // If lesson still not found, wait a bit and try again
    if (!currentLesson && lessonId) {
      await new Promise(resolve => setTimeout(resolve, 100));
      currentLesson = getLesson(lessonId);
    }
    
    if (!currentLesson) {
      console.error('No lesson found to skip. LessonId:', lessonId);
      console.error('Pathname:', location.pathname);
      console.error('Params:', params);
      console.error('Available lessons:', lessons?.length || 0);

      // Try to find the lesson by ID from all lessons
      const allLessons = lessons || [];
      let foundLesson = lessonId ? allLessons.find(l => l.id === lessonId) : null;
      
      // If still not found, try to get lesson from location state
      if (!foundLesson && location.state && location.state.lesson) {
        foundLesson = location.state.lesson;
      }
      
      // If still not found and we're on a lesson page, try to find clicking game lesson
      if (!foundLesson && isLessonPage) {
        // Try to find any clicking game lesson in technology subject
        foundLesson = allLessons.find(l => 
          l.title === 'Clicking Game' && l.subjectId === 'technology'
        );
      }
      
      if (foundLesson && foundLesson.subjectId) {
        // Navigate to subject's lessons list if we can find the subject
        navigate(`/lessons?subjectId=${foundLesson.subjectId}`);
      } else {
        // Only navigate to home as last resort
        navigate('/');
      }
      return;
    }
    
    // Log skip action (informational only - not an error)
    // console.log('Skipping lesson:', currentLesson.id, currentLesson.title, currentLesson.subjectId);
    
    try {
      const userId = getUserId();
      
      // Check if lesson was already completed
      const wasCompleted = hasCompletedLesson(
        userId, 
        currentLesson.yearId, 
        currentLesson.subjectId, 
        currentLesson.lessonNumber
      );
      
      // Mark lesson as accessed, preserving completion status if it was already completed
      const progressId = getNextProgressId();
      const progress = new Progress({
        id: progressId,
        studentId: userId,
        activityType: 'Lesson',
        activityId: currentLesson.id,
        yearId: currentLesson.yearId,
        subjectId: currentLesson.subjectId,
        lessonNumber: currentLesson.lessonNumber,
        isCompleted: wasCompleted, // Preserve completion status
        completedAt: new Date(),
        score: null,
      });
      await addProgress(progress);
      await saveData();
      
      // Navigate to next lesson
      const nextLesson = getNextLessonAfter(currentLesson);
      
      if (nextLesson && nextLesson.id) {
        navigate(`/lesson/${nextLesson.id}`);
      } else {
        // If no next lesson, go back to lessons list for the subject
        if (currentLesson && currentLesson.subjectId) {
          navigate(`/lessons?subjectId=${currentLesson.subjectId}`);
        } else {
          // Fallback to home only if we don't have subject info
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Error skipping lesson:', error);
      // On error, navigate to the subject's lessons list if we have the subject
      if (currentLesson && currentLesson.subjectId) {
        navigate(`/lessons?subjectId=${currentLesson.subjectId}`);
      } else {
        // Only navigate to home as absolute last resort
        navigate('/');
      }
    }
  };

  const handleMarkCompleted = async () => {
    if (passwordInput !== 'password123') {
      setPasswordError('Incorrect password. Please try again.');
      return;
    }

    // Wait a moment for lesson data to load if needed
    let currentLesson = lesson || (lessonId ? getLesson(lessonId) : null);
    
    if (!currentLesson && lessonId) {
      await new Promise(resolve => setTimeout(resolve, 100));
      currentLesson = getLesson(lessonId);
    }

    if (!currentLesson) {
      setPasswordError('Could not find lesson. Please try again.');
      return;
    }

    try {
      const userId = getUserId();
      const progressId = getNextProgressId();
      const progress = new Progress({
        id: progressId,
        studentId: userId,
        activityType: 'Lesson',
        activityId: currentLesson.id,
        yearId: currentLesson.yearId,
        subjectId: currentLesson.subjectId,
        lessonNumber: currentLesson.lessonNumber,
        isCompleted: true,
        completedAt: new Date(),
        score: 100,
      });
      await addProgress(progress);
      await saveData();
      
      // Close modal and reset
      setShowPasswordModal(false);
      setPasswordInput('');
      setPasswordError('');
      
      // Refresh the page to show updated completion status
      window.location.reload();
    } catch (error) {
      console.error('Error marking lesson as completed:', error);
      setPasswordError('An error occurred. Please try again.');
    }
  };

  const handleBack = () => {
    if (location.pathname === '/') {
      // Already on homepage, do nothing
      return;
    }
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleShop = () => {
    navigate('/shop');
  };

  const [showAdminPasswordModal, setShowAdminPasswordModal] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminPasswordError, setAdminPasswordError] = useState('');

  const handleAdminClick = () => {
    setShowAdminPasswordModal(true);
    setAdminPasswordInput('');
    setAdminPasswordError('');
  };

  const handleAdminPasswordSubmit = () => {
    if (adminPasswordInput !== 'password123') {
      setAdminPasswordError('Incorrect password. Please try again.');
      return;
    }

    setShowAdminPasswordModal(false);
    setAdminPasswordInput('');
    setAdminPasswordError('');
    navigate('/admin');
  };

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 10000,
      backgroundColor: 'white',
      padding: '12px 20px',
      borderBottom: '2px solid #e0e0e0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={handleHome}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          🏠 Home
        </button>
        {location.pathname !== '/' && (
          <button
            onClick={handleBack}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            ← Back
          </button>
        )}
      </div>
      
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {/* Points Balance Display */}
        <div
          onClick={handleShop}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            backgroundColor: '#ffd700',
            color: '#333',
            border: '2px solid #ffed4e',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
          }}
          title="Click to open shop"
        >
          <span style={{ fontSize: '18px', lineHeight: '1' }}>💰</span>
          <span>{pointsBalance} pts</span>
        </div>
        <UpdateChecker />
        <button
          onClick={handleShop}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          🛒 Shop
        </button>
        <button
          onClick={handleAdminClick}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          🔒 Admin
        </button>
        {isLessonPage && (
          <>
            <button
              onClick={() => setShowPasswordModal(true)}
              style={{
                padding: '8px 20px',
                backgroundColor: '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              🔒 Mark Completed
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Skip button onClick fired');
                handleSkipLesson();
              }}
              style={{
                padding: '8px 20px',
                backgroundColor: '#ffc107',
                color: '#333',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                position: 'relative',
                zIndex: 10002,
              }}
            >
              Skip Lesson →
            </button>
          </>
        )}
      </div>
      
      {/* Password Modal */}
      {showPasswordModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10001,
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            maxWidth: '400px',
            width: '90%',
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Parental Override</h3>
            <p style={{ marginBottom: '15px', color: '#666' }}>
              Enter password to mark this lesson as completed:
            </p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setPasswordError('');
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleMarkCompleted();
                }
              }}
              placeholder="Enter password"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginBottom: '10px',
              }}
              autoFocus
            />
            {passwordError && (
              <p style={{ color: '#dc3545', marginBottom: '10px', fontSize: '14px' }}>
                {passwordError}
              </p>
            )}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordInput('');
                  setPasswordError('');
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleMarkCompleted}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                Mark Completed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Password Modal */}
      {showAdminPasswordModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10001,
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            maxWidth: '400px',
            width: '90%',
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Admin Access</h3>
            <p style={{ marginBottom: '15px', color: '#666' }}>
              Enter password to access the admin panel:
            </p>
            <input
              type="password"
              value={adminPasswordInput}
              onChange={(e) => {
                setAdminPasswordInput(e.target.value);
                setAdminPasswordError('');
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAdminPasswordSubmit();
                }
              }}
              placeholder="Enter password"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginBottom: '10px',
              }}
              autoFocus
            />
            {adminPasswordError && (
              <p style={{ color: '#dc3545', marginBottom: '10px', fontSize: '14px' }}>
                {adminPasswordError}
              </p>
            )}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowAdminPasswordModal(false);
                  setAdminPasswordInput('');
                  setAdminPasswordError('');
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAdminPasswordSubmit}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopNavigation;


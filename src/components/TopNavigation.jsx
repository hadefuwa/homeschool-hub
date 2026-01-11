import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

function TopNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  
  const getNextLessonAfter = useDataStore(state => state.getNextLessonAfter);
  const addProgress = useDataStore(state => state.addProgress);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);
  const getLesson = useDataStore(state => state.getLesson);
  const hasCompletedLesson = useDataStore(state => state.hasCompletedLesson);
  
  // Determine if we're on a lesson page
  const isLessonPage = location.pathname.startsWith('/lesson/');
  const lessonId = isLessonPage ? parseInt(params.lessonId) : null;
  const lesson = lessonId ? getLesson(lessonId) : null;
  
  const handleSkipLesson = async () => {
    // Wait a moment for lesson data to load if needed
    let currentLesson = lesson || (lessonId ? getLesson(lessonId) : null);
    
    // If lesson still not found, wait a bit and try again
    if (!currentLesson && lessonId) {
      await new Promise(resolve => setTimeout(resolve, 100));
      currentLesson = getLesson(lessonId);
    }
    
    if (!currentLesson) {
      console.error('No lesson found to skip. LessonId:', lessonId);
      console.error('Available lessons:', get().data?.lessons?.length || 0);
      // Navigate to home if we can't find the lesson
      navigate('/');
      return;
    }
    
    console.log('Skipping lesson:', currentLesson.id, currentLesson.title, currentLesson.subjectId);
    
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
      console.log('Next lesson found:', nextLesson ? nextLesson.id : 'none');
      
      if (nextLesson && nextLesson.id) {
        navigate(`/lesson/${nextLesson.id}`);
      } else {
        // If no next lesson, go back to lessons list
        console.log('No next lesson, navigating to lessons list for subject:', currentLesson.subjectId);
        navigate(`/lessons?subjectId=${currentLesson.subjectId}`);
      }
    } catch (error) {
      console.error('Error skipping lesson:', error);
      // On error, at least navigate to the subject's lessons list
      if (currentLesson && currentLesson.subjectId) {
        navigate(`/lessons?subjectId=${currentLesson.subjectId}`);
      } else {
        navigate('/');
      }
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

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
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
      
      {isLessonPage && (
        <button
          onClick={handleSkipLesson}
          style={{
            padding: '8px 20px',
            backgroundColor: '#ffc107',
            color: '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          Skip Lesson →
        </button>
      )}
    </div>
  );
}

export default TopNavigation;


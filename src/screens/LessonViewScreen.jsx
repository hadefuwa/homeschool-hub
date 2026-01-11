import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import MarkdownWithYouTube from '../components/MarkdownWithYouTube';
import ClickingGame from '../components/ClickingGame';

function LessonViewScreen() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = useDataStore(state => state.getLesson(parseInt(lessonId)));
  const trackLessonAccess = useDataStore(state => state.trackLessonAccess);
  const getSubjectProgress = useDataStore(state => state.getSubjectProgress);
  
  // Track lesson access when component mounts
  useEffect(() => {
    if (lesson) {
      trackLessonAccess(lesson);
    }
  }, [lesson, trackLessonAccess]);
  
  const subjectProgress = lesson ? getSubjectProgress(lesson.subjectId) : null;

  if (!lesson) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Lesson Not Found</h1>
        <p>The lesson you're looking for doesn't exist.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }


  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '20px',
    }}>
      {/* Subject Progress Stats */}
      {subjectProgress && (
        <div style={{
          marginBottom: '20px',
          padding: '15px 20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
          }}>
            <h3 style={{
              margin: 0,
              fontSize: '16px',
              color: '#333',
              fontWeight: '600',
            }}>
              Subject Progress
            </h3>
            <span style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#007bff',
            }}>
              {Math.round(subjectProgress.progressPercentage)}%
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${subjectProgress.progressPercentage}%`,
              height: '100%',
              backgroundColor: '#007bff',
              transition: 'width 0.3s',
            }} />
          </div>
          <div style={{
            marginTop: '8px',
            fontSize: '14px',
            color: '#666',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <span>{subjectProgress.completedCount} of {subjectProgress.totalLessons} lessons completed</span>
          </div>
        </div>
      )}
      
      {/* Header */}
      <div style={{
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '2px solid #e0e0e0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '48px' }}>{lesson.emoji || '📚'}</span>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '32px',
              color: '#333',
            }}>
              {lesson.title}
            </h1>
            <p style={{
              margin: '5px 0 0 0',
              color: '#666',
              fontSize: '16px',
            }}>
              Lesson {lesson.lessonNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Lesson Content with YouTube Embeds or Special Components */}
      {lesson.title === 'Clicking Game' ? (
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ClickingGame lesson={lesson} />
        </div>
      ) : (
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          lineHeight: '1.6',
        }}>
          <MarkdownWithYouTube content={lesson.content} />
        </div>
      )}

      {/* Quiz Button */}
      {lesson.quizId && (
        <div style={{
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <button
            onClick={() => navigate(`/quiz/${lesson.quizId}`)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            Take Quiz →
          </button>
        </div>
      )}
    </div>
  );
}

export default LessonViewScreen;


import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Subject } from '../models/Subject';
import { Year } from '../models/Year';

function LessonsListScreen() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const subjectId = searchParams.get('subjectId');
  
  const nextLesson = useDataStore(state => 
    subjectId ? state.getNextLessonForSubject(subjectId) : null
  );
  
  const allLessons = useDataStore(state => 
    subjectId ? state.getAllLessonsForSubject(subjectId) : []
  );
  
  const subjectProgress = useDataStore(state => 
    subjectId ? state.getSubjectProgress(subjectId) : null
  );
  
  const hasCompletedLesson = useDataStore(state => state.hasCompletedLesson);
  const getUserId = useDataStore(state => state.getUserId);
  const userId = getUserId();
  
  const subject = subjectId ? Subject.getById(subjectId) : null;
  
  // Removed auto-navigation - let users see the lessons list

  if (!subjectId || !subject) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Subject Not Found</h1>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    }}>
      <div style={{
        marginBottom: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          ← Back
        </button>
        <h1 style={{ margin: 0 }}>
          {subject.name} Lessons
        </h1>
      </div>

      {/* Progress Info */}
      {subjectProgress && (
        <div style={{
          marginBottom: '30px',
          padding: '20px',
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
            <h2 style={{ margin: 0, fontSize: '18px' }}>Your Progress</h2>
            <span style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#007bff',
            }}>
              {Math.round(subjectProgress.progressPercentage)}% Complete
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
          <p style={{
            margin: '10px 0 0 0',
            fontSize: '14px',
            color: '#666',
          }}>
            {subjectProgress.completedCount} of {subjectProgress.totalLessons} lessons completed
          </p>
        </div>
      )}

      {/* All Lessons */}
      {allLessons.length === 0 ? (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <h2 style={{ marginBottom: '10px' }}>No Lessons Available</h2>
          <p>There are no lessons available for {subject.name} yet.</p>
        </div>
      ) : (
        <div>
          {/* Next Lesson Section */}
          {nextLesson && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                marginBottom: '20px',
                fontSize: '20px',
                color: '#333',
              }}>
                Continue Learning
              </h2>
              <div
                onClick={() => navigate(`/lesson/${nextLesson.id}`)}
                style={{
                  padding: '30px',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  border: '2px solid #007bff',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{
                  fontSize: '64px',
                  marginBottom: '15px',
                  textAlign: 'center',
                }}>
                  {nextLesson.emoji || '📚'}
                </div>
                <h3 style={{
                  margin: '0 0 10px 0',
                  fontSize: '24px',
                  color: '#333',
                  textAlign: 'center',
                }}>
                  {nextLesson.title}
                </h3>
                <p style={{
                  margin: '0 0 15px 0',
                  fontSize: '16px',
                  color: '#666',
                  textAlign: 'center',
                }}>
                  {Year.getById(nextLesson.yearId)?.name || nextLesson.yearId} - Lesson {nextLesson.lessonNumber}
                </p>
                <div style={{
                  textAlign: 'center',
                }}>
                  <button style={{
                    padding: '12px 24px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}>
                    Start Lesson →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* All Lessons List */}
          <div>
            <h2 style={{
              marginBottom: '20px',
              fontSize: '20px',
              color: '#333',
            }}>
              All Lessons ({allLessons.length})
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px',
            }}>
              {allLessons.map(lesson => {
                const isCompleted = hasCompletedLesson(
                  userId,
                  lesson.yearId,
                  lesson.subjectId,
                  lesson.lessonNumber
                );
                const isNextLesson = nextLesson && nextLesson.id === lesson.id;
                
                return (
                  <div
                    key={lesson.id}
                    onClick={() => navigate(`/lesson/${lesson.id}`)}
                    style={{
                      padding: '20px',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      border: isNextLesson ? '2px solid #007bff' : '1px solid #e0e0e0',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    }}
                  >
                    {isCompleted && (
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        fontSize: '20px',
                      }}>
                        ✅
                      </div>
                    )}
                    {isNextLesson && (
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        fontSize: '12px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                      }}>
                        Continue
                      </div>
                    )}
                    <div style={{
                      fontSize: '48px',
                      marginBottom: '10px',
                      textAlign: 'center',
                    }}>
                      {lesson.emoji || '📚'}
                    </div>
                    <h3 style={{
                      margin: '0 0 8px 0',
                      fontSize: '18px',
                      color: '#333',
                      textAlign: 'center',
                    }}>
                      {lesson.title}
                    </h3>
                    <p style={{
                      margin: '0',
                      fontSize: '14px',
                      color: '#666',
                      textAlign: 'center',
                    }}>
                      {Year.getById(lesson.yearId)?.name || lesson.yearId} - Lesson {lesson.lessonNumber}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonsListScreen;


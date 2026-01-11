import React from 'react';
import useDataStore from '../store/dataStore';
import { Subject } from '../models/Subject';
import { useNavigate } from 'react-router-dom';

function SubjectSelectionScreen() {
  const navigate = useNavigate();
  const getStatistics = useDataStore(state => state.getStatistics);
  const getAllLessonsForSubject = useDataStore(state => state.getAllLessonsForSubject);
  const hasCompletedLesson = useDataStore(state => state.hasCompletedLesson);
  const getUserId = useDataStore(state => state.getUserId);
  
  const userId = getUserId();
  const stats = getStatistics();
  
  // Calculate total progress across all subjects
  const allSubjects = Subject.allSubjects;
  let totalLessons = 0;
  let totalCompleted = 0;
  
  allSubjects.forEach(subject => {
    const lessons = getAllLessonsForSubject(subject.id);
    totalLessons += lessons.length;
    lessons.forEach(lesson => {
      if (hasCompletedLesson(userId, lesson.yearId, lesson.subjectId, lesson.lessonNumber)) {
        totalCompleted++;
      }
    });
  });
  
  const overallProgress = totalLessons > 0 ? (totalCompleted / totalLessons) * 100 : 0;

  const handleSubjectClick = (subjectId) => {
    navigate(`/lessons?subjectId=${subjectId}`);
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '1200px', 
      margin: '0 auto' 
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '20px',
        color: '#333'
      }}>
        Select Subject
      </h1>
      
      {/* Overall Progress Stats */}
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{
          margin: '0 0 15px 0',
          fontSize: '20px',
          color: '#333',
          textAlign: 'center',
        }}>
          📊 Overall Progress
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          marginBottom: '20px',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff' }}>
              {totalCompleted}
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
              Lessons Completed
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#28a745' }}>
              {totalLessons}
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
              Total Lessons
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ffc107' }}>
              {stats.totalQuizzes}
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
              Quizzes Completed
            </div>
          </div>
          {stats.averageScore > 0 && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#17a2b8' }}>
                {Math.round(stats.averageScore)}%
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                Average Score
              </div>
            </div>
          )}
        </div>
        <div style={{
          width: '100%',
          height: '12px',
          backgroundColor: '#e0e0e0',
          borderRadius: '6px',
          overflow: 'hidden',
          marginTop: '10px',
        }}>
          <div style={{
            width: `${overallProgress}%`,
            height: '100%',
            backgroundColor: '#007bff',
            transition: 'width 0.3s',
            borderRadius: '6px',
          }} />
        </div>
        <div style={{
          textAlign: 'center',
          marginTop: '10px',
          fontSize: '16px',
          fontWeight: '600',
          color: '#333',
        }}>
          {Math.round(overallProgress)}% Complete
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
      }}>
        {Subject.allSubjects.map(subject => (
          <div
            key={subject.id}
            onClick={() => handleSubjectClick(subject.id)}
            style={{
              padding: '24px',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>
              {subject.emoji}
            </div>
            <div style={{ 
              fontSize: '18px', 
              fontWeight: '600',
              color: '#333'
            }}>
              {subject.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubjectSelectionScreen;


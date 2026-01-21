import React from 'react';
import useDataStore from '../store/dataStore';
import { Subject } from '../models/Subject';
import { useNavigate } from 'react-router-dom';
import ActivityTable from '../components/ActivityTable';

function SubjectSelectionScreen() {
  const navigate = useNavigate();
  const getStatistics = useDataStore(state => state.getStatistics);
  const getAllLessonsForSubject = useDataStore(state => state.getAllLessonsForSubject);
  const hasCompletedLesson = useDataStore(state => state.hasCompletedLesson);
  const getUserId = useDataStore(state => state.getUserId);
  
  const userId = getUserId();
  const stats = getStatistics();
  const getMedalCounts = useDataStore(state => state.getMedalCounts);
  const medalCounts = getMedalCounts();
  
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
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
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
      
      {/* Medal Statistics */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        width: '100%',
      }}>
        <h2 style={{
          margin: '0 0 20px 0',
          fontSize: '20px',
          color: '#333',
          textAlign: 'center',
        }}>
          🏆 Medals Earned
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '15px',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '36px', 
              fontWeight: 'bold', 
              color: '#E5E4E2',
              marginBottom: '5px'
            }}>
              {medalCounts.platinum}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Platinum
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '36px', 
              fontWeight: 'bold', 
              color: '#FFD700',
              marginBottom: '5px'
            }}>
              {medalCounts.gold}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Gold
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '36px', 
              fontWeight: 'bold', 
              color: '#C0C0C0',
              marginBottom: '5px'
            }}>
              {medalCounts.silver}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Silver
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '36px', 
              fontWeight: 'bold', 
              color: '#CD7F32',
              marginBottom: '5px'
            }}>
              {medalCounts.bronze}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Bronze
            </div>
          </div>
        </div>
      </div>
      
      {/* Activity Table */}
      <div style={{
        marginTop: '40px',
        width: '100%',
      }}>
        <ActivityTable />
      </div>
      </div>
    </div>
  );
}

export default SubjectSelectionScreen;


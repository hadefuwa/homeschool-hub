import React, { useEffect, useState } from 'react';
import { Subject } from '../models/Subject';
import { useNavigate } from 'react-router-dom';

function ActivityTable() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadActivities();
    
    // Refresh activities every 5 seconds
    const interval = setInterval(loadActivities, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const loadActivities = async () => {
    try {
      if (window.electronAPI) {
        const result = await window.electronAPI.readActivityLog(20); // Get last 20 entries
        if (result.success) {
          // Filter only lesson_access entries
          const lessonActivities = result.entries.filter(
            entry => entry.type === 'lesson_access'
          );
          setActivities(lessonActivities);
        } else {
          console.warn('Failed to read activity log:', result.error);
        }
      } else {
        // Electron API not available (web mode or not initialized)
        setActivities([]);
      }
    } catch (error) {
      console.error('Error loading activities:', error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) {
        return 'Just now';
      } else if (diffMins < 60) {
        return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
      } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
      } else if (diffDays < 7) {
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
      } else {
        return date.toLocaleDateString();
      }
    } catch (error) {
      return 'Unknown';
    }
  };

  const handleLessonClick = (lessonId) => {
    if (lessonId) {
      navigate(`/lesson/${lessonId}`);
    }
  };

  const getSubjectName = (subjectId) => {
    const subject = Subject.getById(subjectId);
    return subject ? subject.name : subjectId || 'Unknown';
  };

  const getSubjectEmoji = (subjectId) => {
    const subject = Subject.getById(subjectId);
    return subject ? subject.emoji : '📚';
  };

  if (loading && activities.length === 0) {
    return (
      <div style={{
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
          📋 Recent Activity
        </h2>
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          Loading activity...
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div style={{
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
          📋 Recent Activity
        </h2>
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          No activity yet. Start a lesson to see your activity here!
        </div>
      </div>
    );
  }

  return (
    <div style={{
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
        📋 Recent Activity
      </h2>
      <div style={{
        overflowX: 'auto',
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
        }}>
          <thead>
            <tr style={{
              borderBottom: '2px solid #e0e0e0',
            }}>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#666',
              }}>
                Time
              </th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#666',
              }}>
                Student
              </th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#666',
              }}>
                Subject
              </th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#666',
              }}>
                Lesson
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr
                key={index}
                onClick={() => handleLessonClick(activity.lessonId)}
                style={{
                  borderBottom: '1px solid #f0f0f0',
                  cursor: activity.lessonId ? 'pointer' : 'default',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (activity.lessonId) {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <td style={{
                  padding: '12px',
                  fontSize: '14px',
                  color: '#666',
                }}>
                  {formatTimestamp(activity.timestamp)}
                </td>
                <td style={{
                  padding: '12px',
                  fontSize: '14px',
                  color: '#333',
                }}>
                  {activity.studentName || 'Student'}
                </td>
                <td style={{
                  padding: '12px',
                  fontSize: '14px',
                  color: '#333',
                }}>
                  <span style={{ marginRight: '8px' }}>
                    {getSubjectEmoji(activity.subjectId)}
                  </span>
                  {getSubjectName(activity.subjectId)}
                </td>
                <td style={{
                  padding: '12px',
                  fontSize: '14px',
                  color: '#333',
                  fontWeight: '500',
                }}>
                  {activity.lessonTitle || `Lesson ${activity.lessonNumber || ''}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActivityTable;

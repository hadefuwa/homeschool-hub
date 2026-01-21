import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

const GRADE_TIERS = {
  PLATINUM: { name: 'Platinum', color: '#E5E4E2', icon: '💎', score: 100 },
  GOLD: { name: 'Gold', color: '#FFD700', icon: '🥇', score: 90 },
  SILVER: { name: 'Silver', color: '#C0C0C0', icon: '🥈', score: 75 },
  BRONZE: { name: 'Bronze', color: '#CD7F32', icon: '🥉', score: 60 },
};

function ArtGradingScreen() {
  const navigate = useNavigate();
  const allProgress = useDataStore(state => state.data?.progress || []);
  const lessons = useDataStore(state => state.data?.lessons || []);
  const students = useDataStore(state => state.data?.students || []);
  const addProgress = useDataStore(state => state.addProgress);
  const saveData = useDataStore(state => state.saveData);
  
  const [artProgress, setArtProgress] = useState([]);
  const [selectedProgress, setSelectedProgress] = useState(null);
  const [loadedImage, setLoadedImage] = useState(null);
  const [filterStudent, setFilterStudent] = useState('all');
  const [filterGraded, setFilterGraded] = useState('all');

  // Load art progress items
  useEffect(() => {
    console.log('[ArtGradingScreen] Loading art progress...');
    console.log('[ArtGradingScreen] Total lessons:', lessons.length);
    console.log('[ArtGradingScreen] Total progress:', allProgress.length);
    
    // Find all art lessons
    const artLessons = lessons.filter(l => l.subjectId === 'art');
    console.log('[ArtGradingScreen] Art lessons found:', artLessons.length);
    const artLessonIds = artLessons.map(l => l.id);
    
    // Find progress items for art lessons with images
    const artProgressItems = allProgress.filter(
      p => artLessonIds.includes(p.activityId) && 
           p.activityType === 'Lesson' && 
           p.imagePath
    );
    console.log('[ArtGradingScreen] Art progress items with images:', artProgressItems.length);
    
    // Also check progress without imagePath filter
    const artProgressAll = allProgress.filter(
      p => artLessonIds.includes(p.activityId) && 
           p.activityType === 'Lesson'
    );
    console.log('[ArtGradingScreen] All art progress (with or without images):', artProgressAll.length);
    
    if (artProgressAll.length > 0) {
      console.log('[ArtGradingScreen] Sample progress item:', artProgressAll[0]);
    }
    
    // Enrich with lesson and student info
    const enrichedProgress = artProgressItems.map(p => {
      const lesson = artLessons.find(l => l.id === p.activityId);
      const student = students.find(s => s.id === p.studentId);
      return {
        ...p,
        lessonTitle: lesson?.title || 'Unknown Lesson',
        studentName: student?.name || 'Unknown Student',
        isGraded: p.score > 0,
      };
    });
    
    // Sort by date (newest first)
    enrichedProgress.sort((a, b) => 
      new Date(b.completedAt) - new Date(a.completedAt)
    );
    
    setArtProgress(enrichedProgress);
  }, [allProgress, lessons, students]);

  // Load image when progress is selected
  useEffect(() => {
    if (selectedProgress && selectedProgress.imagePath) {
      loadImage(selectedProgress.imagePath);
    } else {
      setLoadedImage(null);
    }
  }, [selectedProgress]);

  const loadImage = async (filePath) => {
    if (window.electronAPI && window.electronAPI.loadDrawing) {
      try {
        const result = await window.electronAPI.loadDrawing(filePath);
        if (result.success) {
          setLoadedImage(result.imageData);
        } else {
          console.error('Failed to load image:', result.error);
          setLoadedImage(null);
        }
      } catch (error) {
        console.error('Error loading image:', error);
        setLoadedImage(null);
      }
    } else {
      // Fallback for non-Electron or localStorage
      const stored = localStorage.getItem(`drawing_${selectedProgress.activityId}_${selectedProgress.studentId}`);
      setLoadedImage(stored);
    }
  };

  const handleGrade = async (gradeTier) => {
    if (!selectedProgress) return;

    // Update progress with grade and mark as completed
    const updatedProgress = new Progress({
      ...selectedProgress,
      score: gradeTier.score,
      isCompleted: true,
    });

    await addProgress(updatedProgress);
    await saveData();
    
    // Update local state
    setArtProgress(prev => prev.map(p => 
      p.id === selectedProgress.id 
        ? { ...p, score: gradeTier.score, isGraded: true }
        : p
    ));
    
    // Update selected progress
    setSelectedProgress({ ...selectedProgress, score: gradeTier.score, isGraded: true });
    
    alert(`Graded as ${gradeTier.name}! ✨`);
  };

  // Filter progress
  const filteredProgress = artProgress.filter(p => {
    if (filterStudent !== 'all' && p.studentId !== parseInt(filterStudent)) {
      return false;
    }
    if (filterGraded === 'graded' && !p.isGraded) {
      return false;
    }
    if (filterGraded === 'ungraded' && p.isGraded) {
      return false;
    }
    return true;
  });

  const getGradeInfo = (score) => {
    if (score === 0) return { name: 'Not Graded', color: '#9E9E9E', icon: '⏳' };
    if (score >= GRADE_TIERS.PLATINUM.score) return GRADE_TIERS.PLATINUM;
    if (score >= GRADE_TIERS.GOLD.score) return GRADE_TIERS.GOLD;
    if (score >= GRADE_TIERS.SILVER.score) return GRADE_TIERS.SILVER;
    if (score >= GRADE_TIERS.BRONZE.score) return GRADE_TIERS.BRONZE;
    return { name: 'Graded', color: '#9E9E9E', icon: '✓' };
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1400px',
      margin: '0 auto',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#333',
          margin: 0,
        }}>
          🎨 Art Grading Center
        </h1>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '12px 24px',
            fontSize: '1rem',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          ← Back Home
        </button>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex',
        gap: '15px',
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
      }}>
        <div>
          <label style={{ fontWeight: 'bold', marginRight: '8px' }}>Student:</label>
          <select
            value={filterStudent}
            onChange={(e) => setFilterStudent(e.target.value)}
            style={{
              padding: '8px 12px',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '1px solid #ddd',
            }}
          >
            <option value="all">All Students</option>
            {students.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ fontWeight: 'bold', marginRight: '8px' }}>Status:</label>
          <select
            value={filterGraded}
            onChange={(e) => setFilterGraded(e.target.value)}
            style={{
              padding: '8px 12px',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '1px solid #ddd',
            }}
          >
            <option value="all">All</option>
            <option value="ungraded">Ungraded</option>
            <option value="graded">Graded</option>
          </select>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '1.1rem', fontWeight: 'bold' }}>
          Total: {filteredProgress.length} drawing{filteredProgress.length !== 1 ? 's' : ''}
        </div>
      </div>

      {filteredProgress.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
        }}>
          <h2 style={{ color: '#6c757d' }}>No art submissions yet</h2>
          <p>Students' drawings will appear here after they complete art lessons.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: selectedProgress ? '400px 1fr' : '1fr',
          gap: '20px',
        }}>
          {/* Drawing List */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            maxHeight: '800px',
            overflowY: 'auto',
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Submissions</h3>
            {filteredProgress.map(p => {
              const grade = getGradeInfo(p.score);
              const isSelected = selectedProgress?.id === p.id;
              
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProgress(p)}
                  style={{
                    padding: '15px',
                    marginBottom: '10px',
                    backgroundColor: isSelected ? '#e3f2fd' : '#f8f9fa',
                    border: isSelected ? '3px solid #2196F3' : '2px solid #dee2e6',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = '#e9ecef';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}>
                    <strong style={{ fontSize: '1.1rem' }}>{p.studentName}</strong>
                    <span style={{
                      fontSize: '1.5rem',
                      marginLeft: '8px',
                    }}>
                      {grade.icon}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.95rem', color: '#666', marginBottom: '5px' }}>
                    {p.lessonTitle}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#999' }}>
                    {new Date(p.completedAt).toLocaleDateString()} {new Date(p.completedAt).toLocaleTimeString()}
                  </div>
                  {p.isGraded && (
                    <div style={{
                      marginTop: '8px',
                      padding: '4px 8px',
                      backgroundColor: grade.color,
                      color: '#333',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      display: 'inline-block',
                    }}>
                      {grade.name} ({p.score}%)
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Grading Panel */}
          {selectedProgress && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}>
                <div>
                  <h2 style={{ margin: '0 0 5px 0' }}>{selectedProgress.studentName}'s Drawing</h2>
                  <p style={{ margin: 0, color: '#666' }}>{selectedProgress.lessonTitle}</p>
                </div>
                <button
                  onClick={() => setSelectedProgress(null)}
                  style={{
                    padding: '8px 16px',
                    fontSize: '1rem',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Drawing Display */}
              <div style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px',
              }}>
                {loadedImage ? (
                  <img
                    src={loadedImage}
                    alt="Student drawing"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '500px',
                      border: '3px solid #ddd',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                  />
                ) : (
                  <div style={{ textAlign: 'center', color: '#999' }}>
                    Loading drawing...
                  </div>
                )}
              </div>

              {/* Grading Buttons */}
              <div style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
              }}>
                <h3 style={{ marginTop: 0, marginBottom: '15px', textAlign: 'center' }}>
                  Grade this Drawing
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '15px',
                }}>
                  {Object.values(GRADE_TIERS).map(tier => (
                    <button
                      key={tier.name}
                      onClick={() => handleGrade(tier)}
                      style={{
                        padding: '20px',
                        fontSize: '1.1rem',
                        backgroundColor: tier.color,
                        color: '#333',
                        border: selectedProgress.score === tier.score ? '4px solid #000' : '2px solid #999',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'transform 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <span style={{ fontSize: '2rem' }}>{tier.icon}</span>
                      <span>{tier.name}</span>
                      <span style={{ fontSize: '0.9rem' }}>({tier.score}%)</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ArtGradingScreen;

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import MarkdownWithYouTube from '../components/MarkdownWithYouTube';
import ClickingGame from '../components/ClickingGame';
import KeyboardGame from '../components/KeyboardGame';
import DrawingGame from '../components/DrawingGame';
import BlocklyEmbed from '../components/BlocklyEmbed';
import InfoButton from '../components/InfoButton';
import { Progress } from '../models/Progress';

function LessonViewScreen() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = useDataStore(state => state.getLesson(parseInt(lessonId)));
  const trackLessonAccess = useDataStore(state => state.trackLessonAccess);
  const getUserId = useDataStore(state => state.getUserId);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const addProgress = useDataStore(state => state.addProgress);
  const saveData = useDataStore(state => state.saveData);
  const getNextLessonAfter = useDataStore(state => state.getNextLessonAfter);
  
  // Track question answers for interactive lessons
  const [questionAnswers, setQuestionAnswers] = useState(new Map());
  const [hasIncorrectAnswer, setHasIncorrectAnswer] = useState(false);
  
  // Extract total number of questions from lesson content
  const getTotalQuestions = useCallback(() => {
    if (!lesson || !lesson.content) return 0;
    const questionRegex = /<!-- QUESTION_START -->/g;
    const matches = lesson.content.match(questionRegex);
    return matches ? matches.length : 0;
  }, [lesson]);
  
  const totalQuestions = getTotalQuestions();
  const isInteractiveLesson = lesson && lesson.assessmentType === 'interactive' && totalQuestions > 0;
  
  // Track lesson access when component mounts
  useEffect(() => {
    if (lesson) {
      trackLessonAccess(lesson);
    }
    // Reset question tracking when lesson changes
    setQuestionAnswers(new Map());
    setHasIncorrectAnswer(false);
  }, [lesson, trackLessonAccess, lessonId]);
  
  // Handle question answer
  const handleQuestionAnswer = useCallback((questionId, isCorrect) => {
    setQuestionAnswers(prev => {
      const newMap = new Map(prev);
      newMap.set(questionId, isCorrect);
      return newMap;
    });
    
    if (!isCorrect) {
      setHasIncorrectAnswer(true);
    }
  }, []);
  
  // Check if all questions are answered correctly
  const allQuestionsCorrect = isInteractiveLesson && 
    questionAnswers.size === totalQuestions &&
    Array.from(questionAnswers.values()).every(answer => answer === true) &&
    !hasIncorrectAnswer;
  
  // Handle lesson completion
  const handleCompleteLesson = async () => {
    if (!lesson || !allQuestionsCorrect) return;
    
    try {
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
        score: 100, // Perfect score since all questions were correct
      });
      await addProgress(progress);
      await saveData();
      
      // Navigate to next lesson or back to subject
      const nextLesson = getNextLessonAfter(lesson);
      if (nextLesson && nextLesson.id) {
        navigate(`/lesson/${nextLesson.id}`);
      } else if (lesson.subjectId) {
        navigate(`/lessons?subjectId=${lesson.subjectId}`);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };
  
  // Handle lesson restart
  const handleRestartLesson = () => {
    // Reload the page to reset all question states
    window.location.reload();
  };
  
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
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      width: '100%',
      overflow: 'hidden',
      minHeight: 0,
      alignItems: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
      }}>
      {/* Header */}
      <div style={{
        flexShrink: 0,
        marginBottom: '20px',
        paddingBottom: '15px',
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
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ClickingGame lesson={lesson} />
        </div>
      ) : lesson.title === 'Keyboard Game' || lesson.title === 'WASD Game' || lesson.title === 'A-Z Game' || lesson.title === 'Numbers Game' || lesson.title === 'Symbols Game' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <KeyboardGame lesson={lesson} />
        </div>
      ) : lesson.title === 'Digital Drawing' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <DrawingGame lesson={lesson} />
        </div>
      ) : lesson.title?.startsWith('Blockly') ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Info button with instructions */}
          <InfoButton content={lesson.content} title={lesson.title} />
          
          {/* Blockly game - takes full space */}
          <div style={{ 
            flex: 1,
            minHeight: 0,
            padding: '20px 30px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {(() => {
              // Map lesson titles to their HTML file paths
              const blocklyGameMap = {
                'Blockly Puzzle': '/blockly-games/en/puzzle.html',
                'Blockly Maze': '/blockly-games/en/maze.html',
                'Blockly Bird': '/blockly-games/en/bird.html',
                'Blockly Turtle': '/blockly-games/en/turtle.html',
                'Blockly Movie': '/blockly-games/en/movie.html',
                'Blockly Pond Tutor': '/blockly-games/en/pond-tutor.html',
                'Blockly Pond': '/blockly-games/en/pond-duck.html',
              };
              const gameUrl = blocklyGameMap[lesson.title] || '/blockly-games/en/puzzle.html';
              return <BlocklyEmbed url={gameUrl} height="100%" isLocal={true} />;
            })()}
          </div>
        </div>
      ) : (
        <div style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}>
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '30px',
            lineHeight: '1.6',
          }}>
            <MarkdownWithYouTube 
              content={lesson.content} 
              onQuestionAnswer={isInteractiveLesson ? handleQuestionAnswer : undefined}
            />
          </div>
          
          {/* Interactive Lesson Completion Status */}
          {isInteractiveLesson && (
            <div style={{
              flexShrink: 0,
              padding: '20px 30px',
              borderTop: '2px solid #e0e0e0',
              backgroundColor: '#f8f9fa',
            }}>
              {hasIncorrectAnswer ? (
                <div style={{
                  padding: '15px',
                  backgroundColor: '#fff3cd',
                  border: '2px solid #ffc107',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#856404',
                    marginBottom: '10px',
                  }}>
                    ⚠️ Some questions were answered incorrectly
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#856404',
                    marginBottom: '15px',
                  }}>
                    You must restart the lesson to try again. All questions must be answered correctly to complete the lesson.
                  </div>
                  <button
                    onClick={handleRestartLesson}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#ffc107',
                      color: '#856404',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                    }}
                  >
                    Restart Lesson
                  </button>
                </div>
              ) : questionAnswers.size < totalQuestions ? (
                <div style={{
                  padding: '15px',
                  backgroundColor: '#e7f3ff',
                  border: '2px solid #007bff',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '14px',
                  color: '#004085',
                }}>
                  Answer all {totalQuestions} questions correctly to complete this lesson.
                  <br />
                  <span style={{ fontSize: '12px', marginTop: '5px', display: 'block' }}>
                    Progress: {questionAnswers.size} / {totalQuestions} answered
                  </span>
                </div>
              ) : allQuestionsCorrect ? (
                <div style={{
                  padding: '15px',
                  backgroundColor: '#d4edda',
                  border: '2px solid #28a745',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#155724',
                    marginBottom: '10px',
                  }}>
                    ✓ All questions answered correctly!
                  </div>
                  <button
                    onClick={handleCompleteLesson}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                    }}
                  >
                    Complete Lesson →
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}

      {/* Quiz Button */}
      {lesson.quizId && (
        <div style={{
          flexShrink: 0,
          marginTop: '20px',
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
    </div>
  );
}

export default LessonViewScreen;


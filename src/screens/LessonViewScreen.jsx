import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import MarkdownWithYouTube from '../components/MarkdownWithYouTube';
import ClickingGame from '../components/ClickingGame';
import KeyboardGame from '../components/KeyboardGame';
import DrawingGame from '../components/DrawingGame';
import BlocklyEmbed from '../components/BlocklyEmbed';
import SVGCodeEditor from '../components/SVGCodeEditor';
import PythonCodeEditor from '../components/PythonCodeEditor';
import ArduinoCodeEditor from '../components/ArduinoCodeEditor';
import PhonicsLesson from '../components/PhonicsLesson';
import MathGame from '../components/MathGame';
import InfoButton from '../components/InfoButton';
import EdgeBounceHelpButton from '../components/EdgeBounceHelpButton';
import FlappyBirdGame from '../components/FlappyBirdGame';
import BubblePopGame from '../components/BubblePopGame';
import SnakeGame from '../components/SnakeGame';
import TargetPracticeGame from '../components/TargetPracticeGame';
import TapTapTapGame from '../components/TapTapTapGame';
import SubtractionDragGame from '../components/SubtractionDragGame';
import ShapePatternGame from '../components/ShapePatternGame';
import MoneyDragGame from '../components/MoneyDragGame';
import ClockGame from '../components/ClockGame';
import PlaceValueGame from '../components/PlaceValueGame';
import TypingMathGame from '../components/TypingMathGame';
import NumberLineGame from '../components/NumberLineGame';
import ShapeMatchingGame from '../components/ShapeMatchingGame';
import GraphBuilderGame from '../components/GraphBuilderGame';
import CoordinateGame from '../components/CoordinateGame';
import AngleGame from '../components/AngleGame';
import HistoryGame from '../components/HistoryGame';
import DinosaurGame from '../components/DinosaurGame';
import AdamEveGame from '../components/AdamEveGame';
import HTMLGameEmbed from '../components/HTMLGameEmbed';
import DrawingCanvas from '../components/DrawingCanvas';
import { Progress } from '../models/Progress';
import { Year } from '../models/Year';

// Error Boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // Suppress dragEvent errors from Blockly games
    if (error && error.message && error.message.includes('dragEvent is not defined')) {
      this.setState({ hasError: false });
      return;
    }
  }

  render() {
    if (this.state.hasError) {
      // Suppress dragEvent errors
      if (this.state.error && this.state.error.message && this.state.error.message.includes('dragEvent is not defined')) {
        return this.props.children;
      }
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2 style={{ color: '#dc3545' }}>Something went wrong</h2>
          <p>Please try refreshing the page.</p>
          {this.state.error && (
            <div style={{ 
              marginTop: '20px', 
              padding: '15px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '4px',
              textAlign: 'left',
              maxWidth: '600px',
              margin: '20px auto 0',
              fontSize: '12px',
              fontFamily: 'monospace',
              overflow: 'auto',
              maxHeight: '200px'
            }}>
              <strong>Error:</strong> {this.state.error.message || String(this.state.error)}
              {this.state.error.stack && (
                <details style={{ marginTop: '10px' }}>
                  <summary style={{ cursor: 'pointer', color: '#666' }}>Stack trace</summary>
                  <pre style={{ marginTop: '10px', fontSize: '10px', overflow: 'auto' }}>
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

function LessonViewScreen() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  // Use stable selectors to prevent unnecessary re-renders
  const lesson = useDataStore(useCallback(state => state.getLesson(parseInt(lessonId)), [lessonId]));
  const trackLessonAccess = useDataStore(useCallback(state => state.trackLessonAccess, []));
  const getUserId = useDataStore(useCallback(state => state.getUserId, []));
  const getNextProgressId = useDataStore(useCallback(state => state.getNextProgressId, []));
  const addProgress = useDataStore(useCallback(state => state.addProgress, []));
  const saveData = useDataStore(useCallback(state => state.saveData, []));
  const getNextLessonAfter = useDataStore(useCallback(state => state.getNextLessonAfter, []));
  const hasGoldOrPlatinum = useDataStore(useCallback(state => state.hasGoldOrPlatinum, []));
  
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
  
  // Check if this is a technology game and if student has gold/platinum
  const isTechnologyGame = lesson && lesson.subjectId === 'technology' && (
    lesson.title === 'Clicking Game' ||
    lesson.title === 'Keyboard Game' ||
    lesson.title === 'WASD Game' ||
    lesson.title === 'A-Z Game' ||
    lesson.title === 'Numbers Game' ||
    lesson.title === 'Symbols Game' ||
    lesson.title === 'Flappy Bird Game' ||
    lesson.title === 'Bubble Pop Game' ||
    lesson.title === 'Snake Game' ||
    lesson.title === 'Target Practice Game' ||
    lesson.title?.includes('TapTapTap')
  );
  const hasGoldOrPlatinumForLesson = lesson && isTechnologyGame && hasGoldOrPlatinum(lesson.id);
  
  // Track lesson access when component mounts (only once per lessonId)
  const hasTrackedRef = React.useRef(null);
  useEffect(() => {
    // Only track if this is a new lesson (prevents re-tracking on every store update)
    if (lesson && hasTrackedRef.current !== lessonId) {
      hasTrackedRef.current = lessonId;
      trackLessonAccess(lesson);
    }
    // Reset question tracking when lesson changes
    setQuestionAnswers(new Map());
    setHasIncorrectAnswer(false);
  }, [lessonId]); // Only depend on lessonId, not lesson or trackLessonAccess
  
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
              {Year.getById(lesson.yearId)?.name || lesson.yearId}
            </p>
          </div>
        </div>
      </div>

      {/* Lesson Content with YouTube Embeds or Special Components */}
      {hasGoldOrPlatinumForLesson ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '64px',
            marginBottom: '20px',
          }}>
            🏆
          </div>
          <h2 style={{
            fontSize: '28px',
            color: '#333',
            marginBottom: '15px',
          }}>
            Excellent Work!
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#666',
            marginBottom: '10px',
            maxWidth: '600px',
            lineHeight: '1.6',
          }}>
            You've already achieved a <strong style={{ color: '#FFD700' }}>Gold</strong> or <strong style={{ color: '#E5E4E2' }}>Platinum</strong> medal on this game!
          </p>
          <p style={{
            fontSize: '16px',
            color: '#888',
            marginTop: '20px',
            maxWidth: '600px',
            lineHeight: '1.6',
          }}>
            Great job! You've mastered this game. Please continue with other lessons to keep learning.
          </p>
          <button
            onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)}
            style={{
              marginTop: '30px',
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
            Back to Lessons
          </button>
        </div>
      ) : lesson.title === 'Clicking Game' ? (
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
      ) : lesson.title === 'Flappy Bird Game' ? (
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
          <FlappyBirdGame lesson={lesson} />
        </div>
      ) : lesson.title === 'Bubble Pop Game' ? (
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
          <BubblePopGame lesson={lesson} />
        </div>
      ) : lesson.title === 'Snake Game' ? (
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
          <SnakeGame lesson={lesson} />
        </div>
      ) : lesson.title === 'Target Practice Game' ? (
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
          <TargetPracticeGame lesson={lesson} />
        </div>
      ) : lesson.title?.includes('TapTapTap') ? (
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
          <TapTapTapGame lesson={lesson} />
        </div>
      ) : lesson.title?.startsWith('HTML Programming: SVG Graphics') ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <SVGCodeEditor lesson={lesson} />
        </div>
      ) : lesson.title?.startsWith('Python Lesson') || (lesson.subjectId === 'technology' && lesson.categoryId === 'python') ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <PythonCodeEditor lesson={lesson} />
        </div>
      ) : lesson.title?.startsWith('Arduino Lesson') || (lesson.subjectId === 'technology' && lesson.title?.includes('Arduino')) ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ArduinoCodeEditor lesson={lesson} />
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
          
          {/* Edge Bounce Help button for Blockly Pond Tutor (uses blocks) */}
          {(lesson.title === 'Blockly Pond Tutor' || lesson.title === 'Blockly Pond') && <EdgeBounceHelpButton />}
          
          {/* Blockly game - takes full space */}
          <div style={{ 
            flex: 1,
            minHeight: 0,
            padding: '10px 15px',
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
      ) : lesson.assessmentType === 'phonics' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <PhonicsLesson lesson={lesson} />
        </div>
      ) : lesson.title === 'Subtraction Stories' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <SubtractionDragGame lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.title === 'Shapes and Patterns' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <ShapePatternGame lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.title === 'Money Math' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <MoneyDragGame lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.assessmentType === 'maths-game' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <MathGame lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.title === 'Time and Clocks' || lesson.title.includes("Time:") ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <ClockGame lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.assessmentType === 'place-value-game' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <PlaceValueGame lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.assessmentType === 'typing-math-game' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <TypingMathGame lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.assessmentType === 'number-line-game' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <NumberLineGame lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.assessmentType === 'shape-matching-game' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <ShapeMatchingGame lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.assessmentType === 'graph-builder-game' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <GraphBuilderGame lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.assessmentType === 'coordinate-game' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <CoordinateGame lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.assessmentType === 'angle-game' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <AngleGame lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.title === 'Money: Coins to £1' || lesson.title === 'Money: Pounds and Pence' || lesson.title.includes('Money:') ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <MoneyDragGame lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.title === 'Dinosaurs - Big and Small' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <HTMLGameEmbed url="/html-games/dinosaur-sorting.html" height="100%" lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.title === "Noah's Ark - A Big Boat" ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <HTMLGameEmbed url="/html-games/noahs-ark.html" height="100%" lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.title === 'Life Long Ago' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <HTMLGameEmbed url="/html-games/life-long-ago.html" height="100%" lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.title === 'Life Long Ago vs. Life Now' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <HTMLGameEmbed url="/html-games/life-long-ago-vs-life-now.html" height="100%" lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.title === 'Ancient Stories - The First Cities' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <HTMLGameEmbed url="/html-games/ancient-stories.html" height="100%" lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.title === 'Dinosaurs - The First Animals' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <DinosaurGame lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.title === 'Adam and Eve - The First People' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <AdamEveGame lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.subjectId === 'art' && lesson.assessmentType === 'drawing' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <DrawingCanvas lesson={lesson} prompt={lesson.drawingPrompt || lesson.title} />
          </ErrorBoundary>
        </div>
      ) : lesson.title === 'Dinosaurs - When They Lived' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <HTMLGameEmbed url="/html-games/dinosaurs-when-they-lived.html" height="100%" lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.title === 'Days of the Week' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <HTMLGameEmbed url="/html-games/days.html" height="100%" lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.title === 'Ancient Egypt - Pyramids and Pharaohs' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <HTMLGameEmbed url="/html-games/ancient-egypt-pyramids-pharaohs.html" height="100%" lesson={lesson} />
          </ErrorBoundary>
        </div>
      ) : lesson.assessmentType === 'history-game' ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ErrorBoundary>
            <HistoryGame lesson={lesson} />
          </ErrorBoundary>
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
      </div>
    </div>
  );
}

export default LessonViewScreen;


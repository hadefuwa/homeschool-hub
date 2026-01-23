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
import LetterALesson from '../components/LetterALesson';
import LetterBLesson from '../components/LetterBLesson';
import LetterCLesson from '../components/LetterCLesson';
import LetterDLesson from '../components/LetterDLesson';
import LetterELesson from '../components/LetterELesson';
import LetterFLesson from '../components/LetterFLesson';
import LetterGLesson from '../components/LetterGLesson';
import LetterHLesson from '../components/LetterHLesson';
import LetterILesson from '../components/LetterILesson';
import LetterJLesson from '../components/LetterJLesson';
import LetterKLesson from '../components/LetterKLesson';
import LetterLLesson from '../components/LetterLLesson';
import LetterMLesson from '../components/LetterMLesson';
import LetterNLesson from '../components/LetterNLesson';
import LetterOLesson from '../components/LetterOLesson';
import LetterPLesson from '../components/LetterPLesson';
import LetterQLesson from '../components/LetterQLesson';
import LetterRLesson from '../components/LetterRLesson';
import LetterSLesson from '../components/LetterSLesson';
import LetterTLesson from '../components/LetterTLesson';
import LetterULesson from '../components/LetterULesson';
import LetterVLesson from '../components/LetterVLesson';
import LetterWLesson from '../components/LetterWLesson';
import LetterXLesson from '../components/LetterXLesson';
import LetterYLesson from '../components/LetterYLesson';
import LetterZLesson from '../components/LetterZLesson';
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
import CapacityFillGame from '../components/CapacityFillGame';
import CoordinateGame from '../components/CoordinateGame';
import AngleGame from '../components/AngleGame';
import HistoryGame from '../components/HistoryGame';
import LocalHistoryGame from '../components/LocalHistoryGame';
import ProphetJourneyGame from '../components/ProphetJourneyGame';
import PrehistoricBritainGame from '../components/PrehistoricBritainGame';
import AncientGreeceGame from '../components/AncientGreeceGame';
import AncientRomeGame from '../components/AncientRomeGame';
import RomanDailyLifeGame from '../components/RomanDailyLifeGame';
import FallOfRomeGame from '../components/FallOfRomeGame';
import DarkAgesGame from '../components/DarkAgesGame';
import MedievalCastleGame from '../components/MedievalCastleGame';
import MedievalDailyLifeGame from '../components/MedievalDailyLifeGame';
import CrusadesGame from '../components/CrusadesGame';
import ExplorationGame from '../components/ExplorationGame';
import DinosaurGame from '../components/DinosaurGame';
import AdamEveGame from '../components/AdamEveGame';
import GeneticsGame from '../components/GeneticsGame';
import RenaissanceGame from '../components/RenaissanceGame';
import BetweenWarsGame from '../components/BetweenWarsGame';
import WorldWar2Game from '../components/WorldWar2Game';
import CivilRightsGame from '../components/CivilRightsGame';
import ColdWarGame from '../components/ColdWarGame';
import MakingHistoryGame from '../components/MakingHistoryGame';
import HistoricalChangeGame from '../components/HistoricalChangeGame';
import HTMLGameEmbed from '../components/HTMLGameEmbed';
import DrawingCanvas from '../components/DrawingCanvas';
import ColoringGame from '../components/ColoringGame';
import PhonicsGame from '../components/PhonicsGame';
import SentenceScrambleGame from '../components/SentenceScrambleGame';
import MissingVowelGame from '../components/MissingVowelGame';
import VowelSoundGame from '../components/VowelSoundGame';
import SightWordGame from '../components/SightWordGame';
import CompoundWordGame from '../components/CompoundWordGame';
import ContractionGame from '../components/ContractionGame';
import FigurativeLanguageGame from '../components/FigurativeLanguageGame';
import PartsOfSpeechGame from '../components/PartsOfSpeechGame';
import SynonymsAntonymsGame from '../components/SynonymsAntonymsGame';
import SentenceBuildingGame from '../components/SentenceBuildingGame';
import ReadingComprehensionGame from '../components/ReadingComprehensionGame';
import CreativeWritingGame from '../components/CreativeWritingGame';
import SpellingGame from '../components/SpellingGame';
import PrefixSuffixGame from '../components/PrefixSuffixGame';
import { Progress } from '../models/Progress';
import { Year } from '../models/Year';

const mathGameAssessmentTypes = new Set([
  'tap-to-count-game',
  'number-bonds-game',
  'compare-quantities-game',
  'pattern-builder-game',
  'position-direction-game',
  'measurement-compare-game',
  'time-sequence-game',
  'skip-counting-game',
  'fraction-match-game',
  'column-method-game',
  'times-table-game',
  'division-sharing-game',
  'fraction-line-game',
  'perimeter-trace-game',
  'rounding-game',
  'factors-multiples-game',
  'decimal-match-game',
  'area-tiling-game',
  'decimal-place-game',
  'fraction-add-game',
  'percentage-shade-game',
  'prime-sort-game',
  'unit-conversion-game',
  'algebra-balance-game',
  'ratio-mix-game',
  'proportion-scale-game',
  'percentage-change-game',
  'fdp-tri-match-game',
  'area-cut-fit-game',
  'volume-cuboid-game',
  'nets-fold-game',
  'stats-averages-game',
  'scale-grid-game',
  'symmetry-mirror-game',
  'volume-fill-game',
]);

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
  const getNextLessonUrl = useDataStore(useCallback(state => state.getNextLessonUrl, []));
  const disableStudyMode = useDataStore(useCallback(state => state.disableStudyMode, []));

  // Track question answers for interactive lessons
  const [questionAnswers, setQuestionAnswers] = useState(new Map());
  const [hasIncorrectAnswer, setHasIncorrectAnswer] = useState(false);

  // Track if user wants to play anyway (bypass gold/platinum block)
  const [playAnyway, setPlayAnyway] = useState(false);

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
    lesson.assessmentType === 'clicking-game' ||
    lesson.assessmentType === 'keyboard-game' ||
    lesson.assessmentType === 'wasd-game' ||
    lesson.assessmentType === 'a-z-game' ||
    lesson.assessmentType === 'numbers-game' ||
    lesson.assessmentType === 'symbols-game' ||
    lesson.assessmentType === 'flappy-bird-game' ||
    lesson.assessmentType === 'bubble-pop-game' ||
    lesson.assessmentType === 'snake-game' ||
    lesson.assessmentType === 'target-practice-game' ||
    lesson.title?.includes('TapTapTap') ||
    lesson.assessmentType === 'taptaptap-game'
  );
  const hasGoldOrPlatinumForLesson = lesson && isTechnologyGame && hasGoldOrPlatinum(lesson.id) && !playAnyway;

  // Track lesson access when component mounts (only once per lessonId)
  const hasTrackedRef = React.useRef(null);
  useEffect(() => {
    // Only track if this is a new lesson (prevents re-tracking on every store update)
    if (lesson && hasTrackedRef.current !== lessonId) {
      hasTrackedRef.current = lessonId;
      trackLessonAccess(lesson);
    }
    // Reset states when lesson changes
    setQuestionAnswers(new Map());
    setHasIncorrectAnswer(false);
    setPlayAnyway(false);
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

      // Navigate to next lesson (handles both Study Mode and normal mode)
      const { url, shouldDisableStudyMode } = getNextLessonUrl(lesson);
      if (shouldDisableStudyMode) {
        disableStudyMode();
      }
      navigate(url);
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
            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)}
                style={{
                  marginTop: '30px',
                  padding: '12px 24px',
                  backgroundColor: '#6c757d',
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
              <button
                onClick={() => setPlayAnyway(true)}
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
                Play Anyway
              </button>
            </div>
          </div>
        ) : lesson.assessmentType === 'clicking-game' ? (
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
        ) : lesson.assessmentType === 'keyboard-game' || lesson.assessmentType === 'wasd-game' || lesson.assessmentType === 'a-z-game' || lesson.assessmentType === 'numbers-game' || lesson.assessmentType === 'symbols-game' ? (
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
        ) : lesson.assessmentType === 'flappy-bird-game' ? (
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
        ) : lesson.assessmentType === 'bubble-pop-game' ? (
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
        ) : lesson.assessmentType === 'snake-game' ? (
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
        ) : lesson.assessmentType === 'target-practice-game' ? (
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
        ) : lesson.assessmentType === 'letter-a-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterALesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-b-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterBLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-c-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterCLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-d-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterDLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-e-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterELesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-f-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterFLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-g-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterGLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-h-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterHLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-i-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterILesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-j-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterJLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-k-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterKLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-l-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterLLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-m-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterMLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-n-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterNLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-o-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterOLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-p-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterPLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-q-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterQLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-r-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterRLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-s-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterSLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-t-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterTLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-u-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterULesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-v-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterVLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-w-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterWLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-x-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterXLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-y-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterYLesson lesson={lesson} />
          </div>
        ) : lesson.assessmentType === 'letter-z-video-quiz' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'auto',
          }}>
            <LetterZLesson lesson={lesson} />
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
        ) : lesson.title === 'Shapes and Patterns' || lesson.assessmentType === 'pattern-builder-game' ? (
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
        ) : lesson.title === 'Money Math' || lesson.assessmentType === 'money-drag-game' || lesson.assessmentType === 'money-shop-game' || lesson.assessmentType === 'coin-match-game' ? (
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
        ) : lesson.assessmentType === 'maths-game' || (lesson.subjectId === 'maths' && mathGameAssessmentTypes.has(lesson.assessmentType)) ? (
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
        ) : lesson.assessmentType === 'coloring-game' ? (
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
              <ColoringGame lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.assessmentType === 'renaissance-game' ? (
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
              <RenaissanceGame lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.title === 'Time and Clocks' || lesson.title.includes("Time:") || lesson.assessmentType === 'clock-game' || lesson.assessmentType === 'time-minute-game' || lesson.assessmentType === 'time-conversion-game' ? (
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
            {/* Info button with instructions */}
            <InfoButton content={lesson.content} title={lesson.title} />
            
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
        ) : lesson.assessmentType === 'shape-matching-game' || lesson.assessmentType === 'shape-sorting-game' || lesson.assessmentType === 'nets-fold-game' ? (
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
        ) : lesson.assessmentType === 'graph-builder-game' || lesson.assessmentType === 'bar-chart-game' || lesson.assessmentType === 'line-graph-game' ? (
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
        ) : lesson.assessmentType === 'capacity-fill-game' ? (
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
              <CapacityFillGame lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.assessmentType === 'coordinate-game' || lesson.assessmentType === 'coordinate-plot-game' ? (
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
        ) : lesson.assessmentType === 'angle-game' || lesson.assessmentType === 'angle-rotate-game' || lesson.assessmentType === 'angle-builder-game' ? (
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
        ) : lesson.title === 'Famous People from History' ? (
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
              <HTMLGameEmbed url="/html-games/famous-people-from-history.html" height="100%" lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.title === 'Place Value to 100' ? (
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
              <HTMLGameEmbed url="/html-games/place_value_100.html" height="100%" lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.assessmentType?.startsWith('fractions-pizza-') ? (
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
              <HTMLGameEmbed 
                url={`/html-games/fractions.html?level=${lesson.assessmentType.replace('fractions-pizza-', '')}`} 
                height="100%" 
                lesson={lesson} 
              />
            </ErrorBoundary>
          </div>
        ) : lesson.title === 'Ancient Mesopotamia - The First Civilization' ? (
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
              <HTMLGameEmbed url="/html-games/ancient-mesopotamia.html" height="100%" lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.title === 'Comparing Ancient Civilizations' ? (
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
              <HTMLGameEmbed url="/html-games/comparing-civilizations.html" height="100%" lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.title === 'Religious History - Kings and Prophets' ? (
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
              <HTMLGameEmbed url="/html-games/kings-and-prophets.html" height="100%" lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.title === 'Ancient Greece - Daily Life' ? (
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
              <HTMLGameEmbed url="/html-games/ancient-greece-daily-life.html" height="100%" lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.title === 'Ancient Rome - Daily Life' ? (
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
              <HTMLGameEmbed url="/html-games/ancient-rome-daily-life.html" height="100%" lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.assessmentType === 'dark-ages-game' ? (
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
              <DarkAgesGame lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.assessmentType === 'medieval-daily-life-game' ? (
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
              <MedievalDailyLifeGame lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.assessmentType === 'exploration-game' ? (
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
              <ExplorationGame lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.assessmentType === 'renaissance-game' ? (
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
              <RenaissanceGame lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.assessmentType === 'between-wars-game' ? (
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
              <HTMLGameEmbed url="/html-games/between-the-wars.html" height="100%" lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.assessmentType === 'world-war-2-game' ? (
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
              <WorldWar2Game lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.assessmentType === 'civil-rights-game' ? (
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
              <CivilRightsGame lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.assessmentType === 'cold-war-game' ? (
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
              <ColdWarGame lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.assessmentType === 'making-history-game' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            maxWidth: '100%',
            width: '100%',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}>
            <ErrorBoundary>
              <MakingHistoryGame lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.assessmentType === 'modern-world-1960s-1990s-game' ? (
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
              <HTMLGameEmbed url="/html-games/modern-world-1960s-1990s.html" height="100%" lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.assessmentType === 'modern-world-2000s-today-game' ? (
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
              <HTMLGameEmbed url="/html-games/modern-world-2000s-today.html" height="100%" lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.assessmentType === 'historical-change-game' ? (
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
              <HistoricalChangeGame lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.assessmentType === 'historical-sources-evidence-game' ? (
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
              <HTMLGameEmbed url="/html-games/historical-sources-evidence.html" height="100%" lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.assessmentType === 'crusades-game' ? (
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
              <CrusadesGame lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.assessmentType === 'world-war-i-game' ? (
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
              <HTMLGameEmbed url="/html-games/world-war-i.html" height="100%" lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.assessmentType === 'adam-eve-game' ? (
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
        ) : lesson.assessmentType === 'genetics-game' ? (
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
              <GeneticsGame lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.title === 'Biblical History - Jesus and Early Christianity' ? (
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
              <HTMLGameEmbed url="/html-games/jesus-and-early-christianity.html" height="100%" lesson={lesson} />
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
        ) : lesson.title === 'Genetics and Family Trees - The First Families' ? (
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
              <GeneticsGame lesson={lesson} />
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
        ) : lesson.title === 'Prehistoric Times - Before Writing' ? (
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
              <HTMLGameEmbed url="/html-games/prehistoric-times.html" height="100%" lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.title === 'Ancient Egypt - Daily Life' ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            maxWidth: '100%',
            width: '100%',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}>
            <ErrorBoundary>
              <HTMLGameEmbed url="/html-games/ancient-egypt-daily-life.html" height="100%" lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) : lesson.title === 'Ancient China - The Great Wall' ? (
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
              <HTMLGameEmbed url="/html-games/ancient-china-great-wall.html" height="100%" lesson={lesson} />
            </ErrorBoundary>
          </div>
        ) :
          lesson.assessmentType === 'prophet-journey-game' ? (
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
                <ProphetJourneyGame lesson={lesson} />
              </ErrorBoundary>
            </div>
          ) : lesson.assessmentType === 'roman-daily-life-game' ? (
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
                <RomanDailyLifeGame lesson={lesson} />
              </ErrorBoundary>
            </div>
          ) : lesson.assessmentType === 'fall-of-rome-game' ? (
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
                <FallOfRomeGame lesson={lesson} />
              </ErrorBoundary>
            </div>
          ) : lesson.assessmentType === 'medieval-castle-game' ? (
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
                <MedievalCastleGame lesson={lesson} />
              </ErrorBoundary>
            </div>
          ) : lesson.assessmentType === 'ancient-rome-game' ? (
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
                <AncientRomeGame lesson={lesson} />
              </ErrorBoundary>
            </div>
          ) : lesson.assessmentType === 'ancient-greece-game' ? (
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
                <AncientGreeceGame lesson={lesson} />
              </ErrorBoundary>
            </div>
          ) : lesson.assessmentType === 'prehistoric-britain-game' ? (
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
                <PrehistoricBritainGame lesson={lesson} />
              </ErrorBoundary>
            </div>
          ) : lesson.assessmentType === 'local-history-game' ? (
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
                <LocalHistoryGame lesson={lesson} />
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
          ) : lesson.assessmentType === 'phonics-game' ? (
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
                <PhonicsGame lesson={lesson} />
              </ErrorBoundary>
            </div>
          ) : lesson.assessmentType === 'sentence-scramble-game' ? (
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
                <SentenceScrambleGame lesson={lesson} />
              </ErrorBoundary>
            </div>
          ) : lesson.assessmentType === 'missing-vowel-game' ? (
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
                <MissingVowelGame lesson={lesson} />
              </ErrorBoundary>
            </div>
          ) : lesson.assessmentType === 'figurative-language-game' ? (
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
                <FigurativeLanguageGame lesson={lesson} />
              </ErrorBoundary>
            </div>
          ) : lesson.assessmentType === 'parts-of-speech-game' ? (
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
                <PartsOfSpeechGame lesson={lesson} />
              </ErrorBoundary>
            </div>) : lesson.assessmentType === 'vowel-sound-game' ? (
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
                  <VowelSoundGame lesson={lesson} />
                </ErrorBoundary>
              </div>
            ) : lesson.assessmentType === 'sight-word-game' ? (
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
                  <SightWordGame lesson={lesson} />
                </ErrorBoundary>
              </div>
            ) : lesson.assessmentType === 'compound-word-game' ? (
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
                  <CompoundWordGame lesson={lesson} />
                </ErrorBoundary>
              </div>
            ) : lesson.assessmentType === 'synonyms-antonyms-game' ? (
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
                  <SynonymsAntonymsGame lesson={lesson} />
                </ErrorBoundary>
              </div>
            ) : lesson.assessmentType === 'sentence-building-game' ? (
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
                  <SentenceBuildingGame lesson={lesson} />
                </ErrorBoundary>
              </div>
            ) : lesson.assessmentType === 'reading-comprehension-game' ? (
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
                  <ReadingComprehensionGame lesson={lesson} />
                </ErrorBoundary>
              </div>
            ) : lesson.assessmentType === 'creative-writing-game' ? (
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
                  <CreativeWritingGame lesson={lesson} />
                </ErrorBoundary>
              </div>
            ) : lesson.assessmentType === 'spelling-game' ? (
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
                  <SpellingGame lesson={lesson} />
                </ErrorBoundary>
              </div>
            ) : lesson.assessmentType === 'prefix-game' || lesson.assessmentType === 'suffix-game' ? (
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
                  <PrefixSuffixGame lesson={lesson} />
                </ErrorBoundary>
              </div>
            ) : lesson.assessmentType === 'contraction-game' ? (
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
                  <ContractionGame lesson={lesson} />
                </ErrorBoundary>
              </div>) : (
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
          )
        }
      </div>
    </div>
  );
}

export default LessonViewScreen;

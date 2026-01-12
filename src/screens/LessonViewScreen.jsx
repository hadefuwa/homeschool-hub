import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import MarkdownWithYouTube from '../components/MarkdownWithYouTube';
import ClickingGame from '../components/ClickingGame';
import KeyboardGame from '../components/KeyboardGame';
import DrawingGame from '../components/DrawingGame';
import BlocklyEmbed from '../components/BlocklyEmbed';
import InfoButton from '../components/InfoButton';

function LessonViewScreen() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = useDataStore(state => state.getLesson(parseInt(lessonId)));
  const trackLessonAccess = useDataStore(state => state.trackLessonAccess);
  
  // Track lesson access when component mounts
  useEffect(() => {
    if (lesson) {
      trackLessonAccess(lesson);
    }
  }, [lesson, trackLessonAccess]);
  
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
            <MarkdownWithYouTube content={lesson.content} />
          </div>
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


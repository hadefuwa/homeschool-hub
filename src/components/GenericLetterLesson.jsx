import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { useGoogleTTS } from '../hooks/useGoogleTTS';
import YouTubeEmbed from './YouTubeEmbed';


/**
 * Generic Letter Phonics Lesson Component
 * Embeds Jolly Phonics YouTube video and then presents a quiz
 */
function GenericLetterLesson({ lesson, letter, videoId, questions }) {
  const [stage, setStage] = useState('video'); // 'video' or 'quiz'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastAnswer, setLastAnswer] = useState(null);
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);
  const getNextLessonUrl = useDataStore(state => state.getNextLessonUrl);
  const disableStudyMode = useDataStore(state => state.disableStudyMode);
  const { speak, stop, speaking } = useGoogleTTS();

  const handleStartQuiz = () => {
    setStage('quiz');
  };

  const speakQuestion = async (word) => {
    const text = `${word}. Does ${word} start with the letter ${letter.toUpperCase()}? ${word}. ${word}. ${word}.`;
    await speak(text, { rate: 0.8 });
  };

  // Auto-speak question when it changes or when quiz starts
  useEffect(() => {
    if (stage === 'quiz' && !showResult && lastAnswer === null) {
      const currentQuestion = questions[currentQuestionIndex];
      const timer = setTimeout(() => {
        speakQuestion(currentQuestion.word);
      }, 500);

      return () => {
        clearTimeout(timer);
        stop();
      };
    }
  }, [stage, currentQuestionIndex, showResult, lastAnswer]);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct;

    setLastAnswer({ isCorrect, answer });

    if (isCorrect) {
      setScore(score + 1);
      speak('Correct!', { rate: 0.8 });
    } else {
      speak(`Not quite. Try to listen for the ${letter.toUpperCase()} sound.`, { rate: 0.8 });
    }

    setTimeout(() => {
      setLastAnswer(null);
      const nextIndex = currentQuestionIndex + 1;

      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        completeLesson();
      }
    }, 2000);
  };

  const completeLesson = () => {
    setShowResult(true);

    if (lesson) {
      const userId = getUserId();
      const progressId = getNextProgressId();
      const finalScore = Math.round((score / questions.length) * 100);

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
        score: finalScore,
      });

      addProgress(progress).then(() => {
        saveData();
      }).catch(err => {
        console.error('Error saving progress:', err);
      });
    }
  };

  const handleNextLesson = () => {
    if (lesson) {
      const { url, shouldDisableStudyMode } = getNextLessonUrl(lesson);
      if (shouldDisableStudyMode) {
        disableStudyMode();
      }
      navigate(url);
    }
  };

  const handleBackToLessons = () => {
    navigate(`/lessons?subjectId=${lesson.subjectId}`);
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    let medal = '🥉';
    let medalColor = '#CD7F32';

    if (percentage >= 90) {
      medal = '🥇';
      medalColor = '#FFD700';
    } else if (percentage >= 70) {
      medal = '🥈';
      medalColor = '#C0C0C0';
    }

    return (
      <div style={{
        width: '100%',
        height: '100%',
        minHeight: '600px',
        backgroundColor: '#f0f8ff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '40px',
      }}>
        <div style={{ fontSize: '100px', marginBottom: '20px' }}>{medal}</div>
        <h2 style={{ fontSize: '48px', color: medalColor, marginBottom: '20px', margin: '0 0 20px 0' }}>
          Great Job!
        </h2>
        <p style={{ fontSize: '32px', color: '#333', marginBottom: '40px' }}>
          You got {score} out of {questions.length} correct!
        </p>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={handleBackToLessons}
            style={{
              padding: '15px 30px',
              fontSize: '18px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}
          >
            Back to Lessons
          </button>
          <button
            onClick={handleNextLesson}
            style={{
              padding: '15px 40px',
              fontSize: '20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}
          >
            Next Lesson →
          </button>
        </div>
      </div>
    );
  }

  if (stage === 'video') {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f0f8ff',
        padding: '20px',
        overflow: 'auto',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
        }}>
          <h1 style={{ fontSize: '36px', color: '#333', textAlign: 'center', marginBottom: '20px' }}>
            Learn the Letter {letter.toUpperCase()} Sound
          </h1>
          <p style={{ fontSize: '20px', color: '#666', textAlign: 'center', marginBottom: '30px' }}>
            Watch this video to learn about the letter {letter.toUpperCase()} and the sound it makes!
          </p>

          <div style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            overflow: 'hidden',
            maxWidth: '100%',
            backgroundColor: '#000',
            borderRadius: '12px',
            marginBottom: '30px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}>
            <YouTubeEmbed videoId={videoId} />

          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleStartQuiz}
              style={{
                padding: '20px 50px',
                fontSize: '24px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
              }}
            >
              Start the Quiz! 🎯
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz stage
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '600px',
      backgroundColor: '#f0f8ff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        height: '10px',
        backgroundColor: '#ddd',
        borderRadius: '5px',
        marginBottom: '40px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: '#28a745',
          transition: 'width 0.3s ease',
        }} />
      </div>

      <p style={{ fontSize: '20px', color: '#666', marginBottom: '20px' }}>
        Question {currentQuestionIndex + 1} of {questions.length}
      </p>

      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginBottom: '40px',
        textAlign: 'center',
      }}>
        <button
          onClick={() => speakQuestion(currentQuestion.word)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            marginBottom: '20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
          aria-label="Repeat question"
        >
          🔊
        </button>
        <h2 style={{ fontSize: '48px', color: '#333', margin: '20px 0' }}>
          {currentQuestion.word}
        </h2>
        <p style={{ fontSize: '24px', color: '#666' }}>
          Does this word start with the letter {letter.toUpperCase()}?
        </p>
      </div>

      <div style={{ display: 'flex', gap: '30px' }}>
        <button
          onClick={() => handleAnswer(true)}
          disabled={lastAnswer !== null}
          style={{
            padding: '30px 60px',
            fontSize: '32px',
            backgroundColor: lastAnswer?.answer === true
              ? (lastAnswer.isCorrect ? '#28a745' : '#dc3545')
              : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            cursor: lastAnswer !== null ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
            opacity: lastAnswer !== null ? 0.7 : 1,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (lastAnswer === null) {
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ✓ Yes
        </button>
        <button
          onClick={() => handleAnswer(false)}
          disabled={lastAnswer !== null}
          style={{
            padding: '30px 60px',
            fontSize: '32px',
            backgroundColor: lastAnswer?.answer === false
              ? (lastAnswer.isCorrect ? '#28a745' : '#dc3545')
              : '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            cursor: lastAnswer !== null ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
            opacity: lastAnswer !== null ? 0.7 : 1,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (lastAnswer === null) {
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ✗ No
        </button>
      </div>

      <p style={{ fontSize: '24px', color: '#333', marginTop: '40px' }}>
        Score: {score} / {currentQuestionIndex + (lastAnswer?.isCorrect ? 1 : 0)}
      </p>
    </div>
  );
}

export default GenericLetterLesson;

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import * as TTS from '../utils/textToSpeech';

function QuizScreen() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const quiz = useDataStore(state => state.getQuiz(parseInt(quizId)));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  
  // TTS state
  const [ttsEnabled, setTtsEnabled] = useState(() => TTS.getPreferences().enabled);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [autoRead, setAutoRead] = useState(() => TTS.getPreferences().autoRead);
  const [readAnswers, setReadAnswers] = useState(() => TTS.getPreferences().readAnswers);
  const ttsSupported = TTS.isSupported();
  
  const addProgress = useDataStore(state => state.addProgress);
  const saveData = useDataStore(state => state.saveData);
  const getNextLessonForSubject = useDataStore(state => state.getNextLessonForSubject);
  const getUserId = useDataStore(state => state.getUserId);
  const data = useDataStore(state => state.data);
  
  // Ref to track if component is mounted
  const isMountedRef = useRef(true);
  
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      // Cleanup: stop TTS when component unmounts
      TTS.stop();
    };
  }, []);
  
  // Auto-read question when it changes (if auto-read is enabled)
  useEffect(() => {
    if (!ttsSupported || !ttsEnabled || !autoRead || showResults) {
      return;
    }
    
    const currentQuestion = quiz?.questions[currentQuestionIndex];
    if (currentQuestion) {
      // Small delay to ensure UI is updated
      const timer = setTimeout(() => {
        if (isMountedRef.current) {
          readQuestion();
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, ttsEnabled, autoRead, showResults]);
  
  // Update speaking state periodically
  useEffect(() => {
    if (!ttsSupported || !ttsEnabled) return;
    
    const interval = setInterval(() => {
      setIsSpeaking(TTS.isSpeaking());
      setIsPaused(TTS.isPaused());
    }, 100);
    
    return () => clearInterval(interval);
  }, [ttsSupported, ttsEnabled]);

  if (!quiz) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Quiz Not Found</h1>
        <p>The quiz you're looking for doesn't exist.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;

  // TTS handlers
  const readQuestion = async () => {
    if (!ttsSupported || !ttsEnabled || !currentQuestion) return;
    
    try {
      TTS.stop(); // Stop any current speech
      await TTS.speak(currentQuestion.questionText);
      setIsSpeaking(true);
    } catch (error) {
      console.error('Error reading question:', error);
    }
  };
  
  const readAnswer = async (answerText) => {
    if (!ttsSupported || !ttsEnabled || !readAnswers) return;
    
    try {
      TTS.stop();
      await TTS.speak(answerText);
      setIsSpeaking(true);
    } catch (error) {
      console.error('Error reading answer:', error);
    }
  };
  
  const handleTTSPlay = () => {
    if (isPaused) {
      TTS.resume();
      setIsPaused(false);
    } else {
      readQuestion();
    }
  };
  
  const handleTTSPause = () => {
    TTS.pause();
    setIsPaused(true);
  };
  
  const handleTTSStop = () => {
    TTS.stop();
    setIsSpeaking(false);
    setIsPaused(false);
  };
  
  const toggleTTS = () => {
    const newEnabled = !ttsEnabled;
    setTtsEnabled(newEnabled);
    TTS.setEnabled(newEnabled);
    if (!newEnabled) {
      TTS.stop();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };
  
  const toggleAutoRead = () => {
    const newAutoRead = !autoRead;
    setAutoRead(newAutoRead);
    TTS.setAutoRead(newAutoRead);
  };
  
  const toggleReadAnswers = () => {
    const newReadAnswers = !readAnswers;
    setReadAnswers(newReadAnswers);
    TTS.setReadAnswers(newReadAnswers);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answerIndex,
    });
    
    // Read the selected answer if enabled
    if (readAnswers && currentQuestion.options[answerIndex]) {
      readAnswer(currentQuestion.options[answerIndex]);
    }
  };

  const handleNext = () => {
    TTS.stop(); // Stop TTS when navigating
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz complete - calculate score
      calculateScore();
    }
  };

  const handlePrevious = () => {
    TTS.stop(); // Stop TTS when navigating
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = async () => {
    TTS.stop(); // Stop TTS when submitting quiz
    let correct = 0;
    quiz.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswerIndex) {
        correct++;
      }
    });
    
    const score = Math.round((correct / totalQuestions) * 100);
    setShowResults(true);
    
    // Save progress if score is passing (70% or higher)
    if (score >= 70) {
      // Find the lesson that has this quiz
      const lesson = data.lessons.find(l => l.quizId === quiz.id);
      if (lesson) {
        const userId = getUserId();
        await addProgress({
          userId,
          yearId: lesson.yearId,
          subjectId: lesson.subjectId,
          lessonNumber: lesson.lessonNumber,
          completed: true,
          score: score,
        });
        await saveData();
      }
    }
  };

  if (showResults) {
    let correct = 0;
    quiz.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswerIndex) {
        correct++;
      }
    });
    const score = Math.round((correct / totalQuestions) * 100);
    const passed = score >= 70;

    return (
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px',
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '64px',
            marginBottom: '20px',
          }}>
            {passed ? '🎉' : '📝'}
          </div>
          <h1 style={{
            marginBottom: '10px',
            color: passed ? '#28a745' : '#dc3545',
          }}>
            {passed ? 'Congratulations!' : 'Keep Practicing!'}
          </h1>
          <p style={{
            fontSize: '24px',
            marginBottom: '20px',
            color: '#666',
          }}>
            Your Score: {score}%
          </p>
          <p style={{
            fontSize: '18px',
            marginBottom: '30px',
            color: '#666',
          }}>
            You got {correct} out of {totalQuestions} questions correct.
          </p>
          
          <div style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'left',
          }}>
            <h3 style={{ marginBottom: '15px' }}>Review Your Answers:</h3>
            {quiz.questions.map((question, index) => {
              const selected = selectedAnswers[question.id];
              const isCorrect = selected === question.correctAnswerIndex;
              
              return (
                <div key={question.id} style={{
                  marginBottom: '20px',
                  padding: '15px',
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  border: `2px solid ${isCorrect ? '#28a745' : '#dc3545'}`,
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '10px',
                  }}>
                    <span style={{
                      fontSize: '20px',
                    }}>
                      {isCorrect ? '✅' : '❌'}
                    </span>
                    <strong>Question {index + 1}:</strong>
                  </div>
                  <p style={{ marginBottom: '10px' }}>{question.questionText}</p>
                  <div style={{ marginLeft: '20px' }}>
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} style={{
                        padding: '5px 0',
                        color: optIndex === question.correctAnswerIndex 
                          ? '#28a745' 
                          : optIndex === selected && !isCorrect
                          ? '#dc3545'
                          : '#666',
                        fontWeight: optIndex === question.correctAnswerIndex ? 'bold' : 'normal',
                      }}>
                        {optIndex === selected && '→ '}
                        {option}
                        {optIndex === question.correctAnswerIndex && ' ✓'}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{
            marginTop: '30px',
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
          }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                padding: '12px 24px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Back to Lesson
            </button>
            {passed && (
              <button
                onClick={() => {
                  // Find the lesson and navigate to next lesson
                  const lesson = data.lessons.find(l => l.quizId === quiz.id);
                  if (lesson) {
                    const nextLesson = getNextLessonForSubject(lesson.subjectId);
                    if (nextLesson) {
                      navigate(`/lesson/${nextLesson.id}`);
                    } else {
                      navigate(`/lessons?subjectId=${lesson.subjectId}`);
                    }
                  } else {
                    navigate('/');
                  }
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
              >
                Continue to Next Lesson →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

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
        maxWidth: '800px',
      }}>
      {/* Header */}
      <div style={{
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '2px solid #e0e0e0',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '15px',
        }}>
          <button
            onClick={() => {
              TTS.stop();
              navigate(-1);
            }}
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
          
          {/* TTS Controls */}
          {ttsSupported && (
            <div style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}>
              {/* TTS Toggle */}
              <button
                onClick={toggleTTS}
                title={ttsEnabled ? 'Disable Text-to-Speech' : 'Enable Text-to-Speech'}
                style={{
                  padding: '8px 12px',
                  backgroundColor: ttsEnabled ? '#007bff' : '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                🔊 {ttsEnabled ? 'TTS On' : 'TTS Off'}
              </button>
              
              {ttsEnabled && (
                <>
                  {/* Play/Pause Button */}
                  {isPaused || !isSpeaking ? (
                    <button
                      onClick={handleTTSPlay}
                      title="Play/Resume"
                      style={{
                        padding: '8px 12px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                      }}
                    >
                      ▶️
                    </button>
                  ) : (
                    <button
                      onClick={handleTTSPause}
                      title="Pause"
                      style={{
                        padding: '8px 12px',
                        backgroundColor: '#ffc107',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                      }}
                    >
                      ⏸️
                    </button>
                  )}
                  
                  {/* Stop Button */}
                  <button
                    onClick={handleTTSStop}
                    title="Stop"
                    disabled={!isSpeaking && !isPaused}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: (!isSpeaking && !isPaused) ? 'not-allowed' : 'pointer',
                      opacity: (!isSpeaking && !isPaused) ? 0.5 : 1,
                      fontSize: '16px',
                    }}
                  >
                    ⏹️
                  </button>
                  
                  {/* Read Question Button */}
                  <button
                    onClick={readQuestion}
                    title="Read Question Aloud"
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#17a2b8',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                  >
                    📖 Read
                  </button>
                  
                  {/* Auto-read Toggle */}
                  <button
                    onClick={toggleAutoRead}
                    title={autoRead ? 'Disable Auto-read' : 'Enable Auto-read'}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: autoRead ? '#28a745' : '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    {autoRead ? '🔄 Auto' : '⏸️ Manual'}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        
        <h1 style={{
          margin: 0,
          fontSize: '32px',
          color: '#333',
        }}>
          {quiz.title}
        </h1>
        <p style={{
          margin: '10px 0 0 0',
          color: '#666',
          fontSize: '16px',
        }}>
          Question {currentQuestionIndex + 1} of {totalQuestions}
          {ttsEnabled && isSpeaking && (
            <span style={{
              marginLeft: '10px',
              color: '#007bff',
              fontSize: '14px',
            }}>
              🔊 Reading...
            </span>
          )}
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{
        marginBottom: '30px',
        width: '100%',
        height: '8px',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
          height: '100%',
          backgroundColor: '#007bff',
          transition: 'width 0.3s',
        }} />
      </div>

      {/* Question */}
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px',
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '20px',
            color: '#333',
            flex: 1,
          }}>
            {currentQuestion.questionText}
          </h2>
          {ttsEnabled && (
            <button
              onClick={readQuestion}
              title="Read Question Aloud"
              style={{
                marginLeft: '15px',
                padding: '6px 12px',
                backgroundColor: '#17a2b8',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                whiteSpace: 'nowrap',
              }}
            >
              🔊 Read
            </button>
          )}
        </div>
        
        {/* Read Answers Toggle */}
        {ttsEnabled && (
          <div style={{
            marginBottom: '15px',
            padding: '10px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontSize: '14px',
            }}>
              <input
                type="checkbox"
                checked={readAnswers}
                onChange={toggleReadAnswers}
                style={{ cursor: 'pointer' }}
              />
              <span>Read answers when selected</span>
            </label>
          </div>
        )}

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              style={{
                padding: '15px 20px',
                backgroundColor: selectedAnswers[currentQuestion.id] === index 
                  ? '#007bff' 
                  : '#f8f9fa',
                color: selectedAnswers[currentQuestion.id] === index 
                  ? 'white' 
                  : '#333',
                border: `2px solid ${selectedAnswers[currentQuestion.id] === index 
                  ? '#007bff' 
                  : '#ddd'}`,
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (selectedAnswers[currentQuestion.id] !== index) {
                  e.currentTarget.style.backgroundColor = '#e9ecef';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedAnswers[currentQuestion.id] !== index) {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                }
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          style={{
            padding: '10px 20px',
            backgroundColor: currentQuestionIndex === 0 ? '#e0e0e0' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
            opacity: currentQuestionIndex === 0 ? 0.5 : 1,
          }}
        >
          ← Previous
        </button>

        <button
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion.id] === undefined}
          style={{
            padding: '10px 20px',
            backgroundColor: selectedAnswers[currentQuestion.id] === undefined 
              ? '#e0e0e0' 
              : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedAnswers[currentQuestion.id] === undefined 
              ? 'not-allowed' 
              : 'pointer',
            opacity: selectedAnswers[currentQuestion.id] === undefined ? 0.5 : 1,
          }}
        >
          {currentQuestionIndex < totalQuestions - 1 ? 'Next →' : 'Submit Quiz'}
        </button>
      </div>
      </div>
    </div>
  );
}

export default QuizScreen;


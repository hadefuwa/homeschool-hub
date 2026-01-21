import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, isSpeaking } from '../utils/textToSpeech';

// Scoring tiers
const SCORE_TIERS = {
  GOLD: { name: 'Gold', color: '#FFD700', minScore: 90 },
  SILVER: { name: 'Silver', color: '#C0C0C0', minScore: 70 },
  BRONZE: { name: 'Bronze', color: '#CD7F32', minScore: 50 },
  FAIL: { name: 'Try Again', color: '#dc3545', minScore: 0 },
};

function HistoryGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [timeStarted, setTimeStarted] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef(null);

  // Extract questions from lesson content
  useEffect(() => {
    if (!lesson || !lesson.content) return;
    
    const questionRegex = /<!-- QUESTION_START -->\s*([\s\S]*?)\s*<!-- OPTIONS -->\s*([\s\S]*?)\s*<!-- CORRECT -->\s*(\d+)\s*(?:<!-- EXPLANATION -->\s*([\s\S]*?))?\s*<!-- QUESTION_END -->/g;
    const extractedQuestions = [];
    let match;
    
    questionRegex.lastIndex = 0;
    while ((match = questionRegex.exec(lesson.content)) !== null) {
      extractedQuestions.push({
        question: match[1].trim(),
        options: match[2].split('|').map(opt => opt.trim()),
        correctIndex: parseInt(match[3]),
        explanation: match[4] ? match[4].trim() : null,
      });
    }
    
    // Shuffle questions for variety
    const shuffled = extractedQuestions.sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setTimeStarted(Date.now());
    
    // Start timer
    timerRef.current = setInterval(() => {
      if (timeStarted) {
        setTimeElapsed(Math.floor((Date.now() - timeStarted) / 1000));
      }
    }, 1000);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [lesson, timeStarted]);

  const handleAnswerSelect = (index) => {
    if (showFeedback || gameComplete) return;
    
    setSelectedAnswer(index);
    const isCorrect = index === questions[currentQuestionIndex].correctIndex;
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      setCorrectAnswers(prev => prev + 1);
      // Play success sound effect (visual feedback)
      setShowFeedback(true);
    } else {
      setWrongAnswers(prev => prev + 1);
      setShowFeedback(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Game complete
      completeGame();
    }
  };

  const completeGame = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setGameComplete(true);
    setShowCelebration(true);
    
    // Calculate final score
    const totalQuestions = questions.length;
    const percentage = (correctAnswers / totalQuestions) * 100;
    const finalScore = Math.round(percentage);
    
    // Determine medal
    let medal = SCORE_TIERS.FAIL;
    if (finalScore >= SCORE_TIERS.GOLD.minScore) {
      medal = SCORE_TIERS.GOLD;
    } else if (finalScore >= SCORE_TIERS.SILVER.minScore) {
      medal = SCORE_TIERS.SILVER;
    } else if (finalScore >= SCORE_TIERS.BRONZE.minScore) {
      medal = SCORE_TIERS.BRONZE;
    }
    
    if (lesson && finalScore >= SCORE_TIERS.BRONZE.minScore) {
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
        score: finalScore,
      });
      await addProgress(progress);
      saveData();
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setGameComplete(false);
    setShowCelebration(false);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setTimeStarted(Date.now());
    setTimeElapsed(0);
  };

  const handleSpeakQuestion = async () => {
    if (!questions[currentQuestionIndex]) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    
    try {
      // Read the question first
      await speak(currentQuestion.question, { volume: 1.0, rate: 0.9, pitch: 1.0 });
      
      // Wait for speech to complete before reading options
      const waitForSpeech = () => {
        return new Promise((resolve) => {
          const checkInterval = setInterval(() => {
            if (!isSpeaking()) {
              clearInterval(checkInterval);
              resolve();
            }
          }, 100);
        });
      };
      
      await waitForSpeech();
      
      // Small pause between question and options
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Read each option with its letter
      for (let i = 0; i < currentQuestion.options.length; i++) {
        const optionText = `${String.fromCharCode(65 + i)}. ${currentQuestion.options[i]}`;
        await speak(optionText, { volume: 1.0, rate: 0.9, pitch: 1.0 });
        await waitForSpeech();
        // Small pause between options
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } catch (err) {
      console.error('Error speaking question:', err);
    }
  };

  if (questions.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>No questions found in this lesson</h2>
        <p>This lesson doesn't have interactive questions yet.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctIndex;
  const totalQuestions = questions.length;
  const percentage = questions.length > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  
  // Determine medal
  let medal = SCORE_TIERS.FAIL;
  if (percentage >= SCORE_TIERS.GOLD.minScore) {
    medal = SCORE_TIERS.GOLD;
  } else if (percentage >= SCORE_TIERS.SILVER.minScore) {
    medal = SCORE_TIERS.SILVER;
  } else if (percentage >= SCORE_TIERS.BRONZE.minScore) {
    medal = SCORE_TIERS.BRONZE;
  }

  if (gameComplete) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: showCelebration ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f5f5f5',
        borderRadius: '12px',
        transition: 'background 0.5s ease',
      }}>
        {showCelebration && (
          <div style={{
            fontSize: '80px',
            animation: 'bounce 1s infinite',
            marginBottom: '20px',
          }}>
            🎉
          </div>
        )}
        <h2 style={{ fontSize: '36px', marginBottom: '20px', color: '#333' }}>
          {percentage >= SCORE_TIERS.BRONZE.minScore ? 'Great Job!' : 'Keep Practicing!'}
        </h2>
        <div style={{
          fontSize: '24px',
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          minWidth: '300px',
        }}>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: medal.color, marginBottom: '10px' }}>
              {medal.name} Medal
            </div>
            <div style={{ fontSize: '32px', color: '#333', marginBottom: '10px' }}>
              Score: {percentage}%
            </div>
            <div style={{ fontSize: '18px', color: '#666' }}>
              {correctAnswers} out of {totalQuestions} correct
            </div>
            <div style={{ fontSize: '18px', color: '#666', marginTop: '10px' }}>
              Time: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            onClick={handleRestart}
            style={{
              padding: '15px 30px',
              fontSize: '18px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Play Again
          </button>
          <button
            onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)}
            style={{
              padding: '15px 30px',
              fontSize: '18px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Continue Learning
          </button>
        </div>
        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      padding: '30px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '30px',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ fontSize: '28px', marginBottom: '15px', color: '#333' }}>
          {lesson.emoji} {lesson.title}
        </h2>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          fontSize: '18px',
          color: '#666',
        }}>
          <div>
            <strong>Question:</strong> {currentQuestionIndex + 1} / {totalQuestions}
          </div>
          <div>
            <strong>Score:</strong> {score} points
          </div>
          <div>
            <strong>Time:</strong> {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
          </div>
        </div>
        {/* Progress bar */}
        <div style={{
          marginTop: '15px',
          width: '100%',
          height: '10px',
          backgroundColor: '#e0e0e0',
          borderRadius: '5px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
            height: '100%',
            backgroundColor: '#007bff',
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* Question */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '20px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '25px',
        }}>
          <h3 style={{
            fontSize: '24px',
            color: '#333',
            margin: 0,
            flex: 1,
          }}>
            {currentQuestion.question}
          </h3>
          <button
            onClick={handleSpeakQuestion}
            style={{
              padding: '10px 15px',
              fontSize: '20px',
              backgroundColor: '#f0f0f0',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginLeft: '15px',
            }}
            title="Read question aloud"
          >
            🔊
          </button>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {currentQuestion.options.map((option, index) => {
            let buttonStyle = {
              padding: '18px 24px',
              fontSize: '18px',
              textAlign: 'left',
              border: '2px solid #ddd',
              borderRadius: '10px',
              cursor: showFeedback ? 'default' : 'pointer',
              backgroundColor: 'white',
              color: '#333',
              transition: 'all 0.3s ease',
              fontWeight: '500',
            };

            if (showFeedback) {
              if (index === currentQuestion.correctIndex) {
                buttonStyle = {
                  ...buttonStyle,
                  backgroundColor: '#d4edda',
                  borderColor: '#28a745',
                  color: '#155724',
                };
              } else if (index === selectedAnswer && !isCorrect) {
                buttonStyle = {
                  ...buttonStyle,
                  backgroundColor: '#f8d7da',
                  borderColor: '#dc3545',
                  color: '#721c24',
                };
              } else {
                buttonStyle = {
                  ...buttonStyle,
                  opacity: 0.6,
                };
              }
            } else if (selectedAnswer === index) {
              buttonStyle = {
                ...buttonStyle,
                backgroundColor: '#e7f3ff',
                borderColor: '#007bff',
              };
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
                style={buttonStyle}
                onMouseEnter={(e) => {
                  if (!showFeedback) {
                    e.target.style.transform = 'scale(1.02)';
                    e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showFeedback) {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                <span style={{ marginRight: '10px', fontSize: '20px' }}>
                  {index === 0 ? 'A' : index === 1 ? 'B' : index === 2 ? 'C' : 'D'}
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div style={{
            marginTop: '25px',
            padding: '20px',
            backgroundColor: isCorrect ? '#d4edda' : '#f8d7da',
            border: `2px solid ${isCorrect ? '#28a745' : '#dc3545'}`,
            borderRadius: '10px',
            animation: 'slideIn 0.3s ease',
          }}>
            <div style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: isCorrect ? '#155724' : '#721c24',
              marginBottom: '10px',
            }}>
              {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
            </div>
            {currentQuestion.explanation && (
              <div style={{
                fontSize: '16px',
                color: isCorrect ? '#155724' : '#721c24',
              }}>
                {currentQuestion.explanation}
              </div>
            )}
          </div>
        )}

        {/* Next Button */}
        {showFeedback && (
          <button
            onClick={handleNext}
            style={{
              marginTop: '25px',
              padding: '15px 30px',
              fontSize: '18px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              alignSelf: 'center',
            }}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Finish Game 🎉'}
          </button>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default HistoryGame;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';

function QuizScreen() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const quiz = useDataStore(state => state.getQuiz(parseInt(quizId)));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const addProgress = useDataStore(state => state.addProgress);
  const saveData = useDataStore(state => state.saveData);
  const getNextLessonForSubject = useDataStore(state => state.getNextLessonForSubject);
  const getUserId = useDataStore(state => state.getUserId);
  const data = useDataStore(state => state.data);

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

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answerIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz complete - calculate score
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = async () => {
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
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '2px solid #e0e0e0',
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginBottom: '15px',
            padding: '8px 16px',
            backgroundColor: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          ← Back
        </button>
        
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
        <h2 style={{
          marginBottom: '20px',
          fontSize: '20px',
          color: '#333',
        }}>
          {currentQuestion.questionText}
        </h2>

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
  );
}

export default QuizScreen;


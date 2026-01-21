import React, { useState } from 'react';
import { speak, isSpeaking } from '../utils/textToSpeech';

/**
 * Interactive Question Component
 * Displays a multiple choice question with immediate feedback
 * Once answered, cannot be changed - requires lesson restart
 */
function InteractiveQuestion({ question, options, correctIndex, explanation, questionId, onAnswer }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleTTS = async () => {
    if (!question) return;
    
    try {
      // Read the question first
      await speak(question, { volume: 1.0, rate: 0.9, pitch: 1.0 });
      
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
      for (let i = 0; i < options.length; i++) {
        const optionText = `${String.fromCharCode(65 + i)}. ${options[i]}`;
        await speak(optionText, { volume: 1.0, rate: 0.9, pitch: 1.0 });
        await waitForSpeech();
        // Small pause between options
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } catch (err) {
      console.error('Error speaking question:', err);
    }
  };

  const handleSelect = (index) => {
    if (showFeedback) return; // Don't allow changing answer after feedback
    
    setSelectedIndex(index);
    const correct = index === correctIndex;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Notify parent component of the answer
    if (onAnswer && questionId !== undefined) {
      onAnswer(questionId, correct);
    }
  };

  const getOptionStyle = (index) => {
    const baseStyle = {
      padding: '12px 16px',
      margin: '8px 0',
      borderRadius: '8px',
      border: '2px solid #e0e0e0',
      backgroundColor: 'white',
      cursor: showFeedback ? 'default' : 'pointer',
      transition: 'all 0.2s',
      textAlign: 'left',
      fontSize: '15px',
      lineHeight: '1.5',
    };

    if (!showFeedback) {
      return baseStyle;
    }

    if (index === correctIndex) {
      return {
        ...baseStyle,
        borderColor: '#28a745',
        backgroundColor: '#d4edda',
        color: '#155724',
        fontWeight: '600',
      };
    }

    if (index === selectedIndex && !isCorrect) {
      return {
        ...baseStyle,
        borderColor: '#dc3545',
        backgroundColor: '#f8d7da',
        color: '#721c24',
      };
    }

    return {
      ...baseStyle,
      opacity: 0.6,
    };
  };

  return (
    <div style={{
      margin: '30px 0',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      border: '1px solid #e0e0e0',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '15px',
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#333',
          flex: 1,
        }}>
          {question}
        </div>
        <button
          onClick={handleTTS}
          style={{
            padding: '8px 12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0056b3';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#007bff';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title="Listen to question"
        >
          🔊
        </button>
      </div>
      
      <div>
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleSelect(index)}
            style={getOptionStyle(index)}
            onMouseEnter={(e) => {
              if (!showFeedback) {
                e.currentTarget.style.borderColor = '#007bff';
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }
            }}
            onMouseLeave={(e) => {
              if (!showFeedback) {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            {String.fromCharCode(65 + index)}. {option}
          </div>
        ))}
      </div>

      {showFeedback && (
        <div style={{
          marginTop: '15px',
          padding: '12px',
          borderRadius: '8px',
          backgroundColor: isCorrect ? '#d4edda' : '#fff3cd',
          border: `1px solid ${isCorrect ? '#28a745' : '#ffc107'}`,
        }}>
          <div style={{
            fontWeight: '600',
            color: isCorrect ? '#155724' : '#856404',
            marginBottom: explanation ? '8px' : '0',
          }}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </div>
          {!isCorrect && (
            <div style={{
              fontSize: '14px',
              color: '#856404',
              marginTop: '8px',
              fontWeight: '600',
            }}>
              ⚠️ You must restart the lesson to try again.
            </div>
          )}
          {explanation && (
            <div style={{
              fontSize: '14px',
              color: isCorrect ? '#155724' : '#856404',
              marginTop: '5px',
            }}>
              {explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default InteractiveQuestion;


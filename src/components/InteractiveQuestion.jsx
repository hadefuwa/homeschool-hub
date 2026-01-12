import React, { useState } from 'react';

/**
 * Interactive Question Component
 * Displays a multiple choice question with immediate feedback
 */
function InteractiveQuestion({ question, options, correctIndex, explanation }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (index) => {
    if (showFeedback) return; // Don't allow changing answer after feedback
    
    setSelectedIndex(index);
    const correct = index === correctIndex;
    setIsCorrect(correct);
    setShowFeedback(true);
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
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '15px',
        color: '#333',
      }}>
        {question}
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


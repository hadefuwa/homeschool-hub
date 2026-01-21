/**
 * EXAMPLE: How to use the new TTS system in lesson components
 * 
 * The new approach:
 * - Components decide what to read and when
 * - Use useAutoSpeak hook to automatically read content
 * - No more DOM scanning or MutationObserver
 * - Much simpler and more reliable
 */

import React, { useState } from 'react';
import { useAutoSpeak } from '../hooks/useGoogleTTS';

// Example 1: Simple auto-read on mount
function SimpleLesson() {
  const word = 'cat';
  const question = `Does ${word} start with the letter C?`;
  
  // Automatically reads when component mounts
  useAutoSpeak(question, { delay: 500 });
  
  return (
    <div>
      <h2>{word}</h2>
      <p>{question}</p>
    </div>
  );
}

// Example 2: Auto-read when state changes (quiz questions)
function QuizLesson() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = [
    { word: 'fish', letter: 'F' },
    { word: 'cat', letter: 'C' },
  ];
  
  const question = questions[currentQuestion];
  const text = `${question.word}. Does this word start with the letter ${question.letter}?`;
  
  // Automatically reads when currentQuestion changes
  useAutoSpeak(text, { 
    delay: 500, 
    deps: [currentQuestion] // Re-read when this changes
  });
  
  return (
    <div>
      <h2>{question.word}</h2>
      <p>Does this word start with the letter {question.letter}?</p>
      <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
        Next Question
      </button>
    </div>
  );
}

// Example 3: Conditional auto-read
function ConditionalLesson() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentWord, setCurrentWord] = useState('elephant');
  
  // Only reads when quiz is shown
  const text = showQuiz ? `${currentWord}. Does this word start with the letter E?` : null;
  useAutoSpeak(text, { delay: 500, deps: [showQuiz, currentWord] });
  
  return (
    <div>
      {!showQuiz ? (
        <button onClick={() => setShowQuiz(true)}>Start Quiz</button>
      ) : (
        <>
          <h2>{currentWord}</h2>
          <p>Does this word start with the letter E?</p>
        </>
      )}
    </div>
  );
}

// Example 4: Manual control with useGoogleTTS
import { useGoogleTTS } from '../hooks/useGoogleTTS';

function ManualControlLesson() {
  const { speak, stop, speaking } = useGoogleTTS();
  const [word, setWord] = useState('fish');
  
  const readWord = () => {
    speak(`${word}. ${word}. ${word}.`, { rate: 0.8 });
  };
  
  return (
    <div>
      <h2>{word}</h2>
      <button onClick={readWord} disabled={speaking}>
        🔊 Read Word
      </button>
      <button onClick={stop} disabled={!speaking}>
        ⏹️ Stop
      </button>
    </div>
  );
}

export { SimpleLesson, QuizLesson, ConditionalLesson, ManualControlLesson };

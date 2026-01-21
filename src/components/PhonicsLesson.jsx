import React, { useState, useEffect } from 'react';
import { speakPhoneme, speakBlend, speakWordSlowlyThenBlended, stopSpeech } from '../utils/phonicsTTS';
import { speak as generalSpeak } from '../utils/textToSpeech';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { useNavigate } from 'react-router-dom';

// Lesson configurations
const LESSON_CONFIGS = {
  1: {
    type: 'vowel-recognition',
    letters: ['a', 'e', 'i', 'o', 'u'],
    title: 'Vowel Sound Recognition',
  },
  2: {
    type: 'consonant-recognition',
    letters: ['m', 's', 't'],
    title: 'Consonant Sound Recognition',
  },
  3: {
    type: 'cv-blending',
    blends: ['ma', 'me', 'mo'],
    title: 'Consonant-Vowel Blending',
  },
  4: {
    type: 'vc-blending',
    blends: ['at', 'it', 'on'],
    title: 'Vowel-Consonant Blending',
  },
  5: {
    type: 'sound-to-letter',
    items: [
      { word: 'cat', letter: 'c', image: '🐱' },
      { word: 'mat', letter: 'm', image: '🧺' },
      { word: 'sun', letter: 's', image: '☀️' },
    ],
    title: 'Sound-to-Letter Matching',
  },
  6: {
    type: 'initial-sound',
    items: [
      { word: 'cat', letter: 'c', image: '🐱' },
      { word: 'dog', letter: 'd', image: '🐶' },
      { word: 'sun', letter: 's', image: '☀️' },
    ],
    title: 'Initial Sound Identification',
  },
  7: {
    type: 'cvc-construction',
    words: ['cat', 'mat', 'sun', 'dog'],
    title: 'CVC Word Construction',
  },
  8: {
    type: 'review',
    activities: [1, 2, 3, 4, 5, 6, 7],
    title: 'Review and Consolidation',
  },
};

// Scoring tiers
const SCORE_TIERS = {
  PLATINUM: { name: 'Platinum', color: '#E5E4E2', tries: 1 },
  GOLD: { name: 'Gold', color: '#FFD700', tries: 2 },
  SILVER: { name: 'Silver', color: '#C0C0C0', tries: 3 },
  BRONZE: { name: 'Bronze', color: '#CD7F32', tries: 4 }, // Increased tries if needed, but let's stick to 3 levels normally.
  FAIL: { name: 'Fail', color: '#dc3545', tries: 0 },
};

const REVIEW_TIERS = {
  PLATINUM: { name: 'Platinum', color: '#E5E4E2', min: 90 },
  GOLD: { name: 'Gold', color: '#FFD700', min: 75 },
  SILVER: { name: 'Silver', color: '#C0C0C0', min: 50 },
  BRONZE: { name: 'Bronze', color: '#CD7F32', min: 0 },
};

function PhonicsLesson({ lesson }) {
  const [gameState, setGameState] = useState('activity'); // activity, validation, completed
  const [currentScore, setCurrentScore] = useState(null);
  const [validationAttempts, setValidationAttempts] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [reviewScores, setReviewScores] = useState([]);
  const [reviewActivityIndex, setReviewActivityIndex] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextLessonUrl = useDataStore(state => state.getNextLessonUrl);
  const disableStudyMode = useDataStore(state => state.disableStudyMode);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  // Map lesson number to phonics lesson
  const getPhonicsLessonNumber = () => {
    if (lesson?.title) {
      if (lesson.title.includes('Vowel Sound Recognition') && !lesson.title.includes('Initial')) {
        return 1;
      } else if (lesson.title.includes('Consonant Sound Recognition')) {
        return 2;
      } else if (lesson.title.includes('Consonant-Vowel Blending')) {
        return 3;
      } else if (lesson.title.includes('Vowel-Consonant Blending')) {
        return 4;
      } else if (lesson.title.includes('Sound-to-Letter Matching')) {
        return 5;
      } else if (lesson.title.includes('Initial Sound Identification')) {
        return 6;
      } else if (lesson.title.includes('CVC Word Construction')) {
        return 7;
      } else if (lesson.title.includes('Review and Consolidation')) {
        return 8;
      }
    }
    return (lesson?.lessonNumber || 1);
  };

  const phonicsLessonNumber = getPhonicsLessonNumber();
  const config = LESSON_CONFIGS[phonicsLessonNumber] || LESSON_CONFIGS[1];

  useEffect(() => {
    // Speak the instructions when the lesson loads
    const speakInstructions = async () => {
      try {
        if (config.type === 'vowel-recognition' || config.type === 'consonant-recognition') {
          await generalSpeak("Tap a letter to hear its sound!");
        } else if (config.type === 'cv-blending' || config.type === 'vc-blending') {
          await generalSpeak("Tap a blend to hear it!");
        } else if (config.type === 'sound-to-letter' || config.type === 'initial-sound') {
          await generalSpeak("Tap a picture to hear the starting sound!");
        }
      } catch (error) {
        console.error('Error speaking instructions:', error);
      }
    };

    // Add a small delay to ensure the component is fully rendered
    const timer = setTimeout(speakInstructions, 500);

    return () => {
      clearTimeout(timer);
      stopSpeech();
    };
  }, [lesson?.id, config.type]);

  // Effect to speak validation questions when they appear
  useEffect(() => {
    if (gameState === 'validation') {
      const speakValidationQuestion = async () => {
        let questionToSpeak = '';

        if (config.type === 'vowel-recognition' || config.type === 'consonant-recognition') {
          questionToSpeak = 'Which letter makes this sound?';
        } else if (config.type === 'cv-blending' || config.type === 'vc-blending') {
          questionToSpeak = 'Which blend matches this sound?';
        } else if (config.type === 'sound-to-letter' || config.type === 'initial-sound') {
          questionToSpeak = 'Which letter makes this sound?';
        } else if (config.type === 'cvc-construction') {
          questionToSpeak = 'Which word matches this spelling?';
        } else {
          questionToSpeak = 'Select the correct answer!';
        }

        try {
          await generalSpeak(questionToSpeak);
        } catch (error) {
          console.error('Error speaking validation question:', error);
        }
      };

      // Add a small delay to ensure the validation screen is rendered
      const timer = setTimeout(speakValidationQuestion, 300);

      return () => clearTimeout(timer);
    }
  }, [gameState, config.type]);

  const handleLetterClick = async (letter) => {
    // Stop any current speech first
    stopSpeech();
    await speakPhoneme(letter, { volume: 1.0, rate: 0.4, pitch: 1.2 }); // Slower rate for better clarity
  };

  const handleBlendClick = async (blend) => {
    // Stop any current speech first
    stopSpeech();
    await speakWordSlowlyThenBlended(blend, { volume: 1.0, rate: 0.5, pitch: 1.2 }); // Slower rate for better clarity
  };

  const handleContinue = () => {
    setGameState('validation');
    setValidationAttempts(0);
    generateValidation();
  };

  const generateValidation = () => {
    let answer;
    let options = [];

    switch (config.type) {
      case 'vowel-recognition':
        answer = config.letters[Math.floor(Math.random() * config.letters.length)];
        options = [answer, ...config.letters.filter(l => l !== answer)].slice(0, 3);
        options = options.sort(() => Math.random() - 0.5);
        setCorrectAnswer(answer);
        setTimeout(() => speakPhoneme(answer, { volume: 1.0, rate: 0.4 }), 500); // Slower rate for better clarity
        break;
      case 'consonant-recognition':
        answer = config.letters[Math.floor(Math.random() * config.letters.length)];
        options = [answer, ...config.letters.filter(l => l !== answer)].slice(0, 3);
        options = options.sort(() => Math.random() - 0.5);
        setCorrectAnswer(answer);
        setTimeout(() => speakPhoneme(answer, { volume: 1.0, rate: 0.4 }), 500); // Slower rate for better clarity
        break;
      case 'cv-blending':
        answer = config.blends[Math.floor(Math.random() * config.blends.length)];
        options = [answer, ...config.blends.filter(b => b !== answer)].slice(0, 3);
        options = options.sort(() => Math.random() - 0.5);
        setCorrectAnswer(answer);
        setTimeout(() => speakBlend(answer, { volume: 1.0 }), 500);
        break;
      case 'vc-blending':
        answer = config.blends[Math.floor(Math.random() * config.blends.length)];
        options = [answer, ...config.blends.filter(b => b !== answer)].slice(0, 3);
        options = options.sort(() => Math.random() - 0.5);
        setCorrectAnswer(answer);
        setTimeout(() => speakBlend(answer, { volume: 1.0 }), 500);
        break;
      case 'sound-to-letter':
        const item = config.items[Math.floor(Math.random() * config.items.length)];
        answer = item.letter;
        options = [item.letter, ...config.items.map(i => i.letter).filter(l => l !== item.letter)].slice(0, 3);
        options = options.sort(() => Math.random() - 0.5);
        setCorrectAnswer(answer);
        setTimeout(() => speakPhoneme(item.letter, { rate: 0.4 }), 500); // Slower rate for better clarity
        break;
      case 'initial-sound':
        const soundItem = config.items[Math.floor(Math.random() * config.items.length)];
        answer = soundItem.letter;
        options = [soundItem.letter, ...config.items.map(i => i.letter).filter(l => l !== soundItem.letter)].slice(0, 3);
        options = options.sort(() => Math.random() - 0.5);
        setCorrectAnswer(answer);
        setTimeout(() => speakPhoneme(soundItem.letter, { rate: 0.4 }), 500); // Slower rate for better clarity
        break;
      case 'cvc-construction':
        const word = config.words[Math.floor(Math.random() * config.words.length)];
        answer = word;
        options = [word, ...config.words.filter(w => w !== word)].slice(0, 3);
        options = options.sort(() => Math.random() - 0.5);
        setCorrectAnswer(answer);
        setTimeout(() => speakBlend(word), 500);
        break;
    }
  };

  const handleValidationAnswer = (option) => {
    // Prevent multiple clicks
    if (gameState === 'completed') {
      return;
    }

    const isCorrect = option === correctAnswer;
    const newAttempts = validationAttempts + 1;
    setValidationAttempts(newAttempts);

    if (isCorrect) {
      const score = getScore(newAttempts);
      if (phonicsLessonNumber === 8) {
        // Review lesson - track score and continue
        setReviewScores(prev => [...prev, score]);
        const nextIndex = reviewActivityIndex + 1;
        setReviewActivityIndex(nextIndex);
        if (nextIndex >= config.activities.length) {
          showReviewResults();
        } else {
          // Reset for next activity after a delay
          setTimeout(() => {
            setGameState('activity');
            setValidationAttempts(0);
            setCorrectAnswer(null);
          }, 1500);
        }
      } else {
        // Regular lesson - show completion screen
        completeLesson(score);
      }
    } else {
      if (newAttempts >= 3) {
        const score = SCORE_TIERS.FAIL;
        if (phonicsLessonNumber === 8) {
          setReviewScores(prev => [...prev, score]);
          const nextIndex = reviewActivityIndex + 1;
          setReviewActivityIndex(nextIndex);
          if (nextIndex >= config.activities.length) {
            showReviewResults();
          } else {
            // Reset for next activity after a delay
            setTimeout(() => {
              setGameState('activity');
              setValidationAttempts(0);
              setCorrectAnswer(null);
            }, 1500);
          }
        } else {
          // Regular lesson - show completion screen
          completeLesson(score);
        }
      }
      // If wrong but still have attempts, just update attempts counter
      // The validation screen will continue to show
    }
  };

  const getScore = (attempts) => {
    if (attempts === 1) return SCORE_TIERS.PLATINUM;
    if (attempts === 2) return SCORE_TIERS.GOLD;
    if (attempts === 3) return SCORE_TIERS.SILVER;
    return SCORE_TIERS.FAIL;
  };

  const completeLesson = (score) => {
    setGameState('completed');
    setCurrentScore(score);
    if (lesson) {
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
        score: score === SCORE_TIERS.PLATINUM ? 100 : score === SCORE_TIERS.GOLD ? 90 : score === SCORE_TIERS.SILVER ? 75 : score === SCORE_TIERS.BRONZE ? 50 : 0,
      });
      addProgress(progress).then(() => {
        saveData();
      }).catch(err => {
        console.error('Error saving progress:', err);
      });
    }
  };

  const showReviewResults = () => {
    setGameState('completed');
    const totalTasks = reviewScores.length;
    const correctTasks = reviewScores.filter(s => s !== SCORE_TIERS.FAIL).length;
    const accuracy = totalTasks > 0 ? (correctTasks / totalTasks) * 100 : 0;

    let tier;
    if (accuracy >= 90) tier = REVIEW_TIERS.PLATINUM;
    else if (accuracy >= 75) tier = REVIEW_TIERS.GOLD;
    else if (accuracy >= 50) tier = REVIEW_TIERS.SILVER;
    else tier = REVIEW_TIERS.BRONZE;

    setCurrentScore(tier);

    if (lesson) {
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
        score: accuracy,
      });
      addProgress(progress).then(() => {
        saveData();
      });
    }
  };

  const renderActivity = () => {
    switch (config.type) {
      case 'vowel-recognition':
      case 'consonant-recognition':
        return (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '32px', color: '#333', margin: 0, marginRight: '20px' }}>
                Tap a letter to hear its sound!
              </h2>
              <button
                onClick={async () => {
                  stopSpeech();
                  await generalSpeak("Tap a letter to hear its sound!");
                }}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Repeat instructions"
              >
                🔊
              </button>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              flexWrap: 'wrap',
              marginBottom: '40px'
            }}>
              {config.letters.map((letter, index) => (
                <button
                  key={index}
                  onClick={() => handleLetterClick(letter)}
                  onTouchStart={() => handleLetterClick(letter)}
                  style={{
                    width: '150px',
                    height: '150px',
                    fontSize: '100px',
                    fontWeight: 'bold',
                    color: '#333',
                    backgroundColor: '#fff',
                    border: '4px solid #4CAF50',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.backgroundColor = '#e8f5e9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = '#fff';
                  }}
                >
                  {letter.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={handleContinue}
              style={{
                padding: '15px 40px',
                fontSize: '24px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
            >
              Continue →
            </button>
          </div>
        );

      case 'cv-blending':
      case 'vc-blending':
        return (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '32px', color: '#333', margin: 0, marginRight: '20px' }}>
                Tap a blend to hear it!
              </h2>
              <button
                onClick={async () => {
                  stopSpeech();
                  await generalSpeak("Tap a blend to hear it!");
                }}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Repeat instructions"
              >
                🔊
              </button>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              flexWrap: 'wrap',
              marginBottom: '40px'
            }}>
              {config.blends.map((blend, index) => (
                <button
                  key={index}
                  onClick={() => handleBlendClick(blend)}
                  onTouchStart={() => handleBlendClick(blend)}
                  style={{
                    width: '180px',
                    height: '120px',
                    fontSize: '80px',
                    fontWeight: 'bold',
                    color: '#333',
                    backgroundColor: '#fff',
                    border: '4px solid #2196F3',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.backgroundColor = '#e3f2fd';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = '#fff';
                  }}
                >
                  {blend.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={handleContinue}
              style={{
                padding: '15px 40px',
                fontSize: '24px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
            >
              Continue →
            </button>
          </div>
        );

      case 'sound-to-letter':
        return (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '32px', color: '#333', margin: 0, marginRight: '20px' }}>
                Tap a picture to hear the starting sound!
              </h2>
              <button
                onClick={async () => {
                  stopSpeech();
                  await generalSpeak("Tap a picture to hear the starting sound!");
                }}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#FF9800',
                  color: 'white',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Repeat instructions"
              >
                🔊
              </button>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              flexWrap: 'wrap',
              marginBottom: '40px'
            }}>
              {config.items.map((item, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => handleLetterClick(item.letter)}
                    onTouchStart={() => handleLetterClick(item.letter)}
                    style={{
                      width: '200px',
                      height: '200px',
                      fontSize: '100px',
                      backgroundColor: '#fff',
                      border: '4px solid #FF9800',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                      marginBottom: '10px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.backgroundColor = '#fff3e0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.backgroundColor = '#fff';
                    }}
                  >
                    {item.image}
                  </button>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
                    {item.word.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleContinue}
              style={{
                padding: '15px 40px',
                fontSize: '24px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
            >
              Continue →
            </button>
          </div>
        );

      case 'initial-sound':
        const currentItem = config.items[Math.floor(Math.random() * config.items.length)];
        return (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '32px', color: '#333', margin: 0, marginRight: '20px' }}>
                Which sound does this start with?
              </h2>
              <button
                onClick={async () => {
                  stopSpeech();
                  await generalSpeak("Which sound does this start with?");
                }}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#FF9800',
                  color: 'white',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Repeat instructions"
              >
                🔊
              </button>
            </div>
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '120px', marginBottom: '20px' }}>{currentItem.image}</div>
              <div style={{ fontSize: '40px', fontWeight: 'bold', color: '#333' }}>
                {currentItem.word.toUpperCase()}
              </div>
            </div>
            <button
              onClick={handleContinue}
              style={{
                padding: '15px 40px',
                fontSize: '24px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
            >
              Continue →
            </button>
          </div>
        );

      case 'cvc-construction':
        const currentWord = config.words[Math.floor(Math.random() * config.words.length)];
        const wordLetters = currentWord.split('').sort(() => Math.random() - 0.5);
        return (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '32px', color: '#333', margin: 0, marginRight: '20px' }}>
                Build the word: {currentWord.toUpperCase()}
              </h2>
              <button
                onClick={async () => {
                  stopSpeech();
                  await generalSpeak(`Build the word: ${currentWord.toUpperCase()}`);
                }}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#9C27B0',
                  color: 'white',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Repeat instructions"
              >
                🔊
              </button>
            </div>
            <div style={{ marginBottom: '30px' }}>
              <div style={{ fontSize: '60px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
                {selectedLetters.join('').toUpperCase() || '_ _ _'}
              </div>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap',
              marginBottom: '40px'
            }}>
              {wordLetters.map((letter, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (selectedLetters.length < currentWord.length) {
                      setSelectedLetters([...selectedLetters, letter]);
                    }
                  }}
                  disabled={selectedLetters.includes(letter) && selectedLetters.filter(l => l === letter).length >= currentWord.split('').filter(l => l === letter).length}
                  style={{
                    width: '100px',
                    height: '100px',
                    fontSize: '60px',
                    fontWeight: 'bold',
                    color: '#333',
                    backgroundColor: selectedLetters.includes(letter) ? '#ccc' : '#fff',
                    border: '4px solid #9C27B0',
                    borderRadius: '15px',
                    cursor: selectedLetters.includes(letter) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    opacity: selectedLetters.includes(letter) ? 0.5 : 1,
                  }}
                >
                  {letter.toUpperCase()}
                </button>
              ))}
            </div>
            <div style={{ marginBottom: '20px' }}>
              <button
                onClick={() => setSelectedLetters([])}
                style={{
                  padding: '10px 20px',
                  fontSize: '18px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              >
                Clear
              </button>
              <button
                onClick={() => {
                  if (selectedLetters.join('') === currentWord) {
                    handleContinue();
                  } else {
                    alert('Try again! Make sure the word is correct.');
                  }
                }}
                style={{
                  padding: '10px 20px',
                  fontSize: '18px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Check
              </button>
            </div>
          </div>
        );

      default:
        return <div>Unknown activity type</div>;
    }
  };

  const renderValidation = () => {
    let questionText = '';
    let displayItem = null;

    // Set appropriate question text based on activity type
    if (config.type === 'vowel-recognition' || config.type === 'consonant-recognition') {
      questionText = 'Which letter makes this sound?';
    } else if (config.type === 'cv-blending' || config.type === 'vc-blending') {
      questionText = 'Which blend matches this sound?';
    } else if (config.type === 'sound-to-letter' || config.type === 'initial-sound') {
      const item = config.items.find(i => i.letter === correctAnswer) || config.items[0];
      displayItem = item;
      questionText = 'Which letter makes this sound?';
    } else if (config.type === 'cvc-construction') {
      questionText = 'Which word matches this spelling?';
    } else {
      questionText = 'Select the correct answer!';
    }

    const options = [];
    if (config.type === 'vowel-recognition' || config.type === 'consonant-recognition') {
      const answer = correctAnswer;
      const allOptions = [answer, ...config.letters.filter(l => l !== answer)].slice(0, 3);
      options.push(...allOptions.sort(() => Math.random() - 0.5));
    } else if (config.type === 'cv-blending' || config.type === 'vc-blending') {
      const answer = correctAnswer;
      const allOptions = [answer, ...config.blends.filter(b => b !== answer)].slice(0, 3);
      options.push(...allOptions.sort(() => Math.random() - 0.5));
    } else if (config.type === 'sound-to-letter' || config.type === 'initial-sound') {
      const answer = correctAnswer;
      const allOptions = [answer, ...config.items.map(i => i.letter).filter(l => l !== answer)].slice(0, 3);
      options.push(...allOptions.sort(() => Math.random() - 0.5));
    } else if (config.type === 'cvc-construction') {
      const answer = correctAnswer;
      const allOptions = [answer, ...config.words.filter(w => w !== answer)].slice(0, 3);
      options.push(...allOptions.sort(() => Math.random() - 0.5));
    }

    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', color: '#333', margin: 0, marginRight: '20px' }}>
            {questionText}
          </h2>
          <button
            onClick={async () => {
              stopSpeech();
              await generalSpeak(questionText);
            }}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: '#9E9E9E',
              color: 'white',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Repeat question"
          >
            🔊
          </button>
        </div>
        {displayItem && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{ fontSize: '100px', marginBottom: '20px' }}>{displayItem.image}</div>
            {config.type === 'initial-sound' && (
              <div style={{ fontSize: '40px', fontWeight: 'bold', color: '#333' }}>
                {displayItem.word.toUpperCase()}
              </div>
            )}
          </div>
        )}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          flexWrap: 'wrap',
          marginBottom: '20px'
        }}>
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleValidationAnswer(option)}
              onTouchStart={() => handleValidationAnswer(option)}
              style={{
                width: '150px',
                height: '150px',
                fontSize: '80px',
                fontWeight: 'bold',
                color: '#333',
                backgroundColor: '#fff',
                border: '4px solid #2196F3',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.backgroundColor = '#e3f2fd';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#fff';
              }}
            >
              {typeof option === 'string' ? option.toUpperCase() : option}
            </button>
          ))}
        </div>
        <div style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Attempts: {validationAttempts} / 3
        </div>
      </div>
    );
  };

  if (gameState === 'completed' && currentScore) {
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
        padding: '40px'
      }}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>🎉</div>
        <h2 style={{ color: currentScore.color, fontSize: '48px', marginBottom: '20px', margin: '0 0 20px 0' }}>
          {currentScore.name} Medal!
        </h2>
        {phonicsLessonNumber === 8 && reviewScores.length > 0 && (
          <div style={{ marginBottom: '20px', fontSize: '24px', color: '#333' }}>
            Accuracy: {((reviewScores.filter(s => s !== SCORE_TIERS.FAIL).length / reviewScores.length) * 100).toFixed(0)}%
          </div>
        )}
        <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
          <button
            onClick={() => {
              // Navigate back to lessons list
              navigate(`/lessons?subjectId=${lesson.subjectId}`);
            }}
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
            onClick={() => {
              const { url, shouldDisableStudyMode } = getNextLessonUrl(lesson);
              if (shouldDisableStudyMode) {
                disableStudyMode();
              }
              navigate(url);
            }}
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
    }}>
      {gameState === 'activity' && renderActivity()}
      {gameState === 'validation' && renderValidation()}
    </div>
  );
}

export default PhonicsLesson;

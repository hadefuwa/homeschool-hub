import React, { useState, useEffect } from 'react';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, stop } from '../utils/textToSpeech';
import { useNavigate } from 'react-router-dom';

const SPELLING_WORDS = [
    { word: "apple", hint: "A red or green fruit" },
    { word: "happy", hint: "Opposite of sad" },
    { word: "dance", hint: "Moving to music" },
    { word: "bright", hint: "Lots of light" },
    { word: "friend", hint: "Someone you play with" },
    { word: "school", hint: "A place to learn" },
    { word: "garden", hint: "Where plants grow" },
    { word: "window", hint: "Look through this to see outside" },
    { word: "summer", hint: "The hottest season" },
    { word: "winter", hint: "The coldest season" }
];

function SpellingGame({ lesson }) {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentSpelling, setCurrentSpelling] = useState("");
    const [scrambledLetters, setScrambledLetters] = useState([]);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const addProgress = useDataStore(state => state.addProgress);
    const getUserId = useDataStore(state => state.getUserId);
    const getNextProgressId = useDataStore(state => state.getNextProgressId);
    const saveData = useDataStore(state => state.saveData);
    const getNextLessonUrl = useDataStore(state => state.getNextLessonUrl);

    useEffect(() => {
        setupWord();
        speakIntro();
        return () => stop();
    }, [currentIndex]);

    const setupWord = () => {
        const word = SPELLING_WORDS[currentIndex].word;
        const letters = word.split('').sort(() => Math.random() - 0.5);
        setScrambledLetters(letters);
        setCurrentSpelling("");
        setFeedback(null);
    };

    const speakIntro = () => {
        speak(`Spell the word: ${SPELLING_WORDS[currentIndex].word}. Hint: ${SPELLING_WORDS[currentIndex].hint}`, { rate: 0.9 });
    };

    const handleLetterClick = (letter, index) => {
        if (feedback === 'correct') return;

        const nextSpelling = currentSpelling + letter;
        setCurrentSpelling(nextSpelling);

        // Remove the letter from scrambled
        const nextScrambled = [...scrambledLetters];
        nextScrambled.splice(index, 1);
        setScrambledLetters(nextScrambled);

        if (nextSpelling === SPELLING_WORDS[currentIndex].word) {
            setFeedback('correct');
            setScore(s => s + 10);
            speak(`Great job! You spelled ${nextSpelling}!`, { rate: 1.0 });

            setTimeout(() => {
                if (currentIndex < SPELLING_WORDS.length - 1) {
                    setCurrentIndex(i => i + 1);
                } else {
                    endGame();
                }
            }, 2000);
        } else if (!SPELLING_WORDS[currentIndex].word.startsWith(nextSpelling)) {
            setFeedback('incorrect');
            speak(`Wait, that doesn't look right. Try again!`, { rate: 1.0 });
            setTimeout(() => {
                setupWord();
            }, 1000);
        }
    };

    const endGame = () => {
        setIsGameOver(true);
        if (lesson) {
            const finalScore = (score / (SPELLING_WORDS.length * 10)) * 100;
            const progress = new Progress({
                id: getNextProgressId(),
                studentId: getUserId(),
                activityType: 'Lesson',
                activityId: lesson.id,
                yearId: lesson.yearId,
                subjectId: lesson.subjectId,
                lessonNumber: lesson.lessonNumber,
                isCompleted: true,
                completedAt: new Date(),
                score: finalScore,
            });
            addProgress(progress).then(() => saveData());
        }
    };

    const getMedal = () => {
        const percentage = (score / (SPELLING_WORDS.length * 10)) * 100;
        if (percentage >= 95) return { type: 'Platinum', color: '#E5E4E2', emoji: '🏆' };
        if (percentage >= 85) return { type: 'Gold', color: '#FFD700', emoji: '🥇' };
        if (percentage >= 70) return { type: 'Silver', color: '#C0C0C0', emoji: '🥈' };
        return { type: 'Bronze', color: '#CD7F32', emoji: '🥉' };
    };

    if (isGameOver) {
        const medal = getMedal();
        return (
            <div style={styles.container}>
                <div style={styles.gameOverCard}>
                    <div style={styles.medalEmoji}>{medal.emoji}</div>
                    <h2 style={{ ...styles.medalTitle, color: medal.color }}>{medal.type} Medal!</h2>
                    <div style={styles.finalScore}>Total Score: {score}</div>
                    <div style={styles.buttonGroup}>
                        <button onClick={() => navigate('/lessons')} style={styles.secondaryButton}>Back to Lessons</button>
                        <button onClick={() => { const { url } = getNextLessonUrl(lesson); navigate(url); }} style={styles.primaryButton}>Next Lesson →</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.glassCard}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Spelling Safari</h2>
                    <div style={styles.scoreBar}>Points: <span style={styles.scoreValue}>{score}</span></div>
                </div>

                <div style={styles.hintArea}>
                    <div style={styles.hintLabel}>Hint:</div>
                    <div style={styles.hintText}>{SPELLING_WORDS[currentIndex].hint}</div>
                </div>

                <div style={styles.spellingArea}>
                    {SPELLING_WORDS[currentIndex].word.split('').map((_, i) => (
                        <div key={i} style={{
                            ...styles.letterSlot,
                            borderBottomColor: currentSpelling[i] ? '#4CAF50' : 'white',
                            color: currentSpelling[i] ? '#FFEB3B' : 'transparent'
                        }}>
                            {currentSpelling[i] || '_'}
                        </div>
                    ))}
                </div>

                <div style={styles.lettersGrid}>
                    {scrambledLetters.map((letter, i) => (
                        <button
                            key={`${letter}-${i}`}
                            onClick={() => handleLetterClick(letter, i)}
                            style={styles.letterButton}
                        >
                            {letter}
                        </button>
                    ))}
                </div>

                <div style={styles.progress}>
                    Word {currentIndex + 1} of {SPELLING_WORDS.length}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '600px',
        padding: '30px',
        background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        borderRadius: '20px'
    },
    glassCard: {
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(15px)',
        borderRadius: '40px',
        padding: '50px',
        width: '100%',
        maxWidth: '800px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        textAlign: 'center',
        color: '#2d3436'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px'
    },
    title: { fontSize: '36px', margin: 0, fontWeight: '900', color: '#2d3436' },
    scoreBar: { fontSize: '24px', fontWeight: '800' },
    scoreValue: { color: '#00b894' },
    hintArea: {
        marginBottom: '30px',
        padding: '20px',
        background: 'rgba(255,255,255,0.4)',
        borderRadius: '15px'
    },
    hintLabel: { fontSize: '14px', textTransform: 'uppercase', fontWeight: 'bold', color: '#636e72' },
    hintText: { fontSize: '24px', fontWeight: '600' },
    spellingArea: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '50px'
    },
    letterSlot: {
        fontSize: '48px',
        fontWeight: '900',
        width: '50px',
        textAlign: 'center',
        borderBottom: '4px solid white',
        paddingBottom: '5px',
        transition: 'all 0.3s'
    },
    lettersGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '15px'
    },
    letterButton: {
        width: '70px',
        height: '70px',
        fontSize: '32px',
        fontWeight: '800',
        border: 'none',
        borderRadius: '15px',
        background: 'white',
        color: '#2d3436',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.1)'
        }
    },
    progress: { marginTop: '40px', fontSize: '18px', fontWeight: '600', color: '#636e72' },
    gameOverCard: {
        background: 'white',
        padding: '60px',
        borderRadius: '40px',
        textAlign: 'center',
        boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
        maxWidth: '500px',
        width: '100%',
        color: '#333'
    },
    medalEmoji: { fontSize: '120px', marginBottom: '20px' },
    medalTitle: { fontSize: '48px', margin: '10px 0', fontWeight: '900' },
    finalScore: { fontSize: '28px', color: '#666', marginBottom: '40px' },
    buttonGroup: { display: 'flex', gap: '20px', justifyContent: 'center' },
    primaryButton: { padding: '15px 30px', fontSize: '18px', fontWeight: '700', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '15px', cursor: 'pointer' },
    secondaryButton: { padding: '15px 30px', fontSize: '18px', fontWeight: '700', backgroundColor: '#f8f9fa', color: '#333', border: '2px solid #ddd', borderRadius: '15px', cursor: 'pointer' }
};

export default SpellingGame;

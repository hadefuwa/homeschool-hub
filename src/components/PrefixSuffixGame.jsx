import React, { useState, useEffect } from 'react';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, stop } from '../utils/textToSpeech';
import { useNavigate } from 'react-router-dom';

const GAME_MODES = {
    PREFIX: 'prefix',
    SUFFIX: 'suffix'
};

const PREFIX_DATA = [
    { prefix: "un", root: "happy", full: "unhappy", meaning: "not happy" },
    { prefix: "re", root: "play", full: "replay", meaning: "play again" },
    { prefix: "pre", root: "view", full: "preview", meaning: "view before" },
    { prefix: "mis", root: "take", full: "mistake", meaning: "wrong take" },
    { prefix: "dis", root: "like", full: "dislike", meaning: "not like" },
    { prefix: "im", root: "possible", full: "impossible", meaning: "not possible" },
    { prefix: "bi", root: "cycle", full: "bicycle", meaning: "two cycles" },
    { prefix: "tri", root: "angle", full: "triangle", meaning: "three angles" }
];

const SUFFIX_DATA = [
    { root: "help", suffix: "ful", full: "helpful", meaning: "full of help" },
    { root: "care", suffix: "less", full: "careless", meaning: "without care" },
    { root: "slow", suffix: "ly", full: "slowly", meaning: "in a slow way" },
    { root: "walk", suffix: "ed", full: "walked", meaning: "past of walk" },
    { root: "play", suffix: "ing", full: "playing", meaning: "currently playing" },
    { root: "teach", suffix: "er", full: "teacher", meaning: "one who teaches" },
    { root: "dark", suffix: "ness", full: "darkness", meaning: "state of being dark" },
    { root: "act", suffix: "ion", full: "action", meaning: "process of acting" }
];

function PrefixSuffixGame({ lesson }) {
    const navigate = useNavigate();
    const mode = lesson?.assessmentType === 'suffix-game' ? GAME_MODES.SUFFIX : GAME_MODES.PREFIX;
    const data = mode === GAME_MODES.PREFIX ? PREFIX_DATA : SUFFIX_DATA;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const addProgress = useDataStore(state => state.addProgress);
    const getUserId = useDataStore(state => state.getUserId);
    const getNextProgressId = useDataStore(state => state.getNextProgressId);
    const saveData = useDataStore(state => state.saveData);
    const getNextLessonUrl = useDataStore(state => state.getNextLessonUrl);

    useEffect(() => {
        setupGame();
        speakIntro();
        return () => stop();
    }, [currentIndex]);

    const setupGame = () => {
        const item = data[currentIndex];
        const correctPart = mode === GAME_MODES.PREFIX ? item.prefix : item.suffix;

        // Generate options
        const allParts = data.map(i => mode === GAME_MODES.PREFIX ? i.prefix : i.suffix);
        const uniqueParts = [...new Set(allParts)].filter(p => p !== correctPart);
        const randomOthers = uniqueParts.sort(() => Math.random() - 0.5).slice(0, 3);
        const shuffledOptions = [correctPart, ...randomOthers].sort(() => Math.random() - 0.5);

        setOptions(shuffledOptions);
        setFeedback(null);
        setSelectedOption(null);
    };

    const speakIntro = () => {
        const item = data[currentIndex];
        if (mode === GAME_MODES.PREFIX) {
            speak(`Which prefix goes with ${item.root} to make ${item.full}? It means ${item.meaning}.`, { rate: 0.9 });
        } else {
            speak(`Which suffix goes with ${item.root} to make ${item.full}? It means ${item.meaning}.`, { rate: 0.9 });
        }
    };

    const handleOptionClick = (option) => {
        if (feedback) return;
        setSelectedOption(option);

        const item = data[currentIndex];
        const correctPart = mode === GAME_MODES.PREFIX ? item.prefix : item.suffix;

        if (option === correctPart) {
            setFeedback('correct');
            setScore(s => s + 10);
            speak(`Excellent! ${item.full} means ${item.meaning}!`, { rate: 1.0 });

            setTimeout(() => {
                if (currentIndex < data.length - 1) {
                    setCurrentIndex(i => i + 1);
                } else {
                    endGame();
                }
            }, 2000);
        } else {
            setFeedback('incorrect');
            speak(`Not quite. Try a different one!`, { rate: 1.0 });
            setTimeout(() => {
                setFeedback(null);
                setSelectedOption(null);
            }, 1000);
        }
    };

    const endGame = () => {
        setIsGameOver(true);
        if (lesson) {
            const finalScore = (score / (data.length * 10)) * 100;
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
        const percentage = (score / (data.length * 10)) * 100;
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

    const currentItem = data[currentIndex];

    return (
        <div style={styles.container}>
            <div style={styles.glassCard}>
                <div style={styles.header}>
                    <h2 style={styles.title}>{mode === GAME_MODES.PREFIX ? 'Prefix Power' : 'Suffix Superstars'}</h2>
                    <div style={styles.scoreBar}>Points: <span style={styles.scoreValue}>{score}</span></div>
                </div>

                <div style={styles.meaningArea}>
                    <div style={styles.meaningLabel}>Definition:</div>
                    <div style={styles.meaningText}>{currentItem.meaning}</div>
                </div>

                <div style={styles.wordBuilding}>
                    {mode === GAME_MODES.PREFIX ? (
                        <>
                            <div style={styles.blankBox}>{selectedOption || '?'}</div>
                            <div style={styles.plus}>+</div>
                            <div style={styles.rootBox}>{currentItem.root}</div>
                        </>
                    ) : (
                        <>
                            <div style={styles.rootBox}>{currentItem.root}</div>
                            <div style={styles.plus}>+</div>
                            <div style={styles.blankBox}>{selectedOption || '?'}</div>
                        </>
                    )}
                    <div style={styles.equals}>=</div>
                    <div style={styles.fullWord}>{feedback === 'correct' ? currentItem.full : '___?___'}</div>
                </div>

                <div style={styles.optionsArea}>
                    {options.map(option => (
                        <button
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            style={{
                                ...styles.optionButton,
                                backgroundColor: selectedOption === option
                                    ? (feedback === 'correct' ? '#4CAF50' : '#f44336')
                                    : 'white',
                                color: selectedOption === option ? 'white' : '#333'
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                <div style={styles.progress}>
                    Challenge {currentIndex + 1} of {data.length}
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px'
    },
    glassCard: {
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(15px)',
        borderRadius: '40px',
        padding: '50px',
        width: '100%',
        maxWidth: '850px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        textAlign: 'center',
        color: 'white'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px'
    },
    title: { fontSize: '36px', margin: 0, fontWeight: '900' },
    scoreBar: { fontSize: '24px', fontWeight: '800' },
    scoreValue: { color: '#FFEB3B' },
    meaningArea: {
        marginBottom: '40px',
        padding: '20px',
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '20px'
    },
    meaningLabel: { fontSize: '14px', textTransform: 'uppercase', opacity: 0.8, fontWeight: 'bold' },
    meaningText: { fontSize: '28px', fontWeight: '700' },
    wordBuilding: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '50px',
        flexWrap: 'wrap'
    },
    rootBox: {
        padding: '20px 40px',
        background: 'white',
        color: '#333',
        borderRadius: '20px',
        fontSize: '36px',
        fontWeight: '900'
    },
    blankBox: {
        padding: '20px 40px',
        background: 'rgba(255,255,255,0.1)',
        border: '3px dashed white',
        borderRadius: '20px',
        fontSize: '36px',
        fontWeight: '900',
        minWidth: '120px'
    },
    plus: { fontSize: '40px', fontWeight: '900' },
    equals: { fontSize: '40px', fontWeight: '900' },
    fullWord: {
        padding: '20px 40px',
        background: '#4CAF50',
        color: 'white',
        borderRadius: '20px',
        fontSize: '36px',
        fontWeight: '900',
        minWidth: '200px'
    },
    optionsArea: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        width: '100%'
    },
    optionButton: {
        padding: '20px',
        fontSize: '28px',
        fontWeight: '800',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        boxShadow: '0 8px 15px rgba(0,0,0,0.2)',
        transition: 'transform 0.2s'
    },
    progress: { marginTop: '40px', fontSize: '18px', opacity: 0.8 },
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

export default PrefixSuffixGame;

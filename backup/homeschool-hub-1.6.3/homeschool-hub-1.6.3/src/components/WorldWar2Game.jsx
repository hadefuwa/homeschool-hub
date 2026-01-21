import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, stop } from '../utils/textToSpeech';

const WWII_LEVELS = [
    {
        id: 'outbreak',
        title: 'Turning Point 1: The Outbreak',
        description: 'September 1, 1939. Germany invades Poland using "Blitzkrieg" (Lightning War). Which event officially brought Britain and France into the war?',
        options: [
            { text: 'The Japanese attack on Pearl Harbor', correct: false },
            { text: 'The signing of the Munich Agreement', correct: false },
            { text: 'Honoring defensive alliances with Poland', correct: true },
            { text: 'The fall of Paris', correct: false }
        ],
        explanation: 'Britain and France had pledged to protect Poland. When Germany refused to withdraw, they declared war on September 3, 1939.'
    },
    {
        id: 'battle_of_britain',
        title: 'Turning Point 2: The Battle of Britain',
        description: '1940. The German Luftwaffe attempts to destroy the RAF. What secret technology gave British pilots a vital advantage?',
        options: [
            { text: 'Jet Engines', correct: false },
            { text: 'Radar (Radio Detection and Ranging)', correct: true },
            { text: 'Submarines (U-Boats)', correct: false },
            { text: 'Atomic energy', correct: false }
        ],
        explanation: 'Radar allowed the RAF to detect incoming German bombers before they reached the coast, giving them time to scramble fighters.'
    },
    {
        id: 'pacific',
        title: 'Turning Point 3: War in the Pacific',
        description: 'December 7, 1941. Japan attacks Pearl Harbor. What was the immediate global consequence of this strike?',
        options: [
            { text: 'China surrendered immediately', correct: false },
            { text: 'The United States entered the war as an Allied Power', correct: true },
            { text: 'Italy switched sides to join the Allies', correct: false },
            { text: 'Germany apologized and stopped fighting', correct: false }
        ],
        explanation: 'The attack brought the massive industrial and military power of the United States into the conflict on the side of Britain and the Soviet Union.'
    },
    {
        id: 'stalingrad',
        title: 'Turning Point 4: The Russian Front',
        description: '1942-1943. The Battle of Stalingrad was the bloodiest in history. What "General" did the Soviet Union rely on to defeat the German army?',
        options: [
            { text: 'General Eisenhower', correct: false },
            { text: 'General Montgomery', correct: false },
            { text: 'General Winter (Extreme weather & supply issues)', correct: true },
            { text: 'General de Gaulle', correct: false }
        ],
        explanation: 'The extreme Russian winter and overstretched supply lines proved fatal for the German army, marking the beginning of their retreat.'
    },
    {
        id: 'dday',
        title: 'Turning Point 5: Operation Overlord',
        description: 'June 6, 1944. The largest seaborne invasion in history. Where did the Allied forces land to begin liberating Europe?',
        options: [
            { text: 'The beaches of Sicily', correct: false },
            { text: 'The port of Hamburg', correct: false },
            { text: 'The beaches of Normandy, France', correct: true },
            { text: 'The cliffs of Dover', correct: false }
        ],
        explanation: 'D-Day established a "Second Front" in Europe, forcing Germany to fight on multiple sides and leading to the eventual liberation of Paris and the fall of Berlin.'
    }
];

function WorldWar2Game({ lesson }) {
    const navigate = useNavigate();
    const addProgress = useDataStore(state => state.addProgress);
    const getNextProgressId = useDataStore(state => state.getNextProgressId);
    const getUserId = useDataStore(state => state.getUserId);
    const saveData = useDataStore(state => state.saveData);

    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [gameState, setGameState] = useState('intro'); // 'intro', 'question', 'feedback', 'complete'
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);

    useEffect(() => {
        return () => stop();
    }, []);

    const startLevel = () => {
        setGameState('question');
        setSelectedOption(null);
        setShowExplanation(false);
        const level = WWII_LEVELS[currentLevelIndex];
        speak(level.title + ". " + level.description, { rate: 0.9 });
    };

    const handleOptionClick = (option) => {
        if (selectedOption) return;
        setSelectedOption(option);
        setShowExplanation(true);

        if (option.correct) {
            setScore(prev => prev + 20);
            speak("Correct strategy. " + WWII_LEVELS[currentLevelIndex].explanation);
        } else {
            speak("Historical error. " + WWII_LEVELS[currentLevelIndex].explanation);
        }
    };

    const nextLevel = () => {
        if (currentLevelIndex < WWII_LEVELS.length - 1) {
            setCurrentLevelIndex(prev => prev + 1);
            setGameState('question');
            setSelectedOption(null);
            setShowExplanation(false);
            const level = WWII_LEVELS[currentLevelIndex + 1]; // This is wrong because of state update lag, but startLevel handles it
        } else {
            finishGame();
        }
    };

    useEffect(() => {
        if (gameState === 'question') {
            const level = WWII_LEVELS[currentLevelIndex];
            speak(level.title + ". " + level.description, { rate: 0.95 });
        }
    }, [currentLevelIndex, gameState]);

    const finishGame = async () => {
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
                score: score,
            });
            await addProgress(progress);
            saveData();
        }
        setGameState('complete');
    };

    const currentLevel = WWII_LEVELS[currentLevelIndex];

    return (
        <div style={containerStyle}>
            {gameState === 'intro' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '80px', marginBottom: '20px' }}>🌍 🪖</div>
                    <h1 style={{ color: '#1B5E20' }}>World War II: Global Strategy</h1>
                    <p style={{ fontSize: '18px', lineHeight: 1.6, maxWidth: '600px' }}>
                        The Second World War was a conflict of unprecedented scale and complexity. You must analyze key turning points and identify the decisions that shaped the global outcome.
                    </p>
                    <button onClick={startLevel} style={buttonStyle('#1B5E20')}>Engage Analysis</button>
                </div>
            )}

            {gameState === 'question' && (
                <div style={cardStyle}>
                    <h2 style={{ color: '#2E7D32' }}>{currentLevel.title}</h2>
                    <p style={{ fontSize: '18px', margin: '20px 0', color: '#37474F' }}>{currentLevel.description}</p>

                    <div style={optionGrid}>
                        {currentLevel.options.map((option, idx) => (
                            <button
                                key={idx}
                                disabled={selectedOption !== null}
                                onClick={() => handleOptionClick(option)}
                                style={optionButtonStyle(selectedOption, option)}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>

                    {showExplanation && (
                        <div style={explanationBox}>
                            <p>{currentLevel.explanation}</p>
                            <button onClick={nextLevel} style={buttonStyle('#2E7D32', '100%')}>
                                {currentLevelIndex < WWII_LEVELS.length - 1 ? 'Next Turning Point' : 'Final Report'}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {gameState === 'complete' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '100px', marginBottom: '20px' }}>🎖️</div>
                    <h1>Strategic Intelligence Confirmed</h1>
                    <p style={{ fontSize: '20px' }}>You have analyzed the critical events of World War II with high accuracy.</p>
                    <div style={scoreBadge}>Strategic Accuracy: {score}%</div>
                    <button onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)} style={buttonStyle('#1B5E20')}>Return to Command</button>
                </div>
            )}
        </div>
    );
}

const containerStyle = {
    width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    background: '#E8F5E9', borderRadius: '24px', padding: '30px', overflow: 'hidden'
};

const cardStyle = {
    background: 'white', borderRadius: '30px', padding: '40px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', maxWidth: '800px', width: '100%', border: '2px solid #A5D6A7'
};

const optionGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', width: '100%', marginTop: '20px' };

const optionButtonStyle = (selected, option) => {
    let bg = 'white';
    let color = '#2E7D32';
    let border = '2px solid #A5D6A7';

    if (selected) {
        if (option.correct) {
            bg = '#C8E6C9';
            border = '2px solid #2E7D32';
        } else if (selected === option) {
            bg = '#FFCDD2';
            border = '2px solid #C62828';
            color = '#C62828';
        }
    }

    return {
        padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold',
        cursor: selected ? 'default' : 'pointer', background: bg, color, border,
        transition: 'all 0.2s ease', opacity: selected && !option.correct && selected !== option ? 0.6 : 1
    };
};

const explanationBox = {
    marginTop: '25px', padding: '20px', background: '#F1F8E9',
    borderRadius: '15px', border: '1px solid #C8E6C9', color: '#1B5E20',
    fontSize: '17px', lineHeight: 1.5, width: '100%'
};

const scoreBadge = {
    background: '#E8F5E9', padding: '15px 40px', borderRadius: '20px',
    fontSize: '28px', fontWeight: '900', color: '#2E7D32',
    margin: '25px 0', border: '3px solid #2E7D32'
};

const buttonStyle = (bg, width = 'auto') => ({
    padding: '16px 45px', fontSize: '20px', fontWeight: 900, color: 'white',
    backgroundColor: bg, border: 'none', borderRadius: '15px', cursor: 'pointer',
    marginTop: '20px', width
});

export default WorldWar2Game;

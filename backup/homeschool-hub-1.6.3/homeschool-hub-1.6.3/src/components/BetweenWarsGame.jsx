import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, stop } from '../utils/textToSpeech';

const CRISIS_LEVELS = [
    {
        id: 'economy',
        title: 'Crisis 1: The Economic Spiral',
        description: 'Germany 1923. Prices are doubling every day! Identify the cause and the extreme effect of this "Hyperinflation".',
        options: [
            { text: 'Printing too much money to pay war debts', type: 'cause', correct: true },
            { text: 'A sudden surplus of gold reserves', type: 'cause', correct: false },
            { text: 'People carrying wheelbarrows of cash to buy bread', type: 'effect', correct: true },
            { text: 'Wages rising faster than prices', type: 'effect', correct: false }
        ],
        required: 2
    },
    {
        id: 'depression',
        title: 'Crisis 2: The Great Depression',
        description: '1929 Wall Street Crash. Map the chain reaction that made it global.',
        steps: [
            { id: 'crash', text: 'Stock Market Crash' },
            { id: 'banks', text: 'Bank Failures & Loss of Savings' },
            { id: 'trade', text: 'Collapse of International Trade' }
        ]
    },
    {
        id: 'politics',
        title: 'Crisis 3: The Failure of Peace',
        description: 'The League of Nations was meant to prevent war. Why did it struggle in the 1930s?',
        options: [
            { text: 'It lacked its own military to enforce rules', correct: true },
            { text: 'The USA never officially joined', correct: true },
            { text: 'It was too powerful and controlled every country', correct: false },
            { text: 'It only cared about trade and not peace', correct: false }
        ],
        required: 2
    }
];

function BetweenWarsGame({ lesson }) {
    const navigate = useNavigate();
    const addProgress = useDataStore(state => state.addProgress);
    const getNextProgressId = useDataStore(state => state.getNextProgressId);
    const getUserId = useDataStore(state => state.getUserId);
    const saveData = useDataStore(state => state.saveData);

    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [gameState, setGameState] = useState('intro'); // 'intro', 'level', 'results'
    const [selections, setSelections] = useState([]);
    const [score, setScore] = useState(100);

    useEffect(() => {
        return () => stop();
    }, []);

    const startLevel = () => {
        setGameState('level');
        const level = CRISIS_LEVELS[currentLevelIndex];
        speak(level.title + ". " + level.description, { rate: 0.9 });
    };

    const currentLevel = CRISIS_LEVELS[currentLevelIndex];

    const handleSelection = (option) => {
        if (currentLevel.id === 'depression') {
            const nextStep = currentLevel.steps[selections.length];
            if (option.id === nextStep.id) {
                setSelections([...selections, option.id]);
                speak("Logical progress confirmed.");
                if (selections.length === 2) setTimeout(nextLevel, 1500);
            } else {
                speak("Structural error. The timeline is fractured.");
                setScore(prev => Math.max(0, prev - 10));
                setSelections([]);
            }
            return;
        }

        if (selections.find(s => s.text === option.text)) return;

        if (option.correct) {
            const newSelections = [...selections, option];
            setSelections(newSelections);
            speak("Accurate intelligence gathered.");
            if (newSelections.length === currentLevel.required) {
                setTimeout(nextLevel, 1500);
            }
        } else {
            speak("Historical misconception detected.");
            setScore(prev => Math.max(0, prev - 15));
        }
    };

    const nextLevel = () => {
        if (currentLevelIndex < CRISIS_LEVELS.length - 1) {
            setCurrentLevelIndex(prev => prev + 1);
            setSelections([]);
            setGameState('level');
        } else {
            finishGame();
        }
    };

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
        setGameState('results');
    };

    return (
        <div style={containerStyle}>
            {gameState === 'intro' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '80px', marginBottom: '20px' }}>⚖️ 📉</div>
                    <h1 style={{ color: '#263238' }}>Historical Crisis Navigator</h1>
                    <p style={{ fontSize: '18px', lineHeight: 1.6 }}>
                        The years between 1918 and 1939 were some of the most complex in human history. As a Chief Analyst, you must navigate economic collapses and political failures.
                    </p>
                    <button onClick={startLevel} style={buttonStyle('#263238')}>Begin Analysis</button>
                </div>
            )}

            {gameState === 'level' && (
                <div style={cardStyle}>
                    <h2 style={{ color: '#37474F' }}>{currentLevel.title}</h2>
                    <p style={{ margin: '20px 0', fontSize: '18px', color: '#546E7A' }}>{currentLevel.description}</p>

                    <div style={optionGrid}>
                        {currentLevel.id === 'depression' ? (
                            currentLevel.steps.map(step => (
                                <button
                                    key={step.id}
                                    disabled={selections.includes(step.id)}
                                    onClick={() => handleSelection(step)}
                                    style={stepButton(selections.includes(step.id))}
                                >
                                    {step.text}
                                </button>
                            ))
                        ) : (
                            currentLevel.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSelection(opt)}
                                    style={optButton(selections.find(s => s.text === opt.text))}
                                >
                                    {opt.text}
                                </button>
                            ))
                        )}
                    </div>

                    <div style={progressIndicator}>
                        Security Level: {score}% | Level {currentLevelIndex + 1}/3
                    </div>
                </div>
            )}

            {gameState === 'results' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '100px', marginBottom: '20px' }}>📜</div>
                    <h1>Intelligence Briefing Complete</h1>
                    <p style={{ fontSize: '20px' }}>Your understanding of the Interwar period has been verified. The lessons of history are vital for our future.</p>
                    <div style={finalScore}>Efficiency Rating: {score}%</div>
                    <button onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)} style={buttonStyle('#263238')}>Archive Report</button>
                </div>
            )}
        </div>
    );
}

const containerStyle = {
    width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    background: '#ECEFF1', borderRadius: '24px', padding: '30px'
};

const cardStyle = {
    background: 'white', borderRadius: '30px', padding: '50px',
    boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', maxWidth: '800px', width: '100%'
};

const optionGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', width: '100%', marginTop: '20px' };

const optButton = (active) => ({
    padding: '15px', background: active ? '#CFD8DC' : 'white',
    border: '2px solid #263238', borderRadius: '12px', cursor: 'pointer',
    fontSize: '16px', fontWeight: 'bold', transition: 'all 0.2s',
    color: active ? '#263238' : '#37474F'
});

const stepButton = (active) => ({
    padding: '20px', background: active ? '#455A64' : 'white',
    color: active ? 'white' : '#455A64', border: '3px solid #455A64',
    borderRadius: '15px', cursor: 'pointer', fontSize: '18px', fontWeight: '900'
});

const progressIndicator = { marginTop: '30px', fontWeight: 'bold', color: '#607D8B' };

const finalScore = { fontSize: '30px', fontWeight: '900', color: '#1B5E20', margin: '20px 0', background: '#E8F5E9', padding: '15px 30px', borderRadius: '20px' };

const buttonStyle = (bg) => ({
    padding: '16px 45px', fontSize: '20px', fontWeight: 900, color: 'white',
    backgroundColor: bg, border: 'none', borderRadius: '15px', cursor: 'pointer'
});

export default BetweenWarsGame;

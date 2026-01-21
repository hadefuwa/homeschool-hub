import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, stop } from '../utils/textToSpeech';

const CHANGE_LEVELS = [
    {
        id: 'cause_effect',
        title: 'Phase 1: The Chain of Causality',
        description: 'Historians don\'t just look at what happened, but WHY. Link the historical CAUSE to its direct EFFECT.',
        pairs: [
            { cause: 'Invention of the Printing Press', effect: 'Mass spread of literacy and new ideas' },
            { cause: 'The Wall Street Crash of 1929', effect: 'The Great Depression and global unemployment' },
            { cause: 'Signing of the Magna Carta', effect: 'Limiting the absolute power of the King' }
        ]
    },
    {
        id: 'continuity_change',
        title: 'Phase 2: Continuity vs. Change',
        description: 'Some things transform rapidly, while others stay the same for centuries. Sort these concepts.',
        items: [
            { text: 'The need for human communication', type: 'continuity' },
            { text: 'From handwritten scrolls to digital tablets', type: 'change' },
            { text: 'The basic human need for food and shelter', type: 'continuity' },
            { text: 'From horse-drawn carriages to supersonic jets', type: 'change' }
        ]
    },
    {
        id: 'significance',
        title: 'Phase 3: The Scale of Significance',
        description: 'Not every event changes the world. Identify which event had a "Global Significance" versus a "Local Significance".',
        items: [
            { text: 'The invention of the World Wide Web', type: 'global' },
            { text: 'A small village changing its market day', type: 'local' },
            { text: 'The end of World War II', type: 'global' },
            { text: 'A local school building a new playground', type: 'local' }
        ]
    }
];

function HistoricalChangeGame({ lesson }) {
    const navigate = useNavigate();
    const addProgress = useDataStore(state => state.addProgress);
    const getNextProgressId = useDataStore(state => state.getNextProgressId);
    const getUserId = useDataStore(state => state.getUserId);
    const saveData = useDataStore(state => state.saveData);

    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [gameState, setGameState] = useState('intro'); // 'intro', 'playing', 'feedback', 'complete'
    const [score, setScore] = useState(100);
    const [selections, setSelections] = useState([]);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        return () => stop();
    }, []);

    const startLevel = () => {
        setGameState('playing');
        setSelections([]);
        const level = CHANGE_LEVELS[currentLevelIndex];
        speak(level.title + ". " + level.description, { rate: 0.95 });
    };

    const handleAction = (item, targetType) => {
        const level = CHANGE_LEVELS[currentLevelIndex];

        if (level.id === 'cause_effect') {
            // In this phase, user clicks a cause then an effect? 
            // Let's simplify: User identifies the effect for a given cause.
            // Or just matching. Let's do a simple selection for this specific hard version.
            if (item.effect) { // If it's a pair
                // logic handled by specific UI
            }
        }

        if (item.type === targetType) {
            setSelections(prev => [...prev, item.text]);
            speak("Insightful choice.");
            if (selections.length + 1 === level.items.filter(i => i.type === targetType).length * 2 || selections.length + 1 === level.items.length) {
                setTimeout(nextLevel, 1500);
            }
        } else {
            setScore(prev => Math.max(0, prev - 10));
            speak("Historical oversight. Consider the scale again.");
        }
    };

    const nextLevel = () => {
        if (currentLevelIndex < CHANGE_LEVELS.length - 1) {
            setCurrentLevelIndex(prev => prev + 1);
            setGameState('playing');
            setSelections([]);
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
        setGameState('complete');
    };

    const currentLevel = CHANGE_LEVELS[currentLevelIndex];

    return (
        <div style={containerStyle}>
            {gameState === 'intro' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '80px', marginBottom: '20px' }}>🔄 🏛️</div>
                    <h1>The Historian's Mind</h1>
                    <p style={{ fontSize: '18px', lineHeight: 1.6 }}>
                        History is not just a list of dates. It is a complex web of change, continuity, and significance. Prove your mastery of historical analysis.
                    </p>
                    <button onClick={startLevel} style={buttonStyle('#455A64')}>Begin Masterclass</button>
                </div>
            )}

            {gameState === 'playing' && (
                <div style={cardStyle}>
                    <h2 style={{ color: '#263238' }}>{currentLevel.title}</h2>
                    <p style={{ margin: '20px 0', fontSize: '18px', color: '#546E7A' }}>{currentLevel.description}</p>

                    <div style={gameLayout(currentLevel.id)}>
                        {currentLevel.id === 'cause_effect' ? (
                            currentLevel.pairs.map((pair, idx) => (
                                <div key={idx} style={pairContainer}>
                                    <div style={causeBox}>{pair.cause}</div>
                                    <div style={arrow}>➡️</div>
                                    <button
                                        onClick={() => {
                                            if (!selections.includes(pair.effect)) {
                                                setSelections([...selections, pair.effect]);
                                                speak("Connection verified.");
                                                if (selections.length === 2) setTimeout(nextLevel, 1500);
                                            }
                                        }}
                                        style={effectButton(selections.includes(pair.effect))}
                                    >
                                        {selections.includes(pair.effect) ? pair.effect : 'Identify Effect'}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div style={sortGrid}>
                                {currentLevel.items.map((item, idx) => (
                                    <div key={idx} style={sortCard}>
                                        <p style={{ fontWeight: 'bold' }}>{item.text}</p>
                                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                            <button
                                                disabled={selections.includes(item.text)}
                                                onClick={() => handleAction(item, currentLevel.id === 'continuity_change' ? 'continuity' : 'global')}
                                                style={actionButton('#388E3C')}
                                            >
                                                {currentLevel.id === 'continuity_change' ? 'Continuity' : 'Global'}
                                            </button>
                                            <button
                                                disabled={selections.includes(item.text)}
                                                onClick={() => handleAction(item, currentLevel.id === 'continuity_change' ? 'change' : 'local')}
                                                style={actionButton('#1976D2')}
                                            >
                                                {currentLevel.id === 'continuity_change' ? 'Change' : 'Local'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div style={scoreTracker}>Analytical Precision: {score}%</div>
                </div>
            )}

            {gameState === 'complete' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '100px', marginBottom: '20px' }}>🎓</div>
                    <h1>Historical Mastery Achieved</h1>
                    <p style={{ fontSize: '20px' }}>You have demonstrated the ability to think like a true historian, moving beyond facts to deep analysis.</p>
                    <div style={finalScoreBadge}>Expert Rating: {score}%</div>
                    <button onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)} style={buttonStyle('#263238')}>Complete Doctorate</button>
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
    background: 'white', borderRadius: '30px', padding: '40px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', maxWidth: '900px', width: '100%', border: '1px solid #CFD8DC'
};

const gameLayout = (id) => ({
    width: '100%', marginTop: '20px',
    display: 'flex', flexDirection: 'column', gap: '15px'
});

const pairContainer = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: '#F5F5F5', padding: '15px', borderRadius: '15px', border: '1px solid #E0E0E0'
};

const causeBox = { flex: 1, padding: '10px', fontWeight: 'bold', color: '#455A64', textAlign: 'left' };
const arrow = { padding: '0 20px', fontSize: '24px' };
const effectButton = (active) => ({
    flex: 1, padding: '12px', borderRadius: '10px', border: '2px dashed #455A64',
    background: active ? '#455A64' : 'white', color: active ? 'white' : '#455A64',
    cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s'
});

const sortGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', width: '100%' };
const sortCard = {
    background: '#FAFAFA', padding: '20px', borderRadius: '15px', border: '1px solid #EEE',
    display: 'flex', flexDirection: 'column', alignItems: 'center'
};

const actionButton = (color) => ({
    padding: '8px 15px', borderRadius: '8px', border: 'none', background: color,
    color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px'
});

const scoreTracker = { marginTop: '30px', fontWeight: '900', color: '#607D8B', letterSpacing: '1px' };

const finalScoreBadge = {
    fontSize: '32px', fontWeight: '900', color: '#1B5E20', margin: '25px 0',
    background: '#E8F5E9', padding: '15px 40px', borderRadius: '50px', border: '3px solid #1B5E20'
};

const buttonStyle = (bg) => ({
    padding: '18px 50px', fontSize: '20px', fontWeight: 900, color: 'white',
    backgroundColor: bg, border: 'none', borderRadius: '15px', cursor: 'pointer', marginTop: '20px'
});

export default HistoricalChangeGame;

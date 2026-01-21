import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, stop } from '../utils/textToSpeech';

const VOYAGES = [
    {
        id: 'columbus',
        explorer: 'Christopher Columbus',
        year: '1492',
        goal: 'Find a western route to the Indies (Asia).',
        fact: "Columbus set sail with three ships: the Niña, the Pinta, and the Santa María. Instead of Asia, he landed in the Caribbean, opening the door for European exploration of the Americas.",
        outcome: "Discovered the 'New World' (Americas) for Europe.",
        emoji: '⛵'
    },
    {
        id: 'dagama',
        explorer: 'Vasco da Gama',
        year: '1497',
        goal: 'Find a sea route from Europe to India by sailing around Africa.',
        fact: "He was the first European to reach India by sea. This allowed Portugal to trade directly for valuable spices like pepper and cinnamon without using land routes controlled by others.",
        outcome: "Opened the Spice Trade route to the East.",
        emoji: '🌶️'
    },
    {
        id: 'magellan',
        explorer: 'Ferdinand Magellan',
        year: '1519',
        goal: 'Find a western passage to the Spice Islands and sail around the world.',
        fact: "Although Magellan died during the voyage, his crew completed the first 'circumnavigation' of the Earth, proving the world was much larger than previously thought.",
        outcome: "First voyage to sail all the way around the world.",
        emoji: '🌍'
    }
];

const EXCHANGE_ITEMS = [
    { name: 'Potatoes', origin: 'Americas', to: 'Europe', description: 'A basic food that helped Europe\'s population grow.' },
    { name: 'Horses', origin: 'Europe', to: 'Americas', description: 'Changed the way Native Americans traveled and hunted.' },
    { name: 'Tomatoes', origin: 'Americas', to: 'Europe', description: 'Transformed Italian and European cooking forever.' },
    { name: 'Cocoa', origin: 'Americas', to: 'Europe', description: 'The secret ingredient for making chocolate!' },
    { name: 'Cattle', origin: 'Europe', to: 'Americas', description: 'Provided new sources of meat, milk, and leather.' }
];

function ExplorationGame({ lesson }) {
    const navigate = useNavigate();
    const addProgress = useDataStore(state => state.addProgress);
    const getNextProgressId = useDataStore(state => state.getNextProgressId);
    const getUserId = useDataStore(state => state.getUserId);
    const saveData = useDataStore(state => state.saveData);

    const [gameState, setGameState] = useState('intro'); // 'intro', 'voyages', 'exchange', 'complete'
    const [selectedVoyage, setSelectedVoyage] = useState(null);
    const [viewedVoyages, setViewedVoyages] = useState([]);
    const [exchangeScore, setExchangeScore] = useState(0);
    const [currentExchangeIndex, setCurrentExchangeIndex] = useState(0);

    useEffect(() => {
        return () => stop();
    }, []);

    const startGame = () => {
        setGameState('voyages');
        speak("Welcome to the Age of Discovery. Great explorers risk everything to map the unknown. Choose a voyage to begin.", { rate: 0.95 });
    };

    const handleVoyageSelect = (voyage) => {
        setSelectedVoyage(voyage);
        if (!viewedVoyages.includes(voyage.id)) {
            setViewedVoyages(prev => [...prev, voyage.id]);
        }
        speak(`${voyage.explorer} in ${voyage.year}. ${voyage.fact}`, { rate: 0.95 });
    };

    const startExchange = () => {
        setGameState('exchange');
        setCurrentExchangeIndex(0);
        setExchangeScore(0);
        speak("The voyages connected two worlds. This led to the 'Columbian Exchange'. Can you guess where these items originally came from?", { rate: 0.95 });
    };

    const handleExchangeGuess = (origin) => {
        const item = EXCHANGE_ITEMS[currentExchangeIndex];
        if (origin === item.origin) {
            setExchangeScore(prev => prev + 1);
            speak(`Correct! ${item.name} came from the ${item.origin}. ${item.description}`, { rate: 0.95 });
        } else {
            speak(`Not quite. ${item.name} actually came from the ${item.origin}. ${item.description}`, { rate: 0.95 });
        }

        if (currentExchangeIndex < EXCHANGE_ITEMS.length - 1) {
            setTimeout(() => setCurrentExchangeIndex(prev => prev + 1), 2500);
        } else {
            setTimeout(() => {
                setGameState('complete');
                finishLesson();
            }, 3000);
        }
    };

    const finishLesson = async () => {
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
                score: Math.round((exchangeScore / EXCHANGE_ITEMS.length) * 100),
            });
            await addProgress(progress);
            saveData();
        }
    };

    return (
        <div style={containerStyle}>
            {gameState === 'intro' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '100px', marginBottom: '20px' }}>🚢 🧭</div>
                    <h1 style={{ color: '#1A5276', margin: 0 }}>The Age of Exploration</h1>
                    <p style={{ fontSize: '18px', color: '#2E86C1', maxWidth: '600px', margin: '20px 0', lineHeight: 1.6 }}>
                        In the 15th and 16th centuries, brave sailors set out to find new trade routes and ended up changing the global map forever.
                    </p>
                    <button onClick={startGame} style={buttonStyle('#1A5276')}>Set Sail</button>
                </div>
            )}

            {gameState === 'voyages' && (
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ color: '#1A5276', textAlign: 'center' }}>Famous Voyages of Discovery</h2>
                    <div style={voyageGrid}>
                        {VOYAGES.map(v => (
                            <div
                                key={v.id}
                                onClick={() => handleVoyageSelect(v)}
                                style={voyageCardStyle(selectedVoyage?.id === v.id, viewedVoyages.includes(v.id))}
                            >
                                <div style={{ fontSize: '50px' }}>{v.emoji}</div>
                                <h3 style={{ margin: '10px 0' }}>{v.explorer}</h3>
                                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{v.year}</div>
                            </div>
                        ))}
                    </div>

                    <div style={detailsArea}>
                        {selectedVoyage ? (
                            <div style={voyageDetailCard}>
                                <h3>The Mission: {selectedVoyage.goal}</h3>
                                <p style={{ fontSize: '18px', lineHeight: 1.6 }}>{selectedVoyage.fact}</p>
                                <div style={outcomeBadge}>Outcome: {selectedVoyage.outcome}</div>
                            </div>
                        ) : (
                            <div style={detailsPlaceholder}>Select an explorer to reveal their journey</div>
                        )}
                    </div>

                    {viewedVoyages.length === VOYAGES.length && (
                        <button onClick={startExchange} style={buttonStyle('#27AE60', '100%')}>
                            Unlock the Columbian Exchange →
                        </button>
                    )}
                </div>
            )}

            {gameState === 'exchange' && (
                <div style={cardStyle}>
                    <h2 style={{ color: '#1A5276' }}>The Columbian Exchange</h2>
                    <p>Where did this item originally come from?</p>

                    <div style={exchangeCard}>
                        <div style={{ fontSize: '80px', marginBottom: '20px' }}>
                            {EXCHANGE_ITEMS[currentExchangeIndex].name === 'Potatoes' ? '🥔' :
                                EXCHANGE_ITEMS[currentExchangeIndex].name === 'Horses' ? '🐎' :
                                    EXCHANGE_ITEMS[currentExchangeIndex].name === 'Tomatoes' ? '🍅' :
                                        EXCHANGE_ITEMS[currentExchangeIndex].name === 'Cocoa' ? '🍫' : '🐄'}
                        </div>
                        <h1 style={{ margin: 0 }}>{EXCHANGE_ITEMS[currentExchangeIndex].name}</h1>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
                        <button onClick={() => handleExchangeGuess('Americas')} style={guessButtonStyle('#D35400')}>The Americas</button>
                        <button onClick={() => handleExchangeGuess('Europe')} style={guessButtonStyle('#2E86C1')}>Europe/Old World</button>
                    </div>

                    <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                        Item {currentExchangeIndex + 1} of {EXCHANGE_ITEMS.length}
                    </div>
                </div>
            )}

            {gameState === 'complete' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '100px', marginBottom: '20px' }}>🗺️</div>
                    <h1 style={{ color: '#1A5276' }}>World Map Completed!</h1>
                    <p style={{ fontSize: '18px', color: '#2E86C1' }}>
                        You've learned how the Age of Exploration connected the continents and forever changed what we eat, how we travel, and how we see our world.
                    </p>
                    <div style={scoreBadge}>Exchange Accuracy: {Math.round((exchangeScore / EXCHANGE_ITEMS.length) * 100)}%</div>
                    <button onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)} style={buttonStyle('#1A5276')}>Return to Lessons</button>
                </div>
            )}
        </div>
    );
}

const containerStyle = {
    width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    background: '#EBF5FB', borderRadius: '24px',
    padding: '30px', overflow: 'hidden'
};

const cardStyle = {
    background: 'white', borderRadius: '30px', padding: '40px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', maxWidth: '700px', border: '1px solid #D6EAF8'
};

const voyageGrid = {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px',
    padding: '20px', width: '100%'
};

const voyageCardStyle = (active, viewed) => ({
    background: active ? '#D6EAF8' : (viewed ? '#F4F6F7' : 'white'),
    border: active ? '3px solid #1A5276' : '1px solid #D6EAF8',
    borderRadius: '20px', padding: '20px', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    transition: 'all 0.2s', boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    opacity: viewed || active ? 1 : 0.8
});

const detailsArea = { flex: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const voyageDetailCard = {
    background: 'white', borderRadius: '20px', padding: '30px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.05)', textAlign: 'center',
    border: '2px solid #1A5276', animation: 'slideUp 0.3s ease-out'
};
const detailsPlaceholder = { color: '#7FB3D5', fontStyle: 'italic', fontSize: '18px' };
const outcomeBadge = {
    background: '#1A5276', color: 'white', padding: '10px 20px',
    borderRadius: '10px', marginTop: '20px', fontWeight: 'bold'
};

const exchangeCard = {
    background: '#F9E79F', padding: '40px', borderRadius: '25px',
    width: '300px', marginBottom: '30px', border: '3px solid #F1C40F'
};

const guessButtonStyle = (bg) => ({
    flex: 1, padding: '20px', background: bg, color: 'white',
    border: 'none', borderRadius: '15px', fontSize: '18px', fontWeight: 'bold',
    cursor: 'pointer', transition: 'transform 0.1s',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
});

const scoreBadge = {
    background: '#D4E6F1', color: '#1A5276', padding: '10px 25px',
    borderRadius: '15px', fontWeight: '900', fontSize: '20px',
    margin: '20px 0'
};

const buttonStyle = (color, width = 'auto') => ({
    padding: '16px 45px', fontSize: '20px', fontWeight: 900,
    color: 'white', backgroundColor: color, width,
    border: 'none', borderRadius: '15px',
    cursor: 'pointer', transition: 'all 0.2s'
});

export default ExplorationGame;

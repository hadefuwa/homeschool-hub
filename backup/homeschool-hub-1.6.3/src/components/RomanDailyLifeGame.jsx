import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, stop } from '../utils/textToSpeech';

const ROOMS = [
    {
        id: 'atrium',
        name: 'The Atrium',
        emoji: '🌿',
        fact: "Welcome to the Atrium! This was the heart of a Roman villa. It was an open-air room with a pool in the middle to catch rainwater. It's where the master of the house would meet guests.",
        items: [
            { name: 'Compluvium', description: 'The hole in the roof for light and water.' },
            { name: 'Lararium', description: 'A small shrine for the household gods.' }
        ]
    },
    {
        id: 'bathhouse',
        name: 'The Public Baths',
        emoji: '🛁',
        fact: "Romans loved the baths! They weren't just for cleaning; they were a place to meet friends and talk about the news. There were hot rooms, cold rooms, and even gyms!",
        items: [
            { name: 'Caldarium', description: 'The hot steam room.' },
            { name: 'Frigidarium', description: 'The ice-cold plunge pool.' }
        ]
    },
    {
        id: 'kitchen',
        name: 'The Kitchen (Culinary)',
        emoji: '🍞',
        fact: "In a Roman kitchen, you'd find bread, olives, and fish sauce called 'Garum'. Rich Romans loved fancy dinner parties with exotic food like dormice or ostrich!",
        items: [
            { name: 'Garum', description: 'A salty fish sauce used on everything.' },
            { name: 'Triclinium', description: 'A dining room where people ate while lying down.' }
        ]
    },
    {
        id: 'theater',
        name: 'The Chariot Races',
        emoji: '🐎',
        fact: "The biggest entertainment in Rome was chariot racing at the Circus Maximus! 250,000 people would watch horses race at high speeds. It was very dangerous!",
        items: [
            { name: 'Quadriga', description: 'A chariot pulled by four horses.' },
            { name: 'Blue & Green', description: 'Famous racing teams people supported.' }
        ]
    }
];

function RomanDailyLifeGame({ lesson }) {
    const navigate = useNavigate();
    const addProgress = useDataStore(state => state.addProgress);
    const getNextProgressId = useDataStore(state => state.getNextProgressId);
    const getUserId = useDataStore(state => state.getUserId);
    const saveData = useDataStore(state => state.saveData);

    const [currentRoom, setCurrentRoom] = useState(null);
    const [viewedRooms, setViewedRooms] = useState([]);
    const [gameState, setGameState] = useState('intro'); // 'intro', 'exploring', 'viewing', 'complete'

    useEffect(() => {
        return () => stop();
    }, []);

    const startExploring = () => {
        setGameState('exploring');
        speak("Step into the city of Rome! Visit the different parts of the city to see how Romans lived, ate, and played.", { rate: 0.95 });
    };

    const handleRoomSelect = (room) => {
        setCurrentRoom(room);
        setGameState('viewing');
        if (!viewedRooms.includes(room.id)) {
            setViewedRooms(prev => [...prev, room.id]);
        }
        speak(`${room.name}. ${room.fact}`, { rate: 0.95 });
    };

    const handleBackToMap = () => {
        if (viewedRooms.length === ROOMS.length) {
            setGameState('complete');
            completeGame();
        } else {
            setGameState('exploring');
            setCurrentRoom(null);
        }
    };

    const completeGame = async () => {
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
                score: 100,
            });
            await addProgress(progress);
            saveData();
        }
        speak("You have learned so much about daily life in Rome! From the relaxing baths to the exciting chariot races, you are a true Roman citizen.", { rate: 0.95 });
    };

    return (
        <div style={containerStyle}>
            {gameState === 'intro' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '80px', marginBottom: '20px' }}>🏛️</div>
                    <h1 style={{ color: '#8B0000', margin: 0 }}>A Day in Ancient Rome</h1>
                    <p style={{ fontSize: '18px', color: '#5D4037', maxWidth: '500px', margin: '20px 0' }}>
                        Explore the streets of the Eternal City. Visit homes, baths, and the great arenas to see how life was lived 2,000 years ago.
                    </p>
                    <button onClick={startExploring} style={buttonStyle('#8B0000')}>Start Journey</button>
                </div>
            )}

            {gameState === 'exploring' && (
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ color: '#8B0000', marginBottom: '30px' }}>Where should we go today?</h2>
                    <div style={gridStyle}>
                        {ROOMS.map(room => (
                            <div
                                key={room.id}
                                onClick={() => handleRoomSelect(room)}
                                style={roomCardStyle(viewedRooms.includes(room.id))}
                            >
                                <div style={{ fontSize: '60px' }}>{room.emoji}</div>
                                <div style={{ fontWeight: 800, marginTop: '10px' }}>{room.name}</div>
                                {viewedRooms.includes(room.id) && <div style={visitedBadge}>Visited ✓</div>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {gameState === 'viewing' && currentRoom && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '100px', marginBottom: '10px' }}>{currentRoom.emoji}</div>
                    <h2 style={{ color: '#8B0000', margin: '0 0 20px 0' }}>{currentRoom.name}</h2>
                    <div style={factBoxStyle}>{currentRoom.fact}</div>

                    <div style={itemsListStyle}>
                        {currentRoom.items.map((item, i) => (
                            <div key={i} style={itemStyle}>
                                <strong style={{ color: '#8B0000' }}>{item.name}:</strong> {item.description}
                            </div>
                        ))}
                    </div>

                    <button onClick={handleBackToMap} style={buttonStyle('#8B0000')}>Continue Exploring</button>
                </div>
            )}

            {gameState === 'complete' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '100px', marginBottom: '20px' }}>🏺</div>
                    <h2 style={{ color: '#8B0000', margin: 0 }}>Life in Rome Mastered!</h2>
                    <p style={{ fontSize: '20px', color: '#5D4037', margin: '20px 0' }}>
                        You have seen the best of Roman life. You've earned the title of **Civis Romanus** (Roman Citizen)!
                    </p>
                    <button onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)} style={buttonStyle('#8B0000')}>Return to Lessons</button>
                </div>
            )}
        </div>
    );
}

const containerStyle = {
    width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    background: '#FDF2E9', borderRadius: '24px',
    padding: '40px', overflow: 'hidden'
};

const cardStyle = {
    background: 'white', borderRadius: '30px', padding: '40px',
    boxShadow: '0 20px 50px rgba(139, 0, 0, 0.1)',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', maxWidth: '700px', border: '5px solid #FAD7A0'
};

const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', width: '600px' };

const roomCardStyle = (visited) => ({
    background: visited ? '#FDEDEC' : 'white',
    padding: '30px', borderRadius: '20px',
    cursor: 'pointer', transition: 'all 0.2s',
    border: `3px solid ${visited ? '#8B0000' : '#FAD7A0'}`,
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    position: 'relative',
    '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }
});

const visitedBadge = {
    position: 'absolute', top: '10px', right: '10px',
    background: '#27AE60', color: 'white',
    padding: '2px 8px', borderRadius: '10px',
    fontSize: '12px', fontWeight: 'bold'
};

const factBoxStyle = {
    background: '#FDF2E9', padding: '20px', borderRadius: '15px',
    fontSize: '18px', lineHeight: 1.6, color: '#5D4037',
    marginBottom: '20px', borderLeft: '5px solid #8B0000'
};

const itemsListStyle = { width: '100%', textAlign: 'left', marginBottom: '30px' };
const itemStyle = { background: '#F8F9F9', padding: '10px 15px', borderRadius: '8px', marginBottom: '8px', fontSize: '16px' };

const buttonStyle = (color) => ({
    padding: '15px 40px', fontSize: '20px', fontWeight: 900,
    color: 'white', backgroundColor: color,
    border: 'none', borderRadius: '12px',
    cursor: 'pointer', transition: 'all 0.2s'
});

export default RomanDailyLifeGame;

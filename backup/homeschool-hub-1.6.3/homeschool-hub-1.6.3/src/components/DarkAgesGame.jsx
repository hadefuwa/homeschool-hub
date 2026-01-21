import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, stop } from '../utils/textToSpeech';

const DARK_AGES_TOPICS = [
    {
        id: 'vikings',
        title: 'Viking Longships',
        emoji: '⛵',
        fact: "The Vikings were master shipbuilders from Scandinavia. Their longships could sail in deep oceans but were also shallow enough to travel up rivers, allowing them to surprise people deep inland!",
        details: "They used these ships to raid, but also to explore as far as North America and trade as far as Baghdad."
    },
    {
        id: 'anglosaxons',
        title: 'Anglo-Saxon Villages',
        emoji: '🛖',
        fact: "When the Romans left Britain, the Anglo-Saxons arrived from Germany and Denmark. They preferred living in small wooden villages rather than the large stone cities the Romans had built.",
        details: "They divided England into smaller kingdoms like Wessex, Mercia, and Northumbria."
    },
    {
        id: 'monks',
        title: 'Monks & Manuscripts',
        emoji: '📜',
        fact: "During the 'Dark Ages', many people forgot how to read and write. However, monks in monasteries kept learning alive by copying books and records by hand with beautiful decorations.",
        details: "These hand-written books are called 'Illuminated Manuscripts' and are very valuable today."
    },
    {
        id: 'alfred',
        title: 'Alfred the Great',
        emoji: '🤴',
        fact: "King Alfred of Wessex is the only English king to be called 'The Great'. He successfully defended his kingdom against Viking invaders and encouraged everyone to learn to read and write.",
        details: "He created 'Burhs' (fortified towns) to protect people from Viking raids."
    }
];

function DarkAgesGame({ lesson }) {
    const navigate = useNavigate();
    const addProgress = useDataStore(state => state.addProgress);
    const getNextProgressId = useDataStore(state => state.getNextProgressId);
    const getUserId = useDataStore(state => state.getUserId);
    const saveData = useDataStore(state => state.saveData);

    const [gameState, setGameState] = useState('intro'); // 'intro', 'exploring', 'done'
    const [viewedTopics, setViewedTopics] = useState([]);
    const [currentTopic, setCurrentTopic] = useState(null);

    useEffect(() => {
        return () => stop();
    }, []);

    const startGame = () => {
        setGameState('exploring');
        speak("The light of Rome has faded, and a new era has begun. Explore the world of the Vikings, Anglo-Saxons, and the monks who kept history alive.", { rate: 0.95 });
    };

    const handleTopicSelect = (topic) => {
        setCurrentTopic(topic);
        if (!viewedTopics.includes(topic.id)) {
            setViewedTopics(prev => [...prev, topic.id]);
        }
        speak(`${topic.title}. ${topic.fact}. ${topic.details}`, { rate: 0.95 });
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
                score: 100,
            });
            await addProgress(progress);
            saveData();
        }
        setGameState('done');
    };

    return (
        <div style={containerStyle}>
            {gameState === 'intro' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '80px', marginBottom: '20px' }}>🌑 ⚔️</div>
                    <h1 style={{ color: '#2C3E50', margin: 0 }}>The Dark Ages Explorer</h1>
                    <p style={{ fontSize: '18px', color: '#34495E', maxWidth: '550px', margin: '20px 0', lineHeight: 1.6 }}>
                        What happened after the Roman Empire fell? Step into a time of great change, legendary kings, and fearless explorers.
                    </p>
                    <button onClick={startGame} style={buttonStyle('#2C3E50')}>Enter the Era</button>
                </div>
            )}

            {gameState === 'exploring' && (
                <div style={{ display: 'flex', gap: '30px', width: '100%', height: '100%' }}>
                    <div style={sidebarStyle}>
                        <h2 style={{ color: '#2C3E50', fontSize: '20px' }}>Discoveries ({viewedTopics.length}/{DARK_AGES_TOPICS.length})</h2>
                        <div style={topicList}>
                            {DARK_AGES_TOPICS.map(topic => (
                                <button
                                    key={topic.id}
                                    onClick={() => handleTopicSelect(topic)}
                                    style={topicButtonStyle(currentTopic?.id === topic.id, viewedTopics.includes(topic.id))}
                                >
                                    <span style={{ fontSize: '24px', marginRight: '10px' }}>{topic.emoji}</span>
                                    {topic.title}
                                </button>
                            ))}
                        </div>
                        {viewedTopics.length === DARK_AGES_TOPICS.length && (
                            <button onClick={finishGame} style={buttonStyle('#27AE60', '100%')}>Finish Exploration</button>
                        )}
                    </div>

                    <div style={mainContentStyle}>
                        {currentTopic ? (
                            <div style={contentCard}>
                                <div style={{ fontSize: '100px', marginBottom: '20px' }}>{currentTopic.emoji}</div>
                                <h2 style={{ color: '#2C3E50', fontSize: '32px' }}>{currentTopic.title}</h2>
                                <div style={factBox}>{currentTopic.fact}</div>
                                <p style={{ fontSize: '20px', color: '#34495E', lineHeight: 1.6 }}>{currentTopic.details}</p>
                            </div>
                        ) : (
                            <div style={emptyState}>
                                <div style={{ fontSize: '60px', marginBottom: '10px' }}>🖱️</div>
                                <p>Select a topic from the sidebar to begin your historical journey!</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {gameState === 'done' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '100px', marginBottom: '20px' }}>📜</div>
                    <h1 style={{ color: '#2C3E50', margin: 0 }}>Exploration Complete!</h1>
                    <p style={{ fontSize: '22px', color: '#34495E', margin: '20px 0' }}>
                        You have witnessed how the Dark Ages were actually a time of bright new beginnings and resilient cultures.
                    </p>
                    <button onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)} style={buttonStyle('#2C3E50')}>Return to Lessons</button>
                </div>
            )}
        </div>
    );
}

const containerStyle = {
    width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    background: 'linear-gradient(135deg, #CFD8DC 0%, #90A4AE 100%)',
    borderRadius: '24px', padding: '30px', overflow: 'hidden'
};

const cardStyle = {
    background: 'white', borderRadius: '30px', padding: '50px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', maxWidth: '700px'
};

const sidebarStyle = {
    width: '300px', background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px', padding: '25px',
    display: 'flex', flexDirection: 'column', gap: '20px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
};

const topicList = { display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 };

const topicButtonStyle = (active, viewed) => ({
    width: '100%', padding: '15px', borderRadius: '15px',
    border: active ? '3px solid #2C3E50' : '1px solid #CFD8DC',
    background: viewed ? (active ? '#ECEFF1' : '#F5F7F8') : 'white',
    cursor: 'pointer', textAlign: 'left',
    fontWeight: active ? '900' : '700',
    display: 'flex', alignItems: 'center', transition: 'all 0.2s',
    color: active ? '#2C3E50' : '#455A64'
});

const mainContentStyle = { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' };

const contentCard = {
    background: 'white', borderRadius: '25px', padding: '50px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.1)', width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
};

const factBox = {
    background: '#E1F5FE', padding: '25px', borderRadius: '15px',
    fontSize: '20px', color: '#01579B', fontWeight: 'bold',
    lineHeight: 1.5, margin: '20px 0', border: '2px dashed #0288D1'
};

const emptyState = { textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)', pointerEvents: 'none' };

const buttonStyle = (backgroundColor, width = 'auto') => ({
    padding: '16px 40px', fontSize: '20px', fontWeight: 900,
    color: 'white', backgroundColor, width,
    border: 'none', borderRadius: '15px',
    cursor: 'pointer', transition: 'transform 0.2s'
});

export default DarkAgesGame;

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, stop } from '../utils/textToSpeech';

const CASTLE_PARTS = [
    {
        id: 'keep',
        name: 'The Keep',
        fact: "The Keep was the safest place in the castle. It was a strong tower where the lord and his family lived. If the outer walls were taken, everyone would retreat here!",
        icon: '🏰'
    },
    {
        id: 'moat',
        name: 'The Moat',
        fact: "A moat is a deep, wide ditch surrounding a castle, often filled with water. It made it very difficult for enemies to use ladders or battering rams against the walls!",
        icon: '🌊'
    },
    {
        id: 'portcullis',
        name: 'The Portcullis',
        fact: "The portcullis was a heavy metal or wood gate that could be dropped quickly to block the entrance. It had sharp spikes at the bottom to stop anyone trying to crawl under it!",
        icon: '⛓️'
    },
    {
        id: 'arrow_slits',
        name: 'Arrow Slits',
        fact: "These were narrow vertical windows. Archers could shoot out at attackers while being almost completely protected from arrows coming back in!",
        icon: '🏹'
    },
    {
        id: 'battlements',
        name: 'Battlements',
        fact: "These are the 'teeth' at the top of the walls. Soldiers could hide behind the stone 'merlons' and then lean out through the gaps ('crenels') to throw rocks or shoot!",
        icon: '🧱'
    }
];

const FEUDAL_LEVELS = [
    { id: 'king', name: 'The King', description: 'Owned all the land and gave it to his most trusted nobles.', icon: '👑' },
    { id: 'nobles', name: 'Nobles/Lords', description: 'Protected the King and provided knights in exchange for land.', icon: '📜' },
    { id: 'knights', name: 'Knights', description: 'Professional warriors who fought for the Lords and followed Chivalry.', icon: '🛡️' },
    { id: 'peasants', name: 'Peasants/Serfs', description: 'Worked the land and grew food. They had very few rights.', icon: '🌾' }
];

function MedievalCastleGame({ lesson }) {
    const navigate = useNavigate();
    const addProgress = useDataStore(state => state.addProgress);
    const getNextProgressId = useDataStore(state => state.getNextProgressId);
    const getUserId = useDataStore(state => state.getUserId);
    const saveData = useDataStore(state => state.saveData);

    const [gameState, setGameState] = useState('intro'); // 'intro', 'castle_explorer', 'feudal_sorting', 'complete'
    const [discoveredParts, setDiscoveredParts] = useState([]);
    const [currentPart, setCurrentPart] = useState(null);
    const [feudalOrder, setFeudalOrder] = useState([]);
    const [sortingFeedback, setSortingFeedback] = useState('');

    useEffect(() => {
        return () => stop();
    }, []);

    const startGame = () => {
        setGameState('castle_explorer');
        speak("Welcome to the Medieval Castle! Your goal is to explore the castle's defenses and then correctly organize the Feudal System.", { rate: 0.95 });
    };

    const explorePart = (part) => {
        setCurrentPart(part);
        if (!discoveredParts.includes(part.id)) {
            setDiscoveredParts(prev => [...prev, part.id]);
        }
        speak(`${part.name}. ${part.fact}`, { rate: 0.95 });
    };

    const startFeudalSorting = () => {
        setGameState('feudal_sorting');
        setFeudalOrder([]);
        setSortingFeedback('Place the levels in order from most powerful to least powerful.');
        speak("Now, let's learn about the Great Chain of Command. Place the King, Nobles, Knights, and Peasants in order from top to bottom.", { rate: 0.95 });
    };

    const handleLevelClick = (level) => {
        if (feudalOrder.find(l => l.id === level.id)) return;

        const newOrder = [...feudalOrder, level];
        setFeudalOrder(newOrder);

        // Check if correct so far
        const correctOrder = ['king', 'nobles', 'knights', 'peasants'];
        const currentCorrect = newOrder.every((l, i) => l.id === correctOrder[i]);

        if (!currentCorrect) {
            setSortingFeedback("Wait! That doesn't seem right. Remember who holds the most power!");
            speak("Wait! That person doesn't go there. Try again!", { rate: 0.95, pitch: 0.9 });
            setFeudalOrder([]);
        } else if (newOrder.length === 4) {
            setSortingFeedback("Brilliant! You've mastered the Feudal System!");
            speak("Brilliant! You have accurately organized the medieval society!", { rate: 0.95 });
            setTimeout(() => {
                setGameState('complete');
                finishLesson();
            }, 2000);
        } else {
            setSortingFeedback(`Correct! Who is next under the ${level.name}?`);
            speak(`Correct! Who is next?`, { rate: 0.95 });
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
                score: 100,
            });
            await addProgress(progress);
            saveData();
        }
    };

    return (
        <div style={containerStyle}>
            {gameState === 'intro' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '100px', marginBottom: '20px' }}>🏰</div>
                    <h1 style={{ color: '#2C3E50', margin: '0 0 10px 0' }}>Medieval Castle & Knights</h1>
                    <p style={{ fontSize: '20px', color: '#34495E', maxWidth: '600px', lineHeight: 1.6 }}>
                        Step back in time to the age of Chivalry. Learn how castles were built to withstand sieges and how society was structured under the Feudal System.
                    </p>
                    <button onClick={startGame} style={buttonStyle('#2C3E50')}>Enter the Castle</button>
                </div>
            )}

            {gameState === 'castle_explorer' && (
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={headerStyle}>
                        <h2>Castle Architecture</h2>
                        <p>Click on the parts of the castle to learn their secrets ({discoveredParts.length}/{CASTLE_PARTS.length})</p>
                    </div>

                    <div style={explorerLayout}>
                        <div style={castleDiagram}>
                            {/* This would ideally be a beautiful SVG or Image. Using emojis/boxes for now */}
                            <div style={castleVisual}>
                                <div style={keepVisual}>🏰</div>
                                <div style={wallVisual}>
                                    <div style={arrowSlitVisual}>🏹</div>
                                    <div style={gateVisual}>⛓️</div>
                                    <div style={arrowSlitVisual}>🏹</div>
                                </div>
                                <div style={moatVisual}>🌊🌊🌊</div>
                            </div>

                            <div style={hotspotContainer}>
                                {CASTLE_PARTS.map(part => (
                                    <button
                                        key={part.id}
                                        onClick={() => explorePart(part)}
                                        style={hotspotStyle(part.id, discoveredParts.includes(part.id))}
                                    >
                                        {part.icon} {part.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={infoPanel}>
                            {currentPart ? (
                                <div style={partDetails}>
                                    <div style={{ fontSize: '60px' }}>{currentPart.icon}</div>
                                    <h3>{currentPart.name}</h3>
                                    <p>{currentPart.fact}</p>
                                </div>
                            ) : (
                                <div style={placeholderInfo}>Select a part to reveal its defensive purpose!</div>
                            )}

                            {discoveredParts.length === CASTLE_PARTS.length && (
                                <button onClick={startFeudalSorting} style={buttonStyle('#27AE60', '20px')}>
                                    To the Great Hall! →
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {gameState === 'feudal_sorting' && (
                <div style={cardStyle}>
                    <h2 style={{ color: '#2C3E50', marginBottom: '10px' }}>The Feudal Ladder</h2>
                    <p style={{ fontSize: '18px', color: '#7F8C8D', marginBottom: '30px' }}>{sortingFeedback}</p>

                    <div style={sortingContainer}>
                        <div style={dropZone}>
                            {feudalOrder.length === 0 && <div style={dropPlaceholder}>Most Powerful...</div>}
                            {feudalOrder.map((level, i) => (
                                <div key={level.id} style={placedItemStyle}>
                                    <div style={{ fontSize: '30px' }}>{level.icon}</div>
                                    <div>
                                        <strong>{level.name}</strong>
                                        <div style={{ fontSize: '12px' }}>{level.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={pickZone}>
                            {FEUDAL_LEVELS.filter(l => !feudalOrder.find(o => o.id === l.id)).map(level => (
                                <button key={level.id} onClick={() => handleLevelClick(level)} style={pickItemStyle}>
                                    <div style={{ fontSize: '40px' }}>{level.icon}</div>
                                    <strong>{level.name}</strong>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {gameState === 'complete' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '100px', marginBottom: '20px' }}>⚔️</div>
                    <h2 style={{ fontSize: '36px', color: '#2C3E50' }}>Knighted!</h2>
                    <p style={{ fontSize: '20px', color: '#34495E', marginBottom: '30px' }}>
                        You have learned the art of castle defense and the structure of medieval society. You are ready to serve the kingdom!
                    </p>
                    <button onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)} style={buttonStyle('#2C3E50')}>Return to Map</button>
                </div>
            )}
        </div>
    );
}

const containerStyle = {
    width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    background: '#F4F7F6', borderRadius: '24px',
    padding: '20px', overflow: 'hidden'
};

const cardStyle = {
    background: 'white', borderRadius: '30px', padding: '50px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', maxWidth: '800px', border: '1px solid #E5E7EB'
};

const headerStyle = { textAlign: 'center', marginBottom: '20px' };

const explorerLayout = {
    display: 'grid', gridTemplateColumns: '1.2fr 0.8fr',
    gap: '30px', width: '100%', flex: 1,
    padding: '20px', boxSizing: 'border-box'
};

const castleDiagram = {
    background: '#E5E7EB', borderRadius: '20px',
    padding: '20px', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'space-around',
    position: 'relative'
};

const castleVisual = { fontSize: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' };
const keepVisual = { marginBottom: '-20px', zIndex: 2 };
const wallVisual = {
    background: '#94A3B8', border: '5px solid #475569',
    width: '400px', height: '100px', borderRadius: '10px 10px 0 0',
    display: 'flex', justifyContent: 'space-around', alignItems: 'center',
    fontSize: '40px', zIndex: 1
};
const gateVisual = { color: '#1E293B' };
const arrowSlitVisual = { fontSize: '20px' };
const moatVisual = { width: '100%', textAlign: 'center', marginTop: '-10px', fontSize: '30px', opacity: 0.8 };

const hotspotContainer = {
    display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', width: '100%'
};

const hotspotStyle = (id, discovered) => ({
    padding: '12px', background: discovered ? '#2C3E50' : 'white',
    color: discovered ? 'white' : '#2C3E50',
    border: '2px solid #2C3E50', borderRadius: '10px',
    cursor: 'pointer', transition: 'all 0.2s', fontWeight: 700,
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
});

const infoPanel = {
    background: 'white', borderRadius: '20px', padding: '30px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.05)', display: 'flex',
    flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    textAlign: 'center', border: '2px solid #E5E7EB'
};

const partDetails = { animation: 'fadeIn 0.5s ease' };
const placeholderInfo = { color: '#94A3B8', fontStyle: 'italic', fontSize: '18px' };

const sortingContainer = { display: 'flex', gap: '40px', width: '100%' };
const dropZone = {
    flex: 1, background: '#F8FAFC', border: '2px dashed #CBD5E1',
    borderRadius: '20px', padding: '20px', display: 'flex',
    flexDirection: 'column', gap: '10px', minHeight: '350px'
};
const dropPlaceholder = { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' };
const pickZone = { flex: 1, display: 'grid', gridTemplateColumns: '1fr', gap: '10px' };

const pickItemStyle = {
    background: 'white', border: '2px solid #E2E8F0', padding: '15px',
    borderRadius: '15px', cursor: 'pointer', display: 'flex',
    alignItems: 'center', gap: '20px', transition: 'all 0.2s',
    '&:hover': { transform: 'translateX(5px)', borderColor: '#2C3E50' }
};

const placedItemStyle = {
    background: 'white', border: '2px solid #2C3E50', padding: '12px 20px',
    borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '20px',
    animation: 'slideIn 0.3s ease-out'
};

const buttonStyle = (color, marginTop = '0px') => ({
    padding: '16px 40px', fontSize: '18px', fontWeight: 900,
    color: 'white', backgroundColor: color,
    border: 'none', borderRadius: '15px',
    cursor: 'pointer', transition: 'transform 0.2s', marginTop
});

export default MedievalCastleGame;

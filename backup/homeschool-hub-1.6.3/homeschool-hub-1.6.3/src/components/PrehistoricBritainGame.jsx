import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, stop } from '../utils/textToSpeech';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const AGES = {
    STONE: { name: 'Stone Age', color: '#95A5A6', emoji: '🪨', next: 'BRONZE' },
    BRONZE: { name: 'Bronze Age', color: '#CD7F32', emoji: '🗡️', next: 'IRON' },
    IRON: { name: 'Iron Age', color: '#2C3E50', emoji: '⚔️', next: 'COMPLETE' },
};

const DISCOVERIES = [
    {
        id: 'flint',
        age: 'STONE',
        name: 'Flint Workshop',
        emoji: '⚒️',
        x: 150,
        y: 150,
        fact: "In the Stone Age, people discovered that flint could be chipped to make sharp tools and weapons. This was the start of human technology!",
        color: '#7F8C8D'
    },
    {
        id: 'cave_art',
        age: 'STONE',
        name: 'Ancient Cave',
        emoji: '🛖',
        x: 600,
        y: 100,
        fact: "Early humans lived in caves for protection and sometimes painted animals on the walls. They were hunter-gatherers, moving to follow the herds of animals.",
        color: '#BDC3C7'
    },
    {
        id: 'copper',
        age: 'BRONZE',
        name: 'Copper Mine',
        emoji: '🧱',
        x: 100,
        y: 450,
        fact: "Around 2500 BC, people learned to mix copper and tin to make bronze. This was much stronger than stone and changed how they farmed and fought.",
        color: '#E67E22'
    },
    {
        age: 'BRONZE',
        id: 'roundhouse',
        name: 'Roundhouse Village',
        emoji: '🏘️',
        x: 400,
        y: 350,
        fact: "Bronze Age people began to settle in permanent villages. They built circular homes with thatched roofs called roundhouses.",
        color: '#D35400'
    },
    {
        id: 'iron_ore',
        age: 'IRON',
        name: 'Iron Smithy',
        emoji: '🔥',
        x: 700,
        y: 500,
        fact: "The Iron Age began around 800 BC. Iron was even harder than bronze and allowed for the creation of massive hill forts and stronger plows for farming.",
        color: '#34495E'
    },
    {
        id: 'hill_fort',
        age: 'IRON',
        name: 'Maiden Castle',
        emoji: '🏰',
        x: 100,
        y: 100,
        fact: "Iron Age tribes built massive hill forts with huge earth walls to protect their communities from rival tribes. This was a time of powerful Celtic warriors!",
        color: '#2C3E50'
    }
];

function PrehistoricBritainGame({ lesson }) {
    const navigate = useNavigate();
    const addProgress = useDataStore(state => state.addProgress);
    const getNextProgressId = useDataStore(state => state.getNextProgressId);
    const getUserId = useDataStore(state => state.getUserId);
    const saveData = useDataStore(state => state.saveData);

    const canvasRef = useRef(null);
    const canvasContainerRef = useRef(null);
    const [canvasScale, setCanvasScale] = useState(1);
    const [gameState, setGameState] = useState('intro'); // 'intro', 'playing', 'discovery', 'age_up', 'complete'
    const [currentAge, setCurrentAge] = useState('STONE');
    const [foundItems, setFoundItems] = useState([]);
    const [currentDiscovery, setCurrentDiscovery] = useState(null);
    const [player, setPlayer] = useState({ x: 400, y: 300, dir: 'down' });
    const [keys, setKeys] = useState({});

    const playerRef = useRef({ x: 400, y: 300, dir: 'down' });
    const foundRef = useRef(new Set());
    const requestRef = useRef();

    // Responsive scaling
    useEffect(() => {
        const updateScale = () => {
            if (canvasContainerRef.current) {
                const { clientWidth, clientHeight } = canvasContainerRef.current;
                const scale = Math.min(clientWidth / GAME_WIDTH, (clientHeight - 120) / GAME_HEIGHT, 1);
                setCanvasScale(scale);
            }
        };
        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    // Movement
    useEffect(() => {
        const handleKeyDown = (e) => setKeys(prev => ({ ...prev, [e.code]: true }));
        const handleKeyUp = (e) => setKeys(prev => ({ ...prev, [e.code]: false }));
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            stop();
        };
    }, []);

    const movePlayer = useCallback(() => {
        if (gameState !== 'playing') return;

        let { x, y, dir } = playerRef.current;
        const speed = 5;
        const margin = 30;

        if (keys['ArrowUp'] || keys['KeyW']) { y -= speed; dir = 'up'; }
        if (keys['ArrowDown'] || keys['KeyS']) { y += speed; dir = 'down'; }
        if (keys['ArrowLeft'] || keys['KeyA']) { x -= speed; dir = 'left'; }
        if (keys['ArrowRight'] || keys['KeyD']) { x += speed; dir = 'right'; }

        x = Math.max(margin, Math.min(x, GAME_WIDTH - margin));
        y = Math.max(margin, Math.min(y, GAME_HEIGHT - margin));

        playerRef.current = { x, y, dir };
        setPlayer({ x, y, dir });

        // Check for discoveries
        DISCOVERIES.forEach(d => {
            if (d.age !== currentAge) return;
            if (foundRef.current.has(d.id)) return;

            const dx = x - d.x;
            const dy = y - d.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 50) {
                foundRef.current.add(d.id);
                handleDiscovery(d);
            }
        });
    }, [keys, gameState, currentAge]);

    const handleDiscovery = (discovery) => {
        setCurrentDiscovery(discovery);
        setFoundItems(prev => [...prev, discovery.id]);
        setGameState('discovery');
        speak(`${discovery.name}: ${discovery.fact}`, { rate: 0.95 });
    };

    const handleNext = () => {
        // Check if all discoveries of current age are found
        const ageDiscoveries = DISCOVERIES.filter(d => d.age === currentAge).length;
        const foundInAge = DISCOVERIES.filter(d => d.age === currentAge && foundRef.current.has(d.id)).length;

        if (foundInAge === ageDiscoveries) {
            if (AGES[currentAge].next === 'COMPLETE') {
                setGameState('complete');
                completeGame();
            } else {
                setGameState('age_up');
                const nextAge = AGES[currentAge].next;
                speak(`Fantastic! You have advanced to the ${AGES[nextAge].name}!`, { rate: 0.9, pitch: 1.1 });
            }
        } else {
            setGameState('playing');
            setCurrentDiscovery(null);
        }
    };

    const startNextAge = () => {
        setCurrentAge(AGES[currentAge].next);
        setGameState('playing');
        setCurrentDiscovery(null);
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
    };

    const draw = useCallback((ctx) => {
        // Dynamic background based on age
        ctx.fillStyle = currentAge === 'STONE' ? '#e1eedd' :
            currentAge === 'BRONZE' ? '#f5e6ca' : '#dcdde1';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // Environment details
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        for (let i = 0; i < 30; i++) {
            const rx = (i * 197) % GAME_WIDTH;
            const ry = (i * 307) % GAME_HEIGHT;
            ctx.beginPath();
            ctx.arc(rx, ry, 20 + (i % 5) * 10, 0, Math.PI * 2);
            ctx.fill();
        }

        // Discovery points
        DISCOVERIES.forEach(d => {
            if (d.age !== currentAge) return;
            const found = foundRef.current.has(d.id);

            if (!found) {
                // Glow
                const pulse = Math.sin(Date.now() / 200) * 10;
                ctx.shadowBlur = 15 + pulse;
                ctx.shadowColor = d.color;
            }

            ctx.font = '50px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            if (found) {
                ctx.globalAlpha = 0.5;
                ctx.fillText(d.emoji, d.x, d.y);
                ctx.globalAlpha = 1.0;
                ctx.font = 'bold 24px Arial';
                ctx.fillStyle = '#27AE60';
                ctx.fillText('✓', d.x + 25, d.y - 25);
            } else {
                ctx.fillText(d.emoji, d.x, d.y);
            }
            ctx.shadowBlur = 0;

            ctx.font = 'bold 14px Arial';
            ctx.fillStyle = '#2c3e50';
            ctx.fillText(d.name, d.x, d.y + 40);
        });

        // Player - Hunter/Explorer
        const { x, y, dir } = player;
        ctx.font = '45px Arial';
        ctx.save();
        ctx.translate(x, y);
        if (dir === 'left') ctx.scale(-1, 1);
        ctx.fillText('🏹', 0, 0);
        ctx.restore();

    }, [player, currentAge, gameState]);

    const gameLoop = useCallback(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            movePlayer();
            draw(ctx);
        }
        requestRef.current = requestAnimationFrame(gameLoop);
    }, [movePlayer, draw]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(gameLoop);
        return () => cancelAnimationFrame(requestRef.current);
    }, [gameLoop]);

    const startGame = () => {
        setGameState('playing');
        setCurrentAge('STONE');
        setFoundItems([]);
        foundRef.current = new Set();
        playerRef.current = { x: 400, y: 300, dir: 'down' };
        setPlayer({ x: 400, y: 300, dir: 'down' });
        speak("Welcome to Prehistoric Britain! You are a primitive hunter. Explore the land to discover new tools and advance through the Stone, Bronze, and Iron Ages!", { rate: 0.9 });
    };

    return (
        <div ref={canvasContainerRef} style={containerStyle}>
            {/* HUD */}
            <div style={hudStyle}>
                <div style={ageIndicatorStyle}>
                    <span style={{ fontSize: '24px' }}>{AGES[currentAge].emoji}</span>
                    <span style={{ fontWeight: 900, color: AGES[currentAge].color }}>{AGES[currentAge].name}</span>
                </div>
                <div style={progressStyle}>
                    Progress: {foundItems.length} / {DISCOVERIES.length}
                </div>
            </div>

            <div style={canvasBoxStyle(canvasScale)}>
                <canvas ref={canvasRef} width={GAME_WIDTH} height={GAME_HEIGHT} style={{ width: '100%', height: '100%' }} />

                {gameState === 'intro' && (
                    <div style={overlayStyle}>
                        <h1 style={{ fontSize: '60px', margin: 0 }}>🏹</h1>
                        <h2 style={{ fontSize: '32px', color: '#2c3e50' }}>History of Ancient Britain</h2>
                        <p style={{ maxWidth: '400px', fontSize: '18px', color: '#7f8c8d' }}>
                            Journey through 10,000 years of history! Find the key inventions of each age to evolve your civilization.
                        </p>
                        <button onClick={startGame} style={buttonStyle('#2c3e50')}>Begin Evolution</button>
                    </div>
                )}

                {gameState === 'discovery' && currentDiscovery && (
                    <div style={overlayStyle}>
                        <div style={{ fontSize: '80px' }}>{currentDiscovery.emoji}</div>
                        <h2 style={{ color: currentDiscovery.color }}>{currentDiscovery.name}</h2>
                        <div style={factBoxStyle}>{currentDiscovery.fact}</div>
                        <button onClick={handleNext} style={buttonStyle(currentDiscovery.color)}>Understood</button>
                    </div>
                )}

                {gameState === 'age_up' && (
                    <div style={overlayStyle}>
                        <div style={{ fontSize: '100px' }}>⚡</div>
                        <h2 style={{ fontSize: '36px' }}>CIVILIZATION EVOLVED!</h2>
                        <p style={{ fontSize: '20px' }}>You have unlocked the secrets of {AGES[AGES[currentAge].next].name}!</p>
                        <button onClick={startNextAge} style={buttonStyle('#27ae60')}>Enter the {AGES[AGES[currentAge].next].name}</button>
                    </div>
                )}

                {gameState === 'complete' && (
                    <div style={overlayStyle}>
                        <div style={{ fontSize: '80px' }}>👑</div>
                        <h2>Master of Britain!</h2>
                        <p>You have successfully led your people from the Stone Age all the way to the Iron Age!</p>
                        <button onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)} style={buttonStyle('#2c3e50')}>Finish Lesson</button>
                    </div>
                )}
            </div>

            <div style={{ marginTop: '10px', color: '#7f8c8d', fontWeight: '600' }}>
                Use Arrow Keys or WASD to Move
            </div>
        </div>
    );
}

const containerStyle = {
    width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    background: '#f8f9fa', borderRadius: '24px',
    padding: '20px', position: 'relative'
};

const hudStyle = {
    width: '100%', maxWidth: '800px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '10px 20px', background: '#fff',
    borderRadius: '16px', marginBottom: '15px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
};

const ageIndicatorStyle = { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px' };
const progressStyle = { fontWeight: '700', color: '#7f8c8d' };

const canvasBoxStyle = (scale) => ({
    position: 'relative',
    width: GAME_WIDTH, height: GAME_HEIGHT,
    transform: `scale(${scale})`, transformOrigin: 'top center',
    background: '#fff', borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)', overflow: 'hidden'
});

const overlayStyle = {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
    background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    textAlign: 'center', padding: '40px', zIndex: 10
};

const buttonStyle = (color) => ({
    padding: '15px 40px', fontSize: '20px', fontWeight: '900',
    color: '#fff', backgroundColor: color,
    border: 'none', borderRadius: '12px',
    cursor: 'pointer', transition: 'transform 0.2s', marginTop: '20px'
});

const factBoxStyle = {
    background: '#f8f9fa', padding: '25px', borderRadius: '16px',
    fontSize: '19px', lineHeight: '1.6', color: '#2c3e50',
    maxWidth: '500px', margin: '20px 0', border: '1px solid #dee2e6'
};

export default PrehistoricBritainGame;

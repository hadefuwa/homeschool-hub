import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, stop } from '../utils/textToSpeech';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const GODS = [
    {
        id: 'zeus',
        name: 'Zeus',
        title: 'King of the Gods',
        emoji: '⚡',
        x: 400,
        y: 100,
        color: '#F1C40F',
        fact: "Zeus is the king of all gods and the god of the sky and thunder! He lives on Mount Olympus and carries a powerful lightning bolt. He is the father of many other famous gods and heroes."
    },
    {
        id: 'poseidon',
        name: 'Poseidon',
        title: 'God of the Sea',
        emoji: '🌊',
        x: 100,
        y: 300,
        color: '#3498DB',
        fact: "Poseidon is the mighty ruler of the seas and oceans. He carries a trident that can cause earthquakes and tidal waves. Sailors always tried to keep him happy so they could travel safely!"
    },
    {
        id: 'athena',
        name: 'Athena',
        title: 'Goddess of Wisdom',
        emoji: '🦉',
        x: 700,
        y: 300,
        color: '#95A5A6',
        fact: "Athena is the wise goddess of wisdom, courage, and war strategy. She was born fully grown from the head of Zeus! She is the protector of the city of Athens, which is named after her."
    },
    {
        id: 'hercules',
        name: 'Hercules',
        title: 'The Greatest Hero',
        emoji: '🦁',
        x: 400,
        y: 500,
        color: '#E67E22',
        fact: "Hercules was a famous hero known for his incredible strength. He had to complete twelve difficult tasks, known as the 'Labors of Hercules,' to prove his bravery and help people."
    }
];

function AncientGreeceGame({ lesson }) {
    const navigate = useNavigate();
    const addProgress = useDataStore(state => state.addProgress);
    const getNextProgressId = useDataStore(state => state.getNextProgressId);
    const getUserId = useDataStore(state => state.getUserId);
    const saveData = useDataStore(state => state.saveData);

    const canvasRef = useRef(null);
    const canvasContainerRef = useRef(null);
    const [canvasScale, setCanvasScale] = useState(1);
    const [gameState, setGameState] = useState('intro'); // 'intro', 'playing', 'dialogue', 'complete'
    const [foundGods, setFoundGods] = useState([]);
    const [currentGod, setCurrentGod] = useState(null);
    const [player, setPlayer] = useState({ x: 400, y: 300 });
    const [keys, setKeys] = useState({});

    const playerRef = useRef({ x: 400, y: 300 });
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

        let { x, y } = playerRef.current;
        const speed = 6;
        const margin = 30;

        if (keys['ArrowUp'] || keys['KeyW']) y -= speed;
        if (keys['ArrowDown'] || keys['KeyS']) y += speed;
        if (keys['ArrowLeft'] || keys['KeyA']) x -= speed;
        if (keys['ArrowRight'] || keys['KeyD']) x += speed;

        x = Math.max(margin, Math.min(x, GAME_WIDTH - margin));
        y = Math.max(margin, Math.min(y, GAME_HEIGHT - margin));

        playerRef.current = { x, y };
        setPlayer({ x, y });

        // Check for interactions
        GODS.forEach(god => {
            if (foundRef.current.has(god.id)) return;

            const dx = x - god.x;
            const dy = y - god.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 45) {
                foundRef.current.add(god.id);
                handleInteract(god);
            }
        });
    }, [keys, gameState]);

    const handleInteract = (god) => {
        setCurrentGod(god);
        setFoundGods(prev => [...prev, god.id]);
        setGameState('dialogue');
        speak(`${god.name}: ${god.fact}`, { rate: 0.95 });
    };

    const handleNext = () => {
        if (foundGods.length === GODS.length) {
            setGameState('complete');
            completeGame();
        } else {
            setGameState('playing');
            setCurrentGod(null);
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
    };

    const draw = useCallback((ctx) => {
        // Sky background (Heavenly Olympus)
        const gradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
        gradient.addColorStop(0, '#85C1E9');
        gradient.addColorStop(1, '#AED6F1');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // Clouds
        ctx.fillStyle = 'white';
        for (let i = 0; i < 8; i++) {
            const rx = (i * 257 + Date.now() / 100) % (GAME_WIDTH + 200) - 100;
            const ry = (i * 123) % GAME_HEIGHT;
            ctx.beginPath();
            ctx.arc(rx, ry, 40, 0, Math.PI * 2);
            ctx.arc(rx + 30, ry + 10, 30, 0, Math.PI * 2);
            ctx.arc(rx - 30, ry + 10, 30, 0, Math.PI * 2);
            ctx.fill();
        }

        // Temple pillars (Decorative)
        ctx.fillStyle = '#FBFCFC';
        ctx.fillRect(50, 0, 40, GAME_HEIGHT);
        ctx.fillRect(GAME_WIDTH - 90, 0, 40, GAME_HEIGHT);

        // Gods
        GODS.forEach(god => {
            const found = foundRef.current.has(god.id);

            if (!found) {
                const pulse = Math.sin(Date.now() / 300) * 15;
                ctx.shadowBlur = 20 + pulse;
                ctx.shadowColor = god.color;
            }

            ctx.font = '55px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            if (found) {
                ctx.globalAlpha = 0.4;
                ctx.fillText(god.emoji, god.x, god.y);
                ctx.globalAlpha = 1.0;
                ctx.font = 'bold 24px Arial';
                ctx.fillStyle = '#27AE60';
                ctx.fillText('✓', god.x + 25, god.y - 25);
            } else {
                ctx.fillText(god.emoji, god.x, god.y);
            }
            ctx.shadowBlur = 0;

            ctx.font = 'bold 16px Arial';
            ctx.fillStyle = '#2C3E50';
            ctx.fillText(god.name, god.x, god.y + 45);
        });

        // Player - Pegasus-like character or Hero
        const { x, y } = player;
        ctx.font = '50px Arial';
        ctx.fillText('🏛️', x, y);

    }, [player, currentGod, gameState]);

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
        setFoundGods([]);
        foundRef.current = new Set();
        playerRef.current = { x: 400, y: 300 };
        setPlayer({ x: 400, y: 300 });
        speak("Welcome to Mount Olympus, home of the gods! Explore the clouds to meet the mighty gods and hear the stories of great heroes like Hercules!", { rate: 0.9 });
    };

    return (
        <div ref={canvasContainerRef} style={containerStyle}>
            <div style={hudStyle}>
                <div style={{ fontWeight: 900, fontSize: '20px', color: '#2C3E50' }}>☁️ Mount Olympus Explorer</div>
                <div style={progressStyle}>Gods Met: {foundGods.length} / {GODS.length}</div>
            </div>

            <div style={canvasBoxStyle(canvasScale)}>
                <canvas ref={canvasRef} width={GAME_WIDTH} height={GAME_HEIGHT} style={{ width: '100%', height: '100%' }} />

                {gameState === 'intro' && (
                    <div style={overlayStyle}>
                        <h1 style={{ fontSize: '80px', margin: 0 }}>🏛️</h1>
                        <h2 style={{ fontSize: '36px', color: '#2C3E50' }}>Gods & Heroes</h2>
                        <p style={{ maxWidth: '450px', fontSize: '19px', color: '#7f8c8d', lineHeight: 1.6 }}>
                            Scale the heights of Mount Olympus! Meet the King of the Gods, the Lord of the Sea, and the Goddess of Wisdom to complete your training.
                        </p>
                        <button onClick={startGame} style={buttonStyle('#2C3E50')}>Ascend to Olympus</button>
                    </div>
                )}

                {gameState === 'dialogue' && currentGod && (
                    <div style={overlayStyle}>
                        <div style={{ fontSize: '100px', marginBottom: '10px' }}>{currentGod.emoji}</div>
                        <h2 style={{ color: currentGod.color, margin: 0, fontSize: '32px' }}>{currentGod.name}</h2>
                        <h4 style={{ color: '#7f8c8d', marginTop: '5px' }}>{currentGod.title}</h4>
                        <div style={factBoxStyle}>{currentGod.fact}</div>
                        <button onClick={handleNext} style={buttonStyle(currentGod.color)}>Continue Journey</button>
                    </div>
                )}

                {gameState === 'complete' && (
                    <div style={overlayStyle}>
                        <div style={{ fontSize: '100px' }}>⭐</div>
                        <h2 style={{ fontSize: '36px' }}>Hero of Olympus!</h2>
                        <p style={{ fontSize: '20px', color: '#7f8c8d' }}>You have met the gods and learned the secrets of the heroes.</p>
                        <button onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)} style={buttonStyle('#2C3E50')}>Finish Lesson</button>
                    </div>
                )}
            </div>

            <div style={{ marginTop: '15px', color: '#7f8c8d', fontWeight: '700' }}>
                Move using Arrow Keys or WASD
            </div>
        </div>
    );
}

const containerStyle = {
    width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    background: '#EBF5FB', borderRadius: '24px',
    padding: '20px'
};

const hudStyle = {
    width: '100%', maxWidth: '800px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '15px 25px', background: '#fff',
    borderRadius: '16px', marginBottom: '20px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.05)'
};

const progressStyle = { fontWeight: '800', color: '#3498DB', background: '#EAF2F8', padding: '5px 15px', borderRadius: '20px' };

const canvasBoxStyle = (scale) => ({
    position: 'relative',
    width: GAME_WIDTH, height: GAME_HEIGHT,
    transform: `scale(${scale})`, transformOrigin: 'top center',
    background: '#fff', borderRadius: '20px',
    boxShadow: '0 25px 50px rgba(0,0,0,0.1)', overflow: 'hidden',
    border: '8px solid #FDFEFE'
});

const overlayStyle = {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
    background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    textAlign: 'center', padding: '40px', zIndex: 10
};

const buttonStyle = (color) => ({
    padding: '18px 45px', fontSize: '22px', fontWeight: '900',
    color: '#fff', backgroundColor: color,
    border: 'none', borderRadius: '15px',
    cursor: 'pointer', transition: 'transform 0.2s', marginTop: '25px',
    boxShadow: `0 8px 20px ${color}44`
});

const factBoxStyle = {
    background: '#fff', padding: '30px', borderRadius: '20px',
    fontSize: '20px', lineHeight: '1.6', color: '#2C3E50',
    maxWidth: '550px', margin: '20px 0', border: '2px solid #F2F3F4',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
};

export default AncientGreeceGame;

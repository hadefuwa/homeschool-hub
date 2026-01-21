import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, isSpeaking, stop } from '../utils/textToSpeech';

// Scoring tiers
const SCORE_TIERS = {
    GOLD: { name: 'Gold', color: '#FFD700', minScore: 90 },
    SILVER: { name: 'Silver', color: '#C0C0C0', minScore: 70 },
    BRONZE: { name: 'Bronze', color: '#CD7F32', minScore: 50 },
    FAIL: { name: 'Try Again', color: '#dc3545', minScore: 0 },
};

// Landmarks configuration
const LANDMARKS = [
    {
        id: 1,
        name: 'The Old Clock Tower',
        emoji: '🕰️',
        x: 100,
        y: 100,
        fact: "This clock tower was built over 100 years ago! It used to help everyone in town know the time before people had watches.",
        color: '#FF9F43'
    },
    {
        id: 2,
        name: 'Statue of a Hero',
        emoji: '🗿',
        x: 600,
        y: 150,
        fact: "This statue honors a very brave person from our town who helped many people long ago.",
        color: '#00D2D3'
    },
    {
        id: 3,
        name: 'The Blue Plaque',
        emoji: '🔵',
        x: 400,
        y: 350,
        fact: "Blue plaques are special markers that tell us a famous person lived or worked in this building!",
        color: '#54A0FF'
    },
    {
        id: 4,
        name: 'The Heritage Museum',
        emoji: '🏛️',
        x: 150,
        y: 400,
        fact: "Inside this museum are many old treasures that tell the story of how our town changed over time.",
        color: '#EE5253'
    },
    {
        id: 5,
        name: 'The Ancient Oak',
        emoji: '🌳',
        x: 650,
        y: 420,
        fact: "This tree is the oldest living thing in our town. Imagine what it has seen in 200 years!",
        color: '#10AC84'
    },
];

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

function LocalHistoryGame({ lesson }) {
    const navigate = useNavigate();
    const addProgress = useDataStore(state => state.addProgress);
    const getNextProgressId = useDataStore(state => state.getNextProgressId);
    const getUserId = useDataStore(state => state.getUserId);
    const saveData = useDataStore(state => state.saveData);

    const canvasRef = useRef(null);
    const canvasContainerRef = useRef(null);
    const [canvasScale, setCanvasScale] = useState(1);
    const [gameState, setGameState] = useState('intro'); // 'intro', 'playing', 'found_landmark', 'complete'
    const [foundLandmarks, setFoundLandmarks] = useState([]);
    const [currentLandmark, setCurrentLandmark] = useState(null);
    const [player, setPlayer] = useState({ x: 400, y: 300, dir: 'down' });
    const [keys, setKeys] = useState({});
    const [timeElapsed, setTimeElapsed] = useState(0);
    const timerRef = useRef(null);

    // Animation refs
    const requestRef = useRef();
    const playerRef = useRef({ x: 400, y: 300, dir: 'down' });
    const foundRef = useRef(new Set());

    // Handle responsive scaling
    useEffect(() => {
        const updateScale = () => {
            if (canvasContainerRef.current) {
                const { clientWidth, clientHeight } = canvasContainerRef.current;
                const scale = Math.min(clientWidth / GAME_WIDTH, (clientHeight - 100) / GAME_HEIGHT, 1);
                setCanvasScale(scale);
            }
        };
        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    // Timer
    useEffect(() => {
        if (gameState === 'playing') {
            timerRef.current = setInterval(() => {
                setTimeElapsed(prev => prev + 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [gameState]);

    // Movement controls
    useEffect(() => {
        const handleKeyDown = (e) => setKeys(prev => ({ ...prev, [e.code]: true }));
        const handleKeyUp = (e) => setKeys(prev => ({ ...prev, [e.code]: false }));
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            stop(); // Stop speaking when navigating away
        };
    }, []);

    const movePlayer = useCallback(() => {
        if (gameState !== 'playing') return;

        let { x, y, dir } = playerRef.current;
        const speed = 4;
        const margin = 20;

        if (keys['ArrowUp'] || keys['KeyW']) {
            y -= speed;
            dir = 'up';
        }
        if (keys['ArrowDown'] || keys['KeyS']) {
            y += speed;
            dir = 'down';
        }
        if (keys['ArrowLeft'] || keys['KeyA']) {
            x -= speed;
            dir = 'left';
        }
        if (keys['ArrowRight'] || keys['KeyD']) {
            x += speed;
            dir = 'right';
        }

        // Boundary check
        x = Math.max(margin, Math.min(x, GAME_WIDTH - margin));
        y = Math.max(margin, Math.min(y, GAME_HEIGHT - margin));

        playerRef.current = { x, y, dir };
        setPlayer({ x, y, dir });

        // Check collisions with landmarks
        LANDMARKS.forEach(landmark => {
            if (foundRef.current.has(landmark.id)) return;

            const dx = x - landmark.x;
            const dy = y - landmark.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 40) {
                foundRef.current.add(landmark.id);
                handleLandmarkFound(landmark);
            }
        });
    }, [keys, gameState, foundLandmarks]);

    const handleLandmarkFound = (landmark) => {
        setGameState('found_landmark');
        setCurrentLandmark(landmark);
        setFoundLandmarks(prev => [...prev, landmark.id]);

        // speak() automatically calls stop() internally with a safety buffer
        speak(`You found ${landmark.name}! ${landmark.fact}`, { rate: 0.9, pitch: 1.1 });
    };

    const handleContinue = () => {
        if (foundLandmarks.length === LANDMARKS.length) {
            setGameState('complete');
            completeGame();
        } else {
            setGameState('playing');
            setCurrentLandmark(null);
        }
    };

    const completeGame = async () => {
        const score = 100; // Found all landmarks
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
    };

    const draw = useCallback((ctx) => {
        // Background - Local Village Style
        ctx.fillStyle = '#f0f4f8';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // Decorative grass patches
        ctx.fillStyle = '#e1eedd';
        for (let i = 0; i < 20; i++) {
            const gx = (i * 137) % GAME_WIDTH;
            const gy = (i * 251) % GAME_HEIGHT;
            ctx.beginPath();
            ctx.arc(gx, gy, 40, 0, Math.PI * 2);
            ctx.fill();
        }

        // Paths
        ctx.strokeStyle = '#dcdde1';
        ctx.lineWidth = 40;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.lineTo(400, 300);
        ctx.lineTo(600, 150);
        ctx.moveTo(400, 300);
        ctx.lineTo(150, 400);
        ctx.moveTo(400, 300);
        ctx.lineTo(400, 350);
        ctx.moveTo(400, 350);
        ctx.lineTo(650, 420);
        ctx.stroke();

        // Landmarks
        LANDMARKS.forEach(landmark => {
            const found = foundLandmarks.includes(landmark.id);

            // Glow effect if not found
            if (!found && gameState === 'playing') {
                const pulse = Math.sin(Date.now() / 200) * 10;
                ctx.shadowBlur = 15 + pulse;
                ctx.shadowColor = landmark.color;
            }

            ctx.font = '40px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            if (found) {
                ctx.globalAlpha = 0.5;
                // Draw a checkmark over found landmarks
                ctx.fillText(landmark.emoji, landmark.x, landmark.y);
                ctx.globalAlpha = 1.0;
                ctx.font = 'bold 24px Arial';
                ctx.fillStyle = '#4CAF50';
                ctx.fillText('✓', landmark.x + 20, landmark.y - 20);
            } else {
                ctx.fillText(landmark.emoji, landmark.x, landmark.y);
            }

            ctx.shadowBlur = 0;
        });

        // Player
        const { x, y, dir } = player;
        ctx.save();
        ctx.translate(x, y);

        // Simple explorer character
        ctx.fillStyle = '#4834d4'; // Explorer shirt
        ctx.beginPath();
        ctx.roundRect(-15, -20, 30, 40, 5);
        ctx.fill();

        ctx.fillStyle = '#ffccaa'; // Face
        ctx.beginPath();
        ctx.arc(0, -25, 12, 0, Math.PI * 2);
        ctx.fill();

        // Hat
        ctx.fillStyle = '#686de0';
        ctx.beginPath();
        ctx.arc(0, -32, 10, Math.PI, 0);
        ctx.fill();
        ctx.fillRect(-12, -32, 24, 4);

        // Magnifying glass based on direction
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 3;
        let gx = 15, gy = 0;
        if (dir === 'left') { gx = -15; gy = 0; }
        if (dir === 'up') { gx = 0; gy = -15; }
        if (dir === 'down') { gx = 0; gy = 15; }

        ctx.beginPath();
        ctx.moveTo(gx * 0.5, gy * 0.5);
        ctx.lineTo(gx, gy);
        ctx.stroke();
        ctx.fillStyle = 'rgba(173, 216, 230, 0.6)';
        ctx.beginPath();
        ctx.arc(gx, gy, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.restore();

    }, [player, foundLandmarks, gameState]);

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
        setTimeElapsed(0);
        setFoundLandmarks([]);
        foundRef.current = new Set();
        playerRef.current = { x: 400, y: 300, dir: 'down' };
        setPlayer({ x: 400, y: 300, dir: 'down' });
        speak("Welcome, History Explorer! Move around the town and use your magnifying glass to find hidden treasures from the past!", { rate: 0.9 });
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div ref={canvasContainerRef} style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '20px',
            overflow: 'hidden',
            padding: '20px',
        }}>
            {/* Header UI */}
            <div style={{
                width: '100%',
                maxWidth: '800px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 20px',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                marginBottom: '20px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3436' }}>
                    🔍 Local History Explorer
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '12px', color: '#636e72', textTransform: 'uppercase' }}>Found</div>
                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{foundLandmarks.length} / {LANDMARKS.length}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '12px', color: '#636e72', textTransform: 'uppercase' }}>Time</div>
                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{formatTime(timeElapsed)}</div>
                    </div>
                </div>
            </div>

            {/* Main Canvas Area */}
            <div style={{
                position: 'relative',
                width: GAME_WIDTH,
                height: GAME_HEIGHT,
                transform: `scale(${canvasScale})`,
                transformOrigin: 'top center',
                backgroundColor: '#fff',
                borderRadius: '15px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                overflow: 'hidden',
            }}>
                <canvas
                    ref={canvasRef}
                    width={GAME_WIDTH}
                    height={GAME_HEIGHT}
                    style={{ width: '100%', height: '100%', display: 'block' }}
                />

                {/* Overlays */}
                {gameState === 'intro' && (
                    <div style={overlayStyle}>
                        <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>🗺️</h1>
                        <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Local History Explorer</h2>
                        <p style={{ fontSize: '18px', color: '#636e72', marginBottom: '30px', maxWidth: '400px' }}>
                            Every town has a story! Explore the area to find 5 historical treasures and learn their secrets.
                        </p>
                        <button onClick={startGame} style={buttonStyle}>Start Exploring</button>
                    </div>
                )}

                {gameState === 'found_landmark' && currentLandmark && (
                    <div style={overlayStyle}>
                        <div style={{ fontSize: '80px', marginBottom: '10px' }}>{currentLandmark.emoji}</div>
                        <h2 style={{ fontSize: '28px', color: currentLandmark.color, marginBottom: '15px' }}>{currentLandmark.name}</h2>
                        <div style={{
                            background: '#f8f9fa',
                            padding: '20px',
                            borderRadius: '15px',
                            fontSize: '20px',
                            lineHeight: '1.5',
                            color: '#2d3436',
                            marginBottom: '30px',
                            maxWidth: '500px',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            {currentLandmark.fact}
                        </div>
                        <button onClick={handleContinue} style={{ ...buttonStyle, backgroundColor: currentLandmark.color }}>Continue →</button>
                    </div>
                )}

                {gameState === 'complete' && (
                    <div style={overlayStyle}>
                        <div style={{ fontSize: '80px', marginBottom: '10px' }}>🎉</div>
                        <h2 style={{ fontSize: '36px', marginBottom: '10px' }}>Expert Explorer!</h2>
                        <p style={{ fontSize: '20px', marginBottom: '30px' }}>You found all the landmarks in {formatTime(timeElapsed)}!</p>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button
                                onClick={startGame}
                                style={{ ...buttonStyle, backgroundColor: '#636e72' }}
                            >
                                Play Again
                            </button>
                            <button
                                onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)}
                                style={buttonStyle}
                            >
                                Finished
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Instructions Footer */}
            <div style={{
                marginTop: `${(canvasScale - 1) * GAME_HEIGHT + 20}px`,
                color: '#636e72',
                fontSize: '14px',
                fontWeight: '500'
            }}>
                Use Arrow Keys or WASD to move the explorer
            </div>
        </div>
    );
}

const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '40px',
    zIndex: 10,
    backdropFilter: 'blur(5px)',
};

const buttonStyle = {
    padding: '15px 40px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#4834d4',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 8px 15px rgba(72, 52, 212, 0.2)',
};

export default LocalHistoryGame;

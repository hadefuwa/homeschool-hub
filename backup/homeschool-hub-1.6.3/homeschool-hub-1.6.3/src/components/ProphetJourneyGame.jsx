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

// History Landmarks for the Biblical Journey
const LANDMARKS = [
    {
        id: 1,
        name: 'Ur (Mesopotamia)',
        emoji: '🔥',
        x: 650,
        y: 450,
        fact: "Abraham was born in the city of Ur. He was a brave person who spoke the truth. When he was thrown into a great fire by King Nimrod, a miracle happened—the fire became cool and peaceful for him!",
        color: '#E67E22'
    },
    {
        id: 2,
        name: 'The Land of Canaan',
        emoji: '🛖',
        x: 400,
        y: 300,
        fact: "Abraham traveled here through the desert. Later, his great-grandson Joseph lived here. Joseph had a dream about eleven stars, but his brothers were jealous and cast him into a deep well.",
        color: '#27AE60'
    },
    {
        id: 3,
        name: 'The Palace of Egypt',
        emoji: '🏛️',
        x: 100,
        y: 250,
        fact: "Joseph was taken to Egypt, where he became a wise leader. He saved the land from a great famine by storing grain. Eventually, he was reunited with his brothers and forgave them.",
        color: '#F1C40F'
    },
    {
        id: 4,
        name: 'Mount Sinai',
        emoji: '⛰️',
        x: 250,
        y: 480,
        fact: "Many years later, Moses led his people out of Egypt to find freedom. At this mountain, Moses spoke with God and received important laws to help everyone live a good and honest life.",
        color: '#95A5A6'
    },
];

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

function ProphetJourneyGame({ lesson }) {
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
    const [player, setPlayer] = useState({ x: 650, y: 520, dir: 'up' });
    const [keys, setKeys] = useState({});
    const [timeElapsed, setTimeElapsed] = useState(0);
    const timerRef = useRef(null);

    // Animation refs
    const requestRef = useRef();
    const playerRef = useRef({ x: 650, y: 520, dir: 'up' });
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
            stop();
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
    }, [keys, gameState]);

    const handleLandmarkFound = (landmark) => {
        setGameState('found_landmark');
        setCurrentLandmark(landmark);
        setFoundLandmarks(prev => [...prev, landmark.id]);
        speak(`${landmark.name}: ${landmark.fact}`, { rate: 0.9, pitch: 1.0 });
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
        const score = 100;
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
        // Map Background - Sandy Desert Colors
        ctx.fillStyle = '#fce49c';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // Water (Mediterranean and Red Sea)
        ctx.fillStyle = '#4fa3e3';
        // Mediterranean
        ctx.beginPath();
        ctx.ellipse(0, 100, 300, 400, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        // Red Sea
        ctx.beginPath();
        ctx.moveTo(100, 600);
        ctx.lineTo(250, 400);
        ctx.lineTo(300, 600);
        ctx.fill();

        // Decorative sand dunes
        ctx.strokeStyle = '#e6c27a';
        ctx.lineWidth = 3;
        for (let i = 0; i < 15; i++) {
            const sx = (i * 157) % GAME_WIDTH;
            const sy = (i * 211) % GAME_HEIGHT;
            ctx.beginPath();
            ctx.arc(sx, sy, 30, Math.PI * 1.1, Math.PI * 1.9);
            ctx.stroke();
        }

        // The Journey Path
        ctx.setLineDash([10, 10]);
        ctx.strokeStyle = 'rgba(139, 69, 19, 0.4)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(LANDMARKS[0].x, LANDMARKS[0].y);
        ctx.lineTo(LANDMARKS[1].x, LANDMARKS[1].y);
        ctx.lineTo(LANDMARKS[2].x, LANDMARKS[2].y);
        ctx.lineTo(LANDMARKS[3].x, LANDMARKS[3].y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Landmarks
        LANDMARKS.forEach(landmark => {
            const found = foundLandmarks.includes(landmark.id);

            if (!found && gameState === 'playing') {
                const pulse = Math.sin(Date.now() / 200) * 10;
                ctx.shadowBlur = 15 + pulse;
                ctx.shadowColor = landmark.color;
            }

            ctx.font = '45px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            if (found) {
                ctx.globalAlpha = 0.5;
                ctx.fillText(landmark.emoji, landmark.x, landmark.y);
                ctx.globalAlpha = 1.0;
                ctx.font = 'bold 24px Arial';
                ctx.fillStyle = '#27AE60';
                ctx.fillText('✓', landmark.x + 25, landmark.y - 25);
            } else {
                ctx.fillText(landmark.emoji, landmark.x, landmark.y);
            }

            ctx.shadowBlur = 0;

            // Landmark label
            ctx.font = 'bold 14px Segoe UI, Arial';
            ctx.fillStyle = '#5D4037';
            ctx.fillText(landmark.name, landmark.x, landmark.y + 40);
        });

        // Player (Caravan / Camel Rider)
        const { x, y, dir } = player;
        ctx.save();
        ctx.translate(x, y);
        if (dir === 'left') ctx.scale(-1, 1);

        ctx.font = '40px Arial';
        ctx.fillText('🐫', 0, 0);

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
        playerRef.current = { x: 650, y: 520, dir: 'up' };
        setPlayer({ x: 650, y: 520, dir: 'up' });
        speak("Welcome, History Traveler! Our journey begins in the ancient East. Move your camel across the desert to trace the stories of Abraham, Joseph, and Moses!", { rate: 0.95 });
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
            background: 'linear-gradient(135deg, #FFF9C4 0%, #FFECB3 100%)',
            borderRadius: '24px',
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
                padding: '12px 24px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                marginBottom: '20px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                border: '1px solid rgba(255,255,255,0.3)',
            }}>
                <div style={{ fontSize: '22px', fontWeight: '800', color: '#5D4037', letterSpacing: '-0.5px' }}>
                    📜 Ancient Journeys
                </div>
                <div style={{ display: 'flex', gap: '24px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', color: '#8D6E63', fontWeight: '800', textTransform: 'uppercase' }}>Milestones</div>
                        <div style={{ fontSize: '20px', fontWeight: '900', color: '#3E2723' }}>{foundLandmarks.length} / {LANDMARKS.length}</div>
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
                backgroundColor: '#fce49c',
                borderRadius: '20px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                overflow: 'hidden',
                border: '8px solid #D7CCC8',
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
                        <div style={{ fontSize: '64px', marginBottom: '10px' }}>🐪</div>
                        <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#3E2723', marginBottom: '15px' }}>Abraham to Moses</h2>
                        <p style={{ fontSize: '19px', color: '#5D4037', marginBottom: '35px', maxWidth: '450px', lineHeight: '1.6' }}>
                            Traverse the ancient desert and visit the locations where history changed forever. Learn how these great leaders shaped the world!
                        </p>
                        <button onClick={startGame} style={buttonStyle}>Start the Journey</button>
                    </div>
                )}

                {gameState === 'found_landmark' && currentLandmark && (
                    <div style={overlayStyle}>
                        <div style={{ fontSize: '90px', marginBottom: '15px' }}>{currentLandmark.emoji}</div>
                        <h2 style={{ fontSize: '30px', fontWeight: '900', color: currentLandmark.color, marginBottom: '20px' }}>{currentLandmark.name}</h2>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            padding: '25px',
                            borderRadius: '20px',
                            fontSize: '21px',
                            lineHeight: '1.6',
                            color: '#3E2723',
                            marginBottom: '35px',
                            maxWidth: '550px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                            border: `2px solid ${currentLandmark.color}44`
                        }}>
                            {currentLandmark.fact}
                        </div>
                        <button onClick={handleContinue} style={{ ...buttonStyle, backgroundColor: currentLandmark.color }}>Continue Journey →</button>
                    </div>
                )}

                {gameState === 'complete' && (
                    <div style={overlayStyle}>
                        <div style={{ fontSize: '80px', marginBottom: '15px' }}>📜</div>
                        <h2 style={{ fontSize: '38px', fontWeight: '900', color: '#3E2723', marginBottom: '10px' }}>Journey Completed!</h2>
                        <p style={{ fontSize: '20px', color: '#5D4037', marginBottom: '35px' }}>You have successfully traced the path of history across the ancient world.</p>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <button
                                onClick={startGame}
                                style={{ ...buttonStyle, backgroundColor: '#8D6E63' }}
                            >
                                Revisit History
                            </button>
                            <button
                                onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)}
                                style={buttonStyle}
                            >
                                Finish Lesson
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Instructions Footer */}
            <div style={{
                marginTop: `${(canvasScale - 1) * GAME_HEIGHT + 35}px`,
                color: '#8D6E63',
                fontSize: '15px',
                fontWeight: '700',
                background: 'rgba(255,255,255,0.5)',
                padding: '8px 20px',
                borderRadius: '50px',
            }}>
                Use Arrow Keys or WASD to guide the camel caravan
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
    backgroundColor: 'rgba(252, 243, 227, 0.96)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '40px',
    zIndex: 10,
    backdropFilter: 'blur(8px)',
};

const buttonStyle = {
    padding: '18px 45px',
    fontSize: '22px',
    fontWeight: '900',
    color: '#fff',
    backgroundColor: '#795548',
    border: 'none',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: '0 12px 24px rgba(121, 85, 72, 0.3)',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 15px 30px rgba(121, 85, 72, 0.4)',
    }
};

export default ProphetJourneyGame;

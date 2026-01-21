import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, stop } from '../utils/textToSpeech';

const CHALLENGES = [
    {
        id: 'size',
        title: "The Empire is Too Large",
        description: "News from the borders takes weeks to reach Rome. Our leaders cannot control everything! What should we do?",
        options: [
            { text: "Split the Empire in Two", correct: true, feedback: "Correct! In AD 285, the empire was split into the Western and Eastern Roman Empires to make it easier to manage." },
            { text: "Build more Colosseums", correct: false, feedback: "Games are fun, but they don't help communication with far-off borders!" }
        ]
    },
    {
        id: 'money',
        title: "Economic Problems",
        description: "The army is very expensive, and we are running out of gold. Prices are rising (Inflation). How can we pay the soldiers?",
        options: [
            { text: "Raise Taxes Higher", correct: false, feedback: "The people are already poor! This might cause a revolt." },
            { text: "Cut Costs and Hire Mercenaries", correct: true, feedback: "This was a common solution, though mercernaries weren't always as loyal as Roman citizens!" }
        ]
    },
    {
        id: 'barbarians',
        title: "Invasion at the Gates",
        description: "Tribe groups like the Visigoths and Vandals are attacking our borders. They want land in the empire. What is our defense?",
        options: [
            { text: "Bribe them with gold", correct: false, feedback: "This worked once, but they just kept coming back for more!" },
            { text: "Build stronger Border Forts (Limes)", correct: true, feedback: "Yes! Romans built massive walls and forts, like Hadrian's Wall, to keep invaders out." }
        ]
    }
];

function FallOfRomeGame({ lesson }) {
    const navigate = useNavigate();
    const addProgress = useDataStore(state => state.addProgress);
    const getNextProgressId = useDataStore(state => state.getNextProgressId);
    const getUserId = useDataStore(state => state.getUserId);
    const saveData = useDataStore(state => state.saveData);

    const [currentStep, setCurrentStep] = useState(0);
    const [gameState, setGameState] = useState('intro'); // 'intro', 'playing', 'feedback', 'over'
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        return () => stop();
    }, []);

    const startGame = () => {
        setGameState('playing');
        setCurrentStep(0);
        setScore(0);
        speak("The year is 400 AD. The Roman Empire is in trouble! Can you make the right decisions to try and save the empire from falling?", { rate: 0.95 });
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setGameState('feedback');
        if (option.correct) setScore(prev => prev + 1);
        speak(option.feedback, { rate: 0.95 });
    };

    const handleNext = () => {
        if (currentStep < CHALLENGES.length - 1) {
            setCurrentStep(prev => prev + 1);
            setSelectedOption(null);
            setGameState('playing');
        } else {
            setGameState('over');
            completeGame();
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
                score: Math.round((score / CHALLENGES.length) * 100),
            });
            await addProgress(progress);
            saveData();
        }
    };

    const currentChallenge = CHALLENGES[currentStep];

    return (
        <div style={containerStyle}>
            {gameState === 'intro' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '80px', marginBottom: '20px' }}>📉 🏛️</div>
                    <h1 style={{ color: '#212F3D', margin: 0 }}>The Fall of Rome</h1>
                    <p style={{ fontSize: '18px', color: '#566573', maxWidth: '500px', margin: '20px 0' }}>
                        The greatest empire in history is facing its end. As an advisor to the last Emperors, can you identify the problems bringing Rome down?
                    </p>
                    <button onClick={startGame} style={buttonStyle('#C0392B')}>Hold the Border</button>
                </div>
            )}

            {gameState === 'playing' && currentChallenge && (
                <div style={cardStyle}>
                    <div style={headerStyle}>Challenge {currentStep + 1} of {CHALLENGES.length}</div>
                    <h2 style={{ color: '#C0392B', marginBottom: '10px' }}>{currentChallenge.title}</h2>
                    <p style={{ fontSize: '20px', color: '#2E4053', marginBottom: '30px' }}>{currentChallenge.description}</p>
                    <div style={optionsStyle}>
                        {currentChallenge.options.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => handleOptionSelect(opt)}
                                style={optionButtonStyle}
                            >
                                {opt.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {gameState === 'feedback' && selectedOption && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '100px', marginBottom: '20px' }}>
                        {selectedOption.correct ? '🛡️' : '⚠️'}
                    </div>
                    <h2 style={{ color: selectedOption.correct ? '#27AE60' : '#E67E22', margin: 0 }}>
                        {selectedOption.correct ? 'Good Strategy!' : 'A Difficult Decision...'}
                    </h2>
                    <div style={feedbackBoxStyle}>{selectedOption.feedback}</div>
                    <button onClick={handleNext} style={buttonStyle('#C0392B')}>
                        {currentStep < CHALLENGES.length - 1 ? 'Next Problem →' : 'See The Result'}
                    </button>
                </div>
            )}

            {gameState === 'over' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '100px', marginBottom: '20px' }}>⚔️</div>
                    <h2 style={{ color: '#212F3D', margin: 0 }}>The End of an Era</h2>
                    <p style={{ fontSize: '19px', color: '#566573', margin: '20px 0' }}>
                        Despite your best efforts, the Western Roman Empire fell in **476 AD**. But Roman culture, laws, and language lived on in Europe for centuries!
                    </p>
                    <div style={scoreBoxStyle}>Final Wisdom: {score}/{CHALLENGES.length} Correct</div>
                    <button onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)} style={buttonStyle('#212F3D')}>Finish History</button>
                </div>
            )}
        </div>
    );
}

const containerStyle = {
    width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    background: '#F2F4F4', borderRadius: '24px',
    padding: '40px', overflow: 'hidden'
};

const cardStyle = {
    background: 'white', borderRadius: '30px', padding: '50px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', maxWidth: '750px', borderTop: '10px solid #C0392B'
};

const headerStyle = { fontSize: '14px', fontWeight: 900, color: '#C0392B', textTransform: 'uppercase', marginBottom: '20px' };

const optionsStyle = { display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' };

const optionButtonStyle = {
    padding: '20px', background: '#F8F9F9', border: '2px solid #E5E8E8',
    borderRadius: '15px', cursor: 'pointer', transition: 'all 0.2s',
    fontSize: '18px', fontWeight: 'bold', color: '#2C3E50',
    '&:hover': { background: '#F2F3F4', borderColor: '#C0392B' }
};

const feedbackBoxStyle = {
    background: '#FDF2F1', padding: '25px', borderRadius: '15px',
    fontSize: '18px', lineHeight: 1.6, color: '#1B2631',
    margin: '30px 0', border: '1px solid #E6B0AA'
};

const scoreBoxStyle = {
    fontSize: '22px', fontWeight: 900, color: '#C0392B',
    background: '#FDEDEC', padding: '10px 20px', borderRadius: '10px',
    marginBottom: '20px'
};

const buttonStyle = (color) => ({
    padding: '15px 45px', fontSize: '20px', fontWeight: 900,
    color: 'white', backgroundColor: color,
    border: 'none', borderRadius: '12px',
    cursor: 'pointer', transition: 'all 0.2s'
});

export default FallOfRomeGame;

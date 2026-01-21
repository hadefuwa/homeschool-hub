import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, stop } from '../utils/textToSpeech';

const SCENARIOS = [
    {
        id: 'water',
        question: "The citizens of Rome are thirsty! How will we bring fresh water from the distant mountains into the city?",
        options: [
            { id: 'roads', name: 'Build More Roads', icon: '🛣️', correct: false, feedback: "Roads are great for travel, but they don't carry water!" },
            { id: 'aqueducts', name: 'Build Aqueducts', icon: '🌉', correct: true, feedback: "Correct! Roman Aqueducts were amazing stone bridges that used gravity to carry water for miles into cities and baths." },
            { id: 'temples', name: 'Build Temples', icon: '🏛️', correct: false, feedback: "Temples are for the gods, but the people still need a drink!" }
        ]
    },
    {
        id: 'travel',
        question: "Our Legions need to reach the borders quickly to defend us. How will we make travel faster across the bumpy land?",
        options: [
            { id: 'ships', name: 'Build Ships', icon: '🚢', correct: false, feedback: "Ships are good for the sea, but our soldiers need to cross the land too!" },
            { id: 'roads', name: 'Straight Stone Roads', icon: '🛣️', correct: true, feedback: "Yes! Romans built the best roads in the world. They were straight, strong, and lasted for hundreds of years." },
            { id: 'tunnels', name: 'Dig Tunnels', icon: '🕳️', correct: false, feedback: "Tunnels were too difficult back then. Roads are much more efficient!" }
        ]
    },
    {
        id: 'army',
        question: "We have a huge empire to protect from invaders. Who should we train to keep the 'Pax Romana' (Roman Peace)?",
        options: [
            { id: 'farmers', name: 'The Farmers', icon: '🌾', correct: false, feedback: "Farmers are needed for food, but they aren't trained for battle!" },
            { id: 'senators', name: 'The Senators', icon: '📜', correct: false, feedback: "Senators make the laws, but they don't fight on the front lines." },
            { id: 'legions', name: 'The Roman Legions', icon: '🛡️', correct: true, feedback: "Exactly! The Roman Legions were professional soldiers who were highly disciplined and very difficult to defeat." }
        ]
    },
    {
        id: 'fun',
        question: "The people of Rome want to see games and contests. Where can 50,000 citizens sit together to watch?",
        options: [
            { id: 'baths', name: 'The Roman Baths', icon: '🛁', correct: false, feedback: "The baths are for relaxing and socialising, not for huge games!" },
            { id: 'colosseum', name: 'The Colosseum', icon: '🏟️', correct: true, feedback: "Correct! The Colosseum was a massive amphitheatre where gladiators fought and games were held for everyone to see." },
            { id: 'palace', name: 'The Emperor\'s Palace', icon: '🏰', correct: false, feedback: "The Palace is only for the Emperor and his family, not for thousands of citizens!" }
        ]
    },
    {
        id: 'writing',
        question: "We need everyone to understand our laws and history. What language will we use for our scrolls and inscriptions?",
        options: [
            { id: 'latin', name: 'Latin', icon: '📜', correct: true, feedback: "Correct! Latin was the official language of the Roman Empire. Many languages like Italian, French, and Spanish come from Latin!" },
            { id: 'hieroglyphs', name: 'Hieroglyphs', icon: '𓀀', correct: false, feedback: "Those are Egyptian! Romans used their own alphabet for Latin." },
            { id: 'english', name: 'English', icon: '🇬🇧', correct: false, feedback: "English didn't even exist yet! That came much later." }
        ]
    }
];

function AncientRomeGame({ lesson }) {
    const navigate = useNavigate();
    const addProgress = useDataStore(state => state.addProgress);
    const getNextProgressId = useDataStore(state => state.getNextProgressId);
    const getUserId = useDataStore(state => state.getUserId);
    const saveData = useDataStore(state => state.saveData);

    const [gameState, setGameState] = useState('intro'); // 'intro', 'playing', 'feedback', 'complete'
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [wrongAttempts, setWrongAttempts] = useState(0);

    useEffect(() => {
        return () => stop();
    }, []);

    const startChallenge = () => {
        setGameState('playing');
        setCurrentStep(0);
        setScore(0);
        setWrongAttempts(0);
        speak("Welcome, Roman Architect! The Emperor needs your help to build and manage the greatest empire in history. Choose wisely to solve the problems of Rome!", { rate: 0.95 });
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setGameState('feedback');

        if (option.correct) {
            setScore(prev => prev + 1);
            speak(option.feedback, { rate: 0.95 });
        } else {
            setWrongAttempts(prev => prev + 1);
            speak(option.feedback, { rate: 0.95, pitch: 0.9 });
        }
    };

    const nextStep = () => {
        if (currentStep < SCENARIOS.length - 1) {
            setCurrentStep(prev => prev + 1);
            setSelectedOption(null);
            setGameState('playing');
        } else {
            setGameState('complete');
            completeGame();
        }
    };

    const completeGame = async () => {
        const finalScore = Math.max(0, Math.round((score / SCENARIOS.length) * 100));
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
                score: finalScore,
            });
            await addProgress(progress);
            saveData();
        }
    };

    const currentScenario = SCENARIOS[currentStep];

    return (
        <div style={containerStyle}>
            {/* Header / Empire Status */}
            <div style={headerStyle}>
                <div style={titleStyle}>🛡️ Empire Architect</div>
                <div style={statBarContainer}>
                    <div style={{ ...statBarStyle, width: `${(currentStep / SCENARIOS.length) * 100}%` }}></div>
                </div>
                <div style={progressLabelStyle}>Empire Expansion: {Math.round((currentStep / SCENARIOS.length) * 100)}%</div>
            </div>

            {/* Main Interaction Area */}
            <div style={mainAreaStyle}>
                {gameState === 'intro' && (
                    <div style={cardStyle}>
                        <div style={{ fontSize: '100px', marginBottom: '20px' }}>🏛️</div>
                        <h2 style={{ fontSize: '36px', color: '#8B0000', margin: '0 0 15px 0' }}>The Roman Empire</h2>
                        <p style={{ fontSize: '20px', color: '#5D4037', lineHeight: '1.6', maxWidth: '500px' }}>
                            Rome wasn't built in a day! As an Advisor to the Emperor, you must make the right choices to grow our civilization from a small city to a massive empire.
                        </p>
                        <button onClick={startChallenge} style={buttonStyle('#8B0000')}>Enter the Forum</button>
                    </div>
                )}

                {gameState === 'playing' && currentScenario && (
                    <div style={cardStyle}>
                        <div style={questionHeaderStyle}>Scenario {currentStep + 1}</div>
                        <h3 style={questionTextStyle}>{currentScenario.question}</h3>
                        <div style={optionsGridStyle}>
                            {currentScenario.options.map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => handleOptionSelect(opt)}
                                    style={optionButtonStyle}
                                >
                                    <div style={{ fontSize: '50px', marginBottom: '10px' }}>{opt.icon}</div>
                                    <div style={{ fontWeight: 800 }}>{opt.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {gameState === 'feedback' && selectedOption && (
                    <div style={cardStyle}>
                        <div style={{ fontSize: '120px', marginBottom: '20px' }}>
                            {selectedOption.correct ? '🏆' : '🤔'}
                        </div>
                        <h2 style={{
                            fontSize: '32px',
                            color: selectedOption.correct ? '#27AE60' : '#E67E22',
                            margin: '0 0 20px 0'
                        }}>
                            {selectedOption.correct ? 'Excellent Choice!' : 'Try Again!'}
                        </h2>
                        <div style={feedbackBoxStyle(selectedOption.correct)}>
                            {selectedOption.feedback}
                        </div>
                        <button
                            onClick={selectedOption.correct ? nextStep : () => setGameState('playing')}
                            style={buttonStyle(selectedOption.correct ? '#27AE60' : '#E67E22')}
                        >
                            {selectedOption.correct ? (currentStep === SCENARIOS.length - 1 ? 'See Results' : 'Next Challenge →') : 'Back to Forum'}
                        </button>
                    </div>
                )}

                {gameState === 'complete' && (
                    <div style={cardStyle}>
                        <div style={{ fontSize: '100px', marginBottom: '20px' }}>🏛️</div>
                        <h2 style={{ fontSize: '38px', color: '#8B0000', margin: '0 0 10px 0' }}>Empire Built!</h2>
                        <p style={{ fontSize: '22px', color: '#5D4037', marginBottom: '30px' }}>
                            You have successfully solved the problems of the city and expanded the borders of Rome. The Emperor is pleased!
                        </p>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <button onClick={startChallenge} style={secondaryButtonStyle}>Rebuild Rome</button>
                            <button onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)} style={buttonStyle('#8B0000')}>Finish Lesson</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div style={footerStyle}>
                "Veni, Vidi, Vici" — I came, I saw, I conquered!
            </div>
        </div>
    );
}

const containerStyle = {
    width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', background: 'linear-gradient(135deg, #FDF2E9 0%, #E6B0AA 100%)',
    borderRadius: '24px', padding: '30px', overflow: 'hidden'
};

const headerStyle = {
    width: '100%', maxWidth: '900px',
    background: 'white', borderRadius: '20px',
    padding: '20px 40px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    marginBottom: '30px'
};

const titleStyle = { fontSize: '24px', fontWeight: 900, color: '#8B0000', marginBottom: '15px', letterSpacing: '1px' };

const statBarContainer = { width: '100%', height: '12px', background: '#F2D7D5', borderRadius: '10px', overflow: 'hidden' };
const statBarStyle = { height: '100%', background: '#8B0000', transition: 'width 0.5s ease-out' };
const progressLabelStyle = { marginTop: '8px', fontSize: '14px', fontWeight: 800, color: '#8B0000', opacity: 0.8 };

const mainAreaStyle = { flex: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' };

const cardStyle = {
    width: '100%', maxWidth: '750px', minHeight: '450px',
    background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)',
    borderRadius: '30px', padding: '50px',
    boxShadow: '0 30px 60px rgba(139, 0, 0, 0.15)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    textAlign: 'center', border: '2px solid white'
};

const questionHeaderStyle = {
    fontSize: '18px', fontWeight: 900, color: '#8B0000',
    textTransform: 'uppercase', marginBottom: '15px', letterSpacing: '2px'
};

const questionTextStyle = { fontSize: '28px', color: '#1A1A1A', lineHeight: 1.4, margin: '0 0 40px 0' };

const optionsGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', width: '100%' };

const optionButtonStyle = {
    padding: '25px 15px', background: 'white', border: '2px solid #F2D7D5',
    borderRadius: '20px', cursor: 'pointer', transition: 'all 0.2s',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    '&:hover': { transform: 'translateY(-5px)', borderColor: '#8B0000', boxShadow: '0 10px 20px rgba(139, 0, 0, 0.1)' }
};

const feedbackBoxStyle = (isCorrect) => ({
    background: isCorrect ? '#E8F6F3' : '#FEF5E7',
    border: `2px solid ${isCorrect ? '#27AE60' : '#E67E22'}`,
    borderRadius: '15px', padding: '25px', color: '#1A1A1A',
    fontSize: '19px', lineHeight: 1.6, marginBottom: '35px', maxWidth: '550px'
});

const buttonStyle = (color) => ({
    padding: '18px 45px', fontSize: '20px', fontWeight: 900,
    color: 'white', backgroundColor: color,
    border: 'none', borderRadius: '15px',
    cursor: 'pointer', transition: 'all 0.2s',
    boxShadow: `0 8px 20px ${color}44`
});

const secondaryButtonStyle = {
    padding: '18px 45px', fontSize: '20px', fontWeight: 900,
    color: '#8B0000', backgroundColor: 'transparent',
    border: '2px solid #8B0000', borderRadius: '15px',
    cursor: 'pointer', transition: 'all 0.2s'
};

const footerStyle = { marginTop: '20px', fontSize: '15px', color: '#8B0000', fontWeight: 700, fontStyle: 'italic', opacity: 0.6 };

export default AncientRomeGame;

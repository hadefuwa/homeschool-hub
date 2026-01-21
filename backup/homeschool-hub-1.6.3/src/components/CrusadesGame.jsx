import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, stop } from '../utils/textToSpeech';

const CAMPAIGNS = [
    {
        id: 'origin',
        title: 'The Call to Arms',
        description: "In 1095, Pope Urban II gave a speech calling on knights to travel to the Holy Land. Why did thousands of people leave their homes to go on such a dangerous journey?",
        options: [
            { text: "For religious reasons and the promise of heaven", correct: true, feedback: "Correct! Faith was the primary driver, though some also went for adventure or to gain new land." },
            { text: "To find a new route to America", correct: false, feedback: "America hadn't been discovered by Europeans yet! That's many centuries later." }
        ]
    },
    {
        id: 'travel',
        title: 'A Long Journey',
        description: "The journey to Jerusalem was thousands of miles. Most crusaders traveled by foot or horse across mountains and deserts. What was their biggest challenge?",
        options: [
            { text: "Finding enough charging stations", correct: false, feedback: "There was no electricity! They struggled with hunger, thirst, and disease." },
            { text: "Hunger, disease, and harsh weather", correct: true, feedback: "Exactly. More people died from sickness and exhaustion than in actual battles." }
        ]
    },
    {
        id: 'culture',
        title: 'Exchange of Ideas',
        description: "While the Crusades were wars, they also led to Europeans learning new things from the Islamic world. What did they bring back?",
        options: [
            { text: "Spices, silk, and advanced medicine", correct: true, feedback: "Yes! Crusaders brought back exotic spices (like pepper and cinnamon), fine silk, and knowledge of algebra and medicine." },
            { text: "The secret to making plastics", correct: false, feedback: "Plastic is a modern invention. They brought back natural materials and ancient knowledge." }
        ]
    }
];

function CrusadesGame({ lesson }) {
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
        speak("The Crusades were a series of religious wars that changed the map of the world. Can you understand the motivations and consequences of these journeys?", { rate: 0.95 });
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setGameState('feedback');
        if (option.correct) setScore(prev => prev + 1);
        speak(option.feedback, { rate: 0.95 });
    };

    const handleNext = () => {
        if (currentStep < CAMPAIGNS.length - 1) {
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
                score: Math.round((score / CAMPAIGNS.length) * 100),
            });
            await addProgress(progress);
            saveData();
        }
    };

    const currentCampaign = CAMPAIGNS[currentStep];

    return (
        <div style={containerStyle}>
            {gameState === 'intro' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '80px', marginBottom: '20px' }}>⚔️ 🛡️</div>
                    <h1 style={{ color: '#7B241C', margin: 0 }}>The Crusades</h1>
                    <p style={{ fontSize: '18px', color: '#922B21', maxWidth: '500px', margin: '20px 0', lineHeight: 1.6 }}>
                        Journey across continents to understand the wars that reshaped the Middle Ages and the meeting of two great civilizations.
                    </p>
                    <button onClick={startGame} style={buttonStyle('#7B241C')}>Begin Journey</button>
                </div>
            )}

            {gameState === 'playing' && currentCampaign && (
                <div style={cardStyle}>
                    <div style={headerStyle}>History Inquiry {currentStep + 1}</div>
                    <h2 style={{ color: '#7B241C', marginBottom: '10px' }}>{currentCampaign.title}</h2>
                    <p style={{ fontSize: '20px', color: '#1B2631', marginBottom: '30px', lineHeight: 1.5 }}>{currentCampaign.description}</p>
                    <div style={optionsStyle}>
                        {currentCampaign.options.map((opt, i) => (
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
                        {selectedOption.correct ? '📜' : '⚖️'}
                    </div>
                    <h2 style={{ color: selectedOption.correct ? '#1D8348' : '#D35400', margin: 0 }}>
                        {selectedOption.correct ? 'Historical Fact!' : 'Keep Learning...'}
                    </h2>
                    <div style={feedbackBoxStyle}>{selectedOption.feedback}</div>
                    <button onClick={handleNext} style={buttonStyle('#7B241C')}>
                        {currentStep < CAMPAIGNS.length - 1 ? 'Next Chapter →' : 'Final Reflection'}
                    </button>
                </div>
            )}

            {gameState === 'over' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '100px', marginBottom: '20px' }}>🌍</div>
                    <h2 style={{ color: '#7B241C', margin: 0 }}>A Changed World</h2>
                    <p style={{ fontSize: '19px', color: '#1B2631', margin: '20px 0', lineHeight: 1.6 }}>
                        The Crusades were a time of great conflict, but they also opened up trade and the exchange of ideas between the East and the West.
                    </p>
                    <div style={scoreBoxStyle}>Exploration Score: {Math.round((score / CAMPAIGNS.length) * 100)}%</div>
                    <button onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)} style={buttonStyle('#7B241C')}>Return to Lessons</button>
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
    background: 'white', borderRadius: '30px', padding: '50px',
    boxShadow: '0 20px 40px rgba(123, 36, 28, 0.1)',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', maxWidth: '750px', borderTop: '8px solid #7B241C'
};

const headerStyle = { fontSize: '14px', fontWeight: 900, color: '#7B241C', textTransform: 'uppercase', marginBottom: '15px' };

const optionsStyle = { display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' };

const optionButtonStyle = {
    padding: '20px', background: '#F9F9F9', border: '2px solid #E5E7EB',
    borderRadius: '15px', cursor: 'pointer', transition: 'all 0.2s',
    fontSize: '18px', fontWeight: 'bold', color: '#1B2631',
    '&:hover': { background: '#FADBD8', borderColor: '#7B241C' }
};

const feedbackBoxStyle = {
    background: '#FEF9E7', padding: '25px', borderRadius: '15px',
    fontSize: '18px', lineHeight: 1.6, color: '#1B2631',
    margin: '30px 0', border: '1px solid #F7DC6F'
};

const scoreBoxStyle = {
    fontSize: '22px', fontWeight: 900, color: '#7B241C',
    background: '#FADBD8', padding: '10px 20px', borderRadius: '10px',
    marginBottom: '20px'
};

const buttonStyle = (color) => ({
    padding: '15px 45px', fontSize: '20px', fontWeight: 900,
    color: 'white', backgroundColor: color,
    border: 'none', borderRadius: '12px',
    cursor: 'pointer', transition: 'all 0.2s'
});

export default CrusadesGame;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, stop } from '../utils/textToSpeech';

const MILESTONES = [
    {
        id: 'segregation',
        title: 'Milestone 1: The Fight Against Segregation',
        description: 'In the 1950s, many states had laws that enforced "Segregation"—the separation of people based on race. What landmark Supreme Court case in 1954 ruled that separating children in public schools was unconstitutional?',
        choices: [
            { text: 'Plessy v. Ferguson', correct: false },
            { text: 'Brown v. Board of Education', correct: true },
            { text: 'Roe v. Wade', correct: false }
        ],
        outcome: 'Brown v. Board of Education ended the legal basis for segregation in schools, though the fight for equality was just beginning.'
    },
    {
        id: 'rosa_parks',
        title: 'Milestone 2: The Power of Refusal',
        description: '1955. Rosa Parks was arrested in Montgomery, Alabama, for refusing to give up her seat on a bus. This spark led to a 381-day protest. Who was the young minister chosen to lead this "Montgomery Bus Boycott"?',
        choices: [
            { text: 'Malcolm X', correct: false },
            { text: 'Thurgood Marshall', correct: false },
            { text: 'Martin Luther King Jr.', correct: true }
        ],
        outcome: 'Dr. King’s leadership in the boycott proved that non-violent, collective action could bring about real legal change.'
    },
    {
        id: 'march',
        title: 'Milestone 3: I Have a Dream',
        description: '1963. Over 250,000 people gathered at the Lincoln Memorial for the March on Washington. What was the central message of Dr. King’s famous speech that day?',
        choices: [
            { text: 'A call for violent revolution', correct: false },
            { text: 'A vision of a future where people are judged by character, not skin color', correct: true },
            { text: 'A request for more land in the West', correct: false }
        ],
        outcome: 'Dr. King’s vision inspired millions and put immense pressure on the US government to pass new, fair laws.'
    },
    {
        id: 'legislation',
        title: 'Milestone 4: Legislative Change',
        description: 'The movement led to two massive laws that changed American history. Which law in 1965 was designed to overcome legal barriers that prevented Black Americans from exercising their right to vote?',
        choices: [
            { text: 'The Emancipation Proclamation', correct: false },
            { text: 'The Voting Rights Act of 1965', correct: true },
            { text: 'The Declaration of Independence', correct: false }
        ],
        outcome: 'The Voting Rights Act removed discriminatory hurdles like literacy tests, ensuring every citizen could help choose their leaders.'
    }
];

function CivilRightsGame({ lesson }) {
    const navigate = useNavigate();
    const addProgress = useDataStore(state => state.addProgress);
    const getNextProgressId = useDataStore(state => state.getNextProgressId);
    const getUserId = useDataStore(state => state.getUserId);
    const saveData = useDataStore(state => state.saveData);

    const [levelIndex, setLevelIndex] = useState(0);
    const [gameState, setGameState] = useState('intro'); // 'intro', 'question', 'complete'
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(100);
    const [showOutcome, setShowOutcome] = useState(false);

    useEffect(() => {
        return () => stop();
    }, []);

    const startLevel = () => {
        setGameState('question');
        setSelected(null);
        setShowOutcome(false);
        const level = MILESTONES[levelIndex];
        speak(level.title + ". " + level.description, { rate: 0.95 });
    };

    const handleChoice = (choice) => {
        if (selected) return;
        setSelected(choice);
        setShowOutcome(true);

        if (choice.correct) {
            speak("That is correct. " + MILESTONES[levelIndex].outcome);
        } else {
            setScore(prev => Math.max(0, prev - 15));
            speak("Actually, " + MILESTONES[levelIndex].outcome);
        }
    };

    const nextLevel = () => {
        if (levelIndex < MILESTONES.length - 1) {
            setLevelIndex(prev => prev + 1);
            setSelected(null);
            setShowOutcome(false);
        } else {
            finishGame();
        }
    };

    useEffect(() => {
        if (gameState === 'question') {
            const level = MILESTONES[levelIndex];
            speak(level.title + ". " + level.description, { rate: 0.95 });
        }
    }, [levelIndex, gameState]);

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
                score: score,
            });
            await addProgress(progress);
            saveData();
        }
        setGameState('complete');
    };

    return (
        <div style={containerStyle}>
            {gameState === 'intro' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '80px', marginBottom: '20px' }}>✊ 🗽</div>
                    <h1 style={{ color: '#4A148C' }}>The Civil Rights Journey</h1>
                    <p style={{ fontSize: '18px', lineHeight: 1.6, maxWidth: '600px' }}>
                        The Civil Rights Movement was a decades-long struggle by African Americans and their allies to end institutional racial discrimination and segregation.
                    </p>
                    <button onClick={startLevel} style={buttonStyle('#4A148C')}>Explore History</button>
                </div>
            )}

            {gameState === 'question' && (
                <div style={cardStyle}>
                    <h2 style={{ color: '#6A1B9A' }}>{MILESTONES[levelIndex].title}</h2>
                    <p style={{ fontSize: '18px', color: '#424242', margin: '20px 0' }}>{MILESTONES[levelIndex].description}</p>

                    <div style={choicesGrid}>
                        {MILESTONES[levelIndex].choices.map((choice, i) => (
                            <button
                                key={i}
                                disabled={selected !== null}
                                onClick={() => handleChoice(choice)}
                                style={choiceButtonStyle(selected, choice)}
                            >
                                {choice.text}
                            </button>
                        ))}
                    </div>

                    {showOutcome && (
                        <div style={outcomeBox}>
                            <p>{MILESTONES[levelIndex].outcome}</p>
                            <button onClick={nextLevel} style={buttonStyle('#6A1B9A', '100%')}>
                                {levelIndex < MILESTONES.length - 1 ? 'Next Milestone' : 'Reflect on History'}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {gameState === 'complete' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '100px', marginBottom: '20px' }}>🪧</div>
                    <h1>History of Change</h1>
                    <p style={{ fontSize: '20px' }}>You have analyzed the key moments of the Civil Rights Movement, seeing how courage and law combined to create a more equal world.</p>
                    <div style={finalScore}>Legacy Insight: {score}%</div>
                    <button onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)} style={buttonStyle('#4A148C')}>Archive Knowledge</button>
                </div>
            )}
        </div>
    );
}

const containerStyle = {
    width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    background: '#F3E5F5', borderRadius: '24px', padding: '30px', overflow: 'hidden'
};

const cardStyle = {
    background: 'white', borderRadius: '30px', padding: '40px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', maxWidth: '800px', width: '100%', border: '2px solid #D1C4E9'
};

const choicesGrid = { display: 'grid', gridTemplateColumns: '1fr', gap: '15px', width: '100%', marginTop: '20px' };

const choiceButtonStyle = (selected, choice) => {
    let bg = 'white';
    let color = '#4A148C';
    let border = '2px solid #D1C4E9';

    if (selected) {
        if (choice.correct) {
            bg = '#E8F5E9';
            border = '2px solid #2E7D32';
        } else if (selected === choice) {
            bg = '#FFEBEE';
            border = '2px solid #C62828';
            color = '#C62828';
        }
    }

    return {
        padding: '16px', borderRadius: '15px', fontSize: '18px', fontWeight: 'bold',
        cursor: selected ? 'default' : 'pointer', background: bg, color, border,
        transition: 'all 0.2s ease', opacity: selected && !choice.correct && selected !== choice ? 0.6 : 1
    };
};

const outcomeBox = {
    marginTop: '25px', padding: '20px', background: '#F3E5F5',
    borderRadius: '20px', border: '1px solid #CE93D8', color: '#4A148C',
    fontSize: '18px', lineHeight: 1.5, width: '100%'
};

const finalScore = {
    background: '#4A148C', padding: '15px 40px', borderRadius: '20px',
    fontSize: '28px', fontWeight: '900', color: 'white',
    margin: '25px 0'
};

const buttonStyle = (bg, width = 'auto') => ({
    padding: '16px 45px', fontSize: '20px', fontWeight: 900, color: 'white',
    backgroundColor: bg, border: 'none', borderRadius: '15px', cursor: 'pointer',
    marginTop: '20px', width
});

export default CivilRightsGame;

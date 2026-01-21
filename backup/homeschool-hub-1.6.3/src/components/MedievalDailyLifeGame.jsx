import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, stop } from '../utils/textToSpeech';

const DAILY_TASKS = [
    {
        id: 'farming',
        title: 'The Peasant\'s Fields',
        emoji: '🌾',
        fact: "Life as a peasant was hard work from sunrise to sunset. You had to farm your own small plot of land and also work on the Lord's land for three days a week. This was called 'Labor Service'.",
        items: ['Plough the soil', 'Sow the seeds', 'Harvest the wheat']
    },
    {
        id: 'blacksmith',
        title: 'The Village Smithy',
        emoji: '🔨',
        fact: "The blacksmith was one of the most important people in the village. He made tools for farmers, nails for houses, and even horseshoes. If the Lord went to war, the smith would make spear heads and arrow tips!",
        items: ['Forge a sickle', 'Shoe a horse', 'Repair a pot']
    },
    {
        id: 'cooking',
        title: 'The Peasant Cottage',
        emoji: '🥣',
        fact: "Peasants lived in simple houses made of 'wattle and daub' (sticks and mud). They mostly ate 'Pottage'—a thick vegetable soup or stew. Meat was a rare treat, as most animals were kept for their milk or wool.",
        items: ['Stir the pottage', 'Bake the rye bread', 'Gather firewood']
    },
    {
        id: 'market',
        title: 'The Town Market',
        emoji: '⚖️',
        fact: "Markets were where villagers traded their extra goods for things they couldn't make themselves, like salt or spices. They used a system of 'Barter' (trading one thing for another) or small coins.",
        items: ['Trade eggs for cloth', 'Sell surplus wool', 'Buy a bag of salt']
    }
];

function MedievalDailyLifeGame({ lesson }) {
    const navigate = useNavigate();
    const addProgress = useDataStore(state => state.addProgress);
    const getNextProgressId = useDataStore(state => state.getNextProgressId);
    const getUserId = useDataStore(state => state.getUserId);
    const saveData = useDataStore(state => state.saveData);

    const [gameState, setGameState] = useState('intro'); // 'intro', 'exploring', 'task', 'complete'
    const [viewedTasks, setViewedTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        return () => stop();
    }, []);

    const startGame = () => {
        setGameState('exploring');
        speak("Step into the year 1250. Choose a part of the village to see what a normal day was like for a medieval person.", { rate: 0.95 });
    };

    const selectTask = (task) => {
        setCurrentTask(task);
        setGameState('task');
        if (!viewedTasks.includes(task.id)) {
            setViewedTasks(prev => [...prev, task.id]);
        }
        speak(`${task.title}. ${task.fact}`, { rate: 0.95 });
    };

    const nextTask = () => {
        if (viewedTasks.length === DAILY_TASKS.length) {
            setGameState('complete');
            completeGame();
        } else {
            setGameState('exploring');
            setCurrentTask(null);
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
        speak("You have experienced a full day of medieval life. It was a life of hard work, but very important for the kingdom's survival!", { rate: 0.95 });
    };

    return (
        <div style={containerStyle}>
            {gameState === 'intro' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '80px', marginBottom: '20px' }}>🏘️</div>
                    <h1 style={{ color: '#5D4037', margin: 0 }}>Medieval Daily Life</h1>
                    <p style={{ fontSize: '18px', color: '#795548', maxWidth: '500px', margin: '20px 0', lineHeight: 1.6 }}>
                        What was it like to live in a village 800 years ago? Explore the fields, the cottages, and the smithy to find out!
                    </p>
                    <button onClick={startGame} style={buttonStyle('#5D4037')}>Start the Day</button>
                </div>
            )}

            {gameState === 'exploring' && (
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ color: '#5D4037', marginBottom: '30px' }}>Visit the Village</h2>
                    <div style={gridStyle}>
                        {DAILY_TASKS.map(task => (
                            <div
                                key={task.id}
                                onClick={() => selectTask(task)}
                                style={taskCardStyle(viewedTasks.includes(task.id))}
                            >
                                <div style={{ fontSize: '60px' }}>{task.emoji}</div>
                                <div style={{ fontWeight: 800, marginTop: '10px', color: '#5D4037' }}>{task.title}</div>
                                {viewedTasks.includes(task.id) && <div style={visitedBadge}>Done ✓</div>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {gameState === 'task' && currentTask && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '90px', marginBottom: '10px' }}>{currentTask.emoji}</div>
                    <h2 style={{ color: '#5D4037', margin: '0 0 20px 0' }}>{currentTask.title}</h2>
                    <div style={factBoxStyle}>{currentTask.fact}</div>

                    <div style={itemsListStyle}>
                        {currentTask.items.map((item, i) => (
                            <div key={i} style={itemStyle}>
                                <span style={{ marginRight: '10px' }}>⚒️</span> {item}
                            </div>
                        ))}
                    </div>

                    <button onClick={nextTask} style={buttonStyle('#5D4037')}>Next Task</button>
                </div>
            )}

            {gameState === 'complete' && (
                <div style={cardStyle}>
                    <div style={{ fontSize: '100px', marginBottom: '20px' }}>🌾</div>
                    <h2 style={{ color: '#5D4037', margin: 0 }}>Day's Work Finished!</h2>
                    <p style={{ fontSize: '20px', color: '#795548', margin: '20px 0' }}>
                        The sun is setting on the village. You have learned how medieval people worked together to thrive.
                    </p>
                    <button onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)} style={buttonStyle('#5D4037')}>Finish Lesson</button>
                </div>
            )}
        </div>
    );
}

const containerStyle = {
    width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    background: '#EFEBE9', borderRadius: '24px',
    padding: '40px', overflow: 'hidden'
};

const cardStyle = {
    background: 'white', borderRadius: '30px', padding: '40px',
    boxShadow: '0 15px 40px rgba(93, 64, 55, 0.15)',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', maxWidth: '700px', border: '2px solid #D7CCC8'
};

const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', width: '600px' };

const taskCardStyle = (visited) => ({
    background: visited ? '#D7CCC8' : 'white',
    padding: '30px', borderRadius: '20px',
    cursor: 'pointer', transition: 'all 0.2s',
    border: `3px solid ${visited ? '#5D4037' : '#BCAAA4'}`,
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    position: 'relative',
    '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }
});

const visitedBadge = {
    position: 'absolute', top: '10px', right: '10px',
    background: '#388E3C', color: 'white',
    padding: '2px 8px', borderRadius: '10px',
    fontSize: '12px', fontWeight: 'bold'
};

const factBoxStyle = {
    background: '#F5F5F5', padding: '20px', borderRadius: '15px',
    fontSize: '18px', lineHeight: 1.6, color: '#3E2723',
    marginBottom: '20px', borderLeft: '5px solid #5D4037'
};

const itemsListStyle = { width: '100%', textAlign: 'left', marginBottom: '30px' };
const itemStyle = {
    background: '#FAFAFA', padding: '12px 15px',
    borderRadius: '10px', marginBottom: '8px',
    fontSize: '16px', color: '#5D4037', fontWeight: 600,
    border: '1px solid #D7CCC8'
};

const buttonStyle = (color) => ({
    padding: '15px 40px', fontSize: '20px', fontWeight: 900,
    color: 'white', backgroundColor: color,
    border: 'none', borderRadius: '12px',
    cursor: 'pointer', transition: 'all 0.2s',
    boxShadow: `0 4px 10px ${color}44`
});

export default MedievalDailyLifeGame;

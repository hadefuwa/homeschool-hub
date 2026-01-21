import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, stop } from '../utils/textToSpeech';

const RENAISSANCE_STAGES = [
  {
    id: 'patrons',
    title: 'Stage 1: The Patronage Board',
    instructions: 'Florence, Rome, and Venice need resources to flourish. Match the right resource to each city.',
    tasks: [
      { city: 'Florence', resource: 'Medici Wealth', icon: '💰', reason: 'The Medici family funded the greatest artists of Florence.' },
      { city: 'Rome', resource: 'Papal Support', icon: '⛪', reason: 'The Popes commissioned Michelangelo for the Sistine Chapel.' },
      { city: 'Venice', resource: 'Maritime Trade', icon: '🚢', reason: 'Venice used its sea wealth to fund unique architectural styles.' }
    ]
  },
  {
    id: 'timeline',
    title: 'Stage 2: Perspective Timeline',
    instructions: 'Order these breakthroughs from earliest to latest.',
    events: [
      { year: 1434, text: 'Medici family takes control of Florence', id: 'medici' },
      { year: 1450, text: 'Gutenberg perfects the Printing Press', id: 'press' },
      { year: 1508, text: 'Michelangelo begins the Sistine Chapel', id: 'miche' }
    ]
  },
  {
    id: 'invention',
    title: 'Stage 3: Invention Lab',
    instructions: 'Combine the right components to create the Printing Press.',
    components: [
      { name: 'Movable Type', id: 'type', correct: true },
      { name: 'Oil-Based Ink', id: 'ink', correct: true },
      { name: 'Plastic Gears', id: 'plastic', correct: false },
      { name: 'Screw Press', id: 'press', correct: true }
    ]
  }
];

function RenaissanceGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [gameState, setGameState] = useState('intro'); // 'intro', 'playing', 'feedback', 'complete'
  const [score, setScore] = useState(100);

  // Stage 1 State
  const [matchedCities, setMatchedCities] = useState([]);

  // Stage 2 State
  const [timelineOrder, setTimelineOrder] = useState([]);

  // Stage 3 State
  const [selectedInventions, setSelectedInventions] = useState([]);

  useEffect(() => {
    return () => stop();
  }, []);

  const startStage = () => {
    setGameState('playing');
    const stage = RENAISSANCE_STAGES[currentStageIndex];
    speak(stage.title + ". " + stage.instructions, { rate: 0.95 });
  };

  const handleStageComplete = () => {
    if (currentStageIndex < RENAISSANCE_STAGES.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
      setGameState('playing');
    } else {
      finishGame();
    }
  };

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

  const currentStage = RENAISSANCE_STAGES[currentStageIndex];

  return (
    <div style={containerStyle}>
      {gameState === 'intro' && (
        <div style={cardStyle}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>🎨 🏛️</div>
          <h1 style={{ color: '#5D4037' }}>Renaissance Studio Challenge</h1>
          <p style={{ fontSize: '18px', lineHeight: 1.6, maxWidth: '600px' }}>
            Welcome, Apprentice! To master the Renaissance, you must manage city resources, track the flow of time, and build legendary inventions.
          </p>
          <button onClick={startStage} style={buttonStyle('#5D4037')}>Begin Training</button>
        </div>
      )}

      {gameState === 'playing' && currentStage.id === 'patrons' && (
        <div style={cardStyle}>
          <h2>{currentStage.title}</h2>
          <p>{currentStage.instructions}</p>
          <div style={stageGrid}>
            {currentStage.tasks.map(task => (
              <div key={task.city} style={matchBox}>
                <h3 style={{ color: '#795548' }}>{task.city}</h3>
                {matchedCities.includes(task.city) ? (
                  <div style={matchedIndicator}>✅ {task.resource}</div>
                ) : (
                  <button
                    onClick={() => {
                      setMatchedCities([...matchedCities, task.city]);
                      speak(task.reason);
                      if (matchedCities.length === 2) setTimeout(handleStageComplete, 2000);
                    }}
                    style={actionButton}
                  >
                    Assign {task.resource} {task.icon}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {gameState === 'playing' && currentStage.id === 'timeline' && (
        <div style={cardStyle}>
          <h2>{currentStage.title}</h2>
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', width: '100%' }}>
            {currentStage.events.map(event => (
              <button
                key={event.id}
                disabled={timelineOrder.includes(event.id)}
                onClick={() => {
                  const newOrder = [...timelineOrder, event.id];
                  setTimelineOrder(newOrder);
                  const correctSoFar = newOrder.every((id, idx) => id === currentStage.events[idx].id);
                  if (!correctSoFar) setScore(prev => Math.max(0, prev - 10));

                  if (newOrder.length === 3) {
                    if (correctSoFar) {
                      speak("The timeline is perfectly aligned!");
                      setTimeout(handleStageComplete, 2000);
                    } else {
                      speak("The timeline is fragmented. Let us try again.");
                      setTimelineOrder([]);
                    }
                  }
                }}
                style={timelineButton(timelineOrder.includes(event.id))}
              >
                {timelineOrder.includes(event.id) ? `(${currentStage.events.find(e => e.id === event.id).year})` : ''} {event.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {gameState === 'playing' && currentStage.id === 'invention' && (
        <div style={cardStyle}>
          <h2>{currentStage.title}</h2>
          <p>{currentStage.instructions}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', width: '100%' }}>
            {currentStage.components.map(comp => (
              <button
                key={comp.id}
                onClick={() => {
                  if (selectedInventions.includes(comp.id)) return;
                  setSelectedInventions([...selectedInventions, comp.id]);
                }}
                style={compButton(selectedInventions.includes(comp.id))}
              >
                {comp.name}
              </button>
            ))}
          </div>
          <button
            disabled={selectedInventions.length < 3}
            onClick={() => {
              const correctCount = selectedInventions.filter(id => currentStage.components.find(c => c.id === id).correct).length;
              if (correctCount === 3 && selectedInventions.length === 3) {
                speak("The Printing Press is operational! Knowledge will spread like wildfire!");
                handleStageComplete();
              } else {
                speak("The machine malfunctions. Re-evaluate your components.");
                setScore(prev => Math.max(0, prev - 20));
                setSelectedInventions([]);
              }
            }}
            style={buttonStyle('#2E7D32', '100%')}
          >
            Forge Invention
          </button>
        </div>
      )}

      {gameState === 'complete' && (
        <div style={cardStyle}>
          <div style={{ fontSize: '100px', marginBottom: '20px' }}>🌟</div>
          <h1>Master of the Renaissance</h1>
          <p style={{ fontSize: '22px' }}>You have successfully navigated the rebirth of European culture and science!</p>
          <div style={scoreBadge}>Final Score: {score}%</div>
          <button onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)} style={buttonStyle('#5D4037')}>Continue Journey</button>
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  width: '100%', height: '100%',
  display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center',
  background: 'linear-gradient(to bottom, #D7CCC8, #A1887F)',
  borderRadius: '24px', padding: '30px', overflow: 'hidden'
};

const cardStyle = {
  background: '#EFEBE9', borderRadius: '30px', padding: '40px',
  boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  textAlign: 'center', maxWidth: '700px', border: '2px solid #8D6E63'
};

const stageGrid = { display: 'flex', gap: '20px', marginTop: '20px' };
const matchBox = { padding: '20px', background: 'white', borderRadius: '15px', border: '1px solid #D7CCC8', flex: 1 };
const actionButton = { padding: '10px', background: '#8D6E63', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' };
const matchedIndicator = { color: '#2E7D32', fontWeight: 'bold', fontSize: '14px' };

const timelineButton = (active) => ({
  padding: '15px', color: active ? 'white' : '#5D4037',
  background: active ? '#5D4037' : 'white',
  border: '1px solid #5D4037', borderRadius: '10px', cursor: 'pointer',
  fontSize: '16px', fontWeight: 'bold'
});

const compButton = (active) => ({
  padding: '15px', background: active ? '#BDBDBD' : 'white',
  border: '2px solid #616161', borderRadius: '8px', cursor: 'pointer',
  fontSize: '16px', fontWeight: 'bold'
});

const scoreBadge = { background: '#FFF9C4', padding: '15px 30px', borderRadius: '20px', fontSize: '24px', fontWeight: '900', margin: '20px 0', border: '2px solid #FBC02D' };

const buttonStyle = (backgroundColor, width = 'auto') => ({
  padding: '16px 40px', fontSize: '20px', fontWeight: 900,
  color: 'white', backgroundColor, width, marginTop: '20px',
  border: 'none', borderRadius: '15px', cursor: 'pointer'
});

export default RenaissanceGame;

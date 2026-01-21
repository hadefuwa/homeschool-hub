import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { coloringGames } from '../data/coloringGames';
import { speak } from '../utils/textToSpeech';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

function ColoringGame({ lesson }) {
    const navigate = useNavigate();
    const [gameData, setGameData] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [filledColors, setFilledColors] = useState({});
    const [feedback, setFeedback] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [incorrectStreak, setIncorrectStreak] = useState(0);

    const addProgress = useDataStore(state => state.addProgress);
    const getNextProgressId = useDataStore(state => state.getNextProgressId);
    const getUserId = useDataStore(state => state.getUserId);
    const saveData = useDataStore(state => state.saveData);
    const getNextLessonUrl = useDataStore(state => state.getNextLessonUrl);

    useEffect(() => {
        // Find the game data based on the lesson ID or some other identifier we pass via lesson
        // For now, we'll try to match by checking if the lesson.data?.gameId exists,
        // or maybe by mapping lesson titles?
        // Ideally, the lesson object should have `gameId` in its data, but `Lesson` model doesn't strictly have a `data` bag.
        // We can infer it from the title or pass it differently.
        // Simplest: Check the map for keys.

        // Hardcoding mapping logic for the task:
        let foundId = null;
        if (lesson.title.includes('Red and Blue Shapes')) foundId = 'nursery-shapes';
        if (lesson.title.includes('Fruit Colors')) foundId = 'reception-fruit';
        if (lesson.title.includes('Day and Night')) foundId = 'year1-day-night';
        if (lesson.title.includes('Traffic Lights')) foundId = 'year2-traffic';
        if (lesson.title.includes('Colorful Flowers')) foundId = 'year2-flowers';
        if (lesson.title.includes('Farm Animals')) foundId = 'year2-farm-animals';
        if (lesson.title.includes('Ocean Creatures')) foundId = 'year2-ocean-creatures';
        if (lesson.title.includes('Vehicles')) foundId = 'year2-vehicles';
        if (lesson.title.includes('Shapes and Patterns')) foundId = 'year2-shapes-patterns';
        if (lesson.title.includes('Flags of the World')) foundId = 'year4-flags';
        if (lesson.title.includes('Color Theory') || lesson.title.includes('Pop Art')) foundId = 'year6-theory';

        if (foundId && coloringGames[foundId]) {
            setGameData(coloringGames[foundId]);
            // Default select first color
            setSelectedColor(coloringGames[foundId].palette[0].color);
        }
    }, [lesson]);

    const handleRegionClick = (regionId) => {
        if (!gameData || isComplete) return;

        const region = gameData.regions.find(r => r.id === regionId);
        if (!region) return;

        if (selectedColor === region.expectedColor) {
            // Correct color
            const newFilled = { ...filledColors, [regionId]: selectedColor };
            setFilledColors(newFilled);
            setFeedback('Correct! Good job!');
            speak('Correct!');

            // Reset incorrect streak on correct answer
            setIncorrectStreak(0);

            // Check for completion
            const allCorrect = gameData.regions.every(r => newFilled[r.id] === r.expectedColor);
            if (allCorrect) {
                setIsComplete(true);
                setFeedback('All done! Amazing work!');
                speak('All done! Amazing work!');

                // Save progress
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
                        score: 100, // Perfect score for completing the coloring
                    });
                    addProgress(progress).then(() => {
                        saveData();
                    }).catch(err => {
                        console.error('Error saving coloring progress:', err);
                    });
                }
            }
        } else {
            // Incorrect color
            const newIncorrectStreak = incorrectStreak + 1;
            setIncorrectStreak(newIncorrectStreak);

            if (newIncorrectStreak >= 3) {
                // Reset the game after 3 consecutive mistakes
                setFilledColors({});
                setFeedback('3 mistakes in a row! Let\'s restart the lesson.');
                speak('3 mistakes in a row! Let\'s restart the lesson.');

                // Reset the incorrect streak counter
                setIncorrectStreak(0);
            } else {
                setFeedback(`Oops! ${region.hint}`);
                speak(`Oops! ${region.hint}`);
            }
        }
    };

    if (!gameData) {
        return <div>Loading game... (If this persists, the game ID might be missing)</div>;
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            maxWidth: '1000px',  // Increased max width to accommodate larger SVG
            margin: '0 auto',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h2 style={{ marginBottom: '10px' }}>{gameData.title}</h2>
            <p style={{ fontSize: '18px', marginBottom: '20px', textAlign: 'center' }}>{gameData.instruction}</p>

            <div style={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginBottom: '20px',
                width: '100%'
            }}>
                {/* SVG Container - Increased size for better visibility of complex content */}
                <div style={{
                    border: '2px solid #333',
                    borderRadius: '10px',
                    padding: '10px',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    overflow: 'auto'  // Allow scrolling if content exceeds dimensions
                }}>
                    <svg width="600" height="400" viewBox="0 0 600 400">  {/* Increased SVG size */}
                        {gameData.svgContent(handleRegionClick, filledColors)}
                    </svg>
                </div>

                {/* Palette */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '10px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '10px',
                    border: '1px solid #ddd'
                }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Palette</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                        {gameData.palette.map((p) => (
                            <button
                                key={p.color}
                                onClick={() => setSelectedColor(p.color)}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    backgroundColor: p.color,
                                    border: selectedColor === p.color ? '4px solid #333' : '2px solid #ccc',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: selectedColor === p.color ? '0 0 8px rgba(0,0,0,0.3)' : 'none',
                                    transform: selectedColor === p.color ? 'scale(1.1)' : 'scale(1)',
                                    transition: 'all 0.2s ease'
                                }}
                                disabled={isComplete}
                                title={p.name}
                            >
                                {selectedColor === p.color && <span style={{
                                    color: ['#FFFFFF', '#FFFF00'].includes(p.color) ? 'black' : 'white',
                                    fontWeight: 'bold',
                                    fontSize: '20px'
                                }}>✓</span>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Feedback Area */}
            <div style={{
                minHeight: '40px',
                padding: '10px 20px',
                borderRadius: '20px',
                backgroundColor: feedback.includes('Correct') || feedback.includes('All done') || feedback.includes('Amazing work') ? '#d4edda' :
                    feedback.includes('Oops') || feedback.includes('3 mistakes') ? '#f8d7da' : 'transparent',
                color: feedback.includes('Correct') || feedback.includes('All done') || feedback.includes('Amazing work') ? '#155724' :
                    feedback.includes('Oops') || feedback.includes('3 mistakes') ? '#721c24' : 'black',
                fontWeight: 'bold',
                fontSize: '18px',
                textAlign: 'center',
                marginTop: '10px',
                opacity: feedback ? 1 : 0,
                transition: 'opacity 0.3s ease'
            }}>
                {feedback}
            </div>

            {isComplete && (
                <div style={{
                    marginTop: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                    animation: 'fadeIn 0.5s ease'
                }}>
                    <div style={{ fontSize: '100px', animation: 'bounce 1s infinite' }}>🎉</div>
                    <h2 style={{ fontSize: '32px', color: '#28a745' }}>Platinum Medal! 🏆</h2>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <button
                            onClick={() => navigate('/lessons')}
                            style={{
                                padding: '15px 30px',
                                fontSize: '18px',
                                fontWeight: '700',
                                backgroundColor: 'white',
                                color: '#333',
                                border: '2px solid #ddd',
                                borderRadius: '15px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            Back to Lessons
                        </button>
                        <button
                            onClick={() => {
                                const { url } = getNextLessonUrl(lesson);
                                navigate(url);
                            }}
                            style={{
                                padding: '15px 40px',
                                fontSize: '20px',
                                fontWeight: '700',
                                backgroundColor: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '15px',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)',
                                transition: 'all 0.2s'
                            }}
                        >
                            Next Lesson →
                        </button>
                    </div>
                </div>
            )}

            <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}

export default ColoringGame;

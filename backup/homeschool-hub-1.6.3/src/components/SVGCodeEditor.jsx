import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

function SVGCodeEditor({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextLessonAfter = useDataStore(state => state.getNextLessonAfter);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  // Lesson configurations
  const lessonConfigs = {
    13: {
      initialCode: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="50" fill="blue" />
</svg>`,
      explanation: `Understanding the Code:
- <svg> - The container for all SVG graphics. width and height set the size.
- <circle> - Draws a circle. cx and cy are the center position, r is the radius.
- fill - Sets the color inside the shape (like paint).
- Coordinates: (0,0) is the top-left corner. X increases to the right, Y increases downward.`,
      tasks: [
        {
          title: "Task 1: Change the Circle Color",
          description: "Change the circle's fill color from 'blue' to 'red'",
          hint: "Look for fill=\"blue\" and change it to fill=\"red\"",
          validate: (code) => code.includes('fill="red"') || code.includes("fill='red'")
        },
        {
          title: "Task 2: Make the Circle Bigger",
          description: "Change the circle's radius from 50 to 80",
          hint: "Find r=\"50\" and change it to r=\"80\"",
          validate: (code) => code.includes('r="80"') || code.includes("r='80'")
        },
        {
          title: "Task 3: Add a Rectangle",
          description: "Add a rectangle below the circle. Use: <rect x=\"50\" y=\"150\" width=\"100\" height=\"30\" fill=\"green\" />",
          hint: "Add a new line with the <rect> element inside the <svg> tag",
          validate: (code) => code.includes('<rect') && code.includes('fill="green"') && code.includes('y="150"')
        }
      ]
    },
    14: {
      initialCode: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect x="50" y="50" width="100" height="100" fill="blue" />
</svg>`,
      explanation: `Understanding Rectangles:
- <rect> - Draws a rectangle
- x and y - Position of the top-left corner
- width and height - Size of the rectangle
- stroke - Color of the outline
- stroke-width - Thickness of the outline`,
      tasks: [
        {
          title: "Task 1: Add a Stroke",
          description: "Add a red stroke with width 5 to the rectangle",
          hint: "Add stroke=\"red\" stroke-width=\"5\" to the <rect> element",
          validate: (code) => code.includes('stroke="red"') && code.includes('stroke-width="5"')
        },
        {
          title: "Task 2: Change Position",
          description: "Move the rectangle to x=\"20\" y=\"20\"",
          hint: "Change x=\"50\" to x=\"20\" and y=\"50\" to y=\"20\"",
          validate: (code) => code.includes('x="20"') && code.includes('y="20"')
        },
        {
          title: "Task 3: Add Another Rectangle",
          description: "Add a second rectangle at x=\"60\" y=\"60\" with width=\"80\" height=\"80\" fill=\"yellow\"",
          hint: "Add a new <rect> element with the specified attributes",
          validate: (code) => {
            const rects = (code.match(/<rect/g) || []).length;
            return rects >= 2 && code.includes('fill="yellow"') && code.includes('x="60"');
          }
        }
      ]
    },
    15: {
      initialCode: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <line x1="50" y1="50" x2="150" y2="150" stroke="black" stroke-width="2" />
</svg>`,
      explanation: `Understanding Lines:
- <line> - Draws a straight line
- x1, y1 - Starting point coordinates
- x2, y2 - Ending point coordinates
- stroke - Required! Lines need a stroke color to be visible
- stroke-width - Thickness of the line`,
      tasks: [
        {
          title: "Task 1: Make Line Thicker",
          description: "Change stroke-width from 2 to 8",
          hint: "Find stroke-width=\"2\" and change it to stroke-width=\"8\"",
          validate: (code) => code.includes('stroke-width="8"')
        },
        {
          title: "Task 2: Change Line Color",
          description: "Change the stroke color to 'red'",
          hint: "Change stroke=\"black\" to stroke=\"red\"",
          validate: (code) => code.includes('stroke="red"')
        },
        {
          title: "Task 3: Add a Second Line",
          description: "Add another line from (50, 150) to (150, 50) with stroke=\"blue\"",
          hint: "Add a new <line> element with x1=\"50\" y1=\"150\" x2=\"150\" y2=\"50\"",
          validate: (code) => {
            const lines = (code.match(/<line/g) || []).length;
            return lines >= 2 && code.includes('stroke="blue"') && code.includes('y1="150"');
          }
        }
      ]
    },
    16: {
      initialCode: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="100" rx="60" ry="40" fill="purple" />
</svg>`,
      explanation: `Understanding Ellipses:
- <ellipse> - Draws an oval (like a stretched circle)
- cx, cy - Center point of the ellipse
- rx - Horizontal radius (half the width)
- ry - Vertical radius (half the height)
- When rx = ry, you get a circle!`,
      tasks: [
        {
          title: "Task 1: Make it a Circle",
          description: "Change rx and ry to both be 50 to make a perfect circle",
          hint: "Change rx=\"60\" to rx=\"50\" and ry=\"40\" to ry=\"50\"",
          validate: (code) => code.includes('rx="50"') && code.includes('ry="50"')
        },
        {
          title: "Task 2: Add Text",
          description: "Add text saying 'Hello' at position x=\"100\" y=\"110\" with font-size=\"20\" and text-anchor=\"middle\"",
          hint: "Add <text x=\"100\" y=\"110\" font-size=\"20\" text-anchor=\"middle\" fill=\"white\">Hello</text>",
          validate: (code) => code.includes('<text') && code.includes('text-anchor="middle"') && code.includes('Hello')
        },
        {
          title: "Task 3: Add Stroke",
          description: "Add a stroke=\"yellow\" stroke-width=\"3\" to the ellipse",
          hint: "Add stroke and stroke-width attributes to the <ellipse> element",
          validate: (code) => code.includes('stroke="yellow"') && code.includes('stroke-width="3"')
        }
      ]
    },
    17: {
      initialCode: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <polygon points="100,20 180,80 100,140 20,80" fill="green" />
</svg>`,
      explanation: `Understanding Polygons:
- <polygon> - Draws a shape with multiple connected points
- points - List of x,y coordinates separated by spaces
- Each point connects to the next, and the last connects back to the first
- Great for triangles, stars, diamonds, and custom shapes!`,
      tasks: [
        {
          title: "Task 1: Change Color",
          description: "Change the fill color from 'green' to 'orange'",
          hint: "Change fill=\"green\" to fill=\"orange\"",
          validate: (code) => code.includes('fill="orange"')
        },
        {
          title: "Task 2: Add Stroke",
          description: "Add stroke=\"red\" stroke-width=\"4\" to the polygon",
          hint: "Add stroke and stroke-width attributes to the <polygon> element",
          validate: (code) => code.includes('stroke="red"') && code.includes('stroke-width="4"')
        },
        {
          title: "Task 3: Create a Triangle",
          description: "Change the points to create a triangle: points=\"100,20 180,180 20,180\"",
          hint: "Replace the points attribute with the new triangle coordinates",
          validate: (code) => {
            const points = code.match(/points="([^"]+)"/);
            return points && points[1].includes('100,20') && points[1].includes('180,180') && points[1].includes('20,180');
          }
        }
      ]
    }
  };

  const lessonNumber = lesson?.lessonNumber || 13;
  const config = lessonConfigs[lessonNumber] || lessonConfigs[13];
  
  const [svgCode, setSvgCode] = useState(config.initialCode);
  const [error, setError] = useState('');
  const [tasksCompleted, setTasksCompleted] = useState(new Array(config.tasks.length).fill(false));
  const [showExplanation, setShowExplanation] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  // Reset code when lesson changes
  useEffect(() => {
    const newConfig = lessonConfigs[lessonNumber] || lessonConfigs[13];
    setSvgCode(newConfig.initialCode);
    setTasksCompleted(new Array(newConfig.tasks.length).fill(false));
  }, [lessonNumber]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Validate tasks when code changes
  useEffect(() => {
    const currentConfig = lessonConfigs[lessonNumber] || lessonConfigs[13];
    const newCompleted = currentConfig.tasks.map((task) => task.validate(svgCode));
    setTasksCompleted(newCompleted);
  }, [svgCode, lessonNumber]);

  // Update error state
  useEffect(() => {
    try {
      // Try to parse the SVG
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgCode, 'image/svg+xml');
      const errors = doc.querySelectorAll('parsererror');
      if (errors.length > 0) {
        setError('Invalid SVG code. Check your syntax.');
      } else {
        setError('');
      }
    } catch (err) {
      setError('Error rendering SVG');
    }
  }, [svgCode]);

  const handleComplete = async () => {
    if (!lesson) return;
    
    // Check if all tasks are completed
    if (!tasksCompleted.every(completed => completed)) {
      alert('Please complete all tasks before finishing the lesson!');
      return;
    }
    
    try {
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
      await saveData();
      
      // Navigate to next lesson or back to subject
      const nextLesson = getNextLessonAfter(lesson);
      if (nextLesson && nextLesson.id) {
        navigate(`/lesson/${nextLesson.id}`);
      } else if (lesson.subjectId) {
        navigate(`/lessons?subjectId=${lesson.subjectId}`);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  const allTasksCompleted = tasksCompleted.every(completed => completed);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      gap: '15px',
      overflow: 'hidden',
    }}>
      {/* Header with explanation toggle */}
      <div style={{
        padding: '15px 20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h2 style={{ margin: 0, fontSize: '22px' }}>🎨 SVG Graphics Editor</h2>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              backgroundColor: showExplanation ? '#007bff' : '#e9ecef',
              color: showExplanation ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {showExplanation ? 'Hide' : 'Show'} Explanation
          </button>
        </div>
        
        {showExplanation && (
          <div style={{
            marginTop: '15px',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
            fontSize: '14px',
            lineHeight: '1.6',
          }}>
            <div style={{ fontWeight: '600', marginBottom: '10px', color: '#333' }}>Understanding the Code:</div>
            <div style={{ color: '#555', whiteSpace: 'pre-line' }}>
              {config.explanation.split('\n').map((line, idx) => {
                if (line.trim().startsWith('-')) {
                  const parts = line.split(' - ');
                  return (
                    <div key={idx} style={{ marginBottom: '8px' }}>
                      <strong>{parts[0]}</strong> - {parts.slice(1).join(' - ')}
                    </div>
                  );
                }
                return <div key={idx} style={{ marginBottom: '8px' }}>{line}</div>;
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main content area - responsive layout */}
      <div style={{
        display: 'flex',
        flex: 1,
        gap: '15px',
        minHeight: 0,
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        {/* Code Editor */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          minHeight: isMobile ? '300px' : 'auto',
        }}>
          <div style={{
            padding: '12px 15px',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #e0e0e0',
            fontWeight: '600',
            fontSize: '13px',
            color: '#333',
          }}>
            SVG Code
          </div>
          <textarea
            value={svgCode}
            onChange={(e) => setSvgCode(e.target.value)}
            style={{
              flex: 1,
              padding: '15px',
              border: 'none',
              outline: 'none',
              fontFamily: 'monospace',
              fontSize: '13px',
              lineHeight: '1.6',
              resize: 'none',
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              minHeight: '200px',
            }}
            spellCheck={false}
          />
          {error && (
            <div style={{
              padding: '10px 15px',
              backgroundColor: '#fee',
              color: '#c33',
              fontSize: '12px',
            }}>
              {error}
            </div>
          )}
        </div>

        {/* Preview */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          minHeight: isMobile ? '300px' : 'auto',
        }}>
          <div style={{
            padding: '12px 15px',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #e0e0e0',
            fontWeight: '600',
            fontSize: '13px',
            color: '#333',
          }}>
            Preview
          </div>
          <div style={{
            flex: 1,
            padding: '30px',
            overflow: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            position: 'relative',
            minHeight: '200px',
          }}>
            <div style={{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: '200px',
              minHeight: '200px',
              border: '2px dashed #ddd',
              borderRadius: '8px',
              backgroundColor: 'white',
              padding: '20px',
            }}>
              <div
                dangerouslySetInnerHTML={{ __html: svgCode }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </div>
            {!svgCode.trim() && (
              <div style={{
                position: 'absolute',
                color: '#999',
                fontSize: '14px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}>
                Your SVG will appear here
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div style={{
        padding: '15px 20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxHeight: '250px',
        overflowY: 'auto',
      }}>
        <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
          Tasks ({tasksCompleted.filter(c => c).length}/{config.tasks.length})
        </div>
        {config.tasks.map((task, index) => (
          <div
            key={index}
            style={{
              marginBottom: '12px',
              padding: '12px',
              borderRadius: '6px',
              backgroundColor: tasksCompleted[index] ? '#d4edda' : '#fff3cd',
              border: `2px solid ${tasksCompleted[index] ? '#28a745' : '#ffc107'}`,
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '6px',
            }}>
              {tasksCompleted[index] ? (
                <span style={{ fontSize: '18px', marginRight: '8px' }}>✓</span>
              ) : (
                <span style={{ fontSize: '18px', marginRight: '8px' }}>○</span>
              )}
              <div style={{
                fontWeight: '600',
                fontSize: '14px',
                color: tasksCompleted[index] ? '#155724' : '#856404',
              }}>
                {task.title}
              </div>
            </div>
            <div style={{
              fontSize: '13px',
              color: tasksCompleted[index] ? '#155724' : '#856404',
              marginLeft: '26px',
              marginBottom: '4px',
            }}>
              {task.description}
            </div>
            {!tasksCompleted[index] && (
              <div style={{
                fontSize: '12px',
                color: '#856404',
                marginLeft: '26px',
                fontStyle: 'italic',
              }}>
                💡 Hint: {task.hint}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        gap: '10px',
        padding: '15px 20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1, fontSize: '13px', color: '#666' }}>
          {allTasksCompleted ? (
            <span style={{ color: '#28a745', fontWeight: '600' }}>✓ All tasks completed! You can finish the lesson.</span>
          ) : (
            <span>Complete all tasks above to finish the lesson.</span>
          )}
        </div>
        <button
          onClick={handleComplete}
          disabled={!allTasksCompleted}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            backgroundColor: allTasksCompleted ? '#28a745' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: allTasksCompleted ? 'pointer' : 'not-allowed',
            fontWeight: '600',
          }}
        >
          Complete Lesson ✓
        </button>
      </div>
    </div>
  );
}

export default SVGCodeEditor;

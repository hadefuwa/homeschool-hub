import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

const PHASES = {
  INTRO: 'intro',
  MATCHING: 'matching',
  GENETICS: 'genetics',
  QUIZ: 'quiz',
  COMPLETE: 'complete',
};

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;

const TRAITS = {
  EYES: { name: 'Eye Color', dominant: 'Brown', recessive: 'Blue', dominantGene: 'B', recessiveGene: 'b' },
  HAIR: { name: 'Hair Shade', dominant: 'Dark', recessive: 'Blonde', dominantGene: 'D', recessiveGene: 'd' },
  HEIGHT: { name: 'Height', dominant: 'Tall', recessive: 'Short', dominantGene: 'T', recessiveGene: 't' },
};

const getInitialFamily = () => ({
  boyA: { id: 'boyA', name: 'Alex', gender: 'boy', twinSet: 'Set A', traits: { EYES: 'Bb', HAIR: 'Dd', HEIGHT: 'Tt' }, x: 140, y: 210, homeX: 140, homeY: 210 },
  boyB: { id: 'boyB', name: 'Ben', gender: 'boy', twinSet: 'Set A', traits: { EYES: 'Bb', HAIR: 'Dd', HEIGHT: 'Tt' }, x: 140, y: 350, homeX: 140, homeY: 350 },
  girlA: { id: 'girlA', name: 'Anna', gender: 'girl', twinSet: 'Set B', traits: { EYES: 'bb', HAIR: 'dd', HEIGHT: 'tt' }, x: 660, y: 210, homeX: 660, homeY: 210 },
  girlB: { id: 'girlB', name: 'Bella', gender: 'girl', twinSet: 'Set B', traits: { EYES: 'bb', HAIR: 'dd', HEIGHT: 'tt' }, x: 660, y: 350, homeX: 660, homeY: 350 },
});

const PAIRINGS = [
  { key: 'alex-bella', label: 'Alex + Bella', partners: ['boyA', 'girlB'] },
  { key: 'ben-anna', label: 'Ben + Anna', partners: ['boyB', 'girlA'] },
];

const PAIR_LOOKUP = PAIRINGS.reduce((acc, pairing) => {
  const [first, second] = pairing.partners;
  acc[first] = second;
  acc[second] = first;
  return acc;
}, {});

const MATCH_LAYOUT = {
  'alex-bella': {
    boyA: { x: 260, y: 220 },
    girlB: { x: 540, y: 220 },
  },
  'ben-anna': {
    boyB: { x: 260, y: 360 },
    girlA: { x: 540, y: 360 },
  },
};

const getPhenotype = (traitKey, genotype) => {
  const trait = TRAITS[traitKey];
  if (!trait || !genotype) return '';
  const [gene1, gene2] = genotype.split('');
  return gene1 === trait.dominantGene || gene2 === trait.dominantGene
    ? trait.dominant
    : trait.recessive;
};

const buildOffspringMatrix = (traitKey, parent1, parent2) => {
  const p1Genes = parent1.traits[traitKey].split('');
  const p2Genes = parent2.traits[traitKey].split('');
  const matrix = [];
  const phenotypeCounts = {};

  for (let row = 0; row < 2; row++) {
    const rowData = [];
    for (let col = 0; col < 2; col++) {
      const genotype = `${p1Genes[row]}${p2Genes[col]}`;
      const phenotype = getPhenotype(traitKey, genotype);
      rowData.push({ genotype, phenotype });
      phenotypeCounts[phenotype] = (phenotypeCounts[phenotype] || 0) + 1;
    }
    matrix.push(rowData);
  }

  return { matrix, phenotypeCounts };
};

const drawMatchingScene = (ctx, people, matches, draggedId) => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Twin zones to visually split both sets
  const gradientLeft = ctx.createLinearGradient(0, 0, CANVAS_WIDTH / 2, 0);
  gradientLeft.addColorStop(0, '#e6f0ff');
  gradientLeft.addColorStop(1, '#f7fbff');
  ctx.fillStyle = gradientLeft;
  ctx.fillRect(0, 0, CANVAS_WIDTH / 2, CANVAS_HEIGHT);

  const gradientRight = ctx.createLinearGradient(CANVAS_WIDTH / 2, 0, CANVAS_WIDTH, 0);
  gradientRight.addColorStop(0, '#fff4f7');
  gradientRight.addColorStop(1, '#ffeef5');
  ctx.fillStyle = gradientRight;
  ctx.fillRect(CANVAS_WIDTH / 2, 0, CANVAS_WIDTH / 2, CANVAS_HEIGHT);

  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 4;
  ctx.setLineDash([12, 8]);
  ctx.beginPath();
  ctx.moveTo(CANVAS_WIDTH / 2, 30);
  ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 30);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#1f3a5f';
  ctx.font = '20px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Twin Set A (brothers)', CANVAS_WIDTH / 4, 40);
  ctx.fillText('Twin Set B (sisters)', (CANVAS_WIDTH * 3) / 4, 40);

  // Draw genetic bridges for locked-in matches
  Object.values(matches).forEach(pairing => {
    const [leftId, rightId] = pairing.partners;
    const person1 = people[leftId];
    const person2 = people[rightId];
    if (!person1 || !person2) return;
    ctx.strokeStyle = '#8e44ad';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(person1.x, person1.y - 10);
    ctx.bezierCurveTo(380, person1.y - 120, 420, person2.y + 120, person2.x, person2.y - 10);
    ctx.stroke();
  });

  Object.values(people).forEach(person => {
    drawPerson(ctx, person, person.id === draggedId);
  });
};

const drawPerson = (ctx, person, isDragged) => {
  const { x, y, gender, name, traits } = person;
  ctx.fillStyle = gender === 'boy' ? '#1f78ff' : '#ff6fae';
  ctx.fillRect(x - 18, y - 28, 36, 46);

  ctx.fillStyle = '#ffe0b2';
  ctx.beginPath();
  ctx.arc(x, y - 40, 16, 0, Math.PI * 2);
  ctx.fill();

  const eyePhenotype = getPhenotype('EYES', traits.EYES);
  ctx.fillStyle = eyePhenotype === 'Brown' ? '#5c3d1e' : '#4a90e2';
  ctx.beginPath();
  ctx.arc(x - 5, y - 42, 2.5, 0, Math.PI * 2);
  ctx.arc(x + 5, y - 42, 2.5, 0, Math.PI * 2);
  ctx.fill();

  const hairPhenotype = getPhenotype('HAIR', traits.HAIR);
  ctx.fillStyle = hairPhenotype === 'Dark' ? '#4a3423' : '#f7d774';
  ctx.fillRect(x - 18, y - 58, 36, 10);

  const heightPhenotype = getPhenotype('HEIGHT', traits.HEIGHT);
  ctx.fillStyle = heightPhenotype === 'Tall' ? '#2ecc71' : '#e74c3c';
  ctx.fillRect(x - 3, y + 12, 6, heightPhenotype === 'Tall' ? 24 : 14);

  ctx.fillStyle = '#1f2933';
  ctx.font = '13px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(name, x, y + 36);

  if (isDragged) {
    ctx.strokeStyle = '#f39c12';
    ctx.lineWidth = 3;
    ctx.strokeRect(x - 24, y - 72, 48, 88);
  }
};

function GeneticsGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  const [phase, setPhase] = useState(PHASES.INTRO);
  const [people, setPeople] = useState(() => getInitialFamily());
  const [matches, setMatches] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const [draggedPerson, setDraggedPerson] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentCouple, setCurrentCouple] = useState(null);
  const [viewedCouples, setViewedCouples] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const matchingCanvasRef = useRef(null);
  const peopleRef = useRef(people);

  useEffect(() => {
    peopleRef.current = people;
  }, [people]);

  const couplesReady = useMemo(() => Object.keys(matches).length === PAIRINGS.length, [matches]);
  const quizUnlocked = couplesReady && viewedCouples.length > 0;

  const quizQuestions = useMemo(() => ([
    {
      question: 'Which eye colors can the children have?',
      options: ['Only brown', 'Only blue', 'Brown or blue', 'Green'],
      correct: 2,
      explanation: 'Dad carries B and b, Mum has bb. Children can inherit Bb (brown) or bb (blue).',
    },
    {
      question: 'What hair shades are possible?',
      options: ['All dark', 'All blonde', 'Dark or blonde', 'Red only'],
      correct: 2,
      explanation: 'Dark (D) beats blonde (d). With Dd x dd, half the kids are dark, half blonde.',
    },
    {
      question: 'How about height?',
      options: ['Only tall', 'Only short', 'Tall or short', 'Exactly medium'],
      correct: 2,
      explanation: 'Tt x tt means 50% Tall (Tt) and 50% Short (tt).',
    },
  ]), []);

  const resetPositions = useCallback(() => {
    setPeople(getInitialFamily());
    setMatches({});
    setStatusMessage('');
    setCurrentCouple(null);
    setViewedCouples([]);
    setQuizAnswers({});
    setPhase(PHASES.INTRO);
  }, []);

  const snapToHome = useCallback((personId) => {
    setPeople(prev => ({
      ...prev,
      [personId]: { ...prev[personId], x: prev[personId].homeX, y: prev[personId].homeY },
    }));
  }, []);

  const applyMatchLayout = useCallback((pairKey) => {
    const layout = MATCH_LAYOUT[pairKey];
    if (!layout) return;
    setPeople(prev => {
      const nextState = { ...prev };
      Object.entries(layout).forEach(([personId, coords]) => {
        nextState[personId] = { ...prev[personId], ...coords };
      });
      return nextState;
    });
  }, []);

  const getCanvasCoords = (event) => {
    const canvas = matchingCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const findPersonAt = (x, y) => {
    return Object.values(peopleRef.current).find(person => Math.abs(x - person.x) <= 30 && Math.abs(y - person.y) <= 40);
  };

  const attemptMatch = useCallback((personId, dropX, dropY) => {
    const dragged = peopleRef.current[personId];
    if (!dragged) return;

    const target = Object.values(peopleRef.current).find(person => (
      person.gender !== dragged.gender && Math.hypot(dropX - person.x, dropY - person.y) < 70
    ));

    if (!target) {
      setStatusMessage('Drop closer to one of the opposite twins.');
      snapToHome(personId);
      return;
    }

    if (PAIR_LOOKUP[personId] !== target.id) {
      setStatusMessage('Remember: marry the opposite twin (diagonal match) like the Haribo meme!');
      snapToHome(personId);
      return;
    }

    const pairing = PAIRINGS.find(p => p.partners.includes(personId) && p.partners.includes(target.id));
    if (!pairing) return;

    setMatches(prev => {
      if (prev[pairing.key]) return prev;
      const updated = { ...prev, [pairing.key]: pairing };
      setStatusMessage(`Great! ${dragged.name} and ${target.name} are paired. Analyze their genes next.`);
      applyMatchLayout(pairing.key);
      if (Object.keys(updated).length === PAIRINGS.length) {
        setTimeout(() => {
          setPhase(PHASES.GENETICS);
          setStatusMessage('Both marriages are set. Open a couple to explore their Punnett squares.');
        }, 700);
      }
      return updated;
    });
  }, [applyMatchLayout, snapToHome]);

  const handleCanvasMouseDown = (event) => {
    const { x, y } = getCanvasCoords(event);
    const person = findPersonAt(x, y);
    if (!person) return;
    setDraggedPerson(person.id);
    setDragOffset({ x: x - person.x, y: y - person.y });
  };

  const handleMouseMove = useCallback((event) => {
    if (!draggedPerson) return;
    const { x, y } = getCanvasCoords(event);
    setPeople(prev => ({
      ...prev,
      [draggedPerson]: {
        ...prev[draggedPerson],
        x: Math.max(70, Math.min(x - dragOffset.x, CANVAS_WIDTH - 70)),
        y: Math.max(80, Math.min(y - dragOffset.y, CANVAS_HEIGHT - 40)),
      },
    }));
  }, [draggedPerson, dragOffset]);

  const handleMouseUp = useCallback((event) => {
    if (!draggedPerson) return;
    const { x, y } = getCanvasCoords(event);
    attemptMatch(draggedPerson, x, y);
    setDraggedPerson(null);
  }, [attemptMatch, draggedPerson]);

  useEffect(() => {
    if (!draggedPerson) return undefined;
    const moveListener = (e) => handleMouseMove(e);
    const upListener = (e) => handleMouseUp(e);
    window.addEventListener('mousemove', moveListener);
    window.addEventListener('mouseup', upListener);
    return () => {
      window.removeEventListener('mousemove', moveListener);
      window.removeEventListener('mouseup', upListener);
    };
  }, [draggedPerson, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (phase !== PHASES.MATCHING) return;
    const canvas = matchingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    drawMatchingScene(ctx, people, matches, draggedPerson);
  }, [phase, people, matches, draggedPerson]);

  const handleQuizAnswer = (qIndex, optionIndex) => {
    setQuizAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const completeGame = useCallback(async () => {
    const correct = quizQuestions.reduce((count, question, index) => (
      quizAnswers[index] === question.correct ? count + 1 : count
    ), 0);
    const finalScore = Math.round((correct / quizQuestions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    setPhase(PHASES.COMPLETE);

    try {
      const progress = new Progress({
        id: getNextProgressId(),
        studentId: getUserId(),
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
      await saveData();
    } catch (error) {
      console.error('Error saving genetics progress:', error);
    }
  }, [addProgress, getNextProgressId, getUserId, lesson, quizAnswers, quizQuestions, saveData]);

  const renderTraitTable = (pairing, traitKey) => {
    if (!pairing) return null;
    const [p1Id, p2Id] = pairing.partners;
    const parent1 = people[p1Id];
    const parent2 = people[p2Id];
    if (!parent1 || !parent2) return null;

    const { matrix, phenotypeCounts } = buildOffspringMatrix(traitKey, parent1, parent2);
    const total = 4;

    return (
      <div key={traitKey} style={{ marginBottom: '18px', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
        <h4 style={{ margin: '0 0 8px 0' }}>{TRAITS[traitKey].name}</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', marginBottom: '10px' }}>
          {matrix.flat().map((cell, index) => (
            <div
              key={`${traitKey}-${index}`}
              style={{
                border: '1px solid #cbd5f5',
                borderRadius: '6px',
                padding: '6px',
                textAlign: 'center',
                background: cell.phenotype === TRAITS[traitKey].dominant ? '#eaf4ff' : '#fff7f0',
                fontSize: '13px',
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{cell.genotype}</div>
              <div>{cell.phenotype}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '13px', color: '#475569' }}>
          {Object.entries(phenotypeCounts).map(([phenotype, count]) => (
            <span key={phenotype} style={{ marginRight: '10px' }}>
              {phenotype}: {(count / total) * 100}% chance
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {phase === PHASES.INTRO && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>🧬 Twin Genetics Challenge</h2>
          <p>Two sets of twins get married crosswise, just like the Haribo gummies meme. Can you predict their children?</p>
          <p>Drag each twin to their matching partner to unlock Punnett-square investigations.</p>
          <button
            onClick={() => {
              setPhase(PHASES.MATCHING);
              setStatusMessage('Drag each twin near their diagonal partner.');
            }}
            style={{ padding: '12px 24px', fontSize: '16px', marginTop: '20px' }}
          >
            Start Matching
          </button>
        </div>
      )}

      {phase === PHASES.MATCHING && (
        <div style={{ textAlign: 'center' }}>
          <h3>Match the Marriages</h3>
          <p>Only diagonal twins (Set A ↔ Set B) can marry. Drag to link them!</p>
          <canvas
            ref={matchingCanvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            style={{ border: '1px solid #d5dbe7', borderRadius: '12px', cursor: draggedPerson ? 'grabbing' : 'grab' }}
            onMouseDown={handleCanvasMouseDown}
          />
          {statusMessage && <p style={{ color: '#0f172a', marginTop: '12px' }}>{statusMessage}</p>}
          <button
            onClick={resetPositions}
            style={{ marginTop: '16px', padding: '8px 16px', fontSize: '14px' }}
          >
            Reset Twins
          </button>
        </div>
      )}

      {phase === PHASES.GENETICS && (
        <div style={{ padding: '20px' }}>
          <h3 style={{ textAlign: 'center' }}>Analyze the Family Traits</h3>
          <p style={{ textAlign: 'center' }}>Choose a couple to open their genetics dashboard.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {PAIRINGS.map(pairing => (
              <button
                key={pairing.key}
                disabled={!matches[pairing.key]}
                onClick={() => {
                  setCurrentCouple(pairing.key);
                  setViewedCouples(prev => (prev.includes(pairing.key) ? prev : [...prev, pairing.key]));
                }}
                style={{
                  padding: '10px 18px',
                  borderRadius: '999px',
                  border: matches[pairing.key] ? '2px solid #4f46e5' : '2px dashed #cbd5f5',
                  background: currentCouple === pairing.key ? '#ede9fe' : '#fff',
                  cursor: matches[pairing.key] ? 'pointer' : 'not-allowed',
                }}
              >
                {pairing.label}
              </button>
            ))}
          </div>
          {currentCouple && matches[currentCouple] && (
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              {renderTraitTable(matches[currentCouple], 'EYES')}
              {renderTraitTable(matches[currentCouple], 'HAIR')}
              {renderTraitTable(matches[currentCouple], 'HEIGHT')}
              <button
                onClick={() => setPhase(PHASES.QUIZ)}
                disabled={!quizUnlocked}
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  marginTop: '10px',
                  backgroundColor: quizUnlocked ? '#22c55e' : '#94a3b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: quizUnlocked ? 'pointer' : 'not-allowed',
                }}
              >
                Take the Genetics Quiz
              </button>
              {!quizUnlocked && (
                <p style={{ marginTop: '8px', color: '#475569' }}>
                  View at least one couple to unlock the quiz.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {phase === PHASES.QUIZ && (
        <div style={{ padding: '20px' }}>
          <h3 style={{ textAlign: 'center' }}>Genetics Quiz</h3>
          {quizQuestions.map((q, i) => (
            <div key={q.question} style={{ margin: '18px auto', maxWidth: '680px', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <p style={{ marginBottom: '10px', fontWeight: '600' }}>{q.question}</p>
              {q.options.map((option, index) => (
                <label key={option} style={{ display: 'block', marginBottom: '6px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name={`quiz-${i}`}
                    value={index}
                    checked={quizAnswers[i] === index}
                    onChange={() => handleQuizAnswer(i, index)}
                    style={{ marginRight: '8px' }}
                  />
                  {option}
                </label>
              ))}
              {quizAnswers[i] !== undefined && (
                <p style={{ color: quizAnswers[i] === q.correct ? '#16a34a' : '#dc2626', marginTop: '8px' }}>
                  {quizAnswers[i] === q.correct ? `✓ ${q.explanation}` : `✗ ${q.explanation}`}
                </p>
              )}
            </div>
          ))}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={completeGame}
              disabled={Object.keys(quizAnswers).length < quizQuestions.length}
              style={{
                padding: '14px 28px',
                fontSize: '16px',
                backgroundColor: Object.keys(quizAnswers).length === quizQuestions.length ? '#2563eb' : '#94a3b8',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: Object.keys(quizAnswers).length === quizQuestions.length ? 'pointer' : 'not-allowed',
              }}
            >
              Complete Game
            </button>
          </div>
        </div>
      )}

      {showResults && (
        <div style={{ textAlign: 'center', padding: '30px' }}>
          <h2>🎉 Awesome Genetics Work!</h2>
          <p>Your score: {score}%</p>
          <p>You matched the twins, decoded their genes, and passed the challenge.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
            <button
              onClick={() => navigate('/lessons')}
              style={{ padding: '10px 20px', fontSize: '15px' }}
            >
              Back to Lessons
            </button>
            <button
              onClick={resetPositions}
              style={{ padding: '10px 20px', fontSize: '15px' }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GeneticsGame;
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

const PHASES = {
  INTRO: 'intro',
  ALLIANCES: 'alliances',
  CRISES: 'crises',
  TECH: 'tech',
  COMPLETE: 'complete',
};

const ALIGNMENT_OPTIONS = {
  nato: { label: 'NATO / USA-led', color: '#2563eb' },
  soviet: { label: 'Soviet Bloc', color: '#dc2626' },
  nonaligned: { label: 'Non-Aligned', color: '#f97316' },
};

const COUNTRIES = [
  {
    id: 'west-germany',
    name: 'West Germany',
    region: 'Western Europe',
    correct: 'nato',
    fact: 'West Germany joined NATO in 1955 and rebuilt with Marshall Plan aid.',
  },
  {
    id: 'poland',
    name: 'Poland',
    region: 'Eastern Europe',
    correct: 'soviet',
    fact: 'Poland became part of the Warsaw Pact and hosted Soviet troops.',
  },
  {
    id: 'india',
    name: 'India',
    region: 'South Asia',
    correct: 'nonaligned',
    fact: 'India helped found the Non-Aligned Movement to avoid picking sides.',
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    region: 'Western Europe',
    correct: 'nato',
    fact: 'Britain was a founding NATO member and hosted US airbases.',
  },
  {
    id: 'cuba',
    name: 'Cuba',
    region: 'Caribbean',
    correct: 'soviet',
    fact: 'After 1959, Cuba aligned with Moscow, leading to the missile crisis.',
  },
  {
    id: 'yugoslavia',
    name: 'Yugoslavia',
    region: 'Balkans',
    correct: 'nonaligned',
    fact: 'Marshal Tito broke with Stalin and stayed officially non-aligned.',
  },
  {
    id: 'south-korea',
    name: 'South Korea',
    region: 'East Asia',
    correct: 'nato',
    fact: 'While not in NATO, South Korea relied on US alliances after 1953.',
  },
  {
    id: 'east-germany',
    name: 'East Germany',
    region: 'Eastern Europe',
    correct: 'soviet',
    fact: 'East Germany was created as a Soviet-backed state with the Stasi.',
  },
];

const CRISIS_CARDS = [
  {
    id: 'berlin-airlift',
    title: 'Berlin Blockade (1948)',
    prompt: 'The Soviet Union blocks roads and railways into West Berlin. How should the Western Allies respond?',
    options: [
      { id: 'airlift', label: 'Fly food and fuel in nonstop (Berlin Airlift)', correct: true, explanation: 'The airlift kept Berlin supplied and avoided war.' },
      { id: 'tanks', label: 'Send tanks through checkpoints', correct: false, explanation: 'Driving tanks risked direct combat and nuclear escalation.' },
      { id: 'abandon', label: 'Give up West Berlin', correct: false, explanation: 'Leaving would hand Moscow an easy victory and hurt morale.' },
    ],
  },
  {
    id: 'cuban-missiles',
    title: 'Cuban Missile Crisis (1962)',
    prompt: 'US spy planes spot Soviet missiles in Cuba. What response keeps pressure high without starting World War III?',
    options: [
      { id: 'blockade', label: 'Announce a naval quarantine/blockade', correct: true, explanation: 'The blockade bought time for diplomacy and forced negotiations.' },
      { id: 'airstrike', label: 'Launch airstrikes on the launch sites', correct: false, explanation: 'Airstrikes risked immediate Soviet retaliation.' },
      { id: 'ignore', label: 'Ignore the missiles', correct: false, explanation: 'Backing down would weaken deterrence and allies\' trust.' },
    ],
  },
  {
    id: 'space-race',
    title: 'The Space Race',
    prompt: 'After Sputnik, both sides compete for prestige. Where should you invest?',
    options: [
      { id: 'stem', label: 'STEM education & research scholarships', correct: true, explanation: 'Educating scientists fuels long-term innovation and wins soft power.' },
      { id: 'posters', label: 'Propaganda posters only', correct: false, explanation: 'Posters without real progress won\'t impress allies.' },
      { id: 'bombers', label: 'Build more bombers instead', correct: false, explanation: 'Bombers matter, but the space race was about technology and ideas.' },
    ],
  },
];

const TECH_MISSIONS = [
  {
    id: 'space-toolkit',
    title: 'Assemble a Space Toolkit',
    prompt: 'Select three pieces that made the Apollo moon landings possible.',
    requiredCount: 3,
    options: [
      { id: 'liquid-engines', label: 'Liquid-fuel rocket engines' },
      { id: 'mission-control', label: 'Mission Control computers' },
      { id: 'spy-balloon', label: 'High-altitude spy balloons' },
      { id: 'satellite-tv', label: 'Satellite television jingles' },
      { id: 'astronaut-training', label: 'Rigorous astronaut training' },
    ],
    correct: ['liquid-engines', 'mission-control', 'astronaut-training'],
  },
  {
    id: 'civil-defense',
    title: 'Design Civil Defense Plans',
    prompt: 'Choose three strategies citizens learned during the nuclear era.',
    requiredCount: 3,
    options: [
      { id: 'duck-cover', label: 'Duck-and-cover drills' },
      { id: 'fallout-shelter', label: 'Public fallout shelters' },
      { id: 'radio-alerts', label: 'Emergency radio alerts' },
      { id: 'laser-shields', label: 'Laser shields on cities' },
      { id: 'time-travel', label: 'Time travel experiments' },
    ],
    correct: ['duck-cover', 'fallout-shelter', 'radio-alerts'],
  },
  {
    id: 'diplomacy-kit',
    title: 'Build a Diplomacy Toolkit',
    prompt: 'Pick three tools that reduced tension near the end of the Cold War.',
    requiredCount: 3,
    options: [
      { id: 'hotline', label: 'Washington-Moscow hotline' },
      { id: 'arms-treaties', label: 'Arms limitation treaties (SALT/START)' },
      { id: 'exchange-programs', label: 'Science & music exchange programs' },
      { id: 'spy-parrots', label: 'Spy parrots project' },
      { id: 'wall-upgrades', label: 'Reinforcing the Berlin Wall' },
    ],
    correct: ['hotline', 'arms-treaties', 'exchange-programs'],
  },
];

function ColdWarGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  const [phase, setPhase] = useState(PHASES.INTRO);
  const [allianceChoices, setAllianceChoices] = useState({});
  const [allianceFeedback, setAllianceFeedback] = useState('');
  const [crisisChoices, setCrisisChoices] = useState({});
  const [techIndex, setTechIndex] = useState(0);
  const [techSelection, setTechSelection] = useState([]);
  const [techFeedback, setTechFeedback] = useState('');
  const [techCompleted, setTechCompleted] = useState({});
  const [saving, setSaving] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const allianceCorrect = useMemo(() => (
    COUNTRIES.filter(country => allianceChoices[country.id] === country.correct).length
  ), [allianceChoices]);

  const crisisCorrect = useMemo(() => (
    CRISIS_CARDS.filter(card => crisisChoices[card.id] === card.options.find(option => option.correct)?.id).length
  ), [crisisChoices]);

  const techCorrect = useMemo(() => (
    Object.values(techCompleted).filter(Boolean).length
  ), [techCompleted]);

  const alliancePoints = Math.round((allianceCorrect / COUNTRIES.length) * 40);
  const crisisPoints = Math.round((crisisCorrect / CRISIS_CARDS.length) * 30);
  const techPoints = Math.round((techCorrect / TECH_MISSIONS.length) * 30);
  const totalScore = alliancePoints + crisisPoints + techPoints;

  const allianceComplete = COUNTRIES.every(country => allianceChoices[country.id]);
  const crisisComplete = CRISIS_CARDS.every(card => crisisChoices[card.id]);
  const missionDone = Object.keys(techCompleted).length === TECH_MISSIONS.length;
  const currentMission = TECH_MISSIONS[techIndex];

  const handleAllianceChoice = (countryId, choice) => {
    setAllianceChoices(prev => ({ ...prev, [countryId]: choice }));
    if (COUNTRIES.find(c => c.id === countryId)?.correct === choice) {
      setAllianceFeedback('👍 Correct – that matches how the alliances formed.');
    } else {
      setAllianceFeedback('⚠️ Not quite. Double-check which side influenced that country.');
    }
  };

  const handleCrisisChoice = (cardId, optionId) => {
    setCrisisChoices(prev => ({ ...prev, [cardId]: optionId }));
  };

  const toggleTechOption = (optionId) => {
    if (techSelection.includes(optionId)) {
      setTechSelection(prev => prev.filter(id => id !== optionId));
      return;
    }

    if (techSelection.length >= currentMission.requiredCount) {
      setTechFeedback(`You already selected ${currentMission.requiredCount}. Remove one to try a new idea.`);
      return;
    }

    setTechSelection(prev => [...prev, optionId]);
  };

  const submitTechMission = () => {
    if (techSelection.length !== currentMission.requiredCount) {
      setTechFeedback(`Select exactly ${currentMission.requiredCount} components.`);
      return;
    }

    const sortedChoice = [...techSelection].sort();
    const sortedCorrect = [...currentMission.correct].sort();
    const isCorrect = sortedChoice.length === sortedCorrect.length && sortedChoice.every((id, index) => id === sortedCorrect[index]);

    if (!isCorrect) {
      setTechFeedback('Those pieces do not work together historically. Adjust and try again.');
      return;
    }

    setTechFeedback('Great! That combination mirrors what historians highlight.');
    setTechCompleted(prev => ({ ...prev, [currentMission.id]: true }));
    setTechSelection([]);

    if (techIndex === TECH_MISSIONS.length - 1) {
      finishGame();
    } else {
      setTechIndex(prev => prev + 1);
    }
  };

  const finishGame = async () => {
    setSaving(true);
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
        score: totalScore,
      });
      await addProgress(progress);
      await saveData();
    } catch (error) {
      console.error('Error saving Cold War progress:', error);
    } finally {
      setSaving(false);
      setShowResults(true);
      setPhase(PHASES.COMPLETE);
    }
  };

  const renderAlliancePhase = () => (
    <div>
      <h3>Map the Alliances</h3>
      <p>Tap each country and choose whether it leaned toward NATO, the Soviet Bloc, or stayed Non-Aligned.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {COUNTRIES.map(country => {
          const selection = allianceChoices[country.id];
          return (
            <div key={country.id} style={{ flex: '1 1 260px', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px' }}>
              <div style={{ fontWeight: 600 }}>{country.name}</div>
              <div style={{ fontSize: '0.9rem', color: '#475569' }}>{country.region}</div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                {Object.entries(ALIGNMENT_OPTIONS).map(([key, option]) => (
                  <button
                    key={key}
                    onClick={() => handleAllianceChoice(country.id, key)}
                    style={{
                      flex: '1 1 80px',
                      padding: '6px 10px',
                      borderRadius: '20px',
                      border: selection === key ? `2px solid ${option.color}` : '1px solid #cbd5f5',
                      backgroundColor: selection === key ? `${option.color}22` : '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {selection && (
                <p style={{ marginTop: '8px', fontSize: '0.85rem', color: '#0f172a' }}>{country.fact}</p>
              )}
            </div>
          );
        })}
      </div>
      {allianceFeedback && <p style={{ marginTop: '12px', color: '#0f172a' }}>{allianceFeedback}</p>}
      {allianceComplete && (
        <button onClick={() => setPhase(PHASES.CRISES)} style={{ marginTop: '16px', padding: '10px 18px', fontSize: '16px' }}>
          Continue to Crisis Decisions
        </button>
      )}
    </div>
  );

  const renderCrisisPhase = () => (
    <div>
      <h3>Handle the Flashpoints</h3>
      <p>Each decision shaped trust, fear, and global perceptions. Select the option historians credit as the most stabilizing.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {CRISIS_CARDS.map(card => {
          const selection = crisisChoices[card.id];
          return (
            <div key={card.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
              <h4 style={{ margin: '0 0 8px 0' }}>{card.title}</h4>
              <p style={{ marginTop: 0 }}>{card.prompt}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {card.options.map(option => {
                  const isSelected = selection === option.id;
                  const correct = option.correct;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleCrisisChoice(card.id, option.id)}
                      style={{
                        textAlign: 'left',
                        padding: '10px',
                        borderRadius: '10px',
                        border: isSelected ? `2px solid ${correct ? '#22c55e' : '#dc2626'}` : '1px solid #cbd5f5',
                        backgroundColor: isSelected ? (correct ? '#dcfce7' : '#fee2e2') : '#fff',
                      }}
                    >
                      <strong>{option.label}</strong>
                      {isSelected && (
                        <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem' }}>{option.explanation}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {crisisComplete && (
        <button onClick={() => setPhase(PHASES.TECH)} style={{ marginTop: '16px', padding: '10px 18px', fontSize: '16px' }}>
          Continue to Innovation Lab
        </button>
      )}
    </div>
  );

  const renderTechPhase = () => (
    <div>
      <h3>{currentMission.title}</h3>
      <p>{currentMission.prompt}</p>
      <p style={{ fontStyle: 'italic', color: '#475569' }}>Select {currentMission.requiredCount} items.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {currentMission.options.map(option => {
          const active = techSelection.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => toggleTechOption(option.id)}
              style={{
                flex: '1 1 200px',
                borderRadius: '12px',
                border: active ? '2px solid #2563eb' : '1px solid #cbd5f5',
                backgroundColor: active ? '#dbeafe' : '#fff',
                padding: '12px',
                textAlign: 'left',
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {techFeedback && <p style={{ marginTop: '12px', color: '#0f172a' }}>{techFeedback}</p>}
      <div style={{ marginTop: '16px' }}>
        <button onClick={submitTechMission} style={{ padding: '10px 18px', fontSize: '16px' }}>
          Lock in Selection
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <div><strong>Score:</strong> {totalScore}%</div>
        <div><strong>Phase:</strong> {phase.charAt(0).toUpperCase() + phase.slice(1)}</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
        {phase === PHASES.INTRO && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Cold War Strategy Lab</h2>
            <p>Sort alliances, respond to crises, and assemble the technology kits that kept the Cold War cold.</p>
            <button onClick={() => setPhase(PHASES.ALLIANCES)} style={{ padding: '12px 24px', fontSize: '16px', marginTop: '20px' }}>
              Begin Briefing
            </button>
          </div>
        )}

        {phase === PHASES.ALLIANCES && renderAlliancePhase()}
        {phase === PHASES.CRISES && renderCrisisPhase()}
        {phase === PHASES.TECH && renderTechPhase()}

        {phase === PHASES.COMPLETE && showResults && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Mission Complete</h2>
            <p>You scored {totalScore}% and just walked through four decades of Cold War decision-making.</p>
            <p>{saving ? 'Saving progress...' : 'Progress saved.'}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/lessons')} style={{ padding: '10px 18px' }}>
                Back to Lessons
              </button>
              <button onClick={() => window.location.reload()} style={{ padding: '10px 18px' }}>
                Replay Scenario
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ColdWarGame;

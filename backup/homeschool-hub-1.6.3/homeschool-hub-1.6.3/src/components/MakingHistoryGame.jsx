import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

const PHASES = {
  INTRO: 'intro',
  SOURCES: 'sources',
  INVESTIGATE: 'investigate',
  STORY: 'story',
  COMPLETE: 'complete',
};

const CATEGORY_OPTIONS = {
  primary: {
    label: 'Primary Source',
    hint: 'Created during the time being studied.',
  },
  secondary: {
    label: 'Secondary Source',
    hint: 'Created after the event to explain or analyze it.',
  },
  artifact: {
    label: 'Artifact',
    hint: 'Objects people used, wore, or built.',
  },
  oral: {
    label: 'Oral History',
    hint: 'Memories recorded in interviews.',
  },
};

const SOURCE_CARDS = [
  {
    id: 'nurse-diary',
    title: 'Nurse Diary (1942)',
    detail: '"I changed bandages for thirteen soldiers after the night raid."',
    correct: 'primary',
  },
  {
    id: 'textbook',
    title: 'Modern History Textbook',
    detail: 'Chapter explains why the Roman Empire collapsed.',
    correct: 'secondary',
  },
  {
    id: 'bronze-sword',
    title: 'Bronze Age Sword',
    detail: 'Weathered weapon discovered near a river valley.',
    correct: 'artifact',
  },
  {
    id: 'interview-audio',
    title: 'Interview Recording',
    detail: '2020 audio of a Blitz evacuee describing the train journey.',
    correct: 'oral',
  },
  {
    id: 'newspaper-1912',
    title: '1912 Newspaper',
    detail: 'Front-page article about the sinking of the Titanic.',
    correct: 'primary',
  },
  {
    id: 'museum-panel',
    title: 'Museum Panel',
    detail: 'Curators summarize artifacts from an Ancient Mali exhibit.',
    correct: 'secondary',
  },
];

const INVESTIGATION_CASES = [
  {
    id: 'factory-fire',
    title: '1911 Factory Fire',
    prompt: 'You want to know how working conditions led to the accident. What should you do first?',
    options: [
      { id: 'inspect-letters', label: 'Read workers\' letters complaining about safety', correct: true, explanation: 'Letters reveal first-hand evidence of the dangers.' },
      { id: 'skip-sources', label: 'Write the report without sources', correct: false, explanation: 'Historians always cite evidence before writing.' },
      { id: 'only-statistics', label: 'Look only at national statistics', correct: false, explanation: 'Statistics help, but alone they miss what happened in that factory.' },
    ],
  },
  {
    id: 'mystery-painting',
    title: 'Mystery Painting',
    prompt: 'A 1700s painting shows a harbor celebration. How do you evaluate it?',
    options: [
      { id: 'ask-questions', label: 'Check who painted it, when, and why', correct: true, explanation: 'Purpose and creator help reveal bias or missing details.' },
      { id: 'trust-automatically', label: 'Assume it is perfectly accurate', correct: false, explanation: 'Art can exaggerate or promote certain viewpoints.' },
      { id: 'ignore-painting', label: 'Do not use art as evidence', correct: false, explanation: 'Visual sources are useful when questioned carefully.' },
    ],
  },
  {
    id: 'oral-history',
    title: 'Oral History Clip',
    prompt: 'A grandparent describes rationing in World War II. What strengthens your interpretation?',
    options: [
      { id: 'compare-sources', label: 'Compare their memories with ration books and government notices', correct: true, explanation: 'Cross-checking improves accuracy and fairness.' },
      { id: 'change-story', label: 'Rewrite their story to be more exciting', correct: false, explanation: 'Historians should not alter evidence for drama.' },
      { id: 'delete-details', label: 'Remove anything emotional', correct: false, explanation: 'Feelings are data about lived experiences.' },
    ],
  },
];

const STORY_STAGES = {
  question: {
    label: 'Big Question',
    description: 'Introduce the investigation and what you want to discover.',
  },
  evidence: {
    label: 'Evidence Board',
    description: 'Present quotes, stats, and artifacts that answer the question.',
  },
  reflection: {
    label: 'Historical Insight',
    description: 'Explain what the evidence means and why it matters today.',
  },
};

const STORY_CLUES = [
  {
    id: 'hook',
    text: 'Why did this trading port grow faster than inland towns?',
    correctStage: 'question',
  },
  {
    id: 'map-clue',
    text: 'Harbor maps from 1850 show three new warehouses labeled "spice".',
    correctStage: 'evidence',
  },
  {
    id: 'interview-clue',
    text: 'Dockworker interview: "Merchants paid higher wages to unload goods quickly."',
    correctStage: 'evidence',
  },
  {
    id: 'context',
    text: 'The town council funded canals to connect farms to the port.',
    correctStage: 'evidence',
  },
  {
    id: 'insight',
    text: 'When leaders invest in infrastructure, ordinary workers feel both opportunity and pressure.',
    correctStage: 'reflection',
  },
  {
    id: 'today-link',
    text: 'Modern cities can compare this case to understand how new transport plans affect residents.',
    correctStage: 'reflection',
  },
];

function MakingHistoryGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  const [phase, setPhase] = useState(PHASES.INTRO);
  const [sourceChoices, setSourceChoices] = useState({});
  const [sourceFeedback, setSourceFeedback] = useState('');
  const [caseChoices, setCaseChoices] = useState({});
  const [storyAssignments, setStoryAssignments] = useState({});
  const [storyFeedback, setStoryFeedback] = useState('');
  const [saving, setSaving] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const sourcesComplete = SOURCE_CARDS.every(card => sourceChoices[card.id]);
  const investigationsComplete = INVESTIGATION_CASES.every(item => caseChoices[item.id]);
  const storyComplete = STORY_CLUES.every(clue => storyAssignments[clue.id]);
  const storyAllCorrect = storyComplete && STORY_CLUES.every(clue => storyAssignments[clue.id] === clue.correctStage);

  const sourceCorrectCount = useMemo(() => (
    SOURCE_CARDS.filter(card => sourceChoices[card.id] === card.correct).length
  ), [sourceChoices]);

  const investigationCorrectCount = useMemo(() => (
    INVESTIGATION_CASES.filter(item => {
      const correctOption = item.options.find(option => option.correct);
      return caseChoices[item.id] === correctOption?.id;
    }).length
  ), [caseChoices]);

  const storyCorrectCount = useMemo(() => (
    STORY_CLUES.filter(clue => storyAssignments[clue.id] === clue.correctStage).length
  ), [storyAssignments]);

  const sourcePoints = Math.round((sourceCorrectCount / SOURCE_CARDS.length) * 35);
  const investigationPoints = Math.round((investigationCorrectCount / INVESTIGATION_CASES.length) * 35);
  const storyPoints = Math.round((storyCorrectCount / STORY_CLUES.length) * 30);
  const totalScore = sourcePoints + investigationPoints + storyPoints;

  const handleSourceChoice = (cardId, category) => {
    setSourceChoices(prev => ({ ...prev, [cardId]: category }));
    if (SOURCE_CARDS.find(card => card.id === cardId)?.correct === category) {
      setSourceFeedback('Nice! You matched that source with the right category.');
    } else {
      setSourceFeedback('Re-check the hints — when and how was that source created?');
    }
  };

  const handleCaseChoice = (caseId, optionId) => {
    setCaseChoices(prev => ({ ...prev, [caseId]: optionId }));
  };

  const handleStorySelection = (clueId, stage) => {
    setStoryAssignments(prev => ({ ...prev, [clueId]: stage }));
    if (STORY_CLUES.find(clue => clue.id === clueId)?.correctStage === stage) {
      setStoryFeedback('That section fits perfectly in your narrative.');
    } else {
      setStoryFeedback('Try a different stage — does it introduce, prove, or reflect?');
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
      console.error('Error saving Making History progress:', error);
    } finally {
      setSaving(false);
      setShowResults(true);
      setPhase(PHASES.COMPLETE);
    }
  };

  const renderSourcesPhase = () => (
    <div style={{ width: '100%', minWidth: 0 }}>
      <h3>Source Sorting Lab</h3>
      <p>Tap each card and decide what kind of historical source it is. Use the hints if you get stuck.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', width: '100%', minWidth: 0 }}>
        {SOURCE_CARDS.map(card => {
          const selected = sourceChoices[card.id];
          return (
            <div key={card.id} style={{ 
              flex: '1 1 280px', 
              minWidth: 0,
              maxWidth: '100%',
              border: '1px solid #e2e8f0', 
              borderRadius: '12px', 
              padding: '14px',
              boxSizing: 'border-box'
            }}>
              <h4 style={{ margin: '0 0 6px 0', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{card.title}</h4>
              <p style={{ margin: '0 0 10px 0', color: '#475569', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{card.detail}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', width: '100%', minWidth: 0 }}>
                {Object.entries(CATEGORY_OPTIONS).map(([key, option]) => (
                  <button
                    key={key}
                    onClick={() => handleSourceChoice(card.id, key)}
                    style={{
                      flex: '1 1 120px',
                      minWidth: 0,
                      padding: '6px 10px',
                      borderRadius: '999px',
                      border: selected === key ? '2px solid #2563eb' : '1px solid #cbd5f5',
                      backgroundColor: selected === key ? '#dbeafe' : '#fff',
                      cursor: 'pointer',
                      boxSizing: 'border-box',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {selected && (
                <p style={{ marginTop: '8px', fontSize: '0.85rem', color: '#64748b', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{CATEGORY_OPTIONS[selected]?.hint}</p>
              )}
            </div>
          );
        })}
      </div>
      {sourceFeedback && <p style={{ marginTop: '12px', color: '#0f172a', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{sourceFeedback}</p>}
      {sourcesComplete && (
        <button onClick={() => setPhase(PHASES.INVESTIGATE)} style={{ marginTop: '16px', padding: '10px 18px', fontSize: '16px' }}>
          Continue to Source Detective
        </button>
      )}
    </div>
  );

  const renderInvestigationPhase = () => (
    <div style={{ width: '100%', minWidth: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
      <h3 style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>Source Detective</h3>
      <p style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>Each card is an investigation. Choose the action historians would take to keep their work reliable.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', minWidth: 0, maxWidth: '100%' }}>
        {INVESTIGATION_CASES.map(item => {
          const selection = caseChoices[item.id];
          return (
            <div key={item.id} style={{ 
              border: '1px solid #e2e8f0', 
              borderRadius: '12px', 
              padding: '16px',
              width: '100%',
              minWidth: 0,
              maxWidth: '100%',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}>
              <h4 style={{ margin: '0 0 6px 0', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{item.title}</h4>
              <p style={{ margin: '0 0 10px 0', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{item.prompt}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', minWidth: 0, maxWidth: '100%' }}>
                {item.options.map(option => {
                  const isSelected = selection === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleCaseChoice(item.id, option.id)}
                      style={{
                        textAlign: 'left',
                        padding: '10px',
                        borderRadius: '10px',
                        border: isSelected ? (option.correct ? '2px solid #16a34a' : '2px solid #dc2626') : '1px solid #cbd5f5',
                        backgroundColor: isSelected ? (option.correct ? '#dcfce7' : '#fee2e2') : '#fff',
                        width: '100%',
                        minWidth: 0,
                        maxWidth: '100%',
                        boxSizing: 'border-box',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        cursor: 'pointer',
                        overflow: 'hidden'
                      }}
                    >
                      <strong style={{ wordWrap: 'break-word', overflowWrap: 'break-word', display: 'block' }}>{option.label}</strong>
                      {isSelected && (
                        <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{option.explanation}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {investigationsComplete && (
        <button onClick={() => setPhase(PHASES.STORY)} style={{ marginTop: '16px', padding: '10px 18px', fontSize: '16px' }}>
          Continue to History Brief Builder
        </button>
      )}
    </div>
  );

  const renderStoryPhase = () => (
    <div style={{ width: '100%', minWidth: 0 }}>
      <h3>History Brief Builder</h3>
      <p>Place each clue into the part of your write-up where it fits best. You need a question, evidence, and reflection.</p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px', width: '100%', minWidth: 0 }}>
        {Object.entries(STORY_STAGES).map(([key, stage]) => (
          <div key={key} style={{ 
            flex: '1 1 240px', 
            minWidth: 0,
            maxWidth: '100%',
            border: '1px dashed #cbd5f5', 
            borderRadius: '12px', 
            padding: '12px',
            boxSizing: 'border-box'
          }}>
            <strong style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{stage.label}</strong>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem', color: '#475569', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{stage.description}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', width: '100%', minWidth: 0 }}>
        {STORY_CLUES.map(clue => {
          const selection = storyAssignments[clue.id];
          return (
            <div key={clue.id} style={{ 
              flex: '1 1 280px', 
              minWidth: 0,
              maxWidth: '100%',
              border: '1px solid #e2e8f0', 
              borderRadius: '12px', 
              padding: '14px',
              boxSizing: 'border-box'
            }}>
              <p style={{ margin: '0 0 10px 0', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{clue.text}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', width: '100%', minWidth: 0 }}>
                {Object.entries(STORY_STAGES).map(([stageKey, stage]) => (
                  <button
                    key={stageKey}
                    onClick={() => handleStorySelection(clue.id, stageKey)}
                    style={{
                      flex: '1 1 120px',
                      minWidth: 0,
                      padding: '6px 10px',
                      borderRadius: '999px',
                      border: selection === stageKey ? '2px solid #7c3aed' : '1px solid #cbd5f5',
                      backgroundColor: selection === stageKey ? '#ede9fe' : '#fff',
                      cursor: 'pointer',
                      boxSizing: 'border-box',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {stage.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {storyFeedback && <p style={{ marginTop: '12px', color: '#0f172a', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{storyFeedback}</p>}
      <button
        onClick={finishGame}
        disabled={!storyAllCorrect || saving}
        style={{
          marginTop: '16px',
          padding: '12px 20px',
          fontSize: '16px',
          backgroundColor: storyAllCorrect ? '#2563eb' : '#94a3b8',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: storyAllCorrect ? 'pointer' : 'not-allowed',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {storyAllCorrect ? 'Finalize History Brief' : 'Place every clue correctly to finish'}
      </button>
    </div>
  );

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      width: '100%', 
      minWidth: 0,
      maxWidth: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '16px', 
        flexWrap: 'wrap', 
        gap: '8px', 
        width: '100%', 
        minWidth: 0,
        flexShrink: 0
      }}>
        <div style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}><strong>Score:</strong> {totalScore}%</div>
        <div style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}><strong>Phase:</strong> {phase.charAt(0).toUpperCase() + phase.slice(1)}</div>
      </div>

      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        overflowX: 'hidden',
        paddingRight: '4px', 
        width: '100%', 
        minWidth: 0, 
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}>
        {phase === PHASES.INTRO && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Making History Lab</h2>
            <p>Sort evidence, investigate sources, and craft a compelling history brief that could publish tomorrow.</p>
            <button onClick={() => setPhase(PHASES.SOURCES)} style={{ padding: '12px 24px', fontSize: '16px', marginTop: '20px' }}>
              Start Investigating
            </button>
          </div>
        )}

        {phase === PHASES.SOURCES && renderSourcesPhase()}
        {phase === PHASES.INVESTIGATE && renderInvestigationPhase()}
        {phase === PHASES.STORY && renderStoryPhase()}

        {phase === PHASES.COMPLETE && showResults && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Archive Approved</h2>
            <p>You scored {totalScore}% by thinking like a historian from the first question to the final reflection.</p>
            <p>{saving ? 'Saving progress...' : 'Progress saved.'}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/lessons')} style={{ padding: '10px 18px' }}>
                Back to Lessons
              </button>
              <button onClick={() => window.location.reload()} style={{ padding: '10px 18px' }}>
                Restart Investigation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MakingHistoryGame;

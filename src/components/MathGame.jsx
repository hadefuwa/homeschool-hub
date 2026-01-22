import React, { useState, useEffect, useRef } from 'react';
import { speak, stop, isSpeaking } from '../utils/textToSpeech';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { useNavigate } from 'react-router-dom';

// Lesson configurations for math games
const LESSON_CONFIGS = {
  1: { type: 'recognize-1', number: 1, title: 'Number 1', emoji: '1️⃣', objects: ['🍎'] },
  2: { type: 'recognize-2', number: 2, title: 'Number 2', emoji: '2️⃣', objects: ['🍎', '🍌'] },
  3: { type: 'recognize-3', number: 3, title: 'Number 3', emoji: '3️⃣', objects: ['🍎', '🍌', '🍊'] },
  4: { type: 'count-1-3', numbers: [1, 2, 3], title: 'Counting 1-3', emojis: ['1️⃣', '2️⃣', '3️⃣'] },
  5: { type: 'match-1', number: 1, title: 'Match Number 1', emoji: '1️⃣', objects: ['🍎'] },
  6: { type: 'match-2', number: 2, title: 'Match Number 2', emoji: '2️⃣', objects: ['🍎', '🍌'] },
  7: { type: 'match-3', number: 3, title: 'Match Number 3', emoji: '3️⃣', objects: ['🍎', '🍌', '🍊'] },
  8: { type: 'count-1-5', numbers: [1, 2, 3, 4, 5], title: 'Counting 1-5', emojis: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'] },
  9: { type: 'order-1-3', numbers: [1, 2, 3], title: 'Number Order 1-3', emojis: ['1️⃣', '2️⃣', '3️⃣'] },
  10: { type: 'recognize-1-5', numbers: [1, 2, 3, 4, 5], title: 'Numbers 1-5', emojis: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'] },
  11: {
    type: 'counting-to-10',
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    title: 'Counting to 10',
    emojis: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'],
  },
  12: {
    type: 'counting-to-20',
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    title: 'Counting to 20',
    emojis: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '1️⃣1️⃣', '1️⃣2️⃣', '1️⃣3️⃣', '1️⃣4️⃣', '1️⃣5️⃣', '1️⃣6️⃣', '1️⃣7️⃣', '1️⃣8️⃣', '1️⃣9️⃣', '2️⃣0️⃣'],
  },
  // Reception - Lesson 1: Recognising Numbers
  13: { type: 'recognize-1-10', numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], title: 'Recognising Numbers', emojis: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'] },
  // Year 1 - Lesson 1: Counting to 10 (already exists as 11, but we'll use 14 for this one)
  14: { type: 'counting-to-10-advanced', numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], title: 'Counting to 10', emojis: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'] },
  // Year 1 - Lesson 2: Adding Numbers
  15: { type: 'addition', numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], title: 'Adding Numbers', maxSum: 20 },
  // Year 2 - Lesson 1: Counting to 20 (already exists as 12, but we'll use 16 for this one)
  16: { type: 'counting-to-20-advanced', numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], title: 'Counting to 20', emojis: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '1️⃣1️⃣', '1️⃣2️⃣', '1️⃣3️⃣', '1️⃣4️⃣', '1️⃣5️⃣', '1️⃣6️⃣', '1️⃣7️⃣', '1️⃣8️⃣', '1️⃣9️⃣', '2️⃣0️⃣'] },
  // Year 3 - Lesson 1: Multiplication Tables
  17: { type: 'multiplication', tables: [2, 5, 10], maxProduct: 50, title: 'Multiplication Tables' },
  // Year 3 - Lesson 2: Division Basics
  18: { type: 'division', divisors: [2, 3, 4, 5], maxDividend: 20, title: 'Division Basics' },
  // Year 3 - Lesson 3: Fractions Introduction
  19: { type: 'fractions-basic', title: 'Fractions Introduction', fractions: ['1/2', '1/3', '1/4', '2/4', '3/4'] },
  // Year 4 - Lesson 1: Long Multiplication
  20: { type: 'long-multiplication', maxFactor1: 99, maxFactor2: 9, title: 'Long Multiplication' },
  // Year 4 - Lesson 2: Fractions and Decimals
  21: { type: 'fractions-decimals', title: 'Fractions and Decimals', fractions: ['1/2', '1/4', '3/4', '1/10'], decimals: [0.5, 0.25, 0.75, 0.1] },
  // Year 4 - Lesson 3: Measurement and Units
  22: { type: 'measurement', title: 'Measurement and Units', units: ['cm', 'm', 'kg', 'g', 'L', 'mL'] },
  // Year 6 - Lesson 1: Algebra Introduction
  23: { type: 'algebra-basic', title: 'Algebra Introduction', maxValue: 20 },
  // Year 6 - Lesson 2: Statistics and Data
  24: { type: 'statistics', title: 'Statistics and Data', maxDataPoints: 10 },
  // Year 6 - Lesson 3: Advanced Problem Solving
  25: { type: 'problem-solving', title: 'Advanced Problem Solving', difficulty: 'advanced' },
  // Year 5 - Lesson 5: Percentages
  26: { type: 'percentages', title: 'Percentages', percentages: [25, 50, 75, 100], fractions: ['1/4', '1/2', '3/4', '1'] },
  // Year 5 - Lesson 7: Symmetry
  27: { type: 'symmetry', title: 'Symmetry', shapes: ['square', 'rectangle', 'circle', 'triangle', 'pentagon', 'hexagon'] },
  // Year 5 - Lesson 8: Volume
  28: { type: 'volume', title: 'Volume', maxDimension: 10 },
  // Year 5 - Lesson 10: Mean, Median, Mode
  29: { type: 'mean-median-mode', title: 'Mean, Median, Mode', maxDataPoints: 10 },
  // Year 6 - Lesson 6: Ratio and Proportion
  30: { type: 'ratio-proportion', title: 'Ratio and Proportion', maxRatio: 10 },
  // Year 6 - Lesson 11: Converting Fractions/Decimals/Percentages
  31: { type: 'fractions-decimals-percentages', title: 'Converting Fractions/Decimals/Percentages', fractions: ['1/2', '1/4', '3/4', '1/5', '2/5', '1/10'], decimals: [0.5, 0.25, 0.75, 0.2, 0.4, 0.1], percentages: [50, 25, 75, 20, 40, 10] },
  // Year 2 - Place Value to 100
  32: { type: 'place-value-100', title: 'Place Value to 100', maxNumber: 99 },
  // Year 2 - Length Measurement
  42: { type: 'length-measurement', title: 'Length Measurement', units: ['cm', 'm'] },
  // Year 2 - Addition to 20
  33: { type: 'addition-to-20', title: 'Addition to 20', maxSum: 20 },
  // Year 2 - Subtraction to 20
  34: { type: 'subtraction-to-20', title: 'Subtraction to 20', maxDifference: 20 },
  // Year 3 - Place Value to 1000
  35: { type: 'place-value-1000', title: 'Place Value to 1000', maxNumber: 999 },
  // Year 3 - Perimeter
  36: { type: 'perimeter', title: 'Perimeter', maxSide: 10 },
  // Year 3 - Mass and Capacity
  37: { type: 'mass-capacity', title: 'Mass and Capacity', maxAmount: 10000 },
  // Year 4 - Place Value to 10,000
  38: { type: 'place-value-10000', title: 'Place Value to 10,000', maxNumber: 9999 },
  // Year 4 - Area by Counting Squares
  39: { type: 'area-counting-squares', title: 'Area by Counting Squares', maxGrid: 5 },
  // Year 5 - Place Value to 1,000,000
  40: { type: 'place-value-1000000', title: 'Place Value to 1,000,000', maxNumber: 999999 },
  // Year 6 - Negative Numbers
  41: { type: 'negative-numbers', title: 'Negative Numbers', maxAbsValue: 10 },
  43: { type: 'counting-to-100', title: 'Counting to 100', numbers: Array.from({ length: 100 }, (_, i) => i + 1) },
  44: { type: 'advanced-addition', title: 'Advanced Addition', maxSum: 100 },
  45: { type: 'advanced-subtraction', title: 'Advanced Subtraction', maxDifference: 100 },
  46: { type: 'telling-time', title: 'Telling Time' },
  47: { type: 'money-math-counting-coins', title: 'Money Math: Counting Coins' },
  48: { type: 'fractions-equivalents', title: 'Fractions: Equivalents' },
  49: { type: 'geometry-3d-shapes', title: 'Geometry: 3D Shapes' },
  50: { type: 'measurement-temperature', title: 'Measurement: Temperature' },
  51: { type: 'patterns-what-comes-next', title: 'Patterns: What Comes Next?' },
  52: { type: 'roman-numerals', title: 'Roman Numerals' },
  53: { type: 'number-bonds', title: 'Number Bonds to 5', maxSum: 5 },
  54: { type: 'number-bonds', title: 'Number Bonds to 10', maxSum: 10 },
  55: { type: 'compare-quantities', title: 'Compare Quantities', maxNumber: 20 },
  56: { type: 'skip-counting', title: 'Skip Counting', steps: [2, 5, 10], maxNumber: 100 },
  57: { type: 'measurement-compare', title: 'Length and Mass', maxNumber: 50 },
  58: { type: 'position-direction', title: 'Position and Direction' },
  59: { type: 'time-sequence', title: 'Time Sequence' },
  60: { type: 'rounding', title: 'Rounding Numbers', maxNumber: 999 },
  61: { type: 'factors-multiples', title: 'Factors and Multiples', maxNumber: 60 },
  62: { type: 'decimals-3dp', title: 'Decimals to 3 Decimal Places' },
  63: { type: 'fraction-add', title: 'Adding and Subtracting Fractions' },
  64: { type: 'prime-square', title: 'Prime and Square Numbers', maxNumber: 60 },
  65: { type: 'percentage-change', title: 'Percentage Change' },
  66: { type: 'add-sub-3digit', title: 'Add and Subtract 3-Digit Numbers' },
  67: { type: 'multiplication', tables: [3, 4, 8], maxProduct: 96, title: 'Times Tables 3, 4, 8' },
  68: { type: 'multiplication', tables: [6, 7, 9, 11, 12], maxProduct: 144, title: 'Times Tables 6, 7, 9, 11, 12' },
  69: { type: 'large-multiplication', title: 'Large Multiplication (3-4 Digit Numbers)' },
  70: { type: 'large-division', title: 'Large Division (3-4 Digit Numbers)' },
};

// Scoring tiers
const SCORE_TIERS = {
  PLATINUM: { name: 'Platinum', color: '#E5E4E2', tries: 1 },
  GOLD: { name: 'Gold', color: '#FFD700', tries: 1 },
  SILVER: { name: 'Silver', color: '#C0C0C0', tries: 2 },
  BRONZE: { name: 'Bronze', color: '#CD7F32', tries: 3 },
  FAIL: { name: 'Try Again', color: '#dc3545', tries: 0 },
};

// Number names for speech
const NUMBER_NAMES = {
  1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
  6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
  11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen',
  16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen', 20: 'twenty',
};

// Helper function to render a pie chart for a fraction
const renderPieChart = (fraction, size = 100) => {
  const [numerator, denominator] = fraction.split('/').map(Number);
  const radius = size / 2 - 8;
  const center = size / 2;
  const strokeWidth = 2;

  // Create paths for each slice
  const slices = [];
  const sliceAngle = (2 * Math.PI) / denominator;

  for (let i = 0; i < denominator; i++) {
    const startAngle = i * sliceAngle - Math.PI / 2; // Start from top
    const endAngle = (i + 1) * sliceAngle - Math.PI / 2;

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

    const pathData = [
      `M ${center} ${center}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');

    const isFilled = i < numerator;

    slices.push(
      <path
        key={i}
        d={pathData}
        fill={isFilled ? '#2196F3' : '#e0e0e0'}
        stroke="#fff"
        strokeWidth={strokeWidth}
      />
    );
  }

  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      {slices}
      {/* Fraction text */}
      <text
        x={center}
        y={center + 6}
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="#333"
      >
        {fraction}
      </text>
    </svg>
  );
};

function MathGame({ lesson }) {
  const [gameState, setGameState] = useState('validation'); // Start directly in validation mode - no activity phase needed
  const [currentScore, setCurrentScore] = useState(null);
  const [validationAttempts, setValidationAttempts] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [validationOptions, setValidationOptions] = useState([]);
  const [validationObjects, setValidationObjects] = useState([]);
  const [activityObjectCount, setActivityObjectCount] = useState(null);
  const [highlightedOptionIndex, setHighlightedOptionIndex] = useState(-1);
  const [isInitialized, setIsInitialized] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const initializedLessonIdRef = useRef(null); // Track which lesson we've initialized
  const isGeneratingValidationRef = useRef(false); // Prevent multiple simultaneous calls to generateValidation
  const speakTimeoutRef = useRef(null); // Track the timeout for speaking question
  const currentQuestionTextRef = useRef(''); // Store the current question text to avoid stale closures
  const questionGenerationIdRef = useRef(0); // Track question generation to prevent stale TTS
  const isMountedRef = useRef(true); // Track if component is mounted
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextLessonUrl = useDataStore(state => state.getNextLessonUrl);
  const disableStudyMode = useDataStore(state => state.disableStudyMode);
  const getNextLessonForSubject = useDataStore(state => state.getNextLessonForSubject);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  // Map lesson title to math game config number
  const getMathLessonNumber = () => {
    if (!lesson?.title) {
      console.warn('MathGame: No lesson title found, using default config');
      return 1;
    }

    const title = lesson.title.toLowerCase();
    const yearId = lesson.yearId;
    const assessmentType = lesson.assessmentType;

    if (assessmentType === 'number-bonds-game') {
      return title.includes('10') ? 54 : 53;
    }
    if (assessmentType === 'compare-quantities-game') return 55;
    if (assessmentType === 'skip-counting-game') return 56;
    if (assessmentType === 'measurement-compare-game') return 57;
    if (assessmentType === 'position-direction-game') return 58;
    if (assessmentType === 'time-sequence-game') return 59;
    if (assessmentType === 'rounding-game') return 60;
    if (assessmentType === 'factors-multiples-game') return 61;
    if (assessmentType === 'decimal-place-game') return 62;
    if (assessmentType === 'fraction-add-game') return 63;
    if (assessmentType === 'prime-sort-game') return 64;
    if (assessmentType === 'percentage-change-game') return 65;
    if (assessmentType === 'column-method-game') return 66;
    if (assessmentType === 'times-table-game') {
      if (title.includes('3, 4, and 8')) return 67;
      if (title.includes('6, 7, 9, 11, and 12')) return 68;
      return 17;
    }
    if (assessmentType === 'division-sharing-game') return 18;
    if (assessmentType === 'fraction-match-game' || assessmentType === 'fraction-line-game') return 19;
    if (assessmentType === 'decimal-match-game') return 21;
    if (assessmentType === 'unit-conversion-game') return 22;
    if (assessmentType === 'algebra-balance-game') return 23;
    if (assessmentType === 'percentage-shade-game') return 26;
    if (assessmentType === 'symmetry-mirror-game') return 27;
    if (assessmentType === 'volume-fill-game') return 28;
    if (assessmentType === 'stats-averages-game') return 29;
    if (assessmentType === 'ratio-mix-game' || assessmentType === 'proportion-scale-game') return 30;
    if (assessmentType === 'fdp-tri-match-game') return 31;
    if (assessmentType === 'perimeter-trace-game') return 36;
    if (assessmentType === 'area-tiling-game') return 39;
    if (assessmentType === 'area-cut-fit-game') return 39;
    if (assessmentType === 'scale-grid-game') return 30;
    if (assessmentType === 'nets-fold-game') return 49;
    if (assessmentType === 'volume-cuboid-game') return 28;

    // Early years lessons (nursery, reception, year1, year2)
    if (title.includes('number 1') && !title.includes('numbers 1-5')) return 1;
    if (title.includes('number 2')) return 2;
    if (title.includes('number 3')) return 3;
    if (title.includes('counting 1-3')) return 4;
    if (title.includes('match number 1')) return 5;
    if (title.includes('match number 2')) return 6;
    if (title.includes('match number 3')) return 7;
    if (title.includes('counting 1-5')) return 8;
    if (title.includes('number order')) return 9;
    if (title.includes('numbers 1-5')) return 10;
    if (title.includes('counting to 10') && yearId === 'year1') return 14;
    if (title.includes('counting to 10')) return 11;
    if (title.includes('counting to 20') && yearId === 'nursery') return 12;
    if (title.includes('counting to 20') && yearId === 'year2') return 16;
    if (title.includes('recognising numbers') || title.includes('recognizing numbers')) return 13;
    if (title.includes('adding numbers')) return 15;

    // Year 2 lessons
    if (title.includes('place value to 100') && yearId === 'year2') return 32;
    if (title.includes('addition to 20') && yearId === 'year2') return 33;
    if (title.includes('subtraction to 20') && yearId === 'year2') return 34;

    // Year 3+ lessons - check by year and title
    if (title.includes('multiplication tables') || title.includes('multiplication')) return 17;
    if (title.includes('division basics') || title.includes('division')) return 18;
    if (title.includes('fractions introduction') || (title.includes('fractions') && yearId === 'year3')) return 19;
    if (title.includes('long multiplication')) return 20;
    if (title.includes('fractions and decimals') || (title.includes('fractions') && yearId === 'year4')) return 21;
    if (title.includes('length measurement') && yearId === 'year2') return 42;
    if (title.includes('measurement and units') || (title.includes('measurement') && yearId === 'year4')) return 22;
    if (title.includes('algebra introduction') || (title.includes('algebra') && yearId === 'year6')) return 23;
    if (title.includes('statistics and data') || title.includes('statistics')) return 24;
    if (title.includes('advanced problem solving') || title.includes('problem solving')) return 25;

    // Year 3 lessons
    if (title.includes('place value to 1000') && yearId === 'year3') return 35;
    if (title.includes('perimeter') && yearId === 'year3') return 36;
    if (title.includes('mass and capacity') && yearId === 'year3') return 37;

    // Year 4 lessons
    if (title.includes('place value to 10,000') || title.includes('place value to 10000')) return 38;
    if (title.includes('area by counting squares') && yearId === 'year4') return 39;

    // Year 5 lessons
    if (title.includes('place value to 1,000,000') || title.includes('place value to 1000000')) return 40;
    if (title.includes('percentages') && yearId === 'year5') return 26;
    if (title.includes('symmetry') && yearId === 'year5') return 27;
    if (title.includes('volume') && yearId === 'year5') return 28;
    if (title.includes('mean, median, mode') || title.includes('mean median mode')) return 29;

    // Year 6 lessons
    if (title.includes('negative numbers')) return 41;
    if (title.includes('ratio and proportion') || title.includes('ratio')) return 30;
    if (title.includes('converting fractions/decimals/percentages') || (title.includes('converting') && title.includes('fractions') && title.includes('percentages'))) return 31; // Use fractions-decimals-percentages config

    // New lessons
    if (title.includes('counting to 100')) return 43;
    if (title.includes('advanced addition')) return 44;
    if (title.includes('advanced subtraction')) return 45;
    if (title.includes('telling time')) return 46;
    if (title.includes('money math: counting coins')) return 47;
    if (title.includes('fractions: equivalents')) return 48;
    if (title.includes('geometry: 3d shapes')) return 49;
    if (title.includes('measurement: temperature')) return 50;
    if (title.includes('patterns: what comes next?')) return 51;
    if (title.includes('roman numerals')) return 52;
    if (title.includes('number bonds')) return title.includes('10') ? 54 : 53;
    if (title.includes('compare quantities')) return 55;
    if (title.includes('count in 2s') || title.includes('skip counting')) return 56;
    if (title.includes('length and height') || title.includes('length and mass')) return 57;
    if (title.includes('position and direction')) return 58;
    if (title.includes('daily routine')) return 59;
    if (title.includes('rounding')) return 60;
    if (title.includes('factors and multiples')) return 61;
    if (title.includes('decimals to 3')) return 62;
    if (title.includes('adding and subtracting fractions')) return 63;
    if (title.includes('prime and square')) return 64;
    if (title.includes('percentage change')) return 65;
    if (title.includes('add and subtract 3-digit')) return 66;
    if (title.includes('3, 4, and 8 times tables')) return 67;
    if (title.includes('6, 7, 9, 11, and 12 times tables')) return 68;
    if (title.includes('large multiplication') || title.includes('3-4 digit multiplication')) return 69;
    if (title.includes('large division') || title.includes('3-4 digit division')) return 70;

    // If no match found, log warning and use a safe default
    console.warn(`MathGame: No config found for lesson "${lesson.title}" (Year: ${yearId}, Lesson #: ${lesson.lessonNumber}). Using default config.`);
    return 1; // Use default config instead of lesson number
  };

  const mathLessonNumber = getMathLessonNumber();
  const config = LESSON_CONFIGS[mathLessonNumber] || LESSON_CONFIGS[1];
  const isTtsDisabled = Boolean(lesson?.ttsDisabled) || config?.type === 'roman-numerals';

  // Memoize mathLessonNumber to prevent unnecessary re-renders
  const stableMathLessonNumber = React.useMemo(() => mathLessonNumber, [lesson?.id, lesson?.title, lesson?.yearId]);

  // Safety check - if config is invalid, use default
  if (!config || !config.type) {
    console.error('Invalid config for math lesson:', mathLessonNumber, 'Using default');
    const defaultConfig = LESSON_CONFIGS[1];
    if (defaultConfig) {
      Object.assign({}, defaultConfig);
    }
  }

  useEffect(() => {
    // Reset all state when lesson changes
    setIsInitialized(false);
    initializedLessonIdRef.current = null; // Reset initialization tracking
    isGeneratingValidationRef.current = false; // Reset generation flag
    setGameState('validation'); // Reset to validation state
    setCurrentScore(null); // Clear the score/medal
    setCorrectAnswer(null);
    setValidationOptions([]);
    setQuestionText('');
    setValidationObjects([]);
    setValidationAttempts(0);

    // Clear any pending speak timeout
    if (speakTimeoutRef.current) {
      clearTimeout(speakTimeoutRef.current);
      speakTimeoutRef.current = null;
    }
    // Reset question text ref and increment generation ID to invalidate any pending TTS
    currentQuestionTextRef.current = '';
    setHighlightedOptionIndex(-1);
    questionGenerationIdRef.current += 1;

    // Mark component as mounted
    isMountedRef.current = true;

    return () => {
      stop();
      // Clear timeout on unmount
      if (speakTimeoutRef.current) {
        clearTimeout(speakTimeoutRef.current);
        speakTimeoutRef.current = null;
      }
      // Mark component as unmounted
      isMountedRef.current = false;
    };
  }, [lesson?.id]);

  // Debug logging
  useEffect(() => {
    console.log('MathGame - Lesson:', lesson?.title, 'Lesson Number:', lesson?.lessonNumber, 'Math Lesson Number:', stableMathLessonNumber, 'Config Type:', config?.type);
  }, [lesson?.title, lesson?.lessonNumber, stableMathLessonNumber, config?.type]);

  // Track gameState changes
  useEffect(() => {
    console.log('GameState changed to:', gameState);
  }, [gameState]);

  // Generate validation when component mounts - only once per lesson
  // Use ref to prevent re-initialization if user is working on the problem
  useEffect(() => {
    // Only initialize if we haven't already initialized for this lesson
    if (initializedLessonIdRef.current !== lesson?.id &&
      gameState === 'validation' &&
      config &&
      config.type) {
      console.log('Component mounted, generating initial validation for lesson:', lesson?.id);
      try {
        // Set initialized flag BEFORE calling generateValidation to prevent multiple calls
        setIsInitialized(true);
        initializedLessonIdRef.current = lesson?.id; // Mark this lesson as initialized
        // Call generateValidation directly
        generateValidation();
      } catch (error) {
        console.error('Error generating validation on mount:', error);
        setIsInitialized(false);
        initializedLessonIdRef.current = null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?.id, gameState, stableMathLessonNumber, config?.type]);

  const handleNumberClick = async (number) => {
    if (isTtsDisabled) return;

    try {
      // Stop any current speech first
      stop();
      // Clear any pending speak timeout
      if (speakTimeoutRef.current) {
        clearTimeout(speakTimeoutRef.current);
        speakTimeoutRef.current = null;
      }
      // Small delay to ensure stop completes
      await new Promise(resolve => setTimeout(resolve, 100));

      // Check if component is still mounted before speaking
      if (!isMountedRef.current) return;

      const numberName = NUMBER_NAMES[number] || number.toString();
      console.log('Speaking number:', numberName, 'for number:', number);
      await speak(numberName, { volume: 1.0, rate: 0.6, pitch: 1.2 });
    } catch (error) {
      console.error('Error speaking number:', error);
      // Fallback: try without await
      if (!isMountedRef.current) return;
      const numberName = NUMBER_NAMES[number] || number.toString();
      speak(numberName, { volume: 1.0, rate: 0.6, pitch: 1.2 }).catch(err => {
        console.error('Error in fallback speak:', err);
      });
    }
  };

  const handleContinue = () => {
    console.log('=== handleContinue START ===');
    console.log('Current gameState:', gameState);
    console.log('Config:', config);

    // Generate validation question
    generateValidation();

    // Change to validation state
    console.log('Setting gameState to validation');
    setGameState('validation');
    setValidationAttempts(0);
    setActivityObjectCount(null);

    console.log('=== handleContinue END ===');
  };

  const generateValidation = () => {
    // Prevent multiple simultaneous calls
    if (isGeneratingValidationRef.current) {
      console.log('generateValidation already in progress, skipping...');
      return;
    }

    isGeneratingValidationRef.current = true;

    // Clear any pending speak timeout
    if (speakTimeoutRef.current) {
      clearTimeout(speakTimeoutRef.current);
      speakTimeoutRef.current = null;
    }

    // Stop any current speech immediately
    stop();

    // Generate a random question based on the lesson type
    let answer;
    let questionText = '';
    let options = [];

    if (config.type === 'recognize-1' || config.type === 'recognize-2' || config.type === 'recognize-3') {
      // Simple recognition: "Find the number X"
      answer = config.number;
      questionText = `Find the number ${NUMBER_NAMES[config.number]}!`;
      // Generate options: correct answer + nearby numbers, ensuring we have enough options
      const baseOptions = [answer];
      if (answer + 1 <= 5) baseOptions.push(answer + 1);
      if (answer - 1 > 0) baseOptions.push(answer - 1);
      if (answer + 2 <= 5) baseOptions.push(answer + 2);
      if (answer - 2 > 0 && baseOptions.length < 4) baseOptions.push(answer - 2);
      if (answer + 3 <= 5 && baseOptions.length < 4) baseOptions.push(answer + 3);
      options = baseOptions;
    } else if (config.type === 'count-1-3') {
      // Count objects: use the same count from activity phase
      answer = activityObjectCount || Math.floor(Math.random() * 3) + 1; // 1-3
      questionText = `How many objects do you see?`;
      options = [1, 2, 3].sort(() => Math.random() - 0.5);
      const objects = ['🍎', '🍌', '🍊'];
      setValidationObjects(objects.slice(0, answer));
    } else if (config.type === 'match-1' || config.type === 'match-2' || config.type === 'match-3') {
      // Match number to quantity: "How many objects?"
      answer = config.number;
      questionText = `How many objects do you see?`;
      options = [answer, answer + 1, answer - 1, answer + 2].filter(n => n > 0 && n <= 5);
      const objects = ['🍎', '🍌', '🍊'];
      setValidationObjects(objects.slice(0, answer));
    } else if (config.type === 'count-1-5') {
      // Count objects: use the same count from activity phase
      answer = activityObjectCount || Math.floor(Math.random() * 5) + 1; // 1-5
      questionText = `How many objects do you see?`;
      options = [1, 2, 3, 4, 5].sort(() => Math.random() - 0.5);
      const objects = ['🍎', '🍌', '🍊', '🍇', '🍓'];
      setValidationObjects(objects.slice(0, answer));
    } else if (config.type === 'order-1-3') {
      // Number order: "What comes after X?"
      const baseNumber = Math.floor(Math.random() * 2) + 1; // 1-2
      answer = baseNumber + 1;
      questionText = `What number comes after ${NUMBER_NAMES[baseNumber]}?`;
      options = [1, 2, 3].sort(() => Math.random() - 0.5);
    } else if (config.type === 'recognize-1-5') {
      // Recognize numbers 1-5: "Find the number X"
      answer = Math.floor(Math.random() * 5) + 1; // 1-5
      questionText = `Find the number ${NUMBER_NAMES[answer]}!`;
      options = [1, 2, 3, 4, 5].sort(() => Math.random() - 0.5);
    } else if (config.type === 'counting-to-10') {
      // Random question types for counting to 10
      const questionType = Math.floor(Math.random() * 3);

      if (questionType === 0) {
        // "What number comes after X?"
        const baseNumber = Math.floor(Math.random() * 9) + 1; // 1-9
        answer = baseNumber + 1;
        questionText = `What number comes after ${NUMBER_NAMES[baseNumber]}?`;
        options = [answer, baseNumber, baseNumber + 2, baseNumber - 1].filter(n => n > 0 && n <= 10);
      } else if (questionType === 1) {
        // "How many fingers on one hand?"
        answer = 5;
        questionText = 'How many fingers do you have on one hand?';
        options = [3, 4, 5, 6];
      } else {
        // "What is the biggest number?"
        answer = 10;
        questionText = 'What is the biggest number we learned?';
        options = [5, 8, 9, 10];
      }
    } else if (config.type === 'counting-to-20') {
      // Random question types for counting to 20
      const questionType = Math.floor(Math.random() * 5); 

      if (questionType === 0) {
        // "What number comes after X?"
        const baseNumber = Math.floor(Math.random() * 19) + 1; // 1-19
        answer = baseNumber + 1;
        questionText = `What number comes after ${NUMBER_NAMES[baseNumber]}?`;
        options = [answer, baseNumber, baseNumber + 2, baseNumber - 1].filter(n => n > 0 && n <= 20);
      } else if (questionType === 1) {
        // "What number comes before X?"
        const baseNumber = Math.floor(Math.random() * 19) + 2; // 2-20
        answer = baseNumber - 1;
        questionText = `What number comes before ${NUMBER_NAMES[baseNumber]}?`;
        options = [answer, baseNumber, baseNumber + 1, baseNumber - 2].filter(n => n > 0 && n <= 20);
      } else if (questionType === 2) {
        // "Which number is smaller?"
        const num1 = Math.floor(Math.random() * 10) + 1; // 1-10
        const num2 = Math.floor(Math.random() * 10) + 11; // 11-20
        answer = Math.min(num1, num2);
        questionText = `Which number is smaller: ${num1} or ${num2}?`;
        options = [num1, num2, num1 + 1, num2 - 1].filter(n => n > 0 && n <= 20);
      } else if (questionType === 3) {
        // "Which number is bigger?"
        const num1 = Math.floor(Math.random() * 10) + 1; // 1-10
        const num2 = Math.floor(Math.random() * 10) + 11; // 11-20
        answer = Math.max(num1, num2);
        questionText = `Which number is bigger: ${num1} or ${num2}?`;
        options = [num1, num2, num1 + 1, num2 - 1].filter(n => n > 0 && n <= 20);
      } else {
        // "Count the objects"
        answer = Math.floor(Math.random() * 10) + 11; // 11-20
        questionText = `How many objects do you see?`;
        options = [answer, answer - 1, answer + 1, answer - 2].filter(n => n > 0 && n <= 20);
        const objects = ['🍎', '🍌', '🍊', '🍇', '🍓', '🥝', '🍍', '🍑', '🍒', '🍈', '🥥', '🥭', '🍉', '🍐', '🍏', '🍋', '🫐', '🫒', '🫑', '🥑'];
        setValidationObjects(objects.slice(0, answer));
      }
    } else if (config.type === 'recognize-1-10') {
      // Reception: Recognize numbers 1-10
      answer = Math.floor(Math.random() * 10) + 1; // 1-10
      questionText = `Find the number ${NUMBER_NAMES[answer]}!`;
      options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].sort(() => Math.random() - 0.5).slice(0, 4);
      if (!options.includes(answer)) {
        options[0] = answer;
      }
    } else if (config.type === 'counting-to-10-advanced') {
      // Year 1: Advanced counting to 10
      const questionType = Math.floor(Math.random() * 3);
      if (questionType === 0) {
        const baseNumber = Math.floor(Math.random() * 9) + 1;
        answer = baseNumber + 1;
        questionText = `What number comes after ${NUMBER_NAMES[baseNumber]}?`;
        options = [answer, baseNumber, baseNumber + 2, baseNumber - 1].filter(n => n > 0 && n <= 10);
      } else if (questionType === 1) {
        answer = 10;
        questionText = 'How many fingers do you have on both hands?';
        options = [8, 9, 10, 12];
      } else {
        const num1 = Math.floor(Math.random() * 5) + 1;
        const num2 = Math.floor(Math.random() * 5) + 1;
        answer = Math.min(num1, num2);
        questionText = `Which number is smaller: ${num1} or ${num2}?`;
        options = [num1, num2, num1 + num2, Math.max(num1, num2) + 1].filter(n => n <= 10);
      }
    } else if (config.type === 'addition') {
      // Year 1: Adding numbers
      const num1 = Math.floor(Math.random() * 10) + 1; // 1-10
      const num2 = Math.floor(Math.random() * 10) + 1; // 1-10
      answer = num1 + num2;
      questionText = `What is ${num1} + ${num2}?`;
      const wrong1 = answer + 1;
      const wrong2 = answer - 1;
      const wrong3 = num1 + num2 + 2;
      options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0 && n <= 20).sort(() => Math.random() - 0.5);
      while (options.length < 4) {
        const random = Math.floor(Math.random() * 20) + 1;
        if (!options.includes(random)) options.push(random);
      }
      options = options.slice(0, 4);
    } else if (config.type === 'counting-to-20-advanced') {
      // Year 2: Advanced counting to 20
      const questionType = Math.floor(Math.random() * 4);
      if (questionType === 0) {
        // "What is X + Y?"
        const num1 = Math.floor(Math.random() * 10) + 1; // 1-10
        const num2 = Math.floor(Math.random() * (20 - num1)) + 1; // ensures sum is <= 20
        answer = num1 + num2;
        questionText = `What is ${num1} + ${num2}?`;
        options = [answer, answer + 1, answer - 1, answer + 2].filter(n => n > 0 && n <= 20);
      } else if (questionType === 1) {
        // "What is X - Y?"
        const num1 = Math.floor(Math.random() * 10) + 11; // 11-20
        const num2 = Math.floor(Math.random() * (num1-1)) + 1;
        answer = num1 - num2;
        questionText = `What is ${num1} - ${num2}?`;
        options = [answer, answer + 1, answer - 1, answer + 2].filter(n => n > 0 && n <= 20);
      } else if (questionType === 2) {
        // "What number is missing?"
        const start = Math.floor(Math.random() * 17) + 1; // 1-17
        answer = start + 1;
        questionText = `What number is missing? ${start}, __, ${start + 2}`;
        options = [answer, start, start + 2, start + 3].filter(n => n > 0 && n <= 20);
      } else {
        const num = Math.floor(Math.random() * 15) + 6; // 6-20
        answer = num;
        questionText = `What number is ${NUMBER_NAMES[num]}?`;
        options = [num - 2, num - 1, num, num + 1].filter(n => n > 0 && n <= 20);
      }
    } else if (config.type === 'multiplication') {
      // Year 3: Multiplication tables
      const table = config.tables[Math.floor(Math.random() * config.tables.length)];
      const multiplier = Math.floor(Math.random() * 10) + 1; // 1-10
      answer = table * multiplier;
      questionText = `What is ${table} × ${multiplier}?`;
      const wrong1 = answer + table;
      const wrong2 = answer - table;
      const wrong3 = table * (multiplier + 1);
      options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0 && n <= config.maxProduct).sort(() => Math.random() - 0.5);
      while (options.length < 4) {
        const random = Math.floor(Math.random() * config.maxProduct) + 1;
        if (!options.includes(random)) options.push(random);
      }
      options = options.slice(0, 4);
    } else if (config.type === 'division') {
      // Year 3: Division basics
      const divisor = config.divisors[Math.floor(Math.random() * config.divisors.length)];
      const quotient = Math.floor(Math.random() * (config.maxDividend / divisor)) + 1;
      const dividend = divisor * quotient;
      answer = quotient;
      questionText = `What is ${dividend} ÷ ${divisor}?`;
      const wrong1 = quotient + 1;
      const wrong2 = quotient - 1;
      const wrong3 = divisor;
      options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0).sort(() => Math.random() - 0.5);
      while (options.length < 4) {
        const random = Math.floor(Math.random() * 10) + 1;
        if (!options.includes(random)) options.push(random);
      }
      options = options.slice(0, 4);
    } else if (config.type === 'fractions-basic') {
      // Year 3: Fractions introduction
      const fractions = config.fractions;
      const fraction = fractions[Math.floor(Math.random() * fractions.length)];
      const [num, den] = fraction.split('/').map(Number);
      answer = fraction;
      questionText = `Which fraction shows ${num} out of ${den} equal parts?`;
      const otherFractions = fractions.filter(f => f !== fraction);
      options = [fraction, ...otherFractions.slice(0, 3)].sort(() => Math.random() - 0.5);
      while (options.length < 4) {
        const randomFrac = `${Math.floor(Math.random() * 3) + 1}/${Math.floor(Math.random() * 4) + 2}`;
        if (!options.includes(randomFrac)) options.push(randomFrac);
      }
      options = options.slice(0, 4);
    } else if (config.type === 'long-multiplication') {
      // Year 4: Long multiplication
      const num1 = Math.floor(Math.random() * (config.maxFactor1 / 10)) + 10; // 10-99
      const num2 = Math.floor(Math.random() * config.maxFactor2) + 1; // 1-9
      answer = num1 * num2;
      questionText = `What is ${num1} × ${num2}?`;
      const wrong1 = answer + num2;
      const wrong2 = answer - num2;
      const wrong3 = (num1 + 10) * num2;
      options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0).sort(() => Math.random() - 0.5);
      while (options.length < 4) {
        const random = Math.floor(Math.random() * 900) + 10;
        if (!options.includes(random)) options.push(random);
      }
      options = options.slice(0, 4);
    } else if (config.type === 'large-multiplication') {
      // Larger multiplication with 3-4 digit numbers
      const pickFactor = () => {
        const isFourDigit = Math.random() < 0.5;
        const min = isFourDigit ? 1000 : 100;
        const max = isFourDigit ? 9999 : 999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      const num1 = pickFactor();
      const num2 = pickFactor();
      answer = num1 * num2;
      questionText = `What is ${num1} Į- ${num2}?`;
      const optionsSet = new Set([answer]);
      const jitter = () => Math.floor(Math.random() * 9000) + 100;
      while (optionsSet.size < 4) {
        const candidate = answer + (Math.random() < 0.5 ? -1 : 1) * jitter();
        if (candidate > 0) optionsSet.add(candidate);
      }
      options = Array.from(optionsSet).sort(() => Math.random() - 0.5);
    } else if (config.type === 'large-division') {
      // Larger division with 3-4 digit dividends
      const divisor = Math.floor(Math.random() * 90) + 10; // 10-99
      const quotient = Math.floor(Math.random() * 90) + 10; // 10-99
      const dividend = divisor * quotient; // 100-9801
      answer = quotient;
      questionText = `What is ${dividend} Įْ ${divisor}?`;
      const optionsSet = new Set([answer, answer + 1, answer - 1]);
      while (optionsSet.size < 4) {
        const candidate = Math.floor(Math.random() * 90) + 10;
        if (candidate > 0) optionsSet.add(candidate);
      }
      options = Array.from(optionsSet).filter(n => n > 0).sort(() => Math.random() - 0.5);
    } else if (config.type === 'fractions-decimals') {
      // Year 4: Fractions and decimals
      const questionType = Math.floor(Math.random() * 2);
      if (questionType === 0) {
        // Convert fraction to decimal
        const fraction = config.fractions[Math.floor(Math.random() * config.fractions.length)];
        const [num, den] = fraction.split('/').map(Number);
        const decimal = num / den;
        answer = decimal; // Answer is a number (decimal)
        questionText = `What is ${fraction} as a decimal?`;
        const wrong1 = Math.round((decimal + 0.1) * 100) / 100;
        const wrong2 = Math.round((decimal - 0.1) * 100) / 100;
        const wrong3 = Math.round((decimal * 2) * 100) / 100;
        options = [decimal, wrong1, wrong2, wrong3].filter(n => n > 0 && n <= 1).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.round(Math.random() * 100) / 100;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      } else {
        // Convert decimal to fraction
        const decimal = config.decimals[Math.floor(Math.random() * config.decimals.length)];
        const fraction = decimal === 0.5 ? '1/2' : decimal === 0.25 ? '1/4' : decimal === 0.75 ? '3/4' : '1/10';
        answer = fraction; // Answer is a string (fraction)
        questionText = `What is ${decimal} as a fraction?`;
        const otherFractions = ['1/3', '2/3', '1/5', '2/5', '3/5'].filter(f => f !== fraction);
        options = [fraction, ...otherFractions.slice(0, 3)].sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const num = Math.floor(Math.random() * 3) + 1;
          const den = Math.floor(Math.random() * 4) + 2;
          const randomFrac = `${num}/${den}`;
          if (!options.includes(randomFrac)) options.push(randomFrac);
        }
        options = options.slice(0, 4);
      }
    } else if (config.type === 'fractions-decimals-percentages') {
      // Year 6: Converting Fractions/Decimals/Percentages
      const questionType = Math.floor(Math.random() * 6);

      if (questionType === 0) {
        // Convert fraction to decimal
        const fraction = config.fractions[Math.floor(Math.random() * config.fractions.length)];
        const [num, den] = fraction.split('/').map(Number);
        const decimal = num / den;
        answer = decimal;
        questionText = `What is ${fraction} as a decimal?`;
        const wrong1 = Math.round((decimal + 0.1) * 100) / 100;
        const wrong2 = Math.round((decimal - 0.1) * 100) / 100;
        const wrong3 = Math.round((decimal * 2) * 100) / 100;
        options = [decimal, wrong1, wrong2, wrong3].filter(n => n > 0 && n <= 1).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.round(Math.random() * 100) / 100;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      } else if (questionType === 1) {
        // Convert fraction to percentage
        const fraction = config.fractions[Math.floor(Math.random() * config.fractions.length)];
        const [num, den] = fraction.split('/').map(Number);
        const percentage = (num / den) * 100;
        answer = percentage;
        questionText = `What is ${fraction} as a percentage?`;
        const wrong1 = percentage + 10;
        const wrong2 = percentage - 10;
        const wrong3 = percentage + 25;
        options = [percentage, wrong1, wrong2, wrong3].filter(n => n >= 0 && n <= 100).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 100) + 1;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      } else if (questionType === 2) {
        // Convert decimal to fraction
        const decimal = config.decimals[Math.floor(Math.random() * config.decimals.length)];
        let fraction;
        if (decimal === 0.5) fraction = '1/2';
        else if (decimal === 0.25) fraction = '1/4';
        else if (decimal === 0.75) fraction = '3/4';
        else if (decimal === 0.2) fraction = '1/5';
        else if (decimal === 0.4) fraction = '2/5';
        else fraction = '1/10';
        answer = fraction;
        questionText = `What is ${decimal} as a fraction?`;
        const otherFractions = config.fractions.filter(f => f !== fraction);
        options = [fraction, ...otherFractions.slice(0, 3)].sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const num = Math.floor(Math.random() * 3) + 1;
          const den = Math.floor(Math.random() * 4) + 2;
          const randomFrac = `${num}/${den}`;
          if (!options.includes(randomFrac)) options.push(randomFrac);
        }
        options = options.slice(0, 4);
      } else if (questionType === 3) {
        // Convert decimal to percentage
        const decimal = config.decimals[Math.floor(Math.random() * config.decimals.length)];
        const percentage = decimal * 100;
        answer = percentage;
        questionText = `What is ${decimal} as a percentage?`;
        const wrong1 = percentage + 10;
        const wrong2 = percentage - 10;
        const wrong3 = percentage + 5;
        options = [percentage, wrong1, wrong2, wrong3].filter(n => n >= 0 && n <= 100).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 100) + 1;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      } else if (questionType === 4) {
        // Convert percentage to fraction
        const percentage = config.percentages[Math.floor(Math.random() * config.percentages.length)];
        let fraction;
        if (percentage === 50) fraction = '1/2';
        else if (percentage === 25) fraction = '1/4';
        else if (percentage === 75) fraction = '3/4';
        else if (percentage === 20) fraction = '1/5';
        else if (percentage === 40) fraction = '2/5';
        else fraction = '1/10';
        answer = fraction;
        questionText = `What is ${percentage}% as a fraction?`;
        const otherFractions = config.fractions.filter(f => f !== fraction);
        options = [fraction, ...otherFractions.slice(0, 3)].sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const num = Math.floor(Math.random() * 3) + 1;
          const den = Math.floor(Math.random() * 4) + 2;
          const randomFrac = `${num}/${den}`;
          if (!options.includes(randomFrac)) options.push(randomFrac);
        }
        options = options.slice(0, 4);
      } else {
        // Convert percentage to decimal
        const percentage = config.percentages[Math.floor(Math.random() * config.percentages.length)];
        const decimal = percentage / 100;
        answer = decimal;
        questionText = `What is ${percentage}% as a decimal?`;
        const wrong1 = Math.round((decimal + 0.1) * 100) / 100;
        const wrong2 = Math.round((decimal - 0.1) * 100) / 100;
        const wrong3 = Math.round((decimal * 2) * 100) / 100;
        options = [decimal, wrong1, wrong2, wrong3].filter(n => n > 0 && n <= 1).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.round(Math.random() * 100) / 100;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      }
    } else if (config.type === 'length-measurement') {
      // Year 2: Length Measurement (cm and m only)
      const lengthQuestions = [
        { value: 100, unit: 'cm', question: 'How many centimeters in 1 meter?', answer: 100, options: [50, 100, 150, 200] },
        { value: 1, unit: 'm', question: 'How many meters in 100 centimeters?', answer: 1, options: [0.5, 1, 2, 10] },
        { value: 200, unit: 'cm', question: 'How many centimeters in 2 meters?', answer: 200, options: [100, 200, 300, 400] },
        { value: 2, unit: 'm', question: 'How many meters in 200 centimeters?', answer: 2, options: [1, 2, 3, 4] },
        { value: 50, unit: 'cm', question: 'A pencil is about 15 cm. How many centimeters longer is a 50 cm ruler?', answer: 35, options: [25, 35, 45, 55] },
      ];
      const question = lengthQuestions[Math.floor(Math.random() * lengthQuestions.length)];
      answer = question.answer;
      questionText = question.question;
      options = question.options.sort(() => Math.random() - 0.5);
    } else if (config.type === 'measurement') {
      // Year 4: Measurement and units (includes mass and capacity)
      const measurements = [
        { value: 100, unit: 'cm', question: 'How many centimeters in 1 meter?', answer: 100, options: [50, 100, 150, 200] },
        { value: 1000, unit: 'g', question: 'How many grams in 1 kilogram?', answer: 1000, options: [500, 1000, 1500, 2000] },
        { value: 1000, unit: 'mL', question: 'How many milliliters in 1 liter?', answer: 1000, options: [500, 1000, 1500, 2000] },
      ];
      const measurement = measurements[Math.floor(Math.random() * measurements.length)];
      answer = measurement.answer;
      questionText = measurement.question;
      options = measurement.options.sort(() => Math.random() - 0.5);
    } else if (config.type === 'algebra-basic') {
      // Year 6: Algebra introduction
      const questionType = Math.floor(Math.random() * 2);
      if (questionType === 0) {
        const num = Math.floor(Math.random() * 10) + 1;
        const addend = Math.floor(Math.random() * 10) + 1;
        answer = num;
        questionText = `If x + ${addend} = ${num + addend}, what is x?`;
        options = [num, num + 1, num - 1, addend].filter(n => n > 0 && n <= config.maxValue).sort(() => Math.random() - 0.5);
      } else {
        const num = Math.floor(Math.random() * 10) + 5;
        const subtrahend = Math.floor(Math.random() * 5) + 1;
        answer = num;
        questionText = `If y - ${subtrahend} = ${num - subtrahend}, what is y?`;
        options = [num, num + 1, num - 1, subtrahend].filter(n => n > 0 && n <= config.maxValue).sort(() => Math.random() - 0.5);
      }
      while (options.length < 4) {
        const random = Math.floor(Math.random() * config.maxValue) + 1;
        if (!options.includes(random)) options.push(random);
      }
      options = options.slice(0, 4);
    } else if (config.type === 'statistics') {
      // Year 6: Statistics and data
      const data = [5, 7, 8, 6, 9, 7, 8, 6];
      const questionType = Math.floor(Math.random() * 2);
      if (questionType === 0) {
        // Mean
        const sum = data.reduce((a, b) => a + b, 0);
        answer = Math.round(sum / data.length);
        questionText = `What is the average (mean) of: ${data.join(', ')}?`;
        options = [answer, answer + 1, answer - 1, answer + 2].filter(n => n > 0).sort(() => Math.random() - 0.5);
      } else {
        // Mode
        answer = 7; // Most common
        questionText = `What is the mode (most common number) of: ${data.join(', ')}?`;
        options = [6, 7, 8, 9].sort(() => Math.random() - 0.5);
      }
      while (options.length < 4) {
        const random = Math.floor(Math.random() * 10) + 1;
        if (!options.includes(random)) options.push(random);
      }
      options = options.slice(0, 4);
    } else if (config.type === 'problem-solving') {
      // Year 6: Advanced problem solving
      const problems = [
        { question: 'Sarah has 24 stickers. She gives away 8. Then she gets 12 more. How many does she have now?', answer: 28, options: [20, 24, 28, 32] },
        { question: 'A box has 6 rows of 4 apples each. How many apples are in the box?', answer: 24, options: [20, 24, 28, 30] },
        { question: 'Tom saves £5 each week for 8 weeks. How much has he saved?', answer: 40, options: [35, 40, 45, 50] },
      ];
      const problem = problems[Math.floor(Math.random() * problems.length)];
      answer = problem.answer;
      questionText = problem.question;
      options = problem.options.sort(() => Math.random() - 0.5);
    } else if (config.type === 'percentages') {
      // Year 5: Percentages
      const questionType = Math.floor(Math.random() * 3);

      if (questionType === 0) {
        // Convert fraction to percentage
        const fraction = config.fractions[Math.floor(Math.random() * config.fractions.length)];
        const [num, den] = fraction.split('/').map(Number);
        const percentage = (num / den) * 100;
        answer = percentage;
        questionText = `What is ${fraction} as a percentage?`;
        const wrong1 = percentage + 10;
        const wrong2 = percentage - 10;
        const wrong3 = percentage + 25;
        options = [percentage, wrong1, wrong2, wrong3].filter(n => n >= 0 && n <= 100).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 100) + 1;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      } else if (questionType === 1) {
        // Convert percentage to fraction
        const percentage = config.percentages[Math.floor(Math.random() * config.percentages.length)];
        const fraction = percentage === 25 ? '1/4' : percentage === 50 ? '1/2' : percentage === 75 ? '3/4' : '1';
        answer = fraction;
        questionText = `What is ${percentage}% as a fraction?`;
        const otherFractions = config.fractions.filter(f => f !== fraction);
        options = [fraction, ...otherFractions.slice(0, 3)].sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const num = Math.floor(Math.random() * 3) + 1;
          const den = Math.floor(Math.random() * 4) + 2;
          const randomFrac = `${num}/${den}`;
          if (!options.includes(randomFrac)) options.push(randomFrac);
        }
        options = options.slice(0, 4);
      } else {
        // Identify percentage from visual
        const percentage = config.percentages[Math.floor(Math.random() * config.percentages.length)];
        answer = percentage;
        questionText = `What percentage is shown?`;
        const wrong1 = percentage === 25 ? 30 : percentage === 50 ? 40 : percentage === 75 ? 80 : 90;
        const wrong2 = percentage === 25 ? 20 : percentage === 50 ? 60 : percentage === 75 ? 70 : 95;
        const wrong3 = percentage === 25 ? 15 : percentage === 50 ? 45 : percentage === 75 ? 65 : 85;
        options = [percentage, wrong1, wrong2, wrong3].filter(n => n >= 0 && n <= 100).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 100) + 1;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      }
    } else if (config.type === 'symmetry') {
      // Year 5: Symmetry
      const shapes = {
        square: { lines: 4, name: 'square' },
        rectangle: { lines: 2, name: 'rectangle' },
        circle: { lines: 'many', name: 'circle' },
        triangle: { lines: 3, name: 'triangle' },
        pentagon: { lines: 5, name: 'pentagon' },
        hexagon: { lines: 6, name: 'hexagon' },
      };

      const questionType = Math.floor(Math.random() * 2);

      if (questionType === 0) {
        // "How many lines of symmetry does a [shape] have?"
        const shapeKeys = Object.keys(shapes);
        const shapeKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
        const shape = shapes[shapeKey];
        answer = shape.lines;
        questionText = `How many lines of symmetry does a ${shape.name} have?`;

        if (shape.lines === 'many') {
          // For circle, use "many" as answer
          answer = 'many';
          options = ['many', 4, 6, 8].sort(() => Math.random() - 0.5);
        } else {
          const wrong1 = shape.lines + 1;
          const wrong2 = shape.lines - 1;
          const wrong3 = shape.lines + 2;
          options = [shape.lines, wrong1, wrong2, wrong3].filter(n => n > 0 && n <= 10).sort(() => Math.random() - 0.5);
          while (options.length < 4) {
            const random = Math.floor(Math.random() * 10) + 1;
            if (!options.includes(random)) options.push(random);
          }
          options = options.slice(0, 4);
        }
      } else {
        // "Which shape has [X] lines of symmetry?"
        const shapeKeys = Object.keys(shapes).filter(key => shapes[key].lines !== 'many');
        const shapeKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
        const shape = shapes[shapeKey];
        answer = shape.name;
        questionText = `Which shape has ${shape.lines} lines of symmetry?`;
        const otherShapes = shapeKeys.filter(key => key !== shapeKey);
        options = [shape.name, ...otherShapes.slice(0, 3).map(key => shapes[key].name)].sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const randomShape = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
          const randomName = shapes[randomShape].name;
          if (!options.includes(randomName)) options.push(randomName);
        }
        options = options.slice(0, 4);
      }
    } else if (config.type === 'volume') {
      // Year 5: Volume
      const questionType = Math.floor(Math.random() * 2);

      if (questionType === 0) {
        // Calculate volume of a rectangular prism
        const length = Math.floor(Math.random() * 5) + 2; // 2-6
        const width = Math.floor(Math.random() * 5) + 2; // 2-6
        const height = Math.floor(Math.random() * 5) + 2; // 2-6
        answer = length * width * height;
        questionText = `What is the volume of a box that is ${length} × ${width} × ${height}?`;
        const wrong1 = answer + (length * width);
        const wrong2 = answer - (length * width);
        const wrong3 = length + width + height;
        options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 200) + 1;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      } else {
        // Calculate volume of a cube
        const side = Math.floor(Math.random() * 5) + 2; // 2-6
        answer = side * side * side;
        questionText = `What is the volume of a cube with sides of ${side}?`;
        const wrong1 = answer + (side * side);
        const wrong2 = answer - (side * side);
        const wrong3 = side * side;
        options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 200) + 1;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      }
    } else if (config.type === 'mean-median-mode') {
      // Year 5: Mean, Median, Mode
      const questionType = Math.floor(Math.random() * 3);

      if (questionType === 0) {
        // Mean (Average)
        const dataSet = [];
        const count = Math.floor(Math.random() * 4) + 3; // 3-6 numbers
        for (let i = 0; i < count; i++) {
          dataSet.push(Math.floor(Math.random() * 20) + 1); // 1-20
        }
        const sum = dataSet.reduce((a, b) => a + b, 0);
        answer = Math.round(sum / count);
        questionText = `What is the mean of: ${dataSet.join(', ')}?`;
        const wrong1 = answer + 2;
        const wrong2 = answer - 2;
        const wrong3 = sum;
        options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 30) + 1;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      } else if (questionType === 1) {
        // Median
        const dataSet = [];
        const count = Math.floor(Math.random() * 2) + 5; // 5-6 numbers (odd for easier median)
        for (let i = 0; i < count; i++) {
          dataSet.push(Math.floor(Math.random() * 20) + 1);
        }
        const sorted = [...dataSet].sort((a, b) => a - b);
        const midIndex = Math.floor(sorted.length / 2);
        answer = sorted[midIndex];
        questionText = `What is the median of: ${dataSet.join(', ')}?`;
        const wrong1 = sorted[midIndex - 1] || answer + 1;
        const wrong2 = sorted[midIndex + 1] || answer - 1;
        const wrong3 = sorted[0];
        options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 20) + 1;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      } else {
        // Mode
        const dataSet = [];
        // Create a set with one number appearing more often
        const modeValue = Math.floor(Math.random() * 10) + 1;
        dataSet.push(modeValue, modeValue, modeValue); // Mode appears 3 times
        // Add 2-3 other unique numbers
        for (let i = 0; i < 3; i++) {
          let num = Math.floor(Math.random() * 10) + 1;
          while (num === modeValue) {
            num = Math.floor(Math.random() * 10) + 1;
          }
          dataSet.push(num);
        }
        // Shuffle the array
        const shuffled = dataSet.sort(() => Math.random() - 0.5);
        answer = modeValue;
        questionText = `What is the mode of: ${shuffled.join(', ')}?`;
        const wrong1 = shuffled.find(n => n !== modeValue) || answer + 1;
        const wrong2 = shuffled.find(n => n !== modeValue && n !== wrong1) || answer - 1;
        const wrong3 = shuffled[0] === modeValue ? shuffled[1] : shuffled[0];
        options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 10) + 1;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      }
    } else if (config.type === 'ratio-proportion') {
      // Year 6: Ratio and Proportion
      const questionType = Math.floor(Math.random() * 3);

      if (questionType === 0) {
        // Simplifying ratios: "What is 4:6 in simplest form?"
        const ratios = [
          { original: [4, 6], simplified: [2, 3], answer: '2:3' },
          { original: [8, 12], simplified: [2, 3], answer: '2:3' },
          { original: [6, 9], simplified: [2, 3], answer: '2:3' },
          { original: [10, 15], simplified: [2, 3], answer: '2:3' },
          { original: [3, 6], simplified: [1, 2], answer: '1:2' },
          { original: [5, 10], simplified: [1, 2], answer: '1:2' },
          { original: [6, 8], simplified: [3, 4], answer: '3:4' },
          { original: [9, 12], simplified: [3, 4], answer: '3:4' },
        ];
        const ratio = ratios[Math.floor(Math.random() * ratios.length)];
        answer = ratio.answer;
        questionText = `What is ${ratio.original[0]}:${ratio.original[1]} in simplest form?`;
        const wrong1 = `${ratio.original[0]}:${ratio.original[1]}`;
        const wrong2 = `${ratio.simplified[0] + 1}:${ratio.simplified[1]}`;
        const wrong3 = `${ratio.simplified[0]}:${ratio.simplified[1] + 1}`;
        options = [ratio.answer, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
      } else if (questionType === 1) {
        // Proportion: "If 2:3 = 4:?, then ? = ?"
        const proportions = [
          { a: 2, b: 3, c: 4, answer: 6 },
          { a: 3, b: 4, c: 6, answer: 8 },
          { a: 2, b: 5, c: 4, answer: 10 },
          { a: 1, b: 3, c: 2, answer: 6 },
          { a: 3, b: 5, c: 6, answer: 10 },
          { a: 2, b: 4, c: 5, answer: 10 },
        ];
        const prop = proportions[Math.floor(Math.random() * proportions.length)];
        answer = prop.answer;
        questionText = `If ${prop.a}:${prop.b} = ${prop.c}:?, then ? = ?`;
        const wrong1 = prop.answer + 2;
        const wrong2 = prop.answer - 2;
        const wrong3 = prop.c * prop.b;
        options = [prop.answer, wrong1, wrong2, wrong3].filter(n => n > 0).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 20) + 1;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      } else {
        // Finding ratio from quantities: "If there are 4 apples and 6 oranges, what is the ratio?"
        const quantities = [
          { a: 4, b: 6, answer: '2:3' },
          { a: 6, b: 9, answer: '2:3' },
          { a: 3, b: 6, answer: '1:2' },
          { a: 5, b: 10, answer: '1:2' },
          { a: 6, b: 8, answer: '3:4' },
          { a: 9, b: 12, answer: '3:4' },
        ];
        const qty = quantities[Math.floor(Math.random() * quantities.length)];
        answer = qty.answer;
        questionText = `If there are ${qty.a} apples and ${qty.b} oranges, what is the ratio in simplest form?`;
        const wrong1 = `${qty.a}:${qty.b}`;
        const [num, den] = qty.answer.split(':').map(Number);
        const wrong2 = `${num + 1}:${den}`;
        const wrong3 = `${num}:${den + 1}`;
        options = [qty.answer, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
      }
    } else if (config.type === 'place-value-100') {
      // Year 2: Place Value to 100
      const num = Math.floor(Math.random() * 99) + 1;
      const questionType = Math.floor(Math.random() * 2);
      if (questionType === 0) {
        // "What is the tens digit in 45?" or "What is the ones digit in 45?"
        const tens = Math.floor(num / 10);
        const ones = num % 10;
        const askTens = Math.random() < 0.5;
        answer = askTens ? tens : ones;
        questionText = `What is the ${askTens ? 'tens' : 'ones'} digit in ${num}?`;
        const wrong1 = askTens ? ones : tens;
        const wrong2 = askTens ? (tens + 1) % 10 : (ones + 1) % 10;
        const wrong3 = askTens ? (tens - 1 + 10) % 10 : (ones - 1 + 10) % 10;
        options = [answer, wrong1, wrong2, wrong3].filter(n => n >= 0 && n <= 9).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 10);
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      } else {
        // "What number has 4 tens and 5 ones?" = 45
        const tens = Math.floor(num / 10);
        const ones = num % 10;
        answer = num;
        questionText = `What number has ${tens} tens and ${ones} ones?`;
        const wrong1 = num + 10;
        const wrong2 = num - 10;
        const wrong3 = (tens * 10) + ((ones + 1) % 10);
        options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0 && n <= 99).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 99) + 1;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      }
    } else if (config.type === 'addition-to-20') {
      // Year 2: Addition to 20
      const num1 = Math.floor(Math.random() * 15) + 1;
      const num2 = Math.floor(Math.random() * (20 - num1)) + 1;
      answer = num1 + num2;
      questionText = `${num1} + ${num2} = ?`;
      const wrong1 = answer + 1;
      const wrong2 = answer - 1;
      const wrong3 = num1 + num2 + 2;
      options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0 && n <= 20).sort(() => Math.random() - 0.5);
      while (options.length < 4) {
        const random = Math.floor(Math.random() * 20) + 1;
        if (!options.includes(random)) options.push(random);
      }
      options = options.slice(0, 4);
    } else if (config.type === 'subtraction-to-20') {
      // Year 2: Subtraction to 20
      const num1 = Math.floor(Math.random() * 15) + 5;
      const num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
      answer = num1 - num2;
      questionText = `${num1} - ${num2} = ?`;
      const wrong1 = answer + 1;
      const wrong2 = answer - 1;
      const wrong3 = num1 - num2 - 2;
      options = [answer, wrong1, wrong2, wrong3].filter(n => n >= 0 && n <= 20).sort(() => Math.random() - 0.5);
      while (options.length < 4) {
        const random = Math.floor(Math.random() * 20);
        if (!options.includes(random)) options.push(random);
      }
      options = options.slice(0, 4);
    } else if (config.type === 'place-value-1000') {
      // Year 3: Place Value to 1000
      const num = Math.floor(Math.random() * 999) + 1;
      const questionType = Math.floor(Math.random() * 2);
      if (questionType === 0) {
        // "What is the hundreds digit in 456?"
        const hundreds = Math.floor(num / 100);
        const tens = Math.floor((num % 100) / 10);
        const ones = num % 10;
        const digitTypes = ['hundreds', 'tens', 'ones'];
        const digitValues = [hundreds, tens, ones];
        const index = Math.floor(Math.random() * 3);
        answer = digitValues[index];
        questionText = `What is the ${digitTypes[index]} digit in ${num}?`;
        const wrongOptions = digitValues.filter((v, i) => i !== index);
        options = [answer, ...wrongOptions.slice(0, 3)].sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 10);
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      } else {
        // "What number has 4 hundreds, 5 tens, and 6 ones?" = 456
        const hundreds = Math.floor(num / 100);
        const tens = Math.floor((num % 100) / 10);
        const ones = num % 10;
        answer = num;
        questionText = `What number has ${hundreds} hundreds, ${tens} tens, and ${ones} ones?`;
        const wrong1 = num + 100;
        const wrong2 = num - 100;
        const wrong3 = (hundreds * 100) + (tens * 10) + ((ones + 1) % 10);
        options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0 && n <= 999).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 999) + 1;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      }
    } else if (config.type === 'perimeter') {
      // Year 3: Perimeter
      const shapeType = Math.floor(Math.random() * 2);
      if (shapeType === 0) {
        // Rectangle
        const length = Math.floor(Math.random() * config.maxSide) + 1;
        const width = Math.floor(Math.random() * config.maxSide) + 1;
        answer = 2 * (length + width);
        questionText = `What is the perimeter of a rectangle with length ${length} and width ${width}?`;
        const wrong1 = length + width;
        const wrong2 = length * width;
        const wrong3 = answer + 2;
        options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 50) + 1;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      } else {
        // Square
        const side = Math.floor(Math.random() * config.maxSide) + 1;
        answer = 4 * side;
        questionText = `What is the perimeter of a square with side length ${side}?`;
        const wrong1 = side * side;
        const wrong2 = 2 * side;
        const wrong3 = answer + 2;
        options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 50) + 1;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      }
    } else if (config.type === 'mass-capacity') {
      // Year 3: Mass and Capacity
      const questionType = Math.floor(Math.random() * 4);
      if (questionType === 0) {
        // "How many grams in 2 kg?" = 2000
        const kg = Math.floor(Math.random() * 5) + 1;
        answer = kg * 1000;
        questionText = `How many grams in ${kg} kg?`;
        const wrong1 = kg * 100;
        const wrong2 = kg * 10;
        const wrong3 = answer + 500;
        options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 10000) + 1;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      } else if (questionType === 1) {
        // "How many milliliters in 3 L?" = 3000
        const liters = Math.floor(Math.random() * 5) + 1;
        answer = liters * 1000;
        questionText = `How many milliliters in ${liters} L?`;
        const wrong1 = liters * 100;
        const wrong2 = liters * 10;
        const wrong3 = answer + 500;
        options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 10000) + 1;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      } else if (questionType === 2) {
        // "How many kg in 5000 g?" = 5
        const grams = (Math.floor(Math.random() * 5) + 1) * 1000;
        answer = grams / 1000;
        questionText = `How many kilograms in ${grams} g?`;
        const wrong1 = grams / 100;
        const wrong2 = grams / 10;
        const wrong3 = answer + 1;
        options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 10) + 1;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      } else {
        // "How many L in 2000 mL?" = 2
        const milliliters = (Math.floor(Math.random() * 5) + 1) * 1000;
        answer = milliliters / 1000;
        questionText = `How many liters in ${milliliters} mL?`;
        const wrong1 = milliliters / 100;
        const wrong2 = milliliters / 10;
        const wrong3 = answer + 1;
        options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 10) + 1;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      }
    } else if (config.type === 'place-value-10000') {
      // Year 4: Place Value to 10,000
      const num = Math.floor(Math.random() * 9999) + 1;
      const thousands = Math.floor(num / 1000);
      const hundreds = Math.floor((num % 1000) / 100);
      const tens = Math.floor((num % 100) / 10);
      const ones = num % 10;
      const digitTypes = ['thousands', 'hundreds', 'tens', 'ones'];
      const digitValues = [thousands, hundreds, tens, ones];
      const index = Math.floor(Math.random() * 4);
      answer = digitValues[index];
      questionText = `What is the ${digitTypes[index]} digit in ${num}?`;
      const wrongOptions = digitValues.filter((v, i) => i !== index);
      options = [answer, ...wrongOptions.slice(0, 3)].sort(() => Math.random() - 0.5);
      while (options.length < 4) {
        const random = Math.floor(Math.random() * 10);
        if (!options.includes(random)) options.push(random);
      }
      options = options.slice(0, 4);
    } else if (config.type === 'area-counting-squares') {
      // Year 4: Area by Counting Squares
      const rows = Math.floor(Math.random() * config.maxGrid) + 2;
      const cols = Math.floor(Math.random() * config.maxGrid) + 2;
      answer = rows * cols;
      questionText = `What is the area of a rectangle that is ${rows} squares tall and ${cols} squares wide?`;
      const wrong1 = rows + cols;
      const wrong2 = 2 * (rows + cols);
      const wrong3 = answer + 1;
      options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0).sort(() => Math.random() - 0.5);
      while (options.length < 4) {
        const random = Math.floor(Math.random() * 30) + 1;
        if (!options.includes(random)) options.push(random);
      }
      options = options.slice(0, 4);
    } else if (config.type === 'place-value-1000000') {
      // Year 5: Place Value to 1,000,000
      const num = Math.floor(Math.random() * 999999) + 1;
      const questionType = Math.floor(Math.random() * 2);
      if (questionType === 0) {
        // Ask about a specific place value digit
        const numStr = num.toString();
        const placeNames = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands'];
        const index = Math.floor(Math.random() * Math.min(6, numStr.length));
        answer = parseInt(numStr[numStr.length - 1 - index]);
        questionText = `What is the ${placeNames[index]} digit in ${num}?`;
        const wrong1 = (answer + 1) % 10;
        const wrong2 = (answer - 1 + 10) % 10;
        const wrong3 = Math.floor(Math.random() * 10);
        options = [answer, wrong1, wrong2, wrong3].filter(n => n >= 0 && n <= 9).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 10);
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      } else {
        // "What is 456,789 rounded to the nearest thousand?" = 457000
        const thousands = Math.floor(num / 1000);
        const remainder = num % 1000;
        answer = remainder >= 500 ? (thousands + 1) * 1000 : thousands * 1000;
        questionText = `What is ${num} rounded to the nearest thousand?`;
        const wrong1 = thousands * 1000;
        const wrong2 = (thousands + 1) * 1000;
        const wrong3 = num;
        options = [answer, wrong1, wrong2, wrong3].filter(n => n > 0).sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 1000000);
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      }
    } else if (config.type === 'negative-numbers') {
      // Year 6: Negative Numbers
      const questionType = Math.floor(Math.random() * 3);
      if (questionType === 0) {
        // Addition with negative: "What is -5 + 3?" = -2
        const neg = -(Math.floor(Math.random() * config.maxAbsValue) + 1);
        const pos = Math.floor(Math.random() * config.maxAbsValue) + 1;
        answer = neg + pos;
        questionText = `What is ${neg} + ${pos}?`;
        const wrong1 = Math.abs(neg) + pos;
        const wrong2 = neg - pos;
        const wrong3 = answer + 2;
        options = [answer, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 20) - 10;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      } else if (questionType === 1) {
        // Subtraction with negative: "What is 5 - 8?" = -3
        const pos = Math.floor(Math.random() * config.maxAbsValue) + 1;
        const larger = pos + Math.floor(Math.random() * config.maxAbsValue) + 1;
        answer = pos - larger;
        questionText = `What is ${pos} - ${larger}?`;
        const wrong1 = larger - pos;
        const wrong2 = pos + larger;
        const wrong3 = answer + 2;
        options = [answer, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 20) - 10;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      } else {
        // Temperature: "If it's 5°C and drops 8 degrees, what is the temperature?" = -3°C
        const start = Math.floor(Math.random() * 10) + 1;
        const drop = Math.floor(Math.random() * 10) + 5;
        answer = start - drop;
        questionText = `If it's ${start}°C and drops ${drop} degrees, what is the temperature?`;
        const wrong1 = start + drop;
        const wrong2 = drop - start;
        const wrong3 = answer + 2;
        options = [answer, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
        while (options.length < 4) {
          const random = Math.floor(Math.random() * 20) - 10;
          if (!options.includes(random)) options.push(random);
        }
        options = options.slice(0, 4);
      }
    } else if (config.type === 'counting-to-100') {
      const baseNumber = Math.floor(Math.random() * 99) + 1; // 1-99
      answer = baseNumber + 1;
      questionText = `What number comes after ${baseNumber}?`;
      options = [answer, baseNumber, answer + 1, answer - 1].filter(n => n > 0 && n <= 100);
    } else if (config.type === 'advanced-addition') {
      const num1 = Math.floor(Math.random() * 50) + 1;
      const num2 = Math.floor(Math.random() * 50) + 1;
      answer = num1 + num2;
      questionText = `What is ${num1} + ${num2}?`;
      options = [answer, answer + 1, answer - 1, answer + 10].filter(n => n > 0 && n <= 100);
    } else if (config.type === 'advanced-subtraction') {
      const num1 = Math.floor(Math.random() * 50) + 51;
      const num2 = Math.floor(Math.random() * 50) + 1;
      answer = num1 - num2;
      questionText = `What is ${num1} - ${num2}?`;
      options = [answer, answer + 1, answer - 1, answer + 10].filter(n => n > 0 && n <= 100);
    } else if (config.type === 'telling-time') {
      const hour = Math.floor(Math.random() * 12) + 1;
      const minute = Math.floor(Math.random() * 12) * 5;
      answer = `${hour}:${minute.toString().padStart(2, '0')}`;
      questionText = `What time is it?`;
      const wrong1 = `${(hour % 12) + 1}:${minute.toString().padStart(2, '0')}`;
      const wrong2 = `${hour}:${((minute + 5) % 60).toString().padStart(2, '0')}`;
      const wrong3 = `${(hour + 1) % 12}:${((minute + 10) % 60).toString().padStart(2, '0')}`;
      options = [answer, wrong1, wrong2, wrong3];
    } else if (config.type === 'money-math-counting-coins') {
      const coins = [1, 5, 10, 25];
      let numCoins = Math.floor(Math.random() * 5) + 3;
      let currentSum = 0;
      let coinObjects = [];
      for (let i = 0; i < numCoins; i++) {
        const coin = coins[Math.floor(Math.random() * coins.length)];
        currentSum += coin;
        coinObjects.push(coin);
      }
      answer = currentSum;
      questionText = `How much money is this?`;
      options = [answer, answer + 1, answer - 1, answer + 5].filter(n => n > 0);
    } else if (config.type === 'fractions-equivalents') {
      const den = Math.floor(Math.random() * 4) + 2; // 2-5
      const num = Math.floor(Math.random() * (den - 1)) + 1;
      const multiplier = Math.floor(Math.random() * 3) + 2; // 2-4
      const equivalentNum = num * multiplier;
      const equivalentDen = den * multiplier;
      answer = `${equivalentNum}/${equivalentDen}`;
      questionText = `Which fraction is equivalent to ${num}/${den}?`;
      options = [answer, `${num + 1}/${den}`, `${num}/${den + 1}`, `${equivalentNum + 1}/${equivalentDen}`];
    } else if (config.type === 'geometry-3d-shapes') {
      const shapes = ['cube', 'sphere', 'cone', 'cylinder', 'pyramid'];
      answer = shapes[Math.floor(Math.random() * shapes.length)];
      questionText = `What shape is this?`;
      options = [...shapes].sort(() => Math.random() - 0.5);
    } else if (config.type === 'measurement-temperature') {
      answer = Math.floor(Math.random() * 100);
      questionText = `What is the temperature?`;
      options = [answer, answer + 5, answer - 5, answer + 10].filter(n => n >= 0);
    } else if (config.type === 'patterns-what-comes-next') {
      const start = Math.floor(Math.random() * 10) + 1;
      const step = Math.floor(Math.random() * 5) + 1;
      const sequence = [start, start + step, start + 2 * step];
      answer = start + 3 * step;
      questionText = `What comes next in the pattern: ${sequence.join(', ')}, ...?`;
      options = [answer, answer + step, answer - step, answer + 1];
    } else if (config.type === 'number-bonds') {
      const total = Math.floor(Math.random() * (config.maxSum - 2)) + 3;
      const addend = Math.floor(Math.random() * (total - 1)) + 1;
      answer = total - addend;
      questionText = `What makes ${total} with ${addend}?`;
      options = [answer, answer + 1, answer - 1, total].filter(n => n > 0 && n <= config.maxSum + 2);
    } else if (config.type === 'compare-quantities') {
      const a = Math.floor(Math.random() * config.maxNumber) + 1;
      const b = Math.floor(Math.random() * config.maxNumber) + 1;
      answer = Math.max(a, b);
      questionText = `Which number is greater: ${a} or ${b}?`;
      options = [a, b, answer + 1, answer - 1].filter(n => n > 0 && n <= config.maxNumber + 2);
    } else if (config.type === 'skip-counting') {
      const step = config.steps[Math.floor(Math.random() * config.steps.length)];
      const base = step * (Math.floor(Math.random() * 6) + 1);
      answer = base + step * 3;
      const seq = [base, base + step, base + step * 2];
      questionText = `What comes next in counting by ${step}: ${seq.join(', ')}, ...?`;
      options = [answer, answer + step, answer - step, answer + 1].filter(n => n > 0 && n <= config.maxNumber);
    } else if (config.type === 'measurement-compare') {
      const a = Math.floor(Math.random() * config.maxNumber) + 1;
      const b = Math.floor(Math.random() * config.maxNumber) + 1;
      answer = Math.max(a, b);
      const unit = Math.random() > 0.5 ? 'cm' : 'g';
      questionText = `Which is greater: ${a}${unit} or ${b}${unit}?`;
      options = [a, b, answer + 1, answer - 1].filter(n => n > 0);
    } else if (config.type === 'position-direction') {
      const prompts = [
        { question: 'Which word means up?', answer: 'above ⬆️', options: ['above ⬆️', 'below ⬇️', 'left ⬅️', 'right ➡️'] },
        { question: 'Which word means down?', answer: 'below ⬇️', options: ['above ⬆️', 'below ⬇️', 'left ⬅️', 'right ➡️'] },
        { question: 'Which word means behind?', answer: 'behind 📦', options: ['in front 🎁', 'behind 📦', 'left ⬅️', 'right ➡️'] },
        { question: 'Which word means in front?', answer: 'in front 🎁', options: ['in front 🎁', 'behind 📦', 'left ⬅️', 'right ➡️'] },
      ];
      const prompt = prompts[Math.floor(Math.random() * prompts.length)];
      answer = prompt.answer;
      questionText = prompt.question;
      options = prompt.options;
    } else if (config.type === 'time-sequence') {
      const prompts = [
        { question: 'What comes after morning?', answer: 'afternoon ☀️', options: ['morning 🌅', 'afternoon ☀️', 'night 🌙', 'evening 🌇'] },
        { question: 'What comes after afternoon?', answer: 'evening 🌇', options: ['morning 🌅', 'afternoon ☀️', 'evening 🌇', 'night 🌙'] },
        { question: 'What comes after evening?', answer: 'night 🌙', options: ['morning 🌅', 'evening 🌇', 'night 🌙', 'afternoon ☀️'] },
      ];
      const prompt = prompts[Math.floor(Math.random() * prompts.length)];
      answer = prompt.answer;
      questionText = prompt.question;
      options = prompt.options;
    } else if (config.type === 'rounding') {
      const num = Math.floor(Math.random() * (config.maxNumber - 10)) + 10;
      const roundTo = Math.random() > 0.5 ? 10 : 100;
      const rounded = Math.round(num / roundTo) * roundTo;
      answer = rounded;
      questionText = `What is ${num} rounded to the nearest ${roundTo}?`;
      options = [rounded, rounded + roundTo, rounded - roundTo, num].filter(n => n >= 0);
    } else if (config.type === 'factors-multiples') {
      const num = Math.floor(Math.random() * (config.maxNumber - 10)) + 10;
      const factors = [];
      for (let i = 2; i <= 10; i += 1) {
        if (num % i === 0) factors.push(i);
      }
      answer = factors.length ? factors[Math.floor(Math.random() * factors.length)] : 2;
      const wrong1 = answer + 1;
      const wrong2 = answer + 2;
      const wrong3 = answer + 3;
      questionText = `Which number is a factor of ${num}?`;
      options = [answer, wrong1, wrong2, wrong3].filter(n => n > 1);
    } else if (config.type === 'decimals-3dp') {
      const value = Math.floor(Math.random() * 900) + 100;
      const str = value.toString();
      const tenths = str[0];
      const hundredths = str[1];
      const thousandths = str[2];
      const prompts = [
        { place: 'tenths', digit: tenths },
        { place: 'hundredths', digit: hundredths },
        { place: 'thousandths', digit: thousandths },
      ];
      const prompt = prompts[Math.floor(Math.random() * prompts.length)];
      answer = parseInt(prompt.digit, 10);
      questionText = `What is the ${prompt.place} digit in 0.${str}?`;
      options = [answer, (answer + 1) % 10, (answer + 2) % 10, (answer + 3) % 10];
    } else if (config.type === 'fraction-add') {
      const den = [4, 6, 8][Math.floor(Math.random() * 3)];
      const a = Math.floor(Math.random() * (den - 1)) + 1;
      const b = Math.floor(Math.random() * (den - a)) + 1;
      answer = `${a + b}/${den}`;
      questionText = `What is ${a}/${den} + ${b}/${den}?`;
      options = [answer, `${a + b + 1}/${den}`, `${a + b - 1}/${den}`, `${a}/${den}`];
    } else if (config.type === 'prime-square') {
      const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
      const squares = [4, 9, 16, 25, 36, 49];
      const isPrime = Math.random() > 0.5;
      answer = isPrime ? primes[Math.floor(Math.random() * primes.length)] : squares[Math.floor(Math.random() * squares.length)];
      questionText = isPrime ? 'Which number is prime?' : 'Which number is a square number?';
      const wrongPool = isPrime ? squares : primes;
      options = [answer, wrongPool[0], wrongPool[1], wrongPool[2]].sort(() => Math.random() - 0.5);
    } else if (config.type === 'percentage-change') {
      const base = (Math.floor(Math.random() * 9) + 2) * 10;
      const percent = [10, 20, 25, 50][Math.floor(Math.random() * 4)];
      answer = Math.round(base * (1 + percent / 100));
      questionText = `Increase ${base} by ${percent}%`;
      options = [answer, answer - 1, answer + 1, base + percent].filter(n => n > 0);
    } else if (config.type === 'add-sub-3digit') {
      const isAdd = Math.random() > 0.5;
      const num1 = Math.floor(Math.random() * 900) + 100;
      const num2 = Math.floor(Math.random() * 900) + 100;
      answer = isAdd ? num1 + num2 : Math.max(num1, num2) - Math.min(num1, num2);
      questionText = isAdd ? `What is ${num1} + ${num2}?` : `What is ${Math.max(num1, num2)} - ${Math.min(num1, num2)}?`;
      options = [answer, answer + 10, answer - 10, answer + 1].filter(n => n >= 0);
    } else if (config.type === 'roman-numerals') {
      const romanMap = { 1: 'I', 4: 'IV', 5: 'V', 9: 'IX', 10: 'X', 40: 'XL', 50: 'L', 90: 'XC', 100: 'C' };
      const num = Math.floor(Math.random() * 20) + 1;
      let roman = '';
      let n = num;
      const sortedKeys = Object.keys(romanMap).map(Number).sort((a, b) => b - a);
      for (let key of sortedKeys) {
        while (n >= key) {
          roman += romanMap[key];
          n -= key;
        }
      }
      answer = num;
      questionText = `What is ${roman} in numbers?`;
      options = [num, num + 1, num - 1, num + 2].filter(n => n > 0);
    }

    // Ensure we have exactly 4 options, remove duplicates, and shuffle
    const uniqueOptions = [...new Set(options)];
    while (uniqueOptions.length < 4) {
      // Determine max number based on config type
      let maxNum = 5; // Default max
      if (config.numbers) {
        maxNum = config.numbers[config.numbers.length - 1];
      } else if (config.type === 'recognize-1' || config.type === 'recognize-2' || config.type === 'recognize-3') {
        // For recognize-1/2/3, use 5 as max to allow variety
        maxNum = 5;
      } else if (config.number !== undefined) {
        // For other types with a single number, use that number as max but ensure at least 5
        maxNum = Math.max(config.number, 5);
      }

      const randomNum = Math.floor(Math.random() * maxNum) + 1;
      if (!uniqueOptions.includes(randomNum) && randomNum <= maxNum) {
        uniqueOptions.push(randomNum);
      }

      // Safety check to prevent infinite loop
      if (uniqueOptions.length < 4 && uniqueOptions.length >= maxNum) {
        // If we've exhausted all possible numbers, just add any missing numbers up to maxNum
        for (let i = 1; i <= maxNum && uniqueOptions.length < 4; i++) {
          if (!uniqueOptions.includes(i)) {
            uniqueOptions.push(i);
          }
        }
        break;
      }
    }

    // Ensure the answer is included in the options before slicing
    if (!uniqueOptions.includes(answer)) {
      uniqueOptions.push(answer);
    }

    // Shuffle and take first 4, but ensure answer is included
    uniqueOptions.sort(() => Math.random() - 0.5);
    let finalOptions = uniqueOptions.slice(0, 4);

    // If answer is not in final options, replace a random wrong option with the answer
    if (!finalOptions.includes(answer)) {
      const wrongOptions = finalOptions.filter(opt => opt !== answer);
      if (wrongOptions.length > 0) {
        const randomIndex = Math.floor(Math.random() * wrongOptions.length);
        const indexToReplace = finalOptions.indexOf(wrongOptions[randomIndex]);
        finalOptions[indexToReplace] = answer;
      }
    }

    // Final shuffle to randomize position of correct answer
    options = finalOptions.sort(() => Math.random() - 0.5);

    console.log('generateValidation - Answer:', answer, 'Question:', questionText, 'Options:', options);

    // Increment generation ID to track this question generation
    questionGenerationIdRef.current += 1;
    const thisGenerationId = questionGenerationIdRef.current;

    // Store the question text in a ref to avoid stale closure issues
    currentQuestionTextRef.current = questionText;

    setCorrectAnswer(answer);
    setValidationOptions(options);
    setQuestionText(questionText);

    // Reset the generation flag after state is set
    isGeneratingValidationRef.current = false;

    if (isTtsDisabled) {
      return;
    }

    // Clear any existing timeout first to prevent multiple TTS calls
    if (speakTimeoutRef.current) {
      clearTimeout(speakTimeoutRef.current);
      speakTimeoutRef.current = null;
    }

    // Stop any current speech immediately
    stop();

    // Speak the question after a delay to ensure state is updated and any previous speech has stopped
    speakTimeoutRef.current = setTimeout(async () => {
      // Only speak if this is still the current generation (prevents stale TTS)
      if (questionGenerationIdRef.current !== thisGenerationId) {
        console.log('Skipping TTS - question generation has changed');
        speakTimeoutRef.current = null;
        return;
      }

      // Get the current question text from ref to ensure we have the latest value
      const textToSpeak = currentQuestionTextRef.current;

      // Double-check that speech is stopped before starting new speech
      stop();
      // Small delay to ensure stop completes
      await new Promise(resolve => setTimeout(resolve, 150));

      // Check again after the delay to ensure we're still on the same generation
      if (questionGenerationIdRef.current !== thisGenerationId) {
        console.log('Skipping TTS - question generation changed during delay');
        speakTimeoutRef.current = null;
        return;
      }

      // Final check - ensure no other speech is playing
      if (isSpeaking()) {
        console.log('Skipping TTS - speech already in progress');
        speakTimeoutRef.current = null;
        return;
      }

      // Check if component is still mounted before speaking
      if (!isMountedRef.current) {
        console.log('Skipping TTS - component unmounted');
        speakTimeoutRef.current = null;
        return;
      }

      try {
        // Speak the question first
        await speak(textToSpeak, { volume: 1.0, rate: 0.6, pitch: 1.2 });

        // After reading question, read options if it's a younger child's lesson (Nursery/Reception/Year 1)
        if (lesson.yearId === 'reception' || lesson.yearId === 'nursery' || lesson.yearId === 'year1') {
          // Add a small pause after the question
          await new Promise(resolve => setTimeout(resolve, 600));

          for (let i = 0; i < options.length; i++) {
            // Check if still on the same generation to prevent overlapping speech
            if (questionGenerationIdRef.current !== thisGenerationId || !isMountedRef.current) break;

            setHighlightedOptionIndex(i);
            const option = options[i];

            // Determine how to speak the option
            let speechLabel = option.toString();
            // Strip emojis for cleaner TTS
            speechLabel = speechLabel.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();

            if (config.type === 'percentages') {
              speechLabel = `${option} percent`;
            } else if (typeof option === 'string' && option.includes('/')) {
              const [num, den] = option.split('/');
              speechLabel = `${num} over ${den}`;
            } else if (NUMBER_NAMES[option]) {
              speechLabel = NUMBER_NAMES[option];
            }

            await speak(speechLabel, { volume: 1.0, rate: 0.6, pitch: 1.2 });
            // Add a small pause between options
            await new Promise(resolve => setTimeout(resolve, 300));
          }

          if (isMountedRef.current) {
            setHighlightedOptionIndex(-1);
          }
        }
      } catch (err) {
        console.error('Error speaking question:', err);
      }
      speakTimeoutRef.current = null;
    }, 500);
  };

  const handleValidationAnswer = async (option) => {
    // Prevent multiple clicks
    if (gameState === 'completed') {
      return;
    }

    // Handle both number and string comparisons (for percentages with fractions)
    const isCorrect = option === correctAnswer ||
      (typeof option === 'string' && typeof correctAnswer === 'string' && option === correctAnswer) ||
      (typeof option === 'number' && typeof correctAnswer === 'number' && option === correctAnswer);
    const newAttempts = validationAttempts + 1;
    setValidationAttempts(newAttempts);
    setHighlightedOptionIndex(-1); // Stop highlighting if user interacts

    if (isCorrect) {
      const score = getScore(newAttempts);
      await completeLesson(score);
    } else {
      if (newAttempts >= 3) {
        const score = SCORE_TIERS.FAIL;
        await completeLesson(score);
      } else {
        if (isTtsDisabled) {
          generateValidation();
          return;
        }

        // Stop any ongoing speech (like the question being read) before speaking "try again"
        stop();
        // Clear any pending speak timeout
        if (speakTimeoutRef.current) {
          clearTimeout(speakTimeoutRef.current);
          speakTimeoutRef.current = null;
        }
        // Wait a brief moment to ensure the stop completes before speaking
        setTimeout(async () => {
          // Check if component is still mounted before speaking
          if (!isMountedRef.current) return;

          try {
            await speak('Try again!', { volume: 1.0, rate: 0.6, pitch: 1.2 });
            // Wait for "try again" to finish before generating new question
            // Also check if component is still mounted before generating new validation
            setTimeout(() => {
              if (isMountedRef.current) {
                generateValidation();
              }
            }, 800);
          } catch (err) {
            console.error('Error speaking "try again":', err);
            // Still generate new validation even if TTS fails
            // Also check if component is still mounted before generating new validation
            setTimeout(() => {
              if (isMountedRef.current) {
                generateValidation();
              }
            }, 300);
          }
        }, 100);
      }
    }
  };

  const getScore = (attempts) => {
    if (attempts === 1) return SCORE_TIERS.PLATINUM;
    if (attempts === 2) return SCORE_TIERS.GOLD;
    if (attempts === 3) return SCORE_TIERS.SILVER;
    return SCORE_TIERS.FAIL;
  };

  const completeLesson = async (score) => {
    // Only update state if component is still mounted
    if (isMountedRef.current) {
      setGameState('completed');
      setCurrentScore(score);
    }

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
        score: score === SCORE_TIERS.PLATINUM ? 100 : score === SCORE_TIERS.GOLD ? 90 : score === SCORE_TIERS.SILVER ? 75 : score === SCORE_TIERS.BRONZE ? 50 : 0,
      });
      try {
        await addProgress(progress);
        await saveData();
      } catch (err) {
        console.error('Error saving progress:', err);
      }
    }
  };

  const renderActivity = () => {
    // Handle different activity types
    if (config.type === 'recognize-1' || config.type === 'recognize-2' || config.type === 'recognize-3') {
      // Single number recognition
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2 style={{ fontSize: '42px', marginBottom: '40px', color: '#333', fontWeight: 'bold' }}>
            Tap the number {NUMBER_NAMES[config.number]}! 🔢
          </h2>
          <div style={{ marginBottom: '40px' }}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Button clicked! Config:', config, 'Number:', config.number);
                if (config.number) {
                  handleNumberClick(config.number);
                } else {
                  console.error('Config number is undefined!', config);
                }
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Button touched! Config:', config, 'Number:', config.number);
                if (config.number) {
                  handleNumberClick(config.number);
                } else {
                  console.error('Config number is undefined!', config);
                }
              }}
              style={{
                width: '200px',
                height: '200px',
                fontSize: '120px',
                fontWeight: 'bold',
                color: '#333',
                backgroundColor: '#fff',
                border: '8px solid #4CAF50',
                borderRadius: '30px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
                WebkitUserSelect: 'none',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
                e.currentTarget.style.backgroundColor = '#c8e6c9';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#fff';
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.backgroundColor = '#e8f5e9';
                e.currentTarget.style.borderColor = '#2E7D32';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.borderColor = '#4CAF50';
              }}
            >
              {config.emoji || config.number || '?'}
            </button>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Play Game clicked! Calling handleContinue');
              handleContinue();
            }}
            style={{
              padding: '20px 50px',
              fontSize: '28px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.backgroundColor = '#45a049';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = '#4CAF50';
            }}
          >
            Play Game! 🎮
          </button>
        </div>
      );
    } else if (config.type === 'count-1-3' || config.type === 'match-1' || config.type === 'match-2' || config.type === 'match-3' || config.type === 'count-1-5') {
      // Counting objects - show objects to count
      let objectCount = activityObjectCount;
      if (objectCount === null) {
        objectCount = config.type === 'match-1' ? 1 : config.type === 'match-2' ? 2 : config.type === 'match-3' ? 3 :
          config.type === 'count-1-3' ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 5) + 1;
        setActivityObjectCount(objectCount);
      }
      const objects = ['🍎', '🍌', '🍊', '🍇', '🍓'];
      const displayObjects = objects.slice(0, objectCount);

      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2 style={{ fontSize: '42px', marginBottom: '40px', color: '#333', fontWeight: 'bold' }}>
            Count the objects! 👀
          </h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            flexWrap: 'wrap',
            marginBottom: '40px',
          }}>
            {displayObjects.map((obj, index) => (
              <div key={index} style={{ fontSize: '100px' }}>{obj}</div>
            ))}
          </div>
          <div style={{ fontSize: '32px', marginBottom: '40px', color: '#666' }}>
            How many do you see?
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Play Game clicked! Calling handleContinue');
              handleContinue();
            }}
            style={{
              padding: '20px 50px',
              fontSize: '28px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.backgroundColor = '#45a049';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = '#4CAF50';
            }}
          >
            Play Game! 🎮
          </button>
        </div>
      );
    } else {
      // Show numbers in a grid for tapping
      const numbersToShow = config.numbers || (config.type === 'counting-to-10'
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '40px', color: '#333', fontWeight: 'bold' }}>
            Tap a number to hear it! 🔢
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '20px',
            maxWidth: '800px',
            margin: '0 auto 40px auto',
          }}>
            {numbersToShow.map((number, index) => (
              <button
                key={index}
                onClick={() => handleNumberClick(number)}
                onTouchStart={() => handleNumberClick(number)}
                style={{
                  width: '120px',
                  height: '120px',
                  fontSize: '60px',
                  fontWeight: 'bold',
                  color: '#333',
                  backgroundColor: '#fff',
                  border: '5px solid #4CAF50',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.15)';
                  e.currentTarget.style.backgroundColor = '#e8f5e9';
                  e.currentTarget.style.borderColor = '#2E7D32';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.borderColor = '#4CAF50';
                }}
              >
                {(config.emojis && config.emojis[index]) || number}
              </button>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Play Game clicked! Calling handleContinue');
              handleContinue();
            }}
            style={{
              padding: '20px 50px',
              fontSize: '28px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.backgroundColor = '#45a049';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = '#4CAF50';
            }}
          >
            Play Game! 🎮
          </button>
        </div>
      );
    }
  };

  const renderValidation = () => {
    console.log('renderValidation called! correctAnswer:', correctAnswer, 'validationOptions:', validationOptions, 'validationObjects:', validationObjects);

    // Safety check
    if (!config || !config.type) {
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2 style={{ fontSize: '36px', color: '#dc3545' }}>Error loading game. Please try again.</h2>
        </div>
      );
    }

    // Find the question text based on correct answer
    let displayQuestionText = questionText || 'Select the correct answer!';
    const showObjects = validationObjects.length > 0 &&
      (config.type === 'count-1-3' || config.type === 'match-1' || config.type === 'match-2' || config.type === 'match-3' || config.type === 'count-1-5');

    // If validation hasn't been generated yet, show loading
    // Trigger initialization if needed (fallback - but only once)
    if (!correctAnswer || !validationOptions || validationOptions.length === 0) {
      console.log('Validation not ready, waiting for initialization...');

      // Fallback: If the main useEffect didn't trigger, do it here
      // But only if we haven't already tried to initialize this lesson
      if (!isInitialized && initializedLessonIdRef.current !== lesson?.id && config && config.type) {
        console.log('Fallback: Triggering initialization from renderValidation');
        setIsInitialized(true);
        initializedLessonIdRef.current = lesson?.id;
        // Use requestAnimationFrame to ensure this happens after render
        requestAnimationFrame(() => {
          generateValidation();
        });
      }

      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2 style={{ fontSize: '36px', color: '#333' }}>Loading game...</h2>
        </div>
      );
    }

    // Use the stored questionText state - this ensures sync with TTS
    displayQuestionText = questionText || 'Select the correct answer!';

    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '40px', color: '#333', fontWeight: 'bold' }}>
          {displayQuestionText}
        </h2>
        {showObjects && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            flexWrap: 'wrap',
            marginBottom: '40px',
          }}>
            {validationObjects.map((obj, index) => (
              <div key={index} style={{ fontSize: '100px' }}>{obj}</div>
            ))}
          </div>
        )}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          flexWrap: 'wrap',
          marginBottom: '30px',
          maxWidth: '800px',
          margin: '0 auto 30px auto',
        }}>
          {validationOptions.map((option, index) => {
            let displayText;
            let useDigits = false;
            let letterSpacing = 'normal';
            const isFraction = typeof option === 'string' && option.includes('/');
            const showPieChart = isFraction && config.type === 'fractions-basic';

            // Handle string options (fractions, decimals, etc.)
            if (typeof option === 'string') {
              displayText = option;
            } else if (config.type === 'percentages') {
              // Display percentages with % symbol
              displayText = `${option}%`;
            } else {
              // For two-digit numbers, use actual digits with tight spacing
              if (option > 10 && option < 100) {
                displayText = option.toString();
                useDigits = true;
                letterSpacing = '-0.1em'; // Bring digits closer together to look like one number
              } else {
                // Handle number options with emojis for single digits
                let emoji;
                if (config.emojis && config.emojis[option - 1]) {
                  emoji = config.emojis[option - 1];
                  // For two-digit emojis (like '1️⃣7️⃣'), use negative letter-spacing
                  if (option > 10 && emoji.length > 2) {
                    letterSpacing = '-0.15em'; // Slightly more spacing for emojis
                  }
                } else if (config.emoji && option === config.number) {
                  emoji = config.emoji;
                } else {
                  // Use number emojis for simple numbers
                  const numberEmojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
                  emoji = numberEmojis[option - 1] || option;
                }
                displayText = emoji;
              }
            }

            // Adjust font size for longer text (fractions, decimals)
            const fontSize = typeof option === 'string' && option.length > 3 ? '40px' : '70px';

            return (
              <button
                key={index}
                onClick={() => handleValidationAnswer(option)}
                onTouchStart={() => handleValidationAnswer(option)}
                style={{
                  width: '150px',
                  height: '150px',
                  fontSize: fontSize,
                  fontWeight: 'bold',
                  color: '#333',
                  backgroundColor: '#fff',
                  border: '5px solid #2196F3',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: index === highlightedOptionIndex
                    ? '0 0 30px rgba(33, 150, 243, 0.8), 0 10px 20px rgba(0,0,0,0.3)'
                    : '0 6px 12px rgba(0,0,0,0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  letterSpacing: letterSpacing,
                  padding: showPieChart ? '10px' : '0',
                  transform: index === highlightedOptionIndex ? 'scale(1.1)' : 'scale(1)',
                  backgroundColor: index === highlightedOptionIndex ? '#e3f2fd' : '#fff',
                  borderColor: index === highlightedOptionIndex ? '#1976D2' : '#2196F3',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.15)';
                  e.currentTarget.style.backgroundColor = '#e3f2fd';
                  e.currentTarget.style.borderColor = '#1976D2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.borderColor = '#2196F3';
                }}
              >
                {showPieChart ? renderPieChart(option, 120) : displayText}
              </button>
            );
          })}
        </div>
        <div style={{ fontSize: '24px', color: '#666', marginTop: '20px', fontWeight: 'bold' }}>
          Attempts: {validationAttempts} / 3
        </div>
      </div>
    );
  };

  if (gameState === 'completed' && currentScore) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        minHeight: '600px',
        backgroundColor: '#f0f8ff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '40px'
      }}>
        <div style={{ fontSize: '100px', marginBottom: '20px' }}>🎉</div>
        <h2 style={{ color: currentScore.color, fontSize: '56px', marginBottom: '20px', margin: '0 0 20px 0', fontWeight: 'bold' }}>
          {currentScore.name} Medal! 🏅
        </h2>
        <div style={{ display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {currentScore.name === 'Try Again' ? (
            <>
              <button
                onClick={() => {
                  navigate(`/lessons?subjectId=${lesson.subjectId}`);
                }}
                style={{
                  padding: '18px 35px',
                  fontSize: '22px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                }}
              >
                Back to Lessons
              </button>
              <button
                onClick={() => {
                  // Reset all game state to retry
                  setGameState('validation');
                  setCurrentScore(null);
                  setValidationAttempts(0);
                  setCorrectAnswer(null);
                  setValidationOptions([]);
                  setValidationObjects([]);
                  setIsInitialized(false);
                  // Generate a new question
                  setTimeout(() => {
                    generateValidation();
                  }, 100);
                }}
                style={{
                  padding: '18px 40px',
                  fontSize: '24px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                }}
              >
                Try Again 🔄
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate(`/lessons?subjectId=${lesson.subjectId}`);
                }}
                style={{
                  padding: '18px 35px',
                  fontSize: '22px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                }}
              >
                Back to Lessons
              </button>
              <button
                onClick={async () => {
                  // Wait a moment to ensure progress is saved
                  await new Promise(resolve => setTimeout(resolve, 200));

                  // Check if component is still mounted before updating state
                  if (isMountedRef.current) {
                    // Reset state before navigating to clear the medal screen
                    setGameState('validation');
                    setCurrentScore(null);
                  }

                  const { url, shouldDisableStudyMode } = getNextLessonUrl(lesson);
                  if (shouldDisableStudyMode) {
                    disableStudyMode();
                  }
                  navigate(url);
                }}
                style={{
                  padding: '18px 40px',
                  fontSize: '24px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                }}
              >
                Next Lesson →
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '600px',
      backgroundColor: '#f0f8ff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {gameState === 'validation' && renderValidation()}
    </div>
  );
}

export default MathGame;

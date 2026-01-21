import { Lesson } from '../../models/Lesson.js';

export function getNewMathsLessons(startLessonId, startQuizId) {
  let lessonId = startLessonId;
  let quizId = startQuizId;

  return [
    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 14,
      title: "Counting to 100",
      emoji: '💯',
      content: `# Counting to 100 💯

Let's count all the way to 100!

## How to Play

A number will be spoken. Click the correct number!

## Let's Learn

Practice counting from 1 to 100. It's a big step!`,
      quizId: null,
      assessmentType: 'maths-game',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 15,
      title: "Advanced Addition",
      emoji: '➕',
      content: `# Advanced Addition ➕

Let's practice adding bigger numbers.

## How to Play

A question will be spoken. Click the correct answer!

## Let's Learn

We will add numbers with sums up to 100.`,
      quizId: null,
      assessmentType: 'maths-game',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 16,
      title: "Advanced Subtraction",
      emoji: '➖',
      content: `# Advanced Subtraction ➖

Let's practice subtracting bigger numbers.

## How to Play

A question will be spoken. Click the correct answer!

## Let's Learn

We will subtract numbers up to 100.`,
      quizId: null,
      assessmentType: 'maths-game',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 17,
      title: "Telling Time",
      emoji: '⏰',
      content: `# Telling Time ⏰

Let's learn to read a clock.

## How to Play

Look at the clock and choose the correct time. The time will be spoken.

## Let's Learn

We will learn about the hour and minute hands.`,
      quizId: null,
      assessmentType: 'maths-game',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 18,
      title: "Money Math: Counting Coins",
      emoji: '💰',
      content: `# Money Math: Counting Coins 💰

Let's learn to count money.

## How to Play

Count the coins shown and choose the correct total. The amounts will be spoken.

## Let's Learn

We will learn the value of different coins.`,
      quizId: null,
      assessmentType: 'maths-game',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 19,
      title: "Fractions: Equivalents",
      emoji: '🍕',
      content: `# Fractions: Equivalents 🍕

Let's learn about equivalent fractions.

## How to Play

A fraction will be shown. Choose the equivalent fraction. The fractions will be spoken.

## Let's Learn

Equivalent fractions are fractions that have the same value, even though they may look different.`,
      quizId: null,
      assessmentType: 'maths-game',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 20,
      title: "Geometry: 3D Shapes",
      emoji: '🧊',
      content: `# Geometry: 3D Shapes 🧊

Let's learn about 3D shapes.

## How to Play

A shape will be shown. Choose the correct name for the shape. The shape names will be spoken.

## Let's Learn

We will learn to identify cubes, spheres, cones, and more.`,
      quizId: null,
      assessmentType: 'maths-game',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 21,
      title: "Measurement: Temperature",
      emoji: '🌡️',
      content: `# Measurement: Temperature 🌡️

Let's learn to read a thermometer.

## How to Play

Look at the thermometer and choose the correct temperature. The temperatures will be spoken.

## Let's Learn

We will learn about degrees Celsius.`,
      quizId: null,
      assessmentType: 'maths-game',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 22,
      title: "Patterns: What Comes Next?",
      emoji: '🤔',
      content: `# Patterns: What Comes Next? 🤔

Let's learn about patterns.

## How to Play

Look at the pattern and choose what comes next. The numbers will be spoken.

## Let's Learn

Patterns are sequences that repeat in a logical way.`,
      quizId: null,
      assessmentType: 'maths-game',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 23,
      title: "Roman Numerals",
      emoji: '📜',
      content: `# Roman Numerals 📜

Let's learn about Roman numerals.

## How to Play

A Roman numeral will be shown. Choose the correct number. The numbers will be spoken.

## Let's Learn

We will learn the values of I, V, and X.`,
      quizId: null,
      assessmentType: 'maths-game',
      ttsDisabled: true,
    }),
  ];
}

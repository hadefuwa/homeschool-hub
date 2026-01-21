import { Lesson } from '../../models/Lesson.js';

/**
 * Year 5 Lessons
 */
export function getYear5Lessons(startLessonId, startQuizId) {
  let lessonId = startLessonId;
  let quizId = startQuizId;

  return [
    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'maths',
      lessonNumber: 1,
      title: "Place Value to 1,000,000",
      emoji: '🔢',
      content: `# Place Value to 1,000,000 🔢

Let's learn about place value up to millions!

## Place Value Positions

In the number 456,789:
- The 4 is in the hundred thousands place (worth 400,000)
- The 5 is in the ten thousands place (worth 50,000)
- The 6 is in the thousands place (worth 6,000)
- The 7 is in the hundreds place (worth 700)
- The 8 is in the tens place (worth 80)
- The 9 is in the ones place (worth 9)

## Examples

- 234,567 = 2 hundred thousands + 3 ten thousands + 4 thousands + 5 hundreds + 6 tens + 7 ones
- 1,000,000 = one million

## How to Play

Drag digits and type expanded form! 🎮`,
      quizId: quizId++,
      assessmentType: 'place-value-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'maths',
      lessonNumber: 2,
      title: "Long Division",
      emoji: '➗',
      content: `# Long Division ➗

Let's learn long division!

## Long Division Steps

1. Divide
2. Multiply
3. Subtract
4. Bring down
5. Repeat

## Example

   __15
4 ) 60
   -4
   --
    20
   -20
   --
     0

## How to Play

Type step-by-step and drag remainders! 🎮`,
      quizId: quizId++,
      assessmentType: 'typing-math-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'maths',
      lessonNumber: 3,
      title: "Multiplying Decimals",
      emoji: '✖️',
      content: `# Multiplying Decimals ✖️

Let's learn to multiply decimals!

## Multiplying Decimals

1. Multiply as if they were whole numbers
2. Count decimal places in both numbers
3. Place decimal point in answer

## Examples

- 2.5 × 3 = 7.5
- 1.2 × 4 = 4.8
- 0.5 × 0.3 = 0.15

## How to Play

Type calculations and drag decimal points! 🎮`,
      quizId: quizId++,
      assessmentType: 'typing-math-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'maths',
      lessonNumber: 4,
      title: "Adding/Subtracting Fractions",
      emoji: '🍕',
      content: `# Adding/Subtracting Fractions 🍕

Let's learn to add and subtract fractions!

## Adding Fractions

Make denominators the same, then add numerators!

## Examples

- 1/4 + 2/4 = 3/4
- 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2
- 2/5 + 1/5 = 3/5

## Subtracting Fractions

Make denominators the same, then subtract numerators!

## Examples

- 3/4 - 1/4 = 2/4 = 1/2
- 5/6 - 1/6 = 4/6 = 2/3

## How to Play

Drag fractions and type answers! 🎮`,
      quizId: quizId++,
      assessmentType: 'typing-math-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'maths',
      lessonNumber: 5,
      title: "Percentages",
      emoji: '📊',
      content: `# Percentages 📊

Let's learn about percentages!

## What are Percentages?

Percentages are parts out of 100!

## Examples

- 50% = 50 out of 100 = 1/2
- 25% = 25 out of 100 = 1/4
- 75% = 75 out of 100 = 3/4
- 100% = all of it

## Converting

- 1/2 = 50%
- 1/4 = 25%
- 3/4 = 75%

## How to Play

Click percentages and drag to fractions! 🎮`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'maths',
      lessonNumber: 6,
      title: "Coordinates",
      emoji: '📍',
      content: `# Coordinates 📍

Let's learn about coordinates!

## What are Coordinates?

Coordinates tell us where a point is on a grid!

## Reading Coordinates

- (3, 4) means: 3 across, 4 up
- First number = x (across)
- Second number = y (up)

## Examples

- (2, 3) = 2 across, 3 up
- (5, 1) = 5 across, 1 up
- (0, 0) = origin (starting point)

## How to Play

Click grid points and type coordinates! 🎮`,
      quizId: quizId++,
      assessmentType: 'coordinate-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'maths',
      lessonNumber: 7,
      title: "Symmetry",
      emoji: '🪞',
      content: `# Symmetry 🪞

Let's learn about symmetry!

## What is Symmetry?

A shape is symmetrical if both sides match!

## Line of Symmetry

A line that divides a shape into two matching halves!

## Examples

- A square has 4 lines of symmetry
- A rectangle has 2 lines of symmetry
- A circle has many lines of symmetry

## How to Play

Click lines of symmetry and drag shapes! 🎮`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'maths',
      lessonNumber: 8,
      title: "Volume",
      emoji: '📦',
      content: `# Volume 📦

Let's learn about volume!

## What is Volume?

Volume is the space inside a 3D shape!

## Finding Volume

For a cube or rectangular prism:
Volume = length × width × height

## Examples

- A cube with sides of 3 = 3 × 3 × 3 = 27 cubic units
- A box 4 × 2 × 3 = 24 cubic units

## How to Play

Click cubes and type volume! 🎮`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'maths',
      lessonNumber: 9,
      title: "Converting Units",
      emoji: '🔄',
      content: `# Converting Units 🔄

Let's learn to convert between units!

## Length Conversions

- 10 mm = 1 cm
- 100 cm = 1 m
- 1000 m = 1 km

## Mass Conversions

- 1000 g = 1 kg

## Capacity Conversions

- 1000 mL = 1 L

## Examples

- 500 cm = 5 m
- 2 kg = 2000 g
- 3 L = 3000 mL

## How to Play

Drag conversions and type answers! 🎮`,
      quizId: quizId++,
      assessmentType: 'typing-math-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'maths',
      lessonNumber: 10,
      title: "Mean, Median, Mode",
      emoji: '📊',
      content: `# Mean, Median, Mode 📊

Let's learn about averages!

## Mean (Average)

Add all numbers, then divide by how many!

Example: 5, 7, 9
Mean = (5 + 7 + 9) ÷ 3 = 21 ÷ 3 = 7

## Median

The middle number when ordered!

Example: 3, 5, 7, 9, 11
Median = 7 (middle number)

## Mode

The number that appears most often!

Example: 2, 3, 3, 4, 5
Mode = 3 (appears twice)

## How to Play

Click data and type calculations! 🎮`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'technology',
      lessonNumber: 1,
      title: "TapTapTap: Master Level 1",
      emoji: '👆',
      content: `# TapTapTap: Master Level 1 👆

You've reached the master level! This is very challenging - only for the best tappers!

## How to Play

- Tap targets as they appear on screen
- Targets appear every 0.8 seconds (extremely fast!)
- Targets are small and require precision
- 30 seconds to score as many points as possible!

## Scoring System

- **Bronze**: 25-49 points
- **Silver**: 50-74 points
- **Gold**: 75-99 points
- **Platinum**: 100+ points

You need at least **Bronze** (25 points) to progress!

## Tips

- This level requires excellent hand-eye coordination
- Stay focused and don't get discouraged
- Every point counts!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'technology',
      lessonNumber: 2,
      title: "TapTapTap: Master Level 2",
      emoji: '👆',
      content: `# TapTapTap: Master Level 2 👆

Continue your master-level training! Keep pushing your limits!

## How to Play

- Tap targets as they appear
- Same speed as Level 1 - keep practicing!
- 30 seconds to score points

## Scoring System

- **Bronze**: 25-49 points
- **Silver**: 50-74 points
- **Gold**: 75-99 points
- **Platinum**: 100+ points

You need at least **Bronze** (25 points) to progress!

## Challenge

Can you reach Platinum? You're almost at the top level!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

  ];
}

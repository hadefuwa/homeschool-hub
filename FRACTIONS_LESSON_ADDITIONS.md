# Fractions Lessons Distribution Guide

Add these lessons to each year file. Insert after the last maths lesson in each year.

## RECEPTION LESSONS (receptionLessons.js)

Add after the last maths lesson (around line 400):

```javascript
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'maths',
      lessonNumber: 16, // UPDATE THIS based on current last maths lesson
      title: "Fractions: Halves",
      emoji: '🍕',
      content: `# Fractions: Halves 🍕

Let's learn about halves!

## What is a Half?

A half (½) means one part out of two equal parts.

## Examples
- Half a pizza 🍕 = ½
- Half an apple 🍎 = ½

Click the pizza slices to practice!`,
      quizId: null,
      assessmentType: 'fractions-pizza-1',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'maths',
      lessonNumber: 17, // UPDATE THIS
      title: "Fractions: Quarters",
      emoji: '🍕',
      content: `# Fractions: Quarters 🍕

Now let's learn about quarters!

## What is a Quarter?

A quarter (¼) means one part out of four equal parts.

## Practice
You'll work with halves (½) and quarters (¼) together!`,
      quizId: null,
      assessmentType: 'fractions-pizza-2',
      categoryId: null,
    }),
```

## YEAR 1 LESSONS (year1Lessons.js)

Add after the last maths lesson:

```javascript
    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'maths',
      lessonNumber: 15, // UPDATE THIS based on current last maths lesson
      title: "Fractions Review: Halves & Quarters",
      emoji: '🍕',
      content: `# Fractions Review: Halves & Quarters 🍕

Let's practice halves and quarters again!

## Remember
- Half (½) = 1 out of 2
- Quarter (¼) = 1 out of 4

Time to become an expert!`,
      quizId: null,
      assessmentType: 'fractions-pizza-2',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'maths',
      lessonNumber: 16, // UPDATE THIS
      title: "Fractions: Thirds",
      emoji: '🍕',
      content: `# Fractions: Thirds 🍕

Time to learn about thirds!

## What is a Third?

A third (⅓) means one part out of three equal parts.

## Challenge
Mix halves and thirds together!`,
      quizId: null,
      assessmentType: 'fractions-pizza-3',
      categoryId: null,
    }),
```

## YEAR 2 LESSONS (year2Lessons.js)

Add after the last maths lesson:

```javascript
    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'maths',
      lessonNumber: 20, // UPDATE THIS based on current last maths lesson
      title: "Fractions: Mixed Practice",
      emoji: '🍕',
      content: `# Fractions: Mixed Practice 🍕

Practice all the fractions you know!

## Fractions
- Halves (½)
- Thirds (⅓)
- Quarters (¼)

Let's mix them all!`,
      quizId: null,
      assessmentType: 'fractions-pizza-4',
      categoryId: null,
    }),
```

## YEAR 3 LESSONS (year3Lessons.js)

Already updated - has Level 6 (Thirds & Sixths) as lesson 3

## YEAR 4 LESSONS (year4Lessons.js)

Add after the last maths lesson:

```javascript
    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 12, // UPDATE THIS based on current last maths lesson
      title: "Fractions: Sixths",
      emoji: '🍕',
      content: `# Fractions: Sixths 🍕

Introducing sixths!

## What is a Sixth?

A sixth (⅙) means one part out of six equal parts.

## Practice
Work with halves, quarters, and sixths!`,
      quizId: null,
      assessmentType: 'fractions-pizza-5',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 13, // UPDATE THIS
      title: "Fractions: Eighths",
      emoji: '🍕',
      content: `# Fractions: Eighths 🍕

Challenge: Eighths!

## What is an Eighth?

An eighth (⅛) means one part out of eight equal parts.

Get ready for smaller slices!`,
      quizId: null,
      assessmentType: 'fractions-pizza-7',
      categoryId: null,
    }),
```

## YEAR 5 LESSONS (year5Lessons.js)

Add after the last maths lesson:

```javascript
    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'maths',
      lessonNumber: 20, // UPDATE THIS based on current last maths lesson
      title: "Fractions: Advanced Mix",
      emoji: '🍕',
      content: `# Fractions: Advanced Mix 🍕

Advanced practice with 6 rounds!

## Fractions Included
- Halves, Thirds, Quarters, Sixths

You're becoming a fraction expert!`,
      quizId: null,
      assessmentType: 'fractions-pizza-8',
      categoryId: null,
    }),
```

## YEAR 6 LESSONS (year6Lessons.js)

Add after the last maths lesson:

```javascript
    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 25, // UPDATE THIS based on current last maths lesson
      title: "Fractions: Complex Challenge",
      emoji: '🍕',
      content: `# Fractions: Complex Challenge 🍕

Get ready for complex fractions!

## Challenge Fractions
- Quarters (¼)
- Sixths (⅙)
- Eighths (⅛)

6 challenging rounds await!`,
      quizId: null,
      assessmentType: 'fractions-pizza-9',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 26, // UPDATE THIS
      title: "Fractions: Master Chef",
      emoji: '🍕',
      content: `# Fractions: Master Chef 🍕

The ultimate fraction challenge!

## All Fractions
- Halves, Thirds, Quarters
- Sixths, Eighths, Twelfths

7 rounds to prove you're a Master Chef! 👨‍🍳`,
      quizId: null,
      assessmentType: 'fractions-pizza-10',
      categoryId: null,
    }),
```

## IMPORTANT NOTES:

1. Update the `lessonNumber` values to match the next available lesson number in each year
2. All subsequent lessons in that year will need their lesson numbers incremented
3. The white screen issue should now be fixed - the assessment types are simplified
4. Test each lesson after adding to ensure the fractions game loads correctly

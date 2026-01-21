import { Lesson } from '../../models/Lesson.js';

/**
 * Nursery Lessons
 */
export function getNurseryLessons(startLessonId, startQuizId) {
  let lessonId = startLessonId;
  let quizId = startQuizId;

  return [
    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'maths',
      lessonNumber: 1,
      title: "Number 1",
      emoji: '1️⃣',
      content: `# Number 1 🔢



Let's learn about the number 1!



## The Number 1



1️⃣ One



## How to Play



Tap the number to hear it! Then play the game! 🎮



## Fun Activities



- Find one object around you

- Show one finger

- Count to one!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'maths',
      lessonNumber: 2,
      title: "Number 2",
      emoji: '2️⃣',
      content: `# Number 2 🔢



Let's learn about the number 2!



## The Number 2



2️⃣ Two



## How to Play



Tap the number to hear it! Then play the game! 🎮



## Fun Activities



- Find two objects around you

- Show two fingers

- Count to two!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'maths',
      lessonNumber: 3,
      title: "Number 3",
      emoji: '3️⃣',
      content: `# Number 3 🔢



Let's learn about the number 3!



## The Number 3



3️⃣ Three



## How to Play



Tap the number to hear it! Then play the game! 🎮



## Fun Activities



- Find three objects around you

- Show three fingers

- Count to three!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'maths',
      lessonNumber: 4,
      title: "Counting 1-3",
      emoji: '🔢',
      content: `# Counting 1-3 🔢



Let's learn to count from 1 to 3!



## Numbers 1-3



1️⃣ One

2️⃣ Two

3️⃣ Three



## How to Play



Count the objects! Then play the game! 🎮



## Fun Activities



- Count your fingers (1, 2, 3!)

- Count toys

- Count steps!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'maths',
      lessonNumber: 5,
      title: "Match Number 1",
      emoji: '1️⃣',
      content: `# Match Number 1 🔢



Let's match the number 1 to one object!



## One Object



🍎 One apple



## How to Play



Count the objects! Then play the game! 🎮



## Fun Activities



- Find one thing around you

- Show one finger

- Count to one!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'maths',
      lessonNumber: 6,
      title: "Match Number 2",
      emoji: '2️⃣',
      content: `# Match Number 2 🔢



Let's match the number 2 to two objects!



## Two Objects



🍎🍌 Two fruits



## How to Play



Count the objects! Then play the game! 🎮



## Fun Activities



- Find two things around you

- Show two fingers

- Count to two!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'maths',
      lessonNumber: 7,
      title: "Match Number 3",
      emoji: '3️⃣',
      content: `# Match Number 3 🔢



Let's match the number 3 to three objects!



## Three Objects



🍎🍌🍊 Three fruits



## How to Play



Count the objects! Then play the game! 🎮



## Fun Activities



- Find three things around you

- Show three fingers

- Count to three!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'maths',
      lessonNumber: 8,
      title: "Counting 1-5",
      emoji: '🔢',
      content: `# Counting 1-5 🔢



Let's learn to count from 1 to 5!



## Numbers 1-5



1️⃣ One

2️⃣ Two

3️⃣ Three

4️⃣ Four

5️⃣ Five



## How to Play



Count the objects! Then play the game! 🎮



## Fun Activities



- Count your fingers on one hand (1, 2, 3, 4, 5!)

- Count toys

- Count steps!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'maths',
      lessonNumber: 9,
      title: "Number Order 1-3",
      emoji: '🔢',
      content: `# Number Order 1-3 🔢



Let's learn the order of numbers!



## Numbers in Order



1️⃣ One comes first

2️⃣ Two comes second

3️⃣ Three comes third



## How to Play



Tap the numbers to hear them! Then play the game! 🎮



## Fun Activities



- Count in order: 1, 2, 3!

- Show numbers on your fingers

- Practice counting!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'maths',
      lessonNumber: 10,
      title: "Numbers 1-5",
      emoji: '🔢',
      content: `# Numbers 1-5 🔢



Let's learn all the numbers from 1 to 5!



## Numbers 1-5



1️⃣ One

2️⃣ Two

3️⃣ Three

4️⃣ Four

5️⃣ Five



## How to Play



Tap the numbers to hear them! Then play the game! 🎮



## Fun Activities



- Count your fingers (1, 2, 3, 4, 5!)

- Find objects to count

- Practice every day!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'maths',
      lessonNumber: 11,
      title: "Counting to 10",
      emoji: '🔢',
      content: `# Counting to 10 🔢



Let's learn to count from 1 to 10!



## Numbers 1-10



1️⃣ One

2️⃣ Two

3️⃣ Three

4️⃣ Four

5️⃣ Five

6️⃣ Six

7️⃣ Seven

8️⃣ Eight

9️⃣ Nine

🔟 Ten



## How to Play



Tap the numbers to hear them! Then play the game to test what you learned! 🎮



## Fun Activities



- Count your fingers! How many do you have?

- Count your toes! How many are there?

- Count objects around you: toys, books, crayons!



## Remember



- Numbers help us count things

- We start counting from 1

- 10 is the biggest number we're learning today`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'maths',
      lessonNumber: 12,
      title: "Counting to 20",
      emoji: '🔢',
      content: `# Counting to 20 🔢



Now let's learn to count even higher - from 1 to 20!



## Numbers 1-20



1️⃣ One

2️⃣ Two

3️⃣ Three

4️⃣ Four

5️⃣ Five

6️⃣ Six

7️⃣ Seven

8️⃣ Eight

9️⃣ Nine

🔟 Ten

1️⃣1️⃣ Eleven

1️⃣2️⃣ Twelve

1️⃣3️⃣ Thirteen

1️⃣4️⃣ Fourteen

1️⃣5️⃣ Fifteen

1️⃣6️⃣ Sixteen

1️⃣7️⃣ Seventeen

1️⃣8️⃣ Eighteen

1️⃣9️⃣ Nineteen

2️⃣0️⃣ Twenty



## How to Play



Tap the numbers to hear them! Then play the game to test what you learned! 🎮



## Fun Activities



- Count all your fingers and toes together! (That's 20!)

- Count steps as you walk

- Count blocks as you build a tower

- Count animals in a picture book



## Remember



- After 10, we have 11, 12, 13, and so on

- 20 is a big number!

- Practice counting every day to get better`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'technology',
      lessonNumber: 1,
      title: "Clicking Game",
      emoji: '🎯',
      assessmentType: 'clicking-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'technology',
      lessonNumber: 2,
      title: "Keyboard Game",
      emoji: '⌨️',
      assessmentType: 'keyboard-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'technology',
      lessonNumber: 3,
      title: "WASD Game",
      emoji: '⌨️',
      assessmentType: 'wasd-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'technology',
      lessonNumber: 4,
      title: "A-Z Game",
      emoji: '🔤',
      assessmentType: 'a-z-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'technology',
      lessonNumber: 5,
      title: "Numbers Game",
      emoji: '🔢',
      assessmentType: 'numbers-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'technology',
      lessonNumber: 6,
      title: "Symbols Game",
      emoji: '🔣',
      assessmentType: 'symbols-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'technology',
      lessonNumber: 7,
      title: "Flappy Bird Game",
      emoji: '🐦',
      assessmentType: 'flappy-bird-game',
      categoryId: null,
    }),

    // Phonics Lessons for 2-3 year olds - Lessons 1-8

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 1,
      title: "Phonics: Letter A Sound",
      emoji: '🔊',
      assessmentType: 'letter-a-video-quiz',
      content: `# Learn the Letter A Sound 🅰️

Watch the video to learn about the letter A sound!

## What You'll Learn:
- The sound that the letter A makes
- Words that start with A
- How to form the letter A

After watching the video, you'll practice identifying words that start with the letter A.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 2,
      title: "Phonics: Letter B Sound",
      emoji: '🔊',
      assessmentType: 'letter-b-video-quiz',
      content: `# Learn the Letter B Sound 🅱️

Watch the video to learn about the letter B sound!

## What You'll Learn:
- The sound that the letter B makes
- Words that start with B
- How to form the letter B

After watching the video, you'll practice identifying words that start with the letter B.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 3,
      title: "Phonics: Letter C Sound",
      emoji: '🔊',
      assessmentType: 'letter-c-video-quiz',
      content: `# Learn the Letter C Sound 🅲

Watch the video to learn about the letter C sound!

## What You'll Learn:
- The sound that the letter C makes
- Words that start with C
- How to form the letter C

After watching the video, you'll practice identifying words that start with the letter C.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 4,
      title: "Phonics: Letter D Sound",
      emoji: '🔊',
      assessmentType: 'letter-d-video-quiz',
      content: `# Learn the Letter D Sound 🅳

Watch the video to learn about the letter D sound!

## What You'll Learn:
- The sound that the letter D makes
- Words that start with D
- How to form the letter D

After watching the video, you'll practice identifying words that start with the letter D.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 5,
      title: "Phonics: Letter E Sound",
      emoji: '🔊',
      assessmentType: 'letter-e-video-quiz',
      content: `# Learn the Letter E Sound 🅴

Watch the video to learn about the letter E sound!

## What You'll Learn:
- The sound that the letter E makes
- Words that start with E
- How to form the letter E

After watching the video, you'll practice identifying words that start with the letter E.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 6,
      title: "Phonics: Letter F Sound",
      emoji: '🔊',
      assessmentType: 'letter-f-video-quiz',
      content: `# Learn the Letter F Sound 🅵

Watch the video to learn about the letter F sound!

## What You'll Learn:
- The sound that the letter F makes
- Words that start with F
- How to form the letter F

After watching the video, you'll practice identifying words that start with the letter F.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 7,
      title: "Phonics: Letter G Sound",
      emoji: '🔊',
      assessmentType: 'letter-g-video-quiz',
      content: `# Learn the Letter G Sound 🅶

Watch the video to learn about the letter G sound!

## What You'll Learn:
- The sound that the letter G makes
- Words that start with G
- How to form the letter G

After watching the video, you'll practice identifying words that start with the letter G.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 8,
      title: "Phonics: Letter H Sound",
      emoji: '🔊',
      assessmentType: 'letter-h-video-quiz',
      content: `# Learn the Letter H Sound 🅷

Watch the video to learn about the letter H sound!

## What You'll Learn:
- The sound that the letter H makes
- Words that start with H
- How to form the letter H

After watching the video, you'll practice identifying words that start with the letter H.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 9,
      title: "Phonics: Letter I Sound",
      emoji: '🔊',
      assessmentType: 'letter-i-video-quiz',
      content: `# Learn the Letter I Sound 🅸

Watch the video to learn about the letter I sound!

## What You'll Learn:
- The sound that the letter I makes
- Words that start with I
- How to form the letter I

After watching the video, you'll practice identifying words that start with the letter I.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 10,
      title: "Phonics: Letter J Sound",
      emoji: '🔊',
      assessmentType: 'letter-j-video-quiz',
      content: `# Learn the Letter J Sound

Watch the video to learn about the letter J sound!

## What You'll Learn:
- The sound that the letter J makes
- Words that start with J
- How to form the letter J

After watching the video, you'll practice identifying words that start with the letter J.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 11,
      title: "Phonics: Letter K Sound",
      emoji: '🔊',
      assessmentType: 'letter-k-video-quiz',
      content: `# Learn the Letter K Sound

Watch the video to learn about the letter K sound!

## What You'll Learn:
- The sound that the letter K makes
- Words that start with K
- How to form the letter K

After watching the video, you'll practice identifying words that start with the letter K.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 12,
      title: "Phonics: Letter L Sound",
      emoji: '🔊',
      assessmentType: 'letter-l-video-quiz',
      content: `# Learn the Letter L Sound

Watch the video to learn about the letter L sound!

## What You'll Learn:
- The sound that the letter L makes
- Words that start with L
- How to form the letter L

After watching the video, you'll practice identifying words that start with the letter L.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 13,
      title: "Phonics: Letter M Sound",
      emoji: '🔊',
      assessmentType: 'letter-m-video-quiz',
      content: `# Learn the Letter M Sound

Watch the video to learn about the letter M sound!

## What You'll Learn:
- The sound that the letter M makes
- Words that start with M
- How to form the letter M

After watching the video, you'll practice identifying words that start with the letter M.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 14,
      title: "Phonics: Letter N Sound",
      emoji: '🔊',
      assessmentType: 'letter-n-video-quiz',
      content: `# Learn the Letter N Sound

Watch the video to learn about the letter N sound!

## What You'll Learn:
- The sound that the letter N makes
- Words that start with N
- How to form the letter N

After watching the video, you'll practice identifying words that start with the letter N.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 15,
      title: "Phonics: Letter O Sound",
      emoji: '🔊',
      assessmentType: 'letter-o-video-quiz',
      content: `# Learn the Letter O Sound

Watch the video to learn about the letter O sound!

## What You'll Learn:
- The sound that the letter O makes
- Words that start with O
- How to form the letter O

After watching the video, you'll practice identifying words that start with the letter O.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 16,
      title: "Phonics: Letter P Sound",
      emoji: '🔊',
      assessmentType: 'letter-p-video-quiz',
      content: `# Learn the Letter P Sound

Watch the video to learn about the letter P sound!

## What You'll Learn:
- The sound that the letter P makes
- Words that start with P
- How to form the letter P

After watching the video, you'll practice identifying words that start with the letter P.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 17,
      title: "Phonics: Letter Q Sound",
      emoji: '🔊',
      assessmentType: 'letter-q-video-quiz',
      content: `# Learn the Letter Q Sound 🅠

Watch the video to learn about the letter Q sound!

## What You'll Learn:
- The sound that the letter Q makes
- Words that start with Q
- How to form the letter Q

After watching the video, you'll practice identifying words that start with the letter Q.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 18,
      title: "Phonics: Letter R Sound",
      emoji: '🔊',
      assessmentType: 'letter-r-video-quiz',
      content: `# Learn the Letter R Sound 🅡

Watch the video to learn about the letter R sound!

## What You'll Learn:
- The sound that the letter R makes
- Words that start with R
- How to form the letter R

After watching the video, you'll practice identifying words that start with the letter R.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 19,
      title: "Phonics: Letter S Sound",
      emoji: '🔊',
      assessmentType: 'letter-s-video-quiz',
      content: `# Learn the Letter S Sound 🅢

Watch the video to learn about the letter S sound!

## What You'll Learn:
- The sound that the letter S makes
- Words that start with S
- How to form the letter S

After watching the video, you'll practice identifying words that start with the letter S.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 20,
      title: "Phonics: Letter T Sound",
      emoji: '🔊',
      assessmentType: 'letter-t-video-quiz',
      content: `# Learn the Letter T Sound 🅣

Watch the video to learn about the letter T sound!

## What You'll Learn:
- The sound that the letter T makes
- Words that start with T
- How to form the letter T

After watching the video, you'll practice identifying words that start with the letter T.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 21,
      title: "Phonics: Letter U Sound",
      emoji: '🔊',
      assessmentType: 'letter-u-video-quiz',
      content: `# Learn the Letter U Sound 🅤

Watch the video to learn about the letter U sound!

## What You'll Learn:
- The sound that the letter U makes
- Words that start with U
- How to form the letter U

After watching the video, you'll practice identifying words that start with the letter U.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 22,
      title: "Phonics: Letter V Sound",
      emoji: '🔊',
      assessmentType: 'letter-v-video-quiz',
      content: `# Learn the Letter V Sound 🅥

Watch the video to learn about the letter V sound!

## What You'll Learn:
- The sound that the letter V makes
- Words that start with V
- How to form the letter V

After watching the video, you'll practice identifying words that start with the letter V.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 23,
      title: "Phonics: Letter W Sound",
      emoji: '🔊',
      assessmentType: 'letter-w-video-quiz',
      content: `# Learn the Letter W Sound 🅦

Watch the video to learn about the letter W sound!

## What You'll Learn:
- The sound that the letter W makes
- Words that start with W
- How to form the letter W

After watching the video, you'll practice identifying words that start with the letter W.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 24,
      title: "Phonics: Letter X Sound",
      emoji: '🔊',
      assessmentType: 'letter-x-video-quiz',
      content: `# Learn the Letter X Sound 🅭

Watch the video to learn about the letter X sound!

## What You'll Learn:
- The sound that the letter X makes
- Words that start with X
- How to form the letter X

After watching the video, you'll practice identifying words that start with the letter X.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 25,
      title: "Phonics: Letter Y Sound",
      emoji: '🔊',
      assessmentType: 'letter-y-video-quiz',
      content: `# Learn the Letter Y Sound 🄎

Watch the video to learn about the letter Y sound!

## What You'll Learn:
- The sound that the letter Y makes
- Words that start with Y
- How to form the letter Y

After watching the video, you'll practice identifying words that start with the letter Y.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 26,
      title: "Phonics: Letter Z Sound",
      emoji: '🔊',
      assessmentType: 'letter-z-video-quiz',
      content: `# Learn the Letter Z Sound 🄏

Watch the video to learn about the letter Z sound!

## What You'll Learn:
- The sound that the letter Z makes
- Words that start with Z
- How to form the letter Z

After watching the video, you'll practice identifying words that start with the letter Z.`,
      quizId: null,
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 27,
      title: "English: Letter Matching Game",
      emoji: '🔤',
      assessmentType: 'phonics-game',
      content: `# Letter Matching Game 🔤

Match uppercase and lowercase letters! This game helps you recognize letters in different forms.

## How to Play:
- Look at the uppercase letter shown
- Find its matching lowercase letter
- Drag or tap to match them together

## Letters to Match:
A/a, B/b, C/c, D/d, E/e, F/f, G/g, H/h, I/i, J/j, K/k, L/l, M/m, N/n, O/o, P/p, Q/q, R/r, S/s, T/t, U/u, V/v, W/w, X/x, Y/y, Z/z

## Fun Tip:
Letters can be big (uppercase) like "A" or small (lowercase) like "a" - they're the same letter!`,
      quizId: null,
      categoryId: 'letter-matching',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 28,
      title: "English: Rhyming Words",
      emoji: '🎵',
      assessmentType: 'phonics-game',
      content: `# Rhyming Words 🎵

Find words that sound alike at the end! Rhyming words are fun to say.

## Examples:
- Cat and hat
- Dog and log
- Sun and fun
- Pig and dig

## How to Play:
- Listen to the word
- Choose the word that rhymes with it
- Practice saying the rhyming pairs out loud

## Fun Rhyming Pairs:
- Big and dig
- Hat and bat
- Pen and hen
- Top and hop

## Activity:
Try making up your own rhyming words!`,
      quizId: null,
      categoryId: 'rhyming-words',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 29,
      title: "English: Beginning Sounds",
      emoji: '👂',
      assessmentType: 'phonics-game',
      content: `# Beginning Sounds 👂

Listen carefully! What sound does the word start with?

## How to Play:
- Hear the word spoken aloud
- Look at the pictures
- Choose the picture whose name starts with the same sound

## Examples:
- Apple starts with "A" sound
- Ball starts with "B" sound
- Car starts with "C" sound
- Duck starts with "D" sound

## Practice Words:
- Fish, Goat, Hat, Ice, Jam, Kite, Lion, Mouse, Net, Orange

## Fun Tip:
The first sound you hear in a word is its beginning sound!`,
      quizId: null,
      categoryId: 'beginning-sounds',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 30,
      title: "English: Word Families",
      emoji: '🏠',
      assessmentType: 'phonics-game',
      content: `# Word Families 🏠

Words that rhyme belong to the same word family! They share ending sounds.

## Examples:
- At family: cat, bat, hat, rat
- Ig family: pig, big, dig, fig
- Un family: sun, run, fun, bun
- Ed family: bed, red, fed, led

## How to Play:
- See a word family
- Choose words that belong to that family
- Practice reading the words aloud

## More Word Families:
- An: can, man, pan, fan
- Ot: pot, dot, hot, got
- En: pen, hen, ten, men

## Activity:
Say these words out loud and listen to how they rhyme!`,
      quizId: null,
      categoryId: 'word-families',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 31,
      title: "Letter Fun",
      emoji: '🔤',
      assessmentType: 'sight-word-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 32,
      title: "First Words",
      emoji: '📖',
      assessmentType: 'spelling-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'history',
      lessonNumber: 1,
      title: "Dinosaurs - The First Animals",
      emoji: '🦕',
      content: `# Dinosaurs - The First Animals 🦕



Long, long ago, before people lived, there were dinosaurs!



## What are Dinosaurs?



Dinosaurs were huge animals that lived a very, very long time ago!



- They were bigger than elephants! 🦕

- Some were very tall

- Some were very long

- They lived millions of years ago



## Big Dinosaurs



**T-Rex** 🦖

- Very big and strong

- Had sharp teeth

- Was a meat eater

- Very scary!



**Brachiosaurus** 🦕

- Had a very long neck

- Was very tall

- Ate plants

- Was gentle



## Small Dinosaurs



- Some dinosaurs were small

- Some were as big as chickens

- They all lived together

- Long, long ago!



## Fun Activities



- Draw pictures of dinosaurs

- Make dinosaur sounds

- Learn dinosaur names

- Pretend to be a dinosaur!



## Remember



- Dinosaurs lived long ago

- They were very big animals

- They don't live anymore

- We learn about them from fossils!



## Practice Questions



<!-- QUESTION_START -->
When did dinosaurs live?
<!-- OPTIONS -->
Today|A very, very long time ago, millions of years ago|Last year|Next year
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Dinosaurs lived a very, very long time ago - millions of years ago! They were bigger than elephants!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What did T-Rex eat?
<!-- OPTIONS -->
Plants|Meat|Nothing|Fruits
<!-- CORRECT -->
1
<!-- EXPLANATION -->
T-Rex was a meat eater! It was very big and strong, had sharp teeth, and was very scary!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What did Brachiosaurus eat?
<!-- OPTIONS -->
Meat|Plants|Nothing|Fruits
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Brachiosaurus ate plants! It had a very long neck, was very tall, and was gentle!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
How do we learn about dinosaurs?
<!-- OPTIONS -->
We see them|From fossils|We don't|We guess
<!-- CORRECT -->
1
<!-- EXPLANATION -->
We learn about dinosaurs from fossils! Even though they don't live anymore, we can still learn about them!
<!-- QUESTION_END -->`,
      quizId: 31,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'history',
      lessonNumber: 2,
      title: "Adam and Eve - The First People",
      emoji: '👫',
      content: `# Adam and Eve - The First People 👫



Let's learn about the first people in the world!



## The Garden of Eden



- Adam and Eve lived in a beautiful garden 🌳

- The garden was called Eden

- It was a perfect place

- Everything was good



## Adam and Eve



- Adam was the first man 👨

- Eve was the first woman 👩

- They were the first people

- They lived in the garden together



## The First Family



- Adam and Eve were together

- They took care of the garden

- They were happy

- They were the first family!



## Fun Activities



- Draw the garden of Eden

- Talk about the first people

- Learn about the story

- Draw Adam and Eve



## Remember



- Adam and Eve were the first people

- They lived in a beautiful garden

- They were the first family

- This is a special story!



## Practice Questions



<!-- QUESTION_START -->
Who were the first people?
<!-- OPTIONS -->
No one|Adam and Eve|Moses|Noah
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Adam and Eve were the first people! Adam was the first man, and Eve was the first woman!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Where did Adam and Eve live?
<!-- OPTIONS -->
In a house|In a beautiful garden called Eden|In a cave|In a city
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Adam and Eve lived in a beautiful garden called Eden! It was a perfect place where everything was good!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What did Adam and Eve do in the garden?
<!-- OPTIONS -->
Nothing|Took care of the garden and were happy together|Only played|Only slept
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Adam and Eve were together, took care of the garden, were happy, and they were the first family!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Why is this story special?
<!-- OPTIONS -->
It's not|Adam and Eve were the first people and the first family|It's scary|It's boring
<!-- CORRECT -->
1
<!-- EXPLANATION -->
This is a special story because Adam and Eve were the first people, they lived in a beautiful garden, and they were the first family!
<!-- QUESTION_END -->`,
      quizId: 37,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'history',
      lessonNumber: 4,
      title: "Days of the Week",
      emoji: '📅',
      assessmentType: null, // Uses HTML game instead
      content: `# Days of the Week 📅



There are seven days in a week!



## The Seven Days



1. Monday - Start of the week! 🌟

2. Tuesday - Keep going! 💪

3. Wednesday - Middle of the week! 🎯

4. Thursday - Almost there! ⏰

5. Friday - Fun day! 🎉

6. Saturday - Weekend! 🎊

7. Sunday - Rest day! 😴



## What We Do Each Day



- Monday: School starts! 📚

- Tuesday: Learning new things! 🎓

- Wednesday: Mid-week fun! 🎨

- Thursday: More learning! ✏️

- Friday: End of school week! 🎈

- Saturday: Play time! 🧸

- Sunday: Family time! 👨‍👩‍👧‍👦



## Fun Activities



- Sing the days of the week song

- Point to today on a calendar

- Draw what you do each day

- Count the days until the weekend!



## Remember



- There are 7 days in a week

- Each day has a name

- Days help us know what to do!



## Practice Questions



<!-- QUESTION_START -->
How many days are in a week?
<!-- OPTIONS -->
5|7|10|12
<!-- CORRECT -->
1
<!-- EXPLANATION -->
There are 7 days in a week! Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What day is the start of the week?
<!-- OPTIONS -->
Sunday|Monday|Friday|Saturday
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Monday is the start of the week! Then comes Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What days are the weekend?
<!-- OPTIONS -->
Monday and Tuesday|Saturday and Sunday|Wednesday and Thursday|Friday and Saturday
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Saturday and Sunday are the weekend! Saturday is play time, and Sunday is rest day and family time!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Why are days of the week important?
<!-- OPTIONS -->
They're not|Days help us know what to do and each day has a name|They're boring|They're scary
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Days of the week are important because they help us know what to do! Each day has a name, and we can plan our week!
<!-- QUESTION_END -->`,
      quizId: 33,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'art',
      lessonNumber: 1,
      title: "Simple Art: Red and Blue Shapes",
      emoji: '🎨',
      assessmentType: 'coloring-game',
      content: `# Simple Art: Red and Blue Shapes 🎨

Let's learn our colors!

## Review Colors
- **Red** 🔴
- **Blue** 🔵

## Instructions
1. Select the **Red** color and paint the circle.
2. Select the **Blue** color and paint the square.`,
      quizId: null,
      categoryId: null,
    })

  ];
}

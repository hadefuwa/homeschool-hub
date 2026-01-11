import { Lesson } from '../../models/Lesson.js';

/**
 * Nursery Lessons (Year 0)
 * These are the first lessons in the progression
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
      title: 'Counting to 10',
      emoji: '🔢',
      content: `# Counting to 10

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

## Practice Counting

Count along with me:
- 1, 2, 3, 4, 5, 6, 7, 8, 9, 10!

## Fun Activities

- Count your fingers! How many do you have?
- Count your toes! How many are there?
- Count objects around you: toys, books, crayons!

## Remember

- Numbers help us count things
- We start counting from 1
- 10 is the biggest number we're learning today`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'maths',
      lessonNumber: 2,
      title: 'Counting to 20',
      emoji: '🔢',
      content: `# Counting to 20

Now let's learn to count even higher - from 1 to 20!

## Numbers 1-20

1️⃣ One through 🔟 Ten, then:
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

## Practice Counting

Count along with me:
- 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20!

## Fun Activities

- Count all your fingers and toes together! (That's 20!)
- Count steps as you walk
- Count blocks as you build a tower

## Remember

- After 10, we have 11, 12, 13, and so on
- 20 is a big number!
- Practice counting every day to get better`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 1,
      title: 'Learning the Alphabet',
      emoji: '🔤',
      content: `# Learning the Alphabet 🔤

Let's learn our ABCs!

## The Alphabet Song

A, B, C, D, E, F, G
H, I, J, K, L, M, N, O, P
Q, R, S, T, U, V
W, X, Y, and Z

## Letters A-E

A is for Apple 🍎
B is for Ball ⚽
C is for Cat 🐱
D is for Dog 🐶
E is for Elephant 🐘

## Fun Activities

- Sing the alphabet song together!
- Point to letters in books
- Find letters around the house
- Trace letters with your finger

## Remember

- There are 26 letters in the alphabet
- Each letter has a name and a sound
- We use letters to make words!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 2,
      title: 'Learning Letter Sounds',
      emoji: '🔊',
      content: `# Learning Letter Sounds 🔊

Letters make sounds! Let's learn some!

## Letter Sounds

A says "ah" like in Apple 🍎
B says "buh" like in Ball ⚽
C says "cuh" like in Cat 🐱
D says "duh" like in Dog 🐶
E says "eh" like in Elephant 🐘

## More Sounds

F says "fuh" like in Fish 🐟
G says "guh" like in Goat 🐐
H says "huh" like in Hat 🎩
I says "ih" like in Igloo 🧊
J says "juh" like in Jam 🍓

## Practice

- Make the sound for each letter
- Find things that start with each sound
- Play "I spy" with letter sounds!

## Remember

- Every letter has a sound
- Sounds help us read words
- Practice makes perfect!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'technology',
      lessonNumber: 1,
      title: 'Clicking Game',
      emoji: '🎯',
      content: `Click the Start Game button to begin!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'history',
      lessonNumber: 1,
      title: 'My Family History',
      emoji: '👨‍👩‍👧‍👦',
      content: `# My Family History 👨‍👩‍👧‍👦

Everyone has a family! Let's learn about yours!

## What is a Family?

A family is people who love and care for each other!

- Mummy and Daddy 👨‍👩‍👧‍👦
- Brothers and Sisters 👫
- Grandparents 👴👵
- Aunts and Uncles 👨‍👨‍👧
- Cousins 👨‍👩‍👦

## Family Photos

Look at old family photos together!
- Who is in the picture?
- What were they doing?
- How old were they?

## Fun Activities

- Draw a picture of your family
- Ask grown-ups about when they were little
- Look at baby photos
- Make a family tree with pictures

## Remember

- Families are special
- Everyone has a family history
- Stories from the past are important!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),
  ];
}


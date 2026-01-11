import { Lesson } from '../../models/Lesson.js';

/**
 * Year 1 Lessons
 */
export function getYear1Lessons(startLessonId, startQuizId) {
  let lessonId = startLessonId;
  let quizId = startQuizId;

  return [
    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'maths',
      lessonNumber: 1,
      title: 'Counting to 10',
      emoji: '🔢',
      content: `# Counting to 10

Let's learn to count from 1 to 10!

## Numbers 1-10

1. One
2. Two
3. Three
4. Four
5. Five
6. Six
7. Seven
8. Eight
9. Nine
10. Ten

## Practice

Count your fingers! How many do you have?`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'maths',
      lessonNumber: 2,
      title: 'Adding Numbers',
      emoji: '➕',
      content: `# Adding Numbers

Addition means putting numbers together!

## Examples

- 2 + 3 = 5
- 1 + 4 = 5
- 3 + 2 = 5

## Practice

Try adding: 2 + 2 = ?`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'english',
      lessonNumber: 1,
      title: 'The Alphabet',
      emoji: '🔤',
      content: `# The Alphabet

Let's learn the letters of the alphabet!

## A to Z

A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z

## Practice

Can you say the alphabet out loud?`,
      quizId: quizId++,
      assessmentType: 'test',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'history',
      lessonNumber: 1,
      title: 'Famous People from History',
      emoji: '👑',
      content: `# Famous People from History 👑

Let's learn about important people from the past!

## Queen Elizabeth I

- She was Queen of England 👑
- She lived a long time ago
- She was very brave and clever
- She helped make England strong

## Florence Nightingale

- She was a nurse 🏥
- She helped sick and injured people
- She made hospitals better places
- She is called "The Lady with the Lamp"

## William Shakespeare

- He wrote amazing plays and poems 📚
- He lived in England long ago
- People still read his stories today
- He is one of the most famous writers ever

## Fun Activities

- Draw pictures of famous people
- Act out stories about them
- Write about your favorite
- Make a timeline of when they lived

## Remember

- Famous people did important things
- We can learn from their stories
- History is full of interesting people!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'history',
      lessonNumber: 2,
      title: 'Life Long Ago',
      emoji: '🏰',
      content: `# Life Long Ago 🏰

Life was very different in the past!

## Homes Long Ago

- People lived in different houses 🏠
- No electricity or running water
- Fireplaces for cooking and warmth
- Smaller and simpler homes

## How People Lived

- No cars - people walked or used horses 🐴
- No phones - people wrote letters 📝
- No computers - people read books 📚
- No supermarkets - people grew their own food 🌾

## Schools Long Ago

- Children wrote on slates ✏️
- Teachers were very strict
- Not all children went to school
- Lessons were different

## Fun Activities

- Compare old and new homes
- Draw a house from long ago
- Write about how life has changed
- Make a "then and now" chart

## Remember

- Life has changed a lot over time
- People had different things
- We can learn about the past
- History helps us understand change!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'history',
      lessonNumber: 3,
      title: 'Local History',
      emoji: '🏘️',
      content: `# Local History 🏘️

Let's learn about the history of where we live!

## Your Local Area

- Every place has a history
- Buildings tell stories
- Streets have names with meanings
- Parks and places have pasts

## What to Look For

- Old buildings 🏛️
- Statues and monuments 🗿
- Historical markers 📍
- Old photos of your area 📷

## Famous Places

- Your local library might be old 📚
- Your school might have history 🏫
- Parks might have stories 🌳
- Shops might be in old buildings 🏪

## Fun Activities

- Take a walk and look for old buildings
- Ask grown-ups about local history
- Draw a map of your area
- Write about your favorite local place

## Remember

- History is all around us
- Your local area has stories
- We can learn from the past
- History is everywhere!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'technology',
      lessonNumber: 1,
      title: 'Introduction to Coding',
      emoji: '💻',
      content: `# Introduction to Coding 💻

Coding is like giving instructions to a computer!

## What is Coding?

Coding is writing instructions that tell a computer what to do.

## Simple Instructions

Just like you follow instructions:
- "Put on your shoes" 👟
- "Brush your teeth" 🦷
- "Eat your breakfast" 🍳

Computers follow code instructions:
- "Move forward"
- "Turn right"
- "Say hello"

## Coding Blocks

Some coding uses blocks that you can move around:
- Move blocks
- Turn blocks
- Color blocks
- Sound blocks

## Fun Activities

- Try block-based coding games
- Give instructions to a friend
- Write simple code commands
- Play coding games online

## Remember

- Coding is giving instructions
- Computers follow code exactly
- Coding can be fun!
- Start simple and learn more!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'technology',
      lessonNumber: 2,
      title: 'Using a Mouse and Keyboard',
      emoji: '⌨️',
      content: `# Using a Mouse and Keyboard ⌨️

Let's learn to use computer tools properly!

## The Mouse

- **Left Click** - Select and open things
- **Right Click** - See more options
- **Scroll Wheel** - Move up and down
- **Drag** - Move things around

## The Keyboard

- **Letters** - Type words
- **Numbers** - Type numbers
- **Space Bar** - Make spaces
- **Enter** - Start a new line

## Practice

1. Click on icons
2. Type your name
3. Scroll through pages
4. Drag and drop items

## Fun Activities

- Practice clicking games
- Type simple words
- Play keyboard games
- Create a document

## Remember

- Practice makes perfect
- Be gentle with equipment
- Take your time
- Have fun learning!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'technology',
      lessonNumber: 3,
      title: 'Creating Digital Stories',
      emoji: '📖',
      content: `# Creating Digital Stories 📖

Let's make stories on the computer!

## What is a Digital Story?

A digital story is a story you create using technology!

## Parts of a Story

- **Beginning** - How it starts 📖
- **Middle** - What happens 📚
- **End** - How it finishes 📕

## Adding Pictures

- Draw your own pictures 🎨
- Use clip art
- Add photos
- Make it colorful!

## Adding Words

- Write your story
- Type it on the computer
- Add speech bubbles
- Make it interesting!

## Fun Activities

- Write a story about yourself
- Add pictures to your story
- Share your story with others
- Make a storybook

## Remember

- Stories have a beginning, middle, and end
- Pictures make stories more fun
- You can be creative!
- Digital stories are fun to make!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),
  ];
}


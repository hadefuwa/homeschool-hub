import { Lesson } from '../../models/Lesson.js';

/**
 * Reception Lessons (Year 1)
 */
export function getReceptionLessons(startLessonId, startQuizId) {
  let lessonId = startLessonId;
  let quizId = startQuizId;

  return [
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'maths',
      lessonNumber: 1,
      title: 'Recognising Numbers',
      emoji: '🔢',
      content: `# Recognising Numbers

Let's learn to recognise numbers!

## Numbers 1-5

1️⃣ One
2️⃣ Two
3️⃣ Three
4️⃣ Four
5️⃣ Five

## Practice

Point to the number 3!`,
      quizId: quizId++,
      assessmentType: 'challenge',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 1,
      title: 'Phonics: Letter Sounds',
      emoji: '🔊',
      content: `# Phonics: Letter Sounds 🔤

Let's learn how letters make sounds!

## Basic Letter Sounds

**A** says /a/ like in apple 🍎
**B** says /b/ like in ball ⚽
**C** says /c/ like in cat 🐱
**D** says /d/ like in dog 🐶
**E** says /e/ like in egg 🥚

## Blending Sounds

When we put sounds together, we make words!

- C-A-T = Cat 🐱
- D-O-G = Dog 🐶
- H-A-T = Hat 🎩
- S-U-N = Sun ☀️

## Practice

Try reading these words:
- M-A-T
- P-A-T
- B-A-T
- R-A-T

## Fun Activities

- Sound out words together
- Find objects that start with each sound
- Play phonics games
- Read simple books

## Remember

- Letters make sounds
- Sounds blend to make words
- Practice every day!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 2,
      title: 'Reading Simple Sentences',
      emoji: '📖',
      content: `# Reading Simple Sentences 📖

Let's read simple sentences together!

## Simple Sentences

The cat sat. 🐱
The dog ran. 🐶
I can hop. 🦘
We like to play. 🎮

## More Sentences

I see a sun. ☀️
The hat is red. 🎩
We go to school. 🏫
I like my toy. 🧸

## Reading Tips

1. Look at each word
2. Sound out the letters
3. Blend the sounds together
4. Read the whole sentence

## Fun Activities

- Read sentences together
- Draw pictures for sentences
- Make your own sentences
- Read simple storybooks

## Remember

- Sentences start with a capital letter
- Sentences end with a full stop
- Reading is fun!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 3,
      title: 'Writing My Name',
      emoji: '✏️',
      content: `# Writing My Name ✏️

Let's learn to write your name!

## Your Name is Special

Your name is unique - it belongs to you!

## How to Write Your Name

1. Start with a capital letter
2. Write the rest in lowercase
3. Take your time
4. Practice makes perfect!

## Practice Writing

- Trace your name
- Copy your name
- Write your name from memory
- Write your name in different colors

## Fun Activities

- Write your name on paper
- Write your name in sand or playdough
- Make name cards
- Write your name on drawings

## Remember

- Your name is important
- Practice writing every day
- You can do it!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'history',
      lessonNumber: 1,
      title: 'My Timeline',
      emoji: '📅',
      content: `# My Timeline 📅

Let's make a timeline of your life!

## Important Events

- When you were born 👶
- Your first birthday 🎂
- Learning to walk 🚶
- Starting school 🏫
- Special days and holidays 🎉

## Making a Timeline

1. Draw a line
2. Mark important dates
3. Add pictures or drawings
4. Write what happened

## Fun Activities

- Create your own timeline
- Ask grown-ups about your milestones
- Look at photos from different times
- Draw pictures for each event

## Remember

- Timelines show events in order
- Your life has many important moments
- History is your story!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'history',
      lessonNumber: 2,
      title: 'Seasons and Time',
      emoji: '🍂',
      content: `# Seasons and Time 🍂

The year has four seasons!

## The Four Seasons

**Spring** 🌸
- Flowers bloom
- Baby animals are born
- Weather gets warmer
- Days get longer

**Summer** ☀️
- Hot and sunny
- Time for playing outside
- Longest days
- Holidays and fun!

**Autumn** 🍂
- Leaves change color
- Weather gets cooler
- Harvest time
- Back to school

**Winter** ❄️
- Cold weather
- Shortest days
- Sometimes snow
- Cozy inside time

## Fun Activities

- Draw pictures of each season
- Talk about what you do in each season
- Look at the weather today
- Make a seasons calendar

## Remember

- There are 4 seasons in a year
- Each season is different
- Seasons happen in order!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'history',
      lessonNumber: 3,
      title: 'Old and New',
      emoji: '⏰',
      content: `# Old and New ⏰

Some things are old, some are new!

## Old Things

- Old toys from the past 🧸
- Old photos 📷
- Old books 📚
- Old clothes 👗

## New Things

- New toys 🎮
- New photos on phones 📱
- New books 📖
- New clothes 👕

## Comparing Old and New

- Old cars vs new cars 🚗
- Old phones vs new phones 📱
- Old games vs new games 🎮
- Old houses vs new houses 🏠

## Fun Activities

- Look at old family photos
- Compare old and new objects
- Draw old and new things
- Talk about how things change

## Remember

- Things change over time
- Old things tell us about the past
- New things are being made now!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'technology',
      lessonNumber: 1,
      title: 'Using a Computer',
      emoji: '💻',
      content: `# Using a Computer 💻

Computers help us learn and play!

## Parts of a Computer

- **Screen** - Shows pictures and words 📺
- **Keyboard** - Has letters and numbers ⌨️
- **Mouse** - Helps us click and move 🖱️
- **Buttons** - Turn the computer on and off 🔘

## What Can We Do?

- Play learning games 🎮
- Watch videos 📹
- Draw pictures 🎨
- Learn new things 📚

## Computer Safety

- Ask a grown-up before using
- Don't click on strange things
- Take breaks from the screen
- Be gentle with the computer

## Fun Activities

- Practice using the mouse
- Type your name on the keyboard
- Play educational games
- Draw on the computer

## Remember

- Computers are tools to help us learn
- Always ask for help if needed
- Have fun exploring!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'technology',
      lessonNumber: 2,
      title: 'Digital Drawing',
      emoji: '🎨',
      content: `# Digital Drawing 🎨

Let's draw pictures on the computer!

## Drawing Tools

- **Paintbrush** - Draw lines and shapes 🖌️
- **Colors** - Choose different colors 🎨
- **Shapes** - Draw circles, squares, triangles ⭕
- **Eraser** - Fix mistakes 🧹

## What Can We Draw?

- Your family 👨‍👩‍👧‍👦
- Your favorite animal 🐱
- Your house 🏠
- Your favorite toy 🧸

## Practice

1. Open a drawing program
2. Choose your colors
3. Draw your picture
4. Save your work!

## Fun Activities

- Draw a self-portrait
- Draw your family
- Draw your favorite story
- Make a colorful picture

## Remember

- Digital drawing is fun!
- You can undo mistakes
- Save your artwork
- Practice makes perfect!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'technology',
      lessonNumber: 3,
      title: 'Staying Safe Online',
      emoji: '🛡️',
      content: `# Staying Safe Online 🛡️

It's important to be safe when using technology!

## Safety Rules

1. **Always ask a grown-up** before going online
2. **Never share your name** with strangers
3. **Don't click on pop-ups** or strange links
4. **Tell a grown-up** if something makes you feel uncomfortable

## Safe Things to Do

- Play approved games ✅
- Watch educational videos ✅
- Learn with apps ✅
- Draw and create ✅

## Things to Avoid

- Talking to strangers ❌
- Sharing personal information ❌
- Clicking unknown links ❌
- Being online without permission ❌

## Fun Activities

- Practice asking for permission
- Learn about safe websites
- Talk about online safety
- Make a safety poster

## Remember

- Safety comes first!
- Always ask for help
- Grown-ups are there to protect you
- Technology is fun when used safely!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),
  ];
}


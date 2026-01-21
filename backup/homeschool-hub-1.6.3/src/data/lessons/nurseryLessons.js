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
      content: `# Clicking Game 🎯



Welcome to the Accuracy Clicking Game!



## How to Play



- Click on the red circles as they appear on the screen

- The circles start large and get smaller and faster as time goes on

- You have 30 seconds to score as many points as possible

- Each circle you click gives you 10 points



## Scoring System



- **Bronze**: 0-99 points

- **Silver**: 100-199 points

- **Gold**: 200-299 points

- **Platinum**: 300+ points



## Ready to Play?



Click the button below to start the game!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'technology',
      lessonNumber: 2,
      title: "Keyboard Game",
      emoji: '⌨️',
      content: `# Keyboard Game ⌨️



Welcome to the Keyboard Game!



## How to Play



- Watch for arrows that appear on the screen ⬆️⬇️⬅️➡️

- Press the matching key on your keyboard

- Use **WASD** keys or **Arrow Keys**

- You have 45 seconds to score as many points as possible!

- Each correct key press gives you 10 points



## Controls



- **⬆️ Up Arrow** = Press **↑** or **W**

- **⬇️ Down Arrow** = Press **↓** or **S**

- **⬅️ Left Arrow** = Press **←** or **A**

- **➡️ Right Arrow** = Press **→** or **D**



## Scoring System



- **Bronze**: 0-99 points

- **Silver**: 100-149 points

- **Gold**: 150-199 points

- **Platinum**: 200+ points



## Ready to Play?



Click the button below to start the game!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'technology',
      lessonNumber: 3,
      title: "WASD Game",
      emoji: '⌨️',
      content: `# WASD Game ⌨️

Welcome to the WASD Keyboard Game!

Press the matching keys as letters appear on screen. Use W, A, S, D keys only!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'technology',
      lessonNumber: 4,
      title: "A-Z Game",
      emoji: '🔤',
      content: `# A-Z Game 🔤

Welcome to the A-Z Keyboard Game!

Type the letters A to Z in order as they appear on screen.`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'technology',
      lessonNumber: 5,
      title: "Numbers Game",
      emoji: '🔢',
      content: `# Numbers Game 🔢

Welcome to the Numbers Keyboard Game!

Type the numbers 0 to 9 in order as they appear on screen.`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'technology',
      lessonNumber: 6,
      title: "Symbols Game",
      emoji: '🔣',
      content: `# Symbols Game 🔣

Welcome to the Symbols Keyboard Game!

Type the symbols using Shift + number keys:
- ! = Shift + 1
- " = Shift + 2
- £ = Shift + 3
- $ = Shift + 4
- % = Shift + 5
- ^ = Shift + 6
- & = Shift + 7
- * = Shift + 8
- ( = Shift + 9
- ) = Shift + 0`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'technology',
      lessonNumber: 7,
      title: "Flappy Bird Game",
      emoji: '🐦',
      content: `# Flappy Bird Game (Nursery) 🐦

Super easy mode! Just key tapping fun!

## How to Play

- Press **SPACE** to make the bird jump
- The bird floats very gently
- The pipes are very far apart
- Just try to tap!

## Scoring System

- **Bronze**: 1 point
- **Silver**: 2 points
- **Gold**: 3 points
- **Platinum**: 5+ points

You need at least **Bronze** (1 point) to progress!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    // Phonics Lessons for 2-3 year olds - Lessons 1-8
    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 1,
      title: "Phonics: Vowel Sound Recognition",
      emoji: '🔊',
      content: `# Phonics: Vowel Sound Recognition 🔊

Learn to recognize vowel sounds!

Tap the letters to hear their sounds!`,
      quizId: null,
      assessmentType: 'phonics',
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 2,
      title: "Phonics: Consonant Sound Recognition",
      emoji: '🔊',
      content: `# Phonics: Consonant Sound Recognition 🔊

Learn to recognize consonant sounds!

Tap the letters to hear their sounds!`,
      quizId: null,
      assessmentType: 'phonics',
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 3,
      title: "Phonics: Consonant-Vowel Blending",
      emoji: '🔊',
      content: `# Phonics: Consonant-Vowel Blending 🔊

Learn to blend consonant and vowel sounds together!

Tap the blends to hear them spoken slowly then blended.`,
      quizId: null,
      assessmentType: 'phonics',
      categoryId: 'phonics',
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
      subjectId: 'english',
      lessonNumber: 4,
      title: "Phonics: Vowel-Consonant Blending",
      emoji: '🔊',
      content: `# Phonics: Vowel-Consonant Blending 🔊

Learn to blend vowel and consonant sounds together!

Watch the letters slide together as you hear the sounds!`,
      quizId: null,
      assessmentType: 'phonics',
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 5,
      title: "Phonics: Sound-to-Letter Matching",
      emoji: '🔊',
      content: `# Phonics: Sound-to-Letter Matching 🔊

Match sounds to letters!

Look at the pictures and listen to the starting sounds.`,
      quizId: null,
      assessmentType: 'phonics',
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 6,
      title: "Phonics: Initial Sound Identification",
      emoji: '🔊',
      content: `# Phonics: Initial Sound Identification 🔊

Identify the starting sound of words!

Watch the animated scenes and listen carefully.`,
      quizId: null,
      assessmentType: 'phonics',
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 7,
      title: "Phonics: CVC Word Construction",
      emoji: '🔊',
      content: `# Phonics: CVC Word Construction 🔊

Build simple words by dragging letters!

Listen to the word, then drag letters to build it.`,
      quizId: null,
      assessmentType: 'phonics',
      categoryId: 'phonics',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'english',
      lessonNumber: 8,
      title: "Phonics: Review and Consolidation",
      emoji: '🔊',
      content: `# Phonics: Review and Consolidation 🔊

Review everything you've learned!

Complete mixed activities from all previous lessons.`,
      quizId: null,
      assessmentType: 'phonics',
      categoryId: 'phonics',
    })

  ];
}

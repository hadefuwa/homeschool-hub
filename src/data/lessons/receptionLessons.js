import { Lesson } from '../../models/Lesson.js';

/**
 * Reception Lessons
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
      title: "Recognising Numbers",
      emoji: '🔢',
      content: `# Recognising Numbers 🔢



Let's learn to recognise numbers from 1 to 10!



## How to Play



Tap the numbers to hear them! Then play the game! 🎮



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



## Fun Activities



- Find numbers around you

- Count objects

- Practice recognising numbers!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'maths',
      lessonNumber: 2,
      title: "Counting to 20",
      emoji: '🔢',
      content: `# Counting to 20 🔢

Let's count all the way to 20!

## How to Play

Tap the numbers in order and listen to them.

## Try It

Count objects as you tap: 1, 2, 3 ... 20!`,
      quizId: quizId++,
      assessmentType: 'tap-to-count-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'maths',
      lessonNumber: 3,
      title: "Number Bonds to 5",
      emoji: '🧩',
      content: `# Number Bonds to 5 🧩

Let's make totals of 5.

## How to Play

Drag counters into two groups to make 5.

## Examples

- 2 and 3 make 5
- 4 and 1 make 5`,
      quizId: quizId++,
      assessmentType: 'number-bonds-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'maths',
      lessonNumber: 4,
      title: "Number Bonds to 10",
      emoji: '🧩',
      content: `# Number Bonds to 10 🧩

Let's make totals of 10.

## How to Play

Drag counters into two groups to make 10.

## Examples

- 6 and 4 make 10
- 7 and 3 make 10`,
      quizId: quizId++,
      assessmentType: 'number-bonds-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'maths',
      lessonNumber: 5,
      title: "Compare Quantities",
      emoji: '⚖️',
      content: `# Compare Quantities ⚖️

Let's find which group has more or fewer.

## How to Play

Drag the sign to show which group is greater.

## Words to Know

- More
- Fewer
- Equal`,
      quizId: quizId++,
      assessmentType: 'compare-quantities-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'maths',
      lessonNumber: 6,
      title: "2D Shapes Sorting",
      emoji: '🔷',
      content: `# 2D Shapes Sorting 🔷

Sort shapes by their names.

## How to Play

Drag each shape into the correct box.

## Shapes

- Circle
- Triangle
- Square
- Rectangle`,
      quizId: quizId++,
      assessmentType: 'shape-sorting-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'maths',
      lessonNumber: 7,
      title: "3D Shapes Matching",
      emoji: '🧊',
      content: `# 3D Shapes Matching 🧊

Match the 3D shapes to their names.

## How to Play

Tap the correct name for each shape.

## Shapes

- Cube
- Sphere
- Cylinder
- Cone`,
      quizId: quizId++,
      assessmentType: 'shape-matching-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'maths',
      lessonNumber: 8,
      title: "Patterns and Sequences",
      emoji: '🟡',
      content: `# Patterns and Sequences 🟡

Build repeating patterns.

## How to Play

Drag the next shape or colour to continue the pattern.

## Example

Red, blue, red, blue, ...`,
      quizId: quizId++,
      assessmentType: 'pattern-builder-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'maths',
      lessonNumber: 9,
      title: "Position and Direction",
      emoji: '🧭',
      content: `# Position and Direction 🧭

Learn words like left, right, and behind.

## How to Play

Move the character to follow the directions.

## Words to Know

- Left / Right
- Above / Below
- In front / Behind`,
      quizId: quizId++,
      assessmentType: 'position-direction-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'maths',
      lessonNumber: 10,
      title: "Length and Height",
      emoji: '📏',
      content: `# Length and Height 📏

Compare objects by length and height.

## How to Play

Drag objects into order from shortest to tallest.

## Words to Know

- Shorter / Taller
- Longer / Shorter`,
      quizId: quizId++,
      assessmentType: 'measurement-compare-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'maths',
      lessonNumber: 11,
      title: "Capacity: Full and Empty",
      emoji: '🥤',
      content: `# Capacity: Full and Empty 🥤

Learn about full, empty, and half full.

## How to Play

Fill containers to match the picture.

## Words to Know

- Full
- Half full
- Empty`,
      quizId: quizId++,
      assessmentType: 'capacity-fill-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'maths',
      lessonNumber: 12,
      title: "Time: Daily Routine",
      emoji: '🕒',
      content: `# Time: Daily Routine 🕒

Put the day in order.

## How to Play

Drag the pictures into morning, afternoon, and night.

## Examples

- Breakfast is in the morning.
- Bedtime is at night.`,
      quizId: quizId++,
      assessmentType: 'time-sequence-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'maths',
      lessonNumber: 13,
      title: "Money: Coins to 10p",
      emoji: '🪙',
      content: `# Money: Coins to 10p 🪙

Learn the value of small coins.

## How to Play

Match the coin to its value.

## Coins

- 1p, 2p, 5p, 10p`,
      quizId: quizId++,
      assessmentType: 'coin-match-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'maths',
      lessonNumber: 14,
      title: "Data: Sorting and Pictograms",
      emoji: '📊',
      content: `# Data: Sorting and Pictograms 📊

Sort objects and make a simple pictogram.

## How to Play

Drag each item into a category to build the chart.`,
      quizId: quizId++,
      assessmentType: 'graph-builder-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 1,
      title: "Letter A",
      emoji: '🅰️',
      content: `# Letter A 🅰️\n\nLet's learn the sound of the letter A!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-a',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 2,
      title: "Letter B",
      emoji: '🅱️',
      content: `# Letter B 🅱️\n\nLet's learn the sound of the letter B!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-b',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 3,
      title: "Letter C",
      emoji: '©️',
      content: `# Letter C ©️\n\nLet's learn the sound of the letter C!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-c',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 4,
      title: "Letter D",
      emoji: '🇩',
      content: `# Letter D 🇩\n\nLet's learn the sound of the letter D!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-d',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 5,
      title: "Letter E",
      emoji: '🇪',
      content: `# Letter E 🇪\n\nLet's learn the sound of the letter E!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-e',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 6,
      title: "Letter F",
      emoji: '🇫',
      content: `# Letter F 🇫\n\nLet's learn the sound of the letter F!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-f',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 7,
      title: "Letter G",
      emoji: '🇬',
      content: `# Letter G 🇬\n\nLet's learn the sound of the letter G!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-g',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 8,
      title: "Letter H",
      emoji: '🇭',
      content: `# Letter H 🇭\n\nLet's learn the sound of the letter H!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-h',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 9,
      title: "Letter I",
      emoji: '🇮',
      content: `# Letter I 🇮\n\nLet's learn the sound of the letter I!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-i',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 10,
      title: "Letter J",
      emoji: '🇯',
      content: `# Letter J 🇯\n\nLet's learn the sound of the letter J!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-j',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 11,
      title: "Letter K",
      emoji: '🇰',
      content: `# Letter K 🇰\n\nLet's learn the sound of the letter K!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-k',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 12,
      title: "Letter L",
      emoji: '🇱',
      content: `# Letter L 🇱\n\nLet's learn the sound of the letter L!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-l',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 13,
      title: "Letter M",
      emoji: '🇲',
      content: `# Letter M 🇲\n\nLet's learn the sound of the letter M!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-m',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 14,
      title: "Letter N",
      emoji: '🇳',
      content: `# Letter N 🇳\n\nLet's learn the sound of the letter N!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-n',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 15,
      title: "Letter O",
      emoji: '🇴',
      content: `# Letter O 🇴\n\nLet's learn the sound of the letter O!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-o',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 16,
      title: "Letter P",
      emoji: '🇵',
      content: `# Letter P 🇵\n\nLet's learn the sound of the letter P!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-p',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 17,
      title: "Letter Q",
      emoji: '🇶',
      content: `# Letter Q 🇶\n\nLet's learn the sound of the letter Q!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-q',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 18,
      title: "Letter R",
      emoji: '🇷',
      content: `# Letter R 🇷\n\nLet's learn the sound of the letter R!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-r',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 19,
      title: "Letter S",
      emoji: '🇸',
      content: `# Letter S 🇸\n\nLet's learn the sound of the letter S!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-s',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 20,
      title: "Letter T",
      emoji: '🇹',
      content: `# Letter T 🇹\n\nLet's learn the sound of the letter T!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-t',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 21,
      title: "Letter U",
      emoji: '🇺',
      content: `# Letter U 🇺\n\nLet's learn the sound of the letter U!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-u',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 22,
      title: "Letter V",
      emoji: '🇻',
      content: `# Letter V 🇻\n\nLet's learn the sound of the letter V!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-v',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 23,
      title: "Letter W",
      emoji: '🇼',
      content: `# Letter W 🇼\n\nLet's learn the sound of the letter W!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-w',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 24,
      title: "Letter X",
      emoji: '🇽',
      content: `# Letter X 🇽\n\nLet's learn the sound of the letter X!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-x',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 25,
      title: "Letter Y",
      emoji: '🇾',
      content: `# Letter Y 🇾\n\nLet's learn the sound of the letter Y!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-y',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 26,
      title: "Letter Z",
      emoji: '🇿',
      content: `# Letter Z 🇿\n\nLet's learn the sound of the letter Z!\n\nTap the letter to hear the sound, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'letter-z',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 27,
      title: "Words with 'a'",
      emoji: '🍎',
      content: `# Words with 'a' 🍎\n\nLet's read words with the 'a' sound!\n\nTap the words to hear them, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'cvc-a',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 28,
      title: "Words with 'o'",
      emoji: '🐙',
      content: `# Words with 'o' 🐙\n\nLet's read words with the 'o' sound!\n\nTap the words to hear them, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'cvc-o',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 29,
      title: "Words with 'i'",
      emoji: '🍦',
      content: `# Words with 'i' 🍦\n\nLet's read words with the 'i' sound!\n\nTap the words to hear them, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'cvc-i',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 30,
      title: "Words with 'e'",
      emoji: '🥚',
      content: `# Words with 'e' 🥚\n\nLet's read words with the 'e' sound!\n\nTap the words to hear them, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'cvc-e',
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 31,
      title: "Words with 'u'",
      emoji: '☀️',
      content: `# Words with 'u' ☀️\n\nLet's read words with the 'u' sound!\n\nTap the words to hear them, then play the game! 🎮`,
      quizId: null,
      assessmentType: 'phonics-game',
      categoryId: 'cvc-u',
    }),


    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'history',
      lessonNumber: 1,
      title: "Dinosaurs - Big and Small",
      emoji: '🦖',
      assessmentType: 'html-game',
      content: `# Dinosaurs - Big and Small 🦖

## Learning About Size

Dinosaurs came in different sizes!

- **BIG Dinosaurs** 🦖 - Were very large and lived in caves
- **SMALL Dinosaurs** 🦎 - Were tiny and lived in nests

In the game below, help each dinosaur find its home by dragging it to the right place!

👉 **BIG** dinosaurs go to the **CAVE** ⛰️
👉 **SMALL** dinosaurs go to the **NEST** 🪺

Look at the label on each dinosaur to know its size!`,
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'history',
      lessonNumber: 3,
      title: "Noah's Ark - A Big Boat",
      emoji: '🚢',
      content: `# Noah's Ark - A Big Boat 🚢



Let's learn about Noah and his big boat!



## The Story of Noah



- Noah was a good man

- God told him to build a big boat

- The boat was called an ark

- It was very, very big!



## Building the Ark



- Noah built the ark

- It was made of wood

- It was huge!

- It had rooms for animals



## Animals Coming in Pairs



- Two of every animal came 🐘🐘

- Lions, elephants, birds, and more

- They all came to the ark

- They came in pairs - two of each!



## The Rain and the Flood



- It rained and rained

- Water covered everything

- The ark floated on the water

- Everyone was safe inside



## The Rainbow Promise



- After the rain stopped

- A beautiful rainbow appeared 🌈

- It was a promise

- A promise that it wouldn't flood again



## Fun Activities



- Draw Noah's ark

- Draw animals going into the ark

- Draw a rainbow

- Act out the story



## Remember



- Noah built a big boat

- Animals came in pairs

- The rainbow was a promise

- This is a special story!



## Practice Questions



<!-- QUESTION_START -->
What did God tell Noah to build?
<!-- OPTIONS -->
A house|A big boat called an ark|A car|A plane
<!-- CORRECT -->
1
<!-- EXPLANATION -->
God told Noah to build a big boat called an ark! Noah was a good man, and the ark was very, very big!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
How many of each animal came to the ark?
<!-- OPTIONS -->
One|Two (in pairs)|Three|Four
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Two of every animal came to the ark! Lions, elephants, birds, and more - they all came in pairs, two of each!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What happened when it rained?
<!-- OPTIONS -->
Nothing|Water covered everything and the ark floated|Only a little rain|The ark sank
<!-- CORRECT -->
1
<!-- EXPLANATION -->
It rained and rained, water covered everything, the ark floated on the water, and everyone was safe inside!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What was the rainbow?
<!-- OPTIONS -->
Just pretty|A promise that it wouldn't flood again|Nothing|Just colors
<!-- CORRECT -->
1
<!-- EXPLANATION -->
After the rain stopped, a beautiful rainbow appeared! It was a promise - a promise that it wouldn't flood again!
<!-- QUESTION_END -->`,
      quizId: null,
      assessmentType: 'html-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'history',
      lessonNumber: 4,
      title: "Ancient Stories - The First Cities",
      emoji: '🏛️',
      assessmentType: 'html-game',
      content: `# Ancient Stories - The First Cities 🏛️



Long, long ago, people started living in cities!



## What is a City?



- A city is a place where many people live together

- Cities have lots of houses

- Cities have places to work

- Cities have places to play



## The First Cities



- Long, long ago, people built the first cities

- They were very different from today

- They were smaller

- But they were still cities!



## People Living Together



- In cities, people lived close together

- They helped each other

- They worked together

- They built things together



## Simple Buildings



- The first buildings were simple

- They were made of mud and stone

- They were different from today

- But they were homes!



## Fun Activities



- Draw a simple city

- Talk about what cities need

- Draw buildings

- Learn about the first cities



## Remember



- Cities are places where many people live

- The first cities were long ago

- People lived together

- Cities are important!



## Practice Questions



<!-- QUESTION_START -->
What is a city?
<!-- OPTIONS -->
A small house|A place where many people live together|A forest|A mountain
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A city is a place where many people live together! Cities have lots of houses, places to work, and places to play!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
When were the first cities built?
<!-- OPTIONS -->
Today|Long, long ago|Never|Last year
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Long, long ago, people built the first cities! They were very different from today - they were smaller, but they were still cities!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What did people do in cities?
<!-- OPTIONS -->
Nothing|Lived close together, helped each other, worked together, and built things together|Only played|Only slept
<!-- CORRECT -->
1
<!-- EXPLANATION -->
In cities, people lived close together, helped each other, worked together, and built things together!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What were the first buildings made of?
<!-- OPTIONS -->
Steel|Mud and stone|Plastic|Glass
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The first buildings were simple, made of mud and stone! They were different from today, but they were homes!
<!-- QUESTION_END -->`,
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'history',
      lessonNumber: 5,
      title: "Life Long Ago",
      emoji: '🏠',
      content: `# Life Long Ago 🏠



Life was very different long ago!



## How People Lived



- People lived in different houses 🏠

- Houses were simpler

- No electricity

- No running water



## Different Houses



- Houses were made of different materials

- Some were made of wood

- Some were made of mud

- They were smaller than today



## No Electricity



- There was no electricity

- People used candles for light 🕯️

- They used fireplaces for warmth

- Life was different!



## Different Clothes



- People wore different clothes

- Clothes were simpler

- Made by hand

- Different from today



## Fun Activities



- Compare old and new houses

- Draw a house from long ago

- Talk about how life changed

- Learn about the past



## Remember



- Life was different long ago

- Houses were different

- No electricity

- We can learn about the past!



## Practice Questions



<!-- QUESTION_START -->
What was different about houses long ago?
<!-- OPTIONS -->
They were the same|They were simpler, no electricity, no running water|They were bigger|They were made of glass
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Houses were simpler long ago - no electricity, no running water! They were made of different materials like wood and mud!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What did people use for light long ago?
<!-- OPTIONS -->
Electric lights|Candles|Nothing|The sun only
<!-- CORRECT -->
1
<!-- EXPLANATION -->
There was no electricity! People used candles for light and fireplaces for warmth! Life was different!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What were clothes like long ago?
<!-- OPTIONS -->
The same as today|Simpler and made by hand|Better than today|Made of plastic
<!-- CORRECT -->
1
<!-- EXPLANATION -->
People wore different clothes that were simpler and made by hand! They were different from today!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Why is it important to learn about life long ago?
<!-- OPTIONS -->
It's not|We can learn about the past and see how things changed|It's boring|It's too hard
<!-- CORRECT -->
1
<!-- EXPLANATION -->
We can learn about the past and see how things changed! Life was different long ago, and we can learn from it!
<!-- QUESTION_END -->`,
      quizId: null,
      assessmentType: 'html-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'technology',
      lessonNumber: 1,
      title: "Digital Drawing",
      emoji: '🎨',
      content: `# Digital Drawing 🎨

Draw a square on the canvas!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'technology',
      lessonNumber: 2,
      title: "Digital Drawing",
      emoji: '🎨',
      content: `# Digital Drawing 🎨

Draw a triangle on the canvas!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'technology',
      lessonNumber: 3,
      title: "Digital Drawing",
      emoji: '🎨',
      content: `# Digital Drawing 🎨

Draw a rectangle on the canvas!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'technology',
      lessonNumber: 4,
      title: "Digital Drawing",
      emoji: '🎨',
      content: `# Digital Drawing 🎨

Draw a pentagon on the canvas!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'technology',
      lessonNumber: 5,
      title: "Digital Drawing",
      emoji: '🎨',
      content: `# Digital Drawing 🎨

Draw a hexagon on the canvas!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'technology',
      lessonNumber: 6,
      title: "Digital Drawing",
      emoji: '🎨',
      content: `# Digital Drawing 🎨

Draw an octagon on the canvas!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'technology',
      lessonNumber: 7,
      title: "Flappy Bird Game",
      emoji: '🐦',
      content: `# Flappy Bird Game 🐦

Learn to use the keyboard with this fun game!

## How to Play

- Press **SPACE** to make the bird jump
- Navigate through the pipes
- Try to get as far as possible!

## Scoring System

- **Bronze**: 1-2 points
- **Silver**: 3-5 points
- **Gold**: 6-9 points
- **Platinum**: 10+ points

You need at least **Bronze** (1 point) to progress to the next lesson!`,
      quizId: null,
      assessmentType: 'flappy-bird-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'technology',
      lessonNumber: 8,
      title: "Bubble Pop Game",
      emoji: '🫧',
      assessmentType: 'bubble-pop-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'technology',
      lessonNumber: 9,
      title: "Snake Game",
      emoji: '🐍',
      assessmentType: 'snake-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'technology',
      lessonNumber: 10,
      title: "Target Practice Game",
      emoji: '🎯',
      assessmentType: 'target-practice-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'art',
      lessonNumber: 1,
      title: "Art: Fruit Colors",
      emoji: '🍎',
      assessmentType: 'coloring-game',
      content: `# Art: Fruit Colors 🍎

Let's color some fruit!

## Instructions
- **Apple**: Red 🔴
- **Banana**: Yellow 🍌
- **Leaf**: Green 🍃

Can you make them look real?`,
      quizId: null,
      categoryId: null,
    })

  ];
}

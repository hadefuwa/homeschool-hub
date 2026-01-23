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
      title: "Counting to 10",
      emoji: '🔢',
      content: `# Counting to 10 🔢



Let's learn to count from 1 to 10!



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



- Count your fingers

- Count objects around you

- Practice counting to 10!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'maths',
      lessonNumber: 2,
      title: "Adding Numbers",
      emoji: '➕',
      content: `# Adding Numbers ➕



Let's learn to add numbers together!



## How to Play



Tap the numbers to hear them! Then play the game! 🎮



## What is Addition?



Addition means putting numbers together to make a bigger number!

When we add, we combine two or more numbers to find the total.



## Addition Examples



2️⃣ + 3️⃣ = 5️⃣

Two plus three equals five!



4️⃣ + 1️⃣ = 5️⃣

Four plus one equals five!



3️⃣ + 2️⃣ = 5️⃣

Three plus two equals five!



1️⃣ + 1️⃣ = 2️⃣

One plus one equals two!



2️⃣ + 2️⃣ = 4️⃣

Two plus two equals four!



3️⃣ + 1️⃣ = 4️⃣

Three plus one equals four!



## Fun Activities



- Practice adding small numbers

- Use objects to help you add

- Count your fingers to add

- Play the addition game!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'maths',
      lessonNumber: 3,
      title: "Place Value to 20",
      emoji: '🔟',
      content: `# Place Value to 20 🔟

Let's build numbers with tens and ones.

## How to Play

Drag tens and ones to make the number shown.

## Example

14 = 1 ten and 4 ones`,
      quizId: quizId++,
      assessmentType: 'place-value-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'maths',
      lessonNumber: 4,
      title: "Place Value to 100",
      emoji: '🔢',
      content: `# Place Value to 100 🔢

Build numbers using tens and ones!

## What You'll See

- **Target number** at the top (like 37)
- **Empty slots** for tens and ones
- **Draggable cards** with numbers to choose from

## How to Play

1. Look at the target number
2. Drag the correct **tens** card to the tens slot
3. Drag the correct **ones** card to the ones slot
4. Watch the visual blocks build your number!

## Understanding Place Value

**37** means:
- **3 tens** = 30 (three groups of 10 blocks)
- **7 ones** = 7 (seven single blocks)

The blocks will show you exactly what each number looks like!

## Tips

- The tens digit shows how many groups of 10
- The ones digit shows how many single blocks
- You'll see the blocks appear as you drag the cards`,
      quizId: quizId++,
      assessmentType: 'html-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'maths',
      lessonNumber: 5,
      title: "Add and Subtract within 20",
      emoji: '+',
      content: `# Add and Subtract within 20 +

Use blocks to add and subtract.

## How to Play

Count the blocks and pick the correct answer.

## Examples

- 9 + 5 = 14
- 16 - 7 = 9`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'maths',
      lessonNumber: 6,
      title: "Count in 2s, 5s, and 10s",
      emoji: '🔁',
      content: `# Count in 2s, 5s, and 10s 🔁

Let's practise skip counting.

## How to Play

Tap the next number in the sequence.

## Sequences

- 2, 4, 6, 8, 10
- 5, 10, 15, 20
- 10, 20, 30, 40`,
      quizId: quizId++,
      assessmentType: 'skip-counting-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'maths',
      lessonNumber: 7,
      title: "Fractions: Halves and Quarters",
      emoji: '🍰',
      content: `# Fractions: Halves and Quarters 🍰

Find halves and quarters of shapes.

## How to Play

Match the shaded shape to the fraction.

## Examples

- Half is 1 out of 2 equal parts
- Quarter is 1 out of 4 equal parts`,
      quizId: quizId++,
      assessmentType: 'fraction-match-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'maths',
      lessonNumber: 8,
      title: "Time: O'Clock and Half Past",
      emoji: '🕒',
      content: `# Time: O'Clock and Half Past 🕒

Tell the time to the hour and half hour.

## How to Play

Drag the clock hands to match the time.

## Examples

- 3 o'clock
- Half past 7`,
      quizId: quizId++,
      assessmentType: 'clock-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'maths',
      lessonNumber: 9,
      title: "Money: Coins to £1",
      emoji: '💷',
      content: `# Money: Coins to £1 💷

Make totals using coins.

## How to Play

Drag coins to make the given amount.

## Coins

- 1p, 2p, 5p, 10p, 20p, 50p, £1`,
      quizId: quizId++,
      assessmentType: 'money-drag-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'maths',
      lessonNumber: 10,
      title: "Length and Mass",
      emoji: '📏',
      content: `# Length and Mass 📏

Compare objects by length and mass.

## How to Play

Drag items to sort from lightest to heaviest or shortest to longest.`,
      quizId: quizId++,
      assessmentType: 'measurement-compare-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'maths',
      lessonNumber: 11,
      title: "2D and 3D Shapes",
      emoji: '🧊',
      content: `# 2D and 3D Shapes 🧊

Match shapes to their names.

## How to Play

Tap the correct name for each shape.

## Shapes

- Circle, square, triangle, rectangle
- Cube, sphere, cylinder, cone`,
      quizId: quizId++,
      assessmentType: 'shape-matching-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'maths',
      lessonNumber: 12,
      title: "Patterns",
      emoji: '🟣',
      content: `# Patterns 🟣

Continue the pattern.

## How to Play

Drag the missing shape or colour to finish the pattern.`,
      quizId: quizId++,
      assessmentType: 'pattern-builder-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'maths',
      lessonNumber: 13,
      title: "Data: Pictograms",
      emoji: '📊',
      content: `# Data: Pictograms 📊

Build a pictogram from a set of items.

## How to Play

Drag items into the chart and compare totals.`,
      quizId: quizId++,
      assessmentType: 'graph-builder-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'maths',
      lessonNumber: 14,
      title: "Large Multiplication (3-4 Digit Numbers)",
      emoji: 'x',
      content: `# Large Multiplication (3-4 Digit Numbers)

Try some bigger multiplication questions.

## How to Play

Choose the correct answer.

## Examples

- 312 x 47
- 4,208 x 306`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'maths',
      lessonNumber: 15,
      title: "Large Division (3-4 Digit Numbers)",
      emoji: '/',
      content: `# Large Division (3-4 Digit Numbers)

Try some bigger division questions.

## How to Play

Choose the correct answer.

## Examples

- 1,248 ÷ 24
- 9,504 ÷ 72`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'maths',
      lessonNumber: 16,
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
      lessonNumber: 17,
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

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'english',
      lessonNumber: 1,
      title: "Sentence Scramble",
      emoji: '📝',
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'english',
      lessonNumber: 2,
      title: "Missing Vowel Game",
      emoji: '🤔',
      assessmentType: 'missing-vowel-game',
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'english',
      lessonNumber: 3,
      title: "The Tale of Peter Rabbit",
      emoji: '🐰',
      content: `# The Tale of Peter Rabbit

This is a story about a naughty rabbit named Peter.

## Peter's Adventure

Once upon a time there were four little Rabbits, and their names were Flopsy, Mopsy, Cotton-tail, and Peter.

Their mother told them, "You may go into the fields or down the lane, but don't go into Mr. McGregor's garden!"

Flopsy, Mopsy, and Cotton-tail were good little bunnies and went down the lane to gather blackberries.

But Peter, who was very naughty, ran straight away to Mr. McGregor's garden!

He ate some lettuces and some French beans; and then he ate some radishes. And then, feeling rather sick, he went to look for some parsley.

But round the end of a cucumber frame, whom should he meet but Mr. McGregor!

Mr. McGregor was on his hands and knees planting out young cabbages, but he jumped up and ran after Peter, waving a rake and calling out, ‘Stop thief!’

Peter was most dreadfully frightened; he rushed all over the garden, for he had forgotten the way back to the gate.

After a long chase, Peter finally found the gate and slipped underneath. He ran home as fast as he could go.

## Watch the Story

You can watch the story of Peter Rabbit here:

https://www.youtube.com/watch?v=p-c-y3fK8fo
      `,
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'history',
      lessonNumber: 1,
      title: "Dinosaurs - When They Lived",
      emoji: '🦕',
      assessmentType: 'html-game',
      content: `# Dinosaurs - When They Lived 🦕



Let's learn about when dinosaurs lived!



## When Dinosaurs Lived



- Dinosaurs lived millions of years ago

- That's a very, very long time!

- Before people existed

- Long before your grandparents were born



## Different Periods



**Triassic Period**

- The first dinosaurs

- Started about 250 million years ago

- Dinosaurs were smaller then



**Jurassic Period**

- Dinosaurs got bigger

- Famous dinosaurs like Brachiosaurus

- Many different types



**Cretaceous Period**

- Last period of dinosaurs

- T-Rex lived then

- Dinosaurs disappeared at the end



## Dinosaur Fossils



- Fossils are what's left of dinosaurs

- Bones turned to stone

- Scientists find them

- They tell us about dinosaurs



## How We Know About Dinosaurs



- Scientists study fossils

- They put bones together

- They learn how dinosaurs lived

- They teach us about the past



## Fun Activities



- Learn about different periods

- Draw dinosaurs from each period

- Make a timeline

- Learn about fossils



## Remember



- Dinosaurs lived millions of years ago

- There were different periods

- Fossils tell us about them

- We can learn from the past!



## Practice Questions



<!-- QUESTION_START -->
When did dinosaurs live?
<!-- OPTIONS -->
A few years ago|Hundreds of years ago|Millions of years ago|Last year
<!-- CORRECT -->
2
<!-- EXPLANATION -->
Dinosaurs lived millions of years ago! That's a very, very long time - before people existed!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What period did T-Rex live in?
<!-- OPTIONS -->
Triassic Period|Jurassic Period|Cretaceous Period|Modern Period
<!-- CORRECT -->
2
<!-- EXPLANATION -->
T-Rex lived in the Cretaceous Period, which was the last period of dinosaurs before they disappeared!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What are fossils?
<!-- OPTIONS -->
Living dinosaurs|Bones that turned to stone|Modern animals|Rocks
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Fossils are what's left of dinosaurs - bones that turned to stone! Scientists find them and learn about dinosaurs!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What do scientists do with fossils?
<!-- OPTIONS -->
Nothing|Study them and put bones together|Throw them away|Hide them
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Scientists study fossils, put bones together, and learn how dinosaurs lived. They teach us about the past!
<!-- QUESTION_END -->`,
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'history',
      lessonNumber: 2,
      title: "Ancient Egypt - Pyramids and Pharaohs",
      emoji: '🏺',
      content: `# Ancient Egypt - Pyramids and Pharaohs 🏺

## Welcome to the Pharaoh's Tomb! 🐪

Long ago in Ancient Egypt, powerful kings called **Pharaohs** ruled the land. When they died, they were buried in magnificent **pyramids** with all their treasures!

### Your Mission:
🔍 Explore the tomb and find **3 hidden treasures**
👑 Tap on different containers to see what's inside
💎 Look for jewels, crowns, and golden artifacts
⚠️ Be careful - not everything in the tomb is treasure!

Listen carefully as each item is revealed. Can you find all the Pharaoh's treasures?

**Tap the containers below to start your adventure!**`,
      quizId: null,
      assessmentType: 'html-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'history',
      lessonNumber: 3,
      title: "Life Long Ago vs. Life Now",
      emoji: '🏰',
      content: `# Life Long Ago vs. Life Now 🏰



Let's compare life in the past and life today!



## Homes Then and Now



**Long Ago:**

- Smaller houses

- No electricity

- Fireplaces for warmth

- Simple furniture



**Now:**

- Bigger houses

- Electricity everywhere

- Central heating

- Modern furniture



## Transport Then and Now



**Long Ago:**

- People walked 🚶

- Used horses 🐴

- Carriages

- Very slow



**Now:**

- Cars 🚗

- Trains 🚂

- Planes ✈️

- Very fast!



## Schools Then and Now



**Long Ago:**

- Wrote on slates ✏️

- Very strict teachers

- Not all children went

- Different lessons



**Now:**

- Use computers 💻

- Friendly teachers

- All children go

- Many subjects



## Technology Changes



**Long Ago:**

- No phones

- No computers

- No TV

- Letters for communication



**Now:**

- Smartphones 📱

- Computers everywhere

- TV and internet

- Instant communication



## Fun Activities



- Compare old and new homes

- Draw "then and now" pictures

- Write about changes

- Make a comparison chart



## Remember



- Life has changed a lot

- Technology changed everything

- We can learn from the past

- History shows us change!



## Practice Questions



<!-- QUESTION_START -->
How did people travel long ago?
<!-- OPTIONS -->
By car|By walking and using horses|By plane|By train
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Long ago, people walked and used horses! They had carriages, but travel was very slow compared to today!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What did children write on in school long ago?
<!-- OPTIONS -->
Computers|Tablets|Slates|Paper
<!-- CORRECT -->
2
<!-- EXPLANATION -->
Long ago, children wrote on slates! Now we use computers. Schools have changed a lot!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What did homes have long ago for warmth?
<!-- OPTIONS -->
Central heating|Fireplaces|Electric heaters|Air conditioning
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Long ago, homes had fireplaces for warmth! There was no electricity, so they used fire to keep warm!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
How do we communicate now compared to long ago?
<!-- OPTIONS -->
By letters only|By instant communication with phones and internet|By shouting|By smoke signals
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Now we have instant communication with smartphones, computers, and the internet! Long ago, people sent letters which took a long time!
<!-- QUESTION_END -->`,
      quizId: null,
      assessmentType: 'html-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'history',
      lessonNumber: 4,
      title: "Famous People from History",
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



## What Made Them Special



- They did important things

- They helped others

- They changed the world

- We remember them today



## Fun Activities



- Draw pictures of famous people

- Act out stories about them

- Write about your favorite

- Make a timeline of when they lived



## Remember



- Famous people did important things

- We can learn from their stories

- History is full of interesting people

- They inspire us today!



## Practice Questions



<!-- QUESTION_START -->
Who was Queen Elizabeth I?
<!-- OPTIONS -->
A nurse|A writer|Queen of England|A scientist
<!-- CORRECT -->
2
<!-- EXPLANATION -->
Queen Elizabeth I was Queen of England! She lived a long time ago, was very brave and clever, and helped make England strong!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What was Florence Nightingale known for?
<!-- OPTIONS -->
Being a queen|Being a nurse who helped people|Being a writer|Being a soldier
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Florence Nightingale was a nurse who helped sick and injured people! She made hospitals better places and is called "The Lady with the Lamp"!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What did William Shakespeare do?
<!-- OPTIONS -->
Was a king|Wrote amazing plays and poems|Was a nurse|Was a soldier
<!-- CORRECT -->
1
<!-- EXPLANATION -->
William Shakespeare wrote amazing plays and poems! He lived in England long ago, and people still read his stories today!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Why do we remember famous people from history?
<!-- OPTIONS -->
They were rich|They did important things and helped others|They were tall|They were old
<!-- CORRECT -->
1
<!-- EXPLANATION -->
We remember famous people because they did important things, helped others, changed the world, and inspire us today!
<!-- QUESTION_END -->`,
      quizId: null,
      assessmentType: 'html-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'history',
      lessonNumber: 5,
      title: "Local History",
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



## How to Learn About Local History



- Ask grown-ups

- Visit local museums

- Look at old photos

- Read about your area



## Fun Activities



- Take a walk and look for old buildings

- Ask grown-ups about local history

- Draw a map of your area

- Write about your favorite local place



## Remember



- History is all around us

- Your local area has stories

- We can learn from the past

- History is everywhere!



## Practice Questions



<!-- QUESTION_START -->
What can tell us about local history?
<!-- OPTIONS -->
Only new buildings|Old buildings, statues, monuments, and old photos|Only trees|Only cars
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Old buildings, statues, monuments, and old photos can tell us about local history! Every place has a history!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Where can you learn about local history?
<!-- OPTIONS -->
Only at home|At local museums, by asking grown-ups, and looking at old photos|Only at school|Only in books
<!-- CORRECT -->
1
<!-- EXPLANATION -->
You can learn about local history at local museums, by asking grown-ups, looking at old photos, and reading about your area!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What might have history in your local area?
<!-- OPTIONS -->
Only new buildings|Your library, school, parks, and shops in old buildings|Only cars|Only trees
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Your local library, school, parks, and shops in old buildings might have history! History is all around us!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Why is it important to learn about local history?
<!-- OPTIONS -->
It's not important|It helps us understand our area and learn from the past|It's boring|It's too hard
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Learning about local history helps us understand our area and learn from the past! History is everywhere and full of interesting stories!
<!-- QUESTION_END -->`,
      quizId: 45,
      assessmentType: 'local-history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'technology',
      lessonNumber: 1,
      title: "Blockly Puzzle",
      emoji: '🧩',
      content: `# Blockly Puzzle 🧩

Learn to code with Blockly Games!

In Puzzle, you'll learn the basics of programming by connecting blocks together to solve puzzles.

## Instructions

- Drag blocks from the toolbox to the workspace
- Connect blocks together to create programs
- Click "Run" to see your program in action
- Complete each puzzle to move to the next level

Have fun learning to code!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'technology',
      lessonNumber: 2,
      title: "Blockly Maze",
      emoji: '🗺️',
      content: `# Blockly Maze 🗺️

Navigate through mazes using code!

In Maze, you'll learn to use loops and conditionals to guide a character through mazes.

## Instructions

- Use movement blocks to navigate
- Try using loops to repeat actions
- Use conditionals to make decisions
- Complete each maze to unlock the next one

Challenge yourself to use fewer blocks!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'technology',
      lessonNumber: 3,
      title: "Blockly Bird",
      emoji: '🐦',
      content: `# Blockly Bird 🐦

Help the bird catch worms!

In Bird, you'll learn about conditionals and loops by helping a bird catch worms while avoiding obstacles.

## Instructions

- Use conditionals to check for worms
- Use loops to repeat actions
- Guide the bird to catch all the worms
- Avoid obstacles and complete each level

Think carefully about your code!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'technology',
      lessonNumber: 4,
      title: "Blockly Turtle",
      emoji: '🐢',
      content: `# Blockly Turtle 🐢

Draw pictures with code!

In Turtle, you'll learn to draw shapes and patterns by programming a turtle to move and draw.

## Instructions

- Use movement blocks to move the turtle
- Use drawing blocks to create lines
- Try using loops to create patterns
- Experiment with angles and distances

Create beautiful art with code!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'technology',
      lessonNumber: 5,
      title: "Blockly Movie",
      emoji: '🎬',
      content: `# Blockly Movie 🎬

Create animations with code!

In Movie, you'll learn to create animations by programming characters to move and interact.

## Instructions

- Use blocks to control character movement
- Create sequences of actions
- Use timing blocks to control speed
- Make your own animated stories

Bring your stories to life!

## Note

You may see console messages about "Pixel errors" or "Canvas2D" - these are normal! Blockly Movie checks your animation frame-by-frame to see if it matches the target. These messages don't affect the game.`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'technology',
      lessonNumber: 6,
      title: "Blockly Pond Tutor",
      emoji: '🦆',
      content: `# Blockly Pond Tutor 🦆

Learn JavaScript with visual blocks!

In Pond Tutor, you'll learn JavaScript programming concepts using visual blocks that translate to real code.

## Instructions

- Follow the tutorial to learn JavaScript
- See how blocks translate to code
- Complete exercises to practice
- Build your programming skills

Learn real programming concepts!

## Note

You may see console messages about "play() request was interrupted" - these are normal! Blockly Games preloads sound effects, which can trigger browser warnings. These messages don't affect the game and you can safely ignore them.`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'technology',
      lessonNumber: 7,
      title: "Blockly Pond",
      emoji: '🌊',
      content: `# Blockly Pond 🌊

Write JavaScript code to compete!

In Pond, you'll write JavaScript code to compete in a duck racing game.

## Instructions

- Write JavaScript code directly
- Use functions and variables
- Optimize your code for speed
- Compete with others or yourself

Master JavaScript programming!

## Note

You may see console messages about "play() request was interrupted" or "createRadialGradient" - these are normal! Blockly Games preloads sound effects and creates visual effects that can trigger browser warnings. These messages don't affect the game and you can safely ignore them.`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'technology',
      lessonNumber: 8,
      title: "TapTapTap: Beginner Level 1",
      emoji: '👆',
      assessmentType: 'taptaptap-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'technology',
      lessonNumber: 9,
      title: "TapTapTap: Beginner Level 2",
      emoji: '👆',
      assessmentType: 'taptaptap-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'technology',
      lessonNumber: 10,
      title: "Flappy Bird Game",
      emoji: '🐦',
      assessmentType: 'flappy-bird-game',
      categoryId: null,
    }),
    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'english',
      lessonNumber: 1,
      title: "Adjective Adventure",
      emoji: '🌟',
      assessmentType: 'parts-of-speech-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'english',
      lessonNumber: 2,
      title: "Spelling Safari",
      emoji: '🦁',
      assessmentType: 'spelling-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'english',
      lessonNumber: 3,
      title: "Prefix Power",
      emoji: '🔌',
      assessmentType: 'prefix-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'english',
      lessonNumber: 4,
      title: "Suffix Superstars",
      emoji: '🚀',
      assessmentType: 'suffix-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'art',
      lessonNumber: 1,
      title: "Art: Day and Night",
      emoji: '🌗',
      assessmentType: 'coloring-game',
      content: `# Art: Day and Night 🌗

Color the scene for Day and Night!

## Colors
- **Sun**: Yellow ☀️
- **Day Sky**: Light Blue 🌤️
- **Moon**: White/Grey 🌕
- **Night Sky**: Dark Blue 🌙`,
      quizId: null,
      categoryId: null,
    })

  ];
}

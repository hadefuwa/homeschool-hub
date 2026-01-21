import { Lesson } from '../../models/Lesson.js';

/**
 * Year 3 Lessons
 */
export function getYear3Lessons(startLessonId, startQuizId) {
  let lessonId = startLessonId;
  let quizId = startQuizId;

  return [
    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 1,
      title: "Multiplication Tables",
      emoji: '✖️',
      content: `# Multiplication Tables ✖️



Let's learn our times tables!



## How to Play



Tap the numbers to hear them! Then play the game! 🎮



## What is Multiplication?



Multiplication is a quick way to add the same number many times!



2 × 3 = 2 + 2 + 2 = 6



## Practice



- Learn the 2 times table

- Learn the 5 times table

- Learn the 10 times table

- Play the multiplication game!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'english',
      lessonNumber: 1,
      title: "The Wonderful World of Lewis Carroll",
      emoji: '🎩',
      content: `# The Wonderful World of Lewis Carroll

Lewis Carroll was the pen name of Charles Lutwidge Dodgson, a mathematician who became famous for his wonderfully imaginative stories.

## Alice's Adventures in Wonderland

This is his most famous book, telling the story of a girl named Alice who falls down a rabbit hole into a fantasy world of peculiar creatures.

## Wordplay and Nonsense

Carroll loved to play with words and logic. His stories are full of puns, riddles, and poems that don't always make sense—and that's what makes them so much fun!

For example, the Cheshire Cat slowly disappears until only its grin is left. This is a clever play on the phrase "to grin like a Cheshire cat."

## Famous Characters

- **Alice**: A curious and sensible girl who is often confused by Wonderland.
- **The White Rabbit**: Always in a hurry, shouting, "Oh dear! Oh dear! I shall be too late!"
- **The Mad Hatter**: A silly character who loves tea parties and riddles.
- **The Queen of Hearts**: A grumpy queen who is always shouting, "Off with their heads!"

## Watch a Clip

Here is a clip from Disney's *Alice in Wonderland*:

https://www.youtube.com/watch?v=Fov2sWE6G1I
      `,
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'english',
      lessonNumber: 2,
      title: "Parts of Speech Game",
      emoji: '💡',
      assessmentType: 'parts-of-speech-game',
      content: `# Parts of Speech Game 💡

Let's play a fun game to learn about parts of speech!

## What are Parts of Speech?

Words in sentences play different roles. These roles are called "Parts of Speech". The main ones are:
- **Nouns**: Names of people, places, animals, or things. (e.g., *girl*, *park*, *dog*, *book*)
- **Verbs**: Action words or state of being. (e.g., *run*, *eat*, *is*, *are*)
- **Adjectives**: Words that describe nouns. (e.g., *big*, *happy*, *red*)
- **Adverbs**: Words that describe verbs, adjectives, or other adverbs. They often end in -ly. (e.g., *quickly*, *very*, *loudly*)

## How to Play

- A sentence will appear on the screen.
- A word in the sentence will be highlighted.
- Choose the correct part of speech for the highlighted word from the options below.
- See how many you can get right!
      `,
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 2,
      title: "Division Basics",
      emoji: '➗',
      content: `# Division Basics ➗



Let's learn about division!



## How to Play



Tap the numbers to hear them! Then play the game! 🎮



## What is Division?



Division is sharing or grouping numbers!

When we divide, we split a number into equal groups.



## Examples



8 ÷ 2 = 4

This means: 8 shared equally into 2 groups = 4 in each group



10 ÷ 5 = 2

This means: 10 shared equally into 5 groups = 2 in each group



12 ÷ 3 = 4

This means: 12 shared equally into 3 groups = 4 in each group



## Practice



- Learn to divide by 2, 3, 4, and 5

- Practice sharing numbers equally

- Play the division game! 🎮`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 3,
      title: "Fractions Introduction",
      emoji: '🍕',
      content: `# Fractions Introduction 🍕



Let's learn about fractions!



## How to Play



Tap the numbers to hear them! Then play the game! 🎮



## What is a Fraction?



A fraction shows part of a whole!



## Common Fractions



- Half (½) - One part out of two

- Quarter (¼) - One part out of four

- Third (⅓) - One part out of three



## Examples



- Half a pizza 🍕 = ½

- Quarter of a cake 🎂 = ¼

- Third of a chocolate bar 🍫 = ⅓



## Fun Activities



- Practice with fractions

- Draw fraction pictures

- Play the fraction game!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 4,
      title: "Subtraction Stories",
      emoji: '📖',
      content: `# Subtraction Stories 📖



Let's solve subtraction problems through fun stories with pictures!



## Story 1: The Cookie Jar 🍪



Emma had 12 cookies in her cookie jar. Her friend Tom came over and ate 5 cookies. How many cookies are left?



**Visual Representation:**



🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪  (12 cookies)



Tom ate 5 cookies: ❌ ❌ ❌ ❌ ❌



**Let's solve it step by step:**



**Start:**     🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪  = 12

**Eaten:**     ❌ ❌ ❌ ❌ ❌                      = -5

**Left:**      🍪 🍪 🍪 🍪 🍪 🍪 🍪              = 7



**Answer:** 12 - 5 = **7 cookies left!** 🎉



## Story 2: The Toy Box 🧸



Jake had 15 toy cars. He gave 8 toy cars to his little sister. How many toy cars does Jake have now?



**Visual Representation:**



🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗  (15 toy cars)



Given away: 🎁 🎁 🎁 🎁 🎁 🎁 🎁 🎁  (8 toy cars)



**Visual Calculation:**



**Start:**     🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗  = 15

**Given:**     🎁 🎁 🎁 🎁 🎁 🎁 🎁 🎁                      = -8

**Left:**      🚗 🚗 🚗 🚗 🚗 🚗 🚗                          = 7



**Answer:** 15 - 8 = **7 toy cars left!** 🎉



## Story 3: The Garden Flowers 🌸



There were 20 flowers in the garden. The wind blew away 6 flowers. How many flowers are still in the garden?



**Visual Representation:**



🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸  (20 flowers)



Blown away: 💨 💨 💨 💨 💨 💨  (6 flowers)



**Visual Calculation:**



**Start:**     🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸  = 20

**Blown:**     💨 💨 💨 💨 💨 💨                                      = -6

**Left:**      🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸 🌸            = 14



**Answer:** 20 - 6 = **14 flowers remaining!** 🌸



## Practice Questions



<!-- QUESTION_START -->
Sarah had 18 stickers. She used 9 stickers to decorate her notebook. How many stickers does Sarah have left?
<!-- OPTIONS -->
7 stickers|8 stickers|9 stickers|10 stickers
<!-- CORRECT -->
2
<!-- EXPLANATION -->
18 - 9 = 9. Sarah has 9 stickers left!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
A library had 25 books on the shelf. Students borrowed 7 books. How many books are still on the shelf?
<!-- OPTIONS -->
16 books|17 books|18 books|19 books
<!-- CORRECT -->
2
<!-- EXPLANATION -->
25 - 7 = 18. There are 18 books still on the shelf!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
There were 14 birds in a tree. 5 birds flew away. How many birds are still in the tree?
<!-- OPTIONS -->
7 birds|8 birds|9 birds|10 birds
<!-- CORRECT -->
2
<!-- EXPLANATION -->
14 - 5 = 9. There are 9 birds still in the tree!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is 16 - 8?
<!-- OPTIONS -->
6|7|8|9
<!-- CORRECT -->
2
<!-- EXPLANATION -->
16 - 8 = 8. When you take away 8 from 16, you get 8!
<!-- QUESTION_END -->



## Tips for Subtraction



- Draw pictures to help you visualize

- Count backwards if it helps

- Use your fingers to count

- Check your answer by adding: if 12 - 5 = 7, then 7 + 5 should equal 12!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 5,
      title: "Shapes and Patterns",
      emoji: '🔷',
      content: `# Shapes and Patterns 🔷



Let's explore shapes and discover patterns with visual examples!



## Common Shapes



### Square ⬜



**Visual Properties:**



⬜⬜⬜

⬜⬜⬜

⬜⬜⬜



- Has **4 equal sides** ↔️ ↔️ ↔️ ↔️

- Has **4 corners** (vertices) 📍 📍 📍 📍

- All angles are the same (90°)

- **Examples:** 🪟 windows, 🧩 tiles, 📱 picture frames



### Circle ⭕



**Visual Properties:**



    ⭕

  ⭕ ⭕ ⭕

    ⭕



- **Round shape** - perfectly curved

- **No corners** - smooth all around

- All points are the same distance from the center

- **Examples:** 🎡 wheels, 🪙 coins, 🍽️ plates



### Triangle 🔺



**Visual Properties:**



    🔺

   🔺 🔺

  🔺 🔺 🔺



- Has **3 sides** ↔️ ↙️ ↗️

- Has **3 corners** (vertices) 📍 📍 📍

- Can be different sizes: 🔺 🔺🔺 🔺🔺🔺

- **Examples:** 🏠 roof tops, 🍕 pizza slices, 🚦 road signs



### Rectangle ▬



**Visual Properties:**



▬▬▬▬▬▬

▬▬▬▬▬▬

▬▬▬▬▬▬



- Has **4 sides** ↔️ ↔️ ↕️ ↕️

- Opposite sides are equal

- Has **4 corners** 📍 📍 📍 📍

- **Examples:** 🚪 doors, 📚 books, 📱 phones



## Patterns in Shapes



### Visual Pattern 1: Shape Sequence



Look at this pattern:



🔷 ⬜ 🔷 ⬜ 🔷 ⬜ ?



**What comes next?** That's right - **🔷**!



The pattern repeats: **diamond, square, diamond, square...**



### Visual Pattern 2: Color and Shape



🔴 🔵 🔴 🔵 🔴 🔵 ?



**What comes next?** **🔴** (red circle)!



### Visual Pattern 3: Size Pattern



🔺 🔺🔺 🔺 🔺🔺 🔺 ?



**What comes next?** **🔺🔺🔺** (big triangle)!



## Number Patterns with Visuals



### Pattern 1: Counting by 2s



**Visual Representation:**



2  →  🟢🟢

4  →  🟢🟢🟢🟢

6  →  🟢🟢🟢🟢🟢🟢

8  →  🟢🟢🟢🟢🟢🟢🟢🟢

10 →  🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢



**Number pattern:** 2, 4, 6, 8, 10, 12, 14...

**Rule:** Add 2 each time! ➕2



### Pattern 2: Counting by 5s



**Visual Representation:**



5  →  ⭐⭐⭐⭐⭐

10 →  ⭐⭐⭐⭐⭐ ⭐⭐⭐⭐⭐

15 →  ⭐⭐⭐⭐⭐ ⭐⭐⭐⭐⭐ ⭐⭐⭐⭐⭐

20 →  ⭐⭐⭐⭐⭐ ⭐⭐⭐⭐⭐ ⭐⭐⭐⭐⭐ ⭐⭐⭐⭐⭐



**Number pattern:** 5, 10, 15, 20, 25, 30...

**Rule:** Add 5 each time! ➕5



### Pattern 3: Counting by 10s



**Visual Representation:**



10 →  🔟

20 →  🔟🔟

30 →  🔟🔟🔟

40 →  🔟🔟🔟🔟



**Number pattern:** 10, 20, 30, 40, 50, 60...

**Rule:** Add 10 each time! ➕10



## Practice Questions



<!-- QUESTION_START -->
What shape has 3 sides and 3 corners?
<!-- OPTIONS -->
Square|Circle|Triangle|Rectangle
<!-- CORRECT -->
2
<!-- EXPLANATION -->
A triangle has 3 sides and 3 corners (vertices)!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Look at this pattern: 5, 10, 15, 20, ? What number comes next?
<!-- OPTIONS -->
21|22|25|30
<!-- CORRECT -->
2
<!-- EXPLANATION -->
The pattern is counting by 5s. After 20 comes 25!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What shape is round with no corners?
<!-- OPTIONS -->
Square|Circle|Triangle|Rectangle
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A circle is round and has no corners!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Look at this pattern: 2, 4, 6, 8, ? What number comes next?
<!-- OPTIONS -->
9|10|11|12
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The pattern is counting by 2s. After 8 comes 10!
<!-- QUESTION_END -->



## Fun Activities



- Look for shapes around your house

- Create your own patterns

- Draw patterns with shapes and colors

- Find patterns in nature!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 6,
      title: "Money Math",
      emoji: '💰',
      content: `# Money Math 💰



Let's learn to count and use money with visual examples!



## UK Coins



### Coins We Use (Visual Guide)



**Small Coins (Copper):**

- **1p** 🪙 - Smallest coin, copper color

- **2p** 🪙🪙 - Copper color, slightly bigger



**Silver Coins:**

- **5p** ⚪ - Small silver coin

- **10p** ⚪⚪ - Silver coin

- **20p** ⚪⚪⚪⚪ - Silver coin, seven-sided

- **50p** ⚪⚪⚪⚪⚪ - Silver coin, seven-sided



**Large Coins:**

- **£1** 🟡 - Gold-colored coin (100p)

- **£2** 🟡🟡 - Silver and gold coin (200p)



## Counting Money



### Example 1: Counting Coins (Visual)



You have these coins: 10p + 10p + 5p + 2p + 1p



**Visual Representation:**



⚪⚪  +  ⚪⚪  +  ⚪  +  🪙🪙  +  🪙

10p     10p     5p      2p       1p



**Step-by-Step Calculation:**



**Step 1:** Add 10p coins

⚪⚪ + ⚪⚪ = 20p

**Step 2:** Add the rest

20p + ⚪ + 🪙🪙 + 🪙 = 20 + 5 + 2 + 1 = 28p



**Answer:** You have **28 pence (28p)** 💰



### Example 2: Making £1 (Visual)



How many 10p coins make £1?



**Visual Representation:**



£1 = 100p

We need: ⚪⚪ ⚪⚪ ⚪⚪ ⚪⚪ ⚪⚪ ⚪⚪ ⚪⚪ ⚪⚪ ⚪⚪ ⚪⚪

         10  20  30  40  50  60  70  80  90  100



**Calculation:**



**Remember:** £1 = 100p

**So:** 100p ÷ 10p = **10 coins**



**Answer:** You need **10 ten-pence coins** to make £1! 🎉



### Example 3: Buying Something (Visual)



A toy costs 45p. You have 3 coins: 20p, 20p, and 10p.



**Visual Representation:**



**Your Money:**        ⚪⚪⚪⚪  +  ⚪⚪⚪⚪  +  ⚪⚪

                   20p        20p        10p

                   = 50p total

**Toy Cost:**          45p 💸



**Step-by-Step:**



**Step 1:** Count your money

⚪⚪⚪⚪ + ⚪⚪⚪⚪ + ⚪⚪ = 20 + 20 + 10 = 50p

**Step 2:** Compare

50p > 45p ✓ (You have enough!)

**Step 3:** Calculate change

50p - 45p = 5p change



**Answer:** Yes, you can buy it! You'll get **5p change**! 🎉



## Practice Questions



<!-- QUESTION_START -->
You have 2 coins of 20p each. How much money do you have in total?
<!-- OPTIONS -->
30p|40p|50p|60p
<!-- CORRECT -->
1
<!-- EXPLANATION -->
20p + 20p = 40p. You have 40 pence in total!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
A pencil costs 15p. You have 10p and 5p. Can you buy the pencil?
<!-- OPTIONS -->
Yes, with 5p change|Yes, with no change|No, you need more money|No, you have too much
<!-- CORRECT -->
1
<!-- EXPLANATION -->
10p + 5p = 15p. You have exactly 15p, so you can buy it with no change!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
How many 5p coins do you need to make 25p?
<!-- OPTIONS -->
3 coins|4 coins|5 coins|6 coins
<!-- CORRECT -->
2
<!-- EXPLANATION -->
25p ÷ 5p = 5. You need 5 five-pence coins to make 25p!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
You want to buy a sticker that costs 30p. You have 20p, 10p, and 5p. Can you buy it?
<!-- OPTIONS -->
Yes, with 5p change|Yes, with no change|No, you need more money|No, you have too much
<!-- CORRECT -->
0
<!-- EXPLANATION -->
20p + 10p + 5p = 35p. You have 35p, which is more than 30p, so you can buy it with 5p change!
<!-- QUESTION_END -->



## Money Tips



- Always count your coins carefully

- Check if you have enough before buying

- Learn to recognize different coins

- Practice making different amounts!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 7,
      title: "Time and Clocks",
      emoji: '🕐',
      content: `# Time and Clocks 🕐



Let's learn to tell time with visual clock faces!



## Parts of a Clock



### The Clock Face (Visual)



        12

    11      1

  10    🕐    2

9             3

  8           4

    7       5

        6



**Key Parts:**

- **Hour hand** (short hand ⏰) - Shows the hour

- **Minute hand** (long hand ⏰) - Shows the minutes

- **Numbers** - 1 through 12 around the clock

- **12** is at the top ⬆️, **6** is at the bottom ⬇️



## Reading the Time



### Step 1: Look at the Hour Hand ⏰



The hour hand points to the hour. If it's between two numbers, we use the smaller number.



### Step 2: Look at the Minute Hand ⏰



The minute hand shows minutes. Each number represents 5 minutes:

- **1** = 5 minutes ⏰

- **2** = 10 minutes ⏰⏰

- **3** = 15 minutes (quarter past) ⏰⏰⏰

- **6** = 30 minutes (half past) ⏰⏰⏰⏰⏰⏰

- **9** = 45 minutes (quarter to) ⏰⏰⏰⏰⏰⏰⏰



## Telling Time Examples (Visual)



### Example 1: 3 o'clock 🕐



**Visual Clock:**

        12

    11      1

  10         2

9      ⏰      3

  8           4

    7       5

        6



- **Hour hand:** pointing at 3 ⏰

- **Minute hand:** pointing at 12 ⏰

- **Time:** **3:00** or "three o'clock"



### Example 2: Half Past 2 🕐



**Visual Clock:**

        12

    11      1

  10         2

9             3

  8      ⏰    4

    7       5

        6



- **Hour hand:** halfway between 2 and 3 ⏰

- **Minute hand:** pointing at 6 ⏰

- **Time:** **2:30** or "half past two"



### Example 3: Quarter Past 4 🕐



**Visual Clock:**

        12

    11      1

  10         2

9             3

  8           4

    7      ⏰  5

        6



- **Hour hand:** just past 4 ⏰

- **Minute hand:** pointing at 3 ⏰

- **Time:** **4:15** or "quarter past four"



### Example 4: Quarter To 5 🕐



**Visual Clock:**

        12

    11      1

  10         2

9             3

  8           4

    7       5

        6



- **Hour hand:** almost at 5 ⏰

- **Minute hand:** pointing at 9 ⏰

- **Time:** **4:45** or "quarter to five"



## Daily Time Activities



- **Morning:** 7:00 - Wake up time

- **School:** 9:00 - School starts

- **Lunch:** 12:00 - Noon, lunch time

- **Afternoon:** 3:00 - School ends

- **Evening:** 6:00 - Dinner time

- **Night:** 8:00 - Bedtime



## Practice Questions



<!-- QUESTION_START -->
If the hour hand is at 3 and the minute hand is at 12, what time is it?
<!-- OPTIONS -->
3:00|3:15|3:30|3:45
<!-- CORRECT -->
0
<!-- EXPLANATION -->
When the hour hand is at 3 and the minute hand is at 12, it's 3:00 or "three o'clock"!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What time is "half past 5"?
<!-- OPTIONS -->
5:00|5:15|5:30|5:45
<!-- CORRECT -->
2
<!-- EXPLANATION -->
"Half past 5" means 5:30. The minute hand would be at 6 (which is 30 minutes)!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
If it's 4:15, where is the minute hand pointing?
<!-- OPTIONS -->
At 3|At 6|At 9|At 12
<!-- CORRECT -->
0
<!-- EXPLANATION -->
At 4:15 (quarter past 4), the minute hand points at 3, which represents 15 minutes!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What time is "quarter to 6"?
<!-- OPTIONS -->
5:15|5:30|5:45|6:00
<!-- CORRECT -->
2
<!-- EXPLANATION -->
"Quarter to 6" means 5:45. It's 15 minutes (a quarter) before 6 o'clock!
<!-- QUESTION_END -->



## Time Tips



- Practice reading clocks around your house

- Notice what time you do different activities

- Use both digital and analog clocks

- Remember: quarter = 15 minutes, half = 30 minutes!`,
      quizId: quizId++,
      assessmentType: 'clock-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 8,
      title: "Place Value to 1000",
      emoji: '🔢',
      content: `# Place Value to 1000 🔢

Let's learn about place value up to 1000!

## What is Place Value?

Place value tells us what each digit means!

In the number 234:
- The 2 is in the hundreds place (worth 200)
- The 3 is in the tens place (worth 30)
- The 4 is in the ones place (worth 4)

## Examples

- 156 = 1 hundred + 5 tens + 6 ones
- 789 = 7 hundreds + 8 tens + 9 ones
- 305 = 3 hundreds + 0 tens + 5 ones

## How to Play

Drag digits and type expanded form! 🎮`,
      quizId: quizId++,
      assessmentType: 'place-value-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 9,
      title: "Addition with Regrouping",
      emoji: '➕',
      content: `# Addition with Regrouping ➕

Let's learn to add with carrying!

## What is Regrouping?

When we add and get 10 or more in a column, we carry to the next place!

## Example

  25
+ 17
---
  42

- 5 + 7 = 12 (write 2, carry 1)
- 2 + 1 + 1 = 4

## How to Play

Type column addition and drag carrying! 🎮`,
      quizId: quizId++,
      assessmentType: 'typing-math-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 10,
      title: "Subtraction with Regrouping",
      emoji: '➖',
      content: `# Subtraction with Regrouping ➖

Let's learn to subtract with borrowing!

## What is Borrowing?

When we subtract and need more, we borrow from the next place!

## Example

  32
- 15
---
  17

- Can't do 2 - 5, so borrow from 3
- 12 - 5 = 7
- 2 - 1 = 1

## How to Play

Type column subtraction and drag borrowing! 🎮`,
      quizId: quizId++,
      assessmentType: 'typing-math-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 11,
      title: "3D Shapes",
      emoji: '🎲',
      content: `# 3D Shapes 🎲

Let's learn about 3D shapes!

## Common 3D Shapes

- Cube 🎲 - 6 square faces
- Sphere ⚪ - round, no edges
- Cylinder 🥫 - round sides, flat ends
- Cone 🍦 - round base, pointy top

## Properties

3D shapes have:
- Faces (flat surfaces)
- Edges (where faces meet)
- Vertices (corners)

## How to Play

Click shapes and drag to match properties! 🎮`,
      quizId: quizId++,
      assessmentType: 'shape-matching-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 12,
      title: "Perimeter",
      emoji: '📐',
      content: `# Perimeter 📐

Let's learn about perimeter!

## What is Perimeter?

Perimeter is the distance around a shape!

## How to Find Perimeter

Add up all the sides!

## Examples

- Square: 4 + 4 + 4 + 4 = 16
- Rectangle: 5 + 3 + 5 + 3 = 16
- Triangle: 3 + 4 + 5 = 12

## How to Play

Click grid squares and type the perimeter! 🎮`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 13,
      title: "Fractions on Number Line",
      emoji: '📏',
      content: `# Fractions on Number Line 📏

Let's learn to place fractions on a number line!

## Number Lines

A number line helps us see where numbers belong!

## Fractions on Number Line

- 1/2 is halfway between 0 and 1
- 1/4 is one quarter of the way
- 3/4 is three quarters of the way

## Examples

0 ----1/4----1/2----3/4----1

## How to Play

Drag fractions to their positions! 🎮`,
      quizId: quizId++,
      assessmentType: 'number-line-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 14,
      title: "Time: Quarter Past/To",
      emoji: '🕐',
      content: `# Time: Quarter Past/To 🕐

Let's learn quarter past and quarter to!

## Quarter Past

- 15 minutes past the hour
- Minute hand at 3
- Examples: quarter past 3, quarter past 7

## Quarter To

- 15 minutes before the hour
- Minute hand at 9
- Examples: quarter to 4, quarter to 8

## How to Play

Drag clock hands and type the time! 🎮`,
      quizId: quizId++,
      assessmentType: 'clock-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 15,
      title: "Mass and Capacity",
      emoji: '⚖️',
      content: `# Mass and Capacity ⚖️

Let's learn about mass and capacity!

## Mass (Weight)

- Grams (g) - light things
- Kilograms (kg) - heavier things
- 1 kg = 1000 g

## Capacity (Volume)

- Milliliters (mL) - small amounts
- Liters (L) - larger amounts
- 1 L = 1000 mL

## Examples

- An apple: about 150 g
- A bottle of water: 500 mL

## How to Play

Drag scales and click measurements! 🎮`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 16,
      title: "Bar Charts",
      emoji: '📊',
      content: `# Bar Charts 📊

Let's learn to read and make bar charts!

## What is a Bar Chart?

A bar chart uses bars to show data!

## Reading Bar Charts

- Look at the height of each bar
- Compare different bars
- Find the tallest and shortest

## Making Bar Charts

- Choose categories
- Count the data
- Draw bars to show amounts

## How to Play

Click to add data and drag bars! 🎮`,
      quizId: quizId++,
      assessmentType: 'graph-builder-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 17,
      title: "Word Problems: Addition/Subtraction",
      emoji: '📝',
      content: `# Word Problems: Addition/Subtraction 📝

Let's solve word problems!

## What are Word Problems?

Word problems are math stories that need solving!

## Steps to Solve

1. Read the problem carefully
2. Find the numbers
3. Decide: add or subtract?
4. Solve the problem
5. Check your answer

## Examples

- "Sarah has 15 stickers. She gets 8 more. How many does she have?" (Add: 15 + 8 = 23)
- "Tom has 20 toys. He gives away 7. How many are left?" (Subtract: 20 - 7 = 13)

## How to Play

Type answers and click operations! 🎮`,
      quizId: quizId++,
      assessmentType: 'typing-math-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'history',
      lessonNumber: 1,
      title: "Prehistoric Britain - Stone Age to Iron Age",
      emoji: '🪨',
      content: `# Prehistoric Britain - Stone Age to Iron Age 🪨

Welcome to a journey through 10,000 years of British history! Before the Romans arrived, Britain went through three major periods of change.

## 1. The Stone Age (Early Britain)
Technically split into the Palaeolithic, Mesolithic, and Neolithic.
- **Hunter-Gatherers**: Early humans followed herds of mammoths and deer.
- **Flint Tools**: Discovering that flint could be chipped into sharp axes and spears was a turning point.
- **First Farmers**: Eventually, people learned to plant seeds and keep animals, leading to the first permanent villages like Skara Brae.

## 2. The Bronze Age (Building and Settling)
- **Metalworking**: Around 2500 BC, people learned to mix copper and tin to make **Bronze**.
- **Roundhouses**: People lived in circular wooden homes with thatched roofs.
- **Stonehenge**: Many of the great stone monuments were completed or used during this time.

## 3. The Iron Age (Forts and Warriors)
- **Stronger Metal**: Iron was much harder than bronze, allowing for better plows and sharper weapons.
- **Hill Forts**: To protect themselves from rival tribes, people built massive earthwork forts on hills (like Maiden Castle).
- **Celtic Culture**: This was the time of the Celts, known for their beautiful jewelry (torcs) and fierce warriors.

## The Evolution of Technology
In the game, you will need to find the key inventions of each age to "evolve" your civilization to the next period!`,
      quizId: 61,
      assessmentType: 'prehistoric-britain-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'history',
      lessonNumber: 2,
      title: "Genetics and Family Trees - The First Families",
      emoji: '🧬',
      content: `# Genetics and Family Trees - The First Families 🧬

Let's learn about genetics through the story of the first families!

## The Story of Twins

In the beginning, God created the first families. Some families had twins - two children who looked very similar!

In this game, you'll learn how traits like eye color, hair color, and height are passed from parents to children.

## How to Play

1. **Match the Couples**: Drag boys to girls to create married couples
2. **Explore Genetics**: See how traits combine using Punnett squares
3. **Take a Quiz**: Answer questions about what children might look like

## What You'll Learn

- **Dominant vs Recessive**: Some traits are stronger than others
- **Genotypes and Phenotypes**: The difference between genes and appearance
- **Family Trees**: How traits are passed through generations
- **Probability**: What combinations are possible in children

## The Science

Just like the Haribo genetics meme, when twins marry twins, their children can have many different combinations of traits!

**Eye Color**: Brown eyes (B) are dominant over blue eyes (b)
**Hair Shade**: Dark hair (D) is dominant over blonde hair (d)
**Height**: Tall (T) is dominant over short (t)

## Remember

Every person is unique, created by God with special combinations of traits!`,
      quizId: null,
      assessmentType: 'genetics-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'history',
      lessonNumber: 3,
      title: "Religious History - Kings and Prophets",
      emoji: '👑',
      content: `# Biblical History - Kings and Prophets 👑



Let's learn about the kings and prophets from the Bible!



## King David



- David was a shepherd boy

- He became a great king

- He was brave and wise

- He wrote many psalms (songs)



## King Solomon



- Solomon was David's son

- He was very wise

- He built a great temple

- He was known for his wisdom



## The Temple



- Solomon built a beautiful temple

- It was in Jerusalem

- It was God's house

- It was very important



## Prophets



- Prophets were messengers

- They spoke God's words

- They warned people

- They gave hope



## The Divided Kingdom



- After Solomon, the kingdom split

- There were two kingdoms

- Israel in the north

- Judah in the south



## Fun Activities



- Learn about the kings

- Draw the temple

- Learn about prophets

- Make a timeline



## Remember



- David and Solomon were great kings

- The temple was important

- Prophets were messengers

- These are important stories!



## Practice Questions



<!-- QUESTION_START -->
What was David before he became king?
<!-- OPTIONS -->
A soldier|A shepherd boy|A prince|A farmer
<!-- CORRECT -->
1
<!-- EXPLANATION -->
David was a shepherd boy before he became a great king. He was brave and wise!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Who built the great temple in Jerusalem?
<!-- OPTIONS -->
David|Solomon|Moses|Abraham
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Solomon, who was David's son, built the great temple in Jerusalem. It was God's house and very important!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What were prophets?
<!-- OPTIONS -->
Kings|Soldiers|Messengers|Priests
<!-- CORRECT -->
2
<!-- EXPLANATION -->
Prophets were messengers who spoke God's words. They warned people and gave hope!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What happened to the kingdom after Solomon?
<!-- OPTIONS -->
It grew bigger|It split into two kingdoms|It disappeared|It moved to a new place
<!-- CORRECT -->
1
<!-- EXPLANATION -->
After Solomon, the kingdom split into two: Israel in the north and Judah in the south!
<!-- QUESTION_END -->`,
      quizId: 61,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'history',
      lessonNumber: 4,
      title: "Ancient Greece - Gods and Heroes",
      emoji: '🏛️',
      content: `# Ancient Greece - Gods and Heroes 🏛️



Let's learn about ancient Greece!



## When Was Ancient Greece?



- Ancient Greece existed from about 800 BC to 146 BC

- That's a very long time ago!

- It was in Europe

- It was a great civilization



## Greek City-States



- Greece was made of city-states

- Athens was one city-state

- Sparta was another

- Each was independent



## Greek Gods and Goddesses



- Greeks believed in many gods

- Zeus was king of the gods ⚡

- Athena was goddess of wisdom

- Poseidon was god of the sea 🌊



## The Olympics



- The Olympics started in Greece

- They were athletic competitions

- Held every four years

- Still happen today!



## Famous Greeks



- Socrates was a philosopher

- Plato was his student

- They asked important questions

- They were very wise



## Greek Architecture



- Greeks built beautiful buildings

- They used columns

- The Parthenon is famous

- Still admired today!



## Fun Activities



- Learn about Greek gods

- Draw Greek buildings

- Learn about the Olympics

- Write about ancient Greece



## Remember



- Ancient Greece was long ago

- They had many gods

- They started the Olympics

- They influenced the world!



## Practice Questions



<!-- QUESTION_START -->
Who was the king of the Greek gods?
<!-- OPTIONS -->
Poseidon|Athena|Zeus|Apollo
<!-- CORRECT -->
2
<!-- EXPLANATION -->
Zeus was the king of the Greek gods! He was very powerful and important in Greek mythology.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Where did the Olympics start?
<!-- OPTIONS -->
Rome|Egypt|Greece|China
<!-- CORRECT -->
2
<!-- EXPLANATION -->
The Olympics started in ancient Greece! They were athletic competitions held every four years, and they still happen today!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What were the two famous Greek city-states?
<!-- OPTIONS -->
Athens and Sparta|Rome and Athens|Sparta and Egypt|Athens and Egypt
<!-- CORRECT -->
0
<!-- EXPLANATION -->
Athens and Sparta were two famous Greek city-states. Each was independent and had its own way of life!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What famous building did the Greeks build using columns?
<!-- OPTIONS -->
The Colosseum|The Parthenon|The Great Wall|The Pyramids
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Parthenon is a famous Greek building that used columns. Greek architecture is still admired today!
<!-- QUESTION_END -->`,
      quizId: null,
      assessmentType: 'ancient-greece-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'history',
      lessonNumber: 5,
      title: "Ancient Greece - Daily Life",
      emoji: '🏺',
      content: `# Ancient Greece - Daily Life 🏺



Let's learn about how people lived in ancient Greece!



## Greek Homes



- Greek homes were simple

- They had courtyards

- They had few windows

- They were made of mud and stone



## Greek Schools



- Boys went to school

- Girls learned at home

- They learned reading and writing

- They learned music and sports



## Greek Democracy



- Athens created democracy

- People could vote

- Citizens had a say

- This influenced many countries



## Greek Theater



- Greeks loved theater

- They watched plays

- They had comedies and tragedies

- Theater was very important



## Greek Art and Pottery



- Greeks made beautiful pottery

- They painted scenes on vases

- They made sculptures

- Their art is still admired



## Fun Activities



- Draw Greek homes

- Learn about democracy

- Draw Greek pottery

- Write about Greek life



## Remember



- Greek homes were simple

- Boys went to school

- Athens created democracy

- Greeks loved art and theater!



## Practice Questions



<!-- QUESTION_START -->
Who went to school in ancient Greece?
<!-- OPTIONS -->
Girls|Boys|Both boys and girls|Nobody
<!-- CORRECT -->
1
<!-- EXPLANATION -->
In ancient Greece, boys went to school while girls learned at home. They learned reading, writing, music, and sports!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What did Athens create that influenced many countries?
<!-- OPTIONS -->
The Olympics|Democracy|Theater|Pottery
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Athens created democracy, where people could vote and citizens had a say. This influenced many countries around the world!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What did Greeks love to watch?
<!-- OPTIONS -->
Gladiator fights|Plays in the theater|Chariot races|Sports games
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Greeks loved theater! They watched plays, including comedies and tragedies. Theater was very important to them!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What did Greeks make that is still admired today?
<!-- OPTIONS -->
Pottery|Sculptures|Beautiful art|All of the above
<!-- CORRECT -->
3
<!-- EXPLANATION -->
Greeks made beautiful pottery, sculptures, and art that is still admired today! They painted scenes on vases and created amazing works of art!
<!-- QUESTION_END -->`,
      quizId: 70,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'history',
      lessonNumber: 6,
      title: "Ancient Rome - The Empire",
      emoji: '🏛️',
      content: `# Ancient Rome - The Empire 🏛️

Rome grew from a small town in Italy into one of the largest and most powerful empires the world has ever seen. This was possible because Romans were brilliant engineers and organized leaders.

## Key Roman Innovations
- **Aqueducts**: Huge stone bridges that carried fresh water for miles from the mountains into the city. Gravity did all the work!
- **Roman Roads**: They built 50,000 miles of straight, paved roads. This allowed their armies to move quickly and merchants to trade goods easily.
- **Concrete**: Romans invented a special type of concrete that was so strong it could even set underwater! This allowed them to build massive structures like the Colosseum.

## The Roman Army
The backbone of the empire was the **Roman Legions**. These were professional, highly disciplined soldiers who wore strong armor and fought in perfect formation. They didn't just fight; they also built many of the empire's roads and bridges.

## Rule and Culture
Rome was ruled by **Emperors** who held absolute power. The official language was **Latin**, which is the ancestor of Spanish, French, Italian, and many English words!

In the game, you will take on the role of an **Empire Architect**. You must choose the right Roman innovations to solve the problems of the city and help the Emperor expand our borders!`,
      quizId: null,
      assessmentType: 'ancient-rome-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'history',
      lessonNumber: 7,
      title: "Ancient Rome - Daily Life",
      emoji: '🏺',
      content: `# Ancient Rome - Daily Life 🏺

What was it like to wake up in the city of Rome 2,000 years ago? For some it was a life of luxury, but for most, it was a busy, crowded, and exciting world.

## Roman Homes: Villas vs. Insulae
- **Rich Romans** lived in beautiful houses called **Villas**. They had inner courtyards (Atriums), floor heating (Hypocausts), and even running water!
- **Poor Romans** lived in tall apartment blocks called **Insulae**. These were often made of wood and were very crowded. There were no kitchens or toilets inside!

## The Social Heart: Public Baths
The baths were more than just a place to get clean. They were a social club. Romans went there to exercise, gossip about politics, listen to poetry, and relax in different temperature pools.

## Food and Dining
Romans didn't sit at tables to eat fancy meals; they reclined on couches! Most people ate simple food like bread, porridge, and olives. They loved a salty fish sauce called **Garum**, which they put on almost everything.

## Great Entertainment
Rome was famous for "Bread and Circuses"—food and games to keep the people happy.
- **The Colosseum**: Where gladiators fought for glory.
- **Circus Maximus**: A massive track for high-speed, dangerous chariot races.

In the game, you will explore the streets of Rome and visit these famous locations to witness daily life yourself!`,
      quizId: null,
      assessmentType: 'roman-daily-life-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'history',
      lessonNumber: 8,
      title: "The Fall of Rome",
      emoji: '⚔️',
      content: `# The Fall of Rome ⚔️

No empire lasts forever. After hundreds of years of power, the Roman Empire began to decline. It didn't happen overnight; it was a slow process caused by many different problems working together.

## Why did the Giant Fall?
1. **Size**: The empire was so large it was almost impossible to defend. News traveled slowly by horse, meaning the Emperor often didn't know about an attack until it was too late.
2. **Economic Collapse**: The army was incredibly expensive to maintain. To pay for it, Rome printed more money, but this caused **Inflation**—where money loses its value and prices go up.
3. **Invasions**: Hungry and powerful tribes from outside Rome, like the **Goths**, **Vandals**, and **Huns**, began attacking the borders.

## The Final Blow
In **AD 476**, the last Roman Emperor in the West was overthrown by a tribal leader. While the Western Empire fell into the "Dark Ages," Roman influence never truly disappeared. Their laws, buildings, and language changed the world forever.

In the game, you will handle the difficult challenges of the late empire. Can you make the choices needed to try and save Rome?`,
      quizId: null,
      assessmentType: 'fall-of-rome-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'technology',
      lessonNumber: 1,
      title: "TapTapTap: Advanced Level 1",
      emoji: '👆',
      content: `# TapTapTap: Advanced Level 1 👆

Time to step up your game! This level is faster and more challenging.

## How to Play

- Tap targets as they appear on screen
- Targets appear every 1.2 seconds (even faster!)
- Targets are smaller and move faster
- 30 seconds to score as many points as possible!

## Scoring System

- **Bronze**: 15-29 points
- **Silver**: 30-44 points
- **Gold**: 45-59 points
- **Platinum**: 60+ points

You need at least **Bronze** (15 points) to progress!

## Tips

- Stay focused - targets appear quickly
- Practice your hand-eye coordination
- Don't give up if you miss some - keep trying!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'technology',
      lessonNumber: 2,
      title: "TapTapTap: Advanced Level 2",
      emoji: '👆',
      content: `# TapTapTap: Advanced Level 2 👆

Keep challenging yourself! This level continues to build your skills.

## How to Play

- Tap targets as they appear
- Same speed as Level 1 - keep practicing!
- 30 seconds to score points

## Scoring System

- **Bronze**: 15-29 points
- **Silver**: 30-44 points
- **Gold**: 45-59 points
- **Platinum**: 60+ points

You need at least **Bronze** (15 points) to progress!

## Challenge

Can you beat your previous score? Aim for a higher medal!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    // English Lessons
    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'english',
      lessonNumber: 1,
      title: "Nouns - Naming Words",
      emoji: '📝',
      content: `# Nouns - Naming Words 📝

Nouns are naming words! They help us name people, places, things, and ideas.

## What is a Noun?

A noun is a word that names:
- **People**: teacher, boy, sister, doctor
- **Places**: school, park, London, beach
- **Things**: book, table, dog, apple
- **Ideas**: happiness, love, freedom, courage

## Types of Nouns

### Common Nouns
These are general names for things:
- dog, city, car, book

### Proper Nouns
These are specific names and always start with a capital letter:
- London, Sarah, Monday, Christmas

## Examples

**Common Nouns:**
- I saw a **dog** in the **park**.
- The **teacher** read a **book**.

**Proper Nouns:**
- **Sarah** lives in **London**.
- We celebrate **Christmas** in **December**.

## Practice Questions

<!-- QUESTION_START -->
Which word is a noun in this sentence: "The cat sat on the mat"?
<!-- OPTIONS -->
sat|the|cat|on
<!-- CORRECT -->
2
<!-- EXPLANATION -->
"Cat" is a noun because it names an animal (a thing). "Sat" is a verb, "the" is an article, and "on" is a preposition.
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Which of these is a proper noun?
<!-- OPTIONS -->
city|London|building|street
<!-- CORRECT -->
1
<!-- EXPLANATION -->
"London" is a proper noun because it's the specific name of a city. Proper nouns always start with a capital letter!
<!-- QUESTION_END -->

<!-- QUESTION_START -->
How many nouns are in this sentence: "My brother Tom plays football in the garden"?
<!-- OPTIONS -->
2|3|4|5
<!-- CORRECT -->
2
<!-- EXPLANATION -->
There are 3 nouns: "brother" (person), "Tom" (proper noun - person), and "football" (thing), and "garden" (place). That's 4 nouns total!
<!-- QUESTION_END -->

## Remember

- Nouns name people, places, things, or ideas
- Proper nouns need capital letters
- Every sentence has at least one noun!`,
      quizId: quizId++,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'english',
      lessonNumber: 2,
      title: "Verbs - Action Words",
      emoji: '🏃',
      content: `# Verbs - Action Words 🏃

Verbs are action words! They tell us what someone or something is doing.

## What is a Verb?

A verb is a word that shows:
- **Actions**: run, jump, eat, write
- **States of being**: is, am, are, was, were
- **Mental actions**: think, know, believe, remember

## Action Verbs

Action verbs show physical movement:
- The dog **runs** in the park.
- She **kicks** the ball.
- We **eat** lunch at noon.

## Being Verbs

These verbs don't show action but tell us about existence:
- I **am** happy.
- The sky **is** blue.
- They **are** friends.

## Past, Present, and Future

Verbs change to show when something happens:

**Present**: I **walk** to school.
**Past**: I **walked** to school yesterday.
**Future**: I **will walk** to school tomorrow.

## Practice Questions

<!-- QUESTION_START -->
Which word is the verb in this sentence: "The boy jumps over the fence"?
<!-- OPTIONS -->
boy|jumps|over|fence
<!-- CORRECT -->
1
<!-- EXPLANATION -->
"Jumps" is the verb because it shows the action that the boy is doing!
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Which sentence is in the past tense?
<!-- OPTIONS -->
She walks to school|She walked to school|She will walk to school|She is walking to school
<!-- CORRECT -->
1
<!-- EXPLANATION -->
"She walked to school" is in the past tense. The verb "walked" shows that the action already happened!
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Which of these is a being verb?
<!-- OPTIONS -->
run|jump|is|play
<!-- CORRECT -->
2
<!-- EXPLANATION -->
"Is" is a being verb. It doesn't show action but tells us about a state of existence!
<!-- QUESTION_END -->

## Remember

- Verbs are action words or being words
- They tell us what's happening
- Verbs can be past, present, or future!`,
      quizId: quizId++,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'english',
      lessonNumber: 3,
      title: "Adjectives - Describing Words",
      emoji: '🎨',
      content: `# Adjectives - Describing Words 🎨

Adjectives are describing words! They make our writing more interesting by telling us about nouns.

## What is an Adjective?

An adjective describes a noun by telling us:
- **How it looks**: big, small, red, shiny
- **How it sounds**: loud, quiet, noisy
- **How it feels**: soft, rough, smooth, cold
- **How it tastes**: sweet, sour, delicious
- **How many**: three, many, few, several

## Using Adjectives

Adjectives make sentences more interesting!

**Without adjectives:**
The dog ran across the field.

**With adjectives:**
The **big, brown** dog ran across the **green** field.

## Multiple Adjectives

You can use more than one adjective:
- A **small, fluffy, white** rabbit
- The **old, wooden, creaky** door
- My **favorite, red, spotty** dress

## Practice Questions

<!-- QUESTION_START -->
Which word is an adjective in this sentence: "The small mouse ran quickly"?
<!-- OPTIONS -->
mouse|small|ran|quickly
<!-- CORRECT -->
1
<!-- EXPLANATION -->
"Small" is an adjective because it describes the mouse (a noun). "Quickly" is an adverb describing how the mouse ran!
<!-- QUESTION_END -->

<!-- QUESTION_START -->
How many adjectives are in this sentence: "The brave, young knight rode his fast horse"?
<!-- OPTIONS -->
1|2|3|4
<!-- CORRECT -->
2
<!-- EXPLANATION -->
There are 3 adjectives: "brave" and "young" describe the knight, and "fast" describes the horse!
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Which sentence uses adjectives correctly?
<!-- OPTIONS -->
The cat soft sat on the mat|The soft cat sat on the mat|The cat sat soft on the mat|Soft the cat sat on the mat
<!-- CORRECT -->
1
<!-- EXPLANATION -->
"The soft cat sat on the mat" is correct! The adjective "soft" comes before the noun "cat" it describes!
<!-- QUESTION_END -->

## Remember

- Adjectives describe nouns
- They tell us what something is like
- You can use more than one adjective!`,
      quizId: quizId++,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'english',
      lessonNumber: 4,
      title: "Punctuation - Full Stops and Capital Letters",
      emoji: '✏️',
      content: `# Punctuation - Full Stops and Capital Letters ✏️

Punctuation marks help us read and understand sentences!

## Capital Letters

We use capital letters:

1. **At the start of a sentence**
   - The sun is shining.
   - We are going to the park.

2. **For names of people and places** (Proper nouns)
   - Sarah, Tom, London, France

3. **For days and months**
   - Monday, Tuesday, January, December

4. **For the word "I"**
   - I am happy.
   - My friend and I play together.

## Full Stops (.)

We use a full stop:
- At the end of a sentence
- To show the sentence is complete

**Example:**
The cat sat on the mat.

## Common Mistakes

❌ the dog is brown
✅ The dog is brown.

❌ my name is sarah
✅ My name is Sarah.

❌ we live in london
✅ We live in London.

## Practice Questions

<!-- QUESTION_START -->
Which sentence uses capital letters correctly?
<!-- OPTIONS -->
my friend lives in london|My friend lives in London|My Friend Lives In London|my Friend lives in london
<!-- CORRECT -->
1
<!-- EXPLANATION -->
"My friend lives in London" is correct! We use a capital letter at the start of the sentence and for the city name "London".
<!-- QUESTION_END -->

<!-- QUESTION_START -->
What is missing from this sentence: "the boy ran home"
<!-- OPTIONS -->
Nothing|A full stop|A capital letter|Both a capital letter and full stop
<!-- CORRECT -->
3
<!-- EXPLANATION -->
The sentence needs a capital letter at the start (The) and a full stop at the end (home.)!
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Which word should have a capital letter: "i went to school on monday"
<!-- OPTIONS -->
Only "i"|Only "monday"|Both "i" and "monday"|Only "school"
<!-- CORRECT -->
2
<!-- EXPLANATION -->
Both "I" (always capitalized) and "Monday" (day of the week) need capital letters. The sentence should start with a capital too!
<!-- QUESTION_END -->

## Remember

- Start sentences with capital letters
- End sentences with full stops
- Use capitals for names and places!`,
      quizId: quizId++,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'english',
      lessonNumber: 5,
      title: "Question Marks and Exclamation Marks",
      emoji: '❓',
      content: `# Question Marks and Exclamation Marks ❓

These punctuation marks show different types of sentences!

## Question Marks (?)

Use a question mark at the end of a question:
- What is your name?
- Where are you going?
- Can I play too?

**Question words:**
Who, What, Where, When, Why, How, Can, Is, Are, Do, Does

## Exclamation Marks (!)

Use an exclamation mark to show:

1. **Strong feelings**
   - I'm so excited!
   - That's amazing!

2. **Surprise**
   - Wow!
   - I can't believe it!

3. **Commands**
   - Stop!
   - Watch out!

## Choosing the Right Punctuation

- **Statement** (telling): The sky is blue.
- **Question** (asking): Is the sky blue?
- **Exclamation** (strong feeling): The sky is so blue!

## Practice Questions

<!-- QUESTION_START -->
Which sentence needs a question mark?
<!-- OPTIONS -->
I like ice cream|Where is my book|That's wonderful|Stop right now
<!-- CORRECT -->
1
<!-- EXPLANATION -->
"Where is my book" is asking a question, so it needs a question mark: "Where is my book?"
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Which sentence uses an exclamation mark correctly?
<!-- OPTIONS -->
I went to school!|What time is it!|Watch out!|The cat is sleeping!
<!-- CORRECT -->
2
<!-- EXPLANATION -->
"Watch out!" is a command showing urgency, so it correctly uses an exclamation mark!
<!-- QUESTION_END -->

<!-- QUESTION_START -->
What punctuation mark goes at the end: "How old are you"
<!-- OPTIONS -->
Full stop (.)|Question mark (?)|Exclamation mark (!)|Comma (,)
<!-- CORRECT -->
1
<!-- EXPLANATION -->
"How old are you?" is asking a question, so it needs a question mark!
<!-- QUESTION_END -->

## Remember

- Questions end with ?
- Exclamations show strong feelings with !
- Most sentences end with a full stop!`,
      quizId: quizId++,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'english',
      lessonNumber: 6,
      title: "Prefix Power",
      emoji: '🔌',
      assessmentType: 'prefix-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'english',
      lessonNumber: 7,
      title: "Suffix Superstars",
      emoji: '🚀',
      assessmentType: 'suffix-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'english',
      lessonNumber: 7,
      title: "Conjunctions - Joining Words",
      emoji: '🔗',
      content: `# Conjunctions - Joining Words 🔗

Conjunctions are joining words that connect parts of sentences!

## Common Conjunctions

**and** - adds information
- I like apples **and** oranges.
- The dog barked **and** wagged its tail.

**but** - shows contrast
- I'm tired **but** happy.
- She wanted to play **but** it was raining.

**or** - shows choice
- Do you want tea **or** coffee?
- We can go swimming **or** play in the park.

**because** - gives a reason
- I'm happy **because** it's sunny.
- She wore a coat **because** it was cold.

**so** - shows result
- It was raining **so** we stayed inside.
- I was hungry **so** I ate lunch.

## Making Better Sentences

**Two short sentences:**
- I like pizza. I like pasta.

**One better sentence:**
- I like pizza **and** pasta.

**Two short sentences:**
- I want to go out. It's raining.

**One better sentence:**
- I want to go out **but** it's raining.

## Practice Questions

<!-- QUESTION_START -->
Which conjunction shows a reason: "I wore a coat _____ it was cold"?
<!-- OPTIONS -->
and|but|or|because
<!-- CORRECT -->
3
<!-- EXPLANATION -->
"Because" shows the reason: "I wore a coat **because** it was cold."
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Which sentence uses "but" correctly?
<!-- OPTIONS -->
I like cats but dogs|It's sunny but we went to the beach|I wanted to play but it was raining|She is happy but excited
<!-- CORRECT -->
2
<!-- EXPLANATION -->
"I wanted to play but it was raining" is correct. "But" shows contrast between wanting to play and the rain stopping it!
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Join these sentences: "It was cold. We went swimming." Which is best?
<!-- OPTIONS -->
It was cold and we went swimming|It was cold but we went swimming|It was cold or we went swimming|It was cold because we went swimming
<!-- CORRECT -->
1
<!-- EXPLANATION -->
"It was cold **but** we went swimming" is best because "but" shows the contrast - we went swimming even though it was cold!
<!-- QUESTION_END -->

## Remember

- Conjunctions join words or sentences
- Choose the right conjunction for the meaning
- They make our writing flow better!`,
      quizId: quizId++,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'english',
      lessonNumber: 8,
      title: "Synonyms and Antonyms",
      emoji: '📚',
      assessmentType: 'synonyms-antonyms-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'english',
      lessonNumber: 9,
      title: "Apostrophes for Contractions",
      emoji: '✂️',
      assessmentType: 'contraction-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'english',
      lessonNumber: 10,
      title: "Spelling Safari",
      emoji: '🦁',
      assessmentType: 'spelling-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'english',
      lessonNumber: 11,
      title: "Adjective Adventure",
      emoji: '🌟',
      assessmentType: 'parts-of-speech-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'english',
      lessonNumber: 10,
      title: "Commas in Lists",
      emoji: '📋',
      content: `# Commas in Lists 📋

Commas help us separate items in a list!

## Using Commas in Lists

When we list three or more things, we use commas to separate them:

**Without commas (confusing):**
I bought apples oranges bananas and grapes.

**With commas (clear):**
I bought apples, oranges, bananas and grapes.

## The Pattern

item, item, item and item

**Examples:**
- I like red, blue, green and yellow.
- The zoo has lions, tigers, elephants and monkeys.
- We need flour, eggs, sugar and butter.

## Lists of Actions

We can also list actions:
- She jumped, skipped, ran and hopped.
- He opened the door, walked inside, sat down and smiled.

## Lists of Adjectives

We can list describing words:
- The dog was big, fluffy, brown and friendly.
- It was a cold, wet, windy and miserable day.

## Common Mistakes

❌ I like cats, and dogs, and rabbits. (too many "and"s)
✅ I like cats, dogs and rabbits.

❌ We need eggs milk, and bread (comma in wrong place)
✅ We need eggs, milk and bread.

## Practice Questions

<!-- QUESTION_START -->
Where should the commas go: "I packed a hat gloves a scarf and boots"?
<!-- OPTIONS -->
I packed a hat gloves, a scarf, and boots|I packed a hat, gloves, a scarf and boots|I packed, a hat, gloves, a scarf and boots|I packed a hat gloves a scarf, and boots
<!-- CORRECT -->
1
<!-- EXPLANATION -->
"I packed a hat, gloves, a scarf and boots" is correct! Commas separate the items, and we use "and" before the last item.
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Which sentence uses commas correctly?
<!-- OPTIONS -->
The cake was sweet, delicious, and, moist|The cake was sweet delicious and moist|The cake was sweet, delicious and moist|The cake was, sweet, delicious and moist
<!-- CORRECT -->
2
<!-- EXPLANATION -->
"The cake was sweet, delicious and moist" is correct! We separate the adjectives with commas.
<!-- QUESTION_END -->

<!-- QUESTION_START -->
How many commas are needed: "We saw elephants giraffes zebras and lions"?
<!-- OPTIONS -->
1|2|3|4
<!-- CORRECT -->
1
<!-- EXPLANATION -->
We need 2 commas: "We saw elephants, giraffes, zebras and lions." We don't put a comma before "and"!
<!-- QUESTION_END -->

## Remember

- Use commas to separate items in a list
- Put "and" before the last item
- Don't put a comma before "and" at the end!`,
      quizId: quizId++,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 18,
      title: "Place Value to 1,000",
      emoji: '🔢',
      content: `# Place Value to 1,000 🔢

Build three-digit numbers with hundreds, tens, and ones.

## How to Play

Drag digit cards into the correct place value columns.

## Example

452 = 4 hundreds, 5 tens, 2 ones`,
      quizId: quizId++,
      assessmentType: 'place-value-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 19,
      title: "Add and Subtract 3-Digit Numbers",
      emoji: '➕',
      content: `# Add and Subtract 3-Digit Numbers ➕

Use column methods to add and subtract.

## How to Play

Drag digits into the column layout and solve each step.

## Example

326 + 175 = 501`,
      quizId: quizId++,
      assessmentType: 'column-method-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 20,
      title: "3, 4, and 8 Times Tables",
      emoji: '✖️',
      content: `# 3, 4, and 8 Times Tables ✖️

Practise multiplication facts.

## How to Play

Tap the correct product to build each table.

## Tables

- 3 times table
- 4 times table
- 8 times table`,
      quizId: quizId++,
      assessmentType: 'times-table-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 21,
      title: "Division with Remainders",
      emoji: '➗',
      content: `# Division with Remainders ➗

Share items equally and find the remainder.

## How to Play

Drag counters into groups and record any left over.

## Example

14 ÷ 3 = 4 r 2`,
      quizId: quizId++,
      assessmentType: 'division-sharing-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 22,
      title: "Fractions on a Number Line",
      emoji: '📏',
      content: `# Fractions on a Number Line 📏

Place fractions between 0 and 1.

## How to Play

Drag the fraction to the correct point on the line.

## Examples

- 1/2 is in the middle
- 1/4 is halfway between 0 and 1/2`,
      quizId: quizId++,
      assessmentType: 'fraction-line-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 23,
      title: "Perimeter of 2D Shapes",
      emoji: '📐',
      content: `# Perimeter of 2D Shapes 📐

Find the distance around a shape.

## How to Play

Trace the edges and add the lengths.

## Example

Rectangle with sides 5 cm and 3 cm:
Perimeter = 5 + 3 + 5 + 3 = 16 cm`,
      quizId: quizId++,
      assessmentType: 'perimeter-trace-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 24,
      title: "Time to the Nearest Minute",
      emoji: '⏱️',
      content: `# Time to the Nearest Minute ⏱️

Tell the time using minute markings.

## How to Play

Drag the clock hands to show the time given.

## Example

4:37 is 23 minutes to 5.`,
      quizId: quizId++,
      assessmentType: 'time-minute-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 25,
      title: "Money: Add and Subtract Amounts",
      emoji: '💷',
      content: `# Money: Add and Subtract Amounts 💷

Work out totals and change.

## How to Play

Drag coins and notes to pay the exact amount.

## Tip

Use 10p and £1 coins to make quick totals.`,
      quizId: quizId++,
      assessmentType: 'money-shop-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 26,
      title: "Angles and Turns",
      emoji: '🧭',
      content: `# Angles and Turns 🧭

Identify right, acute, and obtuse angles.

## How to Play

Rotate the arrow to match the angle shown.

## Angles

- Right angle = 90°
- Acute is smaller than 90°
- Obtuse is larger than 90°`,
      quizId: quizId++,
      assessmentType: 'angle-rotate-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'maths',
      lessonNumber: 27,
      title: "Data: Bar Charts",
      emoji: '📊',
      content: `# Data: Bar Charts 📊

Read and build bar charts.

## How to Play

Drag bars to the correct height based on the data.`,
      quizId: quizId++,
      assessmentType: 'bar-chart-game',
      categoryId: null,
    }),

  ];
}

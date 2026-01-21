import { Lesson } from '../../models/Lesson.js';

/**
 * Year 6 Lessons
 */
export function getYear6Lessons(startLessonId, startQuizId) {
  let lessonId = startLessonId;
  let quizId = startQuizId;

  return [
    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 1,
      title: "Algebra Introduction",
      emoji: '🔢',
      content: `# Algebra Introduction 🔢

Let's learn about algebra!

## How to Play

Tap the numbers to hear them! Then play the game! 🎮

## What is Algebra?

Algebra uses letters (like x, y) to represent unknown numbers!

## Examples

- x + 5 = 10 → x = 5
- y - 3 = 7 → y = 10

## Fun Activities

- Practice solving equations
- Play the algebra game!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 2,
      title: "Statistics and Data",
      emoji: '📊',
      content: `# Statistics and Data 📊

Let's learn about statistics!

## How to Play

Tap the numbers to hear them! Then play the game! 🎮

## What is Statistics?

Statistics is collecting, organizing, and analyzing data!

## Mean, Median, Mode

- **Mean (Average)** - Add all numbers, divide by count
- **Median** - Middle number when ordered
- **Mode** - Most common number

## Fun Activities

- Calculate mean, median, mode
- Play the statistics game!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 3,
      title: "Advanced Problem Solving",
      emoji: '🧩',
      content: `# Advanced Problem Solving 🧩

Let's solve more complex problems!

## How to Play

Tap the numbers to hear them! Then play the game! 🎮

## Multi-Step Problems

Problems that need more than one step!

## Example

"Sarah has £20. She buys 3 books at £4 each. How much money does she have left?"

Steps:
1. Find cost: 3 × £4 = £12
2. Find remaining: £20 - £12 = £8

## Problem-Solving Strategies

- Draw a diagram
- Make a table
- Work backwards
- Try different approaches

## Fun Activities

- Solve complex problems
- Play the problem-solving game!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'english',
      lessonNumber: 1,
      title: "Figurative Language",
      emoji: '📜',
      assessmentType: 'figurative-language-game',
      content: `# Figurative Language 📜

Let's test your knowledge of figurative language!

## How to Play

- Read the sentence carefully.
- Decide what type of figurative language is being used.
- Select the correct option.
- See if you can get a perfect score!
      `,
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'english',
      lessonNumber: 2,
      title: "Author Study: Lewis Carroll",
      emoji: '🎩',
      content: `# Lewis Carroll 🎩

Lewis Carroll (1832–1898) was a mathematician and writer famous for *Alice's Adventures in Wonderland*.

## Wordplay and Nonsense
Carroll was a master of **Nonsense Literature**. He loved to play with the English language to create "Portmanteau" words (two words joined together).
- **Example**: "Chortle" (Chuckle + Snort).
- **Jabberwocky**: His famous poem is filled with words that sound real but are completely made up (like *frabjous* or *galumphing*).

## Imagination and Logic
Because Carroll was a mathematician, his "nonsense" often has a strange kind of logic. He loved riddles that didn't have answers and characters who challenged the way we think about the world.

## Practice Questions

<!-- QUESTION_START -->
What is a "Portmanteau" word?
<!-- OPTIONS -->
A word that is very long|Two words joined together to make a new one|A word that means nothing|A word from another language
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Carroll loved joining words together, like "Chuckle" and "Snort" to make "Chortle"!
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Which famous book did Lewis Carroll write?
<!-- OPTIONS -->
The Hobbit|Alice's Adventures in Wonderland|Oliver Twist|Matilda
<!-- CORRECT -->
1
<!-- EXPLANATION -->
He is most famous for Alice's adventures in the magical world of Wonderland.
<!-- QUESTION_END -->

<!-- QUESTION_START -->
What is "Nonsense Literature"?
<!-- OPTIONS -->
Writing that is bad|Writing that plays with language and makes no sense on purpose|Writing without any punctuation|Scientific writing
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Nonsense literature uses imagination and wordplay to create stories that are funny because they are so strange.
<!-- QUESTION_END -->`,
      quizId: quizId++,
      assessmentType: 'quiz',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'english',
      lessonNumber: 3,
      title: "Author Study: Charles Dickens",
      emoji: '🕯️',
      content: `# Charles Dickens 🕯️

Charles Dickens (1812–1870) wrote some of the most famous stories in history, often focusing on the lives of people in Victorian England.

## Setting and Atmosphere
Dickens was a master of describing settings. He often wrote about **Victorian London**, making the city feel like a character itself—filled with fog, shadows, and busy streets.

## Character Description
His characters often have "unforgettable" names and very specific personalities:
- **Ebenezer Scrooge**: A cold, greedy man who hates Christmas.
- **Oliver Twist**: A brave orphan who just wants "some more" food.
- **Miss Havisham**: A woman who has worn her wedding dress for years!

## Moral Themes
Dickens used his stories to highlight problems in society, like poverty and how children were treated. He believed that kindness and generosity were the most important things.

## Practice Questions

<!-- QUESTION_START -->
What era did Charles Dickens write about?
<!-- OPTIONS -->
Tudor England|Victorian England|Modern Day|Ancient Rome
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Dickens is famous for his stories set in the smoggy, busy streets of Victorian London.
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Which character is a "greedy man" from A Christmas Carol?
<!-- OPTIONS -->
Tiny Tim|Ebenezer Scrooge|Oliver Twist|Pip
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Scrooge is the famous miser who is visited by three ghosts.
<!-- QUESTION_END -->

<!-- QUESTION_START -->
What did Dickens often use his stories for?
<!-- OPTIONS -->
To teach math|To highlight problems in society like poverty|To give cooking tips|To sell newspapers
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Dickens wanted to show how hard life was for the poor and encouraged people to be more kind.
<!-- QUESTION_END -->`,
      quizId: quizId++,
      assessmentType: 'quiz',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'english',
      lessonNumber: 4,
      title: "Shakespeare: The Story of Macbeth",
      emoji: '⚔️',
      content: `# Shakespeare: Macbeth ⚔️

*Macbeth* is one of Shakespeare's most famous "Tragedies". It is a dark story about ambition and power.

## The Simplified Story
1. **The Prophecy**: Brave General Macbeth meets three witches who tell him he will one day be King.
2. **The Ambition**: Macbeth (and his wife, Lady Macbeth) want the power so much they decide to do something terrible to get it.
3. **The Guilt**: Once Macbeth is King, he finds that he cannot be happy because of the bad things he did. He feels "guilty" and starts to lose his mind.
4. **The End**: Eventually, Macbeth's ambition leads to his downfall.

## Famous Quotes
- **"Double, double toil and trouble; Fire burn and caldron bubble."** (The Witches)
- **"Out, damned spot! out, I say!"** (Lady Macbeth feeling guilty)

## Themes
- **Ambition**: wanting power too much.
- **Fate**: is our life planned out, or do we make our own choices?

## Practice Questions

<!-- QUESTION_START -->
What do the three witches tell Macbeth?
<!-- OPTIONS -->
That he will lose his job|That he will become King|That he should go on holiday|That he will find gold
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The witches' prophecy is what starts Macbeth's "ambition" to become King.
<!-- QUESTION_END -->

<!-- QUESTION_START -->
How does Macbeth feel after he becomes King?
<!-- OPTIONS -->
Very happy and relaxed|Guilty and scared|Bored|Angry at his friends
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The "guilt" of how he became King makes Macbeth very unhappy and paranoid.
<!-- QUESTION_END -->

<!-- QUESTION_START -->
What is a 'Tragedy' in Shakespeare's plays?
<!-- OPTIONS -->
A play that is very funny|A serious play with a sad ending|A play about animals|A short poem
<!-- CORRECT -->
1
<!-- EXPLANATION -->
*Macbeth* is a tragedy because it is a dark story where the main characters have a sad ending.
<!-- QUESTION_END -->`,
      quizId: quizId++,
      assessmentType: 'quiz',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'english',
      lessonNumber: 5,
      title: "Adjective Adventure",
      emoji: '🌟',
      assessmentType: 'parts-of-speech-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'english',
      lessonNumber: 6,
      title: "Spelling Safari",
      emoji: '🦁',
      assessmentType: 'spelling-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'english',
      lessonNumber: 7,
      title: "Prefix Power",
      emoji: '🔌',
      assessmentType: 'prefix-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'english',
      lessonNumber: 8,
      title: "Suffix Superstars",
      emoji: '🚀',
      assessmentType: 'suffix-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'english',
      lessonNumber: 2,
      title: "Introduction to Shakespeare",
      emoji: '📜',
      content: `# Introduction to William Shakespeare

William Shakespeare is one of the most famous writers in the English language. He wrote many plays and poems that are still performed and read today.

## Famous Plays

Shakespeare wrote three types of plays:
- **Tragedies**: Sad stories where the main character suffers. Examples include *Hamlet* and *Romeo and Juliet*.
- **Comedies**: Funny stories with happy endings. Examples include *A Midsummer Night's Dream* and *Twelfth Night*.
- **Histories**: Plays about the lives of English kings. Examples include *Richard III* and *Henry V*.

## Famous Quotes

Shakespeare's words are still used today. Have you heard any of these?
- "To be or not to be, that is the question." (*Hamlet*)
- "All the world's a stage, and all the men and women merely players." (*As You Like It*)
- "A horse! a horse! my kingdom for a horse!" (*Richard III*)

## Shakespeare's Language

Shakespeare wrote in a style of English that is different from what we speak today. It can be challenging to understand, but it is also very beautiful and poetic.

## Watch a Video

To learn more about Shakespeare, watch this video:

https://www.youtube.com/watch?v=gB6f_v8_32k
      `,
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'english',
      lessonNumber: 3,
      title: "The World of Roald Dahl",
      emoji: '📚',
      content: `# The World of Roald Dahl

Roald Dahl was a master of imaginative and humorous writing. His stories are famous for their quirky characters, fantastical plots, and wonderfully descriptive language.

## Descriptive Writing

Dahl had a special talent for creating vivid pictures with his words. Consider this description of the BFG:
> "It was three times as tall as the tallest man. It was so tall its head was higher than the upstairs windows of the houses. It was wearing a long black cloak and in one hand it was holding what looked like a very long, thin trumpet."

## Invented Words (Gobblefunk)

Roald Dahl invented over 500 words and phrases! This special language is called "Gobblefunk". Here are a few examples:
- **Snozzcumber**: A disgusting vegetable that is the only thing the BFG eats.
- **Scrumdiddlyumptious**: Something that is absolutely delicious.
- **Oompa-Loompa**: The small workers in Willy Wonka's chocolate factory.

## Memorable Characters

From the clever Matilda to the ghastly Twits, Roald Dahl's characters are unforgettable. He often created characters that were either purely good or purely evil, making his stories exciting and easy to follow.

## Watch a Video

Learn more about Roald Dahl's amazing world in this video:

https://www.youtube.com/watch?v=s9E4FnS_2-U
      `,
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'english',
      lessonNumber: 4,
      title: "A Journey into Dickensian London",
      emoji: '🎩',
      content: `# A Journey into Dickensian London

Charles Dickens was a famous novelist in the Victorian era. His stories often highlighted the social problems of his time, such as poverty and injustice.

## Vivid Settings

Dickens was a master at describing the settings of his stories. He brought the city of London to life, painting a picture of its dark, foggy streets, and the great contrast between the lives of the rich and the poor.

## Memorable Characters

Dickens created some of the most famous characters in English literature:
- **Ebenezer Scrooge** from *A Christmas Carol*, a miserable old man who learns to be kind.
- **Oliver Twist**, a poor orphan who asks for "more" gruel.
- **Miss Havisham** from *Great Expectations*, a wealthy spinster who wears her wedding dress every day.

## Moral Themes

Dickens' stories often have strong moral themes. They explore ideas of kindness, compassion, and the importance of social reform. He hoped his stories would make people think about the problems in society and inspire them to make a change.

## Watch a Video

Here is a summary of *A Christmas Carol*:

https://www.youtube.com/watch?v=OFg_so_33aM
      `,
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 4,
      title: "Negative Numbers",
      emoji: '🔢',
      content: `# Negative Numbers 🔢

Let's learn about negative numbers!

## What are Negative Numbers?

Numbers less than zero!

## Examples

- -5 is less than 0
- -10 is less than -5
- 0 is neither positive nor negative

## Number Line

... -3, -2, -1, 0, 1, 2, 3 ...

## Comparing

- -5 < -2 (negative 5 is less than negative 2)
- -1 > -5 (negative 1 is greater than negative 5)

## How to Play

Drag on number line and type comparisons! 🎮`,
      quizId: quizId++,
      assessmentType: 'number-line-game',
      categoryId: null,
    }),



    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'history',
      lessonNumber: 9,
      title: "Making History - How We Study the Past",
      emoji: '🔍',
      content: `# Making History - How We Study the Past 🔍

Historians are detectives with notebooks, microphones, and museum gloves. They question every clue, compare every story, and turn piles of evidence into explanations the rest of us can understand.

## Field Notebook
- **Primary Clues** – diaries, newspapers, maps, films, and objects created during the time period.
- **Secondary Guides** – textbooks, documentaries, and podcasts that explain what happened later.
- **Artifacts & Oral Histories** – tools, clothing, and living memories that carry the feelings of the past.

## Investigation Skills
- Ask “who created this, when, and why?” before trusting a source.
- Cross-check memories with records so that one person’s voice is balanced by others.
- Notice bias and perspective: an artist, soldier, or reporter may tell different stories about the same day.

## Writing Like a Historian
- Start with a **big question** the reader cares about.
- Stack evidence (quotes, statistics, artifacts) that truly answer the question.
- Reflect on meaning: What changed? Who benefited? Why does it matter now?

## Game Instructions – Making History Lab
1. **Source Sorting Lab** – Drag (well, tap!) each card into the right category. Decide if it is primary, secondary, an artifact, or an oral history.
2. **Source Detective** – Read real investigation cards and choose the action that keeps your history fair and reliable.
3. **History Brief Builder** – Assemble the question, evidence, and reflection pieces to craft a publish-ready summary.

Earn up to 100 points by completing every phase. A perfect score means you investigated like a pro historian who can sort sources, evaluate reliability, and craft meaningful stories.

## Learning Goals
- Distinguish between different types of sources and why each matters.
- Evaluate reliability by asking purposeful questions and comparing perspectives.
- Organize findings into a clear question → evidence → insight structure.
- Explain why history is more than memorizing dates—it is using evidence to understand people and change.

Grab your notebook, historian. The archives are open and you’re on the research team!`,
  quizId: null,
      assessmentType: 'making-history-game',
      categoryId: null,
    }),



    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 5,
      title: "BODMAS/BIDMAS",
      emoji: '🔢',
      content: `# BODMAS/BIDMAS 🔢

Let's learn the order of operations!

## What is BODMAS?

Brackets, Orders, Division, Multiplication, Addition, Subtraction

## Order of Operations

1. Brackets first
2. Orders (powers)
3. Division and Multiplication (left to right)
4. Addition and Subtraction (left to right)

## Examples

- 2 + 3 × 4 = 2 + 12 = 14 (not 20!)
- (2 + 3) × 4 = 5 × 4 = 20
- 10 - 2 × 3 = 10 - 6 = 4

## How to Play

Type order of operations and click steps! 🎮`,
      quizId: quizId++,
      assessmentType: 'typing-math-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 6,
      title: "Ratio and Proportion",
      emoji: '⚖️',
      content: `# Ratio and Proportion ⚖️

Let's learn about ratios!

## What is a Ratio?

A ratio compares two amounts!

## Examples

- 2:3 means 2 parts to 3 parts
- If there are 4 apples and 6 oranges, the ratio is 4:6 or 2:3

## Simplifying Ratios

- 4:6 = 2:3 (divide both by 2)
- 8:12 = 2:3 (divide both by 4)

## Proportion

If 2:3 = 4:?, then ? = 6

## How to Play

Drag ratios and type proportions! 🎮`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 7,
      title: "Percentages of Amounts",
      emoji: '📊',
      content: `# Percentages of Amounts 📊

Let's learn to find percentages of amounts!

## Finding Percentages

- 50% of 100 = 50
- 25% of 80 = 20
- 10% of 50 = 5

## Methods

- 10% = divide by 10
- 25% = divide by 4
- 50% = divide by 2
- 75% = 3 × 25%

## Examples

- 20% of 60 = 12
- 15% of 40 = 6

## How to Play

Type calculations and click answers! 🎮`,
      quizId: quizId++,
      assessmentType: 'typing-math-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 8,
      title: "Area of Rectangles/Triangles",
      emoji: '📐',
      content: `# Area of Rectangles/Triangles 📐

Let's learn area formulas!

## Area of Rectangle

Area = length × width

Example: 5 × 3 = 15 square units

## Area of Triangle

Area = (base × height) ÷ 2

Example: (6 × 4) ÷ 2 = 12 square units

## Examples

- Rectangle 8 × 5 = 40 square units
- Triangle base 10, height 6 = 30 square units

## How to Play

Type formulas and drag measurements! 🎮`,
      quizId: quizId++,
      assessmentType: 'typing-math-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 9,
      title: "Pie Charts",
      emoji: '🥧',
      content: `# Pie Charts 🥧

Let's learn about pie charts!

## What is a Pie Chart?

A pie chart shows data as slices of a circle!

## Reading Pie Charts

- Each slice represents part of the whole
- Bigger slice = more data
- All slices add up to 100%

## Examples

- Favorite colors
- Survey results
- Data distribution

## How to Play

Click segments and drag to create charts! 🎮`,
      quizId: quizId++,
      assessmentType: 'graph-builder-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 10,
      title: "Algebra: Solving Equations",
      emoji: '🔢',
      content: `# Algebra: Solving Equations 🔢

Let's learn to solve equations!

## What is an Equation?

An equation has an equals sign!

## Solving Equations

Find the value of the variable!

## Examples

- x + 5 = 10 → x = 5
- y - 3 = 7 → y = 10
- 2z = 8 → z = 4

## Steps

1. Do the same to both sides
2. Simplify
3. Find the answer

## How to Play

Type solutions and drag variables! 🎮`,
      quizId: quizId++,
      assessmentType: 'typing-math-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 11,
      title: "Converting Fractions/Decimals/Percentages",
      emoji: '🔄',
      content: `# Converting Fractions/Decimals/Percentages 🔄

Let's learn to convert between forms!

## Conversions

- 1/2 = 0.5 = 50%
- 1/4 = 0.25 = 25%
- 3/4 = 0.75 = 75%
- 1/10 = 0.1 = 10%

## Converting Fractions to Decimals

Divide numerator by denominator!

## Converting Decimals to Percentages

Multiply by 100!

## Examples

- 1/5 = 0.2 = 20%
- 2/5 = 0.4 = 40%

## How to Play

Drag conversions and type answers! 🎮`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 12,
      title: "Scale and Maps",
      emoji: '🗺️',
      content: `# Scale and Maps 🗺️

Let's learn about scale!

## What is Scale?

Scale shows how much smaller a map is than real life!

## Reading Scale

- 1 cm on map = 100 m in real life
- 1:100 means 1 unit = 100 units

## Examples

- If 1 cm = 5 km, then 3 cm = 15 km
- If scale is 1:1000, then 2 cm = 2000 cm = 20 m

## Using Scale

Measure on map, then multiply by scale!

## How to Play

Click map points and type distances! 🎮`,
      quizId: quizId++,
      assessmentType: 'coordinate-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 13,
      title: "Multi-Step Word Problems",
      emoji: '🧩',
      content: `# Multi-Step Word Problems 🧩

Let's solve complex word problems!

## Multi-Step Problems

Problems that need more than one calculation!

## Steps to Solve

1. Read carefully
2. Find all the numbers
3. Decide what operations to use
4. Solve step by step
5. Check your answer

## Example

"Tom has £50. He buys 3 books at £8 each and 2 pens at £3 each. How much money does he have left?"

Steps:
1. Cost of books: 3 × £8 = £24
2. Cost of pens: 2 × £3 = £6
3. Total spent: £24 + £6 = £30
4. Money left: £50 - £30 = £20

## How to Play

Type solutions and click operations! 🎮`,
      quizId: quizId++,
      assessmentType: 'typing-math-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'history',
      lessonNumber: 1,
      title: "World War I - The Great War",
      emoji: '🌍',
      content: `# World War I - The Great War 🌍



Let's learn about World War I!



## When Did It Happen?



World War I lasted from 1914 to 1918.



## Why Did It Start?



- Tensions between countries

- Alliances between nations

- Assassination of Archduke Franz Ferdinand

- Many countries got involved



## Who Fought?



**Allied Powers:**

- Britain

- France

- Russia

- United States (joined later)

- Many others



**Central Powers:**

- Germany

- Austria-Hungary

- Ottoman Empire



## Life in the Trenches



- Soldiers lived in trenches (ditches)

- Very difficult conditions

- Mud, rats, and disease

- Dangerous and scary

- They fought for years



## New Weapons



- Machine guns

- Tanks (first used)

- Poison gas

- Airplanes (for war)

- Submarines



## The End



- War ended in 1918

- Many people died

- Countries changed

- Led to World War II

- Peace treaties were signed



## Fun Activities



- Research the war

- Make a timeline

- Write about soldiers' experiences

- Learn about the impact



## Remember



- War lasted 1914-1918

- Many countries involved

- Very difficult time

- Important to remember!



## Practice Questions



<!-- QUESTION_START -->
When did World War I happen?
<!-- OPTIONS -->
1910-1914|1914-1918|1918-1922|1920-1924
<!-- CORRECT -->
1
<!-- EXPLANATION -->
World War I lasted from 1914 to 1918! It was a very difficult time with many countries involved!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What were soldiers' living conditions like in the trenches?
<!-- OPTIONS -->
Comfortable|Very difficult with mud, rats, and disease|Easy|Fun
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Soldiers lived in trenches (ditches) with very difficult conditions - mud, rats, and disease. It was dangerous and scary!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Which countries were in the Allied Powers?
<!-- OPTIONS -->
Germany, Austria-Hungary|Britain, France, Russia, United States|Only Germany|Only Britain
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Allied Powers included Britain, France, Russia, and the United States (who joined later), plus many others!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What new weapons were used in World War I?
<!-- OPTIONS -->
Only swords|Machine guns, tanks, poison gas, airplanes, and submarines|Only guns|Only knives
<!-- CORRECT -->
1
<!-- EXPLANATION -->
New weapons included machine guns, tanks (first used), poison gas, airplanes (for war), and submarines!
<!-- QUESTION_END -->`,
      quizId: 82,
      assessmentType: 'world-war-i-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'history',
      lessonNumber: 2,
      title: "Between the Wars - 1920s and 1930s",
      emoji: '📅',
      content: `# Between the Wars - 1920s and 1930s 📅

The period between the end of the Great War (1918) and the start of World War II (1939) was a time of extreme contrast: from the celebration of the "Roaring Twenties" to the desperation of the "Great Depression."

## The Roaring Twenties & Social Change
After the trauma of the war, society underwent a transformation. 
- **Suffrage**: In many countries, women campaigned for and won the right to vote.
- **Consumerism**: New technologies like the radio, cinema, and mass-produced cars (like the Model T) changed how people spent their time and money.
- **Flappers**: Young women challenged social norms with shorter hair, shorter dresses, and a new sense of independence.

## The Economic Crisis: Hard Times
The prosperity of the 1920s was fragile.
- **Hyperinflation (1923)**: In Germany, the economy collapsed so badly that money became worthless. People needed wheelbarrows of cash just to buy a loaf of bread.
- **The Wall Street Crash (1929)**: The US stock market collapsed, leading to the **Great Depression**. This wasn't just in America; it caused banks to close and unemployment to soar worldwide.

## Rise of the Dictators
Economic suffering led many people to lose faith in democracy.
- **Totalitarianism**: In countries like Germany, Italy, and the Soviet Union, dictators (Hitler, Mussolini, and Stalin) took absolute control over every part of life.
- **The League of Nations**: Created to keep peace, this international group struggled because it lacked its own army and the USA never joined.

In the game, you will act as a historical analyst. Can you navigate these global crises and understand why the world was sliding toward another conflict?`,
      quizId: null,
      assessmentType: 'between-wars-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'history',
      lessonNumber: 3,
      title: "World War II - Global Conflict",
      emoji: '🌍',
      content: `# World War II - Global Conflict 🌍

World War II (1939–1945) was the most destructive conflict in human history, involving over 30 countries and resulting in the deaths of an estimated 70 to 85 million people.

## The Axis vs. The Allies
The war was fought between two main groups:
- **The Axis Powers**: Led by Nazi Germany (Adolf Hitler), Fascist Italy (Benito Mussolini), and Imperial Japan (Emperor Hirohito).
- **The Allied Powers**: Led by Great Britain (Winston Churchill), the Soviet Union (Joseph Stalin), the United States (Franklin D. Roosevelt), and Free France (Charles de Gaulle).

## Key Turning Points
To understand the war, we must look at the strategic moments where the tide shifted:
1. **The Battle of Britain (1940)**: The RAF's defense of the UK against the Luftwaffe, preventing a German invasion.
2. **Pearl Harbor & Pacific War (1941)**: Japan's surprise attack on the US Navy, bringing the industrial might of the USA into the war.
3. **The Battle of Stalingrad (1942-1943)**: A catastrophic defeat for Germany in Russia, marking the end of their eastward expansion.
4. **D-Day (June 6, 1944)**: Operation Overlord, the massive Allied invasion of Normandy, which began the liberation of Western Europe.

## The Holocaust: A Global Tragedy
During the war, Nazi Germany carried out the **Holocaust**—a systematic, state-sponsored genocide that murdered 6 million Jews and millions of others. It remains the most horrific example of hatred and intolerance in history.

## The End of the War
The war in Europe ended in May 1945 (V-E Day), and the war against Japan ended in August 1945 (V-J Day) after the use of atomic bombs on Hiroshima and Nagasaki. The war's end led to the creation of the **United Nations** to prevent future global conflicts.

In the game, you will evaluate these critical turning points. Can you identify the strategies and events that led to the Allied victory?`,
      quizId: null,
      assessmentType: 'world-war-2-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'history',
      lessonNumber: 4,
      title: "The Cold War - Superpower Showdown",
      emoji: '❄️',
      content: `# The Cold War - Superpower Showdown ❄️

    The Cold War (1945–1991) was a global contest between two superpowers—the United States and its democratic allies versus the Soviet Union and its communist partners. Instead of fighting directly, they used alliances, propaganda, science, spies, and occasional proxy wars to compete for influence.

    ## Quick Timeline
    - **1945** – World War II ends, Europe is divided.
    - **1948** – Berlin Blockade and Airlift prove the city will not be abandoned.
    - **1955** – NATO and the Warsaw Pact face each other across the "Iron Curtain."
    - **1962** – Cuban Missile Crisis brings the world to the brink of nuclear war.
    - **1969** – Apollo 11 moon landing becomes a soft-power victory.
    - **1989-1991** – The Berlin Wall falls and the Soviet Union dissolves.

    ## Power Blocks
    - **NATO / USA-led bloc** – Democracies that promoted elections, markets, and open media.
    - **Soviet Bloc** – One-party socialist states where the communist party controlled politics and the economy.
    - **Non-Aligned Nations** – Countries (India, Egypt, Yugoslavia, Ghana) that refused to be pulled into either camp.

    ## Flashpoints to Know
    - **Berlin** – A divided city that symbolized freedom vs. control.
    - **Korea & Vietnam** – Proxy wars where superpowers backed different sides.
    - **Cuba** – Soviet missiles on America’s doorstep triggered tense negotiations.
    - **Afghanistan** – The Soviet Union’s 1979 invasion drained resources and global support.

    ## Ideas, Science, and Space
    - Satellites, rockets, and computers were created to prove that each system produced better knowledge and better lives.
    - Cultural exchanges, Olympic games, and media broadcasts were used to win hearts and minds.
    - Nuclear weapons could destroy the planet, so diplomacy (hotlines, treaties, United Nations meetings) became as important as armies.

    ## How to Play – Cold War Strategy Lab
    1. **Map the Alliances** – Sort real countries into NATO, Soviet Bloc, or Non-Aligned and read why each choice mattered.
    2. **Crisis Room** – Recreate Berlin, Cuba, and Space Race decisions to see which responses prevented war.
    3. **Innovation Lab** – Assemble the technology kits (rockets, diplomacy tools, civil-defense plans) that kept the Cold War “cold.”
    4. Earn points in every phase. A perfect 100% means you balanced military power, science, and diplomacy.

    ## Learning Goals
    - Explain why the Cold War stayed “cold” even while nuclear weapons existed.
    - Identify alliances, crisis responses, and inventions that shifted global power.
    - Connect the Space Race, civil defense, and diplomacy to everyday life.

    ## Vocabulary
    - **Iron Curtain** – The dividing line in Europe between Soviet-controlled east and democratic west.
    - **Mutually Assured Destruction (MAD)** – The idea that nuclear war would destroy everyone.
    - **Proxy War** – When superpowers support different sides in another country’s conflict.
    - **Deterrence** – Showing enough strength to discourage an attack.

    ## Remember
    - The Cold War was a contest of systems, stories, and science, not just weapons.
    - Small countries and ordinary citizens played important roles in resisting pressure.
    - Diplomacy, technology, and critical thinking can prevent crises from turning into wars.
    - You are now the strategist—use what you learned in the game to explain how the Cold War shaped today’s world!`,
      quizId: null,
      assessmentType: 'cold-war-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'history',
      lessonNumber: 5,
      title: "The Civil Rights Movement",
      emoji: '✊',
      content: `# The Civil Rights Movement ✊

The Civil Rights Movement was a social movement and campaign in the United States from 1954 to 1968 to abolish institutional racial discrimination, disenfranchisement, and racial segregation.

## The Era of Segregation (Jim Crow Laws)
Following the end of slavery, many states (mainly in the South) passed "Jim Crow" laws. These created a system where Black and White Americans were separated in almost every area of life: schools, buses, restaurants, and even water fountains. The law said these could be "separate but equal," but in reality, facilities for Black Americans were almost always inferior.

## Landmark Legal Battles
The movement used the court system to challenge these unfair laws.
- **Brown v. Board of Education (1954)**: The Supreme Court ruled that "separate educational facilities are inherently unequal." This was a massive victory that ordered the desegregation of schools.

## The Power of Non-Violent Protest
Led by figures like **Dr. Martin Luther King Jr.**, the movement prioritized non-violent resistance.
- **Montgomery Bus Boycott (1955)**: After **Rosa Parks** was arrested for refusing to give up her bus seat, the Black community boycotted the bus system for 381 days until the law was changed.
- **The March on Washington (1963)**: 250,000 people gathered for the "I Have a Dream" speech, demanding economic rights and an end to racism.

## Legislative Victories
The courage of marchers and protesters forced the government to act:
- **Civil Rights Act of 1964**: Outlawed discrimination based on race, color, religion, sex, or national origin.
- **Voting Rights Act of 1965**: Prohibited racial discrimination in voting, such as the literacy tests used to prevent Black Americans from casting their ballots.

In the game, you will navigate these critical milestones. Can you understand the bravery required to change a nation's laws?`,
      quizId: null,
      assessmentType: 'civil-rights-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'history',
      lessonNumber: 6,
      title: "Modern World - 1960s to 1990s",
      emoji: '🌐',
      content: `# Modern World - 1960s to 1990s 🌐



Let's learn about the modern world!



## The 1960s



- A time of change

- Young people protested

- Music changed

- Fashion changed

- Society changed



## The 1970s



- More changes

- Technology advanced

- Computers started

- Space exploration continued

- World events happened



## The 1980s



- Computers became common

- Technology grew

- Music and culture changed

- World events

- Life was different



## The 1990s



- Internet became popular

- Computers everywhere

- Communication changed

- World became connected

- Technology advanced



## Important Events



- Fall of Berlin Wall (1989)

- End of Cold War (1991)

- Internet revolution

- Globalization

- Many changes



## Fun Activities



- Learn about each decade

- Study important events

- Make a timeline

- Write about changes



## Remember



- 1960s-1990s had many changes

- Technology advanced

- World became connected

- Life changed a lot!



## Practice Questions



<!-- QUESTION_START -->
What happened in the 1960s?
<!-- OPTIONS -->
Nothing|A time of change with young people protesting, music and fashion changing|Only war|Only peace
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The 1960s were a time of change! Young people protested, music changed, fashion changed, and society changed!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What became popular in the 1990s?
<!-- OPTIONS -->
Nothing|The Internet became popular|Only TV|Only radio
<!-- CORRECT -->
1
<!-- EXPLANATION -->
In the 1990s, the Internet became popular! Computers were everywhere, communication changed, the world became connected, and technology advanced!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What important event happened in 1989?
<!-- OPTIONS -->
Nothing|Fall of Berlin Wall|World War II|Cold War started
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Fall of Berlin Wall happened in 1989! The Cold War ended in 1991, and there was an Internet revolution!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What happened to technology from 1960s to 1990s?
<!-- OPTIONS -->
Nothing|Technology advanced - computers started, became common, and Internet became popular|It stayed the same|It got worse
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Technology advanced greatly! Computers started in the 1970s, became common in the 1980s, and the Internet became popular in the 1990s!
<!-- QUESTION_END -->`,
      quizId: 84,
      assessmentType: 'modern-world-1960s-1990s-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'history',
      lessonNumber: 7,
      title: "Modern World - 2000s to Today",
      emoji: '📱',
      content: `# Modern World - 2000s to Today 📱



Let's learn about recent history!



## The 2000s



- New millennium

- Technology advanced

- Internet grew

- Social media started

- World changed



## The 2010s



- Smartphones became common

- Social media grew

- Technology everywhere

- World became more connected

- Many changes



## Today (2020s)



- We live in this time!

- Technology is everywhere

- Internet connects us all

- We're making history now

- Future is ahead



## Recent Events



- COVID-19 pandemic

- Climate change awareness

- Technology advances

- Social movements

- World events



## Technology Today



- Smartphones

- Internet

- Social media

- Artificial Intelligence

- Many new things



## Making History



- We're living in history

- Our actions matter

- We can make a difference

- We're part of the story

- History continues



## Fun Activities



- Learn about recent events

- Study current issues

- Think about the future

- Write about today



## Remember



- We're living in history

- Technology changed everything

- We're making history now

- The future is ahead!



## Practice Questions



<!-- QUESTION_START -->
What became common in the 2010s?
<!-- OPTIONS -->
Nothing|Smartphones became common|Only computers|Only TV
<!-- CORRECT -->
1
<!-- EXPLANATION -->
In the 2010s, smartphones became common! Social media grew, technology was everywhere, and the world became more connected!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What technology do we have today?
<!-- OPTIONS -->
Nothing|Smartphones, Internet, social media, and Artificial Intelligence|Only phones|Only computers
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Today we have smartphones, Internet, social media, Artificial Intelligence, and many new things! Technology is everywhere!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What recent events have happened?
<!-- OPTIONS -->
Nothing|COVID-19 pandemic, climate change awareness, technology advances, and social movements|Only good things|Only bad things
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Recent events include the COVID-19 pandemic, climate change awareness, technology advances, social movements, and world events!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Why is it important to know we're making history?
<!-- OPTIONS -->
It's not important|Our actions matter, we can make a difference, and we're part of the story|It doesn't matter|We can't do anything
<!-- CORRECT -->
1
<!-- EXPLANATION -->
We're living in history! Our actions matter, we can make a difference, we're part of the story, and history continues!
<!-- QUESTION_END -->`,
      quizId: 84,
      assessmentType: 'modern-world-2000s-today-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'history',
      lessonNumber: 8,
      title: "Historical Sources and Evidence",
      emoji: '📜',
      content: `# Historical Sources and Evidence 📜



Let's learn about historical sources!



## What are Historical Sources?



Historical sources are evidence from the past that help us understand history.



## Types of Sources



**Primary Sources**

- Created at the time

- Letters, diaries, photos

- Official documents

- Artifacts

- First-hand accounts



**Secondary Sources**

- Created later

- History books

- Documentaries

- Articles

- Interpretations



## Primary Sources



**Written Sources**

- Letters and diaries

- Official records

- Newspapers

- Books from the time

- Speeches



**Visual Sources**

- Paintings

- Photographs

- Maps

- Drawings

- Videos



**Artifacts**

- Objects from the past

- Tools, weapons, clothing

- Buildings

- Coins

- Technology



## Using Sources



**Questions to Ask:**

- Who created it?

- When was it created?

- Why was it created?

- Is it reliable?

- What does it tell us?

- What perspective does it show?



## Evaluating Sources



- Is it primary or secondary?

- Is it reliable?

- What is the perspective?

- What is missing?

- How does it compare to other sources?

- What biases might exist?



## Fun Activities



- Examine primary sources

- Compare different sources

- Write about what sources tell us

- Create your own sources

- Evaluate sources critically



## Remember



- Sources are evidence

- Primary sources are from the time

- Evaluate sources carefully

- Sources help us understand history!



## Practice Questions



<!-- QUESTION_START -->
What are primary sources?
<!-- OPTIONS -->
Sources created later|Sources created at the time like letters, diaries, photos, and artifacts|Only books|Only videos
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Primary sources are created at the time - letters, diaries, photos, official documents, artifacts, and first-hand accounts!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What are secondary sources?
<!-- OPTIONS -->
Sources from the time|Sources created later like history books, documentaries, and articles|Only photos|Only letters
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Secondary sources are created later - history books, documentaries, articles, and interpretations!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What questions should we ask about sources?
<!-- OPTIONS -->
Nothing|Who created it, when, why, is it reliable, what does it tell us|Only who|Only when
<!-- CORRECT -->
1
<!-- EXPLANATION -->
We should ask: Who created it? When was it created? Why was it created? Is it reliable? What does it tell us? What perspective does it show?
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Why is it important to evaluate sources?
<!-- OPTIONS -->
It's not important|To understand if they're reliable, what perspective they show, and what might be missing|It doesn't matter|We can't learn anything
<!-- CORRECT -->
1
<!-- EXPLANATION -->
We evaluate sources to see if they're reliable, understand the perspective, see what's missing, compare to other sources, and check for biases!
<!-- QUESTION_END -->`,
      quizId: 96,
      assessmentType: 'historical-sources-evidence-game',
      categoryId: null,
    }),


    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'history',
      lessonNumber: 10,
      title: "Understanding Historical Change",
      emoji: '🔄',
      content: `# Understanding Historical Change 🔄

In Year 6, we move beyond just "what" happened to "how" and "why" things change over time. Understanding historical change is the core skill of a master historian.

## Continuity vs. Change
Not everything in history changes at the same rate.
- **Continuity**: Aspects of life that remain the same over long periods. For example, humans have always needed food, shelter, and community.
- **Change**: Aspects that transform. For example, how we communicate (from clay tablets to instant messaging) or how we travel (from walking to spaceflight).

## Causality: Cause and Effect
Every event has a reason (Cause) and a result (Effect).
- **Short-term Causes**: Immediate sparks that start an event (e.g., the assassination of Archduke Franz Ferdinand).
- **Long-term Causes**: Deep-rooted tensions that build up over years (e.g., the rise of nationalism and militarism before WWI).

## Historical Significance
Why do we remember some people and events but not others? Historians use the **5Rs** to judge significance:
1. **Remarkable**: Was it noticed at the time?
2. **Remembered**: Is it still part of our collective memory?
3. **Resonant**: Does it still impact us today?
4. **Resultful**: Did it lead to other major changes?
5. **Revealing**: Does it reveal something important about that era?

In the game, you will evaluate these concepts. Can you distinguish between long-lasting continuities and rapid historical changes?`,
      quizId: null,
      assessmentType: 'historical-change-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'technology',
      lessonNumber: 1,
      title: "TapTapTap: Champion Level 1",
      emoji: '👆',
      content: `# TapTapTap: Champion Level 1 👆

The ultimate challenge! You've reached the champion level - the highest difficulty!

## How to Play

- Tap targets as they appear on screen
- Targets appear every 0.6 seconds (incredibly fast!)
- Targets are very small and require perfect precision
- 30 seconds to score as many points as possible!

## Scoring System

- **Bronze**: 30-59 points
- **Silver**: 60-89 points
- **Gold**: 90-119 points
- **Platinum**: 120+ points

You need at least **Bronze** (30 points) to progress!

## Tips

- This is the hardest level - be patient!
- Focus on accuracy over speed
- Practice makes perfect - keep trying!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'technology',
      lessonNumber: 2,
      title: "TapTapTap: Champion Level 2",
      emoji: '👆',
      content: `# TapTapTap: Champion Level 2 👆

The final challenge! You're at the top level - show what you can do!

## How to Play

- Tap targets as they appear
- Same speed as Level 1 - the ultimate test!
- 30 seconds to score points

## Scoring System

- **Bronze**: 30-59 points
- **Silver**: 60-89 points
- **Gold**: 90-119 points
- **Platinum**: 120+ points

You need at least **Bronze** (30 points) to progress!

## Challenge

You've made it to the champion level! Can you achieve Platinum? You're a true tapping champion!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),



     new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'art',
      lessonNumber: 1,
      title: "Art: Color Theory",
      emoji: '🎨',
      assessmentType: 'coloring-game',
      content: `# Art: Color Theory - Complementary Colors 🎨

Discover the fascinating world of color theory! Colors can be mixed and matched in special ways to create beautiful combinations.

## Primary Colors
These are the main colors that can't be made by mixing other colors:
- **Red**
- **Blue**
- **Yellow**

## Secondary Colors
These are made by mixing two primary colors:
- **Orange** = Red + Yellow
- **Green** = Blue + Yellow
- **Purple** = Red + Blue

## Complementary Colors
Complementary colors are pairs of colors that sit opposite each other on the color wheel. When placed next to each other, they make each other appear brighter and more vibrant!

- **Red** is complementary to **Green**
- **Blue** is complementary to **Orange**
- **Yellow** is complementary to **Purple**

## How to Use Complementary Colors
- Artists use complementary colors to make their paintings more exciting
- Complementary colors can create contrast and focus in artwork
- Mixing complementary colors creates neutral tones like browns and grays

## Activity Instructions
- Fill in each segment of the color wheel with the correct color
- Pay attention to which colors are opposites on the wheel
- Notice how complementary colors make each other stand out`,
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'english',
      lessonNumber: 1,
      title: "Shakespeare: Introduction to the Bard",
      emoji: '🎭',
      content: `# Introduction to William Shakespeare 🎭

Meet the most famous writer in the English language!

## Who was Shakespeare?
- Born in 1564 in Stratford-upon-Avon, England
- Wrote 37 plays and 154 sonnets
- Died in 1616
- Known as "The Bard" or "The Swan of Avon"

## Why is he Important?
- Created over 1,700 words still used today
- Influenced storytelling techniques
- His themes are still relevant today
- Works performed worldwide

## Famous Plays:
- **Tragedies**: Romeo and Juliet, Hamlet, Macbeth, King Lear
- **Comedies**: A Midsummer Night's Dream, Much Ado About Nothing
- **Histories**: Henry V, Richard III

## Fun Facts:
- He wrote about universal themes: love, power, betrayal, friendship
- Many of his phrases are still used today: "break the ice", "wild goose chase"
- His theater was called the Globe Theatre

## Activity:
Explore Shakespeare's life and times!`,
      quizId: quizId++,
      assessmentType: 'english-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'english',
      lessonNumber: 2,
      title: "Shakespeare: Famous Quotes",
      emoji: '📜',
      content: `# Famous Shakespeare Quotes 📜

Explore memorable lines from Shakespeare's plays!

## Well-Known Quotes:

**"To be or not to be, that is the question"** (Hamlet)
- About life, death, and difficult choices

**"All the world's a stage, and all the men and women merely players"** (As You Like It)
- Life is like a play where everyone has roles

**"Love looks not with the eyes, but with the mind"** (A Midsummer Night's Dream)
- Love is about feelings, not appearance

**"The course of true love never did run smooth"** (A Midsummer Night's Dream)
- Love has challenges

**"Uneasy lies the head that wears a crown"** (Henry IV)
- Power brings responsibility and stress

**"Some are born great, some achieve greatness, and some have greatness thrust upon 'em"** (Twelfth Night)
- Different ways people become important

## Modern Meaning:
Many of these expressions are still used today in everyday language!

## Activity:
Match the quote to the play or explain what it means in your own words.`,
      quizId: quizId++,
      assessmentType: 'english-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'english',
      lessonNumber: 3,
      title: "Shakespeare: Understanding Iambic Pentameter",
      emoji: '🎵',
      content: `# Iambic Pentameter 🎵

Learn about Shakespeare's rhythmic writing pattern!

## What is Iambic Pentameter?
- A poetic rhythm that sounds natural when spoken aloud
- Consists of 10 syllables per line (penta = five, meter = measure)
- Each line has 5 "feet" (pairs of syllables)
- Each foot: UNstressed followed by STRESSED syllable (da-DUM)

## Example:
"But SOFT! what LIGHT through YONder WINdow BREAKS?"
(Romeo and Juliet)
(da-DUM da-DUM da-DUM da-DUM da-DUM)

## Why Did Shakespeare Use It?
- Creates a musical quality
- Makes lines easier to memorize
- Reflects natural speech patterns
- Adds emotional impact

## Practice Lines:
- "Shall I compare thee to a summer's day?" (Sonnet 18)
- "Two households, both alike in dignity" (Romeo and Juliet)

## Activity:
Clap along to the rhythm of Shakespeare's lines!`,
      quizId: quizId++,
      assessmentType: 'english-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'english',
      lessonNumber: 4,
      title: "Shakespeare: Character Analysis",
      emoji: '👥',
      content: `# Character Analysis in Shakespeare 👥

Study the complex characters in Shakespeare's plays!

## Famous Characters:

**Hamlet** (from Hamlet)
- Prince of Denmark
- Contemplates life and death
- Struggles with revenge and morality

**Lady Macbeth** (from Macbeth)
- Ambitious and manipulative
- Pushes her husband toward murder
- Eventually consumed by guilt

**Romeo and Juliet** (from Romeo and Juliet)
- Young lovers from feuding families
- Represent passion and tragedy
- Their deaths unite their families

**Prospero** (from The Tempest)
- Powerful magician and rightful Duke
- Uses magic for justice and forgiveness
- Represents themes of power and redemption

**Falstaff** (from Henry IV plays)
- Comic character
- Represents excess and wit
- Friend and mentor figure to Prince Hal

## Character Analysis Skills:
- Motivations: What do they want?
- Conflicts: What challenges do they face?
- Development: How do they change?
- Relationships: How do they interact with others?

## Activity:
Choose a Shakespeare character and analyze their motivations and conflicts.`,
      quizId: quizId++,
      assessmentType: 'english-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'english',
      lessonNumber: 5,
      title: "Shakespeare: Themes and Messages",
      emoji: '💭',
      content: `# Themes and Messages in Shakespeare 💭

Discover the universal themes that make Shakespeare's works timeless!

## Major Themes:

**Love and Romance**
- True love vs. infatuation
- Love's power and complications
- Examples: Romeo and Juliet, Twelfth Night

**Power and Ambition**
- Corruption of power
- Consequences of ambition
- Examples: Macbeth, Julius Caesar

**Appearance vs. Reality**
- Things are not always as they seem
- Deception and disguise
- Examples: Hamlet, Much Ado About Nothing

**Justice and Revenge**
- Moral consequences of actions
- Cycle of revenge
- Examples: Hamlet, The Merchant of Venice

**Fate vs. Free Will**
- Destiny vs. personal choice
- How characters shape their futures
- Examples: Macbeth, Romeo and Juliet

**Family and Loyalty**
- Relationships between generations
- Conflicts between duty and desire
- Examples: King Lear, Hamlet

## Why These Themes Matter:
- Still relevant to modern audiences
- Explore human nature and society
- Encourage reflection on values

## Activity:
Identify themes in a Shakespeare play and connect them to modern life.`,
      quizId: quizId++,
      assessmentType: 'english-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 14,
      title: "Algebra Basics",
      emoji: '⚖️',
      content: `# Algebra Basics ⚖️

Solve equations by balancing both sides.

## How to Play

Drag numbers and symbols to keep the balance equal.

## Example

x + 7 = 12, so x = 5`,
      quizId: quizId++,
      assessmentType: 'algebra-balance-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 15,
      title: "Ratio",
      emoji: '🧪',
      content: `# Ratio 🧪

Compare quantities using ratios.

## How to Play

Mix colours or ingredients to match the ratio.

## Example

2:3 means 2 parts of one colour to 3 parts of another.`,
      quizId: quizId++,
      assessmentType: 'ratio-mix-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 16,
      title: "Proportion",
      emoji: '⚖️',
      content: `# Proportion ⚖️

Scale recipes and models.

## How to Play

Drag the correct scaled amounts into the boxes.`,
      quizId: quizId++,
      assessmentType: 'proportion-scale-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 17,
      title: "Percentage Change",
      emoji: '📉',
      content: `# Percentage Change 📉

Find increases and decreases.

## How to Play

Move the slider to the new value and read the change.

## Example

Increase 50 by 10% to get 55.`,
      quizId: quizId++,
      assessmentType: 'percentage-change-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 18,
      title: "Fractions, Decimals, and Percentages",
      emoji: '🔁',
      content: `# Fractions, Decimals, and Percentages 🔁

Match equivalent values.

## How to Play

Connect the fraction, decimal, and percentage that match.`,
      quizId: quizId++,
      assessmentType: 'fdp-tri-match-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 19,
      title: "Area of Triangles and Parallelograms",
      emoji: '📐',
      content: `# Area of Triangles and Parallelograms 📐

Find the area using base and height.

## How to Play

Drag the height line and calculate the area.

## Example

Triangle area = (base × height) ÷ 2`,
      quizId: quizId++,
      assessmentType: 'area-cut-fit-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 20,
      title: "Volume of Cuboids",
      emoji: '🧊',
      content: `# Volume of Cuboids 🧊

Calculate volume using length, width, and height.

## How to Play

Fill the cuboid with unit cubes to match the volume.`,
      quizId: quizId++,
      assessmentType: 'volume-cuboid-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 21,
      title: "Coordinates and Graphs",
      emoji: '📍',
      content: `# Coordinates and Graphs 📍

Plot points in all four quadrants.

## How to Play

Tap the grid for each coordinate given.`,
      quizId: quizId++,
      assessmentType: 'coordinate-plot-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 22,
      title: "Geometry: Nets and Properties",
      emoji: '📦',
      content: `# Geometry: Nets and Properties 📦

Match nets to 3D shapes.

## How to Play

Fold the net and choose the correct shape.`,
      quizId: quizId++,
      assessmentType: 'nets-fold-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 23,
      title: "Statistics: Averages and Range",
      emoji: '📊',
      content: `# Statistics: Averages and Range 📊

Find mean, median, mode, and range.

## How to Play

Drag the data into order, then select the correct statistic.`,
      quizId: quizId++,
      assessmentType: 'stats-averages-game',
      categoryId: null,
    }),

  ];
}

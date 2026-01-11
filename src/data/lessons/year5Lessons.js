import { Lesson } from '../../models/Lesson.js';

/**
 * Year 5 Lessons
 */
export function getYear5Lessons(startLessonId, startQuizId) {
  let lessonId = startLessonId;
  let quizId = startQuizId;

  return [
    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'maths',
      lessonNumber: 1,
      title: 'Percentages',
      emoji: '%',
      content: `# Percentages %

Let's learn about percentages!

## What is a Percentage?

A percentage is a way to show parts of 100.

- 50% means 50 out of 100

- 25% means 25 out of 100

- 100% means all of it

## Common Percentages

- 50% = ½ (half)

- 25% = ¼ (quarter)

- 75% = ¾ (three quarters)

- 10% = 1/10 (one tenth)

## Converting to Decimals

- 50% = 0.5

- 25% = 0.25

- 75% = 0.75

- 10% = 0.1

## Finding Percentages

To find 50% of 100:

- 50% = 50/100 = 0.5

- 0.5 × 100 = 50

To find 25% of 80:

- 25% = 25/100 = 0.25

- 0.25 × 80 = 20

## Practice

Find these percentages:

- 50% of 60 = ?

- 25% of 40 = ?

- 10% of 90 = ?

- 75% of 80 = ?

## Fun Activities

- Practice percentage problems

- Use real-life examples

- Calculate discounts

- Solve percentage word problems

## Remember

- Percentages are parts of 100

- They can be converted to decimals

- Practice finding percentages

- You're learning well!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'maths',
      lessonNumber: 2,
      title: 'Geometry: Shapes and Angles',
      emoji: '📐',
      content: `# Geometry: Shapes and Angles 📐

Let's learn about shapes and angles!

## Types of Angles

**Right Angle** - 90° (like a corner)

**Acute Angle** - Less than 90° (small)

**Obtuse Angle** - More than 90° but less than 180° (large)

**Straight Angle** - 180° (a straight line)

## Triangles

**Equilateral Triangle**

- All sides equal

- All angles 60°

**Isosceles Triangle**

- Two sides equal

- Two angles equal

**Scalene Triangle**

- All sides different

- All angles different

## Quadrilaterals

**Square**

- 4 equal sides

- 4 right angles

**Rectangle**

- 4 sides (opposites equal)

- 4 right angles

**Parallelogram**

- Opposite sides parallel

- Opposite sides equal

## Circles

- **Radius** - Distance from center to edge

- **Diameter** - Distance across (2 × radius)

- **Circumference** - Distance around

## Practice

Identify:

- Types of angles

- Types of triangles

- Types of quadrilaterals

- Parts of circles

## Fun Activities

- Draw different shapes

- Measure angles

- Identify shapes around you

- Solve geometry problems

## Remember

- Angles measure turns

- Shapes have properties

- Practice identifying shapes

- Geometry is everywhere!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'maths',
      lessonNumber: 3,
      title: 'Problem Solving',
      emoji: '🧩',
      content: `# Problem Solving 🧩

Let's learn to solve math problems!

## Problem-Solving Steps

1. **Read carefully** - Understand the problem

2. **Identify** - What do you need to find?

3. **Plan** - How will you solve it?

4. **Solve** - Work it out

5. **Check** - Does your answer make sense?

## Word Problems

Read the problem carefully:

- What information is given?

- What do you need to find?

- What operation do you need?

## Example Problem

"Sarah has 24 stickers. She gives away 8 stickers. How many does she have left?"

- Given: 24 stickers, gives away 8

- Find: How many left

- Operation: Subtraction

- Solve: 24 - 8 = 16

- Check: 16 + 8 = 24 ✓

## Strategies

- Draw a picture

- Make a list

- Use a number line

- Work backwards

- Try simpler numbers first

## Practice

Solve these problems:

- Tom has 35 marbles. He loses 12. How many left?

- A book has 120 pages. You read 45. How many left?

- You save £5 each week for 8 weeks. How much total?

## Fun Activities

- Solve word problems

- Create your own problems

- Explain your thinking

- Practice different strategies

## Remember

- Read problems carefully

- Plan your solution

- Check your work

- Practice makes perfect!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'english',
      lessonNumber: 1,
      title: 'Writing Essays',
      emoji: '📝',
      content: `# Writing Essays 📝

Let's learn to write essays!

## What is an Essay?

An essay is a piece of writing that gives your opinion or explains something.

## Essay Structure

1. **Introduction** - Introduce your topic

2. **Body Paragraphs** - Develop your ideas (usually 3-5)

3. **Conclusion** - Summarize your points

## Introduction

- Hook the reader

- Introduce the topic

- State your main idea (thesis)

## Body Paragraphs

Each paragraph should have:

- Topic sentence

- Supporting details

- Examples

- Explanation

## Conclusion

- Restate main points

- Give final thoughts

- Leave reader thinking

## Types of Essays

- **Opinion** - Your view on a topic

- **Informative** - Explain something

- **Persuasive** - Convince the reader

- **Narrative** - Tell a story

## Practice

Write an essay about:

- Should children have homework?

- Why reading is important

- Your favorite hobby

- How to be a good friend

## Fun Activities

- Write essays on different topics

- Get feedback

- Edit and improve

- Share your essays

## Remember

- Plan before writing

- Use clear structure

- Support your ideas

- Edit carefully!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'english',
      lessonNumber: 2,
      title: 'Literature Analysis',
      emoji: '📚',
      content: `# Literature Analysis 📚

Let's learn to analyze stories and poems!

## What is Analysis?

Analysis means looking closely at a text to understand it better.

## Elements to Analyze

**Characters**

- Who are they?

- What are they like?

- How do they change?

**Setting**

- Where does it happen?

- When does it happen?

- Why is the setting important?

**Plot**

- What happens?

- What is the conflict?

- How is it resolved?

**Theme**

- What is the main message?

- What does it teach us?

- What is the author saying?

## Reading Strategies

- Read carefully

- Take notes

- Ask questions

- Look for patterns

- Think about meaning

## Writing Analysis

- State your point

- Give evidence from the text

- Explain your evidence

- Connect to the bigger picture

## Practice

Analyze:

- A favorite story

- A poem

- A chapter from a book

- A character's journey

## Fun Activities

- Read and discuss literature

- Write analysis paragraphs

- Compare different texts

- Present your analysis

## Remember

- Look for deeper meaning

- Use evidence from the text

- Think critically

- Enjoy exploring literature!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'english',
      lessonNumber: 3,
      title: 'Advanced Grammar',
      emoji: '📖',
      content: `# Advanced Grammar 📖

Let's learn more advanced grammar!

## Complex Sentences

A complex sentence has:

- One main clause (can stand alone)

- One or more subordinate clauses (can't stand alone)

Example:

"Although it was raining, we went to the park."

- Main clause: "we went to the park"

- Subordinate clause: "Although it was raining"

## Subordinating Conjunctions

Words that connect clauses:

- although, because, since, while

- if, when, after, before

- until, unless, as

## Active and Passive Voice

**Active Voice**

- Subject does the action

- "The cat chased the mouse."

**Passive Voice**

- Subject receives the action

- "The mouse was chased by the cat."

## Modal Verbs

Words that show possibility, necessity, or ability:

- can, could, may, might

- must, should, would, will

## Practice

Identify:

- Complex sentences

- Active vs passive voice

- Modal verbs

- Subordinate clauses

## Fun Activities

- Write complex sentences

- Practice active/passive

- Use modal verbs

- Edit for grammar

## Remember

- Grammar helps clarity

- Practice different structures

- Edit your writing

- You're improving!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'history',
      lessonNumber: 1,
      title: 'World War I',
      emoji: '🌍',
      content: `# World War I 🌍

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

**Central Powers:**

- Germany

- Austria-Hungary

- Ottoman Empire

## Life in the Trenches

- Soldiers lived in trenches (ditches)

- Very difficult conditions

- Mud, rats, and disease

- Dangerous and scary

## New Weapons

- Machine guns

- Tanks (first used)

- Poison gas

- Airplanes (for war)

## The End

- War ended in 1918

- Many people died

- Countries changed

- Led to World War II

## Fun Activities

- Research the war

- Make a timeline

- Write about soldiers' experiences

- Learn about the impact

## Remember

- War lasted 1914-1918

- Many countries involved

- Very difficult time

- Important to remember!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'history',
      lessonNumber: 2,
      title: 'World War II',
      emoji: '🌍',
      content: `# World War II 🌍

Let's learn about World War II!

## When Did It Happen?

World War II lasted from 1939 to 1945.

## Why Did It Start?

- Germany wanted more land

- Adolf Hitler and the Nazis

- Invasion of Poland

- Many countries got involved

## Who Fought?

**Allied Powers:**

- Britain

- United States

- Soviet Union

- France

- Many others

**Axis Powers:**

- Germany

- Italy

- Japan

## The Blitz

- German bombing of British cities

- People hid in air raid shelters

- Many buildings destroyed

- People showed great courage

## The Home Front

- People worked hard to help

- Rationing (limited food)

- Women did important jobs

- Everyone helped the war effort

## D-Day

- June 6, 1944

- Allied invasion of France

- Very important battle

- Helped end the war

## The End

- War ended in 1945

- Germany surrendered

- Japan surrendered after atomic bombs

- Peace returned

## Fun Activities

- Research the war

- Learn about the Blitz

- Write about the Home Front

- Make a timeline

## Remember

- War lasted 1939-1945

- Affected everyone

- People showed courage

- Important to remember!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'history',
      lessonNumber: 3,
      title: 'The Industrial Revolution',
      emoji: '🏭',
      content: `# The Industrial Revolution 🏭

Let's learn about the Industrial Revolution!

## When Did It Happen?

The Industrial Revolution happened from about 1760 to 1840.

## What Changed?

- Machines replaced hand work

- Factories were built

- Cities grew

- Life changed dramatically

## Inventions

**Steam Engine**

- James Watt improved it

- Powered machines

- Changed transportation

**Spinning Jenny**

- Made cloth faster

- Textile industry grew

- Changed clothing production

**Railways**

- Steam trains

- Connected places

- Changed travel

## Life Changes

**Before:**

- Most people lived in countryside

- Worked on farms

- Made things by hand

- Life was slower

**After:**

- Many moved to cities

- Worked in factories

- Machines made things

- Life was faster

## Problems

- Cities were crowded

- Pollution increased

- Working conditions were hard

- Children worked in factories

## Fun Activities

- Research inventions

- Compare before and after

- Make a timeline

- Write about the changes

## Remember

- Revolution changed everything

- Machines changed work

- Cities grew

- Life changed forever!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'technology',
      lessonNumber: 1,
      title: 'Advanced Scratch Programming',
      emoji: '🎮',
      content: `# Advanced Scratch Programming 🎮

Let's learn more advanced Scratch!

## Variables

Variables store information that can change.

**Creating Variables:**

- Click "Variables"

- Click "Make a Variable"

- Give it a name (like "score")

**Using Variables:**

- Set score to 0

- Change score by 1

- Show score on screen

## Loops

Loops repeat code.

**Forever Loop:**

- Repeats forever

- Good for continuous actions

**Repeat Loop:**

- Repeats a set number of times

- Good for specific actions

## Conditionals

Conditionals make decisions.

**If-Then:**

- If something is true, do this

- Example: If touching edge, bounce

**If-Then-Else:**

- If true, do this; else do that

- Example: If score > 10, say "Great!", else say "Keep trying"

## Broadcasting

Send messages between sprites.

- Broadcast "message"

- When I receive "message"

- Sprites can communicate

## Practice

Create programs with:

- Variables for scoring

- Loops for repetition

- Conditionals for decisions

- Broadcasting for communication

## Fun Activities

- Build interactive games

- Create animations

- Make quiz games

- Share your projects

## Remember

- Variables store data

- Loops repeat actions

- Conditionals make decisions

- Practice advanced features!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'technology',
      lessonNumber: 2,
      title: 'Web Development Basics',
      emoji: '🌐',
      content: `# Web Development Basics 🌐

Let's learn to make websites!

## What is HTML?

HTML (HyperText Markup Language) is the code that makes web pages.

## Basic HTML Structure

\`\`\`html

<html>

<head>

  <title>My Page</title>

</head>

<body>

  <h1>Hello World!</h1>

  <p>This is my first webpage.</p>

</body>

</html>

\`\`\`

## HTML Tags

- \`<h1>\` - Big heading

- \`<p>\` - Paragraph

- \`<img>\` - Image

- \`<a>\` - Link

- \`<div>\` - Container

## What is CSS?

CSS (Cascading Style Sheets) makes web pages look nice.

## Basic CSS

\`\`\`css

body {

background-color: lightblue;

}

h1 {

color: red;

font-size: 24px;

}

\`\`\`

## Creating a Web Page

1. Write HTML code

2. Add CSS for styling

3. Save as .html file

4. Open in browser

## Practice

Create web pages with:

- Headings and paragraphs

- Images

- Links

- Colors and styling

## Fun Activities

- Build simple websites

- Experiment with HTML

- Style with CSS

- Share your pages

## Remember

- HTML structures content

- CSS styles content

- Start simple

- Practice makes perfect!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year5',
      subjectId: 'technology',
      lessonNumber: 3,
      title: 'Digital Citizenship',
      emoji: '🌐',
      content: `# Digital Citizenship 🌐

Let's learn to be good digital citizens!

## What is Digital Citizenship?

Digital citizenship means using technology responsibly, safely, and respectfully.

## Being Respectful Online

- Be kind to others

- Don't say mean things

- Respect different opinions

- Help others when you can

## Protecting Privacy

- Don't share personal information

- Use strong passwords

- Don't share passwords

- Be careful what you post

## Being Safe

- Don't talk to strangers

- Don't meet people from online

- Tell a grown-up if something's wrong

- Use trusted websites

## Creating Good Content

- Share helpful information

- Be creative

- Give credit to others

- Make positive contributions

## Dealing with Problems

- Cyberbullying - Tell a grown-up

- Inappropriate content - Close it, tell someone

- Strangers contacting you - Don't respond, tell someone

- Something scary - Get help

## Being a Good Digital Citizen

- Use technology for good

- Help others learn

- Share knowledge

- Make the internet better

## Fun Activities

- Discuss online scenarios

- Create digital citizenship posters

- Practice good online behavior

- Learn about internet safety

## Remember

- Be respectful online

- Protect your privacy

- Stay safe

- Be a good digital citizen!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    })

  ];
}

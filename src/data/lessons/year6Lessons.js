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
      title: 'Algebra Introduction',
      emoji: '🔢',
      content: `# Algebra Introduction 🔢

Let's learn about algebra!

## What is Algebra?

Algebra uses letters (like x, y) to represent unknown numbers.

## Simple Equations

**Example:**

x + 5 = 10

- What number plus 5 equals 10?

- x = 5

**Example:**

y - 3 = 7

- What number minus 3 equals 7?

- y = 10

## Solving Equations

To solve an equation, find the value of the letter.

**Steps:**

1. Look at the equation

2. Do the opposite operation

3. Check your answer

**Example:**

x + 4 = 9

- Opposite of +4 is -4

- x = 9 - 4

- x = 5

- Check: 5 + 4 = 9 ✓

## Using Variables

Variables can represent any number.

- If x = 3, then x + 2 = 5

- If y = 7, then y - 4 = 3

- If a = 5, then a × 2 = 10

## Practice

Solve these:

- x + 3 = 8

- y - 5 = 10

- a + 7 = 15

- b - 2 = 9

## Fun Activities

- Practice solving equations

- Create your own equations

- Use algebra in word problems

- Play algebra games

## Remember

- Letters represent numbers

- Do opposite operations

- Check your answers

- Algebra is useful!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 2,
      title: 'Statistics and Data',
      emoji: '📊',
      content: `# Statistics and Data 📊

Let's learn about statistics!

## What is Statistics?

Statistics is collecting, organizing, and analyzing data.

## Types of Data

**Categorical Data**

- Colors: red, blue, green

- Types: cat, dog, bird

- Categories

**Numerical Data**

- Numbers: 5, 10, 15, 20

- Measurements: height, weight

- Counts

## Ways to Show Data

**Bar Chart**

- Shows categories

- Easy to compare

- Good for counting

**Line Graph**

- Shows changes over time

- Good for trends

- Shows patterns

**Pie Chart**

- Shows parts of a whole

- Good for percentages

- Shows proportions

## Mean, Median, Mode

**Mean (Average)**

- Add all numbers, divide by count

- Example: 2, 4, 6 → (2+4+6)÷3 = 4

**Median**

- Middle number when ordered

- Example: 2, 4, 6, 8, 10 → median = 6

**Mode**

- Most common number

- Example: 2, 3, 3, 4, 5 → mode = 3

## Practice

Find mean, median, mode:

- 5, 7, 7, 9, 10

- 2, 4, 6, 8

- 1, 3, 3, 5, 5, 7

## Fun Activities

- Collect data

- Make charts and graphs

- Calculate mean, median, mode

- Analyze data

## Remember

- Data tells us information

- Charts help us understand

- Statistics help us decide

- Data is everywhere!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'maths',
      lessonNumber: 3,
      title: 'Advanced Problem Solving',
      emoji: '🧩',
      content: `# Advanced Problem Solving 🧩

Let's solve more complex problems!

## Multi-Step Problems

Problems that need more than one step.

**Example:**

"Sarah has £20. She buys 3 books at £4 each. How much money does she have left?"

Steps:

1. Find cost: 3 × £4 = £12

2. Find remaining: £20 - £12 = £8

## Problem-Solving Strategies

**Draw a Diagram**

- Visualize the problem

- See relationships

- Understand better

**Make a Table**

- Organize information

- See patterns

- Find answers

**Work Backwards**

- Start from the end

- Work backwards

- Find the beginning

**Try Different Approaches**

- If one way doesn't work, try another

- Be flexible

- Keep trying

## Word Problems

Read carefully:

- What information is given?

- What do you need to find?

- What steps are needed?

- Does the answer make sense?

## Practice

Solve these:

- Tom saves £5 each week for 6 weeks, then spends £15. How much left?

- A rectangle is 8cm long and 5cm wide. What is the area and perimeter?

- You have 24 sweets. You share them equally among 4 friends. How many each?

## Fun Activities

- Solve complex problems

- Create your own problems

- Explain your thinking

- Try different strategies

## Remember

- Break problems into steps

- Use different strategies

- Check your work

- Practice makes perfect!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'english',
      lessonNumber: 1,
      title: 'Advanced Creative Writing',
      emoji: '✍️',
      content: `# Advanced Creative Writing ✍️

Let's write more advanced stories!

## Story Elements

**Character Development**

- Create interesting characters

- Show their personalities

- Make them grow and change

- Give them motivations

**Plot Structure**

- Exposition (beginning)

- Rising action (conflict builds)

- Climax (turning point)

- Falling action (resolution)

- Denouement (ending)

**Setting**

- Create vivid settings

- Use all five senses

- Make it come alive

- Show, don't just tell

## Writing Techniques

**Dialogue**

- Make conversations realistic

- Show character through speech

- Use proper punctuation

- Vary speech tags

**Descriptive Language**

- Use vivid adjectives

- Create imagery

- Appeal to senses

- Paint pictures with words

**Show, Don't Tell**

- Instead of "She was sad"

- Write "Tears streamed down her face"

- Let readers see and feel

## Practice

Write stories with:

- Well-developed characters

- Strong plot structure

- Vivid settings

- Good dialogue

## Fun Activities

- Write longer stories

- Develop characters

- Create detailed settings

- Share and get feedback

## Remember

- Develop your characters

- Build your plot

- Create vivid settings

- Show, don't tell!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'english',
      lessonNumber: 2,
      title: 'Literary Analysis and Criticism',
      emoji: '📚',
      content: `# Literary Analysis and Criticism 📚

Let's analyze literature in depth!

## What is Literary Criticism?

Literary criticism is analyzing and evaluating literature.

## Elements to Analyze

**Theme**

- Main message or idea

- What the author wants to say

- Universal truths

- Life lessons

**Symbolism**

- Objects that represent ideas

- Colors with meaning

- Actions that stand for something

- Deeper meanings

**Character Analysis**

- Character traits

- Motivations

- Development

- Relationships

**Narrative Techniques**

- Point of view

- Foreshadowing

- Flashbacks

- Pacing

## Writing Analysis

**Structure:**

1. Introduction with thesis

2. Body paragraphs with evidence

3. Conclusion summarizing points

**Using Evidence:**

- Quote from the text

- Explain the quote

- Connect to your point

- Analyze the meaning

## Practice

Analyze:

- Themes in stories

- Character development

- Symbolism

- Author's techniques

## Fun Activities

- Read and analyze literature

- Write detailed analyses

- Discuss with others

- Compare different works

## Remember

- Look for deeper meaning

- Use evidence from text

- Think critically

- Enjoy exploring literature!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'english',
      lessonNumber: 3,
      title: 'Persuasive Writing',
      emoji: '💬',
      content: `# Persuasive Writing 💬

Let's learn to write persuasively!

## What is Persuasive Writing?

Persuasive writing tries to convince the reader to agree with your opinion.

## Structure

1. **Introduction**

 - Hook the reader

 - State your position (thesis)

2. **Body Paragraphs**

 - Each paragraph = one reason

 - Support with evidence

 - Explain your reasoning

3. **Conclusion**

 - Restate your position

 - Summarize main points

 - Call to action

## Persuasive Techniques

**Appeal to Emotion**

- Make readers feel something

- Use emotional language

- Connect to feelings

**Appeal to Logic**

- Use facts and statistics

- Give logical reasons

- Show cause and effect

**Appeal to Authority**

- Quote experts

- Use reliable sources

- Show credibility

## Language for Persuasion

- "Clearly..."

- "Obviously..."

- "Without a doubt..."

- "It is essential that..."

- "We must..."

## Practice

Write persuasively about:

- Should school start later?

- Why reading is important

- Should children have phones?

- Why we should protect nature

## Fun Activities

- Write persuasive essays

- Practice different techniques

- Debate topics

- Get feedback

## Remember

- State your position clearly

- Support with evidence

- Use persuasive techniques

- Convince your reader!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'history',
      lessonNumber: 1,
      title: 'Ancient Civilizations',
      emoji: '🏛️',
      content: `# Ancient Civilizations 🏛️

Let's learn about ancient civilizations!

## What is a Civilization?

A civilization is an advanced society with:

- Cities

- Writing

- Government

- Specialized jobs

- Culture and art

## Ancient Mesopotamia

- Between Tigris and Euphrates rivers

- First writing system (cuneiform)

- First cities

- Advanced mathematics

- Code of Hammurabi (laws)

## Ancient Egypt

- Along the Nile River

- Pyramids and temples

- Hieroglyphic writing

- Advanced engineering

- Rich culture

## Ancient China

- Along Yellow and Yangtze rivers

- Great Wall of China

- Paper and printing

- Silk production

- Philosophy (Confucius)

## Ancient India

- Along Indus River

- Planned cities

- Advanced drainage

- Mathematics (zero, decimals)

- Rich culture

## Comparing Civilizations

- All had rivers

- All developed writing

- All had cities

- All had governments

- All created art

## Fun Activities

- Research each civilization

- Compare and contrast

- Make timelines

- Write about achievements

## Remember

- Civilizations were advanced

- They developed many things

- They influenced the world

- We learn from them today!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'history',
      lessonNumber: 2,
      title: 'The Renaissance',
      emoji: '🎨',
      content: `# The Renaissance 🎨

Let's learn about the Renaissance!

## When Was It?

The Renaissance happened from about 1300 to 1600.

## What Does "Renaissance" Mean?

"Renaissance" means "rebirth" - a rebirth of learning and art.

## Where Did It Start?

- Started in Italy

- Spread across Europe

- Cities like Florence, Venice, Rome

## Key Changes

**Art**

- More realistic paintings

- Perspective (depth)

- Famous artists: Leonardo da Vinci, Michelangelo

**Science**

- New discoveries

- Observation and experimentation

- Questioning old ideas

**Learning**

- Study of ancient texts

- New ideas about the world

- Humanism (focus on humans)

## Famous People

**Leonardo da Vinci**

- Artist, scientist, inventor

- Painted the Mona Lisa

- Studied anatomy

- Designed inventions

**Michelangelo**

- Sculptor and painter

- Painted the Sistine Chapel

- Created David statue

- Great artist

## Impact

- Changed art forever

- Led to scientific revolution

- Influenced thinking

- Still affects us today

## Fun Activities

- Study Renaissance art

- Learn about famous people

- Make a timeline

- Write about the impact

## Remember

- Renaissance was a rebirth

- Art and science flourished

- Many famous people

- Changed the world!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'history',
      lessonNumber: 3,
      title: 'Historical Sources and Evidence',
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

**Secondary Sources**

- Created later

- History books

- Documentaries

- Articles

## Primary Sources

**Written Sources**

- Letters and diaries

- Official records

- Newspapers

- Books from the time

**Visual Sources**

- Paintings

- Photographs

- Maps

- Drawings

**Artifacts**

- Objects from the past

- Tools, weapons, clothing

- Buildings

- Coins

## Using Sources

**Questions to Ask:**

- Who created it?

- When was it created?

- Why was it created?

- Is it reliable?

- What does it tell us?

## Evaluating Sources

- Is it primary or secondary?

- Is it reliable?

- What is the perspective?

- What is missing?

- How does it compare to other sources?

## Fun Activities

- Examine primary sources

- Compare different sources

- Write about what sources tell us

- Create your own sources

## Remember

- Sources are evidence

- Primary sources are from the time

- Evaluate sources carefully

- Sources help us understand history!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'technology',
      lessonNumber: 1,
      title: 'Python Programming Introduction',
      emoji: '🐍',
      content: `# Python Programming Introduction 🐍

Let's learn Python programming!

## What is Python?

Python is a programming language that's great for beginners.

## Your First Program

\`\`\`python

print("Hello, World!")

\`\`\`

This prints "Hello, World!" to the screen.

## Variables

Store information:

\`\`\`python

name = "Sarah"

age = 10

print(name)

print(age)

\`\`\`

## Input and Output

Get input from user:

\`\`\`python

name = input("What is your name? ")

print("Hello, " + name + "!")

\`\`\`

## Simple Calculations

\`\`\`python

a = 5

b = 3

sum = a + b

print(sum)

\`\`\`

## Conditionals

Make decisions:

\`\`\`python

age = 10

if age >= 10:

  print("You are 10 or older!")

else:

  print("You are younger than 10!")

\`\`\`

## Loops

Repeat code:

\`\`\`python

for i in range(5):

  print("Hello!")

\`\`\`

## Practice

Write programs that:

- Print messages

- Use variables

- Get user input

- Do calculations

- Use conditionals

- Use loops

## Fun Activities

- Write simple programs

- Solve problems with code

- Create games

- Share your programs

## Remember

- Python is beginner-friendly

- Start with simple programs

- Practice regularly

- Programming is fun!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'technology',
      lessonNumber: 2,
      title: 'Advanced Web Development',
      emoji: '🌐',
      content: `# Advanced Web Development 🌐

Let's build more advanced websites!

## HTML Structure

\`\`\`html

<!DOCTYPE html>

<html>

<head>

  <title>My Website</title>

  <link rel="stylesheet" href="style.css">

</head>

<body>

  <header>

      <h1>Welcome</h1>

  </header>

  <nav>

      <a href="home.html">Home</a>

      <a href="about.html">About</a>

  </nav>

  <main>

      <article>

          <h2>Article Title</h2>

          <p>Content here.</p>

      </article>

  </main>

  <footer>

      <p>Copyright 2024</p>

  </footer>

</body>

</html>

\`\`\`

## Advanced CSS

**Flexbox Layout:**

\`\`\`css

.container {

  display: flex;

  justify-content: center;

  align-items: center;

}

\`\`\`

**Responsive Design:**

\`\`\`css

@media (max-width: 600px) {

  body {

      font-size: 14px;

  }

}

\`\`\`

## JavaScript Basics

Add interactivity:

\`\`\`javascript

function greetUser() {

  var name = prompt("What is your name?");

  alert("Hello, " + name + "!");

}

\`\`\`

## Building a Website

1. Plan your site

2. Create HTML structure

3. Add CSS styling

4. Add JavaScript for interactivity

5. Test and improve

## Practice

Build websites with:

- Multiple pages

- Navigation

- Styling

- Interactivity

## Fun Activities

- Build personal websites

- Create project sites

- Experiment with design

- Share your websites

## Remember

- HTML structures

- CSS styles

- JavaScript adds interactivity

- Practice makes perfect!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'technology',
      lessonNumber: 3,
      title: 'Technology and Society',
      emoji: '🌐',
      content: `# Technology and Society 🌐

Let's learn how technology affects society!

## How Technology Changes Things

Technology changes how we:

- Communicate

- Learn

- Work

- Play

- Live

## Positive Impacts

**Communication**

- Connect with people worldwide

- Share information quickly

- Learn from others

**Education**

- Access to information

- Online learning

- Interactive tools

**Healthcare**

- Better treatments

- Medical devices

- Research tools

## Challenges

**Privacy**

- Personal information online

- Need to protect data

- Be careful what you share

**Digital Divide**

- Not everyone has access

- Need to help others

- Make technology available

**Screen Time**

- Balance is important

- Take breaks

- Do other activities too

## Responsible Use

- Use technology wisely

- Be respectful online

- Protect privacy

- Help others learn

## Future of Technology

- Artificial Intelligence

- Virtual Reality

- Robotics

- New inventions coming

## Thinking Critically

- How does technology help?

- What are the problems?

- How can we improve?

- What should we be careful about?

## Fun Activities

- Discuss technology impacts

- Research new technologies

- Think about the future

- Create responsible use guidelines

## Remember

- Technology changes society

- It has good and bad effects

- Use it responsibly

- Think about the impact!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    })

  ];
}

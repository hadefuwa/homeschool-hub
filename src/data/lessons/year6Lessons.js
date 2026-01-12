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
      title: "Statistics and Data",
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
      title: "Advanced Problem Solving",
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
      title: "Advanced Creative Writing",
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
      title: "Literary Analysis and Criticism",
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
      title: "Persuasive Writing",
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

- Important to remember!`,
      quizId: 82,
      assessmentType: 'quiz',
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



Let's learn about the time between the world wars!



## The 1920s - The Roaring Twenties



- After World War I ended

- People wanted to have fun

- New music and dancing

- Women got more rights

- Economic boom in some places



## The Great Depression



- Started in 1929

- Stock market crashed

- Many people lost jobs

- Very hard times

- Poverty increased



## Rise of Dictators



- Some countries got dictators

- They had all the power

- People lost freedoms

- This led to problems

- It caused World War II



## New Technologies



- Cars became common

- Radio became popular

- Movies became big

- Technology advanced

- Life changed



## Art and Culture



- New art styles

- Jazz music

- Literature flourished

- Culture changed

- New ideas



## Fun Activities



- Learn about the 1920s

- Study the Great Depression

- Make a timeline

- Write about this period



## Remember



- 1920s were exciting

- Great Depression was hard

- Dictators rose to power

- It led to World War II!`,
      quizId: null,
      assessmentType: 'quiz',
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



Let's learn about World War II!



## When Did It Happen?



World War II lasted from 1939 to 1945.



## Why Did It Start?



- Germany wanted more land

- Adolf Hitler and the Nazis

- Invasion of Poland

- Many countries got involved

- It became a world war



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



## The Holocaust



- A terrible time

- Millions of people were killed

- It was a genocide

- We must never forget

- We must learn from it



## The Blitz



- German bombing of British cities

- People hid in air raid shelters

- Many buildings destroyed

- People showed great courage

- Britain stood strong



## D-Day and Victory



- June 6, 1944 - D-Day

- Allied invasion of France

- Very important battle

- Helped end the war

- War ended in 1945



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
      quizId: 83,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'history',
      lessonNumber: 4,
      title: "The Cold War",
      emoji: '❄️',
      content: `# The Cold War ❄️



Let's learn about the Cold War!



## What Was the Cold War?



- A conflict between the USA and Soviet Union

- It lasted from 1945 to 1991

- It was called "cold" because they didn't fight directly

- But there was tension



## The Two Sides



**United States and Allies**

- Believed in democracy

- Believed in capitalism

- Wanted freedom

- Western countries



**Soviet Union and Allies**

- Believed in communism

- Controlled by government

- Eastern countries

- Different system



## The Iron Curtain



- A division in Europe

- East and West separated

- Berlin Wall was built

- People couldn't travel freely

- It was a symbol of division



## The Space Race



- Both sides raced to space

- First satellite (Sputnik)

- First man in space

- First moon landing

- It was a competition



## Nuclear Weapons



- Both sides had nuclear weapons

- Very dangerous

- Could destroy the world

- People were afraid

- It was called "mutual destruction"



## The End



- The Cold War ended in 1991

- Soviet Union broke apart

- Berlin Wall came down

- People were free

- It was a time of change



## Fun Activities



- Learn about the Cold War

- Study the Space Race

- Make a timeline

- Write about the effects



## Remember



- Cold War was 1945-1991

- USA vs Soviet Union

- It was tense

- It ended peacefully!`,
      quizId: null,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year6',
      subjectId: 'history',
      lessonNumber: 5,
      title: "Civil Rights Movement",
      emoji: '✊',
      content: `# Civil Rights Movement ✊



Let's learn about the fight for civil rights!



## What Were Civil Rights?



- Rights for all people

- Equal treatment

- No discrimination

- Fairness for everyone

- Important freedoms



## Segregation



- People were separated by race

- Different schools

- Different places

- It was unfair

- It was wrong



## Martin Luther King Jr.



- A great leader

- Fought for civil rights

- Gave famous speeches

- Led peaceful protests

- He was assassinated



## Rosa Parks



- Refused to give up her seat

- Started a bus boycott

- She was brave

- She inspired others

- She made a difference



## The Fight for Rights



- People protested

- They marched

- They boycotted

- They fought peacefully

- They won rights



## Changes



- Laws changed

- Segregation ended

- People got equal rights

- It was progress

- But there's still work to do



## Fun Activities



- Learn about civil rights leaders

- Study the movement

- Make a timeline

- Write about the impact



## Remember



- Civil rights are important

- People fought for equality

- They made progress

- We must continue the fight!`,
      quizId: null,
      assessmentType: 'quiz',
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

- Life changed a lot!`,
      quizId: null,
      assessmentType: 'quiz',
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

- The future is ahead!`,
      quizId: null,
      assessmentType: 'quiz',
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

- Sources help us understand history!`,
      quizId: 96,
      assessmentType: 'quiz',
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



Let's learn how historians study the past!



## What Do Historians Do?



- Historians study the past

- They research events

- They analyze sources

- They write about history

- They help us understand



## Research Methods



- Read primary sources

- Study artifacts

- Visit historical places

- Talk to experts

- Compare different sources



## Historical Thinking



- Ask questions

- Look for evidence

- Consider different perspectives

- Think critically

- Make connections



## Writing History



- Organize information

- Tell a story

- Use evidence

- Explain events

- Help others understand



## Why History Matters



- Learn from the past

- Understand the present

- Prepare for the future

- Learn about people

- Understand change



## Fun Activities



- Do historical research

- Write about history

- Visit museums

- Interview people

- Create timelines



## Remember



- Historians study the past

- They use evidence

- They think critically

- History helps us understand!`,
      quizId: null,
      assessmentType: 'quiz',
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



Let's learn about how history changes!



## How Things Change



- History shows change

- Things change over time

- People change

- Societies change

- The world changes



## Causes of Change



- New ideas

- New inventions

- Wars and conflicts

- People's actions

- Natural events



## Patterns in History



- Some things repeat

- We can see patterns

- We can learn from them

- History helps us understand

- We can predict some things



## Continuity and Change



- Some things stay the same

- Some things change

- We see both

- History shows both

- It's interesting to study



## Learning from History



- We can learn from mistakes

- We can learn from successes

- We can understand people

- We can make better choices

- History teaches us



## Your Place in History



- You're part of history

- Your actions matter

- You can make a difference

- You're making history now

- The future is yours



## Fun Activities



- Study how things changed

- Compare different times

- Think about causes

- Write about change

- Consider the future



## Remember



- History shows change

- We can learn from it

- You're part of history

- You can make a difference!`,
      quizId: null,
      assessmentType: 'quiz',
      categoryId: null,
    })

  ];
}

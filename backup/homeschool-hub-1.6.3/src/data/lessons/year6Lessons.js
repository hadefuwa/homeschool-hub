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
      subjectId: 'maths',
      lessonNumber: 5,
      title: "BODMAS/BIDMAS",
      emoji: '🔢',
      content: `# BODMAS/BIDMAS 🔢

Let's learn the order of operations!

## How to Play

Tap the numbers to hear them! Then play the game! 🎮

## Order of Operations

BODMAS/BIDMAS tells us the order:
- **B**rackets
- **O**rders (powers)
- **D**ivision
- **M**ultiplication
- **A**ddition
- **S**ubtraction

## Example

2 + 3 × 4 = 2 + 12 = 14
(Not 5 × 4 = 20!)

## Fun Activities

- Practice BODMAS
- Play the order of operations game!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
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

- History helps us understand!



## Practice Questions



<!-- QUESTION_START -->
What do historians do?
<!-- OPTIONS -->
Nothing|Study the past, research events, analyze sources, and write about history|Only write|Only read
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Historians study the past, research events, analyze sources, write about history, and help us understand!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What research methods do historians use?
<!-- OPTIONS -->
Nothing|Read primary sources, study artifacts, visit historical places, talk to experts, and compare sources|Only read|Only write
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Historians read primary sources, study artifacts, visit historical places, talk to experts, and compare different sources!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is historical thinking?
<!-- OPTIONS -->
Not thinking|Ask questions, look for evidence, consider different perspectives, think critically, and make connections|Only ask questions|Only read
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Historical thinking means asking questions, looking for evidence, considering different perspectives, thinking critically, and making connections!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Why does history matter?
<!-- OPTIONS -->
It doesn't|Learn from the past, understand the present, prepare for the future, learn about people, and understand change|Only for fun|Only for tests
<!-- CORRECT -->
1
<!-- EXPLANATION -->
History matters because we can learn from the past, understand the present, prepare for the future, learn about people, and understand change!
<!-- QUESTION_END -->`,
      quizId: 96,
      assessmentType: 'history-game',
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

  ];
}

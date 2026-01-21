import { Lesson } from '../../models/Lesson.js';

/**
 * Year 4 Lessons
 */
export function getYear4Lessons(startLessonId, startQuizId) {
  let lessonId = startLessonId;
  let quizId = startQuizId;

  return [
    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 1,
      title: "Long Multiplication",
      emoji: '✖️',
      content: `# Long Multiplication ✖️

Let's learn to multiply larger numbers!

## How to Play

Tap the numbers to hear them! Then play the game! 🎮

## What is Long Multiplication?

Long multiplication helps us multiply numbers with more than one digit!

## Example

23 × 4 = 92
45 × 6 = 270

## Fun Activities

- Practice long multiplication
- Check your answers
- Play the multiplication game!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 2,
      title: "Fractions and Decimals",
      emoji: '🔢',
      content: `# Fractions and Decimals 🔢

Let's learn about fractions and decimals!

## How to Play

Tap the numbers to hear them! Then play the game! 🎮

## What are Fractions and Decimals?

Fractions and decimals show parts of a whole!

## Examples

- 1/2 = 0.5 (half)
- 1/4 = 0.25 (quarter)
- 3/4 = 0.75 (three quarters)

## Fun Activities

- Practice converting fractions to decimals
- Play the fractions and decimals game!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 3,
      title: "Measurement and Units",
      emoji: '📏',
      content: `# Measurement and Units 📏



Let's learn about measuring things!



## How to Play



Tap the numbers to hear them! Then play the game! 🎮



## Units of Measurement



- Length: cm, m (100 cm = 1 m)

- Weight: g, kg (1000 g = 1 kg)

- Capacity: mL, L (1000 mL = 1 L)



## Fun Activities



- Measure objects around you

- Convert between units

- Play the measurement game!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 4,
      title: "Place Value to 10,000",
      emoji: '🔢',
      content: `# Place Value to 10,000 🔢

Let's learn about place value up to 10,000!

## Place Value Positions

In the number 3,456:
- The 3 is in the thousands place (worth 3,000)
- The 4 is in the hundreds place (worth 400)
- The 5 is in the tens place (worth 50)
- The 6 is in the ones place (worth 6)

## Examples

- 2,345 = 2 thousands + 3 hundreds + 4 tens + 5 ones
- 7,890 = 7 thousands + 8 hundreds + 9 tens + 0 ones
- 1,234 = one thousand, two hundred thirty-four

## How to Play

Drag digits and type in words! 🎮`,
      quizId: quizId++,
      assessmentType: 'place-value-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 5,
      title: "Multiplication Tables 3, 4, 6, 7, 8, 9",
      emoji: '✖️',
      content: `# Multiplication Tables 3, 4, 6, 7, 8, 9 ✖️

Let's learn more times tables!

## Times Tables

- 3 times table: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30
- 4 times table: 4, 8, 12, 16, 20, 24, 28, 32, 36, 40
- 6 times table: 6, 12, 18, 24, 30, 36, 42, 48, 54, 60
- 7 times table: 7, 14, 21, 28, 35, 42, 49, 56, 63, 70
- 8 times table: 8, 16, 24, 32, 40, 48, 56, 64, 72, 80
- 9 times table: 9, 18, 27, 36, 45, 54, 63, 72, 81, 90

## How to Play

Click answers and type tables! 🎮`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 6,
      title: "Division with Remainders",
      emoji: '➗',
      content: `# Division with Remainders ➗

Let's learn division with remainders!

## What is a Remainder?

Sometimes division doesn't divide evenly - we get a remainder!

## Examples

- 17 ÷ 5 = 3 remainder 2
- 23 ÷ 4 = 5 remainder 3
- 19 ÷ 6 = 3 remainder 1

## How to Play

Type answers and drag remainders! 🎮`,
      quizId: quizId++,
      assessmentType: 'typing-math-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 7,
      title: "Equivalent Fractions",
      emoji: '🍕',
      content: `# Equivalent Fractions 🍕

Let's learn about equivalent fractions!

## What are Equivalent Fractions?

Fractions that are equal but look different!

## Examples

- 1/2 = 2/4 = 3/6 = 4/8
- 1/3 = 2/6 = 3/9
- 2/3 = 4/6 = 6/9

## How to Find Equivalents

Multiply or divide both top and bottom by the same number!

## How to Play

Drag fractions to match and click pairs! 🎮`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 8,
      title: "Decimals to 2 Places",
      emoji: '🔢',
      content: `# Decimals to 2 Places 🔢

Let's learn about decimals!

## What are Decimals?

Decimals are numbers with a decimal point!

## Decimal Places

- 0.5 = five tenths
- 0.25 = twenty-five hundredths
- 0.75 = seventy-five hundredths
- 1.50 = one and fifty hundredths

## Examples

- 0.5 = 1/2
- 0.25 = 1/4
- 0.75 = 3/4

## How to Play

Drag decimal points and type values! 🎮`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 9,
      title: "Angles",
      emoji: '📐',
      content: `# Angles 📐

Let's learn about angles!

## Types of Angles

- Acute angle - less than 90°
- Right angle - exactly 90°
- Obtuse angle - more than 90° but less than 180°
- Straight angle - exactly 180°

## Measuring Angles

Use a protractor to measure angles!

## Examples

- A square corner = 90° (right angle)
- A straight line = 180° (straight angle)

## How to Play

Click angle types and drag to measure! 🎮`,
      quizId: quizId++,
      assessmentType: 'angle-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 10,
      title: "Area by Counting Squares",
      emoji: '📏',
      content: `# Area by Counting Squares 📏

Let's learn about area!

## What is Area?

Area is the space inside a shape!

## Finding Area

Count the squares inside the shape!

## Examples

- A square with 3 squares on each side = 9 square units
- A rectangle with 4 by 5 squares = 20 square units

## How to Play

Click squares and type the area! 🎮`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 11,
      title: "Time: 24-Hour Clock",
      emoji: '🕐',
      content: `# Time: 24-Hour Clock 🕐

Let's learn the 24-hour clock!

## 24-Hour Clock

Instead of 12 hours, we use 24 hours!

## Converting Times

- 1:00 PM = 13:00
- 2:30 PM = 14:30
- 3:45 PM = 15:45
- 12:00 PM = 12:00 (noon)
- 12:00 AM = 00:00 (midnight)

## Examples

- Morning: 09:00 (9 AM)
- Afternoon: 15:00 (3 PM)
- Evening: 20:00 (8 PM)

## How to Play

Type times and drag conversions! 🎮`,
      quizId: quizId++,
      assessmentType: 'clock-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 12,
      title: "Money: Pounds and Pence",
      emoji: '💰',
      content: `# Money: Pounds and Pence 💰

Let's learn about pounds and pence!

## UK Money

- 100 pence (p) = 1 pound (£)
- Coins: 1p, 2p, 5p, 10p, 20p, 50p, £1, £2
- Notes: £5, £10, £20, £50

## Examples

- £2.50 = 250p
- 150p = £1.50
- £5.75 = 575p

## How to Play

Drag coins/notes and type amounts! 🎮`,
      quizId: quizId++,
      assessmentType: 'money-drag-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 13,
      title: "Line Graphs",
      emoji: '📈',
      content: `# Line Graphs 📈

Let's learn about line graphs!

## What is a Line Graph?

A line graph shows how data changes over time!

## Reading Line Graphs

- The line goes up = increase
- The line goes down = decrease
- The line is flat = no change

## Making Line Graphs

- Plot points for each time
- Connect the points with a line
- Label the axes

## How to Play

Click points and drag to create graphs! 🎮`,
      quizId: quizId++,
      assessmentType: 'graph-builder-game',
      categoryId: null,
    }),
    
    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'english',
      lessonNumber: 1,
      title: "Fronted Adverbials",
      emoji: '⏱️',
      content: `# Fronted Adverbials ⏱️

A **fronted adverbial** is a word or phrase at the start of a sentence that tells us more about the action. It can describe **When**, **Where**, or **How** something happened.

## Examples
- **When**: "Early this morning, I went for a run."
- **Where**: "In the deep forest, a wolf howled."
- **How**: "Without a sound, the cat crept into the room."

## The Comma Rule ⚠️
Always remember to put a **comma** after your fronted adverbial!

## Practice Questions

<!-- QUESTION_START -->
Which of these is a fronted adverbial of **TIME**?
<!-- OPTIONS -->
Under the bed|Suddenly|Late last night|Very quietly
<!-- CORRECT -->
2
<!-- EXPLANATION -->
"Late last night" tells us *when* the action happened.
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Where does the comma go: "Slowly the door opened."
<!-- OPTIONS -->
Slowly, the door opened.|Slowly the, door opened.|Slowly the door, opened.|No comma needed
<!-- CORRECT -->
0
<!-- EXPLANATION -->
The comma goes after the fronted adverbial "Slowly".
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Which sentence uses a fronted adverbial of **PLACE**?
<!-- OPTIONS -->
Carefully, I picked it up.|In the distance, I saw a light.|Soon, it was time to go.|Happily, they played together.
<!-- CORRECT -->
1
<!-- EXPLANATION -->
"In the distance" tells us *where* the action happened.
<!-- QUESTION_END -->`,
      quizId: quizId++,
      assessmentType: 'quiz',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'english',
      lessonNumber: 2,
      title: "Expanded Noun Phrases",
      emoji: '📝',
      content: `# Expanded Noun Phrases 📝

A noun phrase is just a noun (like *dog*) and any words that describe it. An **expanded** noun phrase uses adjectives and extra details to make the description much more interesting!

## How to Expand a Noun
1. **The noun**: house
2. **Add adjectives**: the large, spooky house
3. **Add a prepositional phrase**: the large, spooky house *on the hill*

## Examples
- The **tiny, colorful** butterfly.
- A **brave, young** knight **with a shining sword**.

## Practice Questions

<!-- QUESTION_START -->
Which is an expanded noun phrase?
<!-- OPTIONS -->
The cat|A big cat|The sleek, black cat with green eyes|The cat is black
<!-- CORRECT -->
2
<!-- EXPLANATION -->
This phrase uses multiple adjectives and extra detail ("with green eyes") to expand the noun.
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Where should the comma go: "The tall narrow building..."
<!-- OPTIONS -->
The tall narrow, building|The tall, narrow building|The, tall narrow building|No comma needed
<!-- CORRECT -->
1
<!-- EXPLANATION -->
When using two adjectives to describe a noun, we put a comma between them.
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Expand the noun 'forest' with more detail:
<!-- OPTIONS -->
The forest|A green forest|The ancient, dark forest filled with mystery|The forest is old
<!-- CORRECT -->
2
<!-- EXPLANATION -->
This option adds the most descriptive detail, making it a great expanded noun phrase.
<!-- QUESTION_END -->`,
      quizId: quizId++,
      assessmentType: 'quiz',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'english',
      lessonNumber: 3,
      title: "Inverted Commas (Speech Marks)",
      emoji: '💬',
      content: `# Inverted Commas 💬

Inverted commas (also called speech marks) are used to show exactly what someone is saying out loud.

## The 3 Golden Rules
1. **Surround the speech**: "Put marks at the start and end of the spoken words."
2. **Capital Letter**: Always start the speech with a capital letter.
3. **Punctuation inside**: Keep commas, full stops, or question marks *inside* the speech marks.

## Example
"What time is it?" asked Sarah.
James replied, "It is nearly lunchtime."

## Practice Questions

<!-- QUESTION_START -->
Which sentence is punctuated correctly?
<!-- OPTIONS -->
"I'm tired, said Tom."|I'm tired, "said Tom."|"I'm tired," said Tom.|"I'm tired" said Tom.
<!-- CORRECT -->
2
<!-- EXPLANATION -->
The comma and speech marks are correctly placed to separate the speech from the rest of the sentence.
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Where is the missing punctuation: "Can I play? asked Ben.
<!-- OPTIONS -->
Before Ben|Before asked|After?|After Ben
<!-- CORRECT -->
2
<!-- EXPLANATION -->
We need the closing inverted comma after the question mark: "Can I play?" asked Ben.
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Which word should have a capital letter: James said, "the cake is ready!"
<!-- OPTIONS -->
said|the|cake|ready
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The first word of direct speech always starts with a capital letter.
<!-- QUESTION_END -->`,
      quizId: quizId++,
      assessmentType: 'quiz',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'english',
      lessonNumber: 4,
      title: "Possessive Apostrophes (Plural)",
      emoji: '🖋️',
      content: `# Possessive Apostrophes (Plural) 🖋️

We use apostrophes to show that something belongs to someone. In Year 4, we focus on **plural possession**.

## The Rules
1. **Regular Plurals (ending in -s)**: Put the apostrophe *after* the s.
   - The boys' coats (lots of boys owning coats).
   - The dogs' bowls (lots of dogs owning bowls).
2. **Irregular Plurals (not ending in -s)**: Put 's at the end.
   - The children's toys.
   - The men's hats.

## Practice Questions

<!-- QUESTION_START -->
Where does the apostrophe go for: **The cars engines** (lots of cars)?
<!-- OPTIONS -->
car's|cars'|ca'rs|cars
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Because "cars" is a plural ending in 's', the apostrophe goes after the 's'.
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Which one is correct for **The people room**?
<!-- OPTIONS -->
peoples'|people's|peoples|peopl'es
<!-- CORRECT -->
1
<!-- EXPLANATION -->
"People" is an irregular plural, so we add 's.
<!-- QUESTION_END -->

<!-- QUESTION_START -->
What does "The teacher's books" mean?
<!-- OPTIONS -->
Lots of teachers have books|One teacher has books|It's not about possession|The books belong to the classroom
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The 's shows that it is one teacher (singular possession). Plural would be "the teachers' books".
<!-- QUESTION_END -->`,
      quizId: quizId++,
      assessmentType: 'quiz',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'english',
      lessonNumber: 5,
      title: "Standard English & Pronouns",
      emoji: '🗣️',
      content: `# Standard English & Pronouns 🗣️

Standard English is the formal way of speaking and writing that everyone can understand clearly. We often focus on using the correct verb forms and pronouns.

## Common Mistakes
- **Incorrect**: "I were going to the shop." -> **Correct**: "I *was* going to the shop."
- **Incorrect**: "He done his homework." -> **Correct**: "He *did* his homework."
- **Incorrect**: "Them books are mine." -> **Correct**: "*Those* books are mine."

## Pronouns for Cohesion
Use pronouns (he, she, it, they, them) so you don't repeat names too much.
*Instead of:* "Sarah saw the ball. Sarah picked the ball up."
*Try:* "Sarah saw the ball. **She** picked **it** up."

## Practice Questions

<!-- QUESTION_START -->
Which sentence is Standard English?
<!-- OPTIONS -->
I done my work.|I did my work.|I has did my work.|I did my work good.
<!-- CORRECT -->
1
<!-- EXPLANATION -->
"I did my work" is the correct Standard English verb form.
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Replace the repeated names: "The boys went to the park. The boys played football."
<!-- OPTIONS -->
The boys went to the park. They played football.|The boys went to the park. Them played football.|The boys went to the park. He played football.|The boys went to the park. We played football.
<!-- CORRECT -->
0
<!-- EXPLANATION -->
"They" is the correct plural pronoun to replace "The boys".
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Which is WRONG?
<!-- OPTIONS -->
We were happy.|You were happy.|They were happy.|I were happy.
<!-- CORRECT -->
3
<!-- EXPLANATION -->
The correct form is "I was happy."
<!-- QUESTION_END -->`,
      quizId: quizId++,
      assessmentType: 'quiz',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'english',
      lessonNumber: 6,
      title: "Year 4 Homophones",
      emoji: '👂',
      content: `# Year 4 Homophones 👂

Homophones are words that **sound the same** but have **different meanings** and **different spellings**.

## Key Year 4 Homophones
- **Accept** (saying yes) vs **Except** (not including).
- **Affect** (to change something) vs **Effect** (the result of a change).
- **Scene** (part of a play) vs **Seen** (past tense of see).
- **Fair** (it is right / a carnival) vs **Fare** (money for a bus or train).

## Practice Questions

<!-- QUESTION_START -->
Which word fits: "I can't ______ that gift."
<!-- OPTIONS -->
accept|except|axcept|acsept
<!-- CORRECT -->
0
<!-- EXPLANATION -->
"Accept" means to receive or agree to something.
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Which word fits: "Everyone went to the party ______ me."
<!-- OPTIONS -->
accept|except|axcept|acsept
<!-- CORRECT -->
1
<!-- EXPLANATION -->
"Except" means not including.
<!-- QUESTION_END -->

<!-- QUESTION_START -->
Which word fits: "Have you ______ my new bike?"
<!-- OPTIONS -->
scene|seen|sene|sean
<!-- CORRECT -->
1
<!-- EXPLANATION -->
"Seen" is the past tense of see. "Scene" is like a movie scene.
<!-- QUESTION_END -->`,
      quizId: quizId++,
      assessmentType: 'quiz',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'english',
      lessonNumber: 7,
      title: "Adjective Adventure",
      emoji: '🌟',
      assessmentType: 'parts-of-speech-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'english',
      lessonNumber: 8,
      title: "Spelling Safari",
      emoji: '🦁',
      assessmentType: 'spelling-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'english',
      lessonNumber: 9,
      title: "Prefix Power",
      emoji: '🔌',
      assessmentType: 'prefix-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'english',
      lessonNumber: 10,
      title: "Suffix Superstars",
      emoji: '🚀',
      assessmentType: 'suffix-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'history',
      lessonNumber: 1,
      title: "The Dark Ages - After Rome",
      emoji: '🌑',
      content: `# The Dark Ages - After Rome 🌑

When the Roman Empire collapsed around AD 476, Europe entered a period often called the "Dark Ages." This wasn't because the sun stopped shining, but because many of the records and learning of Rome were lost.

## The Arrival of the Anglo-Saxons
As Roman soldiers left Britain, tribes from Germany and Denmark—the **Angles, Saxons, and Jutes**—began to settle. They built small wooden villages and established kingdoms like Wessex and Mercia.

## The Viking Age
Starting around AD 793, fierce explorers and warriors from Scandinavia (the Vikings) began to raid the coasts of Britain and Europe. They were skilled sailors who traveled in "Longships" that could navigate both the open sea and shallow rivers.

## Monasteries: Libraries of the Past
In a time when few could read, monks in monasteries became the keepers of knowledge. They spent their lives copying books by hand, creating beautiful "Illuminated Manuscripts."

In the game, you will explore this era of transition. Learn about the technology of the Viking ships, the lifestyle of the Anglo-Saxons, and the legendary King Alfred the Great!`,
      quizId: null,
      assessmentType: 'dark-ages-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'history',
      lessonNumber: 2,
      title: "Biblical History - Jesus and Early Christianity",
      emoji: '✝️',
      content: `# Biblical History - Jesus and Early Christianity ✝️



Let's learn about Jesus and the early Christians!



## The Life of Jesus



- Jesus was born in Bethlehem

- He grew up in Nazareth

- He taught people about God

- He performed miracles



## The Disciples



- Jesus had 12 disciples

- They were his followers

- They learned from him

- They spread his message



## Early Christians



- After Jesus, people became Christians

- They followed his teachings

- They met together

- They helped each other



## Spread of Christianity



- Christianity spread quickly

- It went to many countries

- People became Christians

- It changed the world



## The Bible



- The Bible tells Jesus' story

- It has the Old and New Testaments

- It's an important book

- Many people read it today



## Fun Activities



- Learn about Jesus' life

- Learn about the disciples

- Draw scenes from the Bible

- Write about early Christianity



## Remember



- Jesus was an important person

- His teachings spread

- Christianity grew

- It influenced history!



## Practice Questions



<!-- QUESTION_START -->
Where was Jesus born?
<!-- OPTIONS -->
Nazareth|Bethlehem|Jerusalem|Egypt
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Jesus was born in Bethlehem! He grew up in Nazareth, taught people about God, and performed miracles!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
How many disciples did Jesus have?
<!-- OPTIONS -->
10|11|12|13
<!-- CORRECT -->
2
<!-- EXPLANATION -->
Jesus had 12 disciples! They were his followers, learned from him, and spread his message!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What did early Christians do?
<!-- OPTIONS -->
Fought wars|Followed Jesus' teachings, met together, and helped each other|Stayed alone|Did nothing
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Early Christians followed Jesus' teachings, met together, and helped each other! Christianity spread quickly and changed the world!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What does the Bible contain?
<!-- OPTIONS -->
Only stories|The Old and New Testaments telling Jesus' story|Only laws|Only poems
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Bible has the Old and New Testaments and tells Jesus' story! It's an important book that many people read today!
<!-- QUESTION_END -->`,
      quizId: 70,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'history',
      lessonNumber: 3,
      title: "Medieval Times - Castles and Knights",
      emoji: '🏰',
      content: `# Medieval Times - Castles and Knights 🏰

The Middle Ages (AD 500 – 1500) was a time of massive stone fortresses, courageous knights, and a strict social hierarchy.

## Castle Architecture: Built for Defense
Castles weren't just homes for royalty; they were military machines designed to withstand long sieges.
- **The Keep**: The inner-most stronghold, built with walls often 4 meters thick.
- **The Moat**: A deep watery barrier to stop enemies from using battering rams or ladders.
- **Machicolations**: Overhanging gaps in the walls where defenders could drop rocks or boiling oil on attackers!

## The Feudal System: A Social Ladder
Society was organized like a pyramid, with every person knowing their place.
1. **The King**: Owned all the land and gave portions to Nobles.
2. **The Nobles (Lords)**: Provided the King with military service and knights.
3. **The Knights**: Professional warriors who followed the code of **Chivalry** (bravery, honesty, and protecting the weak).
4. **The Peasants (Serfs)**: Worked the land and produced food, receiving protection in return.

In the game, you will explore the defenses of a medieval castle and then prove your knowledge by organizing the Feudal System for the King!`,
      quizId: null,
      assessmentType: 'medieval-castle-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'history',
      lessonNumber: 4,
      title: "Medieval Times - Daily Life",
      emoji: '🏘️',
      content: `# Medieval Times - Daily Life 🏘️

In the 13th century, life for the average person was a cycle of hard work, strong community ties, and a deep connection to the land.

## The Village Community
90% of people lived in small rural villages. Everything was done by hand. Neighbors helped each other plough the "strip fields" and gather the harvest.
- **The Church**: The center of village life, used for worship, community meetings, and even festivals.
- **The Manor House**: Where the Lord lived and where the local court was held.

## Working the Land
Peasants were either **Freemen** (who paid rent) or **Serfs** (who belonged to the land). They grew wheat for bread and barley for ale. The "Three-Field System" was used, where one field was left empty (fallow) each year to let the soil recover.

## Food and Drink
- **Pottage**: A thick stew made of peas, beans, and vegetables.
- **Black Bread**: Made from rye or barley.
- **Ale**: Safe-to-drink fermented water, as clean river water was rare.

In the game, you will step into the boots of a villager. Can you complete the tasks needed to keep the community fed and thriving?`,
      quizId: null,
      assessmentType: 'medieval-daily-life-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'history',
      lessonNumber: 5,
      title: "The Crusades",
      emoji: '⚔️',
      content: `# The Crusades ⚔️

The Crusades were a series of religious wars between Christians and Muslims between 1095 and 1291. They were fought primarily for control of the "Holy Land" (modern-day Israel/Palestine), which was sacred to both religions.

## Motivations for the Journey
Thousands of people—from powerful kings to poor peasants—traveled over 3,000 miles to join the Crusades.
- **Faith**: Many believed that fighting in the Crusades would guarantee them a place in heaven.
- **Adventure**: For many knights, it was a chance to see the world and win glory.
- **Land**: Younger sons of nobles who wouldn't inherit land at home hoped to win their own estates in the East.

## Consequences of the Conflict
While the wars were violent, they led to an explosion of new knowledge in Europe.
- **Mathematics & Science**: Europeans learned about algebra, decimals, and advanced medicine from the Islamic world.
- **Trade**: Ships brought back silks, cotton, and exotic spices like cinnamon and pepper.
- **Culture**: New musical instruments and philosophical ideas reached Europe for the first time.

In the game, you will navigate the decisions and difficulties of a Crusader. Can you understand the legacy of these massive world events?`,
      quizId: null,
      assessmentType: 'crusades-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'history',
      lessonNumber: 6,
      title: "The Renaissance - A New Beginning",
      emoji: '🎨',
      content: `# The Renaissance - A New Beginning 🎨

Florence, Rome, and Venice became creative laboratories between 1400 and 1600. Artists studied mathematics to draw realistic spaces, scientists tested new ideas, and explorers carried European technology across oceans.

## The Big Ideas

- **Humanism** – Scholars revisited Greek and Roman books to understand people, not only kings.
- **Perspective** – Artists used rulers and math to make flat walls feel three-dimensional.
- **Innovation** – Printing presses, new sails, and precise maps accelerated the spread of ideas.

## How to Play – Renaissance Studio Challenge

1. **Patronage Board**
    - Click an *Idea Card* (Medici funds, marble, pigments, etc.).
    - Click the city panel that needs that resource.
    - Florence, Rome, and Venice each require two different ingredients to flourish.
2. **Perspective Timeline**
    - Once the cities are stocked, rebuild the Renaissance timeline by selecting events from the earliest year to the latest.
3. **Invention Lab**
    - Mix the exact components that created the printing press, the scientific method, and bold voyages.
    - Lock in your choices to see whether the invention works!

Earn points in every phase. A perfect run scores 100%.

## Learning Goals

- Match patrons, artists, and resources to the Italian city that needed them most.
- Explain the order of key Renaissance breakthroughs.
- Describe how combining the right tools led to new inventions.

## Vocabulary

- **Patronage** – Money or protection that allows artists to focus on their craft.
- **Perspective** – A math-based way to show depth on a flat surface.
- **Humanism** – A focus on people, their choices, and classical ideas.

## Remember

- The Renaissance was a *rebirth* powered by cities working together.
- Art, science, and exploration are connected—changing one sparks the others.
- Asking better questions and testing ideas is what launches a new era!`,
      quizId: null,
      assessmentType: 'renaissance-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'history',
      lessonNumber: 7,
      title: "Age of Exploration",
      emoji: '🚢',
      content: `# Age of Exploration 🚢

In the 15th and 16th centuries, European explorers set out into the unknown, driven by a desire for riches, fame, and a faster route to the spices of the East.

## Global Trade and Spices
During the Middle Ages, spices like cinnamon, pepper, and cloves were as valuable as gold. They were used to preserve food and make it taste better. European kings wanted to bypass the expensive land routes (the Silk Road) and find a direct sea route to Asia.

## Modern Navigation Technology
New inventions allowed explorers to sail further than ever before:
- **The Compass**: Allowed sailors to find their direction even when they couldn't see the sun or stars.
- **The Astrolabe**: Helped sailors calculate their latitude (their distance from the Equator).
- **The Caravel**: A new type of faster, more maneuverable ship with triangular sails.

## The Columbian Exchange
The voyages of Columbus and others led to a massive exchange of plants, animals, and ideas between the "Old World" (Europe, Africa, Asia) and the "New World" (The Americas).
- **To Europe**: Potatoes, tomatoes, cocoa, and corn.
- **To the Americas**: Horses, cattle, wheat, and unfortunately, many new diseases.

In the game, you will follow the paths of great explorers and test your knowledge of how the world became connected!`,
      quizId: null,
      assessmentType: 'exploration-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 1,
      title: "Python Lesson 1: Getting Started",
      emoji: '🐍',
      content: `# Python Lesson 1: Getting Started 🐍

## What is Python?

Python is a programming language that is easy to learn and fun to use! It's named after the Monty Python comedy group, not the snake (though the snake emoji is fun!).

## Why Learn Python?

- **Easy to Read**: Python code looks almost like English
- **Powerful**: Used by professionals to build websites, games, and apps
- **Fun**: You can create games, draw pictures, and solve puzzles
- **Popular**: Many companies use Python

## Installing Python

Before you can write Python code, you need to install Python on your computer.

### Steps:

1. Go to python.org
2. Download Python (version 3.x)
3. Run the installer
4. Make sure to check "Add Python to PATH"
5. Click "Install Now"

## Running Python Code

There are different ways to run Python:

### Method 1: Python Shell (Interactive)

1. Open "Python" or "IDLE" from your programs
2. Type code directly
3. Press Enter to run

### Method 2: Python Files

1. Open a text editor (like Notepad or VS Code)
2. Write your code
3. Save as \`.py\` file (e.g., \`my_program.py\`)
4. Run it from the command line or double-click

## Your First Program

The code is already written for you! Look at the code editor below - you'll see:

\`\`\`python
print("Hello, World!")
\`\`\`

**What does this do?**
- \`print()\` is a function that displays text
- The text in quotes is what gets shown
- When you run this code, you'll see: Hello, World!

## Try It Yourself

1. Look at the code in the editor below (it's already there!)
2. Click the "Run Code" button to see what happens
3. You should see "Hello, World!" appear in the output
4. Try changing the message to say hello to yourself!

<!-- EXERCISE_START -->
{
  "instruction": "The code is already written for you! Run it to see 'Hello, World!' appear. Then try changing the message to say hello to yourself!",
  "expectedContains": "Hello",
  "codePattern": null
}
<!-- EXERCISE_END -->

## Important Notes

- Python is case-sensitive (capital letters matter)
- Use quotes around text (strings)
- Save your work often
- Don't be afraid to experiment!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'python',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 2,
      title: "Python Lesson 2: Printing & Text",
      emoji: '📝',
      content: `# Python Lesson 2: Printing & Text 📝

## The Print Function

The \`print()\` function is one of the most important tools in Python. It displays messages on the screen.

## Basic Printing

\`\`\`python
print("Hello!")
print("I am learning Python")
print("This is fun!")
\`\`\`

**Output:**
\`\`\`
Hello!
I am learning Python
This is fun!
\`\`\`

## Printing Multiple Things

You can print multiple things at once:

\`\`\`python
print("Hello", "World")
print("My", "name", "is", "Python")
\`\`\`

**Output:**
\`\`\`
Hello World
My name is Python
\`\`\`

## Printing Numbers

You can print numbers without quotes:

\`\`\`python
print(5)
print(10)
print(3 + 2)
\`\`\`

**Output:**
\`\`\`
5
10
5
\`\`\`

## Combining Text and Numbers

\`\`\`python
print("I am", 8, "years old")
print("2 + 2 =", 2 + 2)
\`\`\`

**Output:**
\`\`\`
I am 8 years old
2 + 2 = 4
\`\`\`

## Special Characters

### New Line

Use \`\\n\` to start a new line:

\`\`\`python
print("Line 1\\nLine 2\\nLine 3")
\`\`\`

**Output:**
\`\`\`
Line 1
Line 2
Line 3
\`\`\`

### Tabs

Use \`\\t\` to add a tab (spacing):

\`\`\`python
print("Name:\\tAlice")
print("Age:\\t8")
\`\`\`

**Output:**
\`\`\`
Name:    Alice
Age:     8
\`\`\`

## Practice Examples

### Example 1: Greeting

\`\`\`python
print("Welcome to Python!")
print("Let's learn together")
print("Have fun coding!")
\`\`\`

### Example 2: Math Display

\`\`\`python
print("5 + 3 =", 5 + 3)
print("10 - 4 =", 10 - 4)
print("2 * 6 =", 2 * 6)
\`\`\`

### Example 3: Story

\`\`\`python
print("Once upon a time...")
print("There was a young programmer")
print("Who learned Python")
print("And created amazing things!")
\`\`\`

## Example Code to Guide You

Here's some example code that shows similar patterns you can use:

\`\`\`python
# Example: Printing different types of information
print("My favorite animal is a dog")
print("I have", 3, "pets")
print("Coding is", "fun!")

# Notice how:
# - Text goes in quotes
# - Numbers don't need quotes
# - You can print multiple things with commas
\`\`\`

**Now try your own version!** Use the patterns above but with your own information.

## Try It Yourself

Now it's your turn! Write your own code in the editor below:

1. Print your name using \`print()\`
2. Print your favorite color
3. Print some math problems (like \`print("5 + 3 =", 5 + 3)\`)
4. Write a short story using multiple print statements

<!-- EXERCISE_START -->
{
  "instruction": "Write code to print your name and favorite color. Use the print() function!",
  "expectedContains": null,
  "codePattern": "print\\(.*\\)"
}
<!-- EXERCISE_END -->

## Important Notes

- Text must be in quotes (single or double)
- Numbers don't need quotes
- \`print()\` can display text, numbers, and calculations
- Use commas to separate multiple items`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'python',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 3,
      title: "Python Lesson 3: Variables & Data",
      emoji: '📦',
      content: `# Python Lesson 3: Variables & Data 📦

## What is a Variable?

A variable is like a box where you store information. You give the box a name and put something inside it.

## Creating Variables

\`\`\`python
name = "Alice"
age = 8
favorite_color = "blue"
\`\`\`

**What's happening?**
- \`name\` is the variable name
- \`=\` assigns a value
- \`"Alice"\` is the value stored

## Types of Data

### Strings (Text)

Text in quotes:

\`\`\`python
name = "Python"
greeting = "Hello"
message = "I love coding!"
\`\`\`

### Numbers (Integers)

Whole numbers:

\`\`\`python
age = 8
score = 100
count = 5
\`\`\`

### Numbers (Floats)

Decimal numbers:

\`\`\`python
height = 1.25
temperature = 36.5
price = 9.99
\`\`\`

## Using Variables

Once you create a variable, you can use it:

\`\`\`python
name = "Alice"
print("Hello,", name)
print(name, "is learning Python")
\`\`\`

**Output:**
\`\`\`
Hello, Alice
Alice is learning Python
\`\`\`

## Math with Variables

\`\`\`python
apples = 5
oranges = 3
total = apples + oranges

print("I have", total, "fruits")
\`\`\`

**Output:**
\`\`\`
I have 8 fruits
\`\`\`

## Changing Variables

You can change what's stored in a variable:

\`\`\`python
score = 10
print("Score:", score)

score = 20
print("New score:", score)
\`\`\`

**Output:**
\`\`\`
Score: 10
New score: 20
\`\`\`

## Variable Names

Good variable names:
- Use lowercase letters
- Use underscores for spaces
- Be descriptive

**Good examples:**
\`\`\`python
student_name = "Alice"
number_of_apples = 5
total_score = 100
\`\`\`

**Bad examples:**
\`\`\`python
x = "Alice"  # Not clear what x means
n = 5        # Not descriptive
\`\`\`

## Practice Examples

### Example 1: Personal Info

\`\`\`python
my_name = "Python Learner"
my_age = 8
my_school = "Code Academy"

print("Name:", my_name)
print("Age:", my_age)
print("School:", my_school)
\`\`\`

### Example 2: Shopping

\`\`\`python
apples = 3
bananas = 5
oranges = 2

total_fruits = apples + bananas + oranges
print("Total fruits:", total_fruits)
\`\`\`

### Example 3: Calculations

\`\`\`python
length = 10
width = 5
area = length * width

print("Length:", length)
print("Width:", width)
print("Area:", area)
\`\`\`

## How to Create a Variable

Follow these steps to create your own variable:

1. **Choose a name** - Use lowercase letters and underscores (e.g., \`my_name\`, \`favorite_color\`)
2. **Use the equals sign** - Write \`=\` to assign a value
3. **Add the value** - Put text in quotes or numbers without quotes

**Example pattern:**
\`\`\`
variable_name = value
\`\`\`

## Example Code to Guide You

Here's some example code showing how to create and use variables:

\`\`\`python
# Example: Creating variables for different types of information
student_name = "Sam"
student_grade = 4
favorite_subject = "Math"

# Printing the variables
print("Student:", student_name)
print("Grade:", student_grade)
print("Favorite subject:", favorite_subject)

# Notice how:
# - Text variables use quotes: "Sam"
# - Number variables don't use quotes: 4
# - You can print variables just like text or numbers
\`\`\`

**Now try your own version!** Create variables for your name and age, then print them.

## Try It Yourself

Now write your own code in the editor below! Try these challenges:

1. **Create a variable** called \`my_name\` and set it to your name (remember: text needs quotes!)
2. **Create a variable** called \`my_age\` and set it to your age (numbers don't need quotes)
3. **Print both variables** using \`print()\`
4. **Create two number variables** and add them together, then print the result

**Hint:** Remember the pattern: \`name = "value"\` for text, and \`number = 5\` for numbers!

<!-- EXERCISE_START -->
{
  "instruction": "Create a variable called 'name' and set it to your name, then print it. Also create a variable for your age and print that too!",
  "codePattern": "name\\s*=\\s*[\"'].*[\"']|my_name\\s*=\\s*[\"'].*[\"']",
  "expectedContains": null
}
<!-- EXERCISE_END -->

## Important Notes

- Variables store information
- Use \`=\` to assign values
- Variable names should be clear and descriptive
- You can change variable values anytime
- Text needs quotes, numbers don't`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'python',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 4,
      title: "Python Lesson 4: Input & Interaction",
      emoji: '⌨️',
      content: `# Python Lesson 4: Input & Interaction ⌨️

## Making Programs Interactive

Until now, your programs have been one-way conversations - they talk to you, but you can't talk back! The \`input()\` function changes that. It's like giving your program ears so it can listen to what users type.

**Why is this important?** Real programs need to interact with users - games ask for your name, calculators ask for numbers, and apps respond to what you do. This lesson teaches you how to make your programs truly interactive!

## Understanding the Input Function

The \`input()\` function pauses your program and waits for the user to type something and press Enter. Whatever they type gets stored in a variable.

### How It Works

\`\`\`python
name = input("What is your name? ")
print("Hello,", name)
\`\`\`

**Step by step:**
1. The program displays: "What is your name? " and waits
2. User types their name (e.g., "Alice") and presses Enter
3. The text "Alice" is stored in the \`name\` variable
4. The program continues and prints: "Hello, Alice"

## The Input Prompt

The text inside \`input()\` is called a **prompt**. It tells the user what to type. Good prompts are:
- **Clear**: "Enter your age: " is better than "Age:"
- **Helpful**: "Enter a number between 1 and 10: " guides the user
- **Friendly**: "What's your favorite color? " feels more welcoming

## Working with Text Input

Text input is straightforward - whatever the user types becomes a string (text):

\`\`\`python
favorite_color = input("What is your favorite color? ")
print("I like", favorite_color, "too!")
print("That's a beautiful color!")
\`\`\`

**Try it:** The user can type anything - "blue", "red", "purple", or even "rainbow sparkle"!

## Working with Number Input

**Critical Concept:** \`input()\` always returns text, even when the user types numbers!

\`\`\`python
age = input("How old are you? ")
print("You are", age, "years old")
# age is a string like "8", not the number 8
\`\`\`

If you try to do math with this, you'll get an error:
\`\`\`python
age = input("How old are you? ")
next_year = age + 1  # ERROR! Can't add number to text
\`\`\`

## Converting Text to Numbers

You must convert text to numbers before doing math:

### Converting to Integers (Whole Numbers)

Use \`int()\` to convert text to a whole number:

\`\`\`python
age = int(input("How old are you? "))
next_year = age + 1
print("Next year you will be", next_year)
\`\`\`

**What happens:**
- User types "8" (as text)
- \`int()\` converts "8" to the number 8
- Now you can do math: 8 + 1 = 9

### Converting to Floats (Decimal Numbers)

Use \`float()\` for numbers with decimals:

\`\`\`python
height = float(input("How tall are you in meters? "))
print("You are", height, "meters tall")
\`\`\`

**Example:** User types "1.25" → becomes the number 1.25

## Real-World Applications

### Application 1: Personal Information Form

Create a program that collects information like a form:

\`\`\`python
print("=== Personal Information Form ===")
print()

name = input("Full name: ")
age = int(input("Age: "))
favorite_subject = input("Favorite subject: ")
birth_month = input("Birth month: ")

print()
print("Thank you! Here's your information:")
print("Name:", name)
print("Age:", age)
print("Favorite subject:", favorite_subject)
print("Birth month:", birth_month)
\`\`\`

### Application 2: Interactive Calculator

Build a calculator that asks for numbers:

\`\`\`python
print("=== Simple Calculator ===")

num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

print()
print("Results:")
print("Addition:", num1 + num2)
print("Subtraction:", num1 - num2)
print("Multiplication:", num1 * num2)
print("Division:", num1 / num2)
\`\`\`

### Application 3: Mad Libs Story Generator

Create an interactive story:

\`\`\`python
print("Let's create a story together!")
print()

name = input("Enter a character name: ")
place = input("Enter a place: ")
animal = input("Enter an animal: ")
verb = input("Enter an action (like 'run' or 'jump'): ")
number = int(input("Enter a number: "))

print()
print("=== Your Story ===")
print("Once upon a time,", name)
print("went to", place)
print("and saw", number, animal + "s")
print("that liked to", verb)
print("every day!")
print("The end!")
\`\`\`

### Application 4: Shopping Calculator

Calculate costs with user input:

\`\`\`python
print("=== Shopping Calculator ===")

item = input("What are you buying? ")
price = float(input("What's the price? £"))
quantity = int(input("How many do you want? "))

total = price * quantity

print()
print("Receipt:")
print("Item:", item)
print("Price each: £" + str(price))
print("Quantity:", quantity)
print("Total: £" + str(total))
\`\`\`

## Common Mistakes to Avoid

1. **Forgetting to convert numbers:**
   \`\`\`python
   # Wrong:
   age = input("Age: ")
   next_year = age + 1  # Error!
   
   # Right:
   age = int(input("Age: "))
   next_year = age + 1  # Works!
   \`\`\`

2. **Unclear prompts:**
   \`\`\`python
   # Bad:
   x = input("x: ")
   
   # Good:
   name = input("What is your name? ")
   \`\`\`

3. **Not handling errors:**
   If a user types text when you expect a number, the program will crash. For now, just make sure to type numbers when the program asks!

## Example Code to Guide You

Here's some example code showing how to use input() and convert to numbers:

\`\`\`python
# Example: Getting input and doing calculations
# Note: In this simulator, input() won't work, so we'll use direct values
# But in real Python, you'd use: user_age = int(input("How old are you? "))

user_age = 9  # This simulates: int(input("How old are you? "))
years_later = 3
future_age = user_age + years_later

print("You are", user_age, "years old now")
print("In", years_later, "years, you will be", future_age)

# Notice how:
# - We use int() to convert text to a number
# - We can do math with the converted number
# - We combine text and numbers in print statements
\`\`\`

**Now try your own version!** Ask for name and age, then calculate something with the age.

## Try It Yourself

Now write your own interactive programs! Try these challenges:

1. **Personal Greeting Program**
   - Ask for the user's name and age
   - Calculate how old they'll be in 5 years
   - Print a personalized message

2. **Math Quiz Helper**
   - Ask for two numbers
   - Calculate and display: sum, difference, product, and quotient
   - Format the output nicely

3. **Fun Facts Generator**
   - Ask for: name, favorite animal, favorite number
   - Create a fun fact using their answers
   - Example: "Did you know Alice's favorite number is 7, and they love elephants!"

4. **Recipe Converter**
   - Ask for number of servings
   - Ask for ingredient amounts (like cups of flour)
   - Calculate amounts for double the servings

<!-- EXERCISE_START -->
{
  "instruction": "Create an interactive program that asks for the user's name and age, then calculates and prints how old they will be in 10 years. Remember: use int() to convert the age input to a number!",
  "codePattern": "int\\(input|age\\s*=\\s*int",
  "expectedContains": null
}
<!-- EXERCISE_END -->

## Important Notes

- \`input()\` always returns text (strings), even for numbers
- Use \`int()\` to convert text to whole numbers
- Use \`float()\` to convert text to decimal numbers
- Write clear, helpful prompts so users know what to enter
- Test your programs with different inputs to make sure they work
- Interactive programs make coding much more fun and useful!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'python',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 5,
      title: "Python Lesson 5: Decisions (if statements)",
      emoji: '🤔',
      content: `# Python Lesson 5: Decisions (if statements) 🤔

## Making Smart Decisions

Real programs need to make decisions - just like you do! Should I show this message? Can this user access this feature? Is this answer correct? Python uses \`if\` statements to make these choices based on conditions.

**Think of it like this:** If it's raining, you bring an umbrella. If it's sunny, you wear sunglasses. Programs work the same way - they check conditions and respond accordingly!

## Understanding Conditions

A **condition** is a question that can be answered with True or False:
- "Is the age 8 or more?" → True or False
- "Is the score greater than 80?" → True or False
- "Is the password correct?" → True or False

## The Basic If Statement

The simplest decision: "If this is true, do that."

\`\`\`python
age = 10

if age >= 8:
    print("You can ride the roller coaster!")
\`\`\`

**Breaking it down:**
- \`if\` - starts the decision
- \`age >= 8\` - the condition (question)
- \`:\` - colon means "here comes the action"
- Indented code - what happens if the condition is True

**Critical:** The indentation (4 spaces) is required! Python uses indentation to know which code belongs inside the if statement.

## Comparison Operators - Your Decision Tools

These operators let you compare values:

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| \`==\` | equals | \`5 == 5\` | True |
| \`!=\` | not equals | \`5 != 3\` | True |
| \`>\` | greater than | \`10 > 5\` | True |
| \`<\` | less than | \`3 < 7\` | True |
| \`>=\` | greater than or equal | \`8 >= 8\` | True |
| \`<=\` | less than or equal | \`5 <= 10\` | True |

**Common mistake:** Using \`=\` instead of \`==\`
- \`=\` assigns a value (age = 10)
- \`==\` compares values (age == 10)

## Real-World Decision Examples

### Example 1: Game Score System

\`\`\`python
score = int(input("What's your game score? "))

if score >= 100:
    print("🏆 Champion! Amazing score!")
elif score >= 50:
    print("⭐ Great job! You're doing well!")
elif score >= 20:
    print("👍 Good effort! Keep practicing!")
else:
    print("💪 Keep trying! You'll get better!")
\`\`\`

### Example 2: Weather Advisor

\`\`\`python
temperature = int(input("What's the temperature? "))

if temperature > 25:
    print("It's hot! Wear light clothes and drink water.")
elif temperature > 15:
    print("Nice weather! Perfect for playing outside.")
elif temperature > 5:
    print("It's cool. A jacket would be good.")
else:
    print("It's cold! Bundle up with warm clothes.")
\`\`\`

### Example 3: Access Control

\`\`\`python
age = int(input("How old are you? "))

if age >= 13:
    print("You can watch PG-13 movies!")
elif age >= 8:
    print("You can watch family movies!")
else:
    print("Stick to kids' movies for now!")
\`\`\`

## If-Else: Two Paths

When you have two options - do this OR do that:

\`\`\`python
password = input("Enter the password: ")

if password == "python123":
    print("✅ Access granted! Welcome!")
else:
    print("❌ Access denied! Wrong password.")
\`\`\`

**Think of it like:** If the password is correct, let them in. Otherwise, block access.

## If-Elif-Else: Multiple Paths

When you have many options, use \`elif\` (short for "else if"):

\`\`\`python
score = int(input("Enter your test score: "))

if score >= 90:
    grade = "A"
    message = "Outstanding work!"
elif score >= 80:
    grade = "B"
    message = "Great job!"
elif score >= 70:
    grade = "C"
    message = "Good work!"
elif score >= 60:
    grade = "D"
    message = "You passed, but try harder next time!"
else:
    grade = "F"
    message = "Keep studying and try again!"

print("Your grade:", grade)
print(message)
\`\`\`

**How it works:** Python checks each condition in order. As soon as one is True, it runs that code and skips the rest.

## Combining Conditions

### Using \`and\` - Both Must Be True

\`\`\`python
age = 12
has_permission = True

if age >= 10 and has_permission:
    print("You can go to the park!")
else:
    print("Sorry, you need to be 10+ AND have permission.")
\`\`\`

**Real example:** You can watch a movie if you're old enough AND have a ticket.

### Using \`or\` - Either Can Be True

\`\`\`python
day = input("What day is it? ")

if day == "Saturday" or day == "Sunday":
    print("It's the weekend! Time to relax!")
else:
    print("It's a school day. Time to learn!")
\`\`\`

**Real example:** You can sleep in if it's Saturday OR Sunday.

### Using \`not\` - Reverse the Condition

\`\`\`python
is_raining = input("Is it raining? (yes/no): ")

if not is_raining == "yes":
    print("Great! Let's go outside and play!")
else:
    print("Stay inside and read a book!")
\`\`\`

## Practical Applications

### Application 1: Smart Calculator

\`\`\`python
print("=== Smart Calculator ===")
num1 = float(input("First number: "))
operation = input("Operation (+, -, *, /): ")
num2 = float(input("Second number: "))

if operation == "+":
    result = num1 + num2
elif operation == "-":
    result = num1 - num2
elif operation == "*":
    result = num1 * num2
elif operation == "/":
    if num2 == 0:
        result = "Error! Can't divide by zero!"
    else:
        result = num1 / num2
else:
    result = "Invalid operation!"

print("Result:", result)
\`\`\`

### Application 2: Adventure Game Choice

\`\`\`python
print("You're in a forest. You see two paths.")
choice = input("Do you go LEFT or RIGHT? ")

if choice.lower() == "left":
    print("You found a treasure chest! 🏆")
    print("You win!")
elif choice.lower() == "right":
    print("You found a friendly dragon! 🐉")
    print("The dragon gives you a magic gem!")
else:
    print("You stand still, confused. Try LEFT or RIGHT next time!")
\`\`\`

### Application 3: Study Time Advisor

\`\`\`python
time = int(input("What time is it? (0-23): "))
has_homework = input("Do you have homework? (yes/no): ")

if time >= 20 or time < 7:
    print("It's late or early! Time to rest.")
elif has_homework.lower() == "yes":
    if time < 18:
        print("Good time to do homework! Focus and get it done.")
    else:
        print("Do your homework, but don't stay up too late!")
else:
    print("Free time! Maybe read a book or play outside.")
\`\`\`

## Example Code to Guide You

Here's some example code showing how to use if/elif/else statements:

\`\`\`python
# Example: Checking a number and giving feedback
number = 15

if number > 10:
    print("The number is greater than 10")
elif number < 10:
    print("The number is less than 10")
else:
    print("The number is exactly 10")

# Example: Checking multiple conditions
score = 85
if score >= 90:
    print("Excellent!")
elif score >= 70:
    print("Good job!")
else:
    print("Keep practicing!")

# Notice how:
# - if checks the first condition
# - elif checks other conditions if the first is false
# - else handles everything else
# - You can check numbers, text, or combinations
\`\`\`

**Now try your own version!** Use if/elif/else to check different conditions.

## Try It Yourself

Create your own decision-making programs! Try these:

1. **Number Analyzer**
   - Ask for a number
   - Tell if it's positive, negative, or zero
   - Tell if it's even or odd
   - Tell if it's greater than 100

2. **Shopping Helper**
   - Ask how much money they have
   - Ask the price of an item
   - Tell them if they can afford it
   - If yes, calculate change

3. **Game Character Creator**
   - Ask for character name and age
   - Based on age, assign a character class (young = wizard, medium = warrior, old = sage)
   - Print their character info

4. **Weather-Based Activity Planner**
   - Ask about weather (sunny, rainy, snowy)
   - Suggest appropriate activities
   - Include temperature in the decision

<!-- EXERCISE_START -->
{
  "instruction": "Create a program that asks for a number, then uses if/elif/else to check if it's positive, negative, or zero, and prints an appropriate message. Also check if the number is greater than 100!",
  "codePattern": "if.*>|elif.*<|else:",
  "expectedContains": null
}
<!-- EXERCISE_END -->

## Important Notes

- Always use a colon \`:\` after \`if\`, \`elif\`, and \`else\`
- **Indentation is critical** - use 4 spaces for code inside if statements
- \`==\` compares (checks if equal), \`=\` assigns (gives a value)
- Use \`and\` when BOTH conditions must be true
- Use \`or\` when EITHER condition can be true
- Test your programs with different values to make sure all paths work
- Decision-making is what makes programs smart and useful!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'python',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 6,
      title: "Python Lesson 6: Loops",
      emoji: '🔄',
      content: `# Python Lesson 6: Loops 🔄

## The Power of Repetition

Imagine having to write "Hello!" 100 times - that would take forever! Loops solve this problem. They let you repeat code automatically, making programs powerful and efficient.

**Why loops matter:** Real programs use loops constantly - games loop through levels, websites loop through pages, and apps loop through data. Learning loops unlocks the ability to build truly useful programs!

## Understanding For Loops

A \`for\` loop repeats code a **specific number of times**. Think of it like: "Do this 5 times" or "Repeat this for each item in a list."

### The Range Function

\`range()\` is your tool for controlling how many times a loop runs:

\`\`\`python
for i in range(5):
    print("Hello!")
\`\`\`

**What happens:**
- \`range(5)\` creates numbers: 0, 1, 2, 3, 4 (5 numbers total)
- The loop runs once for each number
- \`i\` is a variable that holds the current number
- Result: "Hello!" prints 5 times

### Using the Loop Variable

The variable \`i\` (or any name you choose) holds the current number:

\`\`\`python
for i in range(5):
    print("Count:", i)
\`\`\`

**Output:**
\`\`\`
Count: 0
Count: 1
Count: 2
Count: 3
Count: 4
\`\`\`

**Important:** \`range(5)\` starts at 0, not 1! This is because programmers often count from 0.

### Starting from a Different Number

Use \`range(start, end)\` to begin from a specific number:

\`\`\`python
for i in range(1, 6):
    print(i)
\`\`\`

**Output:** 1, 2, 3, 4, 5 (starts at 1, ends before 6)

### Counting by Steps

Use \`range(start, end, step)\` to count by 2s, 3s, etc.:

\`\`\`python
for i in range(0, 10, 2):
    print(i)
\`\`\`

**Output:** 0, 2, 4, 6, 8 (counts by 2s)

### Counting Backwards

Use a negative step to count down:

\`\`\`python
for i in range(10, 0, -1):
    print(i)
print("Blast off! 🚀")
\`\`\`

**Output:** 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, then "Blast off! 🚀"

## Looping Through Lists

You can loop through items in a list (we'll learn more about lists later):

\`\`\`python
fruits = ["apple", "banana", "orange"]

for fruit in fruits:
    print("I like", fruit)
\`\`\`

**What happens:** The loop runs once for each item in the list, and \`fruit\` holds the current item.

## While Loops - Repeat Until...

A \`while\` loop repeats **as long as a condition is true**. Think: "Keep doing this until something changes."

### Basic While Loop

\`\`\`python
count = 0

while count < 5:
    print("Count is", count)
    count = count + 1  # Important: change the variable!
\`\`\`

**Critical:** You MUST change the variable inside the loop, or it will run forever (infinite loop)!

### Interactive While Loop

\`\`\`python
answer = ""

while answer != "yes":
    answer = input("Do you want to continue? (yes/no): ")
    print("You said:", answer)

print("Great! Let's continue!")
\`\`\`

**Use case:** Keep asking until you get the answer you want.

## When to Use For vs While

- **Use \`for\`** when you know exactly how many times to repeat
- **Use \`while\`** when you need to repeat until a condition changes

## Practical Loop Applications

### Application 1: Multiplication Table Generator

\`\`\`python
number = int(input("Which times table? (1-12): "))

print(f"=== {number} Times Table ===")
for i in range(1, 13):
    result = number * i
    print(f"{number} x {i} = {result}")
\`\`\`

### Application 2: Number Pattern Generator

\`\`\`python
print("=== Number Patterns ===")

# Pattern 1: Counting up
print("Counting 1 to 10:")
for i in range(1, 11):
    print(i, end=" ")
print()

# Pattern 2: Even numbers
print("Even numbers 0 to 20:")
for i in range(0, 21, 2):
    print(i, end=" ")
print()

# Pattern 3: Powers of 2
print("Powers of 2:")
for i in range(1, 6):
    power = 2 ** i
    print(f"2^{i} = {power}")
\`\`\`

### Application 3: Accumulator Pattern

Build up a total by adding in a loop:

\`\`\`python
total = 0
print("Enter 5 numbers to add:")

for i in range(5):
    number = int(input(f"Number {i+1}: "))
    total = total + number
    print(f"Running total: {total}")

print(f"Final sum: {total}")
\`\`\`

### Application 4: Password Retry System

\`\`\`python
correct_password = "python123"
attempts = 0
max_attempts = 3

while attempts < max_attempts:
    password = input("Enter password: ")
    if password == correct_password:
        print("✅ Access granted!")
        break
    else:
        attempts = attempts + 1
        remaining = max_attempts - attempts
        if remaining > 0:
            print(f"❌ Wrong password! {remaining} attempts left.")
        else:
            print("❌ Access denied! Too many failed attempts.")
\`\`\`

## Nested Loops - Loops Inside Loops

Sometimes you need a loop inside another loop:

\`\`\`python
# Draw a grid pattern
for row in range(3):
    for col in range(4):
        print(f"({row},{col})", end=" ")
    print()  # New line after each row
\`\`\`

**Output:**
\`\`\`
(0,0) (0,1) (0,2) (0,3)
(1,0) (1,1) (1,2) (1,3)
(2,0) (2,1) (2,2) (2,3)
\`\`\`

**Real use:** Creating grids, tables, or patterns.

## Common Loop Patterns

### Pattern 1: Sum a Range

\`\`\`python
total = 0
for i in range(1, 101):
    total = total + i
print("Sum of 1 to 100:", total)
\`\`\`

### Pattern 2: Find Maximum

\`\`\`python
numbers = [5, 12, 3, 8, 15, 2]
maximum = numbers[0]

for num in numbers:
    if num > maximum:
        maximum = num

print("Maximum number:", maximum)
\`\`\`

### Pattern 3: Count Occurrences

\`\`\`python
text = "hello world"
count = 0

for letter in text:
    if letter == "l":
        count = count + 1

print(f"The letter 'l' appears {count} times")
\`\`\`

## Try It Yourself

Create these programs using loops:

1. **Times Table Generator**
   - Ask which number's times table to generate
   - Print the full table from 1x to 12x

2. **Number Analyzer**
   - Ask for 5 numbers
   - Calculate and display: sum, average, maximum, minimum

3. **Countdown Timer**
   - Count down from a number the user enters
   - Display each number
   - End with a special message

4. **Pattern Creator**
   - Print a pattern like: 1, 22, 333, 4444, 55555
   - Or: *, **, ***, ****, *****

5. **Interactive Quiz**
   - Ask 5 questions in a loop
   - Keep track of correct answers
   - Display final score

## Example Code to Guide You

Here's some example code showing how to use loops:

\`\`\`python
# Example: Using a for loop to count
for i in range(1, 6):
    print("Count:", i)

# Example: Using a loop to create a pattern
for i in range(1, 4):
    print("Number", i, "squared is", i * i)

# Example: Building up a total in a loop
total = 0
for i in range(1, 4):
    total = total + i
    print("Adding", i, "- Total so far:", total)
print("Final total:", total)

# Notice how:
# - range(1, 6) gives you 1, 2, 3, 4, 5
# - The loop variable (i) changes each time
# - You can do calculations inside the loop
# - You can build up values (like total) as you loop
\`\`\`

**Now try your own version!** Use loops to repeat actions and create patterns.

<!-- EXERCISE_START -->
{
  "instruction": "Create a program that uses a for loop to print numbers from 1 to 10, then uses another loop to print the 5 times table (5 x 1 = 5, 5 x 2 = 10, etc. up to 5 x 10 = 50).",
  "codePattern": "for.*range|for.*in.*range",
  "expectedContains": null
}
<!-- EXERCISE_END -->

## Important Notes

- \`for\` loops are perfect when you know how many times to repeat
- \`while\` loops are perfect when you need to repeat until a condition changes
- **Always indent code inside loops** (4 spaces)
- **Be careful with while loops** - make sure the condition can become False, or you'll get an infinite loop!
- \`range(start, end)\` goes from start up to (but not including) end
- \`range(5)\` gives you 0, 1, 2, 3, 4 (5 numbers, starting at 0)
- Loops make programs powerful - you can process lots of data or repeat actions easily
- Practice with different ranges and conditions to master loops!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'python',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 7,
      title: "Python Lesson 7: Functions",
      emoji: '⚙️',
      content: `# Python Lesson 7: Functions ⚙️

## What are Functions?

Functions are like **reusable tools** in your programming toolbox. Instead of writing the same code repeatedly, you write it once as a function and use it whenever needed!

**Real-world analogy:** Think of a function like a recipe. You write the recipe once, but you can use it to cook the same dish many times. Functions work the same way - define once, use many times!

## Why Functions Are Powerful

- **Avoid repetition**: Write code once, use it everywhere
- **Organize your code**: Break big problems into smaller, manageable pieces
- **Easy to fix**: Change code in one place, and it updates everywhere
- **Readable code**: Function names describe what they do
- **Testable**: Test each function separately

## Creating Your First Function

### Basic Function Structure

\`\`\`python
def greet():
    print("Hello!")
    print("Welcome to Python programming!")

# Call (use) the function
greet()
\`\`\`

**Breaking it down:**
- \`def\` - keyword that means "define a function"
- \`greet\` - the function name (you choose this)
- \`()\` - parentheses (empty here, but can hold parameters)
- \`:\` - colon means "here comes the function code"
- Indented code - what the function does
- \`greet()\` - calling the function makes it run

### Functions with Parameters

**Parameters** are like ingredients you give to your function:

\`\`\`python
def greet(name):
    print("Hello,", name)
    print("Nice to meet you!")
    print("Have a great day!")

# Use the function with different names
greet("Alice")
greet("Bob")
greet("Charlie")
\`\`\`

**What happens:** The function receives the name as a parameter and uses it inside. You can call it with different values!

### Functions with Multiple Parameters

Functions can take multiple inputs:

\`\`\`python
def introduce(name, age, hobby):
    print(f"Hi! I'm {name}")
    print(f"I'm {age} years old")
    print(f"I love {hobby}")

introduce("Sam", 9, "coding")
introduce("Emma", 10, "drawing")
\`\`\`

## Returning Values

Functions can **return** (give back) a value using the \`return\` keyword:

\`\`\`python
def add(a, b):
    result = a + b
    return result

# Use the returned value
sum = add(5, 3)
print("The sum is", sum)

# Or use it directly
print("10 + 7 =", add(10, 7))
\`\`\`

**Key concept:** \`return\` sends a value back to where the function was called. Without \`return\`, the function does something but doesn't give back a value.

## Real-World Function Examples

### Example 1: Math Helper Functions

\`\`\`python
def square(number):
    """Calculate the square of a number"""
    return number * number

def cube(number):
    """Calculate the cube of a number"""
    return number * number * number

def power(base, exponent):
    """Calculate base raised to exponent"""
    result = 1
    for i in range(exponent):
        result = result * base
    return result

# Use the functions
print("5 squared =", square(5))
print("3 cubed =", cube(3))
print("2 to the power of 8 =", power(2, 8))
\`\`\`

### Example 2: Text Processing Functions

\`\`\`python
def create_greeting(name, time_of_day):
    """Create a personalized greeting"""
    if time_of_day == "morning":
        greeting = "Good morning"
    elif time_of_day == "afternoon":
        greeting = "Good afternoon"
    else:
        greeting = "Good evening"
    
    return f"{greeting}, {name}! How are you today?"

def count_words(text):
    """Count words in a text"""
    words = text.split()
    return len(words)

# Use the functions
message = create_greeting("Alex", "morning")
print(message)

text = "Python is fun to learn"
print(f"'{text}' has {count_words(text)} words")
\`\`\`

### Example 3: Game Helper Functions

\`\`\`python
def calculate_score(points, multiplier):
    """Calculate final score with multiplier"""
    return points * multiplier

def check_level(score):
    """Determine player level based on score"""
    if score >= 1000:
        return "Master"
    elif score >= 500:
        return "Expert"
    elif score >= 200:
        return "Advanced"
    elif score >= 100:
        return "Intermediate"
    else:
        return "Beginner"

def display_stats(name, score, multiplier):
    """Display player statistics"""
    final_score = calculate_score(score, multiplier)
    level = check_level(final_score)
    
    print(f"=== {name}'s Stats ===")
    print(f"Base points: {score}")
    print(f"Multiplier: {multiplier}x")
    print(f"Final score: {final_score}")
    print(f"Level: {level}")

# Use the functions
display_stats("Player1", 150, 2)
\`\`\`

## Combining Functions

Functions can call other functions, building complex programs from simple pieces:

\`\`\`python
def get_area(length, width):
    """Calculate rectangle area"""
    return length * width

def get_perimeter(length, width):
    """Calculate rectangle perimeter"""
    return 2 * (length + width)

def describe_rectangle(length, width):
    """Describe a rectangle with all its properties"""
    area = get_area(length, width)
    perimeter = get_perimeter(length, width)
    
    print(f"Rectangle: {length} x {width}")
    print(f"Area: {area}")
    print(f"Perimeter: {perimeter}")
    
    if length == width:
        print("This is a square!")

describe_rectangle(5, 5)
describe_rectangle(4, 7)
\`\`\`

## Built-in Python Functions

Python comes with many useful built-in functions:

\`\`\`python
# len() - get length of strings, lists, etc.
name = "Python"
print(len(name))  # Output: 6

# max() and min() - find maximum/minimum
numbers = [5, 12, 3, 8, 15, 2]
print("Maximum:", max(numbers))  # Output: 15
print("Minimum:", min(numbers))  # Output: 2

# abs() - absolute value (distance from zero)
print(abs(-10))  # Output: 10
print(abs(10))   # Output: 10

# round() - round to nearest whole number
print(round(3.7))  # Output: 4
print(round(3.2))  # Output: 3

# str() - convert to string
age = 8
message = "I am " + str(age) + " years old"
print(message)
\`\`\`

## Function Best Practices

### 1. Descriptive Names

\`\`\`python
# Good names:
def calculate_total_price():
def check_user_age():
def get_student_grade():

# Bad names:
def calc():  # Too vague
def func1():  # Not descriptive
def x():      # Meaningless
\`\`\`

### 2. Single Responsibility

Each function should do ONE thing well:

\`\`\`python
# Good: One clear purpose
def calculate_area(length, width):
    return length * width

def display_area(area):
    print(f"The area is {area}")

# Less ideal: Does multiple things
def calculate_and_display_area(length, width):
    area = length * width
    print(f"The area is {area}")
\`\`\`

### 3. Use Return Values

When a function calculates something, return it:

\`\`\`python
# Good: Returns a value
def add(a, b):
    return a + b

result = add(5, 3)

# Less useful: Just prints
def add(a, b):
    print(a + b)
\`\`\`

## Example Code to Guide You

Here's some example code showing how to create and use functions:

\`\`\`python
# Example: A simple function that takes parameters
def say_hello(name):
    print("Hello,", name)
    print("Nice to meet you!")

# Using the function
say_hello("Alice")
say_hello("Bob")

# Example: A function that returns a value
def double(number):
    result = number * 2
    return result

# Using the return value
answer = double(5)
print("Double of 5 is", answer)

# Notice how:
# - def defines the function
# - Parameters go in parentheses
# - return sends a value back
# - You call functions by writing their name with ()
\`\`\`

**Now try your own version!** Create functions that do calculations or print messages.

## Try It Yourself

Create these functions to practice:

1. **Math Functions**
   - \`multiply(a, b)\` - multiplies two numbers
   - \`is_even(number)\` - returns True if number is even, False otherwise
   - \`square(number)\` - returns number squared

2. **Text Functions**
   - \`create_greeting(name)\` - returns a personalized greeting
   - \`repeat_text(text, times)\` - returns text repeated a certain number of times

3. **Game Functions**
   - \`calculate_bonus(base_score, level)\` - calculates score with level bonus
   - \`check_win(score, target)\` - returns True if score >= target

4. **Utility Functions**
   - \`get_max(a, b, c)\` - returns the largest of three numbers
   - \`format_currency(amount)\` - returns amount formatted as currency (e.g., "£10.50")

<!-- EXERCISE_START -->
{
  "instruction": "Create a function called 'greet' that takes a name as a parameter and prints a greeting. Then create a function called 'add' that takes two numbers and returns their sum. Call both functions to test them!",
  "codePattern": "def\\s+greet|def\\s+add",
  "expectedContains": null
}
<!-- EXERCISE_END -->

## Important Notes

- Use \`def\` keyword to define a function
- Function names should be clear and descriptive (use lowercase with underscores)
- Parameters go inside the parentheses: \`def function_name(param1, param2):\`
- Use \`return\` to send a value back from the function
- Call functions by writing their name with parentheses: \`function_name()\`
- Functions make code organized, reusable, and easier to understand
- Break big problems into smaller functions - it's like building with LEGO blocks!
- Practice creating functions for common tasks you do repeatedly`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'python',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 8,
      title: "Python Lesson 8: Graphics & Turtle",
      emoji: '🎨',
      content: `# Python Lesson 8: Graphics & Turtle 🎨

## Creating Art with Code!

Turtle graphics lets you create drawings and art using Python! You control a virtual "turtle" that moves around the screen, drawing lines as it goes. It's like having a robot artist that follows your commands!

**Why it's awesome:** You can create beautiful patterns, shapes, and even animations - all with code! This combines programming with creativity.

## Getting Started with Turtle

### Import and Create

First, import the turtle module and create your turtle:

\`\`\`python
import turtle

t = turtle.Turtle()
\`\`\`

**What happens:** You get a turtle (usually shown as a small arrow) that starts in the center of the screen, facing right.

## Basic Movement Commands

### Moving Forward and Backward

\`\`\`python
import turtle

t = turtle.Turtle()

t.forward(100)   # Move forward 100 pixels
t.backward(50)  # Move backward 50 pixels
\`\`\`

**Think of it like:** The turtle walks forward or backward, leaving a trail (line) behind it.

### Turning Left and Right

\`\`\`python
t.left(90)   # Turn left 90 degrees (quarter turn)
t.right(45)  # Turn right 45 degrees (eighth turn)
\`\`\`

**Understanding degrees:**
- 90° = quarter turn (right angle)
- 180° = half turn (turn around)
- 360° = full circle
- 45° = eighth turn

## Drawing Your First Shapes

### Drawing a Square

\`\`\`python
import turtle

t = turtle.Turtle()

for i in range(4):
    t.forward(100)
    t.left(90)
\`\`\`

**How it works:** Move forward, turn 90°, repeat 4 times = square!

### Drawing a Triangle

\`\`\`python
import turtle

t = turtle.Turtle()

for i in range(3):
    t.forward(100)
    t.left(120)  # 360 / 3 = 120 degrees
\`\`\`

### Drawing a Hexagon

\`\`\`python
import turtle

t = turtle.Turtle()

for i in range(6):
    t.forward(80)
    t.left(60)  # 360 / 6 = 60 degrees
\`\`\`

**Pattern:** For any shape, divide 360 by the number of sides to get the turn angle!

## Adding Color and Style

### Changing Colors

\`\`\`python
import turtle

t = turtle.Turtle()

t.color("red")
t.forward(100)

t.color("blue")
t.forward(100)

t.color("green")
t.forward(100)
\`\`\`

**Available colors:** "red", "blue", "green", "yellow", "purple", "orange", "pink", "black", "white", and many more!

### Changing Pen Size

\`\`\`python
t.pensize(1)   # Thin line
t.forward(50)

t.pensize(5)   # Thick line
t.forward(50)

t.pensize(10)  # Very thick line
t.forward(50)
\`\`\`

### Filling Shapes

\`\`\`python
import turtle

t = turtle.Turtle()

t.begin_fill()
t.color("red")

# Draw a filled square
for i in range(4):
    t.forward(100)
    t.left(90)

t.end_fill()
\`\`\`

## Advanced Drawing Techniques

### Drawing Circles

\`\`\`python
import turtle

t = turtle.Turtle()

t.circle(50)   # Circle with radius 50
t.circle(100)  # Larger circle with radius 100
\`\`\`

### Drawing Stars

\`\`\`python
import turtle

t = turtle.Turtle()
t.color("gold")

# 5-pointed star
for i in range(5):
    t.forward(100)
    t.right(144)  # 180 - (360/5) = 144 degrees
\`\`\`

### Creating Patterns

\`\`\`python
import turtle

t = turtle.Turtle()
t.speed(10)  # Faster drawing

# Spiral pattern
for i in range(50):
    t.forward(i * 2)
    t.left(90)
\`\`\`

## Creative Projects

### Project 1: Colorful Square Pattern

\`\`\`python
import turtle

t = turtle.Turtle()
t.speed(10)

colors = ["red", "blue", "green", "yellow", "purple"]

for i in range(20):
    t.color(colors[i % 5])  # Cycle through colors
    for j in range(4):
        t.forward(50 + i * 5)
        t.left(90)
    t.left(18)  # Turn slightly for spiral effect
\`\`\`

### Project 2: Flower Pattern

\`\`\`python
import turtle

t = turtle.Turtle()
t.speed(10)

# Draw petals
for i in range(8):
    t.color("pink")
    t.circle(30)
    t.left(45)

# Draw center
t.penup()
t.goto(0, -10)
t.pendown()
t.color("yellow")
t.begin_fill()
t.circle(10)
t.end_fill()
\`\`\`

### Project 3: House with Details

\`\`\`python
import turtle

t = turtle.Turtle()
t.speed(5)

# House base (square)
t.color("brown")
t.begin_fill()
for i in range(4):
    t.forward(100)
    t.left(90)
t.end_fill()

# Roof (triangle)
t.color("red")
t.begin_fill()
t.left(45)
t.forward(70)
t.right(90)
t.forward(70)
t.end_fill()

# Door
t.penup()
t.goto(40, -100)
t.pendown()
t.color("dark brown")
t.begin_fill()
for i in range(2):
    t.forward(20)
    t.left(90)
    t.forward(40)
    t.left(90)
t.end_fill()
\`\`\`

## Pen Control - Advanced Techniques

### Moving Without Drawing

\`\`\`python
t.penup()    # Lift pen - move without drawing
t.goto(0, 100)  # Move to position (0, 100)
t.pendown()  # Put pen down - start drawing again
t.forward(50)
\`\`\`

### Setting Position Directly

\`\`\`python
t.penup()
t.goto(-50, 50)  # Move to x=-50, y=50
t.pendown()
t.circle(25)
\`\`\`

## Example Code to Guide You

Here's some example code showing how to use turtle graphics:

\`\`\`python
import turtle

# Create a turtle
t = turtle.Turtle()

# Example: Drawing a simple shape
t.color("blue")
for i in range(4):
    t.forward(50)
    t.left(90)

# Example: Drawing multiple shapes
t.penup()
t.goto(100, 0)
t.pendown()
t.color("red")
t.circle(30)

# Notice how:
# - import turtle is needed first
# - t = turtle.Turtle() creates your turtle
# - forward() moves forward, left() turns
# - color() changes the pen color
# - penup()/pendown() control drawing
# - goto() moves to a specific position
\`\`\`

**Now try your own version!** Use turtle to draw shapes and patterns.

## Try It Yourself

Create these drawings:

1. **Geometric Art**
   - Draw a pattern of nested squares (square inside square)
   - Create a colorful polygon pattern
   - Make a spiral that changes color

2. **Nature Drawings**
   - Draw a flower with petals
   - Create a tree (trunk + branches)
   - Make a sun with rays

3. **Creative Patterns**
   - Design your own repeating pattern
   - Create a mandala-like circular pattern
   - Draw a rainbow using arcs

4. **Combined Shapes**
   - Draw a house with windows and door
   - Create a car (rectangles and circles)
   - Make a robot face

<!-- EXERCISE_START -->
{
  "instruction": "Use turtle graphics to draw a square. Then draw a triangle next to it. Use different colors for each shape! Remember to import turtle first.",
  "codePattern": "import\\s+turtle|turtle\\.Turtle|forward|left|right",
  "expectedContains": null
}
<!-- EXERCISE_END -->

## Important Notes

- Always start with \`import turtle\`
- Create a turtle: \`t = turtle.Turtle()\`
- \`forward(distance)\` - move forward
- \`backward(distance)\` - move backward
- \`left(degrees)\` - turn left
- \`right(degrees)\` - turn right
- \`circle(radius)\` - draw a circle
- \`color("colorname")\` - change color
- \`pensize(number)\` - change line thickness
- \`penup()\` / \`pendown()\` - lift/lower pen
- Use loops to create repeating patterns
- Combine shapes to create complex drawings
- Experiment and have fun - that's the best way to learn!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'python',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 9,
      title: "Python Lesson 9: Projects",
      emoji: '🎯',
      content: `# Python Lesson 9: Projects 🎯

## Putting It All Together!

Congratulations! You've learned the fundamentals of Python. Now it's time to combine everything you know to build **real, working programs**! Projects are where programming gets exciting - you create something that actually does something useful or fun.

**Why projects matter:** Building projects teaches you to solve problems, think logically, and see how all the pieces fit together. Plus, it's incredibly satisfying to create something that works!

## Project Planning Tips

Before coding, think about:
1. **What should it do?** (The goal)
2. **What information do I need?** (Inputs)
3. **What should it show?** (Outputs)
4. **What steps are needed?** (The plan)

## Project 1: Interactive Number Guessing Game

A complete game with hints, score tracking, and multiple rounds!

\`\`\`python
import random

def play_guessing_game():
    secret = random.randint(1, 100)
    guesses = 0
    max_guesses = 7
    
    print("=== Number Guessing Game ===")
    print("I'm thinking of a number between 1 and 100!")
    print(f"You have {max_guesses} guesses. Good luck!")
    print()
    
    while guesses < max_guesses:
        guess = int(input(f"Guess #{guesses + 1}: "))
        guesses = guesses + 1
        
        if guess == secret:
            print(f"🎉 Congratulations! You got it in {guesses} guesses!")
            return True
        elif guess < secret:
            difference = secret - guess
            if difference <= 5:
                print("Close! A bit higher...")
            else:
                print("Too low! Try a higher number.")
        else:
            difference = guess - secret
            if difference <= 5:
                print("Close! A bit lower...")
            else:
                print("Too high! Try a lower number.")
    
    print(f"Game over! The number was {secret}")
    return False

# Play the game
play_guessing_game()
\`\`\`

**Features:** Random numbers, hints, guess limits, and clear feedback!

## Project 2: Advanced Calculator with History

A calculator that remembers your calculations:

\`\`\`python
history = []

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "Error: Can't divide by zero!"
    return a / b

def show_history():
    if len(history) == 0:
        print("No calculations yet!")
    else:
        print("\\n=== Calculation History ===")
        for calc in history:
            print(calc)

print("=== Advanced Calculator ===")
print("Operations: +, -, *, /")
print("Type 'history' to see past calculations")
print("Type 'quit' to exit")
print()

while True:
    operation = input("Operation (+, -, *, /, history, quit): ")
    
    if operation == "quit":
        print("Thanks for using the calculator!")
        break
    elif operation == "history":
        show_history()
        continue
    
    if operation in ["+", "-", "*", "/"]:
        num1 = float(input("First number: "))
        num2 = float(input("Second number: "))
        
        if operation == "+":
            result = add(num1, num2)
        elif operation == "-":
            result = subtract(num1, num2)
        elif operation == "*":
            result = multiply(num1, num2)
        else:
            result = divide(num1, num2)
        
        calc_string = f"{num1} {operation} {num2} = {result}"
        history.append(calc_string)
        print("Result:", result)
        print()
    else:
        print("Invalid operation!")
\`\`\`

## Project 3: Interactive Quiz System

A quiz that tracks scores and provides feedback:

\`\`\`python
def run_quiz():
    questions = [
        {
            "question": "What is 15 + 27?",
            "answer": "42",
            "points": 10
        },
        {
            "question": "What is the capital of England?",
            "answer": "london",
            "points": 15
        },
        {
            "question": "How many sides does a triangle have?",
            "answer": "3",
            "points": 5
        },
        {
            "question": "What is 8 × 7?",
            "answer": "56",
            "points": 10
        }
    ]
    
    score = 0
    total_points = sum(q["points"] for q in questions)
    
    print("=== Python Knowledge Quiz ===")
    print(f"Answer {len(questions)} questions. Good luck!\\n")
    
    for i, q in enumerate(questions, 1):
        print(f"Question {i} (worth {q['points']} points):")
        answer = input(f"{q['question']} ")
        
        if answer.lower().strip() == q["answer"].lower():
            print("✅ Correct!")
            score = score + q["points"]
        else:
            print(f"❌ Wrong! The answer is {q['answer']}")
        print()
    
    percentage = (score / total_points) * 100
    
    print("=== Quiz Results ===")
    print(f"Your score: {score} out of {total_points} points")
    print(f"Percentage: {percentage:.1f}%")
    
    if percentage >= 90:
        print("🏆 Outstanding! You're a Python master!")
    elif percentage >= 70:
        print("⭐ Great job! You know your stuff!")
    elif percentage >= 50:
        print("👍 Good effort! Keep practicing!")
    else:
        print("💪 Keep learning! You'll get better!")

run_quiz()
\`\`\`

## Project 4: Creative Turtle Art Generator

Create beautiful patterns with code:

\`\`\`python
import turtle
import random

def draw_colorful_spiral():
    t = turtle.Turtle()
    t.speed(10)
    
    colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink"]
    
    for i in range(100):
        t.color(colors[i % len(colors)])
        t.forward(i * 2)
        t.left(91)  # Slightly more than 90 creates a spiral

def draw_flower():
    t = turtle.Turtle()
    t.speed(8)
    
    # Draw petals
    for i in range(12):
        t.color("pink")
        t.begin_fill()
        t.circle(40)
        t.end_fill()
        t.left(30)
    
    # Draw center
    t.penup()
    t.goto(0, -15)
    t.pendown()
    t.color("yellow")
    t.begin_fill()
    t.circle(15)
    t.end_fill()

def draw_geometric_pattern():
    t = turtle.Turtle()
    t.speed(10)
    
    colors = ["red", "blue", "green", "yellow"]
    
    for i in range(20):
        t.color(colors[i % 4])
        size = 20 + (i * 5)
        
        for j in range(4):
            t.forward(size)
            t.left(90)
        
        t.left(18)

# Choose which pattern to draw
print("Choose a pattern:")
print("1. Colorful Spiral")
print("2. Flower")
print("3. Geometric Pattern")

choice = input("Enter 1, 2, or 3: ")

if choice == "1":
    draw_colorful_spiral()
elif choice == "2":
    draw_flower()
elif choice == "3":
    draw_geometric_pattern()

turtle.done()
\`\`\`

## Project 5: Personal Information Manager

A program that stores and displays information:

\`\`\`python
def create_profile():
    print("=== Create Your Profile ===")
    
    name = input("Full name: ")
    age = int(input("Age: "))
    favorite_color = input("Favorite color: ")
    favorite_subject = input("Favorite subject: ")
    hobby = input("Hobby: ")
    
    profile = {
        "name": name,
        "age": age,
        "favorite_color": favorite_color,
        "favorite_subject": favorite_subject,
        "hobby": hobby
    }
    
    return profile

def display_profile(profile):
    print("\\n=== Your Profile ===")
    print(f"Name: {profile['name']}")
    print(f"Age: {profile['age']}")
    print(f"Favorite Color: {profile['favorite_color']}")
    print(f"Favorite Subject: {profile['favorite_subject']}")
    print(f"Hobby: {profile['hobby']}")
    
    # Calculate some fun facts
    years_until_teen = 13 - profile['age']
    if years_until_teen > 0:
        print(f"\\nFun fact: You'll be a teenager in {years_until_teen} years!")
    elif years_until_teen == 0:
        print("\\nFun fact: You're a teenager now!")
    else:
        print("\\nFun fact: You're already a teenager!")

# Create and display profile
my_profile = create_profile()
display_profile(my_profile)
\`\`\`

## Challenge Projects

### Challenge 1: Rock, Paper, Scissors Game

\`\`\`python
import random

def play_rps():
    choices = ["rock", "paper", "scissors"]
    player_score = 0
    computer_score = 0
    
    print("=== Rock, Paper, Scissors ===")
    print("First to 3 wins!")
    print()
    
    while player_score < 3 and computer_score < 3:
        player = input("Choose: rock, paper, or scissors: ").lower()
        computer = random.choice(choices)
        
        print(f"Computer chose: {computer}")
        
        if player == computer:
            print("Tie!")
        elif (player == "rock" and computer == "scissors") or \\
             (player == "paper" and computer == "rock") or \\
             (player == "scissors" and computer == "paper"):
            print("You win this round!")
            player_score = player_score + 1
        else:
            print("Computer wins this round!")
            computer_score = computer_score + 1
        
        print(f"Score - You: {player_score}, Computer: {computer_score}\\n")
    
    if player_score == 3:
        print("🎉 You won the game!")
    else:
        print("💻 Computer won the game!")

play_rps()
\`\`\`

### Challenge 2: Math Practice Program

\`\`\`python
import random

def math_practice():
    correct = 0
    total = 5
    
    print("=== Math Practice ===")
    print("Answer 5 math problems. Let's go!\\n")
    
    for i in range(total):
        num1 = random.randint(1, 20)
        num2 = random.randint(1, 20)
        operation = random.choice(["+", "-", "*"])
        
        if operation == "+":
            answer = num1 + num2
            symbol = "+"
        elif operation == "-":
            answer = num1 - num2
            symbol = "-"
        else:
            answer = num1 * num2
            symbol = "×"
        
        user_answer = int(input(f"Question {i+1}: {num1} {symbol} {num2} = "))
        
        if user_answer == answer:
            print("✅ Correct!")
            correct = correct + 1
        else:
            print(f"❌ Wrong! The answer is {answer}")
        print()
    
    percentage = (correct / total) * 100
    print(f"Results: {correct} out of {total} correct ({percentage}%)")
    
    if percentage == 100:
        print("🏆 Perfect score! Amazing!")
    elif percentage >= 80:
        print("⭐ Great job!")
    else:
        print("💪 Keep practicing!")

math_practice()
\`\`\`

## Project Development Workflow

1. **Plan**: Write down what you want to build
2. **Start Simple**: Get a basic version working first
3. **Test**: Run it and see what happens
4. **Fix**: Correct any errors
5. **Enhance**: Add more features
6. **Refine**: Make it better and more user-friendly

## Try It Yourself

Build your own projects! Here are ideas:

1. **Personal Projects**
   - Daily journal program
   - Habit tracker
   - Personal calculator for your needs

2. **Game Projects**
   - Number guessing game with difficulty levels
   - Word scramble game
   - Simple adventure text game

3. **Utility Projects**
   - Unit converter (meters to feet, etc.)
   - Tip calculator
   - Study timer with breaks

4. **Art Projects**
   - Draw your name with turtle
   - Create a pattern generator
   - Make animated drawings

## Example Code to Guide You

Here's some example code showing how to combine different concepts:

\`\`\`python
# Example: Combining variables, input, if statements, and loops
# Note: In this simulator, we'll use direct values instead of input()

user_name = "Alex"  # This simulates: input("What's your name? ")
user_age = 9       # This simulates: int(input("How old are you? "))

# Using if statements
if user_age < 10:
    message = "You're a young coder!"
elif user_age < 15:
    message = "You're a growing programmer!"
else:
    message = "You're an experienced learner!"

# Using a loop to repeat
print("Hello,", user_name)
for i in range(3):
    print(message)

# Notice how:
# - We combine variables, conditions, and loops
# - Each part does something different
# - Together they create a complete program
\`\`\`

**Now try your own version!** Combine what you've learned to build something creative!

<!-- EXERCISE_START -->
{
  "instruction": "Create a simple project that combines what you've learned! Build a program that asks for the user's name and age, then uses if statements to give personalized advice based on their age, and uses a loop to print a fun message multiple times. Be creative!",
  "codePattern": "input|if|for|while",
  "expectedContains": null
}
<!-- EXERCISE_END -->

## Important Notes

- Projects combine all concepts: variables, input, decisions, loops, and functions
- Start simple, then add features gradually
- Test your code frequently as you build
- Don't be afraid to experiment and try new things
- When stuck, break the problem into smaller pieces
- Read error messages carefully - they tell you what's wrong
- Most importantly: **Have fun and be creative!**`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'python',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 11,
      title: "Fusion 360 Step 1: User Interface",
      emoji: '🖥️',
      content: `# Fusion 360 Step 1: User Interface

## Learn Autodesk Fusion - User Interface (2025/2026)

**Topic**: Introduction to the canvas, toolbar, data panel, and navigation.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=zxfOqjqIZfc&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=1&pp=iAQB)

This lesson introduces you to the Fusion 360 interface and navigation.



## The Canvas

The Canvas is the main central area where your model is displayed and where you will do most of your work. You can right-click in this space to access a menu of frequently used tools or context-sensitive functions.



## The View Cube

Located within the canvas area, the View Cube allows you to rotate your model to view it from different angles. Clicking the "home" icon on the cube returns the model to the standard view. Right-clicking the cube offers additional options like changing perspective.



<!-- QUESTION_START -->
What is the main purpose of the View Cube in Fusion 360?
<!-- OPTIONS -->
To save your designs|To rotate your model and view it from different angles|To access file operations|To organize your projects
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The View Cube is located within the canvas area and allows you to rotate your model to view it from different angles. Clicking the "home" icon returns the model to the standard view.
<!-- QUESTION_END -->



## The Data Panel

Accessed via a button in the top left, the Data Panel is used to organize files and create new projects. Since Fusion is cloud-based, all files saved here are stored in the cloud. It includes refresh and search functions.



<!-- QUESTION_START -->
Where are files stored when you save them in Fusion 360's Data Panel?
<!-- OPTIONS -->
On your local computer only|In the cloud|On an external hard drive|In a separate application
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Since Fusion 360 is cloud-based, all files saved in the Data Panel are stored in the cloud, allowing you to access your designs from anywhere.
<!-- QUESTION_END -->



## The Application Bar

The Application Bar is the top bar that contains standard file operations like save, export, undo, and redo. It functions similarly to a web browser, allowing you to open multiple designs in different tabs. On the far right, you can access your Autodesk profile to change preferences or sign out.



<!-- QUESTION_START -->
What can you do with the Application Bar in Fusion 360?
<!-- OPTIONS -->
Only view your model|Save, export, undo, and redo operations|Only create new projects|Only access the toolbar
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Application Bar contains standard file operations like save, export, undo, and redo. It functions similarly to a web browser, allowing you to open multiple designs in different tabs.
<!-- QUESTION_END -->



## The Toolbar

The Toolbar is the primary location for accessing tools. It features various tabs for different workflows, such as Solid modeling, Surface modeling, Mesh, Sheet Metal, and Utilities. The toolbar is dynamic; for example, entering "sketch mode" will display additional, relevant options.



<!-- QUESTION_START -->
What happens to the Toolbar when you enter sketch mode in Fusion 360?
<!-- OPTIONS -->
It disappears|It displays additional, relevant options|It becomes locked|It changes color
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The toolbar is dynamic and context-sensitive. When you enter sketch mode, it will display additional, relevant options for sketching.
<!-- QUESTION_END -->



## The Navigation Bar

Located below the canvas, the Navigation Bar provides options for viewing the model (like panning or zooming). While useful for trackpad users, mouse users often prefer using the scroll wheel for these actions. The right side of this bar contains display settings to change visual styles.



<!-- QUESTION_START -->
Where is the Navigation Bar located in Fusion 360?
<!-- OPTIONS -->
At the top of the screen|Below the canvas|On the left side|On the right side
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Navigation Bar is located below the canvas and provides options for viewing the model, such as panning or zooming.
<!-- QUESTION_END -->



## The Browser

Found on the left side of the screen, the Browser displays the hierarchy of your assembly, including all components, bodies, and sketches. You can toggle the visibility of any item here by clicking the "eye" icon.



<!-- QUESTION_START -->
How can you toggle the visibility of items in the Browser?
<!-- OPTIONS -->
By double-clicking them|By clicking the "eye" icon|By right-clicking them|By dragging them
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Browser displays the hierarchy of your assembly. You can toggle the visibility of any item by clicking the "eye" icon next to it.
<!-- QUESTION_END -->



## The Timeline

Located at the bottom, the Timeline tracks the history of your design. You can play back the creation process or step backward and forward to modify specific elements or features created earlier in the workflow.



<!-- QUESTION_START -->
What does the Timeline in Fusion 360 allow you to do?
<!-- OPTIONS -->
Only view your current design|Track the history of your design and modify previous features|Only save your work|Only export your files
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Timeline tracks the history of your design. You can play back the creation process or step backward and forward to modify specific elements or features created earlier in the workflow.
<!-- QUESTION_END -->



## What is Fusion 360?

Fusion 360 is a cloud-based 3D CAD (Computer-Aided Design), CAM (Computer-Aided Manufacturing), and CAE (Computer-Aided Engineering) software platform. It's used to design, test, and manufacture products.



## Key Features

- **3D Modeling**: Create complex 3D models and assemblies

- **Cloud-Based**: Access your designs from anywhere

- **Collaboration**: Share and collaborate with team members

- **Simulation**: Test your designs before manufacturing

- **Manufacturing**: Generate toolpaths for CNC machines and 3D printers



## Workspaces

Fusion 360 has different workspaces for different tasks:

- **Design**: Create 3D models

- **Render**: Create photorealistic images

- **Animation**: Create animations of your designs

- **Simulation**: Test structural and thermal properties

- **Manufacture**: Create toolpaths for manufacturing



## Basic Navigation

- **Orbit**: Middle mouse button (or Shift + Right-click)

- **Pan**: Shift + Middle mouse button (or Middle mouse button)

- **Zoom**: Scroll wheel (or Ctrl + Right-click and drag)

- **Fit**: Press 'F' to fit all objects in view



## Creating Your First Project

1. Click "New Project" in the Data Panel

2. Name your project

3. Start creating your first design!



## Important Notes

- Fusion 360 is free for students and hobbyists

- Your designs are saved to the cloud automatically

- You can work offline, but need internet to sync

- The interface adapts to your current task`,
      quizId: quizId++,
      assessmentType: 'history-game',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 12,
      title: "Fusion 360 Step 1: Sketching",
      emoji: '✏️',
      content: `# Fusion 360 Step 1: Sketching

## Learn Autodesk Fusion in 10 Easy Steps - Step 1 (2025/2026)

**Topic**: Creating a simple smartphone model using 2D sketches, extrusion, and fillets.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=YVSURhX8Qu0&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=2&pp=iAQB)

This tutorial guides beginners through creating a simple smartphone model using 2D sketches, extrusion, and fillets.



## Initial Setup

Before starting, restore default settings via the user profile icon (top right) > Preferences > Restore Defaults. The unit of measurement is set to millimeters using the Document Settings in the browser.



<!-- QUESTION_START -->
How do you restore default settings in Fusion 360?
<!-- OPTIONS -->
Through the Data Panel|Through the user profile icon (top right) > Preferences > Restore Defaults|Through the Timeline|Through the Browser
<!-- CORRECT -->
1
<!-- EXPLANATION -->
You restore default settings via the user profile icon in the top right, then go to Preferences > Restore Defaults.
<!-- QUESTION_END -->



## Saving and Project Management

Fusion is cloud-based. You start by opening the Data Panel, creating a new project named "smartphone," and entering that folder.



### Components

A new component named "smartphone" is created to contain the design. Components help organize your work and keep related parts together.



### Saving

The file is explicitly saved as "smartphone" to ensure progress is stored in the cloud.



<!-- QUESTION_START -->
Where are Fusion 360 files stored?
<!-- OPTIONS -->
Only on your local computer|In the cloud|On an external drive|In a separate folder on your desktop
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Fusion 360 is cloud-based, so all files are stored in the cloud, allowing you to access your designs from anywhere.
<!-- QUESTION_END -->



## Creating the Base Shape (Sketching)

A sketch is created on the XY plane (blue plane). A Center Rectangle is used, starting from the origin to constrain the model. Dimensions are typed in directly: 145 mm length and 70 mm width (using the Tab key to switch between dimensions).



<!-- QUESTION_START -->
What tool is used to create the base rectangle for the smartphone?
<!-- OPTIONS -->
2-Point Rectangle|Center Rectangle|3-Point Rectangle|Line Tool
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A Center Rectangle is used, starting from the origin to constrain the model. This helps keep the design centered and properly positioned.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
How do you switch between dimension fields when entering values?
<!-- OPTIONS -->
Click with the mouse|Use the Tab key|Use the Enter key|Use the Space key
<!-- CORRECT -->
1
<!-- EXPLANATION -->
You use the Tab key to switch between dimension fields when entering values directly.
<!-- QUESTION_END -->



## 3D Extrusion

The Extrude tool turns the 2D rectangle into a 3D body. A thickness of 7 mm is applied. This action creates "Body 1" in the browser and hides the original sketch. The timeline at the bottom records this history.



<!-- QUESTION_START -->
What happens to the original sketch when you extrude it?
<!-- OPTIONS -->
It is deleted|It is hidden|It remains visible|It is moved to a different location
<!-- CORRECT -->
1
<!-- EXPLANATION -->
When you extrude a sketch, the original sketch is hidden. The timeline records this action, and "Body 1" is created in the browser.
<!-- QUESTION_END -->



## Adding Fillets (Rounding Edges)

The Fillet tool creates curved edges. All side edges of the smartphone body are selected. A radius of 2 mm is applied to round off the phone's corners.



<!-- QUESTION_START -->
What radius is used for the fillets on the smartphone edges?
<!-- OPTIONS -->
1 mm|2 mm|3 mm|5 mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A radius of 2 mm is applied to round off the phone's corners, creating smooth, curved edges.
<!-- QUESTION_END -->



## Creating the Camera Bump

A new sketch is added to the back face of the phone body. A Center Diameter Circle of 10 mm is drawn. Sketch Dimensions are used to position the circle 10 mm from the top edge and 10 mm from the side edge. The circle is extruded outwards by 2 mm to create the bump.



<!-- QUESTION_START -->
How far from the edges is the camera circle positioned?
<!-- OPTIONS -->
5 mm|10 mm|15 mm|20 mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The camera circle is positioned 10 mm from the top edge and 10 mm from the side edge using Sketch Dimensions.
<!-- QUESTION_END -->



## Creating Patterns

Instead of drawing multiple cameras manually, the Rectangular Pattern tool is used. The Object Type is changed to "Features" to select just the camera bump extrusion. The X-axis (red) is selected for direction. A spacing of 25 mm creates a row of three camera bumps.



<!-- QUESTION_START -->
What tool is used to create multiple camera bumps instead of drawing them manually?
<!-- OPTIONS -->
Circular Pattern|Rectangular Pattern|Mirror Tool|Copy Tool
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Rectangular Pattern tool is used to create multiple camera bumps efficiently. The Object Type is changed to "Features" to select just the camera bump extrusion.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What spacing is used between the camera bumps in the pattern?
<!-- OPTIONS -->
20 mm|25 mm|30 mm|35 mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A spacing of 25 mm creates a row of three camera bumps using the Rectangular Pattern tool.
<!-- QUESTION_END -->



## Finishing Touches

Small fillets of 0.3 mm are applied to the edges of the camera bumps to smooth them out. The design is saved to complete the tutorial.



<!-- QUESTION_START -->
What size fillets are applied to the camera bump edges?
<!-- OPTIONS -->
0.1 mm|0.3 mm|0.5 mm|1 mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Small fillets of 0.3 mm are applied to the edges of the camera bumps to smooth them out as a finishing touch.
<!-- QUESTION_END -->



## Key Concepts Learned

- **Sketching**: Creating 2D shapes on planes
- **Extrusion**: Turning 2D sketches into 3D bodies
- **Fillets**: Rounding edges for a smoother appearance
- **Patterns**: Creating multiple copies of features efficiently
- **Dimensions**: Precise measurements for accurate modeling

## Important Notes

- Always save your work regularly
- Use the Tab key to switch between dimension fields
- The Timeline records all your design history
- Patterns save time compared to manual copying
- Small fillets add professional finishing touches`,
      quizId: quizId++,
      assessmentType: 'history-game',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 13,
      title: "Fusion 360 Step 2: Coat Hanger (Sweeps)",
      emoji: '👔',
      content: `# Fusion 360 Step 2: Coat Hanger (Sweeps)

## Learn Autodesk Fusion in 10 Easy Steps - Step 2 (2025/2026)

**Topic**: Creating a coat hanger using sketching, curves, construction lines, and sweeping.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=YVSURhX8Qu0&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=2&pp=iAQB)

This tutorial guides you through creating a coat hanger using the Sweep tool, which extrudes a profile along a path.



## Project Setup and Saving

The video starts by saving the new file. A new project folder named "coat hanger" is created via the drop-down menu, or by selecting "New Project" in the Data Panel. A new component named "coat hanger" is also created to contain the design.



<!-- QUESTION_START -->
How do you create a new project in Fusion 360?
<!-- OPTIONS -->
Through the Timeline|Through the Data Panel by selecting "New Project"|Through the Browser|Through the Toolbar
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A new project folder can be created via the drop-down menu in the Data Panel, or by selecting "New Project" in the Data Panel. This helps organize your designs.
<!-- QUESTION_END -->



## Sketching the Path

A new sketch is started on the ZX plane. The Line Tool is used to draw the profile of the coat hanger.



### Creating the Path Lines

- A vertical line is drawn up from the center point, constrained to 90 degrees, and set to 60 mm in length. The line turns black, indicating it is fully defined/constrained.

- A horizontal line is drawn at a right angle, 50 mm long.

- A vertical line is drawn downwards, 140 mm long.

- Another horizontal line is drawn outwards, 50 mm long.

- A final vertical line is drawn upwards, 20 mm long.



<!-- QUESTION_START -->
What does it mean when a line turns black in a Fusion 360 sketch?
<!-- OPTIONS -->
The line is selected|The line is fully defined/constrained|The line is locked|The line is hidden
<!-- CORRECT -->
1
<!-- EXPLANATION -->
When a line turns black in Fusion 360, it means the line is fully defined/constrained. This indicates that all dimensions and constraints have been applied, and the line cannot move.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is the length of the first vertical line in the coat hanger path?
<!-- OPTIONS -->
50 mm|60 mm|140 mm|20 mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The first vertical line is drawn up from the center point and set to 60 mm in length. This forms the top part of the coat hanger.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is the length of the longest vertical line in the coat hanger path?
<!-- OPTIONS -->
60 mm|50 mm|140 mm|20 mm
<!-- CORRECT -->
2
<!-- EXPLANATION -->
The longest vertical line in the path is 140 mm long, drawn downwards to form the main body of the coat hanger.
<!-- QUESTION_END -->



## Sketch Fillets

The Sketch Fillet tool is used to round the sharp corners of the path. A 10 mm radius is applied to each corner. The presenter notes that while modeling fillets are generally preferred, sketch fillets are used here for the path.



<!-- QUESTION_START -->
What radius is used for the sketch fillets on the coat hanger path?
<!-- OPTIONS -->
5 mm|10 mm|15 mm|20 mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A 10 mm radius is applied to each corner using the Sketch Fillet tool. This rounds the sharp corners of the path to create smoother transitions.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Why are sketch fillets used instead of modeling fillets for the path?
<!-- OPTIONS -->
Sketch fillets are faster|Sketch fillets are used here for the path, though modeling fillets are generally preferred|Sketch fillets are more accurate|Sketch fillets are required
<!-- CORRECT -->
1
<!-- EXPLANATION -->
While modeling fillets are generally preferred, sketch fillets are used here for the path. This is a design choice for this particular tutorial.
<!-- QUESTION_END -->



## Sketching the Profile

A second sketch is created, this time on the XY plane. A Center Rectangle is drawn starting from the center point. The dimensions are set to 60 mm width and 5 mm height (using Tab to switch between fields).



The sketches are renamed in the browser for clarity: "Path" for the first sketch and "Profile" for the second.



<!-- QUESTION_START -->
What plane is used for the profile sketch?
<!-- OPTIONS -->
ZX plane|XY plane|YZ plane|Any plane
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The profile sketch is created on the XY plane, while the path sketch was created on the ZX plane. This allows the profile to be swept along the path.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What tool is used to create the profile rectangle?
<!-- OPTIONS -->
2-Point Rectangle|Center Rectangle|3-Point Rectangle|Line Tool
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A Center Rectangle is drawn starting from the center point. This ensures the profile is centered and properly positioned for the sweep operation.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What are the dimensions of the profile rectangle?
<!-- OPTIONS -->
50 mm width and 5 mm height|60 mm width and 5 mm height|60 mm width and 10 mm height|50 mm width and 10 mm height
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The profile rectangle dimensions are set to 60 mm width and 5 mm height. The Tab key is used to switch between dimension fields when entering values.
<!-- QUESTION_END -->



## Sweeping the Profile

The Sweep tool is selected from the Create menu. The rectangle (Profile sketch) is selected as the profile, and the line drawing (Path sketch) is selected as the path. This action extrudes the rectangle shape along the line path to create the 3D hanger shape.



<!-- QUESTION_START -->
What tool is used to create the 3D coat hanger shape?
<!-- OPTIONS -->
Extrude|Revolve|Sweep|Loft
<!-- CORRECT -->
2
<!-- EXPLANATION -->
The Sweep tool is used to extrude the rectangle profile along the line path, creating the 3D coat hanger shape. This is the key operation that turns the 2D sketches into a 3D object.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is selected first when using the Sweep tool?
<!-- OPTIONS -->
The path|The profile|Either one|The plane
<!-- CORRECT -->
1
<!-- EXPLANATION -->
When using the Sweep tool, the profile (the rectangle) is selected first, then the path (the line drawing) is selected. This tells Fusion 360 to move the profile along the path.
<!-- QUESTION_END -->



## Finishing Touches

The resulting body is renamed to "hanger" in the browser. Fillets of 0.5 mm are added to the end faces of the hanger to round off the sharp edges. The project is saved to complete the tutorial.



<!-- QUESTION_START -->
What size fillets are added to the end faces of the hanger?
<!-- OPTIONS -->
0.3 mm|0.5 mm|1 mm|2 mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Fillets of 0.5 mm are added to the end faces of the hanger to round off the sharp edges, giving it a more finished appearance.
<!-- QUESTION_END -->



## Key Concepts Learned

- **Sketching on Different Planes**: Creating sketches on ZX and XY planes for different purposes
- **Line Tool**: Drawing connected lines to create a path
- **Constraints**: Fully constraining sketches so lines turn black
- **Sketch Fillets**: Rounding corners in 2D sketches
- **Center Rectangle**: Creating centered profiles for sweeping
- **Sweep Tool**: Extruding a profile along a path to create 3D shapes
- **Modeling Fillets**: Adding finishing touches to 3D bodies
- **Naming Sketches**: Organizing your work by renaming sketches in the browser



## Important Notes

- Always save your work regularly
- Use the Tab key to switch between dimension fields
- Fully constrain your sketches (lines should turn black)
- Rename sketches and bodies for better organization
- Sketch fillets can be used, but modeling fillets are generally preferred
- The Sweep tool requires both a profile and a path`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 14,
      title: "Fusion 360 Step 3: Greek Vase (Revolve & Splines)",
      emoji: '🏺',
      content: `# Fusion 360 Step 3: Greek Vase (Revolve & Splines)

## Learn Autodesk Fusion in 10 Easy Steps - Step 3 (2025/2026)

**Topic**: Creating a 3D model of a Greek vase using reference images, splines, and the revolve tool.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=RN41OedpMJ4&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=4&pp=iAQB)

This tutorial guides you through creating a Greek vase using reference images, splines for smooth curves, and the Revolve tool to create the 3D shape.



## Setup and Saving

The project is saved as "Greek vase" and a new component with the same name is created to house the design.



<!-- QUESTION_START -->
What is the project name for this tutorial?
<!-- OPTIONS -->
Vase|Greek vase|Ancient vase|Ceramic vase
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The project is saved as "Greek vase" and a new component with the same name is created to house the design. This helps organize your work.
<!-- QUESTION_END -->



## Inserting and Calibrating a Canvas

An image of a Greek vase is inserted from the computer onto the ZX plane. This reference image helps guide the modeling process.



### Calibration

To ensure the model is the correct size, the canvas is calibrated. By right-clicking the canvas in the browser and selecting "Calibrate," two points (top and bottom of the vase) are clicked, and the distance is set to 300 mm.



### Positioning

The canvas is edited to align the center of the vase image with the vertical axis. This ensures the model will be centered correctly when revolved.



<!-- QUESTION_START -->
What plane is the canvas image inserted onto?
<!-- OPTIONS -->
XY plane|ZX plane|YZ plane|Any plane
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The image of the Greek vase is inserted onto the ZX plane. This plane is used because the vase profile will be revolved around a vertical axis.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
How do you calibrate a canvas in Fusion 360?
<!-- OPTIONS -->
Through the Toolbar|By right-clicking the canvas in the browser and selecting "Calibrate"|Through the Timeline|Through the Data Panel
<!-- CORRECT -->
1
<!-- EXPLANATION -->
To calibrate a canvas, you right-click the canvas in the browser and select "Calibrate." Then you click two points (top and bottom of the vase) and set the distance.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What distance is set when calibrating the vase canvas?
<!-- OPTIONS -->
200 mm|250 mm|300 mm|350 mm
<!-- CORRECT -->
2
<!-- EXPLANATION -->
When calibrating the canvas, the distance between the top and bottom of the vase is set to 300 mm. This ensures the model will be the correct size.
<!-- QUESTION_END -->



## Sketching the Profile

A new sketch is started on the same plane as the canvas. The profile of the vase is traced using different tools.



### Line Tool

Used for the straight sections at the base and top of the vase. These straight lines help create the flat surfaces.



### Fit Point Spline

Used to trace the curved outer edge of the vase. This tool creates smooth curves using control points, which can be adjusted with "handles" to match the reference image closely. Splines are perfect for creating organic, flowing curves.



<!-- QUESTION_START -->
What tool is used to trace the curved outer edge of the vase?
<!-- OPTIONS -->
Line Tool|Arc Tool|Fit Point Spline|Circle Tool
<!-- CORRECT -->
2
<!-- EXPLANATION -->
The Fit Point Spline tool is used to trace the curved outer edge of the vase. This tool creates smooth curves using control points that can be adjusted with "handles" to match the reference image.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What are the control points on a spline called?
<!-- OPTIONS -->
Nodes|Handles|Points|Vertices
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The control points on a spline can be adjusted with "handles" to match the reference image closely. These handles allow you to fine-tune the curve shape.
<!-- QUESTION_END -->



### Closing the Sketch

Straight lines are drawn up the center axis (300 mm) and across the top and bottom to connect the profile. The shape turns blue, indicating it is a closed profile. A closed profile is required for the Revolve tool to work.



<!-- QUESTION_START -->
What does it mean when a sketch shape turns blue?
<!-- OPTIONS -->
The shape is selected|The shape is a closed profile|The shape is locked|The shape is hidden
<!-- CORRECT -->
1
<!-- EXPLANATION -->
When a sketch shape turns blue, it indicates it is a closed profile. A closed profile is required for operations like Revolve to create a solid 3D body.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is the length of the center axis line?
<!-- OPTIONS -->
250 mm|300 mm|350 mm|400 mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The center axis line is drawn 300 mm long, matching the calibrated height of the vase. This line will serve as the axis of revolution.
<!-- QUESTION_END -->



## Revolving the Profile

The Revolve tool is selected from the Create menu. This tool rotates a 2D profile around an axis to create a 3D object.



### Profile Selection

The closed sketch region is selected as the profile to be revolved.



### Axis Selection

The vertical center line is selected as the axis of revolution. This is the line that was drawn up the center (300 mm long).



### Revolution

The profile is rotated 360 degrees to create the full 3D body of the vase. This creates a symmetrical, round object from the 2D profile.



<!-- QUESTION_START -->
What tool is used to create the 3D vase shape from the 2D profile?
<!-- OPTIONS -->
Extrude|Revolve|Sweep|Loft
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Revolve tool is used to rotate the 2D profile around an axis to create the 3D vase shape. This is perfect for creating symmetrical, round objects.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is selected as the axis of revolution?
<!-- OPTIONS -->
A horizontal line|The vertical center line|Any line|The top edge
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The vertical center line (the 300 mm line drawn up the center) is selected as the axis of revolution. This line determines how the profile will be rotated.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
How many degrees is the profile rotated?
<!-- OPTIONS -->
180 degrees|270 degrees|360 degrees|90 degrees
<!-- CORRECT -->
2
<!-- EXPLANATION -->
The profile is rotated 360 degrees to create the full 3D body of the vase. This creates a complete, symmetrical object.
<!-- QUESTION_END -->



## Hollowing and Finishing

After creating the solid vase, it needs to be hollowed out and finished with fillets.



### Shell Tool

The Shell tool is selected to hollow out the solid body. The top face of the vase is clicked, and a thickness of 3 mm is applied. This creates a hollow interior while maintaining the outer shape.



<!-- QUESTION_START -->
What tool is used to hollow out the vase?
<!-- OPTIONS -->
Extrude|Revolve|Shell|Cut
<!-- CORRECT -->
2
<!-- EXPLANATION -->
The Shell tool is used to hollow out the solid body. The top face is selected, and a thickness of 3 mm is applied to create the hollow interior.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What thickness is applied when using the Shell tool?
<!-- OPTIONS -->
2 mm|3 mm|4 mm|5 mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A thickness of 3 mm is applied when using the Shell tool. This creates the wall thickness of the hollow vase.
<!-- QUESTION_END -->



### Fillets

Small fillets (e.g., 0.3 mm) are added to the edges to smooth them out. This gives the vase a more polished, finished appearance.



<!-- QUESTION_START -->
What size fillets are typically added to the edges?
<!-- OPTIONS -->
0.1 mm|0.3 mm|0.5 mm|1 mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Small fillets of 0.3 mm are added to the edges to smooth them out. This gives the vase a more polished, finished appearance.
<!-- QUESTION_END -->



## Key Concepts Learned

- **Canvas/Reference Images**: Using images as guides for modeling
- **Canvas Calibration**: Setting the correct scale for reference images
- **Line Tool**: Creating straight sections of a profile
- **Fit Point Spline**: Creating smooth, organic curves
- **Closed Profiles**: Ensuring sketches are closed for 3D operations
- **Revolve Tool**: Rotating a 2D profile around an axis to create 3D objects
- **Shell Tool**: Hollowing out solid bodies
- **Fillets**: Adding finishing touches to smooth edges



## Important Notes

- Always calibrate reference images to ensure correct scale
- Splines are perfect for creating organic, flowing curves
- A closed profile is required for the Revolve tool
- The axis of revolution determines how the profile rotates
- Shell tool creates hollow objects with specified wall thickness
- Small fillets add professional finishing touches
- The Revolve tool is ideal for creating symmetrical, round objects`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 15,
      title: "Fusion 360 Step 4: Engine Block (Extruded Cuts & Patterns)",
      emoji: '🔧',
      content: `# Fusion 360 Step 4: Engine Block (Extruded Cuts & Patterns)

## Learn Autodesk Fusion in 10 Easy Steps - Step 4 (2025/2026)

**Topic**: Creating an engine block shape using extruded cuts and pattern tools.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=jlJNlLaslrk&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=5&pp=iAQB)

This tutorial demonstrates how to "sculpt" by removing material, creating an engine block using extruded cuts and pattern tools.



## Setup and Base Shape

The file is saved as "block" and a new component named "block" is created to house the design.



### Sketch

A Center Rectangle is drawn on the XY plane with dimensions 430mm x 600mm. This creates the base shape for the engine block.



### Extrude

The rectangle is extruded by 300mm to create a 3D block. This solid block will serve as the base material that will be "sculpted" by removing material.



<!-- QUESTION_START -->
What are the dimensions of the base rectangle?
<!-- OPTIONS -->
400mm x 600mm|430mm x 600mm|430mm x 650mm|450mm x 600mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A Center Rectangle is drawn on the XY plane with dimensions 430mm x 600mm. This creates the base shape for the engine block.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
How much is the rectangle extruded to create the 3D block?
<!-- OPTIONS -->
250mm|300mm|350mm|400mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The rectangle is extruded by 300mm to create a 3D block. This solid block will serve as the base material for the engine block.
<!-- QUESTION_END -->



## Creating the First Cut (Extruded Cut)

A sketch is created on the top surface of the block to begin removing material.



### Construction Line

A line is drawn from the center point to the top edge (90 degrees). Pressing 'X' toggles it to a dotted construction line, meaning it aids drawing but isn't part of the final geometry. Construction lines help position other sketch elements but don't create features.



<!-- QUESTION_START -->
How do you toggle a line to a construction line in Fusion 360?
<!-- OPTIONS -->
Press 'X'|Press 'C'|Press 'L'|Right-click and select "Construction"
<!-- CORRECT -->
0
<!-- EXPLANATION -->
Pressing 'X' toggles a line to a dotted construction line. Construction lines aid drawing but aren't part of the final geometry - they help position other elements.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is the purpose of a construction line?
<!-- OPTIONS -->
It creates a feature|It aids drawing but isn't part of the final geometry|It cuts material|It adds material
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Construction lines aid drawing but aren't part of the final geometry. They help position other sketch elements but don't create features when you finish the sketch.
<!-- QUESTION_END -->



### Circle

A 120mm circle is drawn at the center point of the construction line. This circle will be used to cut a hole in the block.



<!-- QUESTION_START -->
What is the diameter of the circle drawn for the first cut?
<!-- OPTIONS -->
100mm|120mm|140mm|160mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A 120mm circle is drawn at the center point of the construction line. This circle will be used to create the first cut in the engine block.
<!-- QUESTION_END -->



### Extrude Cut

The Extrude tool is used on the circle profile. Dragging the handle downwards into the block turns the operation red, indicating a "Cut" operation. The cut is confirmed by clicking OK. This removes material from the block, creating the first hole.



<!-- QUESTION_START -->
What color does the extrude operation turn when it becomes a Cut operation?
<!-- OPTIONS -->
Blue|Red|Green|Yellow
<!-- CORRECT -->
1
<!-- EXPLANATION -->
When you drag the extrude handle downwards into the block, the operation turns red, indicating a "Cut" operation. This removes material instead of adding it.
<!-- QUESTION_END -->



## Rectangular Pattern

To create multiple holes efficiently, the Rectangular Pattern tool is used instead of manually creating each hole.



### Object Type

Set to "Features" to select the cut extrusion from the timeline. This tells Fusion 360 to pattern the cut feature, not just the sketch.



### Directions

The axis is selected (edge of the block). The direction type is set to Symmetrical to pattern in both directions from the center. This creates a balanced pattern.



### Configuration

- **Axis 1**: Quantity 3 (total 3 in this row)

- **Axis 2**: Quantity 2 (creates a second row)

- **Distance**: Adjusted (e.g., 200mm) to space the holes evenly

This creates a 3x2 grid of holes (3 columns, 2 rows).



<!-- QUESTION_START -->
What is the Object Type set to when using Rectangular Pattern?
<!-- OPTIONS -->
Bodies|Features|Sketches|Components
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Object Type is set to "Features" to select the cut extrusion from the timeline. This patterns the cut feature, creating multiple holes efficiently.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What direction type is used for the Rectangular Pattern?
<!-- OPTIONS -->
One Direction|Symmetrical|Asymmetric|Circular
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The direction type is set to Symmetrical to pattern in both directions from the center. This creates a balanced pattern of holes.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
How many holes are created in the rectangular pattern?
<!-- OPTIONS -->
4 holes (2x2)|6 holes (3x2)|8 holes (4x2)|9 holes (3x3)
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The pattern creates a 3x2 grid of holes - 3 columns (Axis 1: Quantity 3) and 2 rows (Axis 2: Quantity 2), resulting in 6 total holes.
<!-- QUESTION_END -->



## Circular Pattern

A new sketch is started on the surface to create a circular pattern of smaller holes around the larger ones.



### Setup

A construction line is drawn 90mm from the center, and a small 25mm circle is drawn at its end. This creates one small hole that will be patterned.



<!-- QUESTION_START -->
How far from the center is the construction line drawn for the circular pattern?
<!-- OPTIONS -->
80mm|90mm|100mm|110mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A construction line is drawn 90mm from the center, and a small 25mm circle is drawn at its end. This positions the first small hole for the circular pattern.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is the diameter of the small circles in the circular pattern?
<!-- OPTIONS -->
20mm|25mm|30mm|35mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A small 25mm circle is drawn at the end of the construction line. This circle will be patterned around the larger hole.
<!-- QUESTION_END -->



### Circular Pattern Tool

- **Object**: The small 25mm circle is selected

- **Center Point**: The center of the previous large circle is selected

- **Quantity**: Set to 7 to create a ring of 7 small circles around the larger one

This creates a decorative pattern of small holes around each large hole.



<!-- QUESTION_START -->
How many small circles are created in the circular pattern?
<!-- OPTIONS -->
5|6|7|8
<!-- CORRECT -->
2
<!-- EXPLANATION -->
The quantity is set to 7 to create a ring of 7 small circles around the larger hole. This creates a decorative pattern.
<!-- QUESTION_END -->



### Extrude Cut

The new pattern of circles is selected and extruded downwards to cut them into the block. This creates the final pattern of holes in the engine block.



## Finishing

The model represents a rough engine block concept, demonstrating how to "sculpt" by removing material. The project is saved to finish the tutorial.



## Key Concepts Learned

- **Extruded Cuts**: Removing material from a solid body
- **Construction Lines**: Helper lines that aid positioning but don't create features
- **Rectangular Pattern**: Creating multiple copies in a grid pattern
- **Circular Pattern**: Creating multiple copies arranged in a circle
- **Sculpting by Subtraction**: Building complex shapes by removing material
- **Feature Patterning**: Repeating features efficiently instead of manual copying
- **Symmetrical Patterns**: Creating balanced designs



## Important Notes

- Press 'X' to toggle lines to construction lines
- Red color indicates a Cut operation when extruding
- Rectangular Pattern can create grids of features
- Circular Pattern arranges features in a circle
- Patterns save time compared to manual copying
- The Object Type must be set to "Features" to pattern cuts
- Symmetrical patterns create balanced designs
- Construction lines help position elements but don't create features`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 16,
      title: "Fusion 360 Step 5: Bottle (Lofts & Offset Planes)",
      emoji: '🍾',
      content: `# Fusion 360 Step 5: Bottle (Lofts & Offset Planes)

## Learn Autodesk Fusion in 10 Easy Steps - Step 5 (2025/2026)

**Topic**: Creating a bottle shape using offset planes, lofts, and guide rails.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=E-fs6jrdct0&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=6&pp=iAQB)

This tutorial demonstrates creating a complex bottle shape by blending multiple profiles together using the Loft tool with guide rails.



## Setup and Saving

The file is saved as "bottle" and a new component named "bottle" is created to contain the design.



<!-- QUESTION_START -->
What is the project name for this tutorial?
<!-- OPTIONS -->
Container|Bottle|bottle|Vessel
<!-- CORRECT -->
2
<!-- EXPLANATION -->
The file is saved as "bottle" and a new component named "bottle" is created to contain the design. This helps organize your work.
<!-- QUESTION_END -->



## Creating the Base Profiles (Offset Planes)

The bottle is created using multiple profiles at different heights, connected by a loft. Offset planes are used to create these profiles at different levels.



### Bottom Profile

A Center Rectangle (60mm x 75mm) is drawn on the base plane. Sketch Fillets of 10mm are added to the corners to create rounded edges. This forms the base of the bottle.



<!-- QUESTION_START -->
What are the dimensions of the bottom rectangle?
<!-- OPTIONS -->
50mm x 75mm|60mm x 75mm|60mm x 80mm|70mm x 75mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A Center Rectangle (60mm x 75mm) is drawn on the base plane. This forms the base profile of the bottle.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What size sketch fillets are added to the bottom rectangle corners?
<!-- OPTIONS -->
5mm|10mm|15mm|20mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Sketch Fillets of 10mm are added to the corners of the bottom rectangle. This creates rounded edges at the base of the bottle.
<!-- QUESTION_END -->



### Middle Profile (Offset Plane)

An Offset Plane is created 75mm above the base plane. On this new plane, a smaller Center Rectangle (40mm x 60mm) is drawn, also with fillets. This creates the middle section of the bottle, which is narrower than the base.



<!-- QUESTION_START -->
How high is the middle offset plane created?
<!-- OPTIONS -->
60mm|75mm|90mm|100mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
An Offset Plane is created 75mm above the base plane. This positions the middle profile at the correct height for the bottle shape.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What are the dimensions of the middle rectangle?
<!-- OPTIONS -->
35mm x 60mm|40mm x 60mm|40mm x 65mm|45mm x 60mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A smaller Center Rectangle (40mm x 60mm) is drawn on the middle offset plane. This creates a narrower middle section compared to the base.
<!-- QUESTION_END -->



### Top Profile (Offset Plane)

Another Offset Plane is created at 140mm height. A Circle with a diameter of 35mm is drawn on this plane. This creates the top opening of the bottle, which transitions from rectangular to circular.



<!-- QUESTION_START -->
How high is the top offset plane created?
<!-- OPTIONS -->
120mm|140mm|160mm|180mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Another Offset Plane is created at 140mm height. This positions the top profile at the correct height for the bottle neck.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is the diameter of the top circle?
<!-- OPTIONS -->
30mm|35mm|40mm|45mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A Circle with a diameter of 35mm is drawn on the top offset plane. This creates the circular opening at the top of the bottle.
<!-- QUESTION_END -->



## Creating Guide Rails

A new sketch is started on a vertical plane (perpendicular to the profiles) to draw the side shape of the bottle. Guide rails control how the loft transitions between profiles.



### Project Intersect

The Project > Intersect tool is used to create reference points (purple dots) where the previous sketches (rectangles and circle) intersect with the current sketch plane. This ensures the rails connect perfectly to the profiles at the correct points.



<!-- QUESTION_START -->
What tool is used to create reference points where sketches intersect with the current plane?
<!-- OPTIONS -->
Project > Project|Project > Intersect|Project > Include|Project > Offset
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Project > Intersect tool is used to create reference points (purple dots) where the previous sketches intersect with the current sketch plane. This ensures perfect alignment.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What color are the reference points created by Project Intersect?
<!-- OPTIONS -->
Blue|Purple|Red|Green
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Project > Intersect tool creates reference points shown as purple dots. These points mark where the previous sketches intersect with the current sketch plane.
<!-- QUESTION_END -->



### Fit Point Spline

A spline is drawn connecting these points to define the curved side of the bottle. Handles are adjusted to shape it like a shampoo bottle, creating a smooth, organic curve.



<!-- QUESTION_START -->
What tool is used to create the curved side shape of the bottle?
<!-- OPTIONS -->
Line Tool|Arc Tool|Fit Point Spline|Circle Tool
<!-- CORRECT -->
2
<!-- EXPLANATION -->
A Fit Point Spline is drawn connecting the reference points to define the curved side of the bottle. Handles are adjusted to create a smooth, organic curve.
<!-- QUESTION_END -->



### Mirroring

A vertical construction line is drawn. The spline is then mirrored across this line to create an identical rail on the opposite side. This ensures the bottle is symmetrical.



<!-- QUESTION_START -->
Why is the spline mirrored?
<!-- OPTIONS -->
To create a different shape|To create an identical rail on the opposite side|To delete the original|To rotate it
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The spline is mirrored across a vertical construction line to create an identical rail on the opposite side. This ensures the bottle is symmetrical.
<!-- QUESTION_END -->



## Lofting the Shape

The Loft tool is selected to blend the profiles together. The loft creates a smooth transition between the different shapes.



### Profiles

The bottom rectangle, middle rectangle, and top circle are selected in order from bottom to top. These are the cross-sections that will be blended together.



### Rails

The two mirrored spline curves are selected as rails. This forces the loft to follow the specific side curvature defined by the splines, rather than just connecting straight between profiles. The rails control the shape of the transition.



<!-- QUESTION_START -->
What tool is used to blend the profiles together?
<!-- OPTIONS -->
Extrude|Revolve|Sweep|Loft
<!-- CORRECT -->
3
<!-- EXPLANATION -->
The Loft tool is used to blend the bottom rectangle, middle rectangle, and top circle together. This creates a smooth transition between the different shapes.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
In what order are the profiles selected for the loft?
<!-- OPTIONS -->
Top to bottom|Bottom to top|Any order|Random order
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The bottom rectangle, middle rectangle, and top circle are selected in order from bottom to top. This ensures the loft transitions correctly.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is the purpose of guide rails in a loft?
<!-- OPTIONS -->
To add material|To force the loft to follow specific curvature|To delete features|To create patterns
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The guide rails (the two mirrored splines) force the loft to follow the specific side curvature defined by the splines, rather than just connecting straight between profiles.
<!-- QUESTION_END -->



## Finishing Touches

After creating the basic bottle shape, finishing touches are added to complete the design.



### Fillet

A 5mm fillet is added to the bottom edge. This rounds the bottom corner for a more finished appearance.



<!-- QUESTION_START -->
What size fillet is added to the bottom edge?
<!-- OPTIONS -->
3mm|5mm|7mm|10mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A 5mm fillet is added to the bottom edge. This rounds the bottom corner for a more finished appearance.
<!-- QUESTION_END -->



### Shell

The Shell tool is used on the top face with a 2mm thickness to hollow out the bottle. This creates the interior cavity of the bottle.



<!-- QUESTION_START -->
What thickness is used when shelling the bottle?
<!-- OPTIONS -->
1mm|2mm|3mm|4mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Shell tool is used on the top face with a 2mm thickness to hollow out the bottle. This creates the interior cavity.
<!-- QUESTION_END -->



### Top Fillets

Small 0.5mm fillets are added to the top edges for a smooth finish. This gives the bottle opening a polished appearance.



<!-- QUESTION_START -->
What size fillets are added to the top edges?
<!-- OPTIONS -->
0.3mm|0.5mm|0.7mm|1mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Small 0.5mm fillets are added to the top edges for a smooth finish. This gives the bottle opening a polished appearance.
<!-- QUESTION_END -->



## Key Concepts Learned

- **Offset Planes**: Creating work planes at different heights
- **Multiple Profiles**: Using different shapes at different levels
- **Project Intersect**: Creating reference points from other sketches
- **Fit Point Spline**: Creating smooth, organic curves
- **Mirroring**: Creating symmetrical shapes
- **Loft Tool**: Blending multiple profiles together
- **Guide Rails**: Controlling the shape of loft transitions
- **Shell Tool**: Hollowing out solid bodies
- **Fillets**: Adding finishing touches to edges



## Important Notes

- Offset planes allow you to create profiles at different heights
- Project Intersect creates reference points for alignment
- Guide rails control how lofts transition between profiles
- Profiles must be selected in order (bottom to top)
- Lofts create smooth transitions between different shapes
- Shell tool creates hollow objects with specified wall thickness
- Multiple fillets can be applied for different finishing effects
- The Loft tool is ideal for creating complex, organic shapes`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 17,
      title: "Fusion 360 Step 6: Emboss & Deboss",
      emoji: '📝',
      content: `# Fusion 360 Step 6: Emboss & Deboss

## Learn Autodesk Fusion in 10 Easy Steps - Step 6 (2025/2026)

**Topic**: Using the emboss and deboss features, including on curved surfaces.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=qKZBlH22-gY&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=7&pp=iAQB0gcJCU0KAYcqIYzv)

This tutorial demonstrates how to add text and designs to both flat and curved surfaces using the Emboss and Deboss tools.



## Setup and Base Shape (Shape 1)

The file is saved as "emboss". A new component named "shape 1" is created to contain the design.



### Sketch

A Two Point Rectangle (instead of center) is drawn on the XY plane. This gives more control over the rectangle's position.



### Dimensions

The rectangle dimensions are set to 80mm width and 100mm height (using Tab to switch between fields). This creates the base block for the emboss examples.



### Extrude

The rectangle is extruded by 10mm to create a 3D block.



### Taper Angle

The presenter demonstrates tapering. A value of -5 degrees is used to taper the extrusion inwards. This creates a slightly narrower top than bottom, useful for certain manufacturing processes.



<!-- QUESTION_START -->
What type of rectangle is used for the base shape?
<!-- OPTIONS -->
Center Rectangle|Two Point Rectangle|3-Point Rectangle|Square
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A Two Point Rectangle (instead of center) is drawn on the XY plane. This gives more control over the rectangle's position.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What are the dimensions of the base rectangle?
<!-- OPTIONS -->
70mm x 100mm|80mm x 100mm|80mm x 110mm|90mm x 100mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The rectangle dimensions are set to 80mm width and 100mm height. The Tab key is used to switch between dimension fields.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
How much is the rectangle extruded?
<!-- OPTIONS -->
8mm|10mm|12mm|15mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The rectangle is extruded by 10mm to create a 3D block. This provides a flat surface for embossing text.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What taper angle is used for the extrusion?
<!-- OPTIONS -->
-3 degrees|-5 degrees|-7 degrees|-10 degrees
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A value of -5 degrees is used to taper the extrusion inwards. This creates a slightly narrower top than bottom.
<!-- QUESTION_END -->



## Embossing Text on a Flat Surface

Text can be added to flat surfaces using the Emboss tool, which raises the text above the surface.



### Text Sketch

A sketch is created on the top surface. The Text tool is used to create a text box, and "HELLO" is typed in capitals. Alignment tools center the text, and the height is set to 10mm.



<!-- QUESTION_START -->
What text is used in the tutorial?
<!-- OPTIONS -->
HELLO|FUSION|DESIGN|TEXT
<!-- CORRECT -->
0
<!-- EXPLANATION -->
"HELLO" is typed in capitals using the Text tool. Alignment tools are used to center the text on the surface.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is the height of the text?
<!-- OPTIONS -->
8mm|10mm|12mm|15mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The text height is set to 10mm. This determines the size of the letters when embossed.
<!-- QUESTION_END -->



### Emboss Tool

The Emboss tool is found under the "Create" menu. It can raise (emboss) or cut (deboss) text or shapes into surfaces.



### Emboss Settings

- **Profile**: The "HELLO" text is selected

- **Face**: The top surface of the block is selected

- **Depth**: 2mm is set to raise the text (Emboss). This creates raised letters on the surface.



<!-- QUESTION_START -->
Where is the Emboss tool located?
<!-- OPTIONS -->
Modify menu|Create menu|Sketch menu|Assemble menu
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Emboss tool is found under the "Create" menu. It can raise (emboss) or cut (deboss) text or shapes into surfaces.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What depth is used for embossing the text?
<!-- OPTIONS -->
1mm|2mm|3mm|4mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A depth of 2mm is set to raise the text (Emboss). This creates raised letters that stand out from the surface.
<!-- QUESTION_END -->



### Fillet

A 0.5mm fillet is added to the top face of the letters and the base face to smooth the connection. This gives the embossed text a more polished appearance.



<!-- QUESTION_START -->
What size fillet is added to the embossed text?
<!-- OPTIONS -->
0.3mm|0.5mm|0.7mm|1mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A 0.5mm fillet is added to the top face of the letters and the base face to smooth the connection. This gives the text a more polished appearance.
<!-- QUESTION_END -->



## Embossing Text on a Curved Path

Text can also follow a curved path, wrapping around curves instead of staying flat.



### Path Sketch

The previous features are deleted from the timeline to reset the block. A construction line (20mm) is drawn 90 degrees from the center. A Fit Point Spline connects the sides through the top of this construction line to create a curve. This curve will serve as the path for the text.



<!-- QUESTION_START -->
How long is the construction line for the curved path?
<!-- OPTIONS -->
15mm|20mm|25mm|30mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A construction line (20mm) is drawn 90 degrees from the center. A Fit Point Spline connects the sides through the top of this construction line to create a curve.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What tool is used to create the curved path?
<!-- OPTIONS -->
Line Tool|Arc Tool|Fit Point Spline|Circle Tool
<!-- CORRECT -->
2
<!-- EXPLANATION -->
A Fit Point Spline connects the sides through the top of the construction line to create a curve. This curve will serve as the path for the text.
<!-- QUESTION_END -->



### Text on Path

The Text tool is used with "Text on Path" selected. The text wraps around the spline curve, following its shape instead of staying straight.



<!-- QUESTION_START -->
What option is selected to make text follow a curve?
<!-- OPTIONS -->
Text on Line|Text on Path|Text on Curve|Text on Spline
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Text tool is used with "Text on Path" selected. This makes the text wrap around the spline curve, following its shape.
<!-- QUESTION_END -->



### Deboss

The Emboss tool is used again, but this time "Deboss" is selected to cut the text 2mm into the model. Deboss creates recessed text instead of raised text.



<!-- QUESTION_START -->
What is the difference between Emboss and Deboss?
<!-- OPTIONS -->
Emboss raises text, Deboss cuts text|Emboss cuts text, Deboss raises text|They are the same|Emboss is for flat surfaces only
<!-- CORRECT -->
0
<!-- EXPLANATION -->
Emboss raises text above the surface, while Deboss cuts text into the surface. Both use the same tool, just with different settings.
<!-- QUESTION_END -->



## Embossing on a Curved Surface (Shape 2)

A new component "shape 2" is created, and "shape 1" is hidden. This demonstrates embossing on a curved surface like a cylinder.



### Cylinder

A 60mm diameter circle is drawn and extruded by 100mm to create a cylinder. This provides a curved surface for embossing.



<!-- QUESTION_START -->
What is the diameter of the cylinder?
<!-- OPTIONS -->
50mm|60mm|70mm|80mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A 60mm diameter circle is drawn and extruded by 100mm to create a cylinder. This provides a curved surface for embossing.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
How tall is the cylinder?
<!-- OPTIONS -->
80mm|100mm|120mm|150mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The circle is extruded by 100mm to create the cylinder. This provides enough height for the text to wrap around.
<!-- QUESTION_END -->



### Tangent Text

A sketch is created on a plane tangent/perpendicular to the cylinder (likely the origin plane slicing through it). This ensures the text is properly oriented for wrapping around the curved surface.



### Text

"HELLO" is typed. The presenter notes that sometimes text must be mirrored/flipped in the sketch to appear correctly when wrapped around a curved surface.



<!-- QUESTION_START -->
Why might text need to be mirrored when embossing on a curved surface?
<!-- OPTIONS -->
To make it larger|To make it appear correctly when wrapped|To change the font|To add effects
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Sometimes text must be mirrored/flipped in the sketch to appear correctly when wrapped around a curved surface. This ensures the letters face the right direction.
<!-- QUESTION_END -->



### Emboss on Cylinder

- **Profile**: The text is selected

- **Face**: The curved surface of the cylinder is selected

The text wraps around the curvature of the cylinder, embossed by 2mm. This demonstrates how emboss works on non-flat surfaces.



<!-- QUESTION_START -->
What depth is used when embossing on the cylinder?
<!-- OPTIONS -->
1mm|2mm|3mm|4mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The text is embossed by 2mm on the curved surface of the cylinder. The text wraps around the curvature, following the surface shape.
<!-- QUESTION_END -->



## Key Concepts Learned

- **Emboss Tool**: Raising text or shapes above a surface
- **Deboss Tool**: Cutting text or shapes into a surface
- **Text Tool**: Creating text in sketches
- **Text on Path**: Making text follow a curved path
- **Fit Point Spline**: Creating curved paths for text
- **Taper Angle**: Angling extrusions for manufacturing
- **Curved Surface Embossing**: Applying text to non-flat surfaces
- **Fillets on Text**: Smoothing the edges of embossed text
- **Mirroring Text**: Flipping text for correct orientation on curves



## Important Notes

- Emboss raises material, Deboss cuts material
- Text can follow curved paths using "Text on Path"
- The Emboss tool works on both flat and curved surfaces
- Text may need to be mirrored when wrapping around curves
- Fillets can be added to embossed text for a polished look
- The depth setting controls how much the text is raised or cut
- Construction lines help position curved paths
- Splines create smooth curves for text to follow
- The Emboss tool is found in the Create menu`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 18,
      title: "Fusion 360 Step 7: Import/Export, Holes & Fasteners",
      emoji: '📎',
      content: `# Fusion 360 Step 7: Import/Export, Holes & Fasteners

## Learn Autodesk Fusion in 10 Easy Steps - Step 7 (2025/2026)

**Topic**: Using import/export, the hole tool, and inserting fasteners.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=SG8GD8De6xA&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=8&pp=iAQB)

This tutorial demonstrates how to export and import files, create holes for fasteners, and insert screws and bolts from the fastener library.



## Create Base Box

The user creates a new component called "box" and sketches a center rectangle on a plane, setting dimensions to 50mm x 50mm. This rectangle is extruded by 50mm to create a cube. This cube will be used to demonstrate holes and fasteners.



<!-- QUESTION_START -->
What are the dimensions of the base rectangle?
<!-- OPTIONS -->
40mm x 40mm|50mm x 50mm|60mm x 60mm|50mm x 60mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A center rectangle is sketched on a plane with dimensions set to 50mm x 50mm. This creates a square base for the box.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
How much is the rectangle extruded to create the cube?
<!-- OPTIONS -->
40mm|50mm|60mm|70mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The rectangle is extruded by 50mm to create a cube. This provides a solid block for demonstrating holes and fasteners.
<!-- QUESTION_END -->



## Exporting Files

The video explains how to export the design by going to File > Export. Different file types are used for different purposes.



### File Types

- **.f3d**: Best for reopening in Fusion to keep design history. This is Fusion 360's native format.

- **.fbx / .obj**: Best for rendering or animation (e.g., Blender). These formats preserve geometry for 3D graphics software.

- **.step**: Best for other CAD programs (e.g., SolidWorks). This is a standard CAD exchange format.

- **.stl**: Best for 3D printing. This format is used by most 3D printers and slicing software.

The user demonstrates exporting as an STL file to the desktop.



<!-- QUESTION_START -->
Which file format is best for reopening in Fusion 360 to keep design history?
<!-- OPTIONS -->
.f3d|.stl|.step|.obj
<!-- CORRECT -->
0
<!-- EXPLANATION -->
The .f3d format is Fusion 360's native format and is best for reopening in Fusion to keep design history. Other formats may lose parametric features.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Which file format is best for 3D printing?
<!-- OPTIONS -->
.f3d|.stl|.step|.fbx
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The .stl format is best for 3D printing. This format is used by most 3D printers and slicing software to create the layers for printing.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Which file format is best for other CAD programs like SolidWorks?
<!-- OPTIONS -->
.f3d|.stl|.step|.obj
<!-- CORRECT -->
2
<!-- EXPLANATION -->
The .step format is best for other CAD programs (e.g., SolidWorks). This is a standard CAD exchange format that preserves geometry between different CAD systems.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Which file formats are best for rendering or animation (e.g., Blender)?
<!-- OPTIONS -->
.f3d and .stl|.fbx and .obj|.step and .stl|.f3d and .step
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The .fbx and .obj formats are best for rendering or animation (e.g., Blender). These formats preserve geometry for 3D graphics software.
<!-- QUESTION_END -->



## Importing Files

To import, go to Insert > Insert Mesh and select the STL file. The imported mesh is moved to the side to compare with the original solid body.



### Difference Between Solid and Mesh

The solid body is filled (solid geometry), while the mesh is hollow (surface only). This is verified using Section Analysis, which cuts through the model to show the interior. The mesh is then deleted.



<!-- QUESTION_START -->
How do you import a mesh file in Fusion 360?
<!-- OPTIONS -->
File > Import|Insert > Insert Mesh|Create > Import|Tools > Import
<!-- CORRECT -->
1
<!-- EXPLANATION -->
To import a mesh file, go to Insert > Insert Mesh and select the file. This allows you to bring in STL or other mesh formats.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is the difference between a solid body and a mesh?
<!-- OPTIONS -->
Solid is hollow, mesh is filled|Solid is filled, mesh is surface only|They are the same|Solid is 2D, mesh is 3D
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The solid body is filled (solid geometry), while the mesh is hollow (surface only). A mesh is just the outer surface, while a solid has volume.
<!-- QUESTION_END -->



## Using the Hole Tool

The Hole tool is selected from the Create menu and placed on the top surface of the box. The Hole tool creates precise holes for fasteners with various options.



### Hole Settings

- **Hole Type**: Options include Simple, Counterbore, and Countersink (allows screw heads to sit flush). Counterbore creates a larger diameter at the top for the screw head, while countersink creates an angled recess.

- **Tap Type**: Options include Simple, Clearance, and Tapped (adds threads). Tapped holes have internal threads for screws.

- **Drill Point**: Flat or Angled. Flat creates a flat bottom, while angled creates a pointed bottom like a drill bit.

- **Modeled checkbox**: Must be selected for 3D printing threads; otherwise, they are just visual textures. This is important for 3D printing threaded parts.



<!-- QUESTION_START -->
Where is the Hole tool located?
<!-- OPTIONS -->
Modify menu|Create menu|Sketch menu|Assemble menu
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Hole tool is selected from the Create menu. It creates precise holes for fasteners with various options for different hole types.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Which hole type allows screw heads to sit flush?
<!-- OPTIONS -->
Simple|Counterbore|Countersink|Both Counterbore and Countersink
<!-- CORRECT -->
3
<!-- EXPLANATION -->
Both Counterbore and Countersink allow screw heads to sit flush. Counterbore creates a larger diameter at the top, while countersink creates an angled recess.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What does the "Tapped" tap type do?
<!-- OPTIONS -->
Creates a larger hole|Adds threads to the hole|Creates a flat bottom|Creates an angled bottom
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Tapped option adds threads to the hole. This creates internal threads that match standard screw sizes.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What must be selected for 3D printing threads?
<!-- OPTIONS -->
The "threaded" checkbox|The "modeled" checkbox|The "printed" checkbox|The "solid" checkbox
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The "modeled" checkbox must be selected for 3D printing threads; otherwise, they are just visual textures. This ensures the threads are actually created in the geometry.
<!-- QUESTION_END -->



## Inserting Fasteners

Go to Insert > Fastener to access a library of bolts, screws, nuts, etc. This provides standard fasteners that can be inserted into your design.



### Selecting a Fastener

The user selects a countersunk screw with size M3 and length 6mm. M3 refers to a metric screw with a 3mm diameter. The Hole Tool is adjusted to match: M3 size, countersunk type. This ensures the hole matches the fastener.



<!-- QUESTION_START -->
Where do you find the fastener library?
<!-- OPTIONS -->
File > Fastener|Insert > Fastener|Create > Fastener|Tools > Fastener
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Go to Insert > Fastener to access a library of bolts, screws, nuts, etc. This provides standard fasteners that can be inserted into your design.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What does M3 refer to in fastener sizing?
<!-- OPTIONS -->
3mm length|3mm diameter|3mm thread pitch|3mm head size
<!-- CORRECT -->
1
<!-- EXPLANATION -->
M3 refers to a metric screw with a 3mm diameter. The "M" stands for metric, and the number indicates the diameter in millimeters.
<!-- QUESTION_END -->



### Placing the Fastener

The screw is inserted into the hole. Even if it doesn't fit perfectly (indicated by red highlighting), it can still be placed. A Joint is automatically created to position the screw within the assembly. This joint helps align and position the fastener correctly.



<!-- QUESTION_START -->
What color indicates that a fastener doesn't fit perfectly?
<!-- OPTIONS -->
Blue|Red|Green|Yellow
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Red highlighting indicates that a fastener doesn't fit perfectly. However, it can still be placed even with this warning.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is automatically created when inserting a fastener?
<!-- OPTIONS -->
A hole|A joint|A pattern|A sketch
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A Joint is automatically created to position the screw within the assembly. This joint helps align and position the fastener correctly.
<!-- QUESTION_END -->



## Key Concepts Learned

- **File Export**: Saving designs in different formats for different purposes
- **File Import**: Bringing mesh files into Fusion 360
- **Solid vs Mesh**: Understanding the difference between filled and surface-only geometry
- **Hole Tool**: Creating precise holes with various types and options
- **Hole Types**: Simple, Counterbore, and Countersink
- **Tap Types**: Simple, Clearance, and Tapped (threaded)
- **Fastener Library**: Accessing standard screws, bolts, and nuts
- **Metric Sizing**: Understanding M3, M4, etc. fastener sizes
- **Automatic Joints**: Fasteners automatically create joints for positioning
- **3D Printing Threads**: Using the "modeled" checkbox for printable threads



## Important Notes

- Different file formats serve different purposes (.f3d for Fusion, .stl for 3D printing, .step for CAD exchange)
- Meshes are surface-only, while solids have volume
- The Hole tool offers many options for different fastener types
- Counterbore and Countersink allow screw heads to sit flush
- Tapped holes have internal threads for screws
- The "modeled" checkbox is essential for 3D printing threads
- Fasteners can be inserted even if they don't fit perfectly (red highlighting)
- Joints are automatically created when inserting fasteners
- Metric sizing (M3, M4, etc.) refers to the diameter in millimeters
- The fastener library provides standard sizes for common fasteners`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 19,
      title: "Fusion 360 Step 8: Hinged Box (Components & Joints)",
      emoji: '📦',
      content: `# Fusion 360 Step 8: Hinged Box (Components & Joints)

## Learn Autodesk Fusion in 10 Easy Steps - Step 8 (2025/2026)

**Topic**: Creating a box with a hinged lid using components and joints.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=AbC3d1x0R48&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=8&pp=iAQB)

This tutorial demonstrates how to create an assembly with moving parts by building a box with a hinged lid using components and joints.



## Setting Up Components

The file is saved as "fixings box". A new component named "box" is created to hold the base geometry. Later, the main assembly ("fixings box") is reactivated to create a separate "lid" component. This ensures the lid is not inside the box component, allowing them to move independently.



<!-- QUESTION_START -->
What is the project name for this tutorial?
<!-- OPTIONS -->
Box|fixings box|Hinged Box|Storage Box
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The file is saved as "fixings box". This helps organize the project and identify the design.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Why is the lid created as a separate component?
<!-- OPTIONS -->
To make it larger|To allow it to move independently|To change its color|To delete it easily
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The lid is created as a separate component to ensure it is not inside the box component, allowing them to move independently. This is essential for creating joints.
<!-- QUESTION_END -->



## Creating the Box Base

The box base is created first, including the main body and hinge extension.



### Sketch

A center rectangle (90mm x 140mm) is drawn on the base plane. This creates the footprint of the box.



### Extrude

The rectangle is extruded by 50mm to create the main box body.



### Shell

The top surface is selected and shelled by 3mm to hollow out the box. This creates the interior cavity while maintaining the outer walls.



<!-- QUESTION_START -->
What are the dimensions of the base rectangle?
<!-- OPTIONS -->
80mm x 130mm|90mm x 140mm|100mm x 150mm|90mm x 150mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A center rectangle (90mm x 140mm) is drawn on the base plane. This creates the footprint of the box.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
How much is the rectangle extruded?
<!-- OPTIONS -->
40mm|50mm|60mm|70mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The rectangle is extruded by 50mm to create the main box body. This provides the height of the box.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What thickness is used when shelling the box?
<!-- OPTIONS -->
2mm|3mm|4mm|5mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The top surface is selected and shelled by 3mm to hollow out the box. This creates the interior cavity while maintaining the outer walls.
<!-- QUESTION_END -->



### Hinge Extension

A sketch is created on the back face. A 5mm line is drawn down from the top edge, converted to a construction line, and used to create a profile that is extruded out by 5mm (Join operation) to form the hinge base. This creates the attachment point for the hinge.



<!-- QUESTION_START -->
How long is the line drawn for the hinge extension?
<!-- OPTIONS -->
3mm|5mm|7mm|10mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A 5mm line is drawn down from the top edge, converted to a construction line, and used to create a profile that is extruded out by 5mm to form the hinge base.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What operation is used to create the hinge extension?
<!-- OPTIONS -->
New Body|Join|Cut|Intersect
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The profile is extruded out by 5mm using the Join operation. This adds the hinge base to the existing box body.
<!-- QUESTION_END -->



## Creating the Lid

With the "lid" component active, the lid is created separately from the box.



### Sketch

A Two Point Rectangle is sketched on top of the box. This creates the lid profile that will cover the box opening.



### Extrude

The lid profile is extruded by 3mm as a "New Body". This creates a separate body for the lid component.



<!-- QUESTION_START -->
What type of rectangle is used for the lid?
<!-- OPTIONS -->
Center Rectangle|Two Point Rectangle|3-Point Rectangle|Square
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A Two Point Rectangle is sketched on top of the box. This gives more control over the lid's position.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
How thick is the lid?
<!-- OPTIONS -->
2mm|3mm|4mm|5mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The lid profile is extruded by 3mm as a "New Body". This creates a separate body for the lid component.
<!-- QUESTION_END -->



### Hinge Part

A sketch on the side of the lid draws a rectangle connecting the lid to the hinge base. This is extruded by 3mm (Join) to create the lid's part of the hinge mechanism.



<!-- QUESTION_START -->
How thick is the lid's hinge part?
<!-- OPTIONS -->
2mm|3mm|4mm|5mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The rectangle connecting the lid to the hinge base is extruded by 3mm (Join) to create the lid's part of the hinge mechanism.
<!-- QUESTION_END -->



## Creating the Hinge Pin/Hole

A sketch is created on the side of the hinge area to create the hole for the hinge pin.



### Positioning

Construction lines are used to find the center (2.5mm in, 2.5mm up). This positions the hole precisely in the center of the hinge.



### Hole

A 1mm circle is drawn at this center point. This will be the hole for the hinge pin.



### Extrude Cut

This circle is extruded (cut) by -4mm through both the lid and box hinge parts. The negative value cuts through the material, creating the pin hole.



<!-- QUESTION_START -->
How far in and up is the hole positioned?
<!-- OPTIONS -->
2mm in, 2mm up|2.5mm in, 2.5mm up|3mm in, 3mm up|2.5mm in, 3mm up
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Construction lines are used to find the center (2.5mm in, 2.5mm up). This positions the hole precisely in the center of the hinge.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is the diameter of the hinge pin hole?
<!-- OPTIONS -->
0.5mm|1mm|1.5mm|2mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
A 1mm circle is drawn at the center point. This will be the hole for the hinge pin.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
How deep is the hole cut?
<!-- OPTIONS -->
-3mm|-4mm|-5mm|-6mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The circle is extruded (cut) by -4mm through both the lid and box hinge parts. The negative value cuts through the material, creating the pin hole.
<!-- QUESTION_END -->



## Adding the Joint

The main assembly component is activated. The Joint Tool is selected from the menu to create a connection between the lid and box that allows rotation.



### Snap Points

- The outer edge of the hole on the lid (lid is active/visible, box is hidden)

- The corresponding outer edge of the hole on the box (lid is hidden, box is active/visible)

These snap points align the two components at the hinge axis.



<!-- QUESTION_START -->
What tool is used to create the connection between lid and box?
<!-- OPTIONS -->
Fastener Tool|Joint Tool|Align Tool|Connect Tool
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Joint Tool is selected from the menu to create a connection between the lid and box that allows rotation.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What are selected as snap points for the joint?
<!-- OPTIONS -->
The faces|The outer edges of the holes|The centers|The corners
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The outer edge of the hole on the lid and the corresponding outer edge of the hole on the box are selected as snap points. These align the two components at the hinge axis.
<!-- QUESTION_END -->



### Motion

The motion type is set to Revolute to allow rotation. This creates a hinge joint that allows the lid to rotate around the hinge axis.



<!-- QUESTION_START -->
What motion type is used for the hinge joint?
<!-- OPTIONS -->
Rigid|Revolute|Slider|Cylindrical
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The motion type is set to Revolute to allow rotation. This creates a hinge joint that allows the lid to rotate around the hinge axis.
<!-- QUESTION_END -->



### Limits

Joint limits are set to prevent clashing. Minimum is set to 0 degrees (closed) and Maximum to 180 degrees (fully open). This prevents the lid from rotating too far and colliding with other parts.



<!-- QUESTION_START -->
What is the minimum joint limit (closed position)?
<!-- OPTIONS -->
-90 degrees|0 degrees|90 degrees|180 degrees
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The minimum joint limit is set to 0 degrees (closed). This defines the closed position of the lid.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is the maximum joint limit (fully open position)?
<!-- OPTIONS -->
90 degrees|120 degrees|150 degrees|180 degrees
<!-- CORRECT -->
3
<!-- EXPLANATION -->
The maximum joint limit is set to 180 degrees (fully open). This prevents the lid from rotating too far and colliding with other parts.
<!-- QUESTION_END -->



### Testing the Joint

The user can now double-click the flag icon on the joint to manually open and close the lid. This allows testing the joint motion and verifying it works correctly.



<!-- QUESTION_START -->
How do you test the joint motion?
<!-- OPTIONS -->
Right-click the joint|Double-click the flag icon on the joint|Press the spacebar|Use the timeline
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The user can double-click the flag icon on the joint to manually open and close the lid. This allows testing the joint motion and verifying it works correctly.
<!-- QUESTION_END -->



## Key Concepts Learned

- **Components**: Creating separate parts that can move independently
- **Component Activation**: Switching between components to work on different parts
- **Shell Tool**: Hollowing out solid bodies
- **Join Operation**: Adding material to existing bodies
- **New Body Operation**: Creating separate bodies
- **Construction Lines**: Positioning elements precisely
- **Extrude Cut**: Removing material to create holes
- **Joint Tool**: Creating connections between components
- **Revolute Joint**: Allowing rotation around an axis
- **Joint Limits**: Controlling the range of motion
- **Snap Points**: Aligning components precisely



## Important Notes

- Components must be separate to create joints
- The main assembly component must be activated to create joints
- Snap points align components at the joint axis
- Revolute joints allow rotation around one axis
- Joint limits prevent unwanted movement and collisions
- Construction lines help position holes precisely
- Negative extrude values cut through material
- The flag icon on joints allows manual testing
- Shell tool creates hollow interiors
- Join operation adds material to existing bodies
- New Body operation creates separate bodies for different components`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 20,
      title: "Fusion 360 Step 9: Aftershave Bottle (Primitives & Appearances)",
      emoji: '🧴',
      content: `# Fusion 360 Step 9: Aftershave Bottle (Primitives & Appearances)

## Learn Autodesk Fusion in 10 Easy Steps - Step 9 (2025/2026)

**Topic**: Creating an aftershave bottle using primitive shapes and appearances.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=qlxM26qKBJI&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=9&pp=iAQB)

This tutorial demonstrates using primitive shapes (Box and Cylinder) instead of sketches, and applying materials/appearances to create a realistic product design.



## Setup and Saving

The file is saved as "after shave". A new component named "after shave" is created to contain the design. This helps organize the project.



<!-- QUESTION_START -->
What is the project name for this tutorial?
<!-- OPTIONS -->
Bottle|after shave|Aftershave|Container
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The file is saved as "after shave". A new component named "after shave" is created to contain the design.
<!-- QUESTION_END -->



## Using Primitives (The Box)

Instead of sketching and extruding, the Primitive Box tool is used. Primitives are pre-made 3D shapes that can be created quickly without sketching.



### Drawback Note

The video highlights that primitives don't create sketches, which can make future editing harder compared to sketch-based modeling. However, they are faster for simple shapes.



### Creation

A box is drawn on the base plane using the Primitive Box tool. This creates a 3D box directly without needing to sketch a rectangle first.



### Dimensions

Length 25mm, Width 50mm, Height 70mm. The body is renamed to "bottle" for clarity.



<!-- QUESTION_START -->
What tool is used instead of sketching and extruding?
<!-- OPTIONS -->
Extrude Tool|Primitive Box tool|Revolve Tool|Sweep Tool
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Primitive Box tool is used instead of sketching and extruding. Primitives are pre-made 3D shapes that can be created quickly.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is a drawback of using primitives?
<!-- OPTIONS -->
They are slower|They don't create sketches, making future editing harder|They are more complex|They use more memory
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Primitives don't create sketches, which can make future editing harder compared to sketch-based modeling. However, they are faster for simple shapes.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What are the dimensions of the box?
<!-- OPTIONS -->
20mm x 50mm x 70mm|25mm x 50mm x 70mm|25mm x 45mm x 70mm|30mm x 50mm x 70mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The box dimensions are Length 25mm, Width 50mm, Height 70mm. The body is renamed to "bottle" for clarity.
<!-- QUESTION_END -->



## Adding the Neck (Cylinder Primitive)

The Primitive Cylinder tool is used on the top surface of the box to create the bottle neck.



### Positioning

The center point is found by hovering to infer the center. This uses Fusion 360's inference system to automatically snap to the center of the face.



### Dimensions

Diameter 20mm, Height 4mm. This creates a short neck section.



### Operation

Important change to New Body (instead of Join) so it remains separate. This keeps the neck as a separate body from the bottle, which is useful for applying different materials later.



The body is renamed to "neck".



<!-- QUESTION_START -->
How is the center point found for the cylinder?
<!-- OPTIONS -->
By measuring|By hovering to infer the center|By drawing construction lines|By guessing
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The center point is found by hovering to infer the center. This uses Fusion 360's inference system to automatically snap to the center of the face.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What are the dimensions of the neck cylinder?
<!-- OPTIONS -->
Diameter 18mm, Height 4mm|Diameter 20mm, Height 4mm|Diameter 20mm, Height 5mm|Diameter 22mm, Height 4mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The neck cylinder has a diameter of 20mm and height of 4mm. This creates a short neck section for the bottle.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What operation is used for the neck cylinder?
<!-- OPTIONS -->
Join|New Body|Cut|Intersect
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The operation is set to New Body (instead of Join) so it remains separate. This keeps the neck as a separate body from the bottle.
<!-- QUESTION_END -->



## Adding the Lid (Cylinder Primitive)

Another Primitive Cylinder is created on top of the neck to form the lid.



### Dimensions

Diameter 22mm, Height 24mm. The lid is slightly larger in diameter than the neck to fit over it.



### Operation

Set to New Body. The body is renamed to "lid".



<!-- QUESTION_START -->
What are the dimensions of the lid cylinder?
<!-- OPTIONS -->
Diameter 20mm, Height 24mm|Diameter 22mm, Height 24mm|Diameter 22mm, Height 20mm|Diameter 24mm, Height 24mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The lid cylinder has a diameter of 22mm and height of 24mm. The lid is slightly larger in diameter than the neck to fit over it.
<!-- QUESTION_END -->



## Filleting

Fillets are added to round the sharp edges and give the bottle a more polished appearance.



### Side Edges

The four vertical edges of the bottle are filleted by 5mm. This rounds the corners of the main body.



### Top/Bottom Faces

The top and bottom faces of the main bottle body are filleted by 2mm. This creates rounded edges on the top and bottom.



### Lid

The top edge of the lid is filleted by 3mm. This rounds the top of the lid for a finished look.



<!-- QUESTION_START -->
What size fillet is applied to the four vertical edges of the bottle?
<!-- OPTIONS -->
3mm|5mm|7mm|10mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The four vertical edges of the bottle are filleted by 5mm. This rounds the corners of the main body.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What size fillet is applied to the top and bottom faces of the bottle?
<!-- OPTIONS -->
1mm|2mm|3mm|4mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The top and bottom faces of the main bottle body are filleted by 2mm. This creates rounded edges on the top and bottom.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What size fillet is applied to the top edge of the lid?
<!-- OPTIONS -->
2mm|3mm|4mm|5mm
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The top edge of the lid is filleted by 3mm. This rounds the top of the lid for a finished look.
<!-- QUESTION_END -->



## Appearances and Materials

The Appearance menu is opened (Shortcut: A) to change the visual appearance of the bottle. This allows you to apply different materials and colors.



### Applying Material

The library is browsed to find Paint > Enamel Gloss Black. The material is dragged onto the bottle to change its visual appearance from the default steel gray to black. This gives the bottle a glossy black finish.



<!-- QUESTION_START -->
What is the shortcut key to open the Appearance menu?
<!-- OPTIONS -->
A|M|P|S
<!-- CORRECT -->
0
<!-- EXPLANATION -->
The Appearance menu is opened using the shortcut key A. This provides quick access to materials and appearances.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What material is applied to the bottle?
<!-- OPTIONS -->
Paint > Enamel Gloss Black|Paint > Matte Black|Metal > Steel|Plastic > ABS
<!-- CORRECT -->
0
<!-- EXPLANATION -->
The library is browsed to find Paint > Enamel Gloss Black. The material is dragged onto the bottle to change its appearance from the default steel gray to black.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is the default material color in Fusion 360?
<!-- OPTIONS -->
White|Black|Steel gray|Blue
<!-- CORRECT -->
2
<!-- EXPLANATION -->
The default material in Fusion 360 is steel gray. Materials can be changed using the Appearance menu to apply different colors and finishes.
<!-- QUESTION_END -->



## Render Workspace Introduction

The user switches from the Design workspace to the Render workspace. This view shows the material properties (like glossiness) more realistically, demonstrating how to create high-quality images of the product. The user switches back to Design and saves the file.



<!-- QUESTION_START -->
What workspace shows material properties more realistically?
<!-- OPTIONS -->
Design workspace|Render workspace|Animation workspace|Simulation workspace
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Render workspace shows the material properties (like glossiness) more realistically, demonstrating how to create high-quality images of the product.
<!-- QUESTION_END -->



## Key Concepts Learned

- **Primitive Shapes**: Pre-made 3D shapes (Box, Cylinder) that don't require sketching
- **Primitive Box**: Creating boxes directly without sketching rectangles
- **Primitive Cylinder**: Creating cylinders directly without sketching circles
- **Inference System**: Using hover to automatically find center points
- **New Body Operation**: Keeping parts separate for different materials
- **Fillets**: Rounding edges for a polished appearance
- **Appearance Menu**: Changing materials and colors (Shortcut: A)
- **Material Library**: Browsing and applying different materials
- **Render Workspace**: Viewing materials realistically for high-quality images
- **Naming Bodies**: Organizing your design by renaming bodies



## Important Notes

- Primitives are faster but don't create sketches, making editing harder
- Use New Body operation to keep parts separate for different materials
- The inference system helps find center points automatically
- Fillets add a polished, professional appearance
- The Appearance menu (Shortcut: A) allows quick material changes
- Materials can be dragged directly onto bodies
- The Render workspace shows materials more realistically
- Naming bodies helps organize complex designs
- Primitives are great for quick prototyping but sketches offer more control
- Different fillet sizes can be applied to different edges for varied effects`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 21,
      title: "Fusion 360 Step 10: Exporting & Manufacturing",
      emoji: '📤',
      content: `# Fusion 360 Step 10: Exporting & Manufacturing

## Learn Autodesk Fusion in 10 Easy Steps - Step 10 (2025/2026)

**Topic**: Exporting your designs for 3D printing, manufacturing, and sharing.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=iUbGPrUilno&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=11&pp=iAQB)



## Exporting Your Designs

Once your design is complete, you need to export it for manufacturing, sharing, or 3D printing.



## File Formats



### STL (Stereolithography)

Most common for 3D printing.



- **Mesh format**: Converts solid to triangles

- **Universal**: Works with all 3D printers

- **No color/texture**: Geometry only



<!-- QUESTION_START -->
What file format is most common for 3D printing?
<!-- OPTIONS -->
STEP|STL|OBJ|DXF
<!-- CORRECT -->
1
<!-- EXPLANATION -->
STL (Stereolithography) is the most common format for 3D printing. It converts solid geometry to triangles and works with all 3D printers.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What does STL format contain?
<!-- OPTIONS -->
Geometry only|Colors and textures|Materials|Dimensions
<!-- CORRECT -->
0
<!-- EXPLANATION -->
STL format contains geometry only - no color or texture information. It converts solid models to triangles for 3D printing.
<!-- QUESTION_END -->



### STEP

For manufacturing and CAD exchange.



- **Precise geometry**: Maintains exact dimensions

- **Industry standard**: Works with other CAD software

- **Assembly support**: Can export entire assemblies



<!-- QUESTION_START -->
What file format is best for manufacturing and CAD exchange?
<!-- OPTIONS -->
STL|STEP|OBJ|DXF
<!-- CORRECT -->
1
<!-- EXPLANATION -->
STEP format is best for manufacturing and CAD exchange. It maintains precise geometry and is an industry standard that works with other CAD software.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What advantage does STEP format have over STL?
<!-- OPTIONS -->
Smaller file size|Maintains exact dimensions|Includes colors|Works with all printers
<!-- CORRECT -->
1
<!-- EXPLANATION -->
STEP format maintains precise geometry and exact dimensions, making it better for manufacturing than STL, which converts to triangles.
<!-- QUESTION_END -->



### OBJ

For rendering and visualization.



- **Mesh format**: Like STL but with materials

- **Texture support**: Can include colors

- **Common in graphics**: Used in animation software



<!-- QUESTION_START -->
What file format is best for rendering and visualization?
<!-- OPTIONS -->
STL|STEP|OBJ|DXF
<!-- CORRECT -->
2
<!-- EXPLANATION -->
OBJ format is best for rendering and visualization. It's like STL but with materials and texture support, making it common in animation software.
<!-- QUESTION_END -->



### DXF/DWG

For 2D drawings and laser cutting.



- **2D format**: Flat drawings

- **Laser cutting**: Perfect for CNC laser cutters

- **Drawing views**: Technical drawings



<!-- QUESTION_START -->
What file format is best for laser cutting?
<!-- OPTIONS -->
STL|STEP|OBJ|DXF/DWG
<!-- CORRECT -->
3
<!-- EXPLANATION -->
DXF/DWG format is best for 2D drawings and laser cutting. It's a 2D format that's perfect for CNC laser cutters and technical drawings.
<!-- QUESTION_END -->



## Exporting for 3D Printing



### Steps:

1. Select the body or component

2. Right-click → "Save As STL"

3. Choose settings:

 - **Refinement**: Higher = smoother but larger file

 - **Units**: Millimeters (mm) is standard

4. Click OK and save



### Important Considerations:

- **Watertight**: Model must be solid (no gaps)

- **Manifold**: All surfaces must connect properly

- **Orientation**: Consider how it will print

- **Supports**: May need support material



<!-- QUESTION_START -->
What does "watertight" mean for 3D printing?
<!-- OPTIONS -->
The model is waterproof|The model must be solid with no gaps|The model floats|The model is transparent
<!-- CORRECT -->
1
<!-- EXPLANATION -->
"Watertight" means the model must be solid with no gaps. This is essential for 3D printing because gaps can cause printing failures.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What does "manifold" mean for 3D printing?
<!-- OPTIONS -->
The model is round|All surfaces must connect properly|The model is flat|The model has multiple parts
<!-- CORRECT -->
1
<!-- EXPLANATION -->
"Manifold" means all surfaces must connect properly. This ensures the 3D printer can create a valid solid object without errors.
<!-- QUESTION_END -->



## Exporting for Manufacturing



### STEP Files:

1. Select component or body

2. File → Export → STEP

3. Choose options

4. Save



### DXF for Laser Cutting:

1. Create a sketch of the flat pattern

2. File → Export → DXF

3. Select the sketch

4. Save



## Manufacturing Workspace

Fusion 360 includes CAM (Computer-Aided Manufacturing) tools:



- **2D Milling**: Flat cutting operations

- **3D Milling**: Complex 3D shapes

- **Turning**: For lathe operations

- **Additive**: For 3D printing toolpaths



<!-- QUESTION_START -->
What does CAM stand for?
<!-- OPTIONS -->
Computer-Aided Manufacturing|Computer-Aided Modeling|Computer-Aided Machining|Computer-Aided Materials
<!-- CORRECT -->
0
<!-- EXPLANATION -->
CAM stands for Computer-Aided Manufacturing. Fusion 360 includes CAM tools for creating toolpaths for manufacturing machines.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What CAM operation is used for lathe operations?
<!-- OPTIONS -->
2D Milling|3D Milling|Turning|Additive
<!-- CORRECT -->
2
<!-- EXPLANATION -->
Turning is used for lathe operations. This creates toolpaths for machines that rotate the workpiece while cutting.
<!-- QUESTION_END -->



## Creating Toolpaths



1. Switch to Manufacture workspace

2. Set up your machine

3. Define stock (raw material)

4. Create operations:

 - **2D Pocket**: Remove material from inside

 - **2D Contour**: Cut around edges

 - **3D Adaptive**: Efficient material removal

5. Generate toolpaths

6. Simulate the toolpath

7. Post-process for your machine



## Post-Processing

Converts toolpaths to machine code (G-code):



1. Select operations

2. Click "Post Process"

3. Choose your machine/controller

4. Generate G-code file

5. Send to machine



<!-- QUESTION_START -->
What does post-processing convert toolpaths into?
<!-- OPTIONS -->
STL files|G-code|STEP files|DXF files
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Post-processing converts toolpaths to machine code (G-code). This is the language that manufacturing machines understand.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is the first step in post-processing?
<!-- OPTIONS -->
Choose your machine|Select operations|Generate G-code|Send to machine
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The first step in post-processing is to select the operations you want to convert. Then you click "Post Process" and choose your machine/controller.
<!-- QUESTION_END -->



## Best Practices



### For 3D Printing:

- Check model is watertight

- Consider print orientation

- Add supports if needed

- Export at appropriate resolution



<!-- QUESTION_START -->
What should you check before exporting for 3D printing?
<!-- OPTIONS -->
File size|Model is watertight|Colors|Materials
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Before exporting for 3D printing, you should check that the model is watertight (solid with no gaps). This prevents printing failures.
<!-- QUESTION_END -->



### For Manufacturing:

- Choose correct file format

- Include all necessary dimensions

- Consider material properties

- Test toolpaths before running



## Common Export Issues



- **Missing geometry**: Not all bodies selected

- **Wrong units**: Check unit settings

- **File too large**: Reduce refinement/quality

- **Import errors**: Use standard formats (STEP, STL)



## Important Notes



- Always save your Fusion 360 file first

- Export formats depend on your use case

- STL for 3D printing, STEP for manufacturing

- Test exports before sending to machines

- Keep original Fusion 360 files for editing



<!-- QUESTION_START -->
What should you always do before exporting?
<!-- OPTIONS -->
Check file size|Save your Fusion 360 file first|Close other programs|Restart Fusion 360
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Always save your Fusion 360 file first before exporting. This ensures you have a backup of your work in case something goes wrong.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What format should you use for 3D printing?
<!-- OPTIONS -->
STEP|STL|OBJ|DXF
<!-- CORRECT -->
1
<!-- EXPLANATION -->
STL format should be used for 3D printing. STEP format is better for manufacturing and CAD exchange.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What format should you use for manufacturing?
<!-- OPTIONS -->
STL|STEP|OBJ|DXF
<!-- CORRECT -->
1
<!-- EXPLANATION -->
STEP format should be used for manufacturing. It maintains precise geometry and is an industry standard for CAD exchange.
<!-- QUESTION_END -->`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 22,
      title: "TapTapTap: Expert Level 1",
      emoji: '👆',
      content: `# TapTapTap: Expert Level 1 👆

You're getting really good! This expert level will challenge your skills even more.

## How to Play

- Tap targets as they appear on screen
- Targets appear every 1 second (very fast!)
- Targets are smaller and more challenging
- 30 seconds to score as many points as possible!

## Scoring System

- **Bronze**: 20-39 points
- **Silver**: 40-59 points
- **Gold**: 60-79 points
- **Platinum**: 80+ points

You need at least **Bronze** (20 points) to progress!

## Tips

- Stay calm and focused
- Practice makes perfect
- Challenge yourself to beat your best score!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 23,
      title: "TapTapTap: Expert Level 2",
      emoji: '👆',
      content: `# TapTapTap: Expert Level 2 👆

Continue mastering your tapping skills at the expert level!

## How to Play

- Tap targets as they appear
- Same speed as Level 1 - keep practicing!
- 30 seconds to score points

## Scoring System

- **Bronze**: 20-39 points
- **Silver**: 40-59 points
- **Gold**: 60-79 points
- **Platinum**: 80+ points

You need at least **Bronze** (20 points) to progress!

## Challenge

Can you improve your score? Aim for Platinum!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),



    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'art',
      lessonNumber: 1,
      title: "Art: Flags of the World",
      emoji: '🏳️',
      assessmentType: 'coloring-game',
      content: `# Art: Flags of the World 🏳️

Let's learn about and color flags from around the world! Flags represent countries and have special meanings.

## France 🇫🇷
The French flag has three colors arranged in vertical stripes:
- Blue stripe on the left
- White stripe in the middle
- Red stripe on the right
This flag is called the "Tricolore" and was adopted in 1794.

## Italy 🇮🇹
The Italian flag also has three colors in vertical stripes:
- Green stripe on the left
- White stripe in the middle
- Red stripe on the right
Italy's flag was officially adopted in 1946.

## Fun Facts
- Flags often use colors that represent important aspects of a country
- The order of colors can have special meaning
- Flags are displayed with pride by people all around the world

Color these flags carefully, paying attention to the correct order of colors!`,
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 14,
      title: "Place Value to 10,000",
      emoji: '🔢',
      content: `# Place Value to 10,000 🔢

Build and compare four-digit numbers.

## How to Play

Drag digits into the thousands, hundreds, tens, and ones columns.

## Example

6,402 = 6 thousands, 4 hundreds, 0 tens, 2 ones`,
      quizId: quizId++,
      assessmentType: 'place-value-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 15,
      title: "Rounding Numbers",
      emoji: '🎯',
      content: `# Rounding Numbers 🎯

Round numbers to the nearest 10, 100, or 1,000.

## How to Play

Drag the number to the closest target on the number line.`,
      quizId: quizId++,
      assessmentType: 'rounding-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 16,
      title: "6, 7, 9, 11, and 12 Times Tables",
      emoji: '✖️',
      content: `# 6, 7, 9, 11, and 12 Times Tables ✖️

Practise the trickier tables.

## How to Play

Tap the correct product to build each table.`,
      quizId: quizId++,
      assessmentType: 'times-table-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 17,
      title: "Factors and Multiples",
      emoji: '🧮',
      content: `# Factors and Multiples 🧮

Find factor pairs and multiples.

## How to Play

Match number cards to create factor pairs or multiples.`,
      quizId: quizId++,
      assessmentType: 'factors-multiples-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 18,
      title: "Fractions and Decimals",
      emoji: '📏',
      content: `# Fractions and Decimals 📏

Match tenths and hundredths to decimals.

## How to Play

Drag the decimal to the matching fraction bar.

## Example

0.3 = 3/10`,
      quizId: quizId++,
      assessmentType: 'decimal-match-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 19,
      title: "Area and Perimeter",
      emoji: '📐',
      content: `# Area and Perimeter 📐

Find the area and perimeter of rectangles.

## How to Play

Tile the shape to find area, then trace the edge for perimeter.`,
      quizId: quizId++,
      assessmentType: 'area-tiling-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 20,
      title: "Time: 24-Hour Clock",
      emoji: '🕒',
      content: `# Time: 24-Hour Clock 🕒

Convert times between 12-hour and 24-hour.

## How to Play

Drag the matching time to the correct clock.`,
      quizId: quizId++,
      assessmentType: 'time-conversion-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 21,
      title: "Coordinates",
      emoji: '📍',
      content: `# Coordinates 📍

Plot points on a grid.

## How to Play

Tap the grid square for each coordinate given.`,
      quizId: quizId++,
      assessmentType: 'coordinate-plot-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 22,
      title: "Line Symmetry",
      emoji: '🪞',
      content: `# Line Symmetry 🪞

Find and draw lines of symmetry.

## How to Play

Draw the mirror line so both sides match.`,
      quizId: quizId++,
      assessmentType: 'symmetry-mirror-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'maths',
      lessonNumber: 23,
      title: "Statistics: Line Graphs",
      emoji: '📈',
      content: `# Statistics: Line Graphs 📈

Plot data on a line graph.

## How to Play

Drag points to the correct height and connect them.`,
      quizId: quizId++,
      assessmentType: 'line-graph-game',
      categoryId: null,
    }),

  ];
}

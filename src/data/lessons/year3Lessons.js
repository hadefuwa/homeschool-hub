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



## What is Multiplication?



Multiplication is a quick way to add the same number many times.



2 × 3 = 2 + 2 + 2 = 6



## The 2 Times Table



- 2 × 1 = 2

- 2 × 2 = 4

- 2 × 3 = 6

- 2 × 4 = 8

- 2 × 5 = 10

- 2 × 6 = 12

- 2 × 7 = 14

- 2 × 8 = 16

- 2 × 9 = 18

- 2 × 10 = 20



## The 5 Times Table



- 5 × 1 = 5

- 5 × 2 = 10

- 5 × 3 = 15

- 5 × 4 = 20

- 5 × 5 = 25

- 5 × 6 = 30

- 5 × 7 = 35

- 5 × 8 = 40

- 5 × 9 = 45

- 5 × 10 = 50



## Practice



Try these:

- 2 × 6 = ?

- 5 × 4 = ?

- 2 × 9 = ?

- 5 × 7 = ?



## Fun Activities



- Practice times tables every day

- Use objects to help you understand

- Make times table flashcards

- Play multiplication games



## Remember



- Multiplication is repeated addition

- Practice makes perfect

- Start with 2s and 5s

- You can do it!`,
      quizId: quizId++,
      assessmentType: 'quiz',
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



Division is sharing or grouping numbers!



## What is Division?



Division is the opposite of multiplication. It means sharing equally.



12 ÷ 3 = 4 (12 shared into 3 groups = 4 in each group)



## Division Facts



- 10 ÷ 2 = 5

- 15 ÷ 3 = 5

- 20 ÷ 4 = 5

- 25 ÷ 5 = 5



## Sharing Equally



If you have 12 sweets and 3 friends:

- 12 ÷ 3 = 4

- Each friend gets 4 sweets



## Grouping



If you have 20 pencils and put 4 in each box:

- 20 ÷ 4 = 5

- You need 5 boxes



## Practice



Try these:

- 8 ÷ 2 = ?

- 15 ÷ 5 = ?

- 18 ÷ 3 = ?

- 20 ÷ 4 = ?



## Fun Activities



- Share objects equally

- Practice division problems

- Use drawings to help

- Play division games



## Remember



- Division is sharing or grouping

- It's the opposite of multiplication

- Practice with real objects

- You're learning well!`,
      quizId: quizId++,
      assessmentType: 'quiz',
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



## What is a Fraction?



A fraction shows part of a whole.



## Parts of a Fraction



- **Numerator** (top number) - How many parts you have

- **Denominator** (bottom number) - How many parts make a whole



## Common Fractions



**Half** - ½

- One part out of two

- If you cut something in half, you get two equal parts



**Quarter** - ¼

- One part out of four

- If you cut something into quarters, you get four equal parts



**Third** - ⅓

- One part out of three

- If you cut something into thirds, you get three equal parts



## Examples



- Half a pizza 🍕 = ½

- Quarter of a cake 🎂 = ¼

- Third of a chocolate bar 🍫 = ⅓



## Practice



- Draw a shape and color half

- Draw a shape and color a quarter

- Share objects into fractions

- Write fractions for pictures



## Fun Activities



- Cut paper into fractions

- Share food into fractions

- Draw fraction pictures

- Practice with real objects



## Remember



- Fractions show parts of a whole

- The top number is how many parts

- The bottom number is total parts

- Fractions are everywhere!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'english',
      lessonNumber: 1,
      title: "Writing Paragraphs",
      emoji: '📝',
      content: `# Writing Paragraphs 📝



Let's learn to write good paragraphs!



## What is a Paragraph?



A paragraph is a group of sentences about one main idea.



## Parts of a Paragraph



1. **Topic Sentence** - Tells what the paragraph is about

2. **Supporting Sentences** - Give details and examples

3. **Closing Sentence** - Wraps up the paragraph



## Example Paragraph



**My Favorite Animal**



My favorite animal is a dog. Dogs are friendly and loyal pets. They love to play and go for walks. Dogs can learn tricks and are great companions. I would love to have a dog one day.



## Writing Tips



- Start with a topic sentence

- Add 3-5 supporting sentences

- End with a closing sentence

- Stay on one topic



## Practice



Write a paragraph about:

- Your favorite hobby

- A place you like

- Your best friend

- Your favorite food



## Fun Activities



- Write paragraphs every day

- Share your paragraphs

- Edit and improve your writing

- Make a paragraph book



## Remember



- Paragraphs have a main idea

- Use topic and supporting sentences

- Practice makes perfect

- You're becoming a great writer!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'english',
      lessonNumber: 2,
      title: "Reading Comprehension Skills",
      emoji: '📚',
      content: `# Reading Comprehension Skills 📚



Let's improve our reading understanding!



## Reading Strategies



1. **Predict** - Guess what might happen

2. **Question** - Ask questions as you read

3. **Clarify** - Make sure you understand

4. **Summarize** - Tell the main points



## Finding Information



- **Who?** - Characters in the story

- **What?** - What happened

- **Where?** - The setting

- **When?** - The time period

- **Why?** - Reasons for events

- **How?** - How things happened



## Main Idea



The main idea is what the story or text is mostly about.



## Supporting Details



Details that support the main idea:

- Examples

- Facts

- Descriptions

- Events



## Practice



Read a story and:

- Find the main idea

- List supporting details

- Answer who, what, where, when, why, how

- Summarize in your own words



## Fun Activities



- Read and discuss stories

- Answer comprehension questions

- Write summaries

- Make story maps



## Remember



- Understanding is key

- Ask questions as you read

- Find the main idea

- Practice every day!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'english',
      lessonNumber: 3,
      title: "Spelling and Vocabulary",
      emoji: '📖',
      content: `# Spelling and Vocabulary 📖



Let's learn new words and how to spell them!



## Learning New Words



- Read widely to find new words

- Look up words you don't know

- Use new words in sentences

- Practice spelling them



## Spelling Rules



**Adding -ing:**

- Most words: add -ing (play → playing)

- Words ending in e: drop e, add -ing (make → making)

- Short vowel + consonant: double consonant (run → running)



**Adding -ed:**

- Most words: add -ed (walk → walked)

- Words ending in e: add -d (like → liked)

- Short vowel + consonant: double consonant (stop → stopped)



## Common Words to Learn



- beautiful, because, before

- different, difficult, during

- enough, every, everyone

- friend, favorite, family



## Practice



- Spell words every day

- Use spelling patterns

- Write words in sentences

- Test yourself



## Fun Activities



- Make word lists

- Play spelling games

- Use words in stories

- Create vocabulary cards



## Remember



- Spelling takes practice

- Learn spelling patterns

- Use new words often

- You're improving every day!`,
      quizId: quizId++,
      assessmentType: 'quiz',
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



Let's learn about prehistoric Britain!



## Stone Age Britain



- People lived in Britain thousands of years ago

- They used stone tools

- They lived in caves and simple shelters

- They hunted and gathered food



## Bronze Age



- People learned to use bronze

- Bronze is a metal

- They made better tools

- They made weapons and jewelry



## Iron Age



- People learned to use iron

- Iron is stronger than bronze

- They made even better tools

- They built hill forts



## Hill Forts



- People built forts on hills

- They protected people

- They had walls around them

- They were safe places



## Celtic People



- Celtic people lived in Britain

- They had their own culture

- They made beautiful art

- They had their own language



## Fun Activities



- Draw prehistoric Britain

- Make a timeline

- Learn about hill forts

- Write about prehistoric life



## Remember



- Prehistoric Britain was long ago

- People used stone, bronze, and iron

- They built hill forts

- Celtic people lived there!`,
      quizId: 61,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'history',
      lessonNumber: 2,
      title: "Biblical History - Kings and Prophets",
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

- These are important stories!`,
      quizId: null,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'history',
      lessonNumber: 3,
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

- They influenced the world!`,
      quizId: 70,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'history',
      lessonNumber: 4,
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

- Greeks loved art and theater!`,
      quizId: 70,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'history',
      lessonNumber: 5,
      title: "Ancient Rome - The Empire",
      emoji: '🏛️',
      content: `# Ancient Rome - The Empire 🏛️



Let's learn about the Roman Empire!



## When Was Ancient Rome?



- Ancient Rome existed from about 753 BC to AD 476

- That's a very long time!

- It was a huge empire

- It covered much of Europe



## The Roman Empire



- Rome had a huge empire

- It covered many countries

- It was very powerful

- It lasted for hundreds of years



## Roman Army



- The Roman army was strong

- Soldiers were well trained

- They built roads

- They protected the empire



## Roman Roads



- Romans built amazing roads

- They were straight and strong

- They connected the empire

- Some still exist today!



## Roman Buildings



- Romans built amazing buildings

- The Colosseum is famous

- They built aqueducts for water

- They built many temples



## Roman Emperors



- Emperors ruled Rome

- They were very powerful

- Some were good, some were bad

- They controlled the empire



## Fun Activities



- Draw Roman buildings

- Learn about the army

- Make a map of the empire

- Write about ancient Rome



## Remember



- Rome had a huge empire

- The army was strong

- They built amazing things

- Rome was very powerful!`,
      quizId: null,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'history',
      lessonNumber: 6,
      title: "Ancient Rome - Daily Life",
      emoji: '🏺',
      content: `# Ancient Rome - Daily Life 🏺



Let's learn about how people lived in ancient Rome!



## Roman Homes



- Rich people: Large houses (villas)

- Poor people: Small apartments

- Houses had courtyards

- They had beautiful decorations



## Roman Baths



- Romans loved baths

- They went to public bathhouses

- They relaxed and talked

- Baths were social places



## Roman Food



- Romans ate different foods

- They ate bread and olives

- They ate fish and meat

- Rich people ate fancy meals



## Roman Entertainment



- Romans loved entertainment

- They watched gladiator fights

- They watched chariot races

- They went to the theater



## Roman Writing



- Romans wrote in Latin

- Latin was their language

- They wrote on scrolls

- Many languages come from Latin



## Fun Activities



- Draw Roman homes

- Learn about baths

- Draw Roman food

- Write about Roman life



## Remember



- Roman homes varied

- Romans loved baths

- They enjoyed entertainment

- Life was different then!`,
      quizId: null,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'history',
      lessonNumber: 7,
      title: "The Fall of Rome",
      emoji: '⚔️',
      content: `# The Fall of Rome ⚔️



Let's learn about why the Roman Empire fell!



## Why Rome Fell



- The empire was too big

- It was hard to control

- There were many problems

- It slowly fell apart



## Barbarian Invasions



- Barbarians attacked Rome

- They came from outside

- They wanted land

- They were strong warriors



## Problems in the Empire



- The empire was too large

- It was expensive to run

- There were many enemies

- It was hard to defend



## End of the Empire



- The empire split in two

- The western part fell first

- The eastern part lasted longer

- Rome fell in AD 476



## What Came After



- After Rome fell, things changed

- New kingdoms formed

- The Middle Ages began

- Europe changed forever



## Fun Activities



- Learn about the fall

- Make a timeline

- Write about what happened

- Learn about what came after



## Remember



- Rome fell for many reasons

- The empire was too big

- Barbarians attacked

- It was the end of an era!`,
      quizId: null,
      assessmentType: 'quiz',
      categoryId: null,
    })

  ];
}

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



## What is Long Multiplication?



Long multiplication helps us multiply numbers with more than one digit.



## Example: 23 × 4



\`\`\`

23

×  4

---

92

\`\`\`



Step by step:

1. Multiply 4 × 3 = 12 (write 2, carry 1)

2. Multiply 4 × 2 = 8, add the carried 1 = 9

3. Answer: 92



## Example: 34 × 12



\`\`\`

 34

×  12

---

 68  (34 × 2)

+ 340  (34 × 10)

---

408

\`\`\`



## Practice



Try these:

- 45 × 6 = ?

- 23 × 7 = ?

- 56 × 8 = ?

- 34 × 9 = ?



## Fun Activities



- Practice long multiplication

- Use grid method to help

- Check your answers

- Solve word problems



## Remember



- Line up numbers carefully

- Multiply each digit

- Add carried numbers

- Check your work!`,
      quizId: quizId++,
      assessmentType: 'quiz',
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



## Fractions



Fractions show parts of a whole.



- ½ = one half

- ¼ = one quarter

- ⅓ = one third

- ¾ = three quarters



## Decimals



Decimals are another way to show parts of a whole.



- 0.5 = half (same as ½)

- 0.25 = quarter (same as ¼)

- 0.75 = three quarters (same as ¾)

- 0.1 = one tenth



## Converting Fractions to Decimals



- ½ = 0.5 (1 ÷ 2 = 0.5)

- ¼ = 0.25 (1 ÷ 4 = 0.25)

- ⅓ = 0.333... (1 ÷ 3 = 0.333...)

- ¾ = 0.75 (3 ÷ 4 = 0.75)



## Place Value in Decimals



- 0.1 = one tenth

- 0.01 = one hundredth

- 0.001 = one thousandth



## Practice



Convert these:

- ½ to decimal

- ¼ to decimal

- ¾ to decimal

- 0.5 to fraction



## Fun Activities



- Practice converting fractions

- Use number lines

- Compare fractions and decimals

- Solve problems with both



## Remember



- Fractions and decimals show parts

- They can be converted

- Practice helps you understand

- You're doing great!`,
      quizId: quizId++,
      assessmentType: 'quiz',
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



## Length



We measure length in:

- **Millimeters (mm)** - Very small things

- **Centimeters (cm)** - Small things (10 mm = 1 cm)

- **Meters (m)** - Medium things (100 cm = 1 m)

- **Kilometers (km)** - Long distances (1000 m = 1 km)



## Weight



We measure weight in:

- **Grams (g)** - Light things

- **Kilograms (kg)** - Heavier things (1000 g = 1 kg)



## Capacity (Volume)



We measure capacity in:

- **Milliliters (ml)** - Small amounts

- **Liters (l)** - Larger amounts (1000 ml = 1 l)



## Time



We measure time in:

- **Seconds** - Very short time

- **Minutes** - 60 seconds = 1 minute

- **Hours** - 60 minutes = 1 hour

- **Days** - 24 hours = 1 day



## Practice



Convert these:

- 5 cm = ? mm

- 2 m = ? cm

- 3 kg = ? g

- 4 l = ? ml



## Fun Activities



- Measure objects around you

- Convert between units

- Estimate measurements

- Solve measurement problems



## Remember



- Different things need different units

- Learn the conversions

- Practice measuring

- Measurement is useful!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'english',
      lessonNumber: 1,
      title: "Creative Writing",
      emoji: '✍️',
      content: `# Creative Writing ✍️



Let's write creative stories!



## What is Creative Writing?



Creative writing is writing stories, poems, or other creative pieces from your imagination.



## Story Structure



1. **Beginning** - Introduce characters and setting

2. **Middle** - Develop the plot and conflict

3. **End** - Resolve the conflict and conclude



## Writing Tips



- Use descriptive words

- Show, don't just tell

- Use dialogue (speech)

- Create interesting characters

- Build suspense



## Story Ideas



- A magical adventure

- A mystery to solve

- A journey to a new place

- Meeting a new friend

- Finding something special



## Practice



Write a story about:

- A day in the life of a superhero

- An adventure in space

- A talking animal

- A magical object



## Fun Activities



- Write stories regularly

- Share your stories

- Illustrate your stories

- Create a story collection



## Remember



- Use your imagination

- Plan your story first

- Edit and improve

- Have fun writing!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'english',
      lessonNumber: 2,
      title: "Poetry and Rhyme",
      emoji: '📝',
      content: `# Poetry and Rhyme 📝



Let's learn about poetry!



## What is Poetry?



Poetry is a special way of writing that uses rhythm, rhyme, and imagery.



## Rhyming Words



Words that sound the same at the end:

- cat, hat, bat, sat

- run, fun, sun, bun

- tree, bee, see, me

- night, light, bright, sight



## Types of Poems



**Rhyming Couplets**

Two lines that rhyme:

\`\`\`

The cat sat on the mat,

Wearing a funny hat.

\`\`\`



**Haiku**

Three lines: 5-7-5 syllables:

\`\`\`

The sun shines so bright

Warming up the earth below

Making flowers grow

\`\`\`



## Poetry Techniques



- **Rhyme** - Words that sound the same

- **Rhythm** - The beat of the poem

- **Imagery** - Creating pictures with words

- **Alliteration** - Words starting with the same sound



## Practice



Write a poem about:

- Your favorite season

- An animal

- A place you like

- Your family



## Fun Activities



- Read different poems

- Write your own poems

- Perform poems aloud

- Make a poetry book



## Remember



- Poetry is creative

- Rhyme makes it fun

- Use descriptive words

- Express yourself!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'english',
      lessonNumber: 3,
      title: "Grammar: Verbs and Tenses",
      emoji: '📚',
      content: `# Grammar: Verbs and Tenses 📚



Let's learn about verb tenses!



## What are Tenses?



Tenses tell us when something happens - past, present, or future.



## Present Tense



Shows what is happening now:

- I walk to school.

- She plays football.

- They read books.



## Past Tense



Shows what happened before:

- I walked to school.

- She played football.

- They read books.



## Future Tense



Shows what will happen:

- I will walk to school.

- She will play football.

- They will read books.



## Regular Verbs



Most verbs add -ed for past tense:

- walk → walked

- play → played

- jump → jumped



## Irregular Verbs



Some verbs change completely:

- go → went

- see → saw

- do → did

- have → had



## Practice



Change these to past tense:

- I run → I ___

- She jumps → She ___

- They eat → They ___



## Fun Activities



- Practice verb tenses

- Write sentences in different tenses

- Identify tenses in reading

- Play tense games



## Remember



- Tenses show when things happen

- Practice regular and irregular verbs

- Use the right tense

- You're learning well!`,
      quizId: quizId++,
      assessmentType: 'quiz',
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



Let's learn about life after the Roman Empire!



## What Were the Dark Ages?



- The Dark Ages came after Rome fell

- It was a difficult time

- Learning decreased

- Life was harder



## Vikings



- Vikings came from Scandinavia

- They were skilled sailors

- They raided and explored

- They settled in many places



## Anglo-Saxons



- Anglo-Saxons came to Britain

- They settled in England

- They created kingdoms

- They had their own culture



## Monasteries



- Monasteries were important places

- Monks lived there

- They copied books

- They kept learning alive



## Learning and Books



- Books were very rare

- Monks copied them by hand

- Learning was mostly in monasteries

- Books were very valuable



## Fun Activities



- Learn about the Dark Ages

- Draw monasteries

- Make a timeline

- Write about this period



## Remember



- Dark Ages came after Rome

- Life was difficult

- Monasteries kept learning alive

- It was a time of change!`,
      quizId: quizId++,
      assessmentType: 'quiz',
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

- It influenced history!`,
      quizId: quizId++,
      assessmentType: 'quiz',
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



Let's learn about medieval times!



## When Were Medieval Times?



- Medieval times were from about AD 500 to 1500

- That's the Middle Ages

- It was after the Dark Ages

- Before modern times



## Medieval Castles



- Castles were strong buildings

- They protected people

- They had thick walls

- They had towers and moats



## Knights and Armor



- Knights were warriors

- They wore armor

- They fought on horses

- They protected the kingdom



## Feudalism



- Feudalism was a system

- Lords owned land

- Knights served lords

- Serfs worked the land



## Lords and Serfs



- Lords were powerful

- They owned land

- Serfs were workers

- They worked for lords



## Fun Activities



- Draw castles

- Learn about knights

- Make a timeline

- Write about medieval times



## Remember



- Medieval times were long ago

- Castles were important

- Knights were warriors

- Feudalism was the system!`,
      quizId: quizId++,
      assessmentType: 'quiz',
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



Let's learn about how people lived in medieval times!



## Medieval Villages



- Most people lived in villages

- Villages were small

- People worked together

- They farmed the land



## Medieval Farming



- Most people were farmers

- They grew crops

- They raised animals

- They worked hard



## Medieval Crafts



- Some people were craftspeople

- They made things by hand

- Blacksmiths made tools

- Weavers made cloth



## Medieval Markets



- People went to markets

- They bought and sold things

- Markets were important

- They were social places



## Medieval Homes



- Homes were simple

- Made of wood and mud

- Had thatched roofs

- Were small and dark



## Fun Activities



- Draw medieval villages

- Learn about farming

- Draw medieval homes

- Write about daily life



## Remember



- Most people were farmers

- Life was hard

- People worked together

- Villages were important!`,
      quizId: quizId++,
      assessmentType: 'quiz',
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



Let's learn about the Crusades!



## What Were the Crusades?



- The Crusades were wars

- They happened in the Middle Ages

- Christians fought Muslims

- They wanted control of the Holy Land



## Why They Happened



- The Holy Land was important

- Both sides wanted it

- They went to war

- Many crusades happened



## Knights Going to the Holy Land



- Knights traveled far

- They went to the Middle East

- They fought in battles

- It was a long journey



## Effects of the Crusades



- Many people died

- Countries changed

- People learned about other places

- Trade increased



## Fun Activities



- Learn about the Crusades

- Draw knights traveling

- Make a timeline

- Write about the effects



## Remember



- Crusades were wars

- They happened long ago

- They had big effects

- They changed history!`,
      quizId: quizId++,
      assessmentType: 'quiz',
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



Let's learn about the Renaissance!



## What Was the Renaissance?



- Renaissance means "rebirth"

- It was a time of new ideas

- It started in Italy

- It spread across Europe



## Renaissance Art



- Art became more realistic

- Artists used perspective

- Leonardo da Vinci was famous

- Michelangelo was famous too



## New Ideas and Learning



- People studied ancient texts

- They asked questions

- They made discoveries

- Learning increased



## Famous People



- Leonardo da Vinci - Artist and inventor

- Michelangelo - Artist and sculptor

- They created amazing art

- They were very talented



## Fun Activities



- Study Renaissance art

- Learn about famous people

- Make a timeline

- Write about the Renaissance



## Remember



- Renaissance was a rebirth

- Art and learning flourished

- Many famous people

- It changed the world!`,
      quizId: quizId++,
      assessmentType: 'quiz',
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



Let's learn about explorers and their journeys!



## Explorers



- Explorers traveled to new places

- They discovered new lands

- They were very brave

- They sailed across oceans



## Christopher Columbus



- Columbus sailed from Spain

- He wanted to reach Asia

- He found America instead

- He made important journeys



## Discovering New Lands



- Explorers found new continents

- They found new countries

- They met new people

- They changed the world



## Trade Routes



- Explorers found new trade routes

- They could trade with new places

- Trade increased

- Countries became richer



## New Foods



- Explorers brought new foods

- Potatoes came from America

- Tomatoes came from America

- Foods spread around the world



## Fun Activities



- Learn about explorers

- Draw their journeys

- Make a map

- Write about exploration



## Remember



- Explorers were brave

- They discovered new places

- They changed trade

- They changed the world!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'history',
      lessonNumber: 8,
      title: "The Reformation",
      emoji: '📖',
      content: `# The Reformation 📖



Let's learn about the Reformation!



## What Was the Reformation?



- The Reformation was a change

- It changed the church

- It started in the 1500s

- It was very important



## Martin Luther



- Martin Luther was a monk

- He questioned the church

- He wrote 95 theses

- He started the Reformation



## Changes in the Church



- The church split

- New churches formed

- People had different beliefs

- It changed religion



## Printing Press



- The printing press was invented

- Books could be made faster

- Ideas spread quickly

- It helped the Reformation



## New Ideas About Religion



- People questioned old ideas

- They read the Bible themselves

- They had new beliefs

- Religion changed



## Fun Activities



- Learn about Martin Luther

- Learn about the printing press

- Make a timeline

- Write about the Reformation



## Remember



- Reformation changed the church

- Martin Luther was important

- Printing press helped

- It was a time of change!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 1,
      title: "Scratch Programming Basics",
      emoji: '🎮',
      content: `# Scratch Programming Basics 🎮



Let's learn to program with Scratch!



## What is Scratch?



Scratch is a visual programming language where you use blocks to create programs.



## Getting Started



1. Open Scratch

2. You'll see a stage (where things happen)

3. You'll see sprites (characters)

4. You'll see blocks (code pieces)



## Basic Blocks



**Motion Blocks**

- Move 10 steps

- Turn 15 degrees

- Go to x: y:



**Looks Blocks**

- Say "Hello!"

- Change costume

- Show/Hide



**Events Blocks**

- When green flag clicked

- When sprite clicked

- When key pressed



## Your First Program



1. Drag "when green flag clicked"

2. Add "move 10 steps"

3. Click the green flag

4. Watch your sprite move!



## Practice



Create programs that:

- Make a sprite move

- Make a sprite say something

- Make a sprite change color

- Make a sprite follow the mouse



## Fun Activities



- Create simple animations

- Make interactive stories

- Build simple games

- Share your projects



## Remember



- Scratch uses blocks

- Drag and connect blocks

- Test your programs

- Programming is fun!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 2,
      title: "Digital Design",
      emoji: '🎨',
      content: `# Digital Design 🎨



Let's learn about designing on computers!



## What is Digital Design?



Digital design is creating graphics, images, and layouts using computers.



## Design Tools



- **Drawing tools** - Create shapes and lines

- **Color tools** - Choose and mix colors

- **Text tools** - Add words to designs

- **Layers** - Organize different parts



## Design Principles



**Color**

- Choose colors that work together

- Use color to show mood

- Don't use too many colors



**Layout**

- Arrange things nicely

- Leave space (white space)

- Make it easy to read



**Balance**

- Distribute elements evenly

- Make it look stable

- Create visual harmony



## Types of Design



- **Posters** - Advertise events

- **Logos** - Represent brands

- **Websites** - Show information

- **Games** - Create graphics



## Practice



Design:

- A poster for an event

- A logo for a club

- A birthday card

- A simple webpage layout



## Fun Activities



- Practice with design software

- Create different designs

- Get feedback

- Improve your designs



## Remember



- Design is about communication

- Keep it simple

- Use colors wisely

- Practice makes perfect!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 3,
      title: "Internet Safety",
      emoji: '🛡️',
      content: `# Internet Safety 🛡️



Let's learn to stay safe online!



## Why Internet Safety Matters



The internet is useful but we need to be careful and stay safe.



## Safety Rules



1. **Never share personal information**

 - Your full name

 - Your address

 - Your phone number

 - Your school name



2. **Don't talk to strangers**

 - Don't chat with people you don't know

 - Don't meet people from online

 - Tell a grown-up if someone contacts you



3. **Be careful what you share**

 - Think before posting

 - Don't share photos without permission

 - Remember: once online, always online



4. **Ask for help**

 - If something makes you uncomfortable

 - If you see something scary

 - If someone is mean to you



## Safe Websites



- Use approved websites

- Ask before visiting new sites

- Look for safety features

- Check with grown-ups



## Cyberbullying



- Don't be mean online

- Don't share mean messages

- Tell a grown-up if you're bullied

- Be kind to others



## Fun Activities



- Learn about safe websites

- Practice good online behavior

- Create safety posters

- Discuss online scenarios



## Remember



- Safety comes first

- Ask for help when needed

- Be kind online

- Use technology responsibly!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    })

  ];
}

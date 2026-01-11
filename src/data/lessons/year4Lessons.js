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
      title: 'Long Multiplication',
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
      title: 'Fractions and Decimals',
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
      title: 'Measurement and Units',
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
      title: 'Creative Writing',
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
      title: 'Poetry and Rhyme',
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
      title: 'Grammar: Verbs and Tenses',
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
      title: 'Ancient Greece',
      emoji: '🏛️',
      content: `# Ancient Greece 🏛️

Let's learn about ancient Greece!

## When Was Ancient Greece?

Ancient Greece existed from about 800 BC to 146 BC - a very long time ago!

## City-States

Greece was made up of city-states:

- **Athens** - Known for democracy and learning

- **Sparta** - Known for its strong army

- Each city-state was independent

## Democracy

- Athens created democracy

- People could vote on decisions

- Citizens had a say in government

- This influenced many countries

## Greek Gods and Myths

- Zeus - King of the gods

- Athena - Goddess of wisdom

- Poseidon - God of the sea

- Many famous myths and legends

## The Olympics

- Started in ancient Greece

- Held every four years

- Athletic competitions

- Still happens today!

## Fun Activities

- Draw Greek buildings

- Learn about Greek myths

- Make a timeline

- Write about Greek life

## Remember

- Ancient Greece was long ago

- They created democracy

- They had amazing stories

- They influenced the world!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'history',
      lessonNumber: 2,
      title: 'The Anglo-Saxons',
      emoji: '⚔️',
      content: `# The Anglo-Saxons ⚔️

Let's learn about the Anglo-Saxons!

## Who Were the Anglo-Saxons?

- They came from Germany, Denmark, and the Netherlands

- They settled in Britain after the Romans left

- They lived from about AD 410 to 1066

## Where Did They Live?

- They settled in England

- Created kingdoms like Wessex, Mercia, Northumbria

- Built villages and towns

- Farmed the land

## Anglo-Saxon Life

- Most people were farmers

- Lived in wooden houses

- Made beautiful jewelry and metalwork

- Had their own language (Old English)

## King Alfred the Great

- King of Wessex

- Fought against the Vikings

- Promoted learning and education

- One of England's greatest kings

## The Anglo-Saxon Chronicle

- A written record of events

- Started by King Alfred

- Tells us about Anglo-Saxon times

- Important historical source

## Fun Activities

- Draw Anglo-Saxon villages

- Learn about their art

- Make a timeline

- Write about Anglo-Saxon life

## Remember

- Anglo-Saxons came after Romans

- They settled in England

- They had their own culture

- They influenced English language!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'history',
      lessonNumber: 3,
      title: 'The Battle of Hastings',
      emoji: '⚔️',
      content: `# The Battle of Hastings ⚔️

Let's learn about this famous battle!

## When Did It Happen?

The Battle of Hastings happened on October 14, 1066.

## Who Fought?

- **Harold Godwinson** - English king

- **William the Conqueror** - Duke of Normandy (France)

## Why Did They Fight?

- Both claimed the English throne

- Harold was crowned king

- William said he was promised the throne

- They went to war

## What Happened?

- The battle lasted all day

- William's army won

- Harold was killed

- William became King of England

## The Bayeux Tapestry

- A long embroidered cloth

- Tells the story of the battle

- Made soon after the battle

- Still exists today!

## Results

- William became King of England

- Normans took over

- Changed English society

- Started a new era

## Fun Activities

- Draw the battle scene

- Make a timeline

- Learn about the Bayeux Tapestry

- Write about the battle

## Remember

- Battle was in 1066

- William the Conqueror won

- It changed English history

- It was a very important event!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year4',
      subjectId: 'technology',
      lessonNumber: 1,
      title: 'Scratch Programming Basics',
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
      title: 'Digital Design',
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
      title: 'Internet Safety',
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

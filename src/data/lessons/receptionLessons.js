import { Lesson } from '../../models/Lesson.js';

/**
 * Reception Lessons
 */
export function getReceptionLessons(startLessonId, startQuizId) {
  let lessonId = startLessonId;
  let quizId = startQuizId;

  return [
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'maths',
      lessonNumber: 1,
      title: "Recognising Numbers",
      emoji: '🔢',
      content: `# Recognising Numbers



Let's learn to recognise numbers!



## Numbers 1-5



1️⃣ One

2️⃣ Two

3️⃣ Three

4️⃣ Four

5️⃣ Five



## Practice



Point to the number 3!`,
      quizId: quizId++,
      assessmentType: 'challenge',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 1,
      title: "Phonics: Letter Sounds",
      emoji: '🔊',
      content: `# Phonics: Letter Sounds 🔤



Let's learn how letters make sounds!



## Basic Letter Sounds



**A** says /a/ like in apple 🍎

**B** says /b/ like in ball ⚽

**C** says /c/ like in cat 🐱

**D** says /d/ like in dog 🐶

**E** says /e/ like in egg 🥚



## Blending Sounds



When we put sounds together, we make words!



- C-A-T = Cat 🐱

- D-O-G = Dog 🐶

- H-A-T = Hat 🎩

- S-U-N = Sun ☀️



## Practice



Try reading these words:

- M-A-T

- P-A-T

- B-A-T

- R-A-T



## Fun Activities



- Sound out words together

- Find objects that start with each sound

- Play phonics games

- Read simple books



## Remember



- Letters make sounds

- Sounds blend to make words

- Practice every day!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 2,
      title: "Reading Simple Sentences",
      emoji: '📖',
      content: `# Reading Simple Sentences 📖



Let's read simple sentences together!



## Simple Sentences



The cat sat. 🐱

The dog ran. 🐶

I can hop. 🦘

We like to play. 🎮



## More Sentences



I see a sun. ☀️

The hat is red. 🎩

We go to school. 🏫

I like my toy. 🧸



## Reading Tips



1. Look at each word

2. Sound out the letters

3. Blend the sounds together

4. Read the whole sentence



## Fun Activities



- Read sentences together

- Draw pictures for sentences

- Make your own sentences

- Read simple storybooks



## Remember



- Sentences start with a capital letter

- Sentences end with a full stop

- Reading is fun!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'english',
      lessonNumber: 3,
      title: "Writing My Name",
      emoji: '✏️',
      content: `# Writing My Name ✏️



Let's learn to write your name!



## Your Name is Special



Your name is unique - it belongs to you!



## How to Write Your Name



1. Start with a capital letter

2. Write the rest in lowercase

3. Take your time

4. Practice makes perfect!



## Practice Writing



- Trace your name

- Copy your name

- Write your name from memory

- Write your name in different colors



## Fun Activities



- Write your name on paper

- Write your name in sand or playdough

- Make name cards

- Write your name on drawings



## Remember



- Your name is important

- Practice writing every day

- You can do it!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'history',
      lessonNumber: 1,
      title: "Dinosaurs - Big and Small",
      emoji: '🦖',
      content: `# Dinosaurs - Big and Small 🦖



Let's learn about different types of dinosaurs!



## Big Dinosaurs



**T-Rex** 🦖

- Very big and strong

- Had sharp teeth

- Was a meat eater

- Very scary!



**Triceratops** 🦏

- Had three horns

- Had a big frill

- Ate plants

- Was protected



**Brachiosaurus** 🦕

- Had a very long neck

- Was very tall

- Ate leaves from trees

- Was gentle



## Small Dinosaurs



- Some dinosaurs were small

- Some were as big as chickens

- They all lived together

- Long, long ago!



## Where Dinosaurs Lived



- Dinosaurs lived on land

- Some lived near water

- They lived all over the world

- They lived millions of years ago



## Why Dinosaurs Disappeared



- Something big happened

- The world changed

- Dinosaurs went away

- But we can still learn about them!



## Fun Activities



- Draw different dinosaurs

- Learn dinosaur names

- Make dinosaur sounds

- Pretend to be dinosaurs!



## Remember



- There were many types of dinosaurs

- Some were big, some were small

- They lived long ago

- We learn about them from fossils!`,
      quizId: null,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'history',
      lessonNumber: 2,
      title: "The Story of Adam and Eve",
      emoji: '🌳',
      content: `# The Story of Adam and Eve 🌳



Let's learn more about Adam and Eve's story!



## The Beautiful Garden



- Adam and Eve lived in a beautiful garden 🌳

- The garden was called Eden

- It was a perfect place

- Everything was good and happy



## Life in the Garden



- Adam and Eve took care of the garden

- They could eat from many trees

- They were happy together

- They lived peacefully



## The First Children



- Adam and Eve had children

- Their first sons were Cain and Abel

- They were the first family

- The family grew bigger!



## Learning from the Story



- Adam and Eve were the first people

- They lived in a beautiful place

- They had a family

- This is a special story!



## Fun Activities



- Draw the garden of Eden

- Talk about the story

- Learn about Adam and Eve

- Draw the first family



## Remember



- Adam and Eve were the first people

- They lived in a beautiful garden

- They had children

- This is an important story!`,
      quizId: null,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'history',
      lessonNumber: 3,
      title: "Noah's Ark - A Big Boat",
      emoji: '🚢',
      content: `# Noah's Ark - A Big Boat 🚢



Let's learn about Noah and his big boat!



## The Story of Noah



- Noah was a good man

- God told him to build a big boat

- The boat was called an ark

- It was very, very big!



## Building the Ark



- Noah built the ark

- It was made of wood

- It was huge!

- It had rooms for animals



## Animals Coming in Pairs



- Two of every animal came 🐘🐘

- Lions, elephants, birds, and more

- They all came to the ark

- They came in pairs - two of each!



## The Rain and the Flood



- It rained and rained

- Water covered everything

- The ark floated on the water

- Everyone was safe inside



## The Rainbow Promise



- After the rain stopped

- A beautiful rainbow appeared 🌈

- It was a promise

- A promise that it wouldn't flood again



## Fun Activities



- Draw Noah's ark

- Draw animals going into the ark

- Draw a rainbow

- Act out the story



## Remember



- Noah built a big boat

- Animals came in pairs

- The rainbow was a promise

- This is a special story!`,
      quizId: null,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'history',
      lessonNumber: 4,
      title: "Ancient Stories - The First Cities",
      emoji: '🏛️',
      content: `# Ancient Stories - The First Cities 🏛️



Long, long ago, people started living in cities!



## What is a City?



- A city is a place where many people live together

- Cities have lots of houses

- Cities have places to work

- Cities have places to play



## The First Cities



- Long, long ago, people built the first cities

- They were very different from today

- They were smaller

- But they were still cities!



## People Living Together



- In cities, people lived close together

- They helped each other

- They worked together

- They built things together



## Simple Buildings



- The first buildings were simple

- They were made of mud and stone

- They were different from today

- But they were homes!



## Fun Activities



- Draw a simple city

- Talk about what cities need

- Draw buildings

- Learn about the first cities



## Remember



- Cities are places where many people live

- The first cities were long ago

- People lived together

- Cities are important!`,
      quizId: null,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'history',
      lessonNumber: 5,
      title: "Life Long Ago",
      emoji: '🏠',
      content: `# Life Long Ago 🏠



Life was very different long ago!



## How People Lived



- People lived in different houses 🏠

- Houses were simpler

- No electricity

- No running water



## Different Houses



- Houses were made of different materials

- Some were made of wood

- Some were made of mud

- They were smaller than today



## No Electricity



- There was no electricity

- People used candles for light 🕯️

- They used fireplaces for warmth

- Life was different!



## Different Clothes



- People wore different clothes

- Clothes were simpler

- Made by hand

- Different from today



## Fun Activities



- Compare old and new houses

- Draw a house from long ago

- Talk about how life changed

- Learn about the past



## Remember



- Life was different long ago

- Houses were different

- No electricity

- We can learn about the past!`,
      quizId: 44,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'history',
      lessonNumber: 6,
      title: "Famous People from Stories",
      emoji: '👑',
      content: `# Famous People from Stories 👑



Let's learn about famous people from stories!



## Kings and Queens



- Kings and queens from stories 👑

- They were important people

- They ruled over lands

- They are in many stories



## Brave Heroes



- Brave heroes from stories ⚔️

- They did brave things

- They helped others

- They are remembered



## Kind Helpers



- Kind helpers from stories 💝

- They helped people

- They were good

- They are remembered



## People Who Did Good Things



- People who did good things 🌟

- They helped others

- They made the world better

- We remember them



## Fun Activities



- Draw famous people from stories

- Act out stories

- Write about your favorite

- Learn about brave people



## Remember



- Famous people did important things

- We can learn from their stories

- History is full of interesting people

- Stories teach us lessons!`,
      quizId: 43,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'technology',
      lessonNumber: 1,
      title: "Digital Drawing",
      emoji: '🎨',
      content: `# Digital Drawing 🎨

Draw a square on the canvas!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'technology',
      lessonNumber: 2,
      title: "Digital Drawing",
      emoji: '🎨',
      content: `# Digital Drawing 🎨

Draw a triangle on the canvas!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'technology',
      lessonNumber: 3,
      title: "Digital Drawing",
      emoji: '🎨',
      content: `# Digital Drawing 🎨

Draw a rectangle on the canvas!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'technology',
      lessonNumber: 4,
      title: "Digital Drawing",
      emoji: '🎨',
      content: `# Digital Drawing 🎨

Draw a pentagon on the canvas!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'technology',
      lessonNumber: 5,
      title: "Digital Drawing",
      emoji: '🎨',
      content: `# Digital Drawing 🎨

Draw a hexagon on the canvas!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'technology',
      lessonNumber: 6,
      title: "Digital Drawing",
      emoji: '🎨',
      content: `# Digital Drawing 🎨

Draw an octagon on the canvas!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    })

  ];
}

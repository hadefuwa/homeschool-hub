import { Lesson } from '../../models/Lesson.js';

/**
 * Art Lessons - Drawing activities with TTS prompts
 */
export function getArtLessons(startLessonId) {
  let lessonId = startLessonId;

  return [
    // Nursery Art Lessons
    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'art',
      lessonNumber: 1,
      title: "Draw a Happy Sun",
      emoji: '☀️',
      assessmentType: 'drawing',
      content: `# Draw a Happy Sun ☀️

Today we'll create a beautiful sun drawing!

## What to Draw:
- A big yellow circle for the sun
- Rays coming out from the sun
- A happy face on the sun

Use your favorite colors and have fun! 🎨`,
      drawingPrompt: "Draw a big, happy sun with rays of light coming out",
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'art',
      lessonNumber: 2,
      title: "Draw Your Family",
      emoji: '👨‍👩‍👧‍👦',
      assessmentType: 'drawing',
      content: `# Draw Your Family 👨‍👩‍👧‍👦

Create a special drawing of your family!

## What to Draw:
- Draw yourself
- Draw your mom and dad
- Draw your brothers or sisters
- Draw your pets if you have any

Remember, everyone is special and unique! 💖`,
      drawingPrompt: "Draw a picture of your family. Show everyone who lives in your house",
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'art',
      lessonNumber: 3,
      title: "Draw a Rainbow",
      emoji: '🌈',
      assessmentType: 'drawing',
      content: `# Draw a Rainbow 🌈

Let's paint a colorful rainbow!

## Rainbow Colors (in order):
1. Red
2. Orange
3. Yellow
4. Green
5. Blue
6. Purple

Use bright colors to make it beautiful! ✨`,
      drawingPrompt: "Draw a beautiful rainbow with all the colors. Red, orange, yellow, green, blue, and purple",
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'nursery',
      subjectId: 'art',
      lessonNumber: 4,
      title: "Draw Your Favorite Animal",
      emoji: '🐶',
      assessmentType: 'drawing',
      content: `# Draw Your Favorite Animal 🐶

What animal do you like the most?

## Ideas:
- A dog or cat
- A lion or tiger
- A bird or fish
- An elephant or giraffe
- Any animal you love!

Draw your favorite and make it colorful! 🎨`,
      drawingPrompt: "Draw your favorite animal. It can be any animal you like",
      quizId: null,
      categoryId: null,
    }),

    // Reception Art Lessons
    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'art',
      lessonNumber: 1,
      title: "Draw a House",
      emoji: '🏠',
      assessmentType: 'drawing',
      content: `# Draw a House 🏠

Let's draw a cozy house!

## What to Include:
- Four walls
- A roof
- A door
- Windows
- Maybe a chimney with smoke
- Trees or flowers around it

Make it your dream house! 🌟`,
      drawingPrompt: "Draw a house with a roof, door, and windows. Add trees or flowers if you like",
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'art',
      lessonNumber: 2,
      title: "Draw a Tree in Each Season",
      emoji: '🌳',
      assessmentType: 'drawing',
      content: `# Draw a Tree in Each Season 🌳

Draw what a tree looks like in different seasons!

## The Seasons:
- **Spring**: New green leaves, flowers
- **Summer**: Full green leaves
- **Autumn**: Orange, red, yellow leaves falling
- **Winter**: Bare branches, maybe snow

You can draw one tree or four different trees! 🍂`,
      drawingPrompt: "Draw a tree showing different seasons. Spring with new leaves, summer with green leaves, autumn with colorful leaves, and winter",
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'art',
      lessonNumber: 3,
      title: "Draw Underwater Scene",
      emoji: '🐠',
      assessmentType: 'drawing',
      content: `# Draw an Underwater Scene 🐠

Create an amazing underwater world!

## What to Draw:
- Fish of different colors
- A friendly octopus or crab
- Seaweed and coral
- Bubbles floating up
- Maybe a treasure chest
- A smiling whale

Make it colorful and fun! 🌊`,
      drawingPrompt: "Draw an underwater scene with fish, coral, and sea creatures",
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'reception',
      subjectId: 'art',
      lessonNumber: 4,
      title: "Draw Your Favorite Food",
      emoji: '🍕',
      assessmentType: 'drawing',
      content: `# Draw Your Favorite Food 🍕

What's your favorite thing to eat?

## Ideas:
- Pizza with toppings
- Ice cream cone
- Fruit basket
- Birthday cake
- Sandwich
- Your favorite meal

Make it look delicious! 😋`,
      drawingPrompt: "Draw your favorite food. Make it look yummy and colorful",
      quizId: null,
      categoryId: null,
    }),

    // Year 1 Art Lessons
    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'art',
      lessonNumber: 1,
      title: "Draw a Space Scene",
      emoji: '🚀',
      assessmentType: 'drawing',
      content: `# Draw a Space Scene 🚀

Blast off to outer space with your drawing!

## What to Include:
- Planets of different sizes
- Stars and a moon
- A rocket ship
- An astronaut
- Colorful nebula clouds
- Maybe aliens!

Use your imagination! 🌟`,
      drawingPrompt: "Draw a space scene with planets, stars, a rocket ship, and an astronaut exploring",
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'art',
      lessonNumber: 2,
      title: "Draw a Castle",
      emoji: '🏰',
      assessmentType: 'drawing',
      content: `# Draw a Castle 🏰

Create a magnificent castle!

## Castle Features:
- Tall towers
- A drawbridge
- Flags on top
- Windows
- A moat with water
- Maybe a dragon or knight

Be creative with your castle design! ⚔️`,
      drawingPrompt: "Draw a grand castle with towers, a drawbridge, and flags",
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'art',
      lessonNumber: 3,
      title: "Draw a Garden Full of Flowers",
      emoji: '🌺',
      assessmentType: 'drawing',
      content: `# Draw a Garden Full of Flowers 🌺

Create a beautiful flower garden!

## What to Draw:
- Different types of flowers (roses, daisies, tulips)
- Green grass and leaves
- Butterflies and bees
- Maybe a garden path
- A watering can or gardening tools
- A happy sun in the sky

Use lots of bright colors! 🦋`,
      drawingPrompt: "Draw a beautiful garden filled with colorful flowers, butterflies, and bees",
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year1',
      subjectId: 'art',
      lessonNumber: 4,
      title: "Draw a Magical Forest",
      emoji: '🌲',
      assessmentType: 'drawing',
      content: `# Draw a Magical Forest 🌲

Create an enchanted forest scene!

## What to Include:
- Tall trees with thick trunks
- A winding path
- Mushrooms and flowers
- Forest animals (deer, rabbits, birds)
- Maybe fairies or magical creatures
- Sunshine through the trees

Make it magical and mysterious! ✨`,
      drawingPrompt: "Draw a magical forest with tall trees, a path, animals, and maybe some magical creatures",
      quizId: null,
      categoryId: null,
    }),

    // Year 2 Art Lessons
    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'art',
      lessonNumber: 1,
      title: "Draw a Dinosaur World",
      emoji: '🦕',
      assessmentType: 'drawing',
      content: `# Draw a Dinosaur World 🦕

Travel back in time to when dinosaurs roamed!

## What to Draw:
- Different types of dinosaurs (T-Rex, Brachiosaurus, Triceratops)
- Prehistoric plants and trees
- A volcano in the background
- Dinosaur eggs
- Flying pterodactyls
- A prehistoric landscape

Make it exciting! 🦖`,
      drawingPrompt: "Draw a dinosaur world with different dinosaurs, prehistoric plants, and a volcano",
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'art',
      lessonNumber: 2,
      title: "Draw a City Skyline",
      emoji: '🏙️',
      assessmentType: 'drawing',
      content: `# Draw a City Skyline 🏙️

Create a bustling city scene!

## What to Include:
- Tall buildings and skyscrapers
- Windows in the buildings
- Cars on the roads
- Maybe a park or trees
- People walking
- The sun or moon in the sky

Show a busy city! 🚗`,
      drawingPrompt: "Draw a city skyline with tall buildings, roads, cars, and people",
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'art',
      lessonNumber: 3,
      title: "Draw a Farm Scene",
      emoji: '🚜',
      assessmentType: 'drawing',
      content: `# Draw a Farm Scene 🚜

Create a peaceful farm picture!

## Farm Elements:
- A red barn
- Farm animals (cows, pigs, chickens, sheep)
- A tractor or farmer
- Crops growing in fields
- A fence
- Maybe a windmill or silo

Show life on the farm! 🐄`,
      drawingPrompt: "Draw a farm with a barn, animals like cows and chickens, a farmer, and crops",
      quizId: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'art',
      lessonNumber: 4,
      title: "Draw a Sports Day",
      emoji: '⚽',
      assessmentType: 'drawing',
      content: `# Draw a Sports Day ⚽

Show your favorite sports and activities!

## What to Draw:
- People playing different sports
- A soccer ball, basketball, or other equipment
- A sports field or court
- Spectators cheering
- Trophies or medals
- Action and movement

Show the excitement of sports! 🏃`,
      drawingPrompt: "Draw people playing your favorite sports with balls, equipment, and action",
      quizId: null,
      categoryId: null,
    }),
  ];
}

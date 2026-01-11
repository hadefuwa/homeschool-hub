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
      title: 'Multiplication Tables',
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
      title: 'Division Basics',
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
      title: 'Fractions Introduction',
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
      title: 'Writing Paragraphs',
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
      title: 'Reading Comprehension Skills',
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
      title: 'Spelling and Vocabulary',
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
      title: 'The Stone Age',
      emoji: '🪨',
      content: `# The Stone Age 🪨

Let's learn about the earliest period of human history!

## When Was the Stone Age?

The Stone Age was a very long time ago - thousands of years before written history!

## Three Periods

1. **Paleolithic** (Old Stone Age) - Early humans, cave dwellers

2. **Mesolithic** (Middle Stone Age) - Better tools, hunting

3. **Neolithic** (New Stone Age) - Farming began, settlements

## How People Lived

- Lived in caves or simple shelters

- Hunted animals for food

- Gathered fruits and plants

- Made tools from stone

- Used fire for cooking and warmth

## Stone Age Tools

- **Hand axes** - For cutting and chopping

- **Spears** - For hunting

- **Scrapers** - For preparing animal skins

- **Arrowheads** - For hunting

## Fun Activities

- Draw Stone Age people

- Make a timeline

- Write about Stone Age life

- Learn about cave paintings

## Remember

- Stone Age was very long ago

- People used stone tools

- They were hunters and gatherers

- It was the beginning of human history!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'history',
      lessonNumber: 2,
      title: 'The Vikings',
      emoji: '⚔️',
      content: `# The Vikings ⚔️

Let's learn about the Vikings!

## Who Were the Vikings?

- Vikings came from Scandinavia (Norway, Sweden, Denmark)

- They were skilled sailors and warriors

- They explored and settled in many places

- They lived from about AD 800 to 1100

## Viking Ships

- Longships were fast and strong

- They could sail in shallow water

- Vikings could travel long distances

- They were excellent sailors

## Where Did They Go?

- **Britain** - Raided and settled

- **Iceland** - Established settlements

- **Greenland** - Founded colonies

- **North America** - Reached before Columbus!

## Viking Life

- They were farmers and traders

- They had their own religion (Norse gods)

- They were skilled craftspeople

- They told stories called sagas

## Fun Activities

- Draw Viking ships

- Make a map of Viking travels

- Write about Viking life

- Learn about Norse mythology

## Remember

- Vikings were from Scandinavia

- They were excellent sailors

- They explored many places

- They had a rich culture!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'history',
      lessonNumber: 3,
      title: 'The Tudors',
      emoji: '👑',
      content: `# The Tudors 👑

Let's learn about the Tudor period!

## When Was the Tudor Period?

The Tudors ruled England from 1485 to 1603.

## Famous Tudor Monarchs

**Henry VIII**

- Ruled from 1509 to 1547

- Had six wives

- Created the Church of England

- Built many palaces

**Elizabeth I**

- Ruled from 1558 to 1603

- Known as the "Virgin Queen"

- England's "Golden Age"

- Defeated the Spanish Armada

## Tudor Life

- Most people were farmers

- Towns and cities grew

- Trade increased

- Exploration expanded

## Tudor Houses

- Rich people: Large houses with many rooms

- Poor people: Small, simple houses

- Made of wood and wattle and daub

- Had thatched roofs

## Fun Activities

- Draw Tudor houses

- Make a timeline of Tudor monarchs

- Write about Tudor life

- Learn about Tudor fashion

## Remember

- Tudors ruled 1485-1603

- Henry VIII and Elizabeth I were famous

- Life was very different then

- It was an important time in history!`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    // Fusion 360 Lessons - Technology Subject
    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'technology',
      categoryId: 'fusion360',
      lessonNumber: 1,
      title: 'Fusion 360 Step 1: User Interface',
      emoji: '🖥️',
      content: `# Fusion 360 Step 1: User Interface

## Learn Autodesk Fusion - User Interface (2025/2026)

**Topic**: Introduction to the canvas, toolbar, data panel, and navigation.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=zxfOqjqIZfc&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=1&pp=iAQB)

This lesson introduces you to the Fusion 360 interface and navigation.

## What is Fusion 360?

Fusion 360 is a cloud-based 3D CAD (Computer-Aided Design), CAM (Computer-Aided Manufacturing), and CAE (Computer-Aided Engineering) software platform. It's used to design, test, and manufacture products.

## Key Features

- **3D Modeling**: Create complex 3D models and assemblies
- **Cloud-Based**: Access your designs from anywhere
- **Collaboration**: Share and collaborate with team members
- **Simulation**: Test your designs before manufacturing
- **Manufacturing**: Generate toolpaths for CNC machines and 3D printers

## Getting Started

### Interface Overview

The Fusion 360 interface consists of:

1. **Application Bar**: Top menu with File, Tools, and Help
2. **Toolbar**: Context-sensitive tools for your current workspace
3. **Browser**: Shows your design history and components
4. **ViewCube**: Navigate and orient your view
5. **Timeline**: Shows your design history and allows you to edit past actions

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
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'technology',
      categoryId: 'fusion360',
      lessonNumber: 2,
      title: 'Fusion 360 Step 2: Sketching',
      emoji: '✏️',
      content: `# Fusion 360 Step 2: Sketching

## Fusion Sketching Explained: How to Build Clean, Accurate Designs (Step 2)

**Topic**: 2D sketching basics, constraints, and dimensions.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=YVSURhX8Qu0&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=2&pp=iAQB)

## What is a Sketch?

A sketch is a 2D drawing that forms the foundation of 3D models. In Fusion 360, you create 3D objects by starting with 2D sketches and then extruding, revolving, or sweeping them.

## Creating a Sketch

1. Click "Create Sketch" in the toolbar
2. Select a plane (XY, XZ, or YZ) or a face on an existing object
3. The sketch environment activates

## Sketch Tools

### Line Tool

Creates straight lines between two points.

- Click to set start point
- Click again to set end point
- Press Escape to finish

### Rectangle Tool

Creates rectangles quickly.

- **2-Point Rectangle**: Click two opposite corners
- **3-Point Rectangle**: Define width, then height
- **Center Rectangle**: Click center, then corner

### Circle Tool

Creates circles.

- **Center Diameter**: Click center, drag to set radius
- **2-Point Circle**: Click two points on the circle
- **3-Point Circle**: Click three points

### Arc Tool

Creates curved segments.

- **3-Point Arc**: Start, end, and point on arc
- **Center Point Arc**: Center, start, end

## Constraints

Constraints define relationships between sketch elements:

- **Horizontal/Vertical**: Aligns lines to axes
- **Coincident**: Makes points touch
- **Parallel/Perpendicular**: Sets line relationships
- **Tangent**: Makes curves touch smoothly
- **Equal**: Makes dimensions the same
- **Dimension**: Sets exact measurements

## Dimensioning

Add dimensions to control sizes:

1. Click "Dimension" tool
2. Select the element to dimension
3. Click where to place the dimension
4. Enter the value

## Example: Drawing a Square

1. Create a new sketch on the XY plane
2. Use Rectangle tool to draw a rectangle
3. Add Equal constraint to make it square
4. Add Dimension to set size (e.g., 50mm)
5. Click "Finish Sketch"

## Important Notes

- Sketches must be fully constrained (black) before extruding
- Blue elements are under-constrained
- Red elements have conflicts
- Always finish your sketch before creating 3D features`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'technology',
      categoryId: 'fusion360',
      lessonNumber: 3,
      title: 'Fusion 360 Step 3: Extrude & Fillets',
      emoji: '📦',
      content: `# Fusion 360 Step 3: Extrude & Fillets

## Learn Autodesk Fusion - Extrude & Fillets (Step 3)

**Topic**: Turning sketches into 3D shapes.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=jk4UbpjCPVI&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=3&pp=iAQB)

## What is Extrude?

Extrude is the most fundamental 3D operation. It takes a 2D sketch and extends it into the third dimension, creating a 3D solid.

## Extrude Tool

Located in the Create menu, Extrude converts sketches into 3D objects.

## Types of Extrusion

### New Body

Creates a new separate solid body.

### Join

Adds material to an existing body.

### Cut

Removes material from an existing body.

### Intersect

Keeps only the overlapping volume.

## Extrusion Options

### Distance

Extrudes a specific distance in one direction.

- **One Side**: Extrudes in one direction only
- **Two Sides**: Extrudes equally in both directions
- **Symmetric**: Same as two sides

### To Object

Extrudes until it reaches another object or face.

### All

Extrudes through all objects in the path.

## Example: Creating a Box

1. Create a sketch with a rectangle (50mm x 30mm)
2. Finish the sketch
3. Click "Extrude"
4. Select the rectangle
5. Set distance to 20mm
6. Click OK

Result: A 50mm x 30mm x 20mm box!

## Other Basic 3D Features

### Revolve

Rotates a sketch around an axis to create cylindrical objects.

### Sweep

Moves a profile along a path.

### Loft

Creates a smooth transition between multiple profiles.

## Modifying Extrusions

After creating an extrude, you can:

- Edit it from the timeline
- Change the distance
- Switch between Join, Cut, and New Body
- Adjust the direction

## Best Practices

- Always fully constrain sketches before extruding
- Use descriptive names for your features
- Keep sketches simple - one feature per sketch when possible
- Use the timeline to edit past operations

## Important Notes

- Extrude only works on closed profiles (no gaps)
- Open profiles can be used for surfaces
- The direction arrow shows extrusion direction
- Negative distances extrude in opposite direction`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'technology',
      categoryId: 'fusion360',
      lessonNumber: 4,
      title: 'Fusion 360 Step 4: Sweeps & Construction Lines',
      emoji: '📐',
      content: `# Fusion 360 Step 4: Sweeps & Construction Lines

## Learn Autodesk Fusion - Sweeps & Construction Lines (Step 4)

**Topic**: Creating complex pipes or rails using the Sweep command.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=RN41OedpMJ4&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=4&pp=iAQB)

## Understanding Constraints

Constraints are rules that control how sketch elements relate to each other. They ensure your sketch behaves predictably when you make changes.

## Geometric Constraints

These control the shape and relationships:

### Horizontal/Vertical

Forces lines to be perfectly horizontal or vertical.

### Parallel

Makes two or more lines parallel to each other.

### Perpendicular

Makes two lines meet at a 90-degree angle.

### Tangent

Makes a line or arc touch a curve smoothly.

### Coincident

Makes points or endpoints touch.

### Midpoint

Places a point at the middle of a line.

### Concentric

Makes circles or arcs share the same center point.

### Equal

Makes selected elements the same size.

### Symmetric

Makes elements mirror each other across a line.

## Dimensional Constraints

These control the size:

### Dimension Tool

Sets exact measurements.

- **Linear Dimension**: Distance between two points
- **Angular Dimension**: Angle between two lines
- **Radial Dimension**: Radius of circles/arcs
- **Diameter Dimension**: Diameter of circles

## Constraint Colors

- **Black**: Fully constrained (locked in place)
- **Blue**: Under-constrained (can still move)
- **Red**: Over-constrained (conflicts exist)
- **Orange**: Driven dimension (calculated, not set)

## Fully Constraining Sketches

A fully constrained sketch is black and cannot move. This is ideal because:

- Prevents accidental changes
- Makes your design predictable
- Required for parametric modeling

## Example: Constraining a Rectangle

1. Draw a rectangle (currently blue - under-constrained)
2. Add Horizontal constraint to top and bottom lines
3. Add Vertical constraint to side lines
4. Add Equal constraint to make it square
5. Add Dimension to set size (50mm)
6. Sketch turns black - fully constrained!

## Over-Constraining

Too many constraints create conflicts:

- Fusion 360 shows red elements
- You must remove conflicting constraints
- Check the warning message for guidance

## Best Practices

1. Add geometric constraints first
2. Then add dimensions
3. Constrain in logical order
4. Use constraints instead of dimensions when possible
5. Keep sketches simple and organized

## Important Notes

- Constraints are essential for parametric design
- Fully constrained sketches are more reliable
- You can delete constraints from the browser
- Use "Show Constraints" to see all active constraints`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'technology',
      categoryId: 'fusion360',
      lessonNumber: 5,
      title: 'Fusion 360 Step 5: Revolve & Splines',
      emoji: '🌀',
      content: `# Fusion 360 Step 5: Revolve & Splines

## Learn Autodesk Fusion - Revolve & Splines (Step 5)

**Topic**: Creating rounded/cylindrical objects and using reference images.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=jlJNlLaslrk&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=5&pp=iAQB)

## What is Revolve?

Revolve rotates a 2D profile around an axis to create cylindrical, spherical, or toroidal (donut-shaped) objects.

## When to Use Revolve

Perfect for creating:

- Cylinders and tubes
- Bowls and cups
- Wheels and pulleys
- Bottles and containers
- Any rotationally symmetric object

## Revolve Tool

Located in the Create menu, similar to Extrude but creates rotational geometry.

## Creating a Revolve

1. Create a sketch with a profile (half the cross-section)
2. Draw an axis line (centerline) for rotation
3. Finish the sketch
4. Click "Revolve"
5. Select the profile
6. Select the axis
7. Set the angle (usually 360°)
8. Click OK

## Revolve Options

### Angle

- **360°**: Full rotation (most common)
- **Custom Angle**: Partial rotation (e.g., 90°, 180°)
- **To Object**: Revolve until reaching another object

### Operation Types

- **New Body**: Creates new solid
- **Join**: Adds to existing body
- **Cut**: Removes material
- **Intersect**: Keeps overlapping volume

## Example: Creating a Cylinder

1. Create sketch on XZ plane
2. Draw a rectangle (width = radius, height = cylinder height)
3. Draw a vertical line on the left as the axis
4. Finish sketch
5. Revolve the rectangle around the axis
6. Set angle to 360°
7. Result: Perfect cylinder!

## Example: Creating a Bowl

1. Create sketch on XZ plane
2. Draw the bowl profile (curved line)
3. Draw horizontal axis line at the top
4. Finish sketch
5. Revolve around the axis
6. Set angle to 360°
7. Result: Bowl shape!

## Important Rules

- The profile must not cross the axis
- Only one side of the axis should have the profile
- The axis can be a line in the sketch or an edge of the model
- Profile must be closed for solid bodies

## Combining Revolve with Other Features

You can:

- Revolve to create base shape
- Then extrude to add features
- Use Cut operation to remove material
- Create complex rotational parts

## Best Practices

- Always include the axis in your sketch
- Use construction lines for the axis
- Keep profiles simple
- Consider the final orientation of your part

## Important Notes

- Revolve creates rotationally symmetric objects
- The axis determines the center of rotation
- 360° creates complete objects
- Partial angles create segments`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'technology',
      categoryId: 'fusion360',
      lessonNumber: 6,
      title: 'Fusion 360 Step 6: Extruded Cuts & Circular Patterns',
      emoji: '🔧',
      content: `# Fusion 360 Step 6: Extruded Cuts & Circular Patterns

## Learn Autodesk Fusion - Extruded Cuts & Circular Patterns (Step 6)

**Topic**: Removing material and repeating features in a circle.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=E-fs6jrdct0&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=6&pp=iAQB)

## What are Fillets and Chamfers?

Fillets and chamfers are edge modifications that make parts safer, stronger, and easier to manufacture.

## Fillet

A fillet creates a rounded corner or edge by adding material in a curved shape.

### Uses:

- Remove sharp edges (safety)
- Strengthen corners (reduce stress)
- Improve appearance
- Make parts easier to handle

## Chamfer

A chamfer creates a beveled (angled) edge by cutting material at an angle.

### Uses:

- Remove sharp edges
- Help with assembly (easier insertion)
- Reduce stress concentrations
- Create decorative edges

## Fillet Tool

Located in the Modify menu.

### Types:

- **Constant Radius**: Same radius along entire edge
- **Variable Radius**: Different radii at different points
- **Face Fillet**: Fillets between two faces

### Selecting Edges:

- Click individual edges
- Or select a face to fillet all its edges
- Hold Shift to add more edges

## Chamfer Tool

Also in the Modify menu.

### Types:

- **Distance**: Cuts equal distance on both sides
- **Distance and Angle**: Sets distance and angle
- **Two Distances**: Different distances on each side

## Example: Adding Fillets

1. Create a box (50mm x 30mm x 20mm)
2. Click "Fillet" tool
3. Select the edges you want to round
4. Set radius (e.g., 5mm)
5. Click OK

Sharp edges become smooth and rounded!

## Example: Adding Chamfers

1. Create a box
2. Click "Chamfer" tool
3. Select the edges
4. Set distance (e.g., 3mm)
5. Click OK

Sharp edges become beveled!

## Best Practices

### Fillets:

- Use larger radii for strength
- Smaller radii for appearance
- Apply to all sharp edges for safety
- Consider manufacturing constraints

### Chamfers:

- Use for assembly features
- Smaller chamfers for appearance
- Larger chamfers for functional purposes
- Consider the angle (usually 45°)

## Common Mistakes

- Making fillets/chamfers too large (weakens part)
- Forgetting to fillet internal corners
- Applying to wrong edges
- Not considering manufacturing limits

## Order of Operations

Apply fillets and chamfers:

- After main features are created
- Before final details
- In logical order (largest to smallest)
- Consider how they interact

## Important Notes

- Fillets add material, chamfers remove material
- Both improve part safety and manufacturability
- Can be applied to edges or faces
- Can be edited from the timeline
- Radius/distance can be changed later`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'technology',
      categoryId: 'fusion360',
      lessonNumber: 7,
      title: 'Fusion 360 Step 7: Lofts & Offset Planes',
      emoji: '🪞',
      content: `# Fusion 360 Step 7: Lofts & Offset Planes

## Learn Autodesk Fusion - Lofts & Offset Planes (Step 7)

**Topic**: Blending shapes together using Lofts.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=qKZBlH22-gY&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=7&pp=iAQB0gcJCU0KAYcqIYzv)

## What are Patterns?

Patterns create multiple copies of features, bodies, or components in an organized way. This saves time and ensures consistency.

## Types of Patterns

### Rectangular Pattern

Creates copies in rows and columns.

### Circular Pattern

Creates copies arranged in a circle.

### Path Pattern

Creates copies along a curve or edge.

## Rectangular Pattern

Creates a grid of copies.

### Steps:

1. Select the feature or body to pattern
2. Click "Rectangular Pattern"
3. Choose direction 1 (first direction)
4. Set number of instances
5. Set spacing
6. Choose direction 2 (optional, for 2D grid)
7. Click OK

### Example: Creating a Grid of Holes

1. Create one hole
2. Rectangular pattern
3. Direction 1: 5 instances, 20mm spacing
4. Direction 2: 3 instances, 15mm spacing
5. Result: 15 holes in a grid!

## Circular Pattern

Creates copies arranged around a center point.

### Steps:

1. Select feature or body
2. Click "Circular Pattern"
3. Select axis (center of rotation)
4. Set number of instances
5. Set angle (usually 360°)
6. Click OK

### Example: Creating Wheel Spokes

1. Create one spoke
2. Circular pattern
3. Select center axis
4. 8 instances
5. 360° angle
6. Result: 8 evenly spaced spokes!

## Path Pattern

Creates copies along a curve.

### Steps:

1. Select feature or body
2. Click "Path Pattern"
3. Select the path (curve or edge)
4. Set spacing or number of instances
5. Click OK

## Mirror Tool

Creates a mirror copy across a plane.

### When to Use:

- Symmetric parts
- Duplicating features
- Creating left/right versions

### Steps:

1. Select feature, body, or component
2. Click "Mirror"
3. Select mirror plane
4. Click OK

## Pattern Options

### Instance Count

Number of copies to create (includes original).

### Spacing

Distance between instances.

### Suppress

Temporarily hide instances without deleting.

### Adjust

Modify spacing or count after creation.

## Best Practices

- Use patterns instead of manually copying
- Ensure pattern direction is correct
- Check spacing for manufacturing
- Use suppress to test different counts
- Patterns can be edited from timeline

## Common Uses

- **Holes**: Pattern of mounting holes
- **Ribs**: Structural supports
- **Teeth**: Gears and sprockets
- **Decorative**: Repeated features
- **Fasteners**: Multiple screw locations

## Important Notes

- Patterns maintain relationships to original
- Editing original updates all instances
- Can pattern patterns (nested patterns)
- Mirror creates independent copy
- Patterns improve design efficiency`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'technology',
      categoryId: 'fusion360',
      lessonNumber: 8,
      title: 'Fusion 360 Step 8: Emboss & Text',
      emoji: '🔩',
      content: `# Fusion 360 Step 8: Emboss & Text

## Learn Autodesk Fusion - Emboss & Text (Step 8)

**Topic**: Adding text or logos onto curved surfaces.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=SG8GD8De6xA&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=8&pp=iAQB)

## What is an Assembly?

An assembly is a collection of components (parts) that work together. Each component can move and interact with others.

## Components vs Bodies

- **Body**: A single solid object within a component
- **Component**: A container that can hold bodies and move independently
- **Assembly**: Multiple components working together

## Creating Components

1. Design your part
2. Right-click in browser
3. Select "Create Component"
4. Name your component
5. Move bodies into the component

## Joints

Joints define how components move relative to each other.

## Types of Joints

### Rigid Joint

Components are fixed together (no movement).

### Revolute Joint

Rotation around one axis (like a hinge).

### Slider Joint

Linear movement along one axis.

### Cylindrical Joint

Rotation and sliding along one axis.

### Pin-Slot Joint

Rotation around one axis, sliding along another.

### Planar Joint

Movement in a plane (2D movement).

### Ball Joint

Rotation in all directions (like a ball and socket).

## Creating a Joint

1. Click "Assemble" → "Joint"
2. Select first component (moving part)
3. Select second component (fixed part)
4. Choose joint type
5. Select geometry (faces, edges, points)
6. Set motion limits (optional)
7. Click OK

## Example: Hinge Assembly

1. Create two components (door and frame)
2. Create Revolute joint
3. Select door edge as rotation axis
4. Select frame edge as fixed axis
5. Door can now rotate!

## Motion Study

Test your assembly:

1. Click "Motion Study" workspace
2. Add motion to joints
3. Play animation
4. Check for collisions
5. Verify movement is correct

## As-Built Joints

For components already positioned:

1. Select components
2. Click "As-Built Joint"
3. Choose joint type
4. Fusion 360 maintains current position

## Best Practices

- Create components early in design
- Use appropriate joint types
- Test motion before finalizing
- Name components clearly
- Organize in browser

## Common Assembly Issues

- **Over-constrained**: Too many joints
- **Under-constrained**: Parts can move unexpectedly
- **Collisions**: Parts interfere with each other
- **Wrong joint type**: Movement doesn't match intent

## Important Notes

- Joints define relationships, not just position
- Components can have multiple joints
- Motion limits prevent unwanted movement
- Assemblies can be animated
- Joints can be edited from timeline`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'technology',
      categoryId: 'fusion360',
      lessonNumber: 9,
      title: 'Fusion 360 Step 9: Primitives and Appearances',
      emoji: '🎨',
      content: `# Fusion 360 Step 9: Primitives and Appearances

## Learn Autodesk Fusion in 10 Easy Steps - Step 9 (2025)

**Topic**: Primitives and Appearances – Using basic shapes and changing colors/materials (e.g., Plastic, Metal).

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=AbC3d1x0R48&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=9&pp=iAQB)

## What is Rendering?

Rendering creates photorealistic images of your 3D models. It simulates how light interacts with materials to produce realistic visuals.

## Rendering Workspace

Switch to the Render workspace to access rendering tools.

## Setting Up a Render

### 1. Scene Settings

- Choose environment (lighting setup)
- Set background
- Adjust camera angle

### 2. Apply Materials

- Select faces or bodies
- Choose material (metal, plastic, wood, etc.)
- Adjust properties (color, roughness, etc.)

### 3. Add Decals

- Apply images or logos
- Position and scale
- Adjust transparency

### 4. Set Up Lighting

- Use environment lighting
- Add additional lights if needed
- Adjust intensity and color

## Materials Library

Fusion 360 includes many materials:

- **Metals**: Steel, aluminum, brass, copper
- **Plastics**: ABS, polycarbonate, rubber
- **Wood**: Oak, pine, mahogany
- **Glass**: Clear, frosted, colored
- **Fabrics**: Canvas, leather, cloth

## Material Properties

### Base Color

The main color of the material.

### Roughness

How smooth or rough the surface is (affects reflections).

### Metallic

Whether the material is metallic (affects how light reflects).

### Specular

Controls the shininess and highlights.

## Rendering Settings

### Quality

- **Draft**: Fast, lower quality
- **Final**: Slower, high quality
- **Maximum**: Best quality, very slow

### Resolution

- Higher resolution = better quality but slower
- Common: 1920x1080 (Full HD)
- Higher: 3840x2160 (4K)

## Creating a Render

1. Switch to Render workspace
2. Apply materials to your model
3. Set up scene and lighting
4. Position camera (use ViewCube)
5. Click "Render"
6. Wait for processing
7. Save the image

## Best Practices

- Use appropriate materials for realism
- Good lighting shows details
- Multiple angles show different views
- High quality for presentations
- Draft quality for quick previews

## Environment Presets

Fusion 360 includes environment presets:

- **Studio**: Professional lighting
- **Outdoor**: Natural sunlight
- **Indoor**: Room lighting
- **Product**: Showcase lighting

## Post-Processing

After rendering, you can:

- Adjust brightness/contrast
- Add effects
- Crop the image
- Export in different formats

## Export Options

- **PNG**: Good quality, supports transparency
- **JPEG**: Smaller file size
- **TIFF**: Highest quality, large files

## Important Notes

- Rendering takes time - be patient
- Higher quality = longer render time
- Materials make a big difference
- Lighting is crucial for realism
- Practice with different settings`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'technology',
      categoryId: 'fusion360',
      lessonNumber: 10,
      title: 'Fusion 360 Step 10: Master Timeline',
      emoji: '📤',
      content: `# Fusion 360 Step 10: Master Timeline

## Master Fusion Timeline | Beginners Tutorial | 2025 | 2026 (Step 10)

**Topic**: How to edit your design history and fix errors.

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=qlxM26qKBJI&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=10&pp=iAQB)

## Exporting Your Designs

Once your design is complete, you need to export it for manufacturing, sharing, or 3D printing.

## File Formats

### STL (Stereolithography)

Most common for 3D printing.

- **Mesh format**: Converts solid to triangles
- **Universal**: Works with all 3D printers
- **No color/texture**: Geometry only

### STEP

For manufacturing and CAD exchange.

- **Precise geometry**: Maintains exact dimensions
- **Industry standard**: Works with other CAD software
- **Assembly support**: Can export entire assemblies

### OBJ

For rendering and visualization.

- **Mesh format**: Like STL but with materials
- **Texture support**: Can include colors
- **Common in graphics**: Used in animation software

### DXF/DWG

For 2D drawings and laser cutting.

- **2D format**: Flat drawings
- **Laser cutting**: Perfect for CNC laser cutters
- **Drawing views**: Technical drawings

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

## Best Practices

### For 3D Printing:

- Check model is watertight
- Consider print orientation
- Add supports if needed
- Export at appropriate resolution

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
- Keep original Fusion 360 files for editing`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year3',
      subjectId: 'technology',
      categoryId: 'fusion360',
      lessonNumber: 11,
      title: 'Fusion 360: Full Course (Compilation)',
      emoji: '🎓',
      content: `# Fusion 360: Full Course (Compilation)

## Autodesk Fusion for Beginners | Full Course (2025/2026)

**YouTube Video**: [Watch on YouTube](https://www.youtube.com/watch?v=iUbGPrUilno&list=PLc_LgFscXJeVnF7K_CwavgPwL_siJWMv7&index=11&pp=iAQB)

This is a 1-hour compilation video that combines Steps 1-6 (and parts of others) into a single video for uninterrupted learning.

## What's Included

This comprehensive video covers:

- **Step 1**: User Interface
- **Step 2**: Sketching
- **Step 3**: Extrude & Fillets
- **Step 4**: Sweeps & Construction Lines
- **Step 5**: Revolve & Splines
- **Step 6**: Extruded Cuts & Circular Patterns
- Plus additional content from other steps

## Perfect For

- Reviewing all the basics in one session
- Getting a complete overview of Fusion 360
- Learning at your own pace without interruptions
- Understanding how all the concepts work together

## Watch the Full Course

This compilation video is perfect for:

- Complete beginners who want to see everything in one go
- Review sessions after completing individual steps
- Understanding how all the tools work together
- Building confidence before starting your own projects

## Next Steps

After watching this full course, you'll be ready to:

- Create your own 3D models
- Apply the techniques you've learned
- Explore more advanced features
- Build real projects`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: 'fusion360',
    })

  ];
}

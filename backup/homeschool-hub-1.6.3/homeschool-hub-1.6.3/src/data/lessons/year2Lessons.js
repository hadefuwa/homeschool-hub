import { Lesson } from '../../models/Lesson.js';

/**
 * Year 2 Lessons
 */
export function getYear2Lessons(startLessonId, startQuizId) {
  let lessonId = startLessonId;
  let quizId = startQuizId;

  return [
    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'maths',
      lessonNumber: 1,
      title: "Counting to 20",
      emoji: '🔢',
      content: `# Counting to 20 🔢



Let's learn to count from 1 to 20!



## How to Play



Tap the numbers to hear them! Then play the game! 🎮



## Numbers 1-20



1️⃣ One

2️⃣ Two

3️⃣ Three

4️⃣ Four

5️⃣ Five

6️⃣ Six

7️⃣ Seven

8️⃣ Eight

9️⃣ Nine

🔟 Ten

1️⃣1️⃣ Eleven

1️⃣2️⃣ Twelve

1️⃣3️⃣ Thirteen

1️⃣4️⃣ Fourteen

1️⃣5️⃣ Fifteen

1️⃣6️⃣ Sixteen

1️⃣7️⃣ Seventeen

1️⃣8️⃣ Eighteen

1️⃣9️⃣ Nineteen

2️⃣0️⃣ Twenty



## Fun Activities



- Count your fingers and toes

- Count objects around you

- Practice counting to 20!`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'maths',
      lessonNumber: 2,
      title: "Place Value to 100",
      emoji: '🔢',
      content: `# Place Value to 100 🔢

Let's learn about place value!

## What is Place Value?

Place value tells us what each digit in a number means!

In the number 24:
- The 2 is in the tens place (worth 20)
- The 4 is in the ones place (worth 4)

## Examples

- 15 = 1 ten + 5 ones
- 32 = 3 tens + 2 ones
- 67 = 6 tens + 7 ones

## How to Play

Drag digits to build numbers! 🎮`,
      quizId: quizId++,
      assessmentType: 'place-value-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'maths',
      lessonNumber: 3,
      title: "Addition to 20",
      emoji: '➕',
      content: `# Addition to 20 ➕

Let's practice adding numbers up to 20!

## Addition Strategies

- Count on from the larger number
- Use number bonds (pairs that make 10)
- Draw pictures to help

## Examples

- 8 + 5 = 13
- 12 + 4 = 16
- 9 + 7 = 16

## How to Play

Click the correct answer! 🎮`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'maths',
      lessonNumber: 4,
      title: "Subtraction to 20",
      emoji: '➖',
      content: `# Subtraction to 20 ➖

Let's practice subtracting numbers!

## Subtraction Strategies

- Count back from the larger number
- Use number bonds
- Draw pictures to help

## Examples

- 15 - 7 = 8
- 18 - 9 = 9
- 14 - 6 = 8

## How to Play

Drag objects to subtract, then type your answer! 🎮`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'maths',
      lessonNumber: 5,
      title: "2D Shapes Recognition",
      emoji: '🔷',
      content: `# 2D Shapes Recognition 🔷

Let's learn about 2D shapes!

## Common 2D Shapes

- Circle ⭕ - round, no corners
- Triangle 🔺 - 3 sides, 3 corners
- Square ⬜ - 4 equal sides, 4 corners
- Rectangle ▭ - 4 sides, opposite sides equal

## Properties

Shapes have:
- Sides (edges)
- Corners (vertices)
- Different sizes

## How to Play

Click shapes and drag to match! 🎮`,
      quizId: quizId++,
      assessmentType: 'shape-matching-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'maths',
      lessonNumber: 6,
      title: "Comparing Numbers",
      emoji: '⚖️',
      content: `# Comparing Numbers ⚖️

Let's learn to compare numbers!

## Comparison Symbols

- > means "greater than"
- < means "less than"
- = means "equal to"

## Examples

- 15 > 8 (15 is greater than 8)
- 7 < 12 (7 is less than 12)
- 10 = 10 (10 equals 10)

## How to Play

Drag the correct symbol! 🎮`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'maths',
      lessonNumber: 7,
      title: "Number Patterns",
      emoji: '🔢',
      content: `# Number Patterns 🔢

Let's find patterns in numbers!

## What are Patterns?

Patterns are sequences that follow a rule!

## Examples

- 2, 4, 6, 8, ? (add 2 each time)
- 5, 10, 15, 20, ? (add 5 each time)
- 10, 9, 8, 7, ? (subtract 1 each time)

## How to Play

Type the missing numbers! 🎮`,
      quizId: quizId++,
      assessmentType: 'typing-math-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'maths',
      lessonNumber: 8,
      title: "Length Measurement",
      emoji: '📏',
      content: `# Length Measurement 📏

Let's learn to measure length!

## Units of Length

- Centimeters (cm) - small measurements
- Meters (m) - larger measurements

## How to Measure

- Use a ruler
- Start at 0
- Read the number at the end

## Examples

- A pencil is about 15 cm
- A desk is about 1 m

## How to Play

Drag rulers and click measurements! 🎮`,
      quizId: quizId++,
      assessmentType: 'maths-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'maths',
      lessonNumber: 9,
      title: "Time: O'Clock and Half Past",
      emoji: '🕐',
      content: `# Time: O'Clock and Half Past 🕐

Let's learn to tell time!

## O'Clock Times

- When the minute hand is at 12
- Examples: 3 o'clock, 7 o'clock

## Half Past

- When the minute hand is at 6
- Examples: half past 3, half past 7

## How to Play

Drag clock hands and type the time! 🎮`,
      quizId: quizId++,
      assessmentType: 'clock-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'maths',
      lessonNumber: 10,
      title: "Money: Coins to £1",
      emoji: '💰',
      content: `# Money: Coins to £1 💰

Let's learn about money!

## UK Coins

- 1p, 2p, 5p, 10p, 20p, 50p
- £1 = 100p

## Making Amounts

- 20p = two 10p coins
- 50p = five 10p coins
- £1 = one hundred 1p coins

## How to Play

Drag coins and click amounts! 🎮`,
      quizId: quizId++,
      assessmentType: 'money-drag-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'maths',
      lessonNumber: 11,
      title: "Data: Pictograms",
      emoji: '📊',
      content: `# Data: Pictograms 📊

Let's learn about data and graphs!

## What is a Pictogram?

A pictogram uses pictures to show data!

## Reading Pictograms

- Each picture = 1 item
- Count the pictures
- Compare different groups

## Examples

- Favorite fruits
- Number of pets
- Weather data

## How to Play

Click to create graphs and drag items! 🎮`,
      quizId: quizId++,
      assessmentType: 'graph-builder-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'technology',
      lessonNumber: 4,
      title: "Arduino Lesson 1: Understanding void setup()",
      emoji: '🔌',
      content: `# Arduino Lesson 1: Understanding void setup()



## Introduction to setup()



Every Arduino program must have a \`setup()\` function. This function runs **once** when the Arduino board is powered on or reset.



<!-- QUESTION_START -->
How many times does the setup() function execute in an Arduino program?
<!-- OPTIONS -->
Once at the start|Continuously in a loop|Only when called explicitly|Twice - once at start and once at end
<!-- CORRECT -->
0
<!-- EXPLANATION -->
The setup() function runs exactly once when the Arduino starts up, before the loop() function begins.
<!-- QUESTION_END -->



## What is void setup()?



The \`setup()\` function is where you initialize your Arduino program. It's called automatically when the sketch starts.



## Syntax



\`\`\`cpp

void setup() {

// Your initialization code goes here

}

\`\`\`



## Key Points



1. **Runs only once**: The setup function executes exactly once when the Arduino starts

2. **Initialization**: Use it to configure pins, initialize serial communication, or set initial values

3. **Required**: Every Arduino sketch must have a setup function, even if it's empty

4. **Void keyword**: The \`void\` keyword means this function doesn't return any value



<!-- QUESTION_START -->
What does the "void" keyword in "void setup()" indicate?
<!-- OPTIONS -->
The function returns an integer|The function returns a boolean value|The function does not return any value|The function can be called multiple times
<!-- CORRECT -->
2
<!-- EXPLANATION -->
The "void" keyword means the function doesn't return any value. It's used for functions that perform actions but don't need to send data back.
<!-- QUESTION_END -->



## Common Uses



- Setting pin modes with \`pinMode()\`

- Starting serial communication with \`Serial.begin()\`

- Initializing variables

- Setting up libraries



<!-- QUESTION_START -->
What is the primary purpose of the setup() function?
<!-- OPTIONS -->
To run the main program logic|To initialize pins and configure the Arduino|To create an infinite loop|To handle serial communication only
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The setup() function is primarily used to initialize pins, configure the Arduino, and set up any libraries or communication protocols needed for your program.
<!-- QUESTION_END -->



## Example



\`\`\`cpp

void setup() {

pinMode(13, OUTPUT);  // Set pin 13 as output

Serial.begin(9600);   // Start serial at 9600 baud

}

\`\`\`



<!-- QUESTION_START -->
Which of the following is typically done in setup() but NOT in loop()?
<!-- OPTIONS -->
Reading sensor values|Controlling LEDs|Setting pin modes with pinMode()|Using delay() functions
<!-- CORRECT -->
2
<!-- EXPLANATION -->
Setting pin modes with pinMode() should be done in setup() because it only needs to happen once. Reading sensors, controlling LEDs, and using delays are typically done in loop().
<!-- QUESTION_END -->



## Important Notes



- Setup runs before the loop function

- If setup is missing, your code will not compile

- You can only have one setup function per sketch



## Exercise

<!-- EXERCISE_START -->
{"instruction": "Write a complete Arduino sketch with a setup() function that sets pin 13 as OUTPUT. Include both setup() and loop() functions.", "codePattern": "void\\s+setup\\s*\\(\\s*\\)", "requiredFunctions": ["setup"], "requiredStatements": ["pinMode"]}
<!-- EXERCISE_END -->



<!-- QUESTION_START -->
If you forget to include setup() in your Arduino sketch, what happens?
<!-- OPTIONS -->
The program runs normally|The code will not compile|Only the loop() function runs|The Arduino resets continuously
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The setup() function is required in every Arduino sketch. If it's missing, the code will not compile and you'll get an error.
<!-- QUESTION_END -->`,
      quizId: null,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'technology',
      lessonNumber: 5,
      title: "Arduino Lesson 3: The Importance of Semicolons",
      emoji: '🔤',
      content: `# Arduino Lesson 3: The Importance of Semicolons



## Why Semicolons Matter



In Arduino programming (which uses C/C++), semicolons are **required** to mark the end of statements. Without them, your code will not compile.



## What is a Semicolon?



A semicolon (\`;\`) is a punctuation mark that tells the compiler "this statement is complete."



## Syntax Rules



\`\`\`cpp

statement;  // Correct - semicolon marks the end

statement   // ERROR - missing semicolon!

\`\`\`



## When to Use Semicolons



### Required After:

- Variable declarations: \`int x = 5;\`

- Function calls: \`digitalWrite(13, HIGH);\`

- Assignment statements: \`x = 10;\`

- Increment/decrement: \`x++;\` or \`x--;\`

- Return statements: \`return 0;\`



<!-- QUESTION_START -->
Which of the following requires a semicolon?
<!-- OPTIONS -->
void setup() { }|if (condition) { }|int x = 5;|for (int i = 0; i < 10; i++) { }
<!-- CORRECT -->
2
<!-- EXPLANATION -->
Variable declarations like "int x = 5;" require a semicolon. Function definitions and control structures don't need semicolons after their closing braces.
<!-- QUESTION_END -->



### NOT Required After:

- Function definitions: \`void setup() { }\` (no semicolon after closing brace)

- Control structures: \`if (condition) { }\` (no semicolon after closing brace)

- Loop structures: \`for (int i = 0; i < 10; i++) { }\` (no semicolon after closing brace)



<!-- QUESTION_START -->
Where should you NOT place a semicolon?
<!-- OPTIONS -->
After variable declarations|After function calls|After the closing brace of a function definition|After assignment statements
<!-- CORRECT -->
2
<!-- EXPLANATION -->
You should NOT place a semicolon after the closing brace of a function definition. Semicolons are required after variable declarations, function calls, and assignment statements.
<!-- QUESTION_END -->



## Common Mistakes



### Missing Semicolon

\`\`\`cpp

int x = 5        // ERROR: missing semicolon

digitalWrite(13, HIGH)  // ERROR: missing semicolon

\`\`\`



### Correct Version

\`\`\`cpp

int x = 5;              // Correct

digitalWrite(13, HIGH); // Correct

\`\`\`



<!-- QUESTION_START -->
What happens if you forget a semicolon after a statement?
<!-- OPTIONS -->
The program runs normally|The code will not compile|The statement is ignored|The Arduino resets
<!-- CORRECT -->
1
<!-- EXPLANATION -->
If you forget a semicolon after a statement, the code will not compile. The compiler will give you an error message indicating where the semicolon is expected.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Which line is CORRECT?
<!-- OPTIONS -->
digitalWrite(13, HIGH)|pinMode(13, OUTPUT)|int count = 10|Serial.begin(9600);
<!-- CORRECT -->
3
<!-- EXPLANATION -->
"Serial.begin(9600);" is correct because it has a semicolon at the end. The other options are missing semicolons.
<!-- QUESTION_END -->



## Why It Matters



1. **Compiler requirement**: C/C++ requires semicolons to parse code correctly

2. **Code clarity**: Semicolons make it clear where one statement ends and another begins

3. **Error prevention**: Missing semicolons cause compilation errors



## Example



\`\`\`cpp

void setup() {

pinMode(13, OUTPUT);  // Semicolon required

Serial.begin(9600);   // Semicolon required

}



void loop() {

digitalWrite(13, HIGH);  // Semicolon required

delay(1000);             // Semicolon required

digitalWrite(13, LOW);   // Semicolon required

delay(1000);             // Semicolon required

}

\`\`\`



## Debugging Tip



If you get a compilation error, check:

1. Did you forget a semicolon on the previous line?

2. Are all statements properly terminated?

3. Check the line number in the error message - the problem is often on the line before!



<!-- QUESTION_START -->
If you get a compilation error on line 10 saying "expected ';' before...", where is the actual problem likely to be?
<!-- OPTIONS -->
On line 10|On line 9 (the previous line)|In the setup() function|In the loop() function
<!-- CORRECT -->
1
<!-- EXPLANATION -->
When the compiler reports an error on a specific line saying "expected ';' before...", the actual problem is usually on the previous line (line 9 in this case) where a semicolon is missing. The compiler only detects the error when it reaches the next line.
<!-- QUESTION_END -->



## Exercise

<!-- EXERCISE_START -->
{"instruction": "Write Arduino code with proper semicolons. Include at least one variable declaration (like int x = 5;) and one function call (like pinMode(13, OUTPUT);), both with semicolons.", "codePattern": ";", "requiredStatements": ["pinMode", "digitalWrite"]}
<!-- EXERCISE_END -->



## Important Notes



- Semicolons are statement terminators, not separators

- One statement = one semicolon

- Missing semicolons will prevent your code from compiling`,
      quizId: null,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'technology',
      lessonNumber: 6,
      title: "Arduino Lesson 4: Variables and Data Types",
      emoji: '📦',
      content: `# Arduino Lesson 4: Variables and Data Types



## What are Variables?



Variables are containers that store data in your program. They have a name, a type, and a value.



## Data Types in Arduino



### int (Integer)

Stores whole numbers from -32,768 to 32,767.



\`\`\`cpp

int count = 10;

int temperature = -5;

\`\`\`



<!-- QUESTION_START -->
What is the range of values an int variable can store?
<!-- OPTIONS -->
0 to 255|-32,768 to 32,767|-128 to 127|0 to 1023
<!-- CORRECT -->
1
<!-- EXPLANATION -->
An int variable can store whole numbers from -32,768 to 32,767. This is a 16-bit signed integer range.
<!-- QUESTION_END -->



### float (Floating Point)

Stores decimal numbers with 6-7 digits of precision.



\`\`\`cpp

float pi = 3.14159;

float voltage = 5.5;

\`\`\`



<!-- QUESTION_START -->
Which data type should you use to store a decimal number like 3.14?
<!-- OPTIONS -->
int|float|char|boolean
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The float data type is used to store decimal numbers (numbers with a decimal point) like 3.14. int stores whole numbers, char stores single characters, and boolean stores true/false values.
<!-- QUESTION_END -->



### char (Character)

Stores a single character.



\`\`\`cpp

char letter = 'A';

char symbol = '@';

\`\`\`



### boolean

Stores true or false values.



\`\`\`cpp

boolean isOn = true;

boolean isComplete = false;

\`\`\`



### byte

Stores numbers from 0 to 255 (8 bits).



\`\`\`cpp

byte brightness = 128;

\`\`\`



### String

Stores text (sequence of characters).



\`\`\`cpp

String message = "Hello Arduino!";

\`\`\`



## Variable Declaration



\`\`\`cpp

dataType variableName = value;

\`\`\`



## Examples



\`\`\`cpp

int ledPin = 13;           // Integer variable

float sensorValue = 0.0;   // Float variable

boolean buttonPressed = false;  // Boolean variable

String greeting = "Hi";    // String variable

\`\`\`



## Variable Naming Rules



1. Must start with a letter or underscore

2. Can contain letters, numbers, and underscores

3. Cannot use reserved words (like \`int\`, \`void\`, etc.)

4. Case-sensitive (LED and led are different)



<!-- QUESTION_START -->
Which variable name is INVALID in Arduino?
<!-- OPTIONS -->
myVariable|sensor_value|int|ledPin
<!-- CORRECT -->
2
<!-- EXPLANATION -->
"int" is a reserved word in Arduino/C++ and cannot be used as a variable name. Reserved words like int, void, if, for, etc. are part of the programming language itself.
<!-- QUESTION_END -->



## Scope



Variables can be:

- **Global**: Declared outside functions, accessible everywhere

- **Local**: Declared inside functions, only accessible in that function



<!-- QUESTION_START -->
What is the difference between a global and local variable?
<!-- OPTIONS -->
Global variables are faster|Local variables can only be accessed within the function they are declared|Global variables use less memory|There is no difference
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Local variables can only be accessed within the function they are declared. Global variables are accessible from anywhere in the program, but local variables are limited to their function scope.
<!-- QUESTION_END -->



## Example Program



\`\`\`cpp

int globalVar = 100;  // Global variable



void setup() {

int localVar = 50;  // Local to setup()

Serial.begin(9600);

Serial.println(globalVar);  // Can access global

Serial.println(localVar);   // Can access local

}



void loop() {

Serial.println(globalVar);  // Can access global

// Serial.println(localVar); // ERROR: localVar doesn't exist here

}

\`\`\`



<!-- QUESTION_START -->
If you declare "int count = 5;" inside setup(), can you access it in loop()?
<!-- OPTIONS -->
Yes, always|No, it is local to setup()|Only if you use the extern keyword|Yes, but you must initialize it again
<!-- CORRECT -->
1
<!-- EXPLANATION -->
If you declare a variable inside setup(), it is local to that function and cannot be accessed in loop() or any other function. To access it from multiple functions, you need to declare it as a global variable (outside all functions).
<!-- QUESTION_END -->



## Exercise

<!-- EXERCISE_START -->
{"instruction": "Declare a variable of type int and assign it a value. Example: int ledPin = 13; Then use it in your code.", "codePattern": "int\\s+\\w+\\s*=", "requiredStatements": null}
<!-- EXERCISE_END -->



## Important Notes



- Choose the right data type for your needs

- int is most common for whole numbers

- Use float when you need decimals

- Variables must be declared before use`,
      quizId: null,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'technology',
      lessonNumber: 7,
      title: "Arduino Lesson 5: Digital Input and Output",
      emoji: '⚡',
      content: `# Arduino Lesson 5: Digital Input and Output



## Digital Pins



Arduino has digital pins that can be configured as either INPUT or OUTPUT. Digital means the pin can only be HIGH (5V or 3.3V) or LOW (0V).



## pinMode()



Configures a pin as either INPUT or OUTPUT. Must be called in \`setup()\`.



\`\`\`cpp

pinMode(pinNumber, mode);

\`\`\`



<!-- QUESTION_START -->
What does pinMode(13, OUTPUT) do?
<!-- OPTIONS -->
Sets pin 13 to HIGH|Configures pin 13 as an output pin|Reads the value from pin 13|Turns on an LED on pin 13
<!-- CORRECT -->
1
<!-- EXPLANATION -->
pinMode(13, OUTPUT) configures pin 13 as an output pin, which means it can be used to send signals (HIGH or LOW) to control devices like LEDs or motors. It doesn't set the pin to HIGH or read values - that's done with digitalWrite() and digitalRead().
<!-- QUESTION_END -->



### Modes:

- \`INPUT\`: Pin reads voltage (for sensors, buttons)

- \`OUTPUT\`: Pin provides voltage (for LEDs, motors)



## digitalWrite()



Sets a digital pin HIGH or LOW (only works on OUTPUT pins).



\`\`\`cpp

digitalWrite(pin, value);

\`\`\`



### Values:

- \`HIGH\`: Sets pin to 5V (or 3.3V on 3.3V boards)

- \`LOW\`: Sets pin to 0V (ground)



## digitalRead()



Reads the value from a digital pin (only works on INPUT pins).



\`\`\`cpp

int value = digitalRead(pin);

\`\`\`



### Returns:

- \`HIGH\` (1): Pin is receiving voltage

- \`LOW\` (0): Pin is at ground



<!-- QUESTION_START -->
What values can digitalRead() return?
<!-- OPTIONS -->
0 to 1023|HIGH or LOW|true or false|Any integer value
<!-- CORRECT -->
1
<!-- EXPLANATION -->
digitalRead() returns either HIGH or LOW. HIGH means the pin is receiving voltage (typically 5V or 3.3V), and LOW means the pin is at ground (0V). These are the only two possible values for digital pins.
<!-- QUESTION_END -->



## Example: Blinking LED



\`\`\`cpp

void setup() {

pinMode(13, OUTPUT);  // Set pin 13 as output

}



void loop() {

digitalWrite(13, HIGH);  // Turn LED on

delay(1000);              // Wait 1 second

digitalWrite(13, LOW);    // Turn LED off

delay(1000);              // Wait 1 second

}

\`\`\`



## Example: Reading a Button



\`\`\`cpp

void setup() {

pinMode(2, INPUT);        // Set pin 2 as input

pinMode(13, OUTPUT);      // Set pin 13 as output

Serial.begin(9600);

}



void loop() {

int buttonState = digitalRead(2);  // Read button



if (buttonState == HIGH) {

  digitalWrite(13, HIGH);  // Turn LED on

  Serial.println("Button pressed!");

} else {

  digitalWrite(13, LOW);   // Turn LED off

}

}

\`\`\`



## Pull-up and Pull-down Resistors



Digital inputs can "float" (have uncertain values). Use:

- **Pull-up resistor**: Connects pin to HIGH when not pressed (use \`INPUT_PULLUP\`)

- **Pull-down resistor**: Connects pin to LOW when not pressed



\`\`\`cpp

pinMode(2, INPUT_PULLUP);  // Internal pull-up resistor

\`\`\`



<!-- QUESTION_START -->
Why would you use INPUT_PULLUP instead of INPUT?
<!-- OPTIONS -->
To make the pin read faster|To prevent the pin from floating and having uncertain values|To increase the voltage on the pin|To enable analog reading
<!-- CORRECT -->
1
<!-- EXPLANATION -->
INPUT_PULLUP uses an internal pull-up resistor that connects the pin to HIGH when nothing is connected. This prevents the pin from "floating" (having uncertain values) when no input is connected, which can cause unreliable readings.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
If you read a button connected with INPUT_PULLUP, what value indicates the button is pressed?
<!-- OPTIONS -->
HIGH|LOW|1|Both HIGH and 1 are correct
<!-- CORRECT -->
1
<!-- EXPLANATION -->
With INPUT_PULLUP, the pin is normally HIGH. When the button is pressed, it connects the pin to ground (LOW), so LOW indicates the button is pressed. This is the opposite of what you might expect!
<!-- QUESTION_END -->



## Exercise

<!-- EXERCISE_START -->
{"instruction": "Write code to set a pin as OUTPUT using pinMode() in setup(), and use digitalWrite() in loop() to turn it HIGH.", "requiredFunctions": ["setup"], "requiredStatements": ["pinMode", "digitalWrite"]}
<!-- EXERCISE_END -->



## Important Notes



- Always set pin mode in setup() before using pins

- digitalWrite only works on OUTPUT pins

- digitalRead only works on INPUT pins

- Use INPUT_PULLUP for buttons to avoid floating values

- Digital pins can only be HIGH or LOW, nothing in between



<!-- QUESTION_START -->
What happens if you try to use digitalWrite() on a pin configured as INPUT?
<!-- OPTIONS -->
It works normally|It has no effect|The pin automatically switches to OUTPUT|The Arduino resets
<!-- CORRECT -->
1
<!-- EXPLANATION -->
If you try to use digitalWrite() on a pin configured as INPUT, it will have no effect. The pin must be configured as OUTPUT using pinMode() before digitalWrite() can control it.
<!-- QUESTION_END -->`,
      quizId: null,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'technology',
      lessonNumber: 8,
      title: "Arduino Lesson 6: Analog Input and Output (PWM)",
      emoji: '📊',
      content: `# Arduino Lesson 6: Analog Input and Output (PWM)



## Analog vs Digital



- **Digital**: Only HIGH or LOW (0 or 1)

- **Analog**: Continuous range of values (0 to 1023 for input, 0 to 255 for output)



## Analog Input: analogRead()



Reads analog voltage from analog pins (A0-A5). Returns a value from 0 to 1023.



\`\`\`cpp

int sensorValue = analogRead(pin);

\`\`\`



### How It Works:

- 0V = 0

- 5V (or 3.3V) = 1023

- Values in between are proportional



<!-- QUESTION_START -->
What is the range of values returned by analogRead()?
<!-- OPTIONS -->
0 to 255|0 to 1023|-1023 to 1023|0 to 5
<!-- CORRECT -->
1
<!-- EXPLANATION -->
analogRead() returns values from 0 to 1023. This is a 10-bit resolution, meaning it can distinguish 1024 different voltage levels (0-1023).
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Which pins can be used with analogRead()?
<!-- OPTIONS -->
All digital pins|Only pins marked with ~|Only analog pins A0-A5|Pins 0-13
<!-- CORRECT -->
2
<!-- EXPLANATION -->
analogRead() can only be used with analog pins A0-A5. These are the dedicated analog input pins on the Arduino board.
<!-- QUESTION_END -->



## Example: Reading a Potentiometer



\`\`\`cpp

void setup() {

Serial.begin(9600);

}



void loop() {

int potValue = analogRead(A0);  // Read from analog pin A0

Serial.println(potValue);       // Print value (0-1023)

delay(100);

}

\`\`\`



## Analog Output: analogWrite() and PWM



Arduino doesn't have true analog output. Instead, it uses **PWM (Pulse Width Modulation)**.



### PWM Pins

On most Arduino boards, PWM pins are marked with ~ (e.g., 3, 5, 6, 9, 10, 11)



### analogWrite()

Writes a PWM value (0 to 255) to a PWM-capable pin.



\`\`\`cpp

analogWrite(pin, value);

\`\`\`



- 0 = Always LOW (0% duty cycle)

- 255 = Always HIGH (100% duty cycle)

- 128 = 50% duty cycle (half brightness)



<!-- QUESTION_START -->
What does analogWrite() actually do?
<!-- OPTIONS -->
Creates a true analog voltage|Uses PWM (Pulse Width Modulation) to simulate analog|Converts digital to analog|Only works with analog pins
<!-- CORRECT -->
1
<!-- EXPLANATION -->
analogWrite() uses PWM (Pulse Width Modulation) to simulate analog output. It rapidly switches the pin between HIGH and LOW, varying the percentage of time it's HIGH to create the effect of different voltage levels.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What is the range of values for analogWrite()?
<!-- OPTIONS -->
0 to 1023|0 to 255|-255 to 255|0 to 100
<!-- CORRECT -->
1
<!-- EXPLANATION -->
analogWrite() accepts values from 0 to 255. This is an 8-bit resolution, providing 256 different levels of PWM output.
<!-- QUESTION_END -->



## Example: Fading LED



\`\`\`cpp

void setup() {

pinMode(9, OUTPUT);  // PWM pin

}



void loop() {

// Fade in

for (int brightness = 0; brightness <= 255; brightness++) {

  analogWrite(9, brightness);

  delay(10);

}



// Fade out

for (int brightness = 255; brightness >= 0; brightness--) {

  analogWrite(9, brightness);

  delay(10);

}

}

\`\`\`



## Converting Analog Values



### Map Function

Converts a value from one range to another.



\`\`\`cpp

int mappedValue = map(value, fromLow, fromHigh, toLow, toHigh);

\`\`\`



### Example

\`\`\`cpp

int sensorValue = analogRead(A0);           // 0-1023

int brightness = map(sensorValue, 0, 1023, 0, 255);  // Convert to 0-255

analogWrite(9, brightness);

\`\`\`



<!-- QUESTION_START -->
If you read a sensor value of 512 with analogRead(A0), and want to control an LED brightness with analogWrite(9, value), what should the value be to get 50% brightness?
<!-- OPTIONS -->
512|255|128|1023
<!-- CORRECT -->
2
<!-- EXPLANATION -->
To get 50% brightness, you need a value of 128 (half of 255). The sensor value of 512 is half of 1023, so you would use map(512, 0, 1023, 0, 255) which equals 128.
<!-- QUESTION_END -->



## Important Notes



- analogRead() only works on analog pins (A0-A5)

- analogWrite() only works on PWM-capable pins

- analogRead() returns 0-1023 (10-bit resolution)

- analogWrite() accepts 0-255 (8-bit resolution)

- PWM creates a square wave, not a true analog voltage

- Use map() to convert between ranges`,
      quizId: null,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'technology',
      lessonNumber: 9,
      title: "Arduino Lesson 7: Control Structures (if/else, loops)",
      emoji: '🔀',
      content: `# Arduino Lesson 7: Control Structures



## Control Structures



Control structures allow your program to make decisions and repeat actions.



## if Statement



Executes code only if a condition is true.



\`\`\`cpp

if (condition) {

// Code here runs if condition is true

}

\`\`\`



## if-else Statement



Executes one block if true, another if false.



\`\`\`cpp

if (condition) {

// Code if true

} else {

// Code if false

}

\`\`\`



## if-else if-else



Handles multiple conditions.



\`\`\`cpp

if (condition1) {

// Code for condition1

} else if (condition2) {

// Code for condition2

} else {

// Code if neither

}

\`\`\`



## Comparison Operators



- \`==\` : Equal to

- \`!=\` : Not equal to

- \`<\`  : Less than

- \`>\`  : Greater than

- \`<=\` : Less than or equal

- \`>=\` : Greater than or equal



<!-- QUESTION_START -->
What is the difference between == and = in Arduino?
<!-- OPTIONS -->
There is no difference|== is for comparison, = is for assignment|= is for comparison, == is for assignment|Both are used for assignment
<!-- CORRECT -->
1
<!-- EXPLANATION -->
== is used for comparison (checking if two values are equal), while = is used for assignment (setting a variable to a value). This is a common mistake - using = instead of == in conditions will cause bugs!
<!-- QUESTION_END -->



## Logical Operators



- \`&&\` : AND (both must be true)

- \`||\` : OR (at least one true)

- \`!\`  : NOT (reverses true/false)



<!-- QUESTION_START -->
What does the && operator do?
<!-- OPTIONS -->
Logical OR - at least one condition must be true|Logical AND - both conditions must be true|Logical NOT - reverses the condition|Performs addition
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The && operator is logical AND, which means both conditions must be true for the overall expression to be true. If either condition is false, the result is false.
<!-- QUESTION_END -->



## Example: Button Control



\`\`\`cpp

void setup() {

pinMode(2, INPUT_PULLUP);

pinMode(13, OUTPUT);

}



void loop() {

if (digitalRead(2) == LOW) {

  digitalWrite(13, HIGH);  // Button pressed

} else {

  digitalWrite(13, LOW);   // Button not pressed

}

}

\`\`\`



## for Loop



Repeats code a specific number of times.



\`\`\`cpp

for (initialization; condition; increment) {

// Code to repeat

}

\`\`\`



### Example

\`\`\`cpp

for (int i = 0; i < 10; i++) {

Serial.println(i);  // Prints 0 through 9

}

\`\`\`



<!-- QUESTION_START -->
How many times will this loop execute: for (int i = 0; i < 5; i++) { }?
<!-- OPTIONS -->
4 times|5 times|6 times|Infinite times
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The loop executes 5 times. It starts at i=0 and continues while i < 5, so it runs for i=0, 1, 2, 3, 4 (that's 5 iterations total).
<!-- QUESTION_END -->



## while Loop



Repeats code while a condition is true.



\`\`\`cpp

while (condition) {

// Code to repeat

}

\`\`\`



<!-- QUESTION_START -->
What happens if you write: while(true) { } in your loop() function?
<!-- OPTIONS -->
The program runs normally|The while loop never exits, blocking the rest of loop()|The Arduino resets|The setup() function runs again
<!-- CORRECT -->
1
<!-- EXPLANATION -->
If you write while(true) { } in your loop() function, the while loop will never exit because the condition is always true. This blocks the rest of the loop() function from executing, effectively freezing that part of your program.
<!-- QUESTION_END -->



### Example

\`\`\`cpp

int count = 0;

while (count < 5) {

Serial.println(count);

count++;

}

\`\`\`



## do-while Loop



Executes at least once, then repeats while condition is true.



\`\`\`cpp

do {

// Code to repeat

} while (condition);

\`\`\`



## break and continue



- \`break\`: Exits the loop immediately

- \`continue\`: Skips to next iteration



## Example: Multiple Conditions



\`\`\`cpp

int sensorValue = analogRead(A0);



if (sensorValue < 300) {

digitalWrite(13, LOW);      // Dark

} else if (sensorValue < 700) {

analogWrite(9, 128);        // Medium

} else {

analogWrite(9, 255);        // Bright

}

\`\`\`



<!-- QUESTION_START -->
In the condition "if (sensorValue > 500 && sensorValue < 800)", when will the code execute?
<!-- OPTIONS -->
When sensorValue is less than 500|When sensorValue is between 500 and 800 (exclusive)|When sensorValue is greater than 800|When sensorValue equals 500 or 800
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The condition sensorValue > 500 && sensorValue < 800 will be true when sensorValue is between 500 and 800 (exclusive), meaning greater than 500 AND less than 800. The && operator requires both conditions to be true.
<!-- QUESTION_END -->



## Important Notes



- Use == for comparison, = for assignment

- Conditions must be in parentheses

- Use && for AND, || for OR

- Be careful with infinite loops (while(true))

- for loops are great when you know how many iterations`,
      quizId: null,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'technology',
      lessonNumber: 10,
      title: "Arduino Lesson 8: Creating Custom Functions",
      emoji: '⚙️',
      content: `# Arduino Lesson 8: Creating Custom Functions



## What are Functions?



Functions are reusable blocks of code that perform a specific task. They help organize code and avoid repetition.



## Function Syntax



\`\`\`cpp

returnType functionName(parameters) {

// Function code

return value;  // If returnType is not void

}

\`\`\`



<!-- QUESTION_START -->
What does the "void" keyword in a function declaration mean?
<!-- OPTIONS -->
The function takes no parameters|The function does not return a value|The function can only be called once|The function is empty
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The "void" keyword means the function does not return a value. Functions that return values use data types like int, float, or boolean instead of void.
<!-- QUESTION_END -->



## Function Types



### Functions that Return a Value



\`\`\`cpp

int addNumbers(int a, int b) {

int result = a + b;

return result;

}

\`\`\`



<!-- QUESTION_START -->
If you define a function "int add(int a, int b) { return a + b; }", what must you do when calling it?
<!-- OPTIONS -->
Nothing special|Store the result in a variable of type int|Call it only from setup()|Use the void keyword
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Since the function returns an int value, you should store the result in a variable of type int (or use it directly in an expression). For example: int sum = add(5, 3);
<!-- QUESTION_END -->



### Functions that Don't Return a Value (void)



\`\`\`cpp

void blinkLED(int pin, int times) {

for (int i = 0; i < times; i++) {

  digitalWrite(pin, HIGH);

  delay(500);

  digitalWrite(pin, LOW);

  delay(500);

}

}

\`\`\`



## Parameters



Functions can accept input values called parameters.



\`\`\`cpp

void functionName(type1 param1, type2 param2) {

// Use param1 and param2 here

}

\`\`\`



## Calling Functions



\`\`\`cpp

// Function definition

int multiply(int x, int y) {

return x * y;

}



// Function call

int result = multiply(5, 3);  // result = 15

\`\`\`



## Example: LED Control Function



\`\`\`cpp

void setup() {

pinMode(13, OUTPUT);

}



void loop() {

blinkLED(13, 3);  // Blink pin 13, 3 times

delay(2000);

}



// Custom function

void blinkLED(int pin, int times) {

for (int i = 0; i < times; i++) {

  digitalWrite(pin, HIGH);

  delay(200);

  digitalWrite(pin, LOW);

  delay(200);

}

}

\`\`\`



## Example: Sensor Reading Function



\`\`\`cpp

int readTemperature() {

int sensorValue = analogRead(A0);

int temperature = map(sensorValue, 0, 1023, 0, 100);

return temperature;

}



void loop() {

int temp = readTemperature();

Serial.println(temp);

delay(1000);

}

\`\`\`



## Function Scope



Variables inside functions are local to that function.



\`\`\`cpp

void setup() {

int x = 10;  // Local to setup

}



void loop() {

int x = 20;  // Different x, local to loop

// setup's x is not accessible here

}

\`\`\`



<!-- QUESTION_START -->
What is the scope of a variable declared inside a function?
<!-- OPTIONS -->
Global - accessible everywhere|Local - only accessible within that function|Accessible in setup() and loop()|Accessible in all functions except the one it was declared in
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Variables declared inside a function are local to that function - they can only be accessed within the function where they are declared. They are not accessible from other functions.
<!-- QUESTION_END -->



## Global vs Local Variables



\`\`\`cpp

int globalVar = 100;  // Global - accessible everywhere



void myFunction() {

int localVar = 50;  // Local - only in this function

globalVar = 200;    // Can modify global

}

\`\`\`



## Benefits of Functions



1. **Code reuse**: Write once, use many times

2. **Organization**: Break complex code into manageable pieces

3. **Debugging**: Easier to test individual parts

4. **Readability**: Makes code easier to understand



<!-- QUESTION_START -->
Can a function call another function?
<!-- OPTIONS -->
No, functions cannot call other functions|Yes, functions can call other functions|Only if both are void functions|Only if called from setup()
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Yes, functions can call other functions! This is a powerful feature that allows you to build complex programs by combining simpler functions together.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What happens if you try to return a value from a void function?
<!-- OPTIONS -->
It works normally|The code will not compile|The return value is ignored|The function automatically changes to int type
<!-- CORRECT -->
1
<!-- EXPLANATION -->
If you try to return a value from a void function, the code will not compile. Void functions cannot return values - if you need to return a value, you must change the return type (e.g., from void to int).
<!-- QUESTION_END -->



## Important Notes



- Functions must be defined before they're called (or use prototypes)

- Parameters are passed by value (copies are made)

- Return type must match the function declaration

- void functions don't return anything

- Functions can call other functions`,
      quizId: null,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'technology',
      lessonNumber: 11,
      title: "Arduino Lesson 9: Working with Arrays",
      emoji: '📋',
      content: `# Arduino Lesson 9: Working with Arrays



## What are Arrays?



Arrays are collections of variables of the same type, stored in contiguous memory locations.



## Array Declaration



\`\`\`cpp

dataType arrayName[size];

\`\`\`



### Example

\`\`\`cpp

int numbers[5];        // Array of 5 integers

float temps[10];       // Array of 10 floats

\`\`\`



## Array Initialization



\`\`\`cpp

int numbers[5] = {1, 2, 3, 4, 5};  // Initialize with values

int pins[] = {2, 4, 7, 8};         // Size determined automatically

\`\`\`



<!-- QUESTION_START -->
How do you initialize an array with values: {10, 20, 30}?
<!-- OPTIONS -->
int arr[3] = 10, 20, 30;|int arr[3] = {10, 20, 30};|int arr = {10, 20, 30};|int arr[] = 10, 20, 30;
<!-- CORRECT -->
1
<!-- EXPLANATION -->
To initialize an array with values, you use curly braces: int arr[3] = {10, 20, 30}; The values are enclosed in curly braces and separated by commas.
<!-- QUESTION_END -->



## Accessing Array Elements



Arrays are zero-indexed (first element is at index 0).



\`\`\`cpp

int numbers[5] = {10, 20, 30, 40, 50};

// Index:        0   1   2   3   4



int first = numbers[0];   // 10

int third = numbers[2];    // 30

int last = numbers[4];     // 50

\`\`\`



<!-- QUESTION_START -->
What is the index of the first element in an array?
<!-- OPTIONS -->
1|0|-1|It depends on the array size
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The first element in an array is at index 0. Arrays in Arduino (and most programming languages) are zero-indexed, meaning counting starts at 0, not 1.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
If you declare "int numbers[5];", what is the valid index range?
<!-- OPTIONS -->
1 to 5|0 to 4|0 to 5|1 to 4
<!-- CORRECT -->
1
<!-- EXPLANATION -->
For an array declared as int numbers[5], the valid indices are 0 to 4. The array has 5 elements, but they are numbered 0, 1, 2, 3, and 4.
<!-- QUESTION_END -->



## Modifying Array Elements



\`\`\`cpp

int numbers[5] = {1, 2, 3, 4, 5};

numbers[0] = 100;  // Change first element to 100

numbers[2] = 300;  // Change third element to 300

\`\`\`



## Array Length



\`\`\`cpp

int arraySize = sizeof(numbers) / sizeof(numbers[0]);

\`\`\`



## Example: Multiple LEDs



\`\`\`cpp

int ledPins[] = {2, 4, 7, 8, 13};

int numLEDs = 5;



void setup() {

for (int i = 0; i < numLEDs; i++) {

  pinMode(ledPins[i], OUTPUT);

}

}



void loop() {

// Turn all LEDs on

for (int i = 0; i < numLEDs; i++) {

  digitalWrite(ledPins[i], HIGH);

}

delay(1000);



// Turn all LEDs off

for (int i = 0; i < numLEDs; i++) {

  digitalWrite(ledPins[i], LOW);

}

delay(1000);

}

\`\`\`



## Example: Storing Sensor Readings



\`\`\`cpp

int readings[10];

int index = 0;



void loop() {

readings[index] = analogRead(A0);

index++;



if (index >= 10) {

  index = 0;  // Reset to beginning

}



delay(100);

}

\`\`\`



## Multidimensional Arrays



Arrays can have multiple dimensions.



\`\`\`cpp

int matrix[3][4];  // 3 rows, 4 columns



// Initialize

int matrix[2][3] = {

{1, 2, 3},

{4, 5, 6}

};

\`\`\`



## Array Bounds



**Important**: Accessing elements outside array bounds causes undefined behavior!



\`\`\`cpp

int numbers[5] = {1, 2, 3, 4, 5};

// numbers[5] is OUT OF BOUNDS! (valid indices are 0-4)

\`\`\`



<!-- QUESTION_START -->
What happens if you access numbers[5] when the array is declared as int numbers[5]?
<!-- OPTIONS -->
It returns 0|It causes undefined behavior - could crash or return garbage|It automatically extends the array|It returns the last valid element
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Accessing numbers[5] when the array size is 5 is out of bounds (valid indices are 0-4). This causes undefined behavior - it could crash the program, return garbage data, or cause other unpredictable results.
<!-- QUESTION_END -->



<!-- QUESTION_START -->
If you have "int leds[] = {2, 4, 7, 8};", what is the value of leds[2]?
<!-- OPTIONS -->
2|4|7|8
<!-- CORRECT -->
2
<!-- EXPLANATION -->
In the array {2, 4, 7, 8}, the indices are: leds[0] = 2, leds[1] = 4, leds[2] = 7, leds[3] = 8. So leds[2] equals 7.
<!-- QUESTION_END -->



## Example: LED Chaser



\`\`\`cpp

int leds[] = {2, 3, 4, 5};

int numLEDs = 4;



void setup() {

for (int i = 0; i < numLEDs; i++) {

  pinMode(leds[i], OUTPUT);

}

}



void loop() {

for (int i = 0; i < numLEDs; i++) {

  digitalWrite(leds[i], HIGH);

  delay(200);

  digitalWrite(leds[i], LOW);

}

}

\`\`\`



## Important Notes



- Arrays are zero-indexed (first element is at index 0)

- Array size must be known at compile time (or use dynamic allocation)

- Be careful not to access elements outside array bounds

- Use loops to iterate through arrays

- Arrays can be passed to functions`,
      quizId: null,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'technology',
      lessonNumber: 12,
      title: "Arduino Lesson 10: Libraries and Serial Communication",
      emoji: '📚',
      content: `# Arduino Lesson 10: Libraries and Serial Communication



## What are Libraries?



Libraries are collections of code that extend Arduino's functionality. They provide pre-written functions for common tasks.



## Using Libraries



\`\`\`cpp

#include <LibraryName.h>  // Include the library

\`\`\`



<!-- QUESTION_START -->
What does #include <LibraryName.h> do?
<!-- OPTIONS -->
Installs the library|Includes the library code so you can use its functions|Removes the library|Checks if the library exists
<!-- CORRECT -->
1
<!-- EXPLANATION -->
#include <LibraryName.h> includes the library code in your sketch, making all the library's functions and classes available for you to use. It doesn't install the library - that must be done separately through the Library Manager.
<!-- QUESTION_END -->



## Common Built-in Libraries



- \`Servo.h\`: Control servo motors

- \`LiquidCrystal.h\`: Control LCD displays

- \`Wire.h\`: I2C communication

- \`SPI.h\`: SPI communication

- \`EEPROM.h\`: Store data in EEPROM



## Example: Using Servo Library



\`\`\`cpp

#include <Servo.h>



Servo myServo;



void setup() {

myServo.attach(9);  // Servo on pin 9

}



void loop() {

myServo.write(90);   // Move to 90 degrees

delay(1000);

myServo.write(0);    // Move to 0 degrees

delay(1000);

}

\`\`\`



## Serial Communication



Serial communication allows Arduino to communicate with computers or other devices.



## Serial.begin()



Initializes serial communication. Must be called in setup().



\`\`\`cpp

Serial.begin(baudRate);

\`\`\`



Common baud rates: 9600, 115200



<!-- QUESTION_START -->
Where should you call Serial.begin()?
<!-- OPTIONS -->
In loop()|In setup()|Before including any libraries|It is not necessary
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Serial.begin() should be called in setup() to initialize serial communication before you can use any Serial functions. It only needs to be called once when the Arduino starts.
<!-- QUESTION_END -->



## Serial.print() and Serial.println()



Sends data to the serial monitor.



\`\`\`cpp

Serial.print(value);      // Prints without newline

Serial.println(value);    // Prints with newline

\`\`\`



<!-- QUESTION_START -->
What is the difference between Serial.print() and Serial.println()?
<!-- OPTIONS -->
Serial.print() is faster|Serial.println() adds a newline character, Serial.print() does not|Serial.print() only works with numbers|There is no difference
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Serial.println() adds a newline character after printing, which moves the cursor to the next line. Serial.print() does not add a newline, so subsequent prints appear on the same line.
<!-- QUESTION_END -->



## Example: Serial Output



\`\`\`cpp

void setup() {

Serial.begin(9600);

}



void loop() {

int sensorValue = analogRead(A0);

Serial.print("Sensor value: ");

Serial.println(sensorValue);

delay(1000);

}

\`\`\`



## Serial.available()



Checks if data is available to read.



\`\`\`cpp

if (Serial.available() > 0) {

// Data available

}

\`\`\`



<!-- QUESTION_START -->
What does Serial.available() return?
<!-- OPTIONS -->
The number of bytes available to read|true or false|The next byte of data|The baud rate
<!-- CORRECT -->
0
<!-- EXPLANATION -->
Serial.available() returns the number of bytes available to read from the serial buffer. If it returns 0, there's no data available. If it returns a number greater than 0, that many bytes are waiting to be read.
<!-- QUESTION_END -->



## Serial.read()



Reads incoming serial data (one byte at a time).



\`\`\`cpp

int incomingByte = Serial.read();

\`\`\`



## Example: Serial Input



\`\`\`cpp

void setup() {

Serial.begin(9600);

pinMode(13, OUTPUT);

}



void loop() {

if (Serial.available() > 0) {

  char command = Serial.read();



  if (command == 'H') {

    digitalWrite(13, HIGH);

    Serial.println("LED ON");

  } else if (command == 'L') {

    digitalWrite(13, LOW);

    Serial.println("LED OFF");

  }

}

}

\`\`\`



## Serial Monitor



The Serial Monitor (Tools → Serial Monitor) allows you to:

- View data sent from Arduino

- Send data to Arduino

- Set baud rate (must match Serial.begin())



<!-- QUESTION_START -->
If Serial.begin(9600) is set, what must the Serial Monitor baud rate be?
<!-- OPTIONS -->
115200|4800|9600|Any value will work
<!-- CORRECT -->
2
<!-- EXPLANATION -->
The Serial Monitor baud rate must match the baud rate set in Serial.begin(). If you use Serial.begin(9600), the Serial Monitor must also be set to 9600 baud, otherwise the communication will be garbled.
<!-- QUESTION_END -->



## Installing External Libraries



1. Sketch → Include Library → Manage Libraries

2. Search for library name

3. Click Install



## Example: Complete Serial Program



\`\`\`cpp

void setup() {

Serial.begin(9600);

pinMode(13, OUTPUT);

Serial.println("Arduino Ready!");

}



void loop() {

if (Serial.available() > 0) {

  String command = Serial.readString();

  command.trim();  // Remove whitespace



  if (command == "on") {

    digitalWrite(13, HIGH);

    Serial.println("LED turned ON");

  } else if (command == "off") {

    digitalWrite(13, LOW);

    Serial.println("LED turned OFF");

  } else {

    Serial.print("Unknown command: ");

    Serial.println(command);

  }

}

}

\`\`\`



## Important Notes



- Always call Serial.begin() in setup() before using Serial

- Baud rate must match between Serial.begin() and Serial Monitor

- Serial.println() adds a newline, Serial.print() doesn't

- Serial.read() returns -1 if no data is available

- Libraries must be included at the top of your sketch

- Check library documentation for proper usage`,
      quizId: null,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'history',
      lessonNumber: 1,
      title: "Prehistoric Times - Before Writing",
      emoji: '🦴',
      content: `# Prehistoric Times - Before Writing 🦴



Let's learn about the time before people could write!



## What is Prehistoric?



- Prehistoric means "before history"

- Before people wrote things down

- We learn from artifacts and fossils

- A very, very long time ago



## The Stone Age



- People used stone tools 🪨

- They lived in caves

- They hunted animals

- They gathered food



## Cave People



- People lived in caves 🕳️

- Caves kept them safe

- They made fires inside

- They painted on cave walls



## First Tools



- People made tools from stone

- Hand axes for cutting

- Spears for hunting

- Scrapers for preparing skins



## Cave Paintings



- People painted on cave walls 🎨

- They painted animals

- They painted hunting scenes

- These paintings still exist!



## Hunter-Gatherers



- People hunted animals 🏹

- They gathered fruits and plants

- They moved from place to place

- They followed the food



## Fun Activities



- Draw Stone Age people

- Make simple tools

- Draw cave paintings

- Learn about prehistoric life



## Remember



- Prehistoric times were before writing

- People used stone tools

- They were hunters and gatherers

- We learn from their artifacts!



## Practice Questions



<!-- QUESTION_START -->
What does "prehistoric" mean?
<!-- OPTIONS -->
After history|Before history|During history|History itself
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Prehistoric means "before history" - before people wrote things down! We learn from artifacts and fossils!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Where did Stone Age people live?
<!-- OPTIONS -->
In houses|In caves|In apartments|In castles
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Stone Age people lived in caves! Caves kept them safe, they made fires inside, and they painted on cave walls!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What did people paint on cave walls?
<!-- OPTIONS -->
Nothing|Animals and hunting scenes|Only flowers|Only people
<!-- CORRECT -->
1
<!-- EXPLANATION -->
People painted animals and hunting scenes on cave walls! These paintings still exist today and tell us about their lives!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What were Stone Age people called?
<!-- OPTIONS -->
Farmers|Hunter-gatherers|Builders|Writers
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Stone Age people were hunter-gatherers! They hunted animals, gathered fruits and plants, and moved from place to place following food!
<!-- QUESTION_END -->`,
      quizId: 61,
      assessmentType: 'history-game',
      categoryId: null,
    }),


    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'history',
      lessonNumber: 3,
      title: "Ancient Egypt - Daily Life",
      emoji: '🏺',
      content: `# Ancient Egypt - Daily Life 🏺



Let's learn about how people lived in ancient Egypt!



## Farming Along the Nile



- Most people were farmers 🌾

- They grew crops by the river

- The Nile flooded each year

- This made the soil good for growing



## Egyptian Writing



- Egyptians wrote in hieroglyphs 📝

- Hieroglyphs are picture writing

- They wrote on papyrus (paper)

- They wrote on walls too



## Egyptian Gods and Goddesses



- Egyptians believed in many gods

- Ra was the sun god ☀️

- Osiris was the god of the dead

- Isis was a powerful goddess



## Daily Life



- People worked hard

- Children helped their families

- People made beautiful things

- They enjoyed music and games



## Building the Pyramids



- Pyramids took many years to build

- Thousands of workers helped

- They moved huge stones

- It was very hard work!



## Fun Activities



- Learn about hieroglyphs

- Draw Egyptian life

- Make a timeline

- Write about daily life



## Remember



- Most people were farmers

- They wrote in hieroglyphs

- They believed in many gods

- Life was different then!



## Practice Questions



<!-- QUESTION_START -->
What did most people do in ancient Egypt?
<!-- OPTIONS -->
Were soldiers|Were farmers|Were kings|Were priests
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Most people in ancient Egypt were farmers! They grew crops by the river, and the Nile flooding made the soil good for growing!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What was Egyptian writing called?
<!-- OPTIONS -->
Cuneiform|Hieroglyphs|Alphabet|Numbers
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Egyptians wrote in hieroglyphs, which are picture writing! They wrote on papyrus (paper) and on walls too!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Who was the sun god in ancient Egypt?
<!-- OPTIONS -->
Osiris|Isis|Ra|Horus
<!-- CORRECT -->
2
<!-- EXPLANATION -->
Ra was the sun god in ancient Egypt! Egyptians believed in many gods - Osiris was the god of the dead, and Isis was a powerful goddess!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
How long did it take to build the pyramids?
<!-- OPTIONS -->
A few days|A few months|Many years|One year
<!-- CORRECT -->
2
<!-- EXPLANATION -->
Pyramids took many years to build! Thousands of workers helped, they moved huge stones, and it was very hard work!
<!-- QUESTION_END -->`,
      quizId: 53,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'history',
      lessonNumber: 4,
      title: "Ancient Mesopotamia - The First Civilization",
      emoji: '🏛️',
      content: `# Ancient Mesopotamia - The First Civilization 🏛️



Let's learn about the very first civilization!



## Where Was Mesopotamia?



- Mesopotamia was between two rivers

- The Tigris and Euphrates rivers

- In the Middle East

- A very fertile area



## The First Cities



- Ur and Babylon were famous cities

- People lived together in cities

- Cities had many people

- They were the first cities!



## The First Writing



- Mesopotamians created the first writing

- It was called cuneiform 📝

- They wrote on clay tablets

- They wrote with a stylus (stick)



## Hammurabi's Code



- Hammurabi was a king

- He created the first laws

- The Code of Hammurabi

- It was written down



## Ziggurats



- Ziggurats were temple towers

- They were very tall

- People climbed them

- They were for worship



## Fun Activities



- Learn about cuneiform

- Draw a ziggurat

- Make a timeline

- Write about Mesopotamia



## Remember



- Mesopotamia was the first civilization

- They created the first writing

- They built the first cities

- They were very important!



## Practice Questions



<!-- QUESTION_START -->
What was Mesopotamia between?
<!-- OPTIONS -->
Two mountains|Two deserts|Two rivers (Tigris and Euphrates)|Two oceans
<!-- CORRECT -->
2
<!-- EXPLANATION -->
Mesopotamia was between two rivers - the Tigris and Euphrates rivers! It was in the Middle East, a very fertile area!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What was the first writing system called?
<!-- OPTIONS -->
Hieroglyphs|Cuneiform|Alphabet|Chinese characters
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Mesopotamians created the first writing called cuneiform! They wrote on clay tablets using a stylus (stick)!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What were ziggurats?
<!-- OPTIONS -->
Houses|Temple towers|Bridges|Roads
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Ziggurats were temple towers! They were very tall, people climbed them, and they were for worship!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Who created the first laws?
<!-- OPTIONS -->
A pharaoh|Hammurabi, a king|A priest|A farmer
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Hammurabi was a king who created the first laws - the Code of Hammurabi! It was written down and was very important!
<!-- QUESTION_END -->`,
      quizId: 94,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'history',
      lessonNumber: 5,
      title: "Ancient China - The Great Wall",
      emoji: '🏯',
      content: `# Ancient China - The Great Wall 🏯



Let's learn about ancient China!



## When Was Ancient China?



- Ancient China existed thousands of years ago

- It was a very long time ago

- It was in Asia

- It was a great civilization



## The Great Wall



- The Great Wall of China is huge! 🧱

- It was built to protect China

- It's very, very long

- You can still see it today!



## Chinese Inventions



- Chinese people invented many things

- They invented paper 📄

- They invented printing

- They invented silk



## Chinese Writing



- Chinese writing uses characters

- Each character means something

- It's very beautiful

- It's still used today



## Emperors



- China had emperors 👑

- Emperors were rulers

- They were very powerful

- They ruled all of China



## Fun Activities



- Learn about the Great Wall

- Draw Chinese characters

- Make a timeline

- Write about ancient China



## Remember



- Ancient China was long ago

- The Great Wall is amazing

- They invented many things

- China was a great civilization!



## Practice Questions



<!-- QUESTION_START -->
Why was the Great Wall of China built?
<!-- OPTIONS -->
For decoration|To protect China|To show off|To keep people in
<!-- CORRECT -->
1
<!-- EXPLANATION -->
The Great Wall of China was built to protect China! It's very, very long and you can still see it today!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What did Chinese people invent?
<!-- OPTIONS -->
Nothing|Paper, printing, and silk|Only paper|Only silk
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Chinese people invented many things including paper, printing, and silk! They were very creative and innovative!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What did Chinese writing use?
<!-- OPTIONS -->
Letters|Characters|Numbers|Pictures only
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Chinese writing uses characters! Each character means something, it's very beautiful, and it's still used today!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
Who ruled ancient China?
<!-- OPTIONS -->
Kings|Emperors|Presidents|Governors
<!-- CORRECT -->
1
<!-- EXPLANATION -->
China had emperors who were rulers! They were very powerful and ruled all of China!
<!-- QUESTION_END -->`,
      quizId: 94,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'history',
      lessonNumber: 6,
      title: "Comparing Ancient Civilizations",
      emoji: '📊',
      content: `# Comparing Ancient Civilizations 📊



Let's compare the ancient civilizations we've learned about!



## What They Had in Common



- All had rivers nearby

- All developed writing

- All had cities

- All had governments

- All created art



## Ancient Egypt



- Nile River

- Pyramids

- Hieroglyphs

- Pharaohs

- Mummies



## Ancient Mesopotamia



- Tigris and Euphrates rivers

- First cities

- Cuneiform writing

- Ziggurats

- First laws



## Ancient China



- Yellow and Yangtze rivers

- Great Wall

- Chinese characters

- Emperors

- Many inventions



## Their Achievements



- All built amazing things

- All created writing systems

- All had strong governments

- All made beautiful art

- All influenced the world



## Fun Activities



- Compare the civilizations

- Make a chart

- Write about similarities

- Write about differences



## Remember



- All civilizations were advanced

- They developed many things

- They influenced us today

- We can learn from them all!



## Practice Questions



<!-- QUESTION_START -->
What did all ancient civilizations have in common?
<!-- OPTIONS -->
Nothing|Rivers nearby, writing, cities, governments, and art|Only rivers|Only writing
<!-- CORRECT -->
1
<!-- EXPLANATION -->
All ancient civilizations had rivers nearby, developed writing, had cities, had governments, and created art! They had many things in common!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What did ancient Egypt have that was special?
<!-- OPTIONS -->
The Great Wall|Pyramids and hieroglyphs|Ziggurats|Chinese characters
<!-- CORRECT -->
1
<!-- EXPLANATION -->
Ancient Egypt had pyramids and hieroglyphs! They also had the Nile River, pharaohs, and mummies!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What was special about ancient Mesopotamia?
<!-- OPTIONS -->
The first cities and first writing|The Great Wall|Pyramids|Chinese characters
<!-- CORRECT -->
0
<!-- EXPLANATION -->
Ancient Mesopotamia had the first cities and created the first writing (cuneiform)! They also had ziggurats and the first laws!
<!-- QUESTION_END -->



<!-- QUESTION_START -->
What did all civilizations do that influenced the world?
<!-- OPTIONS -->
Nothing|Built amazing things, created writing, had governments, made art|Only built things|Only wrote
<!-- CORRECT -->
1
<!-- EXPLANATION -->
All civilizations built amazing things, created writing systems, had strong governments, made beautiful art, and influenced the world!
<!-- QUESTION_END -->`,
      quizId: 94,
      assessmentType: 'history-game',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'technology',
      lessonNumber: 13,
      title: "HTML Programming: SVG Graphics",
      emoji: '🎨',
      content: `# HTML Programming: SVG Graphics 🎨

Create beautiful graphics using SVG code!

## What is SVG?

SVG stands for **Scalable Vector Graphics** - images created with code that can be resized without losing quality.

## Common SVG Elements

- **\`<circle>\`**: Draws a circle - use \`cx\`, \`cy\` for center, \`r\` for radius
- **\`<rect>\`**: Draws a rectangle - use \`x\`, \`y\`, \`width\`, \`height\`
- **\`<line>\`**: Draws a line - use \`x1\`, \`y1\`, \`x2\`, \`y2\`
- **\`<text>\`**: Adds text - use \`x\`, \`y\` for position
- **\`<ellipse>\`**: Draws an oval - use \`cx\`, \`cy\`, \`rx\`, \`ry\`
- **\`<polygon>\`**: Draws shapes with multiple sides - use \`points\`

## Colors & Styling

- \`fill="color"\` - fills the shape with a color
- \`stroke="color"\` - color of the outline
- \`stroke-width="number"\` - thickness of the outline

## Example

\`\`\`html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="50" fill="blue" />
</svg>
\`\`\`

**Edit the code in the editor below and create your own graphics!**`,
      quizId: quizId++,
      assessmentType: 'quiz',
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'technology',
      lessonNumber: 14,
      title: "HTML Programming: SVG Graphics - Rectangles",
      emoji: '⬜',
      content: `# HTML Programming: SVG Graphics - Rectangles ⬜

Learn to create rectangles and squares with SVG!

## Rectangle Basics

- **\`<rect>\`**: Draws a rectangle
- **\`x\`, \`y\`**: Position of the top-left corner
- **\`width\`, \`height\`**: Size of the rectangle
- **\`stroke\`**: Color of the outline
- **\`stroke-width\`**: Thickness of the outline

## Example

\`\`\`html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect x="50" y="50" width="100" height="100" fill="blue" />
</svg>
\`\`\`

**Edit the code in the editor below and practice with rectangles!**`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'technology',
      lessonNumber: 15,
      title: "HTML Programming: SVG Graphics - Lines",
      emoji: '📏',
      content: `# HTML Programming: SVG Graphics - Lines 📏

Learn to draw lines and create patterns with SVG!

## Line Basics

- **\`<line>\`**: Draws a straight line
- **\`x1\`, \`y1\`**: Starting point coordinates
- **\`x2\`, \`y2\`**: Ending point coordinates
- **\`stroke\`**: Required! Lines need a stroke color to be visible
- **\`stroke-width\`**: Thickness of the line

## Example

\`\`\`html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <line x1="50" y1="50" x2="150" y2="150" stroke="black" stroke-width="2" />
</svg>
\`\`\`

**Edit the code in the editor below and create line art!**`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'technology',
      lessonNumber: 16,
      title: "HTML Programming: SVG Graphics - Ellipses & Text",
      emoji: '🔵',
      content: `# HTML Programming: SVG Graphics - Ellipses & Text 🔵

Learn to create ovals and add text to your SVG graphics!

## Ellipse Basics

- **\`<ellipse>\`**: Draws an oval (like a stretched circle)
- **\`cx\`, \`cy\`**: Center point of the ellipse
- **\`rx\`**: Horizontal radius (half the width)
- **\`ry\`**: Vertical radius (half the height)
- When rx = ry, you get a circle!

## Text Basics

- **\`<text>\`**: Adds text to your SVG
- **\`x\`, \`y\`**: Position of the text
- **\`font-size\`**: Size of the text
- **\`text-anchor\`**: Alignment (middle, start, end)

## Example

\`\`\`html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="100" rx="60" ry="40" fill="purple" />
  <text x="100" y="110" font-size="20" text-anchor="middle" fill="white">Hello</text>
</svg>
\`\`\`

**Edit the code in the editor below and combine shapes with text!**`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'technology',
      lessonNumber: 17,
      title: "HTML Programming: SVG Graphics - Polygons",
      emoji: '🔺',
      content: `# HTML Programming: SVG Graphics - Polygons 🔺

Learn to create triangles, stars, and custom shapes with polygons!

## Polygon Basics

- **\`<polygon>\`**: Draws a shape with multiple connected points
- **\`points\`**: List of x,y coordinates separated by spaces
- Each point connects to the next, and the last connects back to the first
- Great for triangles, stars, diamonds, and custom shapes!

## Example

\`\`\`html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <polygon points="100,20 180,80 100,140 20,80" fill="green" />
</svg>
\`\`\`

This creates a diamond shape by connecting 4 points!

**Edit the code in the editor below and create your own polygon shapes!**`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'technology',
      lessonNumber: 18,
      title: "TapTapTap: Intermediate Level 1",
      emoji: '👆',
      content: `# TapTapTap: Intermediate Level 1 👆

Ready for a bit more challenge? This level is faster than the beginner levels!

## How to Play

- Tap the targets as they appear on screen
- Targets appear every 1.5 seconds (faster than beginner!)
- Targets are slightly smaller
- You have 30 seconds to score points!

## Scoring System

- **Bronze**: 10-19 points
- **Silver**: 20-29 points
- **Gold**: 30-39 points
- **Platinum**: 40+ points

You need at least **Bronze** (10 points) to progress!

## Tips

- Focus on accuracy - smaller targets need precise taps
- Keep your hand steady
- Practice makes perfect!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'technology',
      lessonNumber: 19,
      title: "TapTapTap: Intermediate Level 2",
      emoji: '👆',
      content: `# TapTapTap: Intermediate Level 2 👆

Continue improving your reaction time and accuracy!

## How to Play

- Tap targets as they appear
- Same speed as Level 1 - keep practicing!
- 30 seconds to score as many points as you can

## Scoring System

- **Bronze**: 10-19 points
- **Silver**: 20-29 points
- **Gold**: 30-39 points
- **Platinum**: 40+ points

You need at least **Bronze** (10 points) to progress!

## Challenge

Can you improve your score from Level 1? Try to get a higher medal!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'technology',
      lessonNumber: 20,
      title: "Flappy Bird Game",
      emoji: '🐦',
      content: `# Flappy Bird Game 🐦

Master your skills!

## How to Play

- Press **SPACE** to make the bird jump
- Navigate through the pipes
- The pipes are faster and the gaps are smaller!
- Stay focused!

## Scoring System

- **Bronze**: 1-5 points
- **Silver**: 6-11 points
- **Gold**: 12-19 points
- **Platinum**: 20+ points

You need at least **Bronze** (1 point) to progress!`,
      quizId: null,
      assessmentType: null,
      categoryId: null,
    }),

    new Lesson({
      id: lessonId++,
      yearId: 'year2',
      subjectId: 'history',
      lessonNumber: 2,
      title: "Abrahamic Religious Figures",
      emoji: '📜',
      content: `# Abrahamic Religious Figures 📜

Follow the amazing journey of history across the ancient world!

## Abraham's Faith
Abraham was a very brave man who lived a long time ago in a city called Ur. He taught people to be good and honest. When he stood up for what was right, a miracle saved him from a great fire! He then traveled across the desert to the land of Canaan.

## Joseph's Wisdom
Joseph was the great-grandson of Abraham. He had a special dream about eleven stars and the sun and moon. Although his jealous brothers threw him into a well, he eventually went to Egypt and became a wise leader. He saved many people from hunger during a great famine.

## Moses' Leadership
Many years later, Moses was born in Egypt. He was a brave leader who helped his people find their freedom. At Mount Sinai, he received special laws from God that taught everyone how to live in peace and kindness.

## Lessons from the Past
- **Migration**: Moving to new lands to find peace.
- **Resilience**: Staying strong even when things are difficult.
- **Leadership**: Helping others and being a good example.`,
      quizId: null,
      assessmentType: 'prophet-journey-game',
      categoryId: null,
    }),

  ];
}

import { Quiz } from '../models/Quiz.js';
import { Question } from '../models/Question.js';

/**
 * Get default quizzes
 */
export function getDefaultQuizzes(startQuizId, startQuestionId) {
  let quizId = startQuizId;
  let questionId = startQuestionId;

  return [
    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Counting to 10 Quiz",
        category: "Maths",
        ageGroup: 5,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What comes after 5?",
            options: ["4","6","7","8"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How many fingers do you have on one hand?",
            options: ["3","4","5","6"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is 2 + 3?",
            options: ["4","5","6","7"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Adding Numbers Quiz",
        category: "Maths",
        ageGroup: 5,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is 1 + 1?",
            options: ["1","2","3","4"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is 3 + 2?",
            options: ["4","5","6","7"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "The Alphabet Test",
        category: "English",
        ageGroup: 5,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the first letter of the alphabet?",
            options: ["A","B","C","D"],
            correctAnswerIndex: 0,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the last letter of the alphabet?",
            options: ["X","Y","Z","W"],
            correctAnswerIndex: 2,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Counting to 20 Quiz",
        category: "Maths",
        ageGroup: 6,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What comes after 15?",
            options: ["14","16","17","18"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is 10 + 5?",
            options: ["14","15","16","17"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Recognising Numbers Challenge",
        category: "Maths",
        ageGroup: 4,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Which number is three?",
            options: ["1","2","3","4"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How many is five?",
            options: ["3","4","5","6"],
            correctAnswerIndex: 2,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Counting to 10 Quiz",
        category: "Maths",
        ageGroup: 3,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What number comes after 5?",
            options: ["4","6","7","8"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How many fingers do you have on one hand?",
            options: ["3","4","5","6"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the biggest number we learned in this lesson?",
            options: ["5","8","10","12"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What number comes before 7?",
            options: ["5","6","8","9"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "If you count 1, 2, 3, 4, 5, what comes next?",
            options: ["4","6","7","10"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Counting to 20 Quiz",
        category: "Maths",
        ageGroup: 3,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What number comes after 10?",
            options: ["9","11","12","20"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How many fingers and toes do you have altogether?",
            options: ["10","15","20","25"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the biggest number we learned in this lesson?",
            options: ["10","15","20","25"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What number comes after 15?",
            options: ["14","16","17","18"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "If you count 10, 11, 12, 13, 14, what comes next?",
            options: ["13","15","16","20"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Arduino Lesson 1: void setup() Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How many times does the setup() function execute in an Arduino program?",
            options: ["Once at the start","Continuously in a loop","Only when called explicitly","Twice - once at start and once at end"],
            correctAnswerIndex: 0,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the primary purpose of the setup() function?",
            options: ["To run the main program logic","To initialize pins and configure the Arduino","To create an infinite loop","To handle serial communication only"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "If you forget to include setup() in your Arduino sketch, what happens?",
            options: ["The program runs normally","The code will not compile","Only the loop() function runs","The Arduino resets continuously"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Which of the following is typically done in setup() but NOT in loop()?",
            options: ["Reading sensor values","Controlling LEDs","Setting pin modes with pinMode()","Using delay() functions"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does the \"void\" keyword in \"void setup()\" indicate?",
            options: ["The function returns an integer","The function returns a boolean value","The function does not return any value","The function can be called multiple times"],
            correctAnswerIndex: 2,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Arduino Lesson 2: void loop() Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "After setup() completes, what happens to the loop() function?",
            options: ["It runs once and stops","It runs continuously until power is removed","It only runs when called from setup()","It runs exactly 100 times"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the execution order in an Arduino program?",
            options: ["loop() runs first, then setup()","setup() and loop() run simultaneously","setup() runs once, then loop() runs forever","Only loop() runs, setup() is optional"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "If you want your Arduino to respond quickly to inputs, what should you avoid in loop()?",
            options: ["Using digitalRead()","Using long delay() statements","Using if statements","Using variables"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What happens if you create an infinite loop inside loop() using while(true)?",
            options: ["The program runs normally","The Arduino will reset","The loop() function will never complete that iteration","The setup() function will run again"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Which statement is TRUE about the loop() function?",
            options: ["It must contain at least one delay() call","It can be empty but must still exist","It only runs if setup() calls it","It runs before setup() executes"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Arduino Lesson 3: Semicolons Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Which of the following requires a semicolon?",
            options: ["void setup() { }","if (condition) { }","int x = 5;","for (int i = 0; i < 10; i++) { }"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What happens if you forget a semicolon after a statement?",
            options: ["The program runs normally","The code will not compile","The statement is ignored","The Arduino resets"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Which line is CORRECT?",
            options: ["digitalWrite(13, HIGH)","pinMode(13, OUTPUT)","int count = 10","Serial.begin(9600);"],
            correctAnswerIndex: 3,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Where should you NOT place a semicolon?",
            options: ["After variable declarations","After function calls","After the closing brace of a function definition","After assignment statements"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "If you get a compilation error on line 10 saying \"expected ';' before...\", where is the actual problem likely to be?",
            options: ["On line 10","On line 9 (the previous line)","In the setup() function","In the loop() function"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Arduino Lesson 4: Variables and Data Types Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Which data type should you use to store a decimal number like 3.14?",
            options: ["int","float","char","boolean"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the range of values an int variable can store?",
            options: ["0 to 255","-32,768 to 32,767","-128 to 127","0 to 1023"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Which variable name is INVALID in Arduino?",
            options: ["myVariable","sensor_value","int","ledPin"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the difference between a global and local variable?",
            options: ["Global variables are faster","Local variables can only be accessed within the function they are declared","Global variables use less memory","There is no difference"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "If you declare \"int count = 5;\" inside setup(), can you access it in loop()?",
            options: ["Yes, always","No, it is local to setup()","Only if you use the extern keyword","Yes, but you must initialize it again"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Arduino Lesson 5: Digital I/O Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does pinMode(13, OUTPUT) do?",
            options: ["Sets pin 13 to HIGH","Configures pin 13 as an output pin","Reads the value from pin 13","Turns on an LED on pin 13"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What values can digitalRead() return?",
            options: ["0 to 1023","HIGH or LOW","true or false","Any integer value"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Why would you use INPUT_PULLUP instead of INPUT?",
            options: ["To make the pin read faster","To prevent the pin from floating and having uncertain values","To increase the voltage on the pin","To enable analog reading"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What happens if you try to use digitalWrite() on a pin configured as INPUT?",
            options: ["It works normally","It has no effect","The pin automatically switches to OUTPUT","The Arduino resets"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "If you read a button connected with INPUT_PULLUP, what value indicates the button is pressed?",
            options: ["HIGH","LOW","1","Both HIGH and 1 are correct"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Arduino Lesson 6: Analog I/O Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the range of values returned by analogRead()?",
            options: ["0 to 255","0 to 1023","-1023 to 1023","0 to 5"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Which pins can be used with analogRead()?",
            options: ["All digital pins","Only pins marked with ~","Only analog pins A0-A5","Pins 0-13"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does analogWrite() actually do?",
            options: ["Creates a true analog voltage","Uses PWM (Pulse Width Modulation) to simulate analog","Converts digital to analog","Only works with analog pins"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the range of values for analogWrite()?",
            options: ["0 to 1023","0 to 255","-255 to 255","0 to 100"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "If you read a sensor value of 512 with analogRead(A0), and want to control an LED brightness with analogWrite(9, value), what should the value be to get 50% brightness?",
            options: ["512","255","128","1023"],
            correctAnswerIndex: 2,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Arduino Lesson 7: Control Structures Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the difference between == and = in Arduino?",
            options: ["There is no difference","== is for comparison, = is for assignment","= is for comparison, == is for assignment","Both are used for assignment"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How many times will this loop execute: for (int i = 0; i < 5; i++) { }?",
            options: ["4 times","5 times","6 times","Infinite times"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does the && operator do?",
            options: ["Logical OR - at least one condition must be true","Logical AND - both conditions must be true","Logical NOT - reverses the condition","Performs addition"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What happens if you write: while(true) { } in your loop() function?",
            options: ["The program runs normally","The while loop never exits, blocking the rest of loop()","The Arduino resets","The setup() function runs again"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "In the condition \"if (sensorValue > 500 && sensorValue < 800)\", when will the code execute?",
            options: ["When sensorValue is less than 500","When sensorValue is between 500 and 800 (exclusive)","When sensorValue is greater than 800","When sensorValue equals 500 or 800"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Arduino Lesson 8: Functions Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does the \"void\" keyword in a function declaration mean?",
            options: ["The function takes no parameters","The function does not return a value","The function can only be called once","The function is empty"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "If you define a function \"int add(int a, int b) { return a + b; }\", what must you do when calling it?",
            options: ["Nothing special","Store the result in a variable of type int","Call it only from setup()","Use the void keyword"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the scope of a variable declared inside a function?",
            options: ["Global - accessible everywhere","Local - only accessible within that function","Accessible in setup() and loop()","Accessible in all functions except the one it was declared in"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Can a function call another function?",
            options: ["No, functions cannot call other functions","Yes, functions can call other functions","Only if both are void functions","Only if called from setup()"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What happens if you try to return a value from a void function?",
            options: ["It works normally","The code will not compile","The return value is ignored","The function automatically changes to int type"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Arduino Lesson 9: Arrays Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the index of the first element in an array?",
            options: ["1","0","-1","It depends on the array size"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "If you declare \"int numbers[5];\", what is the valid index range?",
            options: ["1 to 5","0 to 4","0 to 5","1 to 4"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What happens if you access numbers[5] when the array is declared as int numbers[5]?",
            options: ["It returns 0","It causes undefined behavior - could crash or return garbage","It automatically extends the array","It returns the last valid element"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How do you initialize an array with values: {10, 20, 30}?",
            options: ["int arr[3] = 10, 20, 30;","int arr[3] = {10, 20, 30};","int arr = {10, 20, 30};","int arr[] = 10, 20, 30;"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "If you have \"int leds[] = {2, 4, 7, 8};\", what is the value of leds[2]?",
            options: ["2","4","7","8"],
            correctAnswerIndex: 2,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Arduino Lesson 10: Libraries and Serial Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Where should you call Serial.begin()?",
            options: ["In loop()","In setup()","Before including any libraries","It is not necessary"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the difference between Serial.print() and Serial.println()?",
            options: ["Serial.print() is faster","Serial.println() adds a newline character, Serial.print() does not","Serial.print() only works with numbers","There is no difference"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does Serial.available() return?",
            options: ["The number of bytes available to read","true or false","The next byte of data","The baud rate"],
            correctAnswerIndex: 0,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "If Serial.begin(9600) is set, what must the Serial Monitor baud rate be?",
            options: ["115200","4800","9600","Any value will work"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does #include <LibraryName.h> do?",
            options: ["Installs the library","Includes the library code so you can use its functions","Removes the library","Checks if the library exists"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Fusion 360 Lesson 1: Introduction Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does CAD stand for?",
            options: ["Computer-Aided Design","Computer-Aided Drawing","Computer Application Development","Computer Analysis and Design"],
            correctAnswerIndex: 0,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Which workspace in Fusion 360 is used to create 3D models?",
            options: ["Render","Animation","Design","Simulation"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How do you orbit (rotate) the view in Fusion 360?",
            options: ["Left mouse button","Right mouse button","Middle mouse button","Scroll wheel"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the ViewCube used for?",
            options: ["Creating cubes","Navigating and orienting your view","Measuring dimensions","Applying materials"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Where are your Fusion 360 designs stored?",
            options: ["On your local hard drive only","In the cloud automatically","On a USB drive","They are not saved"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Fusion 360 Lesson 2: Sketching Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is a sketch in Fusion 360?",
            options: ["A 3D model","A 2D drawing that forms the foundation of 3D models","A rendered image","An animation"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does a fully constrained sketch look like?",
            options: ["Red","Blue","Black","Green"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Which tool creates circles in a sketch?",
            options: ["Line tool","Rectangle tool","Circle tool","Arc tool"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does the Coincident constraint do?",
            options: ["Makes lines parallel","Makes points touch","Sets dimensions","Creates angles"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What must you do before you can create 3D features from a sketch?",
            options: ["Save the file","Apply materials","Finish the sketch","Create a render"],
            correctAnswerIndex: 2,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Fusion 360 Lesson 3: Extrude Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does the Extrude tool do?",
            options: ["Rotates a sketch","Takes a 2D sketch and extends it into the third dimension","Applies materials","Creates animations"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Which Extrude operation removes material from an existing body?",
            options: ["New Body","Join","Cut","Intersect"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What type of profile can be extruded to create a solid?",
            options: ["Open profiles with gaps","Closed profiles with no gaps","Any profile","Only circles"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does the \"Two Sides\" extrusion option do?",
            options: ["Extrudes in one direction only","Extrudes equally in both directions","Creates two separate bodies","Cuts material from both sides"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Where can you edit an extrude after creating it?",
            options: ["In the sketch","From the timeline","In the render workspace","In the animation workspace"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Fusion 360 Lesson 4: Constraints Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What color indicates a fully constrained sketch?",
            options: ["Blue","Red","Black","Orange"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does the Parallel constraint do?",
            options: ["Makes two lines meet at 90 degrees","Makes two or more lines parallel to each other","Makes points touch","Sets equal dimensions"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does a red sketch element indicate?",
            options: ["Fully constrained","Under-constrained","Over-constrained with conflicts","Driven dimension"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the best practice for constraining sketches?",
            options: ["Add dimensions first, then geometric constraints","Add geometric constraints first, then dimensions","Only use dimensions","Only use geometric constraints"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does the Tangent constraint do?",
            options: ["Makes lines parallel","Makes a line or arc touch a curve smoothly","Sets dimensions","Creates angles"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Fusion 360 Lesson 5: Revolve Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does the Revolve tool do?",
            options: ["Extrudes a profile","Rotates a 2D profile around an axis","Applies materials","Creates patterns"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the most common angle for a full revolve?",
            options: ["90°","180°","270°","360°"],
            correctAnswerIndex: 3,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Can the profile cross the axis in a revolve?",
            options: ["Yes, always","No, the profile must not cross the axis","Only for partial revolves","Only for 360° revolves"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What type of objects is Revolve best suited for?",
            options: ["Flat rectangular parts","Rotationally symmetric objects like cylinders and bowls","Complex assemblies","2D drawings"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should you include in your sketch for a revolve?",
            options: ["Only the profile","The profile and the axis line","Only dimensions","Materials"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Fusion 360 Lesson 6: Fillet and Chamfer Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the main difference between a fillet and a chamfer?",
            options: ["Fillet adds material, chamfer removes material","Fillet removes material, chamfer adds material","They are the same","Fillet is for circles, chamfer is for squares"],
            correctAnswerIndex: 0,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is a fillet used for?",
            options: ["Creating sharp edges","Creating rounded corners for safety and strength","Removing material","Adding decorative patterns"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Where is the Fillet tool located?",
            options: ["Create menu","Modify menu","Assemble menu","Render menu"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What happens if you make a fillet radius too large?",
            options: ["Nothing","It strengthens the part","It can weaken the part or cause errors","It automatically adjusts"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is a chamfer commonly used for?",
            options: ["Creating rounded edges","Creating beveled edges for assembly and safety","Adding material","Creating patterns"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Fusion 360 Lesson 7: Patterns Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the main advantage of using patterns?",
            options: ["They make files smaller","They save time and ensure consistency","They improve rendering quality","They add materials automatically"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Which pattern type creates copies arranged in a circle?",
            options: ["Rectangular Pattern","Circular Pattern","Path Pattern","Linear Pattern"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What happens when you edit the original feature in a pattern?",
            options: ["Only the original changes","All instances in the pattern update","The pattern is deleted","Nothing happens"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does the Mirror tool create?",
            options: ["A pattern of copies","A mirror image copy across a plane","A rotated copy","A scaled copy"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is a Path Pattern used for?",
            options: ["Creating copies in rows and columns","Creating copies arranged in a circle","Creating copies along a curve or edge","Creating mirror images"],
            correctAnswerIndex: 2,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Fusion 360 Lesson 8: Assemblies Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the difference between a Body and a Component?",
            options: ["There is no difference","A Body is a single solid, a Component can hold bodies and move independently","A Component is a single solid, a Body can hold components","They are the same thing"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What type of joint allows rotation around one axis?",
            options: ["Rigid Joint","Revolute Joint","Slider Joint","Ball Joint"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does a Rigid Joint do?",
            options: ["Allows free movement","Fixes components together with no movement","Allows rotation only","Allows sliding only"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What workspace allows you to test assembly motion?",
            options: ["Design workspace","Render workspace","Motion Study workspace","Manufacture workspace"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is an As-Built Joint used for?",
            options: ["Creating new joints","For components already positioned correctly","Deleting joints","Editing joint properties"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Fusion 360 Lesson 9: Rendering Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What workspace is used for creating photorealistic images?",
            options: ["Design workspace","Render workspace","Animation workspace","Manufacture workspace"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does the Roughness property control?",
            options: ["The color of the material","How smooth or rough the surface is","The size of the object","The lighting intensity"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Which render quality setting is fastest?",
            options: ["Maximum","Final","Draft","They are all the same speed"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the most common resolution for high-quality renders?",
            options: ["640x480","1280x720","1920x1080 (Full HD)","3840x2160 (4K)"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What makes a render look realistic?",
            options: ["High polygon count","Appropriate materials, good lighting, and proper setup","Large file size","Complex geometry only"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Fusion 360 Lesson 10: Exporting Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What file format is most common for 3D printing?",
            options: ["STEP","STL","OBJ","DXF"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does STL stand for?",
            options: ["Standard Triangle Language","Stereolithography","Simple Text Layout","Solid Transfer Language"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What file format is best for manufacturing and CAD exchange?",
            options: ["STL","STEP","OBJ","JPEG"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What must a model be for successful 3D printing?",
            options: ["Colored","Rendered","Watertight (solid with no gaps)","Animated"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is G-code used for?",
            options: ["Rendering images","Controlling manufacturing machines","Applying materials","Creating animations"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Learning the Alphabet Quiz",
        category: "English",
        ageGroup: 3,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How many letters are in the alphabet?",
            options: ["20","24","26","30"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What letter comes after A?",
            options: ["B","C","D","E"],
            correctAnswerIndex: 0,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Learning Letter Sounds Quiz",
        category: "English",
        ageGroup: 3,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What sound does the letter B make?",
            options: ["buh","duh","fuh","guh"],
            correctAnswerIndex: 0,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What sound does the letter C make?",
            options: ["cuh","duh","eh","fuh"],
            correctAnswerIndex: 0,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Simple Words Quiz",
        category: "English",
        ageGroup: 3,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How do you spell CAT?",
            options: ["C-A-T","C-A-R","D-O-G","H-A-T"],
            correctAnswerIndex: 0,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What word is D-O-G?",
            options: ["Cat","Dog","Hat","Sun"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "My Family History Quiz",
        category: "History",
        ageGroup: 3,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Who is in your family?",
            options: ["Just me","Mummy and Daddy","Friends","Pets only"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What can you look at to see family history?",
            options: ["Toys","Photos","Food","Clothes"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Growing Up Quiz",
        category: "History",
        ageGroup: 3,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What can you do now that you couldn't do as a baby?",
            options: ["Walk","Eat","Sleep","Cry"],
            correctAnswerIndex: 0,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How many fingers and toes do you have together?",
            options: ["10","15","20","25"],
            correctAnswerIndex: 2,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Days of the Week Quiz",
        category: "History",
        ageGroup: 3,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How many days are in a week?",
            options: ["5","6","7","8"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What day comes after Friday?",
            options: ["Thursday","Saturday","Sunday","Monday"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Phonics: Letter Sounds Quiz",
        category: "English",
        ageGroup: 4,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What sound does A make?",
            options: ["/a/ like apple","/b/ like ball","/c/ like cat","/d/ like dog"],
            correctAnswerIndex: 0,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What word do you get when you blend C-A-T?",
            options: ["Dog","Cat","Hat","Bat"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Reading Simple Sentences Quiz",
        category: "English",
        ageGroup: 4,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should a sentence start with?",
            options: ["A small letter","A capital letter","A number","A picture"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should a sentence end with?",
            options: ["A comma","A full stop","A question mark","Both B and C"],
            correctAnswerIndex: 3,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Writing My Name Quiz",
        category: "English",
        ageGroup: 4,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should the first letter of your name be?",
            options: ["Small letter","Capital letter","Number","Symbol"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What helps you get better at writing?",
            options: ["Watching TV","Practice","Sleeping","Eating"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "My Timeline Quiz",
        category: "History",
        ageGroup: 4,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is a timeline?",
            options: ["A line showing events in order","A type of clock","A drawing","A story"],
            correctAnswerIndex: 0,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What can you use to make a timeline?",
            options: ["Photos","Drawings","Dates","All of the above"],
            correctAnswerIndex: 3,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Seasons and Time Quiz",
        category: "History",
        ageGroup: 4,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How many seasons are there?",
            options: ["2","3","4","5"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What season comes after summer?",
            options: ["Spring","Autumn","Winter","Summer again"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Old and New Quiz",
        category: "History",
        ageGroup: 4,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What can old photos tell us?",
            options: ["About the past","About the future","About space","About animals"],
            correctAnswerIndex: 0,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Do things change over time?",
            options: ["No, never","Yes, sometimes","Only toys","Only food"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Using a Computer Quiz",
        category: "Technology",
        ageGroup: 4,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should you do before using a computer?",
            options: ["Just start using it","Ask a grown-up","Turn it off","Unplug it"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What helps us click on things?",
            options: ["Keyboard","Mouse","Screen","Speaker"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Digital Drawing Quiz",
        category: "Technology",
        ageGroup: 4,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What can you use to draw on a computer?",
            options: ["Paintbrush tool","Colors","Shapes","All of the above"],
            correctAnswerIndex: 3,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should you do with your artwork?",
            options: ["Delete it","Save it","Ignore it","Hide it"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Staying Safe Online Quiz",
        category: "Technology",
        ageGroup: 4,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should you do if something makes you feel uncomfortable online?",
            options: ["Keep looking","Tell a grown-up","Ignore it","Click on it"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Should you share your name with strangers online?",
            options: ["Yes, always","No, never","Sometimes","Only if they ask"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Famous People from History Quiz",
        category: "History",
        ageGroup: 5,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Who was Queen Elizabeth I?",
            options: ["A nurse","Queen of England","A writer","A scientist"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What was Florence Nightingale known for?",
            options: ["Being a queen","Being a nurse","Writing plays","Being a soldier"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Life Long Ago Quiz",
        category: "History",
        ageGroup: 5,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How did people travel long ago?",
            options: ["By car","By walking or horses","By airplane","By train only"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Did people have electricity long ago?",
            options: ["Yes, always","No, not at first","Only in cities","Only at night"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Local History Quiz",
        category: "History",
        ageGroup: 5,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What can old buildings tell us?",
            options: ["About the future","About the past","About space","About animals"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Where can we find local history?",
            options: ["Only in books","All around us","Only in museums","Only online"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Introduction to Coding Quiz",
        category: "Technology",
        ageGroup: 5,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is coding?",
            options: ["Drawing pictures","Giving instructions to computers","Playing games","Watching videos"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What do computers do with code?",
            options: ["Ignore it","Follow it exactly","Change it","Delete it"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Using a Mouse and Keyboard Quiz",
        category: "Technology",
        ageGroup: 5,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does left click do?",
            options: ["Nothing","Select and open things","Close programs","Turn off computer"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What key makes spaces between words?",
            options: ["Enter","Space Bar","Shift","Tab"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Creating Digital Stories Quiz",
        category: "Technology",
        ageGroup: 5,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What are the parts of a story?",
            options: ["Only beginning","Beginning, middle, end","Only end","Only middle"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What makes digital stories fun?",
            options: ["Only words","Only pictures","Words and pictures together","Nothing"],
            correctAnswerIndex: 2,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Reading Comprehension Quiz",
        category: "English",
        ageGroup: 6,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does comprehension mean?",
            options: ["Reading fast","Understanding what you read","Reading out loud","Reading silently"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What questions should you ask when reading?",
            options: ["Only who","Who, what, where, when, why","Only what","Only when"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Writing Sentences Quiz",
        category: "English",
        ageGroup: 6,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should a sentence start with?",
            options: ["A small letter","A capital letter","A number","A symbol"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What ends a statement?",
            options: ["A comma","A full stop","A question mark","Nothing"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Grammar Basics Quiz",
        category: "English",
        ageGroup: 6,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is a noun?",
            options: ["An action word","A word for a person, place, or thing","A describing word","A connecting word"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is a verb?",
            options: ["A person, place, or thing","An action word","A describing word","A type of sentence"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "The Great Fire of London Quiz",
        category: "History",
        ageGroup: 6,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "When did the Great Fire of London happen?",
            options: ["1665","1666","1667","1668"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Where did the fire start?",
            options: ["A house","A bakery","A church","A school"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Ancient Egypt Quiz",
        category: "History",
        ageGroup: 6,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What river was important to ancient Egypt?",
            options: ["Thames","Nile","Amazon","Mississippi"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What were pyramids used for?",
            options: ["Houses","Tombs for pharaohs","Markets","Schools"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "The Romans in Britain Quiz",
        category: "History",
        ageGroup: 6,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "When did the Romans come to Britain?",
            options: ["AD 30","AD 43","AD 60","AD 100"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What did the Romans build?",
            options: ["Only houses","Roads, walls, and towns","Only walls","Only roads"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Multiplication Tables Quiz",
        category: "Maths",
        ageGroup: 7,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is 2 × 5?",
            options: ["7","10","12","15"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is 5 × 4?",
            options: ["15","18","20","25"],
            correctAnswerIndex: 2,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Division Basics Quiz",
        category: "Maths",
        ageGroup: 7,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is 12 ÷ 3?",
            options: ["3","4","5","6"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is 20 ÷ 4?",
            options: ["4","5","6","7"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Fractions Introduction Quiz",
        category: "Maths",
        ageGroup: 7,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does ½ mean?",
            options: ["One quarter","One half","One third","One whole"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does ¼ mean?",
            options: ["One half","One quarter","One third","One whole"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Writing Paragraphs Quiz",
        category: "English",
        ageGroup: 7,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is a paragraph?",
            options: ["One sentence","A group of sentences about one idea","A whole story","A list"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should a paragraph start with?",
            options: ["A closing sentence","A topic sentence","A question","A number"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Reading Comprehension Skills Quiz",
        category: "English",
        ageGroup: 7,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the main idea?",
            options: ["A detail","What the text is mostly about","A character","A setting"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What helps you understand a text?",
            options: ["Reading fast","Asking questions as you read","Skipping parts","Only reading once"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Spelling and Vocabulary Quiz",
        category: "English",
        ageGroup: 7,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What do you add to \"play\" to make \"playing\"?",
            options: ["-ed","-ing","-s","-er"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How do you get better at spelling?",
            options: ["Never practice","Practice regularly","Only read","Only write"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "The Stone Age Quiz",
        category: "History",
        ageGroup: 7,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What were Stone Age tools made from?",
            options: ["Metal","Plastic","Stone","Wood only"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How did Stone Age people get food?",
            options: ["From shops","By hunting and gathering","By farming only","By ordering"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "The Vikings Quiz",
        category: "History",
        ageGroup: 7,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Where did the Vikings come from?",
            options: ["Britain","Scandinavia","France","Spain"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What were Vikings known for?",
            options: ["Farming only","Sailing and exploring","Writing books","Building cities"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "The Tudors Quiz",
        category: "History",
        ageGroup: 7,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "When did the Tudors rule England?",
            options: ["1485-1603","1400-1500","1600-1700","1300-1400"],
            correctAnswerIndex: 0,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Who was a famous Tudor monarch?",
            options: ["King Arthur","Henry VIII","William the Conqueror","Alfred the Great"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Long Multiplication Quiz",
        category: "Maths",
        ageGroup: 8,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is 23 × 4?",
            options: ["87","90","92","95"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is 34 × 2?",
            options: ["66","68","70","72"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Fractions and Decimals Quiz",
        category: "Maths",
        ageGroup: 8,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is ½ as a decimal?",
            options: ["0.25","0.5","0.75","1.0"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is ¼ as a decimal?",
            options: ["0.2","0.25","0.3","0.4"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Measurement and Units Quiz",
        category: "Maths",
        ageGroup: 8,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How many centimeters in a meter?",
            options: ["10","50","100","1000"],
            correctAnswerIndex: 2,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How many grams in a kilogram?",
            options: ["10","100","500","1000"],
            correctAnswerIndex: 3,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Creative Writing Quiz",
        category: "English",
        ageGroup: 8,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What are the parts of a story?",
            options: ["Only beginning","Beginning, middle, end","Only end","Only middle"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should you use in creative writing?",
            options: ["Only facts","Your imagination","Only numbers","Only questions"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Poetry and Rhyme Quiz",
        category: "English",
        ageGroup: 8,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What are rhyming words?",
            options: ["Words that look the same","Words that sound the same at the end","Words that mean the same","Words that start the same"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What rhymes with \"cat\"?",
            options: ["Dog","Hat","Sun","Tree"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Grammar: Verbs and Tenses Quiz",
        category: "English",
        ageGroup: 8,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does past tense show?",
            options: ["What is happening now","What happened before","What will happen","What might happen"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the past tense of \"walk\"?",
            options: ["Walking","Walked","Will walk","Walks"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Ancient Greece Quiz",
        category: "History",
        ageGroup: 8,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What did ancient Greece create?",
            options: ["Only art","Democracy","Only buildings","Only stories"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What started in ancient Greece?",
            options: ["The internet","The Olympics","Cars","Computers"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "The Anglo-Saxons Quiz",
        category: "History",
        ageGroup: 8,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "When did the Anglo-Saxons come to Britain?",
            options: ["After the Romans left","Before the Romans","With the Romans","During Roman times"],
            correctAnswerIndex: 0,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Who was King Alfred the Great?",
            options: ["A Roman","King of Wessex","A Viking","A Norman"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "The Battle of Hastings Quiz",
        category: "History",
        ageGroup: 8,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "When did the Battle of Hastings happen?",
            options: ["October 14, 1065","October 14, 1066","October 14, 1067","October 14, 1068"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Who won the Battle of Hastings?",
            options: ["Harold Godwinson","William the Conqueror","King Alfred","A Viking"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Scratch Programming Basics Quiz",
        category: "Technology",
        ageGroup: 8,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is Scratch?",
            options: ["A game","A visual programming language","A website","A book"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What do you use in Scratch to create programs?",
            options: ["Words only","Blocks","Numbers only","Pictures only"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Digital Design Quiz",
        category: "Technology",
        ageGroup: 8,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is digital design?",
            options: ["Drawing on paper","Creating graphics on computers","Writing stories","Playing games"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should you consider in design?",
            options: ["Only color","Color, layout, and balance","Only layout","Only balance"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Internet Safety Quiz",
        category: "Technology",
        ageGroup: 8,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Should you share personal information online?",
            options: ["Yes, always","No, never","Sometimes","Only with friends"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should you do if someone is mean online?",
            options: ["Be mean back","Tell a grown-up","Ignore it completely","Share it with everyone"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Percentages Quiz",
        category: "Maths",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does 50% mean?",
            options: ["50 out of 100","50 out of 50","50 out of 10","50 out of 1000"],
            correctAnswerIndex: 0,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is 50% of 100?",
            options: ["25","50","75","100"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Geometry: Shapes and Angles Quiz",
        category: "Maths",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How many degrees in a right angle?",
            options: ["45°","90°","180°","360°"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What shape has 4 equal sides and 4 right angles?",
            options: ["Rectangle","Square","Triangle","Circle"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Problem Solving Quiz",
        category: "Maths",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the first step in solving a problem?",
            options: ["Guess the answer","Read carefully and understand","Skip it","Ask someone else"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should you do after solving a problem?",
            options: ["Forget about it","Check your answer","Show everyone","Hide it"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Writing Essays Quiz",
        category: "English",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What are the parts of an essay?",
            options: ["Only introduction","Introduction, body, conclusion","Only body","Only conclusion"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should the introduction do?",
            options: ["End the essay","Introduce the topic and hook the reader","Give all the details","Ask questions only"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Literature Analysis Quiz",
        category: "English",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is analysis?",
            options: ["Reading fast","Looking closely to understand better","Only reading","Only writing"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should you use to support your analysis?",
            options: ["Only your opinion","Evidence from the text","Only guesses","Only pictures"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Advanced Grammar Quiz",
        category: "English",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is a complex sentence?",
            options: ["One simple sentence","A sentence with a main clause and subordinate clause","Only questions","Only statements"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is active voice?",
            options: ["Subject receives action","Subject does the action","No action","Only past tense"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "World War I Quiz",
        category: "History",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "When did World War I happen?",
            options: ["1912-1916","1914-1918","1916-1920","1918-1922"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Where did soldiers live during the war?",
            options: ["In houses","In trenches","In castles","In cities"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "World War II Quiz",
        category: "History",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "When did World War II happen?",
            options: ["1937-1943","1939-1945","1941-1947","1943-1949"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What was the Blitz?",
            options: ["A battle","German bombing of British cities","A type of ship","A weapon"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "The Industrial Revolution Quiz",
        category: "History",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "When did the Industrial Revolution happen?",
            options: ["1700-1750","1760-1840","1850-1900","1900-1950"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What changed during the Industrial Revolution?",
            options: ["Only art","Machines replaced hand work, factories were built","Only food","Only clothes"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Advanced Scratch Programming Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What are variables used for?",
            options: ["Drawing pictures","Storing information that can change","Only colors","Only sounds"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What do loops do?",
            options: ["Stop code","Repeat code","Delete code","Hide code"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Web Development Basics Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does HTML stand for?",
            options: ["HyperText Markup Language","High Tech Modern Language","Home Text Making Language","Happy Text Marking Language"],
            correctAnswerIndex: 0,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does CSS do?",
            options: ["Makes web pages look nice","Creates the structure","Adds interactivity","Deletes content"],
            correctAnswerIndex: 0,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Digital Citizenship Quiz",
        category: "Technology",
        ageGroup: 9,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is digital citizenship?",
            options: ["Using technology irresponsibly","Using technology responsibly, safely, and respectfully","Only playing games","Only watching videos"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should you do if you see cyberbullying?",
            options: ["Join in","Tell a grown-up","Ignore it completely","Share it"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Algebra Introduction Quiz",
        category: "Maths",
        ageGroup: 10,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does algebra use to represent unknown numbers?",
            options: ["Only numbers","Letters like x and y","Only pictures","Only words"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is x if x + 5 = 10?",
            options: ["3","5","7","15"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Statistics and Data Quiz",
        category: "Maths",
        ageGroup: 10,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is the mean (average)?",
            options: ["The middle number","Add all numbers, divide by count","The most common number","The biggest number"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What chart shows categories?",
            options: ["Line graph","Bar chart","Pie chart","All of them"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Advanced Problem Solving Quiz",
        category: "Maths",
        ageGroup: 10,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is a multi-step problem?",
            options: ["A problem with one step","A problem that needs more than one step","An easy problem","A problem with no steps"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What strategy can help solve problems?",
            options: ["Only guessing","Drawing diagrams, making tables, working backwards","Only asking others","Only giving up"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Advanced Creative Writing Quiz",
        category: "English",
        ageGroup: 10,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should you develop in a story?",
            options: ["Only the ending","Characters, plot, and setting","Only the beginning","Only dialogue"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does \"show, don't tell\" mean?",
            options: ["Only tell everything","Let readers see and feel through description","Only show pictures","Only use dialogue"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Literary Analysis and Criticism Quiz",
        category: "English",
        ageGroup: 10,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is a theme?",
            options: ["A character","The main message or idea","A setting","A plot"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should you use to support your analysis?",
            options: ["Only your opinion","Quotes and evidence from the text","Only guesses","Only pictures"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Persuasive Writing Quiz",
        category: "English",
        ageGroup: 10,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is persuasive writing?",
            options: ["Just telling a story","Writing to convince the reader to agree","Only asking questions","Only listing facts"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should you use in persuasive writing?",
            options: ["Only emotions","Evidence, logic, and persuasive techniques","Only opinions","Only questions"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Ancient Civilizations Quiz",
        category: "History",
        ageGroup: 10,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is a civilization?",
            options: ["Just a city","An advanced society with cities, writing, government","Just people","Just buildings"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Which ancient civilization built pyramids?",
            options: ["Ancient Greece","Ancient Egypt","Ancient China","All of them"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "The Renaissance Quiz",
        category: "History",
        ageGroup: 10,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does \"Renaissance\" mean?",
            options: ["End","Rebirth","Beginning","Middle"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "Who painted the Mona Lisa?",
            options: ["Michelangelo","Leonardo da Vinci","Shakespeare","Galileo"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Historical Sources and Evidence Quiz",
        category: "History",
        ageGroup: 10,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is a primary source?",
            options: ["Created later","Created at the time of events","Only books","Only pictures"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should you ask about sources?",
            options: ["Nothing","Who, when, why, and is it reliable","Only who","Only when"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Python Programming Introduction Quiz",
        category: "Technology",
        ageGroup: 10,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What is Python?",
            options: ["A snake","A programming language","A game","A website"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does print() do in Python?",
            options: ["Deletes text","Prints text to the screen","Saves files","Opens programs"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Advanced Web Development Quiz",
        category: "Technology",
        ageGroup: 10,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does CSS do?",
            options: ["Creates structure","Styles web pages","Adds interactivity only","Deletes content"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What does JavaScript add to websites?",
            options: ["Only structure","Interactivity","Only styling","Nothing"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })(),

    (() => {
      const currentQuizId = quizId++;
      return new Quiz({
        id: currentQuizId,
        title: "Technology and Society Quiz",
        category: "Technology",
        ageGroup: 10,
        questions: [
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "How does technology affect society?",
            options: ["It doesn't","It changes how we communicate, learn, work, and live","Only communication","Only work"],
            correctAnswerIndex: 1,
          }),
          new Question({
            id: questionId++,
            quizId: currentQuizId,
            questionText: "What should we think about with technology?",
            options: ["Nothing","How it helps, problems, and how to use it responsibly","Only problems","Only good things"],
            correctAnswerIndex: 1,
          })
        ],
      });
    })()

  ];
}

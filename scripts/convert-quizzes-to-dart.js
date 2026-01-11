import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read quizzes.json
const quizzesJsonPath = path.join(__dirname, '..', 'assets', 'quizzes.json');
const quizzesData = JSON.parse(fs.readFileSync(quizzesJsonPath, 'utf8'));

// Map difficulty to ageGroup (approximate)
const difficultyToAgeGroup = {
  'easy': 7,
  'medium': 9,
  'hard': 11
};

// Convert letter to index (A=0, B=1, C=2)
function letterToIndex(letter) {
  return letter.charCodeAt(0) - 65; // 'A' = 65, so A=0, B=1, C=2
}

// Convert a single quiz from JSON format to Dart format
function convertQuiz(quizKey, quizData, startQuizId, startQuestionId) {
  const quizId = startQuizId;
  let questionId = startQuestionId;
  const questions = [];
  
  // Get correct answers
  const correctAnswers = quizData.correct_answers || {};
  
  // Collect all questions from all sections
  const allQuestions = [];
  if (quizData.sections) {
    Object.keys(quizData.sections).sort((a, b) => parseInt(a) - parseInt(b)).forEach(sectionKey => {
      const section = quizData.sections[sectionKey];
      if (section.questions) {
        section.questions.forEach(q => {
          allQuestions.push({
            number: q.number,
            text: q.text,
            options: q.options,
            correctLetter: correctAnswers[q.number.toString()]
          });
        });
      }
    });
  }
  
  // Sort questions by number
  allQuestions.sort((a, b) => a.number - b.number);
  
  // Convert each question
  allQuestions.forEach(q => {
    const options = q.options.map(opt => {
      // Handle both string and object formats
      if (typeof opt === 'string') {
        return opt;
      }
      return opt.text || opt;
    });
    
    const correctLetter = q.correctLetter;
    const correctIndex = correctLetter ? letterToIndex(correctLetter) : 0;
    
    questions.push({
      id: questionId++,
      quizId: quizId,
      questionText: q.text,
      options: options,
      correctAnswerIndex: correctIndex
    });
  });
  
  // Determine ageGroup from difficulty
  const ageGroup = difficultyToAgeGroup[quizData.difficulty] || 7;
  
  // Determine category (all are History based on the file)
  const category = 'History';
  
  return {
    quizId: quizId,
    nextQuestionId: questionId,
    quiz: {
      id: quizId,
      title: quizData.title || quizData.name,
      category: category,
      ageGroup: ageGroup,
      questions: questions
    }
  };
}

// Convert all quizzes
// There are 99 existing quizzes, so start at 100
let currentQuizId = 100;
let currentQuestionId = 1; // Will be calculated, but we'll use questionId++ in output
const convertedQuizzes = [];

Object.keys(quizzesData).forEach(quizKey => {
  if (quizKey === 'reading_material' || quizKey === 'correct_answers') {
    return; // Skip metadata
  }
  
  const quizData = quizzesData[quizKey];
  const result = convertQuiz(quizKey, quizData, currentQuizId, currentQuestionId);
  
  convertedQuizzes.push({
    ...result.quiz,
    actualQuizId: currentQuizId
  });
  currentQuestionId = result.nextQuestionId;
  currentQuizId++;
});

// Generate Dart code
function generateDartCode(quizzes) {
  let code = '';
  
  quizzes.forEach(quiz => {
    const actualQuizId = quiz.actualQuizId || quiz.id;
    code += `\n    Quiz(\n`;
    code += `\n      id: quizId++,\n\n`;
    code += `      title: '${quiz.title.replace(/'/g, "\\'")}',\n\n`;
    code += `      category: '${quiz.category}',\n\n`;
    code += `      ageGroup: ${quiz.ageGroup},\n\n`;
    code += `      questions: [\n\n`;
    
    quiz.questions.forEach(q => {
      code += `        Question(\n\n`;
      code += `          id: questionId++,\n\n`;
      code += `          quizId: ${actualQuizId},\n\n`;
      code += `          questionText: '${q.questionText.replace(/'/g, "\\'")}',\n\n`;
      code += `          options: [${q.options.map(opt => `'${opt.replace(/'/g, "\\'")}'`).join(', ')}],\n\n`;
      code += `          correctAnswerIndex: ${q.correctAnswerIndex},\n\n`;
      code += `        ),\n\n`;
    });
    
    code += `      ],\n\n`;
    code += `    ),\n`;
  });
  
  return code;
}

const dartCode = generateDartCode(convertedQuizzes);

// Write to a file
const outputPath = path.join(__dirname, '..', 'quizzes_dart_output.txt');
fs.writeFileSync(outputPath, dartCode, 'utf8');

console.log(`Converted ${convertedQuizzes.length} quizzes`);
console.log(`Output written to ${outputPath}`);
console.log(`\nQuiz IDs: ${convertedQuizzes.map(q => q.id).join(', ')}`);


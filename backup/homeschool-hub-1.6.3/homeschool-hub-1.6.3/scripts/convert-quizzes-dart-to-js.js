import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Convert Dart Quiz blocks to JavaScript
 */
function convertDartQuizzesToJS(dartContent) {
  const quizzes = [];
  let pos = 0;
  
  while (pos < dartContent.length) {
    // Find next Quiz( block
    const quizStart = dartContent.indexOf('    Quiz(', pos);
    if (quizStart === -1) break;
    
    // Find the matching closing parenthesis
    let depth = 0;
    let currentPos = quizStart + 9; // After "    Quiz("
    const quizData = { questions: [] };
    
    while (currentPos < dartContent.length) {
      // Track parentheses depth
      if (dartContent[currentPos] === '(') depth++;
      if (dartContent[currentPos] === ')') {
        if (depth === 0) {
          // Found the closing paren for this Quiz
          const quizBlock = dartContent.substring(quizStart, currentPos + 1);
          
          // Extract quiz fields
          const idMatch = quizBlock.match(/id:\s*quizId\+\+/);
          if (idMatch) quizData.hasId = true;
          
          const titleMatch = quizBlock.match(/title:\s*'((?:[^'\\]|\\.)*)'/);
          if (titleMatch) quizData.title = titleMatch[1].replace(/\\'/g, "'");
          
          const categoryMatch = quizBlock.match(/category:\s*'([^']+)'/);
          if (categoryMatch) quizData.category = categoryMatch[1];
          
          const ageGroupMatch = quizBlock.match(/ageGroup:\s*(\d+)/);
          if (ageGroupMatch) quizData.ageGroup = parseInt(ageGroupMatch[1]);
          
          // Extract questions
          const questionRegex = /Question\(\s*id:\s*questionId\+\+,\s*quizId:\s*(\d+),\s*questionText:\s*'((?:[^'\\]|\\.)*)',\s*options:\s*\[(.*?)\],\s*correctAnswerIndex:\s*(\d+),/gs;
          let questionMatch;
          while ((questionMatch = questionRegex.exec(quizBlock)) !== null) {
            const optionsStr = questionMatch[3];
            // Parse options array
            const options = optionsStr.match(/'((?:[^'\\]|\\.)*)'/g)?.map(opt => 
              opt.slice(1, -1).replace(/\\'/g, "'")
            ) || [];
            
            quizData.questions.push({
              quizId: parseInt(questionMatch[1]),
              questionText: questionMatch[2].replace(/\\'/g, "'"),
              options: options,
              correctAnswerIndex: parseInt(questionMatch[4])
            });
          }
          
          if (quizData.title && quizData.questions.length > 0) {
            quizzes.push(quizData);
          }
          
          pos = currentPos + 1;
          break;
        }
        depth--;
      }
      
      currentPos++;
    }
    
    if (currentPos >= dartContent.length) break;
  }
  
  // Generate JavaScript
  let jsCode = `import { Quiz } from '../models/Quiz.js';\nimport { Question } from '../models/Question.js';\n\n/**\n * Get default quizzes\n */\nexport function getDefaultQuizzes(startQuizId, startQuestionId) {\n  let quizId = startQuizId;\n  let questionId = startQuestionId;\n\n  return [\n`;
  
  quizzes.forEach((quiz, quizIndex) => {
    jsCode += `    (() => {\n`;
    jsCode += `      const currentQuizId = quizId++;\n`;
    jsCode += `      return new Quiz({\n`;
    jsCode += `        id: currentQuizId,\n`;
    jsCode += `        title: ${JSON.stringify(quiz.title)},\n`;
    jsCode += `        category: ${JSON.stringify(quiz.category)},\n`;
    jsCode += `        ageGroup: ${quiz.ageGroup},\n`;
    jsCode += `        questions: [\n`;
    
    quiz.questions.forEach((question, qIndex) => {
      jsCode += `          new Question({\n`;
      jsCode += `            id: questionId++,\n`;
      jsCode += `            quizId: currentQuizId,\n`;
      jsCode += `            questionText: ${JSON.stringify(question.questionText)},\n`;
      jsCode += `            options: ${JSON.stringify(question.options)},\n`;
      jsCode += `            correctAnswerIndex: ${question.correctAnswerIndex},\n`;
      jsCode += `          })${qIndex < quiz.questions.length - 1 ? ',' : ''}\n`;
    });
    
    jsCode += `        ],\n`;
    jsCode += `      });\n`;
    jsCode += `    })()${quizIndex < quizzes.length - 1 ? ',' : ''}\n\n`;
  });
  
  jsCode += `  ];\n}\n`;
  return jsCode;
}

try {
  const dartPath = path.join(__dirname, '..', 'lib', 'data', 'quizzes', 'default_quizzes.dart');
  const jsPath = path.join(__dirname, '..', 'src', 'data', 'defaultQuizzes.js');
  
  console.log('Reading Dart file...');
  const dartContent = readFileSync(dartPath, 'utf-8');
  
  console.log('Converting to JavaScript...');
  const jsContent = convertDartQuizzesToJS(dartContent);
  
  console.log('Writing JavaScript file...');
  writeFileSync(jsPath, jsContent, 'utf-8');
  
  const quizCount = jsContent.match(/new Quiz\(/g)?.length || 0;
  const questionCount = jsContent.match(/new Question\(/g)?.length || 0;
  console.log(`✓ Converted quizzes: ${quizCount} quizzes, ${questionCount} questions`);
} catch (error) {
  console.error('✗ Error converting quizzes:', error.message);
  console.error(error.stack);
}

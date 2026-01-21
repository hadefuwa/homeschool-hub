import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Improved converter that properly parses Dart Lesson blocks
 */
function convertDartToJS(dartContent, yearName, functionName) {
  const lessons = [];
  let pos = 0;
  
  while (pos < dartContent.length) {
    // Find next Lesson( block
    const lessonStart = dartContent.indexOf('    Lesson(', pos);
    if (lessonStart === -1) break;
    
    // Find the matching closing parenthesis
    let depth = 0;
    let currentPos = lessonStart + 11; // After "    Lesson("
    let contentStart = -1;
    let contentEnd = -1;
    const lessonData = {};
    
    while (currentPos < dartContent.length) {
      // Check for content block
      if (dartContent.substring(currentPos, currentPos + 3) === "'''") {
        if (contentStart === -1) {
          contentStart = currentPos + 3;
          currentPos += 3;
          continue;
        } else {
          contentEnd = currentPos;
          lessonData.content = dartContent.substring(contentStart, contentEnd).trim();
          currentPos += 3;
          // Continue to find closing paren
        }
      }
      
      // Track parentheses depth
      if (dartContent[currentPos] === '(') depth++;
      if (dartContent[currentPos] === ')') {
        if (depth === 0) {
          // Found the closing paren for this Lesson
          const lessonBlock = dartContent.substring(lessonStart, currentPos + 1);
          
          // Extract fields
          const yearIdMatch = lessonBlock.match(/yearId:\s*'([^']+)'/);
          if (yearIdMatch) lessonData.yearId = yearIdMatch[1];
          
          const subjectIdMatch = lessonBlock.match(/subjectId:\s*'([^']+)'/);
          if (subjectIdMatch) lessonData.subjectId = subjectIdMatch[1];
          
          const lessonNumberMatch = lessonBlock.match(/lessonNumber:\s*(\d+)/);
          if (lessonNumberMatch) lessonData.lessonNumber = parseInt(lessonNumberMatch[1]);
          
          // Handle title with both single and double quotes
          const titleSingleMatch = lessonBlock.match(/title:\s*'((?:[^'\\]|\\.)*)'/);
          const titleDoubleMatch = lessonBlock.match(/title:\s*"((?:[^"\\]|\\.)*)"/);
          if (titleSingleMatch) {
            lessonData.title = titleSingleMatch[1].replace(/\\'/g, "'");
          } else if (titleDoubleMatch) {
            lessonData.title = titleDoubleMatch[1].replace(/\\"/g, '"');
          }
          
          const emojiMatch = lessonBlock.match(/emoji:\s*'([^']*)'/);
          if (emojiMatch) lessonData.emoji = emojiMatch[1] || '📚';
          
          // Check for quiz
          const quizIdMatch = lessonBlock.match(/quizId:\s*(quizId\+\+|null)/);
          lessonData.hasQuiz = quizIdMatch && quizIdMatch[1] !== 'null';
          
          const assessmentTypeMatch = lessonBlock.match(/assessmentType:\s*('([^']+)'|null)/);
          if (assessmentTypeMatch) lessonData.assessmentType = assessmentTypeMatch[2] || null;
          
          const categoryIdMatch = lessonBlock.match(/categoryId:\s*('([^']+)'|null)/);
          if (categoryIdMatch) lessonData.categoryId = categoryIdMatch[2] || null;
          
          if (lessonData.content && lessonData.yearId && lessonData.subjectId && lessonData.title) {
            lessons.push(lessonData);
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
  let jsCode = `import { Lesson } from '../../models/Lesson.js';\n\n/**\n * ${yearName} Lessons\n */\nexport function ${functionName}(startLessonId, startQuizId) {\n  let lessonId = startLessonId;\n  let quizId = startQuizId;\n\n  return [\n`;
  
  lessons.forEach((lesson, index) => {
    let content = lesson.content || '';
    // Escape backticks and template literals
    content = content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\${/g, '\\${');
    
    jsCode += `    new Lesson({\n`;
    jsCode += `      id: lessonId++,\n`;
    jsCode += `      yearId: '${lesson.yearId}',\n`;
    jsCode += `      subjectId: '${lesson.subjectId}',\n`;
    jsCode += `      lessonNumber: ${lesson.lessonNumber},\n`;
    jsCode += `      title: ${JSON.stringify(lesson.title)},\n`;
    jsCode += `      emoji: '${lesson.emoji || '📚'}',\n`;
    jsCode += `      content: \`${content}\`,\n`;
    jsCode += `      quizId: ${lesson.hasQuiz ? 'quizId++' : 'null'},\n`;
    jsCode += `      assessmentType: ${lesson.assessmentType ? `'${lesson.assessmentType}'` : 'null'},\n`;
    jsCode += `      categoryId: ${lesson.categoryId ? `'${lesson.categoryId}'` : 'null'},\n`;
    jsCode += `    })${index < lessons.length - 1 ? ',' : ''}\n\n`;
  });
  
  jsCode += `  ];\n}\n`;
  return jsCode;
}

// Convert each year
const years = [
  { dart: 'nursery_lessons.dart', js: 'nurseryLessons.js', name: 'Nursery', func: 'getNurseryLessons' },
  { dart: 'reception_lessons.dart', js: 'receptionLessons.js', name: 'Reception', func: 'getReceptionLessons' },
  { dart: 'year1_lessons.dart', js: 'year1Lessons.js', name: 'Year 1', func: 'getYear1Lessons' },
  { dart: 'year2_lessons.dart', js: 'year2Lessons.js', name: 'Year 2', func: 'getYear2Lessons' },
  { dart: 'year3_lessons.dart', js: 'year3Lessons.js', name: 'Year 3', func: 'getYear3Lessons' },
  { dart: 'year4_lessons.dart', js: 'year4Lessons.js', name: 'Year 4', func: 'getYear4Lessons' },
  { dart: 'year5_lessons.dart', js: 'year5Lessons.js', name: 'Year 5', func: 'getYear5Lessons' },
  { dart: 'year6_lessons.dart', js: 'year6Lessons.js', name: 'Year 6', func: 'getYear6Lessons' },
];

console.log('Starting conversion...\n');

years.forEach(({ dart, js, name, func }) => {
  try {
    const dartPath = path.join(__dirname, '..', 'lib', 'data', 'lessons', dart);
    const jsPath = path.join(__dirname, '..', 'src', 'data', 'lessons', js);
    
    const dartContent = readFileSync(dartPath, 'utf-8');
    const jsContent = convertDartToJS(dartContent, name, func);
    
    writeFileSync(jsPath, jsContent, 'utf-8');
    const lessonCount = jsContent.match(/new Lesson\(/g)?.length || 0;
    console.log(`✓ Converted ${dart} -> ${js} (${lessonCount} lessons)`);
  } catch (error) {
    console.error(`✗ Error converting ${dart}:`, error.message);
    console.error(error.stack);
  }
});

console.log('\nConversion complete!');

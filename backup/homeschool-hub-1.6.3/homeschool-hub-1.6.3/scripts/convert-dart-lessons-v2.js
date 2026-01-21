import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Better converter that handles multi-line content blocks
 */
function convertDartToJS(dartContent, yearName, functionName) {
  const lessons = [];
  let currentIndex = 0;
  
  // Find all Lesson( blocks
  while (true) {
    const lessonStart = dartContent.indexOf('Lesson(', currentIndex);
    if (lessonStart === -1) break;
    
    // Find the matching closing parenthesis for this Lesson
    let depth = 0;
    let pos = lessonStart + 6; // After "Lesson("
    let contentStart = -1;
    let contentEnd = -1;
    let lessonData = {};
    
    // Parse the lesson block
    while (pos < dartContent.length) {
      if (dartContent.substring(pos, pos + 3) === "'''") {
        if (contentStart === -1) {
          contentStart = pos + 3;
          pos += 3;
          continue;
        } else {
          contentEnd = pos;
          lessonData.content = dartContent.substring(contentStart, contentEnd).trim();
          pos += 3;
          break;
        }
      }
      
      // Extract fields
      if (dartContent.substring(pos, pos + 3) === 'id:') {
        const match = dartContent.substring(pos).match(/id:\s*lessonId\+\+/);
        if (match) lessonData.hasId = true;
      }
      if (dartContent.substring(pos, pos + 8) === 'yearId:') {
        const match = dartContent.substring(pos).match(/yearId:\s*'([^']+)'/);
        if (match) lessonData.yearId = match[1];
      }
      if (dartContent.substring(pos, pos + 10) === 'subjectId:') {
        const match = dartContent.substring(pos).match(/subjectId:\s*'([^']+)'/);
        if (match) lessonData.subjectId = match[1];
      }
      if (dartContent.substring(pos, pos + 13) === 'lessonNumber:') {
        const match = dartContent.substring(pos).match(/lessonNumber:\s*(\d+)/);
        if (match) lessonData.lessonNumber = parseInt(match[1]);
      }
      if (dartContent.substring(pos, pos + 6) === 'title:') {
        // Handle both single and double quotes, and escaped quotes
        const singleQuoteMatch = dartContent.substring(pos).match(/title:\s*'((?:[^'\\]|\\.)*)'/);
        const doubleQuoteMatch = dartContent.substring(pos).match(/title:\s*"((?:[^"\\]|\\.)*)"/);
        if (singleQuoteMatch) lessonData.title = singleQuoteMatch[1].replace(/\\'/g, "'");
        else if (doubleQuoteMatch) lessonData.title = doubleQuoteMatch[1].replace(/\\"/g, '"');
      }
      if (dartContent.substring(pos, pos + 6) === 'emoji:') {
        const match = dartContent.substring(pos).match(/emoji:\s*'([^']*)'/);
        if (match) lessonData.emoji = match[1] || '📚';
      }
      if (dartContent.substring(pos, pos + 7) === 'quizId:') {
        const match = dartContent.substring(pos).match(/quizId:\s*(quizId\+\+|null)/);
        if (match) lessonData.hasQuiz = match[1] !== 'null';
      }
      if (dartContent.substring(pos, pos + 15) === 'assessmentType:') {
        const match = dartContent.substring(pos).match(/assessmentType:\s*('([^']+)'|null)/);
        if (match) lessonData.assessmentType = match[2] || null;
      }
      if (dartContent.substring(pos, pos + 11) === 'categoryId:') {
        const match = dartContent.substring(pos).match(/categoryId:\s*('([^']+)'|null)/);
        if (match) lessonData.categoryId = match[2] || null;
      }
      
      pos++;
      
      // Check for end of lesson block
      if (dartContent[pos] === ')' && depth === 0 && contentEnd !== -1) {
        // Found complete lesson
        if (lessonData.content && lessonData.yearId && lessonData.subjectId) {
          lessons.push(lessonData);
        }
        currentIndex = pos + 1;
        break;
      }
      
      if (dartContent[pos] === '(') depth++;
      if (dartContent[pos] === ')') depth--;
    }
    
    if (pos >= dartContent.length) break;
  }
  
  // Generate JavaScript
  let jsCode = `import { Lesson } from '../../models/Lesson.js';\n\n/**\n * ${yearName} Lessons\n */\nexport function ${functionName}(startLessonId, startQuizId) {\n  let lessonId = startLessonId;\n  let quizId = startQuizId;\n\n  return [\n`;
  
  lessons.forEach((lesson, index) => {
    let content = lesson.content || '';
    // Escape backticks and template literals
    content = content.replace(/`/g, '\\`');
    content = content.replace(/\${/g, '\\${');
    
    jsCode += `    new Lesson({\n`;
    jsCode += `      id: lessonId++,\n`;
    jsCode += `      yearId: '${lesson.yearId}',\n`;
    jsCode += `      subjectId: '${lesson.subjectId}',\n`;
    jsCode += `      lessonNumber: ${lesson.lessonNumber},\n`;
    jsCode += `      title: '${lesson.title.replace(/'/g, "\\'")}',\n`;
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

years.forEach(({ dart, js, name, func }) => {
  try {
    const dartPath = path.join(__dirname, '..', 'lib', 'data', 'lessons', dart);
    const jsPath = path.join(__dirname, '..', 'src', 'data', 'lessons', js);
    
    const dartContent = readFileSync(dartPath, 'utf-8');
    const jsContent = convertDartToJS(dartContent, name, func);
    
    writeFileSync(jsPath, jsContent, 'utf-8');
    console.log(`✓ Converted ${dart} -> ${js} (${jsContent.match(/new Lesson\(/g)?.length || 0} lessons)`);
  } catch (error) {
    console.error(`✗ Error converting ${dart}:`, error.message);
  }
});

console.log('\nConversion complete!');



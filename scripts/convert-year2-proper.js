import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Proper parser for year2 lessons that handles triple-quoted strings
 */
function parseLessons(dartContent) {
  const lessons = [];
  let pos = 0;
  
  while (true) {
    // Find next Lesson(
    const lessonStart = dartContent.indexOf('Lesson(', pos);
    if (lessonStart === -1) break;
    
    pos = lessonStart + 7; // After "Lesson("
    
    const lesson = {};
    let depth = 0;
    let inContent = false;
    let contentStart = -1;
    
    // Parse until we find the closing )
    while (pos < dartContent.length) {
      // Check for triple quote start
      if (dartContent.substring(pos, pos + 3) === "'''" && !inContent) {
        inContent = true;
        contentStart = pos + 3;
        pos += 3;
        continue;
      }
      
      // Check for triple quote end
      if (dartContent.substring(pos, pos + 3) === "'''" && inContent) {
        lesson.content = dartContent.substring(contentStart, pos).trim();
        inContent = false;
        pos += 3;
        continue;
      }
      
      // Extract fields when not in content
      if (!inContent) {
        // yearId
        if (dartContent.substring(pos, pos + 8) === 'yearId:') {
          const match = dartContent.substring(pos).match(/yearId:\s*'([^']+)'/);
          if (match) lesson.yearId = match[1];
        }
        
        // subjectId
        if (dartContent.substring(pos, pos + 10) === 'subjectId:') {
          const match = dartContent.substring(pos).match(/subjectId:\s*'([^']+)'/);
          if (match) lesson.subjectId = match[1];
        }
        
        // lessonNumber
        if (dartContent.substring(pos, pos + 13) === 'lessonNumber:') {
          const match = dartContent.substring(pos).match(/lessonNumber:\s*(\d+)/);
          if (match) lesson.lessonNumber = parseInt(match[1]);
        }
        
        // title
        if (dartContent.substring(pos, pos + 6) === 'title:') {
          const match = dartContent.substring(pos).match(/title:\s*'([^']+)'/);
          if (match) lesson.title = match[1];
        }
        
        // emoji
        if (dartContent.substring(pos, pos + 6) === 'emoji:') {
          const match = dartContent.substring(pos).match(/emoji:\s*'([^']*)'/);
          if (match) lesson.emoji = match[1] || '📚';
        }
        
        // quizId
        if (dartContent.substring(pos, pos + 7) === 'quizId:') {
          const match = dartContent.substring(pos).match(/quizId:\s*(quizId\+\+|null)/);
          if (match) lesson.hasQuiz = match[1] !== 'null';
        }
        
        // assessmentType
        if (dartContent.substring(pos, pos + 15) === 'assessmentType:') {
          const match = dartContent.substring(pos).match(/assessmentType:\s*('([^']+)'|null)/);
          if (match) lesson.assessmentType = match[2] || null;
        }
        
        // Check for end of lesson
        if (dartContent[pos] === ')' && depth === 0 && lesson.content) {
          if (lesson.yearId && lesson.subjectId && lesson.lessonNumber && lesson.title) {
            lessons.push(lesson);
          }
          pos++;
          break;
        }
        
        if (dartContent[pos] === '(') depth++;
        if (dartContent[pos] === ')') depth--;
      }
      
      pos++;
    }
  }
  
  return lessons;
}

function convertToJS(lessons, yearName, functionName) {
  let jsCode = `import { Lesson } from '../../models/Lesson.js';\n\n/**\n * ${yearName} Lessons\n */\nexport function ${functionName}(startLessonId, startQuizId) {\n  let lessonId = startLessonId;\n  let quizId = startQuizId;\n\n  return [\n`;
  
  lessons.forEach((lesson, index) => {
    let content = lesson.content || '';
    // Escape backticks and template literals
    content = content.replace(/`/g, '\\`');
    content = content.replace(/\${/g, '\\${');
    // Clean up extra whitespace
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    const title = (lesson.title || '').replace(/'/g, "\\'");
    const emoji = lesson.emoji || '📚';
    const assessmentType = lesson.assessmentType ? `'${lesson.assessmentType}'` : 'null';
    
    jsCode += `    new Lesson({\n`;
    jsCode += `      id: lessonId++,\n`;
    jsCode += `      yearId: '${lesson.yearId}',\n`;
    jsCode += `      subjectId: '${lesson.subjectId}',\n`;
    jsCode += `      lessonNumber: ${lesson.lessonNumber},\n`;
    jsCode += `      title: '${title}',\n`;
    jsCode += `      emoji: '${emoji}',\n`;
    jsCode += `      content: \`${content}\`,\n`;
    jsCode += `      quizId: ${lesson.hasQuiz ? 'quizId++' : 'null'},\n`;
    jsCode += `      assessmentType: ${assessmentType},\n`;
    jsCode += `      categoryId: null,\n`;
    jsCode += `    })${index < lessons.length - 1 ? ',' : ''}\n\n`;
  });
  
  jsCode += `  ];\n}\n`;
  return jsCode;
}

// Convert year2
try {
  const dartPath = path.join(__dirname, '..', 'lib', 'data', 'lessons', 'year2_lessons.dart');
  const jsPath = path.join(__dirname, '..', 'src', 'data', 'lessons', 'year2Lessons.js');
  
  const dartContent = readFileSync(dartPath, 'utf-8');
  const lessons = parseLessons(dartContent);
  const jsContent = convertToJS(lessons, 'Year 2', 'getYear2Lessons');
  
  writeFileSync(jsPath, jsContent, 'utf-8');
  console.log(`✓ Converted year2_lessons.dart -> year2Lessons.js (${lessons.length} lessons)`);
} catch (error) {
  console.error(`✗ Error converting year2:`, error.message);
  console.error(error.stack);
}


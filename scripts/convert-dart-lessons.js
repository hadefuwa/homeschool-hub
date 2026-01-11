import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Convert Dart lesson files to JavaScript
 * This script parses the Dart lesson structure and converts it to JavaScript
 */

function convertDartToJS(dartContent, yearName, functionName) {
  // Extract lessons using regex
  const lessonMatches = [...dartContent.matchAll(/Lesson\(\s*id:\s*lessonId\+\+,\s*yearId:\s*'([^']+)',\s*subjectId:\s*'([^']+)',\s*lessonNumber:\s*(\d+),\s*title:\s*'([^']+)',\s*emoji:\s*'([^']*)',\s*content:\s*'''([^']*)''',\s*quizId:\s*(quizId\+\+|null),\s*assessmentType:\s*('([^']+)'|null),/gs)];
  
  if (lessonMatches.length === 0) {
    // Try alternative pattern
    const altMatches = [...dartContent.matchAll(/Lesson\(\s*id:\s*lessonId\+\+,\s*yearId:\s*'([^']+)',\s*subjectId:\s*'([^']+)',\s*lessonNumber:\s*(\d+),\s*title:\s*'([^']+)',\s*emoji:\s*'([^']*)',\s*content:\s*'''([\s\S]*?)''',\s*quizId:\s*(quizId\+\+|null),\s*assessmentType:\s*('([^']+)'|null),/g)];
    return convertLessons(altMatches, yearName, functionName);
  }
  
  return convertLessons(lessonMatches, yearName, functionName);
}

function convertLessons(matches, yearName, functionName) {
  let jsCode = `import { Lesson } from '../../models/Lesson.js';\n\n/**\n * ${yearName} Lessons\n */\nexport function ${functionName}(startLessonId, startQuizId) {\n  let lessonId = startLessonId;\n  let quizId = startQuizId;\n\n  return [\n`;
  
  matches.forEach((match, index) => {
    const yearId = match[1];
    const subjectId = match[2];
    const lessonNumber = match[3];
    const title = match[4].replace(/'/g, "\\'");
    const emoji = match[5] || '📚';
    let content = match[6].trim();
    const quizIdValue = match[7];
    const assessmentType = match[9] || 'null';
    
    // Clean up content - remove extra whitespace
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    content = content.replace(/^#/gm, '#');
    
    // Escape backticks and template literals
    content = content.replace(/`/g, '\\`');
    content = content.replace(/\${/g, '\\${');
    
    const hasQuiz = quizIdValue !== 'null';
    const assessmentTypeValue = assessmentType === 'null' ? 'null' : `'${assessmentType}'`;
    
    jsCode += `    new Lesson({\n`;
    jsCode += `      id: lessonId++,\n`;
    jsCode += `      yearId: '${yearId}',\n`;
    jsCode += `      subjectId: '${subjectId}',\n`;
    jsCode += `      lessonNumber: ${lessonNumber},\n`;
    jsCode += `      title: '${title}',\n`;
    jsCode += `      emoji: '${emoji}',\n`;
    jsCode += `      content: \`${content}\`,\n`;
    jsCode += `      quizId: ${hasQuiz ? 'quizId++' : 'null'},\n`;
    jsCode += `      assessmentType: ${assessmentTypeValue},\n`;
    jsCode += `      categoryId: null,\n`;
    jsCode += `    })${index < matches.length - 1 ? ',' : ''}\n\n`;
  });
  
  jsCode += `  ];\n}\n`;
  return jsCode;
}

// Convert each year
const years = [
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
    console.log(`✓ Converted ${dart} -> ${js}`);
  } catch (error) {
    console.error(`✗ Error converting ${dart}:`, error.message);
  }
});

console.log('\nConversion complete!');


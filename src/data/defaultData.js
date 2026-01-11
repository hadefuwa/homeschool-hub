import { Lesson } from '../models/Lesson.js';
import { Quiz } from '../models/Quiz.js';
import { Question } from '../models/Question.js';
import { getNurseryLessons } from './lessons/nurseryLessons.js';
import { getReceptionLessons } from './lessons/receptionLessons.js';
import { getYear1Lessons } from './lessons/year1Lessons.js';
import { getYear2Lessons } from './lessons/year2Lessons.js';
import { getYear3Lessons } from './lessons/year3Lessons.js';
import { getYear4Lessons } from './lessons/year4Lessons.js';
import { getYear5Lessons } from './lessons/year5Lessons.js';
import { getYear6Lessons } from './lessons/year6Lessons.js';

/**
 * Get default data structure
 * Loads all lessons from nursery to year 6 in progression order
 */
export const getDefaultData = () => {
  return {
    students: [],
    lessons: getDefaultLessons(),
    quizzes: getDefaultQuizzes(),
    progress: [],
    videoResources: [],
  };
};

function getDefaultLessons() {
  let lessonId = 1;
  let quizId = 1;
  const allLessons = [];

  // Nursery lessons (Year 0)
  const nurseryLessons = getNurseryLessons(lessonId, quizId);
  allLessons.push(...nurseryLessons);
  lessonId += nurseryLessons.length;
  quizId += nurseryLessons.filter(l => l.quizId !== null).length;

  // Reception lessons
  const receptionLessons = getReceptionLessons(lessonId, quizId);
  allLessons.push(...receptionLessons);
  lessonId += receptionLessons.length;
  quizId += receptionLessons.filter(l => l.quizId !== null).length;

  // Year 1 lessons
  const year1Lessons = getYear1Lessons(lessonId, quizId);
  allLessons.push(...year1Lessons);
  lessonId += year1Lessons.length;
  quizId += year1Lessons.filter(l => l.quizId !== null).length;

  // Year 2 lessons
  const year2Lessons = getYear2Lessons(lessonId, quizId);
  allLessons.push(...year2Lessons);
  lessonId += year2Lessons.length;
  quizId += year2Lessons.filter(l => l.quizId !== null).length;

  // Year 3 lessons
  const year3Lessons = getYear3Lessons(lessonId, quizId);
  allLessons.push(...year3Lessons);
  lessonId += year3Lessons.length;
  quizId += year3Lessons.filter(l => l.quizId !== null).length;

  // Year 4 lessons
  const year4Lessons = getYear4Lessons(lessonId, quizId);
  allLessons.push(...year4Lessons);
  lessonId += year4Lessons.length;
  quizId += year4Lessons.filter(l => l.quizId !== null).length;

  // Year 5 lessons
  const year5Lessons = getYear5Lessons(lessonId, quizId);
  allLessons.push(...year5Lessons);
  lessonId += year5Lessons.length;
  quizId += year5Lessons.filter(l => l.quizId !== null).length;

  // Year 6 lessons
  const year6Lessons = getYear6Lessons(lessonId, quizId);
  allLessons.push(...year6Lessons);
  // No need to update IDs after the last one

  return allLessons.map(l => l.toJSON());
}

function getDefaultQuizzes() {
  // Placeholder quiz for testing
  return [
    {
      id: 1,
      title: 'Sample Quiz',
      category: 'general',
      ageGroup: 5,
      questions: [
        {
          id: 1,
          quizId: 1,
          questionText: 'What is 2 + 2?',
          options: ['3', '4', '5', '6'],
          correctAnswerIndex: 1,
        },
      ],
    },
  ];
}


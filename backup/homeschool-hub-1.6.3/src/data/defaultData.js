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
import { getArtLessons } from './lessons/artLessons.js';
import { getDefaultQuizzes } from './defaultQuizzes.js';

/**
 * Get default data structure
 * Loads all lessons from nursery to year 6 in progression order
 */
export const getDefaultData = () => {
  return {
    students: [],
    lessons: getDefaultLessons(),
    quizzes: getDefaultQuizzesData(),
    progress: [],
    videoResources: [],
    rewards: getDefaultRewards(),
    purchases: [],
    pointsBalance: 0,
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
  lessonId += year6Lessons.length;
  quizId += year6Lessons.filter(l => l.quizId !== null).length;

  // Art lessons (all years)
  const artLessons = getArtLessons(lessonId);
  allLessons.push(...artLessons);

  return allLessons.map(l => l.toJSON());
}

function getDefaultQuizzesData() {
  // Get all quizzes starting from ID 1
  const quizzes = getDefaultQuizzes(1, 1);
  // Convert to JSON format
  return quizzes.map(q => q.toJSON());
}

function getDefaultRewards() {
  return [
    {
      id: 1,
      name: '🎮 Play for 30 mins',
      description: 'Enjoy 30 minutes of free play time!',
      cost: 300,
      imageUrl: null,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: '🍬 Have a sweet',
      description: 'Enjoy a sweet treat!',
      cost: 100,
      imageUrl: null,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  ];
}


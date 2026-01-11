import { create } from 'zustand';
import { AppData } from '../models/AppData.js';
import { Student } from '../models/Student.js';
import { Lesson } from '../models/Lesson.js';
import { Quiz } from '../models/Quiz.js';
import { Progress } from '../models/Progress.js';
import { Year } from '../models/Year.js';
import { Subject } from '../models/Subject.js';
import { getDefaultData } from '../data/defaultData.js';

// IPC communication with Electron main process
const ipcRenderer = window.electronAPI || null;

const useDataStore = create((set, get) => ({
  // State
  data: AppData.defaultData(),
  initialized: false,
  adminMode: false,
  loading: false,
  error: null,

  // Initialize store
  initialize: async () => {
    if (get().initialized) return;
    
    set({ loading: true, error: null });
    try {
      let loadedData;
      
      if (ipcRenderer && window.electronAPI) {
        // Electron environment - use IPC
        try {
          loadedData = await window.electronAPI.loadData();
          // If no data exists, use default data
          if (!loadedData || !loadedData.lessons || loadedData.lessons.length === 0) {
            loadedData = getDefaultData();
          }
        } catch (error) {
          console.warn('Failed to load from Electron, using default data:', error);
          loadedData = getDefaultData();
        }
      } else {
        // Browser environment - use localStorage as fallback
        const stored = localStorage.getItem('homeschool-hub-data');
        if (stored) {
          loadedData = JSON.parse(stored);
          // Ensure lessons exist
          if (!loadedData.lessons || loadedData.lessons.length === 0) {
            loadedData = getDefaultData();
            localStorage.setItem('homeschool-hub-data', JSON.stringify(loadedData));
          }
        } else {
          loadedData = getDefaultData();
          localStorage.setItem('homeschool-hub-data', JSON.stringify(loadedData));
        }
      }
      
      const appData = AppData.fromJSON(loadedData);
      
      // Merge default lessons to ensure new lessons are added
      await get().mergeDefaultLessons(appData);
      
      set({ 
        data: appData, 
        initialized: true, 
        loading: false 
      });
    } catch (error) {
      console.error('Error initializing DataStore:', error);
      set({ 
        data: AppData.fromJSON(getDefaultData()), 
        initialized: true, 
        loading: false,
        error: error.message 
      });
    }
  },

  // Save data
  saveData: async () => {
    try {
      const data = get().data;
      const jsonData = data.toJSON();
      
      if (ipcRenderer) {
        await ipcRenderer.saveData(jsonData);
      } else {
        localStorage.setItem('homeschool-hub-data', JSON.stringify(jsonData));
      }
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  },

  // Merge default lessons
  mergeDefaultLessons: async (appData) => {
    const defaultData = getDefaultData();
    const existingLessonIds = new Set(appData.lessons.map(l => l.id));
    const existingQuizIds = new Set(appData.quizzes.map(q => q.id));
    
    let hasChanges = false;
    
    // If no lessons exist, add all default lessons
    if (appData.lessons.length === 0 && defaultData.lessons.length > 0) {
      appData.lessons = defaultData.lessons.map(l => Lesson.fromJSON(l));
      hasChanges = true;
    } else {
      // Add new lessons that don't exist yet
      for (const defaultLesson of defaultData.lessons) {
        if (!existingLessonIds.has(defaultLesson.id)) {
          appData.lessons.push(Lesson.fromJSON(defaultLesson));
          hasChanges = true;
        }
      }
    }
    
    // Add new quizzes
    if (appData.quizzes.length === 0 && defaultData.quizzes.length > 0) {
      appData.quizzes = defaultData.quizzes.map(q => Quiz.fromJSON(q));
      hasChanges = true;
    } else {
      for (const defaultQuiz of defaultData.quizzes) {
        if (!existingQuizIds.has(defaultQuiz.id)) {
          appData.quizzes.push(Quiz.fromJSON(defaultQuiz));
          hasChanges = true;
        }
      }
    }
    
    if (hasChanges) {
      set({ data: appData });
      await get().saveData();
    }
  },

  // Admin mode
  toggleAdminMode: () => set(state => ({ adminMode: !state.adminMode })),
  setAdminMode: (enabled) => set({ adminMode: enabled }),

  // Student operations
  addStudent: async (student) => {
    const data = get().data;
    data.students.push(student instanceof Student ? student : Student.fromJSON(student));
    set({ data }); // Keep the AppData instance
    await get().saveData();
  },

  updateStudent: async (student) => {
    const data = get().data;
    const index = data.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      data.students[index] = student instanceof Student ? student : Student.fromJSON(student);
      set({ data }); // Keep the AppData instance
      await get().saveData();
    }
  },

  deleteStudent: async (studentId) => {
    const data = get().data;
    data.students = data.students.filter(s => s.id !== studentId);
    data.progress = data.progress.filter(p => p.studentId !== studentId);
    set({ data }); // Keep the AppData instance
    await get().saveData();
  },

  getStudent: (id) => {
    return get().data.students.find(s => s.id === id) || null;
  },

  getStudents: () => get().data.students,

  // Lesson operations
  getLessons: ({ yearId, subjectId, category, ageGroup } = {}) => {
    let lessons = [...get().data.lessons];
    
    if (yearId) {
      lessons = lessons.filter(l => l.yearId === yearId);
    }
    if (subjectId) {
      lessons = lessons.filter(l => l.subjectId === subjectId);
    }
    if (category) {
      lessons = lessons.filter(l => l.subjectId === category.toLowerCase());
    }
    if (ageGroup) {
      const yearMap = {
        3: 'nursery', 4: 'reception', 5: 'year1', 6: 'year1',
        7: 'year2', 8: 'year2', 9: 'year3', 10: 'year3',
        11: 'year4', 12: 'year4', 13: 'year5', 14: 'year5',
        15: 'year6', 16: 'year6',
      };
      const mappedYear = yearMap[ageGroup];
      if (mappedYear) {
        lessons = lessons.filter(l => l.yearId === mappedYear);
      }
    }
    
    return lessons.sort((a, b) => a.lessonNumber - b.lessonNumber);
  },

  getLesson: (id) => {
    return get().data.lessons.find(l => l.id === id) || null;
  },

  getAllLessonsForSubject: (subjectId) => {
    const allLessons = get().data.lessons
      .filter(l => l.subjectId === subjectId);
    
    allLessons.sort((a, b) => {
      const yearA = Year.getById(a.yearId);
      const yearB = Year.getById(b.yearId);
      const yearOrderA = yearA?.order ?? 999;
      const yearOrderB = yearB?.order ?? 999;
      
      if (yearOrderA !== yearOrderB) {
        return yearOrderA - yearOrderB;
      }
      return a.lessonNumber - b.lessonNumber;
    });
    
    return allLessons;
  },

  // Single user ID constant (no student profiles needed)
  getUserId: () => 1,

  getNextLessonForSubject: (subjectId) => {
    const userId = get().getUserId();
    const allLessons = get().getAllLessonsForSubject(subjectId);
    
    if (allLessons.length === 0) return null;
    
    // Find the last accessed lesson for this subject
    const lastAccessed = get().getLastAccessedLesson(subjectId);
    if (lastAccessed) {
      // Find the lesson in the sorted list
      const lastIndex = allLessons.findIndex(l => 
        l.id === lastAccessed.id ||
        (l.yearId === lastAccessed.yearId && 
         l.subjectId === lastAccessed.subjectId && 
         l.lessonNumber === lastAccessed.lessonNumber)
      );
      
      if (lastIndex !== -1) {
        // Return the last accessed lesson
        return allLessons[lastIndex];
      }
    }
    
    // If no last accessed lesson, return the first lesson
    return allLessons[0];
  },

  getLastAccessedLesson: (subjectId) => {
    const userId = get().getUserId();
    const allLessons = get().getAllLessonsForSubject(subjectId);
    
    // Find the most recently accessed lesson for this subject (any access, not just completed)
    const subjectProgress = get().data.progress
      .filter(p => 
        p.studentId === userId && 
        p.subjectId === subjectId &&
        p.activityType === 'Lesson' &&
        p.completedAt !== null
      )
      .sort((a, b) => {
        const dateA = a.completedAt ? new Date(a.completedAt) : new Date(0);
        const dateB = b.completedAt ? new Date(b.completedAt) : new Date(0);
        return dateB - dateA; // Most recent first
      });
    
    if (subjectProgress.length === 0) return null;
    
    // Find the lesson from the most recent progress entry
    const mostRecent = subjectProgress[0];
    const lesson = allLessons.find(l => 
      l.yearId === mostRecent.yearId &&
      l.subjectId === mostRecent.subjectId &&
      l.lessonNumber === mostRecent.lessonNumber
    );
    
    return lesson || null;
  },

  // Get the next lesson in sequence after a specific lesson
  getNextLessonAfter: (currentLesson) => {
    if (!currentLesson) {
      console.log('getNextLessonAfter: No current lesson provided');
      return null;
    }
    
    if (!currentLesson.subjectId) {
      console.log('getNextLessonAfter: Current lesson has no subjectId:', currentLesson);
      return null;
    }
    
    const allLessons = get().getAllLessonsForSubject(currentLesson.subjectId);
    console.log('getNextLessonAfter: All lessons for subject', currentLesson.subjectId, ':', allLessons.length);
    console.log('getNextLessonAfter: Current lesson:', currentLesson.id, currentLesson.lessonNumber, currentLesson.title);
    
    if (allLessons.length === 0) {
      console.log('getNextLessonAfter: No lessons found for subject', currentLesson.subjectId);
      console.log('getNextLessonAfter: Total lessons in store:', get().data.lessons.length);
      console.log('getNextLessonAfter: Lessons with subjectId', currentLesson.subjectId, ':', 
        get().data.lessons.filter(l => l.subjectId === currentLesson.subjectId).length);
      return null;
    }
    
    // Find the current lesson's index - try multiple matching strategies
    let currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
    
    if (currentIndex === -1) {
      // Try matching by year, subject, and lesson number
      currentIndex = allLessons.findIndex(l => 
        l.yearId === currentLesson.yearId &&
        l.subjectId === currentLesson.subjectId &&
        l.lessonNumber === currentLesson.lessonNumber
      );
    }
    
    if (currentIndex === -1) {
      // Try matching by title as last resort
      currentIndex = allLessons.findIndex(l => l.title === currentLesson.title);
    }
    
    console.log('getNextLessonAfter: Current index:', currentIndex);
    
    if (currentIndex === -1) {
      console.log('getNextLessonAfter: Current lesson not found in list');
      console.log('getNextLessonAfter: Current lesson details:', {
        id: currentLesson.id,
        yearId: currentLesson.yearId,
        subjectId: currentLesson.subjectId,
        lessonNumber: currentLesson.lessonNumber,
        title: currentLesson.title
      });
      console.log('getNextLessonAfter: First few lessons in list:', allLessons.slice(0, 3).map(l => ({
        id: l.id,
        yearId: l.yearId,
        subjectId: l.subjectId,
        lessonNumber: l.lessonNumber,
        title: l.title
      })));
      return null;
    }
    
    // Return the next lesson in the sequence
    if (currentIndex + 1 < allLessons.length) {
      const nextLesson = allLessons[currentIndex + 1];
      console.log('getNextLessonAfter: Found next lesson:', nextLesson.id, nextLesson.lessonNumber, nextLesson.title);
      return nextLesson;
    }
    
    // No more lessons in this subject
    console.log('getNextLessonAfter: No more lessons in subject');
    return null;
  },

  canAccessLesson: (lesson) => {
    // Allow access to all lessons - no sequential restriction
    return true;
  },

  // Track lesson access (when user views a lesson)
  trackLessonAccess: async (lesson) => {
    const userId = get().getUserId();
    
    // Check if we already have progress for this lesson
    const existingIndex = get().data.progress.findIndex(p =>
      p.studentId === userId &&
      p.activityType === 'Lesson' &&
      p.yearId === lesson.yearId &&
      p.subjectId === lesson.subjectId &&
      p.lessonNumber === lesson.lessonNumber
    );
    
    if (existingIndex === -1) {
      // Create a new progress entry to track access (not completed yet)
      const progressId = get().getNextProgressId();
      const progress = new Progress({
        id: progressId,
        studentId: userId,
        activityType: 'Lesson',
        activityId: lesson.id,
        yearId: lesson.yearId,
        subjectId: lesson.subjectId,
        lessonNumber: lesson.lessonNumber,
        isCompleted: false,
        completedAt: new Date(), // Track when accessed
        score: null,
      });
      
      await get().addProgress(progress);
    } else {
      // Update the existing progress to mark as accessed (update timestamp)
      const data = get().data;
      // Ensure completedAt is a Date object, not a string
      const existingProgress = data.progress[existingIndex];
      if (existingProgress instanceof Progress) {
        existingProgress.completedAt = new Date();
      } else {
        // If it's a plain object, convert it to a Progress instance
        const progressObj = Progress.fromJSON(existingProgress);
        progressObj.completedAt = new Date();
        data.progress[existingIndex] = progressObj;
      }
      set({ data }); // Keep the AppData instance
      await get().saveData();
    }
  },

  getSubjectProgress: (subjectId) => {
    const userId = get().getUserId();
    const allLessons = get().getAllLessonsForSubject(subjectId);
    let completedCount = 0;
    let currentYearId = null;
    let currentLessonNumber = null;
    
    for (const lesson of allLessons) {
      if (get().hasCompletedLesson(userId, lesson.yearId, lesson.subjectId, lesson.lessonNumber)) {
        completedCount++;
        currentYearId = lesson.yearId;
        currentLessonNumber = lesson.lessonNumber;
      } else {
        break;
      }
    }
    
    const nextLesson = get().getNextLessonForSubject(subjectId);
    
    return {
      totalLessons: allLessons.length,
      completedCount,
      currentYearId,
      currentLessonNumber,
      nextLesson,
      progressPercentage: allLessons.length === 0 ? 0 : (completedCount / allLessons.length) * 100,
    };
  },

  // Quiz operations
  getQuizzes: ({ category, ageGroup } = {}) => {
    let quizzes = [...get().data.quizzes];
    if (category) {
      quizzes = quizzes.filter(q => q.category === category);
    }
    if (ageGroup) {
      quizzes = quizzes.filter(q => q.ageGroup === ageGroup);
    }
    return quizzes;
  },

  getQuiz: (id) => {
    return get().data.quizzes.find(q => q.id === id) || null;
  },

  // Progress operations
  addProgress: async (progress) => {
    const data = get().data;
    const userId = get().getUserId();
    
    // Ensure progress uses the current user ID
    const progressData = progress instanceof Progress ? progress : Progress.fromJSON(progress);
    progressData.studentId = userId;
    
    const existingIndex = data.progress.findIndex(
      p => p.studentId === progressData.studentId &&
           p.activityType === progressData.activityType &&
           p.activityId === progressData.activityId
    );
    
    if (existingIndex !== -1) {
      data.progress[existingIndex] = progressData;
    } else {
      data.progress.push(progressData);
    }
    
    set({ data }); // Keep the AppData instance
    await get().saveData();
  },

  getProgress: ({ yearId, subjectId } = {}) => {
    const userId = get().getUserId();
    let progress = get().data.progress.filter(p => p.studentId === userId);
    if (yearId) {
      progress = progress.filter(p => p.yearId === yearId);
    }
    if (subjectId) {
      progress = progress.filter(p => p.subjectId === subjectId);
    }
    return progress.sort((a, b) => {
      if (!a.completedAt && !b.completedAt) return 0;
      if (!a.completedAt) return 1;
      if (!b.completedAt) return -1;
      return b.completedAt - a.completedAt;
    });
  },

  hasCompletedActivity: (activityType, activityId) => {
    const userId = get().getUserId();
    return get().data.progress.some(p =>
      p.studentId === userId &&
      p.activityType === activityType &&
      p.activityId === activityId &&
      p.isCompleted
    );
  },

  hasCompletedLesson: (userId, yearId, subjectId, lessonNumber) => {
    return get().data.progress.some(p =>
      p.studentId === userId &&
      p.activityType === 'Lesson' &&
      p.yearId === yearId &&
      p.subjectId === subjectId &&
      p.lessonNumber === lessonNumber &&
      p.isCompleted
    );
  },

  getStatistics: () => {
    const userId = get().getUserId();
    const allProgress = get().data.progress.filter(p => p.studentId === userId);
    const completed = allProgress.filter(p => p.isCompleted);
    const quizzes = completed.filter(p => 
      p.activityType === 'Quiz' || p.activityType === 'Test' || p.activityType === 'Challenge'
    );
    
    const totalQuizzes = quizzes.length;
    const averageScore = totalQuizzes > 0
      ? quizzes.reduce((sum, p) => sum + (p.score ?? 0), 0) / totalQuizzes
      : 0;
    
    const byYear = {};
    const bySubject = {};
    
    for (const p of completed) {
      if (p.yearId) {
        if (!byYear[p.yearId]) byYear[p.yearId] = [];
        byYear[p.yearId].push(p);
      }
      if (p.subjectId) {
        if (!bySubject[p.subjectId]) bySubject[p.subjectId] = [];
        bySubject[p.subjectId].push(p);
      }
    }
    
    return {
      totalCompleted: completed.length,
      totalQuizzes,
      averageScore,
      byYear,
      bySubject,
    };
  },

  getAppWideStatistics: () => {
    // Alias for getStatistics - same thing for single user
    return get().getStatistics();
  },

  getAllProgress: ({ yearId, subjectId } = {}) => {
    // Get progress for the current user
    return get().getProgress({ yearId, subjectId });
  },

  // Helper methods for IDs
  getNextStudentId: () => {
    const students = get().data.students;
    if (students.length === 0) return 1;
    return Math.max(...students.map(s => s.id)) + 1;
  },

  getNextLessonId: () => {
    const lessons = get().data.lessons;
    if (lessons.length === 0) return 1;
    return Math.max(...lessons.map(l => l.id)) + 1;
  },

  getNextQuizId: () => {
    const quizzes = get().data.quizzes;
    if (quizzes.length === 0) return 1;
    return Math.max(...quizzes.map(q => q.id)) + 1;
  },

  getNextProgressId: () => {
    const progress = get().data.progress;
    if (progress.length === 0) return 1;
    return Math.max(...progress.map(p => p.id)) + 1;
  },
}));

export default useDataStore;


import { create } from 'zustand';
import { AppData } from '../models/AppData.js';
import { Lesson } from '../models/Lesson.js';
import { Quiz } from '../models/Quiz.js';
import { Progress } from '../models/Progress.js';
import { Student } from '../models/Student.js';
import { Year } from '../models/Year.js';
import { getDefaultData } from '../data/defaultData.js';

const useDataStore = create((set, get) => ({
  // State
  data: null,
  initialized: false,
  loading: false,
  adminMode: false,

  // Initialize the store
  initialize: async () => {
    const state = get();
    if (state.initialized || state.loading) return;

    console.log('[DataStore] Starting initialization...');
    set({ loading: true });

    try {
      // Load data from Electron
      let loadedData;
      if (window.electronAPI) {
        console.log('[DataStore] Electron API available, loading data...');
        loadedData = await window.electronAPI.loadData();
        console.log('[DataStore] Data loaded successfully:', { 
          lessons: loadedData?.lessons?.length || 0,
          quizzes: loadedData?.quizzes?.length || 0 
        });
      } else {
        // Fallback for web mode (development)
        console.warn('[DataStore] Electron API not available, using default data');
        loadedData = getDefaultData();
      }

      // Convert to AppData instance
      const appData = AppData.fromJSON(loadedData);

      // If no lessons exist, this is a fresh install - use default data directly
      if (!appData.lessons || appData.lessons.length === 0) {
        console.log('[DataStore] No lessons found, using default data');
        const defaultData = AppData.fromJSON(getDefaultData());
        set({ 
          data: defaultData, 
          initialized: true, 
          loading: false 
        });
        // Save the default data
        if (window.electronAPI) {
          try {
            await window.electronAPI.saveData(defaultData.toJSON());
          } catch (error) {
            console.error('Error saving default data:', error);
          }
        }
        return;
      }

      // Merge default lessons (add any missing lessons)
      await state._mergeDefaultLessons(appData);

      set({ 
        data: appData, 
        initialized: true, 
        loading: false 
      });
    } catch (error) {
      console.error('Error initializing data store:', error);
      const defaultData = AppData.fromJSON(getDefaultData());
      set({ 
        data: defaultData, 
        initialized: true, 
        loading: false 
      });
    }
  },

  // Merge default lessons into existing data
  // Always replaces lessons and quizzes with default data to ensure updates are applied
  // Preserves user data: students and progress
  _mergeDefaultLessons: async (appData) => {
    const defaultData = AppData.fromJSON(getDefaultData());
    
    // Check if lessons or quizzes have changed by comparing counts, IDs, and content
    const existingLessonCount = appData.lessons.length;
    const defaultLessonCount = defaultData.lessons.length;
    const existingQuizCount = appData.quizzes.length;
    const defaultQuizCount = defaultData.quizzes.length;
    
    // Compare lesson IDs to detect new/removed lessons
    const existingLessonIds = new Set(appData.lessons.map(l => l.id));
    const defaultLessonIds = new Set(defaultData.lessons.map(l => l.id));
    const lessonIdsMatch = existingLessonIds.size === defaultLessonIds.size && 
      [...defaultLessonIds].every(id => existingLessonIds.has(id));
    
    // Compare quiz IDs to detect new/removed quizzes
    const existingQuizIds = new Set(appData.quizzes.map(q => q.id));
    const defaultQuizIds = new Set(defaultData.quizzes.map(q => q.id));
    const quizIdsMatch = existingQuizIds.size === defaultQuizIds.size && 
      [...defaultQuizIds].every(id => existingQuizIds.has(id));
    
    // Check if lesson content has changed by comparing all lessons
    // This catches updates to existing lessons (e.g., content changes, title changes)
    let lessonsContentChanged = false;
    if (lessonIdsMatch && existingLessonCount === defaultLessonCount) {
      // Compare all lessons to detect content changes
      for (const defaultLesson of defaultData.lessons) {
        const existingLesson = appData.lessons.find(l => l.id === defaultLesson.id);
        if (!existingLesson) {
          lessonsContentChanged = true;
          break;
        }
        // Compare key properties that might change
        if (existingLesson.title !== defaultLesson.title ||
            existingLesson.content !== defaultLesson.content ||
            existingLesson.emoji !== defaultLesson.emoji ||
            existingLesson.lessonNumber !== defaultLesson.lessonNumber ||
            existingLesson.subjectId !== defaultLesson.subjectId ||
            existingLesson.yearId !== defaultLesson.yearId) {
          lessonsContentChanged = true;
          break;
        }
      }
    }
    
    // Check if quiz content has changed
    let quizzesContentChanged = false;
    if (quizIdsMatch && existingQuizCount === defaultQuizCount) {
      for (const defaultQuiz of defaultData.quizzes) {
        const existingQuiz = appData.quizzes.find(q => q.id === defaultQuiz.id);
        if (!existingQuiz) {
          quizzesContentChanged = true;
          break;
        }
        // Compare key properties
        if (existingQuiz.title !== defaultQuiz.title ||
            JSON.stringify(existingQuiz.questions) !== JSON.stringify(defaultQuiz.questions)) {
          quizzesContentChanged = true;
          break;
        }
      }
    }
    
    const hasChanges = !lessonIdsMatch || !quizIdsMatch || 
                       lessonsContentChanged || quizzesContentChanged ||
                       existingLessonCount !== defaultLessonCount || 
                       existingQuizCount !== defaultQuizCount;
    
    if (hasChanges) {
      console.log('[DataStore] Default lessons/quizzes have changed, updating data.json');
      console.log(`[DataStore] Lessons: ${existingLessonCount} -> ${defaultLessonCount}`);
      console.log(`[DataStore] Quizzes: ${existingQuizCount} -> ${defaultQuizCount}`);
      if (lessonsContentChanged) {
        console.log('[DataStore] Lesson content has been updated');
      }
      if (quizzesContentChanged) {
        console.log('[DataStore] Quiz content has been updated');
      }
      
      // Replace lessons and quizzes with default data
      // This ensures new lessons are always included and existing lessons are updated
      appData.lessons = [...defaultData.lessons];
      appData.quizzes = [...defaultData.quizzes];
      
      // Preserve user data (students and progress remain unchanged)
      // Progress references lesson IDs, so it will still work with updated lessons
      
      // Save the updated data
      if (window.electronAPI) {
        try {
          const jsonData = appData.toJSON();
          await window.electronAPI.saveData(jsonData);
          console.log('[DataStore] Data.json updated successfully with latest lessons and quizzes');
        } catch (error) {
          console.error('Error saving updated data:', error);
        }
      }
    } else {
      console.log('[DataStore] No changes detected in default lessons/quizzes');
    }
  },

  // Save data to file
  saveData: async () => {
    const state = get();
    if (!state.data) return;

    try {
      // Ensure data is an AppData instance, convert if needed
      let appData = state.data;
      if (!(appData instanceof AppData)) {
        console.warn('Data is not an AppData instance, converting...');
        appData = AppData.fromJSON(state.data);
        // Update state with the proper instance
        set({ data: appData });
      }
      
      const jsonData = appData.toJSON();
      
      if (window.electronAPI) {
        await window.electronAPI.saveData(jsonData);
      } else {
        console.warn('Electron API not available, cannot save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  },

  // Student operations
  getUserId: () => {
    const state = get();
    if (!state.data) {
      // Data not initialized yet, return default ID
      return 1;
    }
    
    if (state.data.students.length === 0) {
      // Create default student if none exists
      const defaultStudent = new Student({
        id: 1,
        name: 'Student',
        age: 5,
        createdAt: new Date(),
      });
      state.data.students.push(defaultStudent);
      // Save asynchronously without blocking
      state.saveData().catch(err => console.error('Error saving default student:', err));
      return 1;
    }
    return state.data.students[0].id; // Return first student's ID
  },

  // Lesson operations
  getLesson: (id) => {
    const state = get();
    if (!state.data) return null;
    return state.data.lessons.find(l => l.id === id) || null;
  },

  getLessons: ({ yearId, subjectId, category, ageGroup } = {}) => {
    const state = get();
    if (!state.data) return [];
    
    let lessons = [...state.data.lessons];
    
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
        3: 'nursery',
        4: 'reception',
        5: 'year1',
        6: 'year1',
        7: 'year2',
        8: 'year2',
        9: 'year3',
        10: 'year3',
        11: 'year4',
        12: 'year4',
        13: 'year5',
        14: 'year5',
        15: 'year6',
        16: 'year6',
      };
      const mappedYear = yearMap[ageGroup];
      if (mappedYear) {
        lessons = lessons.filter(l => l.yearId === mappedYear);
      }
    }
    
    return lessons.sort((a, b) => a.lessonNumber - b.lessonNumber);
  },

  getAllLessonsForSubject: (subjectId) => {
    const state = get();
    if (!state.data) return [];
    
    const allLessons = state.data.lessons
      .filter(l => l.subjectId === subjectId)
      .map(l => l);
    
    // Sort by year order, then by lesson number
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

  getNextLessonForSubject: (subjectId, studentId = null) => {
    const state = get();
    if (!state.data) return null;
    
    const userId = studentId || state.getUserId();
    
    if (state.adminMode) {
      const allLessons = state.getAllLessonsForSubject(subjectId);
      return allLessons.length > 0 ? allLessons[0] : null;
    }
    
    const allLessons = state.getAllLessonsForSubject(subjectId);
    
    for (const lesson of allLessons) {
      if (!state.hasCompletedLesson(userId, lesson.yearId, lesson.subjectId, lesson.lessonNumber)) {
        return lesson;
      }
    }
    
    return null; // All lessons completed
  },

  getNextLessonAfter: (currentLesson) => {
    const state = get();
    if (!state.data || !currentLesson) return null;
    
    const allLessons = state.getAllLessonsForSubject(currentLesson.subjectId);
    const currentIndex = allLessons.findIndex(l => 
      l.id === currentLesson.id ||
      (l.yearId === currentLesson.yearId && 
       l.subjectId === currentLesson.subjectId && 
       l.lessonNumber === currentLesson.lessonNumber &&
       (l.categoryId === currentLesson.categoryId || (!l.categoryId && !currentLesson.categoryId)))
    );
    
    if (currentIndex === -1 || currentIndex === allLessons.length - 1) {
      return null; // Current lesson not found or it's the last one
    }
    
    return allLessons[currentIndex + 1];
  },

  // Quiz operations
  getQuiz: (id) => {
    const state = get();
    if (!state.data) return null;
    return state.data.quizzes.find(q => q.id === id) || null;
  },

  // Progress operations
  addProgress: async (progress) => {
    const state = get();
    if (!state.data) return;
    
    // Check if progress already exists
    const existingIndex = state.data.progress.findIndex(
      p => p.studentId === progress.studentId &&
           p.activityType === progress.activityType &&
           p.activityId === progress.activityId
    );
    
    if (existingIndex !== -1) {
      // Update existing progress
      state.data.progress[existingIndex] = progress;
    } else {
      // Add new progress
      state.data.progress.push(progress);
    }
    
    // Create a new AppData instance to maintain the toJSON method
    // This ensures the instance is preserved when state updates
    const updatedData = new AppData({
      students: state.data.students,
      lessons: state.data.lessons,
      quizzes: state.data.quizzes,
      progress: state.data.progress,
      videoResources: state.data.videoResources,
    });
    
    // Update state with the new AppData instance
    set({ data: updatedData });
    
    // Save the updated data using the saveData function
    await state.saveData();
  },

  getNextProgressId: () => {
    const state = get();
    if (!state.data || state.data.progress.length === 0) return 1;
    return Math.max(...state.data.progress.map(p => p.id)) + 1;
  },

  hasCompletedLesson: (studentId, yearId, subjectId, lessonNumber) => {
    const state = get();
    if (!state.data) return false;
    
    return state.data.progress.some(p =>
      p.studentId === studentId &&
      p.activityType === 'Lesson' &&
      p.yearId === yearId &&
      p.subjectId === subjectId &&
      p.lessonNumber === lessonNumber &&
      p.isCompleted
    );
  },

  hasCompletedActivity: (studentId, activityType, activityId) => {
    const state = get();
    if (!state.data) return false;
    
    return state.data.progress.some(p =>
      p.studentId === studentId &&
      p.activityType === activityType &&
      p.activityId === activityId &&
      p.isCompleted
    );
  },

  getSubjectProgress: (subjectId, studentId = null) => {
    const state = get();
    if (!state.data) {
      return {
        totalLessons: 0,
        completedCount: 0,
        currentYearId: null,
        currentLessonNumber: null,
        nextLesson: null,
        progressPercentage: 0,
      };
    }
    
    const userId = studentId || state.getUserId();
    const allLessons = state.getAllLessonsForSubject(subjectId);
    
    let completedCount = 0;
    let currentYearId = null;
    let currentLessonNumber = null;
    
    // Count ALL completed lessons, not just consecutive ones
    for (const lesson of allLessons) {
      if (state.hasCompletedLesson(userId, lesson.yearId, lesson.subjectId, lesson.lessonNumber)) {
        completedCount++;
        // Track the last completed lesson
        currentYearId = lesson.yearId;
        currentLessonNumber = lesson.lessonNumber;
      }
    }
    
    const nextLesson = state.getNextLessonForSubject(subjectId, userId);
    
    return {
      totalLessons: allLessons.length,
      completedCount,
      currentYearId,
      currentLessonNumber,
      nextLesson,
      progressPercentage: allLessons.length === 0 ? 0 : (completedCount / allLessons.length) * 100,
    };
  },

  trackLessonAccess: async (lesson) => {
    const state = get();
    if (!state.data || !lesson) return;
    
    const userId = state.getUserId();
    
    // Check if already accessed
    const existingProgress = state.data.progress.find(
      p => p.studentId === userId &&
           p.activityType === 'Lesson' &&
           p.activityId === lesson.id
    );
    
    if (!existingProgress) {
      // Create new progress entry for accessing the lesson
      const progressId = state.getNextProgressId();
      const progress = new Progress({
        id: progressId,
        studentId: userId,
        activityType: 'Lesson',
        activityId: lesson.id,
        yearId: lesson.yearId,
        subjectId: lesson.subjectId,
        lessonNumber: lesson.lessonNumber,
        isCompleted: false,
        completedAt: null,
        score: null,
      });
      
      await state.addProgress(progress);
    }
  },

  getStatistics: (studentId = null) => {
    const state = get();
    if (!state.data) {
      return {
        totalCompleted: 0,
        totalQuizzes: 0,
        averageScore: 0,
        byYear: {},
        bySubject: {},
      };
    }
    
    const userId = studentId || state.getUserId();
    const allProgress = state.data.progress.filter(p => p.studentId === userId);
    const completed = allProgress.filter(p => p.isCompleted);
    const quizzes = completed.filter(p => 
      p.activityType === 'Quiz' || 
      p.activityType === 'Test' || 
      p.activityType === 'Challenge'
    );
    
    const totalQuizzes = quizzes.length;
    const averageScore = totalQuizzes > 0
      ? quizzes.reduce((sum, p) => sum + (p.score || 0), 0) / totalQuizzes
      : 0;
    
    // Group by year
    const byYear = {};
    for (const p of completed) {
      if (p.yearId) {
        if (!byYear[p.yearId]) {
          byYear[p.yearId] = [];
        }
        byYear[p.yearId].push(p);
      }
    }
    
    // Group by subject
    const bySubject = {};
    for (const p of completed) {
      if (p.subjectId) {
        if (!bySubject[p.subjectId]) {
          bySubject[p.subjectId] = [];
        }
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

  // Get medal counts
  getMedalCounts: (studentId = null) => {
    const state = get();
    if (!state.data) {
      return {
        platinum: 0,
        gold: 0,
        silver: 0,
        bronze: 0,
      };
    }
    
    const userId = studentId || state.getUserId();
    const allProgress = state.data.progress.filter(p => 
      p.studentId === userId && 
      p.isCompleted && 
      p.activityType === 'Lesson' &&
      p.score !== null
    );
    
    let platinum = 0;
    let gold = 0;
    let silver = 0;
    let bronze = 0;
    
    allProgress.forEach(progress => {
      const lesson = state.data.lessons.find(l => l.id === progress.activityId);
      if (!lesson) return;
      
      const score = progress.score || 0;
      let medal = 'Bronze';
      
      // Determine medal based on lesson type
      if (lesson.title === 'Clicking Game') {
        const isHardMode = lesson.yearId === 'reception' && lesson.lessonNumber === 2 && lesson.subjectId === 'technology';
        if (isHardMode) {
          if (score >= 350) medal = 'Platinum';
          else if (score >= 250) medal = 'Gold';
          else if (score >= 150) medal = 'Silver';
        } else {
          if (score >= 300) medal = 'Platinum';
          else if (score >= 200) medal = 'Gold';
          else if (score >= 100) medal = 'Silver';
        }
      } else if (lesson.title === 'Keyboard Game' || lesson.title === 'WASD Game' || 
                 lesson.title === 'A-Z Game' || lesson.title === 'Numbers Game' || 
                 lesson.title === 'Symbols Game') {
        const isWASDMode = lesson.yearId === 'nursery' && lesson.lessonNumber === 3 && lesson.subjectId === 'technology';
        const isAZMode = lesson.yearId === 'nursery' && lesson.lessonNumber === 4 && lesson.subjectId === 'technology';
        const isNumbersMode = lesson.yearId === 'nursery' && lesson.lessonNumber === 5 && lesson.subjectId === 'technology';
        const isSymbolsMode = lesson.yearId === 'nursery' && lesson.lessonNumber === 6 && lesson.subjectId === 'technology';
        
        // We need accuracy to determine medal for keyboard games, but we don't store it
        // So we'll use score-based thresholds that approximate the medal logic
        if (isAZMode) {
          if (score >= 250) medal = 'Platinum';
          else if (score >= 200) medal = 'Gold';
          else if (score >= 150) medal = 'Gold';
          else if (score >= 100) medal = 'Silver';
        } else if (isNumbersMode) {
          if (score >= 90) medal = 'Platinum';
          else if (score >= 80) medal = 'Gold';
          else if (score >= 70) medal = 'Gold';
          else if (score >= 60) medal = 'Silver';
        } else if (isSymbolsMode) {
          if (score >= 90) medal = 'Platinum';
          else if (score >= 80) medal = 'Gold';
          else if (score >= 70) medal = 'Gold';
          else if (score >= 60) medal = 'Silver';
        } else {
          // Arrow/WASD game
          if (score >= 140) medal = 'Platinum';
          else if (score >= 120) medal = 'Gold';
          else if (score >= 100) medal = 'Gold';
          else if (score >= 80) medal = 'Silver';
        }
      }
      
      // Count medals
      if (medal === 'Platinum') platinum++;
      else if (medal === 'Gold') gold++;
      else if (medal === 'Silver') silver++;
      else bronze++;
    });
    
    return { platinum, gold, silver, bronze };
  },

  // Admin mode
  toggleAdminMode: () => {
    set(state => ({ adminMode: !state.adminMode }));
  },

  setAdminMode: (enabled) => {
    set({ adminMode: enabled });
  },
}));

export default useDataStore;

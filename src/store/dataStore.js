import { create } from 'zustand';
import { AppData } from '../models/AppData.js';
import { Lesson } from '../models/Lesson.js';
import { Quiz } from '../models/Quiz.js';
import { Progress } from '../models/Progress.js';
import { Student } from '../models/Student.js';
import { Year } from '../models/Year.js';
import { Reward } from '../models/Reward.js';
import { Purchase } from '../models/Purchase.js';
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

      // Check if this is a truly fresh install:
      // - No lessons OR no students OR no progress = fresh install
      const isFreshInstall = !appData.lessons || appData.lessons.length === 0 ||
                             !appData.students || appData.students.length === 0 ||
                             !appData.progress || appData.progress.length === 0;

      if (isFreshInstall) {
        console.log('[DataStore] Fresh install detected - initializing with default data');
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

      // Merge default rewards (add if none exist)
      await state._mergeDefaultRewards(appData);

      // Points system version - increment this when points calculation changes
      // Version 2: Added year-based multipliers (nursery 0.2x to year6 3x)
      const POINTS_SYSTEM_VERSION = 2;

      // Recalculate points if:
      // 1. pointsBalance hasn't been set yet (fresh install)
      // 2. Points system version has changed (multipliers updated)
      const hasUserProgress = appData.progress && appData.progress.length > 0;
      const needsPointsRecalc = hasUserProgress &&
                                (appData.pointsSystemVersion !== POINTS_SYSTEM_VERSION);

      if (needsPointsRecalc) {
        console.log('[DataStore] Recalculating points with new multiplier system (version ' + POINTS_SYSTEM_VERSION + ')...');
        await state._calculateAndAwardRetroactivePoints(appData);
        appData.pointsSystemVersion = POINTS_SYSTEM_VERSION;

        // Save the updated data with new points
        if (window.electronAPI) {
          try {
            const jsonData = appData.toJSON();
            await window.electronAPI.saveData(jsonData);
            console.log('[DataStore] Points recalculation saved successfully');
          } catch (error) {
            console.error('Error saving recalculated points:', error);
          }
        }
      }

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

  // Merge default rewards into existing data
  _mergeDefaultRewards: async (appData) => {
    const defaultData = AppData.fromJSON(getDefaultData());
    
    // If no rewards exist, add default rewards
    if (!appData.rewards || appData.rewards.length === 0) {
      console.log('[DataStore] No rewards found, adding default rewards');
      appData.rewards = [...defaultData.rewards];
      
      // Save the updated data
      if (window.electronAPI) {
        try {
          const jsonData = appData.toJSON();
          await window.electronAPI.saveData(jsonData);
          console.log('[DataStore] Default rewards added successfully');
        } catch (error) {
          console.error('Error saving default rewards:', error);
        }
      }
    } else {
      // Check if default rewards exist, if not add them
      const defaultRewardIds = new Set(defaultData.rewards.map(r => r.id));
      const existingRewardIds = new Set(appData.rewards.map(r => r.id));
      
      let hasNewRewards = false;
      for (const defaultReward of defaultData.rewards) {
        if (!existingRewardIds.has(defaultReward.id)) {
          appData.rewards.push(defaultReward);
          hasNewRewards = true;
        }
      }
      
      if (hasNewRewards) {
        console.log('[DataStore] Adding missing default rewards');
        if (window.electronAPI) {
          try {
            const jsonData = appData.toJSON();
            await window.electronAPI.saveData(jsonData);
            console.log('[DataStore] Default rewards added successfully');
          } catch (error) {
            console.error('Error saving default rewards:', error);
          }
        }
      }
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
    
    // Check if this is a new completion (wasn't completed before, but is now)
    let isNewCompletion = false;
    let updatedProgress = [...state.data.progress];
    
    if (existingIndex !== -1) {
      const existingProgress = updatedProgress[existingIndex];
      isNewCompletion = !existingProgress.isCompleted && progress.isCompleted;
      // Update existing progress
      updatedProgress[existingIndex] = progress;
    } else {
      isNewCompletion = progress.isCompleted;
      // Add new progress
      updatedProgress.push(progress);
    }
    
    // Calculate points to award if this is a newly completed lesson with a score
    let pointsToAward = 0;
    if (isNewCompletion && progress.activityType === 'Lesson' && progress.isCompleted && progress.score !== null) {
      const medalType = state._getMedalForProgress(progress);
      const pointsMap = {
        'Bronze': 10,
        'Silver': 20,
        'Gold': 50,
        'Platinum': 100,
      };
      const basePoints = pointsMap[medalType] || 0;
      // Apply year-based multiplier (higher years = more points)
      const yearMultiplier = state._getYearMultiplier(progress.yearId);
      pointsToAward = Math.round(basePoints * yearMultiplier);
    }
    
    // Create a new AppData instance with updated progress and points
    const currentBalance = state.data.pointsBalance || 0;
    const updatedData = new AppData({
      students: state.data.students,
      lessons: state.data.lessons,
      quizzes: state.data.quizzes,
      progress: updatedProgress,
      videoResources: state.data.videoResources,
      rewards: state.data.rewards || [],
      purchases: state.data.purchases || [],
      pointsBalance: currentBalance + pointsToAward,
      pointsSystemVersion: state.data.pointsSystemVersion || 0,
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
    const student = state.data.students.find(s => s.id === userId);
    const studentName = student ? student.name : 'Student';
    
    // Log lesson access to activity log file
    if (window.electronAPI) {
      try {
        await window.electronAPI.writeActivityLog({
          type: 'lesson_access',
          studentId: userId,
          studentName: studentName,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          lessonNumber: lesson.lessonNumber,
          subjectId: lesson.subjectId,
          yearId: lesson.yearId,
        });
      } catch (error) {
        console.error('Error writing activity log:', error);
      }
    }
    
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
      } else if (lesson.title === 'Flappy Bird Game') {
        if (score >= 15) medal = 'Platinum';
        else if (score >= 10) medal = 'Gold';
        else if (score >= 5) medal = 'Silver';
      } else if (lesson.title === 'Bubble Pop Game') {
        if (score >= 200) medal = 'Platinum';
        else if (score >= 150) medal = 'Gold';
        else if (score >= 100) medal = 'Silver';
      } else if (lesson.title === 'Snake Game') {
        if (score >= 100) medal = 'Platinum';
        else if (score >= 70) medal = 'Gold';
        else if (score >= 40) medal = 'Silver';
      } else if (lesson.title === 'Target Practice Game') {
        if (score >= 150) medal = 'Platinum';
        else if (score >= 100) medal = 'Gold';
        else if (score >= 50) medal = 'Silver';
      } else if (lesson.title?.includes('TapTapTap')) {
        // TapTapTap scoring based on level
        const level = lesson.title.includes('Level 1') || lesson.title.includes('Beginner') ? 1 :
                      lesson.title.includes('Level 2') || lesson.title.includes('Intermediate') ? 2 :
                      lesson.title.includes('Level 3') || lesson.title.includes('Advanced') ? 3 :
                      lesson.title.includes('Level 4') || lesson.title.includes('Expert') ? 4 :
                      lesson.title.includes('Level 5') || lesson.title.includes('Master') ? 5 :
                      lesson.title.includes('Level 6') || lesson.title.includes('Champion') ? 6 :
                      lesson.yearId === 'year1' ? 1 :
                      lesson.yearId === 'year2' ? 2 :
                      lesson.yearId === 'year3' ? 3 :
                      lesson.yearId === 'year4' ? 4 :
                      lesson.yearId === 'year5' ? 5 :
                      lesson.yearId === 'year6' ? 6 : 1;
        
        const thresholds = {
          1: { platinum: 20, gold: 15, silver: 10 },
          2: { platinum: 40, gold: 30, silver: 20 },
          3: { platinum: 60, gold: 45, silver: 30 },
          4: { platinum: 80, gold: 60, silver: 40 },
          5: { platinum: 100, gold: 75, silver: 50 },
          6: { platinum: 120, gold: 90, silver: 60 },
        };
        
        const threshold = thresholds[level] || thresholds[1];
        if (score >= threshold.platinum) medal = 'Platinum';
        else if (score >= threshold.gold) medal = 'Gold';
        else if (score >= threshold.silver) medal = 'Silver';
      }
      
      // Count medals
      if (medal === 'Platinum') platinum++;
      else if (medal === 'Gold') gold++;
      else if (medal === 'Silver') silver++;
      else bronze++;
    });
    
    return { platinum, gold, silver, bronze };
  },

  // Check if student has gold or platinum for a specific lesson
  hasGoldOrPlatinum: (lessonId, studentId = null) => {
    const state = get();
    if (!state.data || !lessonId) return false;
    
    const userId = studentId || state.getUserId();
    const lesson = state.data.lessons.find(l => l.id === lessonId);
    if (!lesson) return false;
    
    // Find progress for this lesson
    const progress = state.data.progress.find(p => 
      p.studentId === userId && 
      p.activityId === lessonId &&
      p.isCompleted && 
      p.activityType === 'Lesson' &&
      p.score !== null
    );
    
    if (!progress) return false;
    
    const score = progress.score || 0;
    let medal = 'Bronze';
    
    // Determine medal based on lesson type (same logic as getMedalCounts)
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
    } else if (lesson.title === 'Flappy Bird Game') {
      if (score >= 15) medal = 'Platinum';
      else if (score >= 10) medal = 'Gold';
      else if (score >= 5) medal = 'Silver';
    } else if (lesson.title === 'Bubble Pop Game') {
      if (score >= 200) medal = 'Platinum';
      else if (score >= 150) medal = 'Gold';
      else if (score >= 100) medal = 'Silver';
    } else if (lesson.title === 'Snake Game') {
      if (score >= 100) medal = 'Platinum';
      else if (score >= 70) medal = 'Gold';
      else if (score >= 40) medal = 'Silver';
    } else if (lesson.title === 'Target Practice Game') {
      if (score >= 150) medal = 'Platinum';
      else if (score >= 100) medal = 'Gold';
      else if (score >= 50) medal = 'Silver';
    } else if (lesson.title?.includes('TapTapTap')) {
      // TapTapTap scoring based on level
      const level = lesson.title.includes('Level 1') || lesson.title.includes('Beginner') ? 1 :
                    lesson.title.includes('Level 2') || lesson.title.includes('Intermediate') ? 2 :
                    lesson.title.includes('Level 3') || lesson.title.includes('Advanced') ? 3 :
                    lesson.title.includes('Level 4') || lesson.title.includes('Expert') ? 4 :
                    lesson.title.includes('Level 5') || lesson.title.includes('Master') ? 5 :
                    lesson.title.includes('Level 6') || lesson.title.includes('Champion') ? 6 :
                    lesson.yearId === 'year1' ? 1 :
                    lesson.yearId === 'year2' ? 2 :
                    lesson.yearId === 'year3' ? 3 :
                    lesson.yearId === 'year4' ? 4 :
                    lesson.yearId === 'year5' ? 5 :
                    lesson.yearId === 'year6' ? 6 : 1;
      
      const thresholds = {
        1: { platinum: 20, gold: 15, silver: 10 },
        2: { platinum: 40, gold: 30, silver: 20 },
        3: { platinum: 60, gold: 45, silver: 30 },
        4: { platinum: 80, gold: 60, silver: 40 },
        5: { platinum: 100, gold: 75, silver: 50 },
        6: { platinum: 120, gold: 90, silver: 60 },
      };
      
      const threshold = thresholds[level] || thresholds[1];
      if (score >= threshold.platinum) medal = 'Platinum';
      else if (score >= threshold.gold) medal = 'Gold';
      else if (score >= threshold.silver) medal = 'Silver';
    }
    
    return medal === 'Gold' || medal === 'Platinum';
  },

  // Helper function to get year-based points multiplier
  _getYearMultiplier: (yearId) => {
    const multipliers = {
      'nursery': 0.2,
      'reception': 0.5,
      'year1': 1,
      'year2': 1.5,
      'year3': 2,
      'year4': 2.5,
      'year5': 3,
      'year6': 3,
    };
    return multipliers[yearId] || 1;
  },

  // Helper function to determine medal type from progress
  _getMedalForProgress: (progress) => {
    const state = get();
    if (!state.data || !progress || !progress.isCompleted || progress.score === null) {
      return 'Bronze';
    }

    const lesson = state.data.lessons.find(l => l.id === progress.activityId);
    if (!lesson) return 'Bronze';

    const score = progress.score || 0;
    let medal = 'Bronze';

    // Determine medal based on lesson type (same logic as getMedalCounts)
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
      const isAZMode = lesson.yearId === 'nursery' && lesson.lessonNumber === 4 && lesson.subjectId === 'technology';
      const isNumbersMode = lesson.yearId === 'nursery' && lesson.lessonNumber === 5 && lesson.subjectId === 'technology';
      const isSymbolsMode = lesson.yearId === 'nursery' && lesson.lessonNumber === 6 && lesson.subjectId === 'technology';
      
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
    } else if (lesson.title === 'Flappy Bird Game') {
      if (score >= 15) medal = 'Platinum';
      else if (score >= 10) medal = 'Gold';
      else if (score >= 5) medal = 'Silver';
    } else if (lesson.title === 'Bubble Pop Game') {
      if (score >= 200) medal = 'Platinum';
      else if (score >= 150) medal = 'Gold';
      else if (score >= 100) medal = 'Silver';
    } else if (lesson.title === 'Snake Game') {
      if (score >= 100) medal = 'Platinum';
      else if (score >= 70) medal = 'Gold';
      else if (score >= 40) medal = 'Silver';
    } else if (lesson.title === 'Target Practice Game') {
      if (score >= 150) medal = 'Platinum';
      else if (score >= 100) medal = 'Gold';
      else if (score >= 50) medal = 'Silver';
    } else if (lesson.title?.includes('TapTapTap')) {
      // TapTapTap scoring based on level
      const level = lesson.title.includes('Level 1') || lesson.title.includes('Beginner') ? 1 :
                    lesson.title.includes('Level 2') || lesson.title.includes('Intermediate') ? 2 :
                    lesson.title.includes('Level 3') || lesson.title.includes('Advanced') ? 3 :
                    lesson.title.includes('Level 4') || lesson.title.includes('Expert') ? 4 :
                    lesson.title.includes('Level 5') || lesson.title.includes('Master') ? 5 :
                    lesson.title.includes('Level 6') || lesson.title.includes('Champion') ? 6 :
                    lesson.yearId === 'year1' ? 1 :
                    lesson.yearId === 'year2' ? 2 :
                    lesson.yearId === 'year3' ? 3 :
                    lesson.yearId === 'year4' ? 4 :
                    lesson.yearId === 'year5' ? 5 :
                    lesson.yearId === 'year6' ? 6 : 1;
      
      const thresholds = {
        1: { platinum: 20, gold: 15, silver: 10 },
        2: { platinum: 40, gold: 30, silver: 20 },
        3: { platinum: 60, gold: 45, silver: 30 },
        4: { platinum: 80, gold: 60, silver: 40 },
        5: { platinum: 100, gold: 75, silver: 50 },
        6: { platinum: 120, gold: 90, silver: 60 },
      };
      
      const threshold = thresholds[level] || thresholds[1];
      if (score >= threshold.platinum) medal = 'Platinum';
      else if (score >= threshold.gold) medal = 'Gold';
      else if (score >= threshold.silver) medal = 'Silver';
    }
    
    return medal;
  },

  // Points management
  getPointsBalance: () => {
    const state = get();
    if (!state.data) return 0;
    return state.data.pointsBalance || 0;
  },

  awardPointsForMedal: async (medalType) => {
    const state = get();
    if (!state.data) return;

    const pointsMap = {
      'Bronze': 10,
      'Silver': 20,
      'Gold': 50,
      'Platinum': 100,
    };

    const pointsToAward = pointsMap[medalType] || 0;
    if (pointsToAward === 0) return;

    const currentBalance = state.data.pointsBalance || 0;
    const newBalance = currentBalance + pointsToAward;

    const updatedData = new AppData({
      students: state.data.students,
      lessons: state.data.lessons,
      quizzes: state.data.quizzes,
      progress: state.data.progress,
      videoResources: state.data.videoResources,
      rewards: state.data.rewards || [],
      purchases: state.data.purchases || [],
      pointsBalance: newBalance,
      pointsSystemVersion: state.data.pointsSystemVersion || 0,
    });

    set({ data: updatedData });
    await state.saveData();
  },

  // Get total points spent in the shop
  getTotalPointsSpent: () => {
    const state = get();
    if (!state.data || !state.data.purchases) return 0;
    return state.data.purchases.reduce((total, p) => total + (p.pointsSpent || 0), 0);
  },

  // Get total points earned (current balance + spent)
  getTotalPointsEarned: () => {
    const state = get();
    if (!state.data) return 0;
    const currentBalance = state.data.pointsBalance || 0;
    const totalSpent = state.data.purchases?.reduce((total, p) => total + (p.pointsSpent || 0), 0) || 0;
    return currentBalance + totalSpent;
  },

  // Calculate and award retroactive points
  _calculateAndAwardRetroactivePoints: async (appData) => {
    // Safety check: only calculate if there are students and progress
    if (!appData.students || appData.students.length === 0) {
      console.log('[DataStore] No students found, skipping retroactive points calculation');
      return;
    }

    if (!appData.progress || appData.progress.length === 0) {
      console.log('[DataStore] No progress found, skipping retroactive points calculation');
      return;
    }

    console.log('[DataStore] Calculating retroactive points...');
    let totalPoints = 0;

    // Get all completed lesson progress
    const userId = appData.students[0].id;

    // Debug: log all progress
    const allCompletedLessons = appData.progress.filter(p =>
      p.studentId === userId &&
      p.isCompleted &&
      p.activityType === 'Lesson'
    );
    console.log(`[DataStore] Total completed lessons: ${allCompletedLessons.length}`);
    console.log(`[DataStore] Sample progress:`, allCompletedLessons.slice(0, 3).map(p => ({
      id: p.activityId,
      score: p.score,
      isCompleted: p.isCompleted,
      activityType: p.activityType
    })));

    // Award points for ALL completed lessons, even those without scores
    // For lessons without scores, we'll award a default Bronze medal
    const completedProgress = appData.progress.filter(p =>
      p.studentId === userId &&
      p.isCompleted &&
      p.activityType === 'Lesson'
    );

    console.log(`[DataStore] Found ${completedProgress.length} completed lessons (including those without scores)`);

    // Calculate points for each completed lesson
    completedProgress.forEach(progress => {
      const lesson = appData.lessons.find(l => l.id === progress.activityId);
      if (!lesson) return;

      // If no score, treat as 100 (perfect score) to award appropriate medal
      // This ensures older completions without scores still get points
      const score = progress.score !== null && progress.score !== undefined ? progress.score : 100;
      let medal = 'Bronze';

      // Determine medal (same logic as _getMedalForProgress)
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
        const isAZMode = lesson.yearId === 'nursery' && lesson.lessonNumber === 4 && lesson.subjectId === 'technology';
        const isNumbersMode = lesson.yearId === 'nursery' && lesson.lessonNumber === 5 && lesson.subjectId === 'technology';
        const isSymbolsMode = lesson.yearId === 'nursery' && lesson.lessonNumber === 6 && lesson.subjectId === 'technology';
        
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
          if (score >= 140) medal = 'Platinum';
          else if (score >= 120) medal = 'Gold';
          else if (score >= 100) medal = 'Gold';
          else if (score >= 80) medal = 'Silver';
        }
      } else if (lesson.title === 'Flappy Bird Game') {
        if (score >= 15) medal = 'Platinum';
        else if (score >= 10) medal = 'Gold';
        else if (score >= 5) medal = 'Silver';
      } else if (lesson.title === 'Bubble Pop Game') {
        if (score >= 200) medal = 'Platinum';
        else if (score >= 150) medal = 'Gold';
        else if (score >= 100) medal = 'Silver';
      } else if (lesson.title === 'Snake Game') {
        if (score >= 100) medal = 'Platinum';
        else if (score >= 70) medal = 'Gold';
        else if (score >= 40) medal = 'Silver';
      } else if (lesson.title === 'Target Practice Game') {
        if (score >= 150) medal = 'Platinum';
        else if (score >= 100) medal = 'Gold';
        else if (score >= 50) medal = 'Silver';
      } else if (lesson.title?.includes('TapTapTap')) {
        // TapTapTap scoring based on level
        const level = lesson.title.includes('Level 1') || lesson.title.includes('Beginner') ? 1 :
                      lesson.title.includes('Level 2') || lesson.title.includes('Intermediate') ? 2 :
                      lesson.title.includes('Level 3') || lesson.title.includes('Advanced') ? 3 :
                      lesson.title.includes('Level 4') || lesson.title.includes('Expert') ? 4 :
                      lesson.title.includes('Level 5') || lesson.title.includes('Master') ? 5 :
                      lesson.title.includes('Level 6') || lesson.title.includes('Champion') ? 6 :
                      lesson.yearId === 'year1' ? 1 :
                      lesson.yearId === 'year2' ? 2 :
                      lesson.yearId === 'year3' ? 3 :
                      lesson.yearId === 'year4' ? 4 :
                      lesson.yearId === 'year5' ? 5 :
                      lesson.yearId === 'year6' ? 6 : 1;
        
        const thresholds = {
          1: { platinum: 20, gold: 15, silver: 10 },
          2: { platinum: 40, gold: 30, silver: 20 },
          3: { platinum: 60, gold: 45, silver: 30 },
          4: { platinum: 80, gold: 60, silver: 40 },
          5: { platinum: 100, gold: 75, silver: 50 },
          6: { platinum: 120, gold: 90, silver: 60 },
        };
        
        const threshold = thresholds[level] || thresholds[1];
        if (score >= threshold.platinum) medal = 'Platinum';
        else if (score >= threshold.gold) medal = 'Gold';
        else if (score >= threshold.silver) medal = 'Silver';
      }

      // Award points based on medal with year multiplier
      const pointsMap = {
        'Bronze': 10,
        'Silver': 20,
        'Gold': 50,
        'Platinum': 100,
      };
      const basePoints = pointsMap[medal] || 10;
      // Apply year-based multiplier (higher years = more points)
      const multipliers = {
        'nursery': 0.2,
        'reception': 0.5,
        'year1': 1,
        'year2': 1.5,
        'year3': 2,
        'year4': 2.5,
        'year5': 3,
        'year6': 3,
      };
      const yearMultiplier = multipliers[lesson.yearId] || 1;
      totalPoints += Math.round(basePoints * yearMultiplier);
    });

    // Update points balance
    appData.pointsBalance = totalPoints;
    console.log(`[DataStore] Awarded ${totalPoints} retroactive points`);
  },

  // Purchase reward
  purchaseReward: async (rewardId) => {
    const state = get();
    if (!state.data) throw new Error('Data not initialized');

    const reward = state.data.rewards.find(r => r.id === rewardId && r.isActive);
    if (!reward) throw new Error('Reward not found or not available');

    const currentBalance = state.data.pointsBalance || 0;
    if (currentBalance < reward.cost) {
      throw new Error('Insufficient points');
    }

    // Create purchase record
    const purchaseId = state.getNextPurchaseId();
    const purchase = new Purchase({
      id: purchaseId,
      rewardId: reward.id,
      purchasedAt: new Date(),
      pointsSpent: reward.cost,
    });

    // Deduct points and add purchase
    const newBalance = currentBalance - reward.cost;
    const updatedPurchases = [...(state.data.purchases || []), purchase];

    const updatedData = new AppData({
      students: state.data.students,
      lessons: state.data.lessons,
      quizzes: state.data.quizzes,
      progress: state.data.progress,
      videoResources: state.data.videoResources,
      rewards: state.data.rewards || [],
      purchases: updatedPurchases,
      pointsBalance: newBalance,
      pointsSystemVersion: state.data.pointsSystemVersion || 0,
    });

    set({ data: updatedData });
    await state.saveData();
  },

  // Reward management
  getRewards: (activeOnly = true) => {
    const state = get();
    if (!state.data) return [];
    const rewards = state.data.rewards || [];
    return activeOnly ? rewards.filter(r => r.isActive) : rewards;
  },

  getPurchases: () => {
    const state = get();
    if (!state.data) return [];
    return state.data.purchases || [];
  },

  getNextRewardId: () => {
    const state = get();
    if (!state.data || !state.data.rewards || state.data.rewards.length === 0) return 1;
    return Math.max(...state.data.rewards.map(r => r.id)) + 1;
  },

  getNextPurchaseId: () => {
    const state = get();
    if (!state.data || !state.data.purchases || state.data.purchases.length === 0) return 1;
    return Math.max(...state.data.purchases.map(p => p.id)) + 1;
  },

  addReward: async (reward) => {
    const state = get();
    if (!state.data) return;

    const rewardId = state.getNextRewardId();
    const newReward = new Reward({
      id: rewardId,
      name: reward.name,
      description: reward.description,
      cost: reward.cost,
      imageUrl: reward.imageUrl || null,
      isActive: reward.isActive !== undefined ? reward.isActive : true,
      createdAt: new Date(),
    });

    const updatedRewards = [...(state.data.rewards || []), newReward];

    const updatedData = new AppData({
      students: state.data.students,
      lessons: state.data.lessons,
      quizzes: state.data.quizzes,
      progress: state.data.progress,
      videoResources: state.data.videoResources,
      rewards: updatedRewards,
      purchases: state.data.purchases || [],
      pointsBalance: state.data.pointsBalance || 0,
      pointsSystemVersion: state.data.pointsSystemVersion || 0,
    });

    set({ data: updatedData });
    await state.saveData();
  },

  updateReward: async (reward) => {
    const state = get();
    if (!state.data) return;

    const rewardIndex = state.data.rewards.findIndex(r => r.id === reward.id);
    if (rewardIndex === -1) throw new Error('Reward not found');

    const updatedRewards = [...state.data.rewards];
    updatedRewards[rewardIndex] = reward instanceof Reward ? reward : Reward.fromJSON(reward);

    const updatedData = new AppData({
      students: state.data.students,
      lessons: state.data.lessons,
      quizzes: state.data.quizzes,
      progress: state.data.progress,
      videoResources: state.data.videoResources,
      rewards: updatedRewards,
      purchases: state.data.purchases || [],
      pointsBalance: state.data.pointsBalance || 0,
      pointsSystemVersion: state.data.pointsSystemVersion || 0,
    });

    set({ data: updatedData });
    await state.saveData();
  },

  deleteReward: async (rewardId) => {
    const state = get();
    if (!state.data) return;

    // Soft delete by setting isActive to false
    const rewardIndex = state.data.rewards.findIndex(r => r.id === rewardId);
    if (rewardIndex === -1) throw new Error('Reward not found');

    const reward = state.data.rewards[rewardIndex];
    const updatedReward = reward.copyWith({ isActive: false });

    const updatedRewards = [...state.data.rewards];
    updatedRewards[rewardIndex] = updatedReward;

    const updatedData = new AppData({
      students: state.data.students,
      lessons: state.data.lessons,
      quizzes: state.data.quizzes,
      progress: state.data.progress,
      videoResources: state.data.videoResources,
      rewards: updatedRewards,
      purchases: state.data.purchases || [],
      pointsBalance: state.data.pointsBalance || 0,
      pointsSystemVersion: state.data.pointsSystemVersion || 0,
    });

    set({ data: updatedData });
    await state.saveData();
  },

  // Admin mode
  toggleAdminMode: () => {
    set(state => ({ adminMode: !state.adminMode }));
  },

  setAdminMode: (enabled) => {
    set({ adminMode: enabled });
  },

  // Reset all progress - clears students, progress, points, and purchases
  // Keeps lessons, quizzes, and rewards intact
  resetAllProgress: async () => {
    const state = get();
    if (!state.data) return;

    // Create fresh data with empty students, progress, points, and purchases
    // But keep lessons, quizzes, and rewards
    const resetData = new AppData({
      students: [],
      lessons: state.data.lessons,
      quizzes: state.data.quizzes,
      progress: [],
      videoResources: state.data.videoResources || [],
      rewards: state.data.rewards || [],
      purchases: [],
      pointsBalance: 0,
      pointsSystemVersion: state.data.pointsSystemVersion || 0,
    });

    set({ data: resetData });
    await state.saveData();
    console.log('[DataStore] All progress reset successfully');
  },
}));

export default useDataStore;

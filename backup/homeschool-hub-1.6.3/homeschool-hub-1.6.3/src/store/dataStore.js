import { create } from 'zustand';
import { AppData } from '../models/AppData.js';
import { Lesson } from '../models/Lesson.js';
import { Quiz } from '../models/Quiz.js';
import { Progress } from '../models/Progress.js';
import { Student } from '../models/Student.js';
import { Year } from '../models/Year.js';
import { Reward } from '../models/Reward.js';
import { Purchase } from '../models/Purchase.js';
import { PointsActivity } from '../models/PointsActivity.js';
import { getDefaultData } from '../data/defaultData.js';

const useDataStore = create((set, get) => ({
  // State
  data: null,
  initialized: false,
  loading: false,
  adminMode: false,
  studyMode: {
    enabled: false,
    subjectId: null,
  },

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

      // Clean up any duplicate points from before the fix
      await state.cleanupDuplicatePoints();
      // Clean up any duplicate purchases from before the fix
      await state.cleanupDuplicatePurchases();
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
            existingLesson.yearId !== defaultLesson.yearId ||
            existingLesson.assessmentType !== defaultLesson.assessmentType ||
            existingLesson.categoryId !== defaultLesson.categoryId ||
            existingLesson.quizId !== defaultLesson.quizId) {
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
      // ALSO: Update existing default rewards (ID 1 and 2) if their costs changed
      const defaultRewardsById = defaultData.rewards.reduce((acc, r) => {
        acc[r.id] = r;
        return acc;
      }, {});
      const existingRewardIds = new Set(appData.rewards.map(r => r.id));
      
      let hasChanges = false;

      // 1. Update existing default rewards (ID 1 and 2) if their costs or names changed
      // This ensures the user's requested 300 point change is applied to existing data
      for (let i = 0; i < appData.rewards.length; i++) {
        const existingReward = appData.rewards[i];
        const defaultReward = defaultRewardsById[existingReward.id];
        
        if (defaultReward && (existingReward.id === 1 || existingReward.id === 2)) {
          let updated = false;
          if (existingReward.cost !== defaultReward.cost) {
            console.log(`[DataStore] Updating cost for reward ${existingReward.id}: ${existingReward.cost} -> ${defaultReward.cost}`);
            appData.rewards[i].cost = defaultReward.cost;
            updated = true;
          }
          if (existingReward.name !== defaultReward.name) {
            console.log(`[DataStore] Updating name for reward ${existingReward.id}: ${existingReward.name} -> ${defaultReward.name}`);
            appData.rewards[i].name = defaultReward.name;
            updated = true;
          }
          if (updated) hasChanges = true;
        }
      }

      // 2. Add missing default rewards
      for (const defaultReward of defaultData.rewards) {
        if (!existingRewardIds.has(defaultReward.id)) {
          console.log(`[DataStore] Adding missing default reward: ${defaultReward.name}`);
          appData.rewards.push(defaultReward);
          hasChanges = true;
        }
      }
      
      if (hasChanges) {
        console.log('[DataStore] Rewards updated, saving changes...');
        if (window.electronAPI) {
          try {
            const jsonData = appData.toJSON();
            await window.electronAPI.saveData(jsonData);
            console.log('[DataStore] Rewards saved successfully');
          } catch (error) {
            console.error('Error saving rewards:', error);
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
    let isNewGrading = false; // Check if this is newly graded (score went from 0 to > 0)
    let updatedProgress = [...state.data.progress];
    
    if (existingIndex !== -1) {
      const existingProgress = updatedProgress[existingIndex];
      isNewCompletion = !existingProgress.isCompleted && progress.isCompleted;
      // Check if this is a grading event (score went from 0/null to actual grade)
      // Handle both null/undefined and 0 as "ungraded"
      const existingScore = existingProgress.score ?? 0;
      const newScore = progress.score ?? 0;
      isNewGrading = existingScore === 0 && newScore > 0 && progress.isCompleted;

      console.log('[DataStore] Grading check:', {
        activityId: progress.activityId,
        existingScore,
        newScore,
        isNewGrading,
        isCompleted: progress.isCompleted,
        activityType: progress.activityType
      });

      // Update existing progress
      updatedProgress[existingIndex] = progress;
    } else {
      isNewCompletion = progress.isCompleted;
      // Add new progress
      updatedProgress.push(progress);
    }
    
    // Calculate points to award if this is a newly completed lesson with a score
    // OR if this is newly graded work (like art assignments)
    let pointsToAward = 0;
    let updatedPointsActivities = [...(state.data.pointsActivities || [])];

    // Check if points have already been awarded for this lesson
    const hasAlreadyAwardedPoints = updatedPointsActivities.some(pa =>
      pa.studentId === progress.studentId &&
      pa.activityId === progress.activityId &&
      pa.activityType === 'lesson'
    );

    if ((isNewCompletion || isNewGrading) && progress.activityType === 'Lesson' && progress.isCompleted && progress.score !== null && progress.score > 0 && !hasAlreadyAwardedPoints) {
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

      // Get lesson title for the activity log
      const lesson = state.data.lessons.find(l => l.id === progress.activityId);
      const lessonTitle = lesson ? lesson.title : 'Unknown Lesson';

      // Create points activity record
      const pointsActivityId = state.getNextPointsActivityId();
      const pointsActivity = new PointsActivity({
        id: pointsActivityId,
        studentId: progress.studentId,
        activityType: 'lesson',
        activityId: progress.activityId,
        pointsEarned: pointsToAward,
        earnedAt: new Date(),
        lessonTitle: lessonTitle,
        yearId: progress.yearId,
        medal: medalType,
      });
      updatedPointsActivities.push(pointsActivity);

      if (isNewGrading) {
        console.log('[DataStore] Awarding points for grading:', {
          medalType,
          basePoints,
          yearMultiplier,
          pointsToAward,
          progressId: progress.id
        });
      }
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
      pointsActivities: updatedPointsActivities,
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

    // Count medals from pointsActivities (the source of truth)
    const pointsActivities = state.data.pointsActivities?.filter(pa =>
      pa.studentId === userId &&
      pa.activityType === 'lesson' &&
      pa.medal
    ) || [];

    let platinum = 0;
    let gold = 0;
    let silver = 0;
    let bronze = 0;

    pointsActivities.forEach(pa => {
      const medal = pa.medal;
      if (medal === 'Platinum') platinum++;
      else if (medal === 'Gold') gold++;
      else if (medal === 'Silver') silver++;
      else if (medal === 'Bronze') bronze++;
    });

    return { platinum, gold, silver, bronze };
  },

  // Get the medal earned for a specific lesson
  getMedalForLesson: (lessonId, studentId = null) => {
    const state = get();
    if (!state.data || !lessonId) return null;

    const userId = studentId || state.getUserId();

    // First, try to find the medal in pointsActivities (most reliable)
    const pointsActivity = state.data.pointsActivities?.find(pa =>
      pa.studentId === userId &&
      pa.activityId === lessonId &&
      pa.activityType === 'lesson' &&
      pa.medal
    );

    if (pointsActivity && pointsActivity.medal) {
      return pointsActivity.medal;
    }

    // Fallback: check if lesson is completed and calculate medal
    const progress = state.data.progress.find(p =>
      p.studentId === userId &&
      p.activityId === lessonId &&
      p.isCompleted &&
      p.activityType === 'Lesson'
    );

    if (!progress) return null;

    // If progress exists but no score, return Bronze as default
    if (progress.score === null || progress.score === undefined) {
      return 'Bronze';
    }

    // Calculate medal from progress
    return state._getMedalForProgress(progress);
  },

  // Check if student has gold or platinum for a specific lesson
  hasGoldOrPlatinum: (lessonId, studentId = null) => {
    const state = get();
    const medal = state.getMedalForLesson(lessonId, studentId);
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
      const difficultyMap = {
        'nursery': 5,
        'reception': 10,
        'year1': 15,
        'year2': 20
      };
      const platinumTarget = difficultyMap[lesson.yearId] || 15;
      
      if (score >= platinumTarget) medal = 'Platinum';
      else if (score >= Math.ceil(platinumTarget * 0.6)) medal = 'Gold';
      else if (score >= Math.ceil(platinumTarget * 0.3)) medal = 'Silver';
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
      let level = 1;
      if (lesson.title.includes('Level 6')) level = 6;
      else if (lesson.title.includes('Level 5')) level = 5;
      else if (lesson.title.includes('Level 4')) level = 4;
      else if (lesson.title.includes('Level 3')) level = 3;
      else if (lesson.title.includes('Level 2')) level = 2;
      else if (lesson.title.includes('Level 1')) level = 1;
      else if (lesson.title.includes('Champion')) level = 6;
      else if (lesson.title.includes('Master')) level = 5;
      else if (lesson.title.includes('Expert')) level = 4;
      else if (lesson.title.includes('Advanced')) level = 3;
      else if (lesson.title.includes('Intermediate')) level = 2;
      else if (lesson.title.includes('Beginner')) level = 1;
      else if (lesson.yearId === 'year6') level = 6;
      else if (lesson.yearId === 'year5') level = 5;
      else if (lesson.yearId === 'year4') level = 4;
      else if (lesson.yearId === 'year3') level = 3;
      else if (lesson.yearId === 'year2') level = 2;
      else if (lesson.yearId === 'year1') level = 1;
      
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
    } else if (lesson.subjectId === 'art') {
      if (score >= 100) medal = 'Platinum';
      else if (score >= 90) medal = 'Gold';
      else if (score >= 75) medal = 'Silver';
      else if (score >= 60) medal = 'Bronze';
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
      pointsActivities: state.data.pointsActivities || [],
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

      // Determine medal using the centralized helper
      const medal = state._getMedalForProgress(progress);

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

    // Filter out invalid IDs and get the highest valid ID
    const validIds = state.data.rewards
      .map(r => parseInt(r.id))
      .filter(id => !isNaN(id) && id > 0);

    if (validIds.length === 0) return 1;
    return Math.max(...validIds) + 1;
  },

  getNextPurchaseId: () => {
    const state = get();
    if (!state.data || !state.data.purchases || state.data.purchases.length === 0) return 1;

    // Filter out invalid IDs and get the highest valid ID
    const validIds = state.data.purchases
      .map(p => parseInt(p.id))
      .filter(id => !isNaN(id) && id > 0);

    if (validIds.length === 0) return 1;
    return Math.max(...validIds) + 1;
  },

  getNextPointsActivityId: () => {
    const state = get();
    if (!state.data || !state.data.pointsActivities || state.data.pointsActivities.length === 0) return 1;

    // Filter out invalid IDs and get the highest valid ID
    const validIds = state.data.pointsActivities
      .map(pa => parseInt(pa.id))
      .filter(id => !isNaN(id) && id > 0);

    if (validIds.length === 0) return 1;
    return Math.max(...validIds) + 1;
  },

  // Get points activities for a student
  getPointsActivities: (studentId = null) => {
    const state = get();
    if (!state.data || !state.data.pointsActivities) return [];

    const userId = studentId || state.getUserId();
    return state.data.pointsActivities.filter(pa => pa.studentId === userId);
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
      pointsActivities: state.data.pointsActivities || [],
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
      pointsActivities: state.data.pointsActivities || [],
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
      pointsActivities: state.data.pointsActivities || [],
      pointsBalance: state.data.pointsBalance || 0,
      pointsSystemVersion: state.data.pointsSystemVersion || 0,
    });

    set({ data: updatedData });
    await state.saveData();
  },

  // Clean up duplicate points activities (for students who earned points multiple times for the same lesson)
  cleanupDuplicatePoints: async () => {
    const state = get();
    if (!state.data) return;

    const pointsActivities = state.data.pointsActivities || [];

    // Group by student + activity
    const activityMap = new Map();
    const duplicatesToRemove = [];
    let pointsToDeduct = 0;

    pointsActivities.forEach(activity => {
      const key = `${activity.studentId}_${activity.activityId}`;

      if (activityMap.has(key)) {
        // This is a duplicate - mark for removal
        duplicatesToRemove.push(activity.id);
        pointsToDeduct += activity.pointsEarned;
        console.log(`[DataStore] Found duplicate points for lesson ${activity.lessonTitle}: ${activity.pointsEarned} points`);
      } else {
        // First occurrence - keep it
        activityMap.set(key, activity);
      }
    });

    if (duplicatesToRemove.length === 0) {
      console.log('[DataStore] No duplicate points found');
      return;
    }

    console.log(`[DataStore] Removing ${duplicatesToRemove.length} duplicate point activities, deducting ${pointsToDeduct} points`);

    // Remove duplicates
    const cleanedActivities = pointsActivities.filter(pa => !duplicatesToRemove.includes(pa.id));

    // Update points balance
    const currentBalance = state.data.pointsBalance || 0;
    const newBalance = Math.max(0, currentBalance - pointsToDeduct);

    const updatedData = new AppData({
      students: state.data.students,
      lessons: state.data.lessons,
      quizzes: state.data.quizzes,
      progress: state.data.progress,
      videoResources: state.data.videoResources,
      rewards: state.data.rewards || [],
      purchases: state.data.purchases || [],
      pointsActivities: cleanedActivities,
      pointsBalance: newBalance,
      pointsSystemVersion: state.data.pointsSystemVersion || 0,
    });

    set({ data: updatedData });
    await state.saveData();

    console.log(`[DataStore] Cleanup complete. Removed ${duplicatesToRemove.length} duplicates, deducted ${pointsToDeduct} points. New balance: ${newBalance}`);
  },

  // Clean up duplicate purchases
  cleanupDuplicatePurchases: async () => {
    const state = get();
    if (!state.data) return;

    const purchases = state.data.purchases || [];

    // Group by rewardId + purchasedAt to identify duplicates
    const purchaseMap = new Map();
    const duplicatesToRemove = [];

    purchases.forEach(purchase => {
      const key = `${purchase.rewardId}_${purchase.purchasedAt}`;

      if (purchaseMap.has(key)) {
        // This is a duplicate - mark for removal
        duplicatesToRemove.push(purchase.id);
        console.log(`[DataStore] Found duplicate purchase for reward ${purchase.rewardId} at ${purchase.purchasedAt}`);
      } else {
        // First occurrence - keep it
        purchaseMap.set(key, purchase);
      }
    });

    if (duplicatesToRemove.length === 0) {
      console.log('[DataStore] No duplicate purchases found');
      return;
    }

    console.log(`[DataStore] Removing ${duplicatesToRemove.length} duplicate purchases`);

    // Remove duplicates
    const cleanedPurchases = purchases.filter(p => !duplicatesToRemove.includes(p.id));

    // Update points balance by refunding the duplicate purchases
    let pointsToRefund = 0;
    const duplicatePurchases = purchases.filter(p => duplicatesToRemove.includes(p.id));
    duplicatePurchases.forEach(p => {
      pointsToRefund += p.pointsSpent;
    });

    const currentBalance = state.data.pointsBalance || 0;
    const newBalance = currentBalance + pointsToRefund;

    const updatedData = new AppData({
      students: state.data.students,
      lessons: state.data.lessons,
      quizzes: state.data.quizzes,
      progress: state.data.progress,
      videoResources: state.data.videoResources,
      rewards: state.data.rewards || [],
      purchases: cleanedPurchases,
      pointsActivities: state.data.pointsActivities || [],
      pointsBalance: newBalance,
      pointsSystemVersion: state.data.pointsSystemVersion || 0,
    });

    set({ data: updatedData });
    await state.saveData();

    console.log(`[DataStore] Purchase cleanup complete. Removed ${duplicatesToRemove.length} duplicates, refunded ${pointsToRefund} points. New balance: ${newBalance}`);
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
      pointsActivities: [],
      pointsBalance: 0,
      pointsSystemVersion: state.data.pointsSystemVersion || 0,
    });

    set({ data: resetData });
    await state.saveData();
    console.log('[DataStore] All progress reset successfully');
  },

  // Migration function to fix missing medals in old data
  migrateMissingMedals: async () => {
    const state = get();
    if (!state.data) {
      console.log('[DataStore] No data to migrate');
      return { fixed: 0, errors: 0 };
    }

    console.log('[DataStore] Starting medal migration...');
    let fixedCount = 0;
    let errorCount = 0;

    // Get all completed lessons from progress
    const completedLessons = state.data.progress.filter(p =>
      p.activityType === 'Lesson' &&
      p.isCompleted &&
      p.score !== null &&
      p.score !== undefined
    );

    console.log(`[DataStore] Found ${completedLessons.length} completed lessons`);

    // Check which ones are missing pointsActivities
    const updatedPointsActivities = [...(state.data.pointsActivities || [])];
    const existingActivitiesMap = new Map();

    // Build a map for quick lookup
    updatedPointsActivities.forEach(pa => {
      const key = `${pa.studentId}-${pa.activityId}-${pa.activityType}`;
      existingActivitiesMap.set(key, pa);
    });

    for (const progress of completedLessons) {
      const key = `${progress.studentId}-${progress.activityId}-lesson`;

      if (!existingActivitiesMap.has(key)) {
        try {
          // Calculate medal for this progress
          const medalType = state._getMedalForProgress(progress);

          // Get lesson details
          const lesson = state.data.lessons.find(l => l.id === progress.activityId);
          const lessonTitle = lesson ? lesson.title : 'Unknown Lesson';

          // Calculate points
          const pointsMap = {
            'Bronze': 10,
            'Silver': 20,
            'Gold': 50,
            'Platinum': 100,
          };
          const basePoints = pointsMap[medalType] || 10;
          const yearMultiplier = state._getYearMultiplier(progress.yearId);
          const pointsToAward = Math.round(basePoints * yearMultiplier);

          // Create points activity record
          const pointsActivityId = state.getNextPointsActivityId();
          const pointsActivity = new PointsActivity({
            id: pointsActivityId,
            studentId: progress.studentId,
            activityType: 'lesson',
            activityId: progress.activityId,
            pointsEarned: pointsToAward,
            earnedAt: progress.completedAt || new Date(),
            lessonTitle: lessonTitle,
            yearId: progress.yearId,
            medal: medalType,
          });

          updatedPointsActivities.push(pointsActivity);
          existingActivitiesMap.set(key, pointsActivity);
          fixedCount++;

          console.log(`[DataStore] Added missing medal for lesson ${progress.activityId}: ${medalType} (${pointsToAward} points)`);
        } catch (error) {
          console.error(`[DataStore] Error processing lesson ${progress.activityId}:`, error);
          errorCount++;
        }
      }
    }

    if (fixedCount > 0) {
      // Calculate new points balance
      const totalPoints = updatedPointsActivities.reduce((sum, pa) => sum + (pa.pointsEarned || 0), 0);
      const totalSpent = (state.data.purchases || []).reduce((sum, p) => sum + p.pointsSpent, 0);
      const newBalance = totalPoints - totalSpent;

      // Update data
      const updatedData = new AppData({
        students: state.data.students,
        lessons: state.data.lessons,
        quizzes: state.data.quizzes,
        progress: state.data.progress,
        videoResources: state.data.videoResources,
        rewards: state.data.rewards || [],
        purchases: state.data.purchases || [],
        pointsActivities: updatedPointsActivities,
        pointsBalance: newBalance,
        pointsSystemVersion: state.data.pointsSystemVersion || 0,
      });

      set({ data: updatedData });
      await state.saveData();

      console.log(`[DataStore] Medal migration complete: ${fixedCount} medals added, ${errorCount} errors`);
      console.log(`[DataStore] New points balance: ${newBalance}`);
    } else {
      console.log('[DataStore] No missing medals found');
    }

    return { fixed: fixedCount, errors: errorCount };
  },

  // Study Mode methods
  enableStudyMode: (subjectId) => {
    set({
      studyMode: {
        enabled: true,
        subjectId: subjectId,
      }
    });
  },

  disableStudyMode: () => {
    set({
      studyMode: {
        enabled: false,
        subjectId: null,
      }
    });
  },

  getStudyModePlaylist: (subjectId) => {
    const state = get();
    const userId = state.getUserId();

    // Get all lessons for subject, sorted by year and lesson number
    const allLessons = state.getAllLessonsForSubject(subjectId);

    // Filter to only incomplete lessons
    const incompleteLessons = allLessons.filter(lesson => {
      return !state.hasCompletedLesson(
        userId,
        lesson.yearId,
        lesson.subjectId,
        lesson.lessonNumber
      );
    });

    return incompleteLessons;
  },

  getNextStudyModeLesson: (currentLessonId) => {
    const state = get();
    const { enabled, subjectId } = state.studyMode;

    if (!enabled || !subjectId) {
      return null;
    }

    const playlist = state.getStudyModePlaylist(subjectId);
    const currentIndex = playlist.findIndex(l => l.id === currentLessonId);

    // If current lesson is in playlist and there's a next lesson
    if (currentIndex !== -1 && currentIndex < playlist.length - 1) {
      return playlist[currentIndex + 1];
    }

    // If current lesson is the last in playlist
    return null;
  },

  // Helper to get the next lesson URL considering Study Mode
  // Returns: { url: string, shouldDisableStudyMode: boolean }
  getNextLessonUrl: (currentLesson) => {
    const state = get();
    const { enabled, subjectId } = state.studyMode;

    // Check if Study Mode is active for this lesson's subject
    if (enabled && currentLesson && subjectId === currentLesson.subjectId) {
      const nextStudyLesson = state.getNextStudyModeLesson(currentLesson.id);
      if (nextStudyLesson && nextStudyLesson.id) {
        // Continue to next uncompleted lesson in Study Mode
        return {
          url: `/lesson/${nextStudyLesson.id}`,
          shouldDisableStudyMode: false,
        };
      } else {
        // No more uncompleted lessons - exit Study Mode and return to subject
        return {
          url: `/lessons?subjectId=${currentLesson.subjectId}`,
          shouldDisableStudyMode: true,
        };
      }
    } else {
      // Normal mode: Navigate to next lesson or back to subject
      const nextLesson = state.getNextLessonAfter(currentLesson);
      if (nextLesson && nextLesson.id) {
        return {
          url: `/lesson/${nextLesson.id}`,
          shouldDisableStudyMode: false,
        };
      } else if (currentLesson.subjectId) {
        return {
          url: `/lessons?subjectId=${currentLesson.subjectId}`,
          shouldDisableStudyMode: false,
        };
      } else {
        return {
          url: '/',
          shouldDisableStudyMode: false,
        };
      }
    }
  },
}));

export default useDataStore;

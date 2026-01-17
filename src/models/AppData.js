import { Student } from './Student.js';
import { Lesson } from './Lesson.js';
import { Quiz } from './Quiz.js';
import { Progress } from './Progress.js';
import { VideoResource } from './VideoResource.js';
import { Reward } from './Reward.js';
import { Purchase } from './Purchase.js';
import { PointsActivity } from './PointsActivity.js';

export class AppData {
  constructor({ students = [], lessons = [], quizzes = [], progress = [], videoResources = [], rewards = [], purchases = [], pointsActivities = [], pointsBalance = 0, pointsSystemVersion = 0 }) {
    this.students = students.map(s => s instanceof Student ? s : Student.fromJSON(s));
    this.lessons = lessons.map(l => l instanceof Lesson ? l : Lesson.fromJSON(l));
    this.quizzes = quizzes.map(q => q instanceof Quiz ? q : Quiz.fromJSON(q));
    this.progress = progress.map(p => p instanceof Progress ? p : Progress.fromJSON(p));
    this.videoResources = videoResources.map(v => v instanceof VideoResource ? v : VideoResource.fromJSON(v));
    this.rewards = rewards.map(r => r instanceof Reward ? r : Reward.fromJSON(r));
    this.purchases = purchases.map(p => p instanceof Purchase ? p : Purchase.fromJSON(p));
    this.pointsActivities = pointsActivities.map(pa => pa instanceof PointsActivity ? pa : PointsActivity.fromJSON(pa));
    this.pointsBalance = pointsBalance || 0;
    this.pointsSystemVersion = pointsSystemVersion || 0;
  }

  toJSON() {
    return {
      students: this.students.map(s => s.toJSON()),
      lessons: this.lessons.map(l => l.toJSON()),
      quizzes: this.quizzes.map(q => q.toJSON()),
      progress: this.progress.map(p => p.toJSON()),
      videoResources: this.videoResources.map(v => v.toJSON()),
      rewards: this.rewards.map(r => r.toJSON()),
      purchases: this.purchases.map(p => p.toJSON()),
      pointsActivities: this.pointsActivities.map(pa => pa.toJSON()),
      pointsBalance: this.pointsBalance || 0,
      pointsSystemVersion: this.pointsSystemVersion || 0,
    };
  }

  static fromJSON(json) {
    return new AppData({
      students: json.students || [],
      lessons: json.lessons || [],
      quizzes: json.quizzes || [],
      progress: json.progress || [],
      videoResources: json.videoResources || [],
      rewards: json.rewards || [],
      purchases: json.purchases || [],
      pointsActivities: json.pointsActivities || [],
      pointsBalance: json.pointsBalance || 0,
      pointsSystemVersion: json.pointsSystemVersion || 0,
    });
  }

  static defaultData() {
    return new AppData({
      students: [],
      lessons: [],
      quizzes: [],
      progress: [],
      videoResources: [],
      rewards: [],
      purchases: [],
      pointsActivities: [],
      pointsBalance: 0,
    });
  }
}




import { Student } from './Student.js';
import { Lesson } from './Lesson.js';
import { Quiz } from './Quiz.js';
import { Progress } from './Progress.js';
import { VideoResource } from './VideoResource.js';

export class AppData {
  constructor({ students = [], lessons = [], quizzes = [], progress = [], videoResources = [] }) {
    this.students = students.map(s => s instanceof Student ? s : Student.fromJSON(s));
    this.lessons = lessons.map(l => l instanceof Lesson ? l : Lesson.fromJSON(l));
    this.quizzes = quizzes.map(q => q instanceof Quiz ? q : Quiz.fromJSON(q));
    this.progress = progress.map(p => p instanceof Progress ? p : Progress.fromJSON(p));
    this.videoResources = videoResources.map(v => v instanceof VideoResource ? v : VideoResource.fromJSON(v));
  }

  toJSON() {
    return {
      students: this.students.map(s => s.toJSON()),
      lessons: this.lessons.map(l => l.toJSON()),
      quizzes: this.quizzes.map(q => q.toJSON()),
      progress: this.progress.map(p => p.toJSON()),
      videoResources: this.videoResources.map(v => v.toJSON()),
    };
  }

  static fromJSON(json) {
    return new AppData({
      students: json.students || [],
      lessons: json.lessons || [],
      quizzes: json.quizzes || [],
      progress: json.progress || [],
      videoResources: json.videoResources || [],
    });
  }

  static defaultData() {
    return new AppData({
      students: [],
      lessons: [],
      quizzes: [],
      progress: [],
      videoResources: [],
    });
  }
}


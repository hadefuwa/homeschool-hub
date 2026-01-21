export class Progress {
  constructor({
    id,
    studentId,
    activityType,
    activityId,
    score = null,
    successPercentage = null,
    isCompleted = false,
    completedAt = null,
    yearId = null,
    subjectId = null,
    lessonNumber = null,
    imagePath = null,
  }) {
    this.id = id;
    this.studentId = studentId;
    this.activityType = activityType;
    this.activityId = activityId;
    this.score = score;
    this.successPercentage = successPercentage;
    this.isCompleted = isCompleted;
    this.completedAt = completedAt ? (completedAt instanceof Date ? completedAt : new Date(completedAt)) : null;
    this.yearId = yearId;
    this.subjectId = subjectId;
    this.lessonNumber = lessonNumber;
    this.imagePath = imagePath;
  }

  toJSON() {
    return {
      id: this.id,
      studentId: this.studentId,
      activityType: this.activityType,
      activityId: this.activityId,
      score: this.score,
      successPercentage: this.successPercentage,
      isCompleted: this.isCompleted,
      completedAt: this.completedAt instanceof Date 
        ? this.completedAt.toISOString() 
        : (this.completedAt ? new Date(this.completedAt).toISOString() : null),
      yearId: this.yearId,
      subjectId: this.subjectId,
      lessonNumber: this.lessonNumber,
      imagePath: this.imagePath,
    };
  }

  static fromJSON(json) {
    return new Progress({
      id: json.id,
      studentId: json.studentId,
      activityType: json.activityType,
      activityId: json.activityId,
      score: json.score ?? null,
      successPercentage: json.successPercentage ?? null,
      isCompleted: json.isCompleted ?? false,
      completedAt: json.completedAt ? new Date(json.completedAt) : null,
      yearId: json.yearId ?? null,
      subjectId: json.subjectId ?? null,
      lessonNumber: json.lessonNumber ?? null,
      imagePath: json.imagePath ?? null,
    });
  }
}


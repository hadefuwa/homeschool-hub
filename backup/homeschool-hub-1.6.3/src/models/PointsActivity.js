export class PointsActivity {
  constructor({ id, studentId, activityType, activityId, pointsEarned, earnedAt, lessonTitle, yearId, medal }) {
    this.id = id;
    this.studentId = studentId;
    this.activityType = activityType; // 'lesson', 'quiz', 'bonus', etc.
    this.activityId = activityId; // ID of the lesson/quiz that awarded points
    this.pointsEarned = pointsEarned;
    this.earnedAt = earnedAt instanceof Date ? earnedAt : new Date(earnedAt);
    this.lessonTitle = lessonTitle; // Store lesson title for display
    this.yearId = yearId; // Store year for context
    this.medal = medal; // Store medal type (Bronze, Silver, Gold, Platinum)
  }

  toJSON() {
    return {
      id: this.id,
      studentId: this.studentId,
      activityType: this.activityType,
      activityId: this.activityId,
      pointsEarned: this.pointsEarned,
      earnedAt: this.earnedAt.toISOString(),
      lessonTitle: this.lessonTitle,
      yearId: this.yearId,
      medal: this.medal,
    };
  }

  static fromJSON(json) {
    return new PointsActivity({
      id: json.id,
      studentId: json.studentId,
      activityType: json.activityType,
      activityId: json.activityId,
      pointsEarned: json.pointsEarned,
      earnedAt: json.earnedAt ? new Date(json.earnedAt) : new Date(),
      lessonTitle: json.lessonTitle,
      yearId: json.yearId,
      medal: json.medal,
    });
  }

  copyWith({ id, studentId, activityType, activityId, pointsEarned, earnedAt, lessonTitle, yearId, medal } = {}) {
    return new PointsActivity({
      id: id ?? this.id,
      studentId: studentId ?? this.studentId,
      activityType: activityType ?? this.activityType,
      activityId: activityId ?? this.activityId,
      pointsEarned: pointsEarned ?? this.pointsEarned,
      earnedAt: earnedAt ?? this.earnedAt,
      lessonTitle: lessonTitle ?? this.lessonTitle,
      yearId: yearId ?? this.yearId,
      medal: medal ?? this.medal,
    });
  }
}

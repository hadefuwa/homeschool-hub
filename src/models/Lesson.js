export class Lesson {
  constructor({
    id,
    yearId,
    subjectId,
    categoryId = null,
    lessonNumber,
    title,
    content,
    emoji = '📚',
    quizId = null,
    assessmentType = null,
    ttsDisabled = false,
  }) {
    this.id = id;
    this.yearId = yearId;
    this.subjectId = subjectId;
    this.categoryId = categoryId;
    this.lessonNumber = lessonNumber;
    this.title = title;
    this.content = content;
    this.emoji = emoji;
    this.quizId = quizId;
    this.assessmentType = assessmentType;
    this.ttsDisabled = ttsDisabled;
  }

  toJSON() {
    return {
      id: this.id,
      yearId: this.yearId,
      subjectId: this.subjectId,
      categoryId: this.categoryId,
      lessonNumber: this.lessonNumber,
      title: this.title,
      content: this.content,
      emoji: this.emoji,
      quizId: this.quizId,
      assessmentType: this.assessmentType,
      ttsDisabled: this.ttsDisabled,
    };
  }

  static fromJSON(json) {
    return new Lesson({
      id: json.id,
      yearId: json.yearId,
      subjectId: json.subjectId,
      categoryId: json.categoryId ?? null,
      lessonNumber: json.lessonNumber,
      title: json.title,
      content: json.content,
      emoji: json.emoji ?? '📚',
      quizId: json.quizId ?? null,
      assessmentType: json.assessmentType ?? null,
      ttsDisabled: json.ttsDisabled ?? false,
    });
  }
}




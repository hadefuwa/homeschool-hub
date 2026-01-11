export class Question {
  constructor({ id, quizId, questionText, options, correctAnswerIndex }) {
    this.id = id;
    this.quizId = quizId;
    this.questionText = questionText;
    this.options = options;
    this.correctAnswerIndex = correctAnswerIndex;
  }

  toJSON() {
    return {
      id: this.id,
      quizId: this.quizId,
      questionText: this.questionText,
      options: this.options,
      correctAnswerIndex: this.correctAnswerIndex,
    };
  }

  static fromJSON(json) {
    return new Question({
      id: json.id,
      quizId: json.quizId,
      questionText: json.questionText,
      options: json.options,
      correctAnswerIndex: json.correctAnswerIndex,
    });
  }
}


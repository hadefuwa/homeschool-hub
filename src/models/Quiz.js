import { Question } from './Question.js';

export class Quiz {
  constructor({ id, title, category, ageGroup, questions }) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.ageGroup = ageGroup;
    this.questions = questions.map(q => q instanceof Question ? q : Question.fromJSON(q));
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      category: this.category,
      ageGroup: this.ageGroup,
      questions: this.questions.map(q => q.toJSON()),
    };
  }

  static fromJSON(json) {
    return new Quiz({
      id: json.id,
      title: json.title,
      category: json.category,
      ageGroup: json.ageGroup,
      questions: json.questions.map(q => Question.fromJSON(q)),
    });
  }
}


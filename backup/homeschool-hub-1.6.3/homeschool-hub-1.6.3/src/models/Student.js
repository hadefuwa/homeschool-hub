export class Student {
  constructor({ id, name, age, createdAt }) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      createdAt: this.createdAt.toISOString(),
    };
  }

  static fromJSON(json) {
    return new Student({
      id: json.id,
      name: json.name,
      age: json.age,
      createdAt: json.createdAt,
    });
  }

  copyWith({ id, name, age, createdAt } = {}) {
    return new Student({
      id: id ?? this.id,
      name: name ?? this.name,
      age: age ?? this.age,
      createdAt: createdAt ?? this.createdAt,
    });
  }
}




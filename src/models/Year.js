export class Year {
  constructor({ id, name, order }) {
    this.id = id;
    this.name = name;
    this.order = order;
  }

  static allYears = [
    new Year({ id: 'nursery', name: 'Nursery', order: 0 }),
    new Year({ id: 'reception', name: 'Reception', order: 1 }),
    new Year({ id: 'year1', name: 'Year 1', order: 2 }),
    new Year({ id: 'year2', name: 'Year 2', order: 3 }),
    new Year({ id: 'year3', name: 'Year 3', order: 4 }),
    new Year({ id: 'year4', name: 'Year 4', order: 5 }),
    new Year({ id: 'year5', name: 'Year 5', order: 6 }),
    new Year({ id: 'year6', name: 'Year 6', order: 7 }),
  ];

  static getById(id) {
    return Year.allYears.find(y => y.id === id) || null;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      order: this.order,
    };
  }

  static fromJSON(json) {
    return new Year({
      id: json.id,
      name: json.name,
      order: json.order,
    });
  }
}


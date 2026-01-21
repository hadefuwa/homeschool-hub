export class Reward {
  constructor({ id, name, description, cost, imageUrl = null, isActive = true, createdAt }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.imageUrl = imageUrl;
    this.isActive = isActive;
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      cost: this.cost,
      imageUrl: this.imageUrl,
      isActive: this.isActive,
      createdAt: this.createdAt.toISOString(),
    };
  }

  static fromJSON(json) {
    return new Reward({
      id: json.id,
      name: json.name,
      description: json.description,
      cost: json.cost,
      imageUrl: json.imageUrl || null,
      isActive: json.isActive !== undefined ? json.isActive : true,
      createdAt: json.createdAt || new Date(),
    });
  }

  copyWith({ id, name, description, cost, imageUrl, isActive, createdAt } = {}) {
    return new Reward({
      id: id ?? this.id,
      name: name ?? this.name,
      description: description ?? this.description,
      cost: cost ?? this.cost,
      imageUrl: imageUrl ?? this.imageUrl,
      isActive: isActive ?? this.isActive,
      createdAt: createdAt ?? this.createdAt,
    });
  }
}

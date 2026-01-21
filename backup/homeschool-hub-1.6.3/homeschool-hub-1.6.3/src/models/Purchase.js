export class Purchase {
  constructor({ id, rewardId, purchasedAt, pointsSpent }) {
    this.id = id;
    this.rewardId = rewardId;
    this.purchasedAt = purchasedAt instanceof Date ? purchasedAt : new Date(purchasedAt);
    this.pointsSpent = pointsSpent;
  }

  toJSON() {
    return {
      id: this.id,
      rewardId: this.rewardId,
      purchasedAt: this.purchasedAt.toISOString(),
      pointsSpent: this.pointsSpent,
    };
  }

  static fromJSON(json) {
    return new Purchase({
      id: json.id,
      rewardId: json.rewardId,
      purchasedAt: json.purchasedAt ? new Date(json.purchasedAt) : new Date(),
      pointsSpent: json.pointsSpent,
    });
  }

  copyWith({ id, rewardId, purchasedAt, pointsSpent } = {}) {
    return new Purchase({
      id: id ?? this.id,
      rewardId: rewardId ?? this.rewardId,
      purchasedAt: purchasedAt ?? this.purchasedAt,
      pointsSpent: pointsSpent ?? this.pointsSpent,
    });
  }
}

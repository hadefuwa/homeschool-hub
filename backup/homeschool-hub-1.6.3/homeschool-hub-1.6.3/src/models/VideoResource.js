export class VideoResource {
  constructor({ id, title, description, videoPath, category, ageGroup, thumbnailPath = null }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.videoPath = videoPath;
    this.category = category;
    this.ageGroup = ageGroup;
    this.thumbnailPath = thumbnailPath;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      videoPath: this.videoPath,
      category: this.category,
      ageGroup: this.ageGroup,
      thumbnailPath: this.thumbnailPath,
    };
  }

  static fromJSON(json) {
    return new VideoResource({
      id: json.id,
      title: json.title,
      description: json.description,
      videoPath: json.videoPath,
      category: json.category,
      ageGroup: json.ageGroup,
      thumbnailPath: json.thumbnailPath ?? null,
    });
  }
}




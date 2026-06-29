class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Erstellt ein Hintergrund-Objekt an der gegebenen Position.
   * @param {string} imagePath - Pfad zum Hintergrundbild.
   * @param {number} x - Horizontale Startposition im Level.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}

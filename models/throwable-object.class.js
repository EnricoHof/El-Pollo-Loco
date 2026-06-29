class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * Erstellt eine geworfene Flasche an der gegebenen Position.
   * @param {number} x - Horizontale Startposition.
   * @param {number} y - Vertikale Startposition.
   */
  constructor(x, y) {
    super().loadImage(this.IMAGES_ROTATION[0]);
    this.loadImages(this.IMAGES_ROTATION);
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 60;
    this.throw();
    this.animate();
  }

  /**
   * Startet den Wurf: Aufwaerts-Schub, Schwerkraft und Flug nach rechts.
   */
  throw() {
    this.speedY = 25;
    this.applyGravity();
    setStoppableInterval(() => {
      this.x += 10;
    }, 25);
  }

  /**
   * Ueberschreibt die Bodenpruefung, damit die Flasche immer faellt.
   * @returns {boolean} immer true.
   */
  isAboveGround() {
    return true;
  }

  /**
   * Spielt die Rotations-Animation der Flasche in einer Endlosschleife.
   */
  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_ROTATION);
    }, 80);
  }
}

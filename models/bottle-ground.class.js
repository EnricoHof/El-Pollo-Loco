class BottleGround extends MovableObject {
  IMAGES = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Erstellt eine sammelbare Flasche am Boden mit zufaelligem Bild.
   * @param {number} x - Horizontale Position im Level.
   */
  constructor(x) {
    super();
    this.loadImage(this.IMAGES[Math.round(Math.random())]);
    this.x = x;
    this.y = 350;
    this.width = 70;
    this.height = 70;
  }
}

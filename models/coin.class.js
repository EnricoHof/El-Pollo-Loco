class Coin extends MovableObject {
  IMAGES_COIN = [
    "img/8_coin/coin_1.png",
    "img/8_coin/coin_2.png",
  ];

  /**
   * Erstellt eine sammelbare Muenze an der gegebenen Position.
   * @param {number} x - Horizontale Position im Level.
   * @param {number} y - Vertikale Position im Level.
   */
  constructor(x, y) {
    super().loadImage(this.IMAGES_COIN[0]);
    this.loadImages(this.IMAGES_COIN);
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.animate();
  }

  /**
   * Spielt die Glitzer-Animation der Muenze in einer Endlosschleife.
   */
  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 300);
  }
}

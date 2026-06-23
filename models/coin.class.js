class Coin extends MovableObject {
  IMAGES_COIN = [
    "img/8_coin/coin_1.png",
    "img/8_coin/coin_2.png",
  ];

  constructor(x, y) {
    super().loadImage(this.IMAGES_COIN[0]);
    this.loadImages(this.IMAGES_COIN);
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 300);
  }
}

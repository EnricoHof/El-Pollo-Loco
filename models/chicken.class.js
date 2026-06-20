class Chicken extends MovableObject {
  y = 355;
  height = 70;
  width = 70;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 400 + Math.random() * 1500;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
    this.applyMovement();
  }

  applyMovement() {
    setInterval(() => this.moveLeft(), 1000 / 60);
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_WALKING.length;
      this.img = this.imageCache[this.IMAGES_WALKING[i]];
      this.currentImage++;
    }, 150);
  }
}

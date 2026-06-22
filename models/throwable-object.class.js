class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

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

  throw() {
    this.speedY = 25;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }

  isAboveGround() {
    return true;
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATION);
    }, 80);
  }
}

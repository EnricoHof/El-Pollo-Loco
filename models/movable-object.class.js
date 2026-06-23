class MovableObject {
  x = 120;
  y = 200;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 5;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 145;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    this.img = this.imageCache[images[i]];
    this.currentImage++;
  }

  isColliding(other) {
    return (
      this.x + this.width > other.x &&
      this.x < other.x + other.width &&
      this.y + this.height > other.y &&
      this.y < other.y + other.height
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = (new Date().getTime() - this.lastHit) / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }
}

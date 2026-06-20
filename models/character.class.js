class Character extends MovableObject {
  height = 280;
  width = 110;
  y = 145;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.applyGravity();
    this.animate();
    this.applyMovement();
  }

  applyMovement() {
    setInterval(() => {
      if (keyboard.RIGHT) {
        this.moveRight();
        this.otherDirection = false;
      }
      if (keyboard.LEFT) {
        this.moveLeft();
        this.otherDirection = true;
      }
      if ((keyboard.SPACE || keyboard.UP) && !this.isAboveGround()) {
        this.jump();
      }
    }, 1000 / 60);
  }

  jump() {
    this.speedY = 30;
  }

  animate() {
    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (keyboard.RIGHT || keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }
}

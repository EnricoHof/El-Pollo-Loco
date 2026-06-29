class Character extends MovableObject {
  height = 280;
  width = 110;
  y = 145;
  bottles = 100;
  coins = 0;
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
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_SLEEPING = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  lastAction = new Date().getTime();
  levelStartX = -590;
  levelEndX = 2400;

  /**
   * Laedt alle Animationsbilder und startet Schwerkraft, Animation und Steuerung.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
    this.applyMovement();
  }

  /**
   * Wertet 60x pro Sekunde die Tasten fuer Bewegung, Sprung und Aktivitaet aus.
   */
  applyMovement() {
    setStoppableInterval(() => {
      this.handleWalking();
      if ((keyboard.SPACE || keyboard.UP) && !this.isAboveGround()) {
        this.jump();
      }
      if (keyboard.RIGHT || keyboard.LEFT || keyboard.SPACE || keyboard.UP) {
        this.lastAction = new Date().getTime();
      }
    }, 1000 / 60);
  }

  /**
   * Bewegt den Charakter innerhalb der Levelgrenzen nach links oder rechts.
   */
  handleWalking() {
    if (keyboard.RIGHT && this.x < this.levelEndX) {
      this.moveRight();
      this.otherDirection = false;
    }
    if (keyboard.LEFT && this.x > this.levelStartX) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }

  /**
   * Loest einen Sprung aus und spielt den Sprung-Sound.
   */
  jump() {
    this.speedY = 30;
    soundManager.play(sounds.jump);
  }

  /**
   * Berechnet die seit der letzten Aktion vergangene Zeit.
   * @returns {number} Vergangene Zeit in Sekunden.
   */
  secondsSinceLastAction() {
    return (new Date().getTime() - this.lastAction) / 1000;
  }

  /**
   * Spielt je nach Zustand die passende Charakter-Animation (Prioritaetskette).
   */
  animate() {
    setStoppableInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (keyboard.RIGHT || keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playIdleOrSleep();
      }
    }, 100);
  }

  /**
   * Spielt die Schlaf-Animation nach 15s Inaktivitaet, sonst die Idle-Animation.
   */
  playIdleOrSleep() {
    if (this.secondsSinceLastAction() > 15) {
      this.playAnimation(this.IMAGES_SLEEPING);
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }
}

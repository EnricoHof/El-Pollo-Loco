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

  /**
   * Laedt ein einzelnes Bild als aktuelles Bild des Objekts.
   * @param {string} path - Pfad zur Bilddatei.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Laedt mehrere Bilder vor und legt sie im imageCache ab.
   * @param {string[]} arr - Liste der Bildpfade.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Bewegt das Objekt um seine Geschwindigkeit nach rechts.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Bewegt das Objekt um seine Geschwindigkeit nach links.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Wendet die Schwerkraft an: laesst das Objekt steigen und fallen.
   */
  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Prueft, ob sich das Objekt ueber der Bodenlinie befindet.
   * @returns {boolean} true, wenn das Objekt in der Luft ist.
   */
  isAboveGround() {
    return this.y < 145;
  }

  /**
   * Setzt das naechste Bild einer Animationssequenz als aktuelles Bild.
   * @param {string[]} images - Bildpfade der Animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    this.img = this.imageCache[images[i]];
    this.currentImage++;
  }

  /**
   * Prueft per AABB-Verfahren, ob dieses Objekt ein anderes ueberlappt.
   * @param {MovableObject} other - Das zu pruefende Gegenueber.
   * @returns {boolean} true, wenn sich beide Rechtecke ueberschneiden.
   */
  isColliding(other) {
    return (
      this.x + this.width > other.x &&
      this.x < other.x + other.width &&
      this.y + this.height > other.y &&
      this.y < other.y + other.height
    );
  }

  /**
   * Fuegt dem Objekt Schaden zu und merkt sich den Zeitpunkt des Treffers.
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Prueft, ob das Objekt vor weniger als 1 Sekunde getroffen wurde.
   * @returns {boolean} true, wenn das Objekt gerade verletzt ist.
   */
  isHurt() {
    let timepassed = (new Date().getTime() - this.lastHit) / 1000;
    return timepassed < 1;
  }

  /**
   * Prueft, ob die Energie des Objekts auf 0 gesunken ist.
   * @returns {boolean} true, wenn das Objekt tot ist.
   */
  isDead() {
    return this.energy == 0;
  }
}

class World {
  character = new Character();
  enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
  ];
  backgroundObjects = [
    new BackgroundObject("img/5_background/layers/air.png", -719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("img/5_background/layers/air.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

    new BackgroundObject("img/5_background/layers/air.png", 719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("img/5_background/layers/air.png", 1438),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 1438),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 1438),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 1438),
  ];

  statusBar = new StatusBar("health", 20, 0);
  bottleBar = new StatusBar("bottle", 20, 50);
  coinBar = new StatusBar("coin", 20, 100);
  coins = [
    new Coin(500, 320),
    new Coin(700, 250),
    new Coin(900, 320),
    new Coin(1200, 280),
    new Coin(1500, 320),
  ];
  collectableBottles = [
    new BottleGround(600),
    new BottleGround(1000),
    new BottleGround(1300),
    new BottleGround(1700),
  ];
  throwableObjects = [];
  lastThrow = 0;
  camera_x = 0;
  ctx;
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.draw();
    this.checkCollisions();
    this.checkThrowObjects();
    this.checkBottleHits();
    this.checkCollects();
  }

  checkCollects() {
    setInterval(() => {
      this.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
          this.coins.splice(index, 1);
          this.character.coins = Math.min(this.character.coins + 20, 100);
          this.coinBar.setPercentage(this.character.coins);
        }
      });
      this.collectableBottles.forEach((bottle, index) => {
        if (this.character.isColliding(bottle)) {
          if (this.character.bottles < 100) {
            this.collectableBottles.splice(index, 1);
            this.character.bottles = Math.min(this.character.bottles + 20, 100);
            this.bottleBar.setPercentage(this.character.bottles);
          }
        }
      });
    }, 100);
  }

  checkThrowObjects() {
    setInterval(() => {
      let timepassed = (new Date().getTime() - this.lastThrow) / 1000;
      if (keyboard.D && timepassed > 0.5 && this.character.bottles > 0) {
        let bottle = new ThrowableObject(
          this.character.x + 50,
          this.character.y + 100,
        );
        this.throwableObjects.push(bottle);
        this.character.bottles -= 20;
        this.bottleBar.setPercentage(this.character.bottles);
        this.lastThrow = new Date().getTime();
      }
    }, 1000 / 60);
  }

  checkBottleHits() {
    setInterval(() => {
      this.throwableObjects.forEach((bottle, bottleIndex) => {
        this.enemies.forEach((enemy, enemyIndex) => {
          if (bottle.isColliding(enemy)) {
            this.enemies.splice(enemyIndex, 1);
            this.throwableObjects.splice(bottleIndex, 1);
          }
        });
      });
    }, 100);
  }

  checkCollisions() {
    setInterval(() => {
      this.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      });
    }, 200);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.camera_x = -this.character.x + 100;
    this.ctx.translate(this.camera_x, 0);
    this.addObjects(this.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjects(this.enemies);
    this.addObjects(this.coins);
    this.addObjects(this.collectableBottles);
    this.addObjects(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    requestAnimationFrame(() => this.draw());
  }

  addObjects(objects) {
    objects.forEach((object) => this.addToMap(object));
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}

class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];

  ctx;
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.addToMap(this.character);
    this.addObjects(this.enemies);
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

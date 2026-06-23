class BottleGround extends MovableObject {
  IMAGES = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor(x) {
    super();
    this.loadImage(this.IMAGES[Math.round(Math.random())]);
    this.x = x;
    this.y = 350;
    this.width = 70;
    this.height = 70;
  }
}

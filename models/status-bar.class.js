class StatusBar extends MovableObject {
  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];
  IMAGES_BOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];
  IMAGES_COIN = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];
  IMAGES_ENDBOSS = [
    "img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];
  IMAGES = [];
  percentage = 100;

  /**
   * Erstellt eine Statusbar des gegebenen Typs an fester Position.
   * @param {string} type - Art der Bar: "health", "bottle", "coin" oder "endboss".
   * @param {number} x - Horizontale Position auf dem Bildschirm.
   * @param {number} y - Vertikale Position auf dem Bildschirm.
   */
  constructor(type, x, y) {
    super();
    this.IMAGES = this.selectImages(type);
    this.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 60;
    this.setPercentage(type === "bottle" || type === "coin" ? 0 : 100);
  }

  /**
   * Waehlt das passende Bilderset zum Bar-Typ.
   * @param {string} type - Art der Bar.
   * @returns {string[]} Die Bildpfade fuer die 6 Fuellstufen.
   */
  selectImages(type) {
    if (type === "bottle") {
      return this.IMAGES_BOTTLE;
    } else if (type === "coin") {
      return this.IMAGES_COIN;
    } else if (type === "endboss") {
      return this.IMAGES_ENDBOSS;
    } else {
      return this.IMAGES_HEALTH;
    }
  }

  /**
   * Setzt den Fuellstand und aktualisiert das angezeigte Bar-Bild.
   * @param {number} percentage - Fuellstand von 0 bis 100.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let index = this.resolveImageIndex();
    this.img = this.imageCache[this.IMAGES[index]];
  }

  /**
   * Ordnet dem Fuellstand den passenden Bild-Index (0-5) zu.
   * @returns {number} Index des anzuzeigenden Bildes.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}

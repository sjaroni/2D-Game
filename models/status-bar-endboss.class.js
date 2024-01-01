class StatusBarEndboss extends StatusIcons {
  otherDirection = true;

  IMAGES = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
  ];

  IMAGE = 'img/7_statusbars/3_icons/icon_health_endboss.png';

  constructor() {
    super();
    this.loadImage(this.IMAGE);
    this.loadImages(this.IMAGES);
    this.x = 510;
    this.y = 70;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage <= 100 && this.percentage > 83.3) {
      return 5;
    } else if (this.percentage <= 83.3 && this.percentage > 66.6) {
      return 4;
    } else if (this.percentage <= 66.6 && this.percentage > 49.9) {
      return 3;
    } else if (this.percentage <= 49.9 && this.percentage > 33.2) {
      return 2;
    } else if (this.percentage <= 33.2 && this.percentage > 16.5) {
      return 1;
    } else if (this.percentage <= 16.5) {
      return 0;
    }
  }
}

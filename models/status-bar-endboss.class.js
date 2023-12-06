class StatusBarEndboss extends DrawableObject {
  
  IMAGES = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
  ];

  IMAGE = 'img/7_statusbars/3_icons/icon_health_endboss.png';

  otherDirection = true;
  percentage = 100;
  constructor(){
    super();
    this.loadImages(this.IMAGES);
    this.loadImage(this.IMAGE);
    this.x = 510;
    this.y = 20;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  setPercentage(percentage){
    this.percentage = percentage; // => 0 ... 5    
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
  
  resolveImageIndex(){
    if (this.percentage <= 100 && this.percentage > 80) {
      return 5;
    } else if (this.percentage <= 80 && this.percentage > 60) {
      return 4;
    } else if (this.percentage <= 60 && this.percentage > 40) {
      return 3;
    } else if (this.percentage <= 40 && this.percentage > 20) {
      return 2;
    } else if (this.percentage <= 20 && this.percentage > 0) {
      return 1;
    } else if (this.percentage === 0) {
      return 0;
    }
  }
} 
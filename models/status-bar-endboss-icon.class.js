class EndbossIcon extends DrawableObject {

  IMAGES = [
    'img/7_statusbars/3_icons/icon_health_endboss.png'
  ]

  x = 664; // Wert zwischen 0 und maximaler Breite
  y = 28; // Wert zwischen 100 und 300  

  width = 57;
  height = 57;  
  maxBackgroundWidth = 1400;

  constructor(){
    super().loadImage(this.IMAGES);
    //this.x = this.x + Math.random() * this.maxBackgroundWidth;
    //this.y = this.height + Math.random() * 180;
  }
}
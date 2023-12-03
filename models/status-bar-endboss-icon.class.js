class EndbossIcon extends DrawableObject {

  IMAGES = [
    'img/7_statusbars/3_icons/icon_health_endboss.png'
  ]

  x = 664;
  y = 28;  

  width = 57;
  height = 57;  
  maxBackgroundWidth = 1400;

  constructor(){
    super().loadImage(this.IMAGES);
  }
}
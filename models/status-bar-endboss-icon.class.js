class EndbossIcon extends DrawableObject {
  x = 664;
  y = 78;
  width = 57;
  height = 57;

  IMAGES = ['img/7_statusbars/3_icons/icon_health_endboss.png'];

  constructor() {
    super().loadImage(this.IMAGES);
  }
}

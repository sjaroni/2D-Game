class StatusBarBottle extends StatusIcons {  
  x = 10;
  y = 20;
  textX = 60;
  width = 71;
  height = 69;

  IMAGES = ['img/7_statusbars/3_icons/icon_salsa_bottle.png'];

  constructor() {
    super().loadImage(this.IMAGES[0]);
  }
}

class StatusBarHealth extends StatusIcons {
  
  text = 5;
  x = 90;
  y = 20;
  textX = 150;
  width = 71;
  height = 69;

  IMAGES = [
    'img/7_statusbars/3_icons/icon_health.png'
  ];
  
  constructor(){    
    super().loadImage(this.IMAGES[0]);    
  }  
}
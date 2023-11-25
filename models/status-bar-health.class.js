class StatusBarHealth extends StatusIcons {
  
  text = 5;
  x = 90;
  y = 20;
  textX = 150;
  width = 71;
  height = 69;
  percentage = 100;

  IMAGES = [
    'img/7_statusbars/3_icons/icon_health.png'
  ];
  
  constructor(){    
    super().loadImage(this.IMAGES[0]);
    this.setPercentage(100);
  }

  setPercentage(percentage){
    this.percentage = percentage; // => 0 ... 5
    this.text = percentage;
    //let path = this.IMAGES[this.resolveImageIndex()];
    //this.img = this.imageCache[path];
  }
  
  resolveImageIndex(){
    if(this.percentage == 100){
      return 5;
    } else if(this.percentage > 80){
      return 4;
    } else if(this.percentage > 60){
      return 3;
    } else if(this.percentage > 40){
      return 2;
    } else if(this.percentage > 20){
      return 1;
    } else {
      return 0;
    }
  }

}
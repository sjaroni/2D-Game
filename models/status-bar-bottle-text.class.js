class StatusBarBottleText extends DrawableObject {
  
  IMAGES = [
    'img/7_statusbars/3_icons/icon_salsa_bottle.png'
  ];
  text = 2;

  constructor(){    
    super().loadImage(this.IMAGES[0]);
    this.x = 10;
    this.y = 10;
    this.textX = 60;
    this.textY = 60;
    this.width = 71;
    this.height = 69;      
  }

  setPercentage(percentage){
    this.percentage = percentage; // => 0 ... 5    
    let path = this.IMAGES[this.resolveImageIndex()];
    //this.img = this.imageCache[path];
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
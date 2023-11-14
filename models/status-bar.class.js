class StatusBar extends DrawableObject {
  
  y = 20;
  x = 20;
  width = 200;
  height = 53.109;
  IMAGES_BOTTLE = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
  ];
  
  constructor(){

    super().loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png');
    this.loadImages(this.IMAGES_BOTTLE);
  }




  animate(){
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);     
    }, 200);    
  }
}
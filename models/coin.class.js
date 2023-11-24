class Coin extends DrawableObject {

  IMAGES = [
    'img/8_coin/coin_1.png'    
  ]

  //coin_sound = new Audio('audio/coin.mp3');

  x = 0; // Wert zwischen 0 und maximaler Breite
  y = 100; // Wert zwischen 100 und 300

  offsetX = 74;
  offsetY = 74;  

  width = 120;
  height = 120;  
  maxBackgroundWidth = 1400;

  constructor(){
    super();
    this.loadImage(this.IMAGES);    
    this.x = Math.random() * this.maxBackgroundWidth;
    this.y = this.height + Math.random() * 180;    
  }

    collected(){
      this.coin_sound.play();
    };

}
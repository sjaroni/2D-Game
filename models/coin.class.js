class Coin extends DrawableObject {

  IMAGES = [
    'img/8_coin/coin_1.png'
  ]

  x = 300; // Wert zwischen 0 und maximaler Breite
  y = 100; // Wert zwischen 100 und 300

  width = 120;
  height = 120;  
  maxBackgroundWidth = 1400;

  constructor(){
    super();
    this.loadImage(this.IMAGES);    
    this.x = this.x + Math.random() * this.maxBackgroundWidth;
    this.y = this.height + Math.random() * 180;    
  }
}
class Coin extends DrawableObject {

  IMAGES = [
    'img/8_coin/coin_1.png'
  ]

  x = 300; // Wert zwischen 0 und maximaler Breite
  y = 100; // Wert zwischen 100 und 300
  offset = {
    top: 40,
    bottom: 40,
    left: 40,
    right: 40
  }

  width = 120;
  height = 120;
  
  constructor(){
    super().loadImage(this.IMAGES);
    this.x = this.x + Math.random() * MAXBACKGROUNDWITH;
    this.y = this.height + Math.random() * 180;
  }
}
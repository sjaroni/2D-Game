class Coin extends MovableObject {

  IMAGES = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png'
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
    super().loadImage(this.IMAGES[0]);
    this.x = this.x + Math.random() * OBJECT_LEVEL_END;
    this.y = this.height + Math.random() * 180;
    this.loadImages(this.IMAGES);
    this.animate();
  }

  animate(){
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 500);
  }

}
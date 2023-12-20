class Coin extends MovableObject {
  x = 300;
  y = 100;
  width = 120;
  height = 120;

  offset = {
    top: 40,
    bottom: 40,
    left: 40,
    right: 40,
  };

  IMAGES = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

  constructor() {
    super().loadImage(this.IMAGES[0]);
    this.x = this.x + Math.random() * OBJECT_LEVEL_END;
    this.y = this.height + Math.random() * 180;
    this.loadImages(this.IMAGES);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 500);
  }
}

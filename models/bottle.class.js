class Bottle extends MovableObject {
  x = 300;
  y = 360;
  width = 71;
  height = 69;
  rotateInterval = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;

  offset = {
    top: 10,
    bottom: 10,
    left: 25,
    right: 25,
  };

  IMAGES_BOTTLE = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
  ];

  constructor() {
    super().loadImage(this.IMAGES_BOTTLE[0]);
    this.x = this.x + Math.random() * OBJECT_LEVEL_END;
    this.loadImages(this.IMAGES_BOTTLE);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, this.rotateInterval);
  }
}

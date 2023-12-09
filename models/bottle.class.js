class Bottle extends MovableObject{

  IMAGES_BOTTLE = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ];

  x = 300; // Wert zwischen 0 und maximaler Breite
  y = 360;
  offset = {
    top: 10,
    bottom: 10,
    left: 25,
    right: 25
  }

  width = 71;
  height = 69;

  constructor(){
    super().loadImage(this.IMAGES_BOTTLE[0]);
    this.x = this.x + Math.random() * OBJECT_LEVEL_END;
    this.loadImages(this.IMAGES_BOTTLE);
    this.animate();
  }

  animate(){
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 200);
  }

}
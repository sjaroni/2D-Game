class Bottle extends DrawableObject {

  IMAGES_BOTTLE = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png'
  ];

  x = 300; // Wert zwischen 0 und maximaler Breite
  y = 100; // Wert zwischen 100 und 300
  offset = {
    top: 10,
    bottom: 10,
    left: 25,
    right: 25
  }

  width = 71;
  height = 69;

  constructor(){
    super().loadImage(this.IMAGES_BOTTLE);
    this.x = this.x + Math.random() * OBJECT_LEVEL_END;
    this.y = this.height + Math.random() * 180;
  }
}
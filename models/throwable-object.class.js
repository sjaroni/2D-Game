class ThrowableObject extends MovableObject {
  
  IMAGES_THROW = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  ];

  offset = {
    top: 15,
    right: 40,
    bottom: 25,
    left: 20,
  };

  constructor(x, y, otherDirection) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.IMAGES_THROW);  

    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;

    this.height = 60;
    this.width = 50;
    this.throw();
  }
  
  throw() {
    this.speedY = 30;
    this.applyGravity();

    setInterval(() => {
      this.playAnimation(this.IMAGES_THROW);
      if (this.otherDirection == false) {        
        this.x += 10;
      } else {                
        this.x -= 10;
      }
    }, 25);
  }
}

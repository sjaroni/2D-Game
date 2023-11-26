class ThrowableObject extends MovableObject {
  constructor(x, y, otherDirection) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;

    this.height = 60;
    this.width = 50;       

    this.throw();
  }

  throw() {
    this.speedY = 30; // 30
    this.applyGravity();
    setInterval(() => {
      if (this.otherDirection == false) {        
        this.x += 10;
      } else {                
        this.x -= 10;
      }
    }, 25);
  }
}

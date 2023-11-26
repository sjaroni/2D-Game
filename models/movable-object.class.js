class MovableObject extends DrawableObject{
  
  speed = 0.15;  
  speedY = 0;
  acceleration = 2.5;
  lastHit = 0;  

  applyGravity(){
    setInterval(() => {      
      if(this.isAboveGround() || this.speedY > 0){
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  moveRight(){
    this.x += this.speed;    
  }  

  moveLeft(){    
    this.x -= this.speed;
  }

  isAboveGround(){    
    if(this instanceof ThrowableObject){
      return true;
    } else {
      return this.y < 180;
    }

  }
  
  hit(){
    this.energy -= 5;    
    if(this.energy < 0){
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();      
    }
  }  

  isDead(){
    return this.energy == 0;
  }

  isHurt(){
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }
  // isColliding(obj) {
  //   return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) && 
  //           (this.Y + this.offsetY + this.height) >= obj.Y &&
  //           (this.Y + this.offsetY) <= (obj.Y + obj.height) && 
  //           obj.onCollisionCourse;
  // }

// isColliding(obj) {
//     return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) && 
//             (this.Y + this.offsetY + this.height) >= obj.Y &&
//             (this.Y + this.offsetY) <= (obj.Y + obj.height);
//   }

  // Geht
  isColliding(obj) {
     return  (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
             (this.y + this.height) >= obj.y &&
             this.y <= (obj.y + obj.height);
  }

  playAnimation(images){
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;  
  }

  jump(){
    this.speedY = 30;
  }
}
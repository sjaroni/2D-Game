class MovableObject{
  x = 120;
  y = 170;
  width = 100;
  height = 150;
  img;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
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
  
  isAboveGround(){
    return this.y < 170;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr){    
    arr.forEach(path => {      
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight(){
    this.x += this.speed;    
  }  

  moveLeft(){    
    this.x -= this.speed;    
  }

  draw(ctx){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);        
  }

  drawFrame(ctx){
    if(this instanceof Character || this instanceof Chicken){
      ctx.beginPath();
      ctx.lineWidth = '2';
      ctx.strokeStyle = 'white';    
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
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

  isColliding(obj) {
    return  (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
            (this.y + this.height) >= obj.y &&
            this.y <= (obj.y + obj.height);
  }

  // isColliding(mo){
  //   return this.x + this.width > mo.x &&
  //     this.y + this.height > mo.y &&
  //     this.x < mo.x &&
  //     this.y < mo.y + mo.height;
  // }

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
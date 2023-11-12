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
    this.otherDirection = false;
    this.walking_sound.play();
  }  

  moveLeft(){
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60); 
  }


  playAnimation(images){
    // Walk animation
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;  
  }

  jump(){
    this.speedY = 30;
  }


}
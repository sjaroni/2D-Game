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
  
  // loadImage('img/test.png')
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
    console.log('Moving right');
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
}
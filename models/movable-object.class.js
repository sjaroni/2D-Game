class MovableObject{
  x = 120;
  y = 170;
  width = 100;
  height = 150;
  img;
  imageCache = {};
  currentImage = 0;
  
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
    
  }

}
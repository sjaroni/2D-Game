class DrawableObject{
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 170;
  width = 100;
  height = 150;
  

  constructor(){

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

  draw(ctx){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);        
  }

}
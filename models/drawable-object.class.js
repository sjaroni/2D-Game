class DrawableObject{
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 170;
  width = 100;
  height = 150;  
  backgroundWidth = 719;
  backgroundRepeat = 8;
  maxBackgroundWidth = this.backgroundWidth * this.backgroundRepeat;  
  otherDirection = false;
  text;


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

  drawText(ctx){    
    ctx.font = "48px zabars";
    ctx.fillStyle = "white";
    ctx.fillText(this.text, this.textX, this.textY);
  }

  drawFrame(ctx){
    if(this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof ThrowableObject){
      ctx.beginPath();
      ctx.lineWidth = '2';
      ctx.strokeStyle = 'white';    
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
  
  // drawFrame2(ctx){
  //   if(this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof ThrowableObject){
  //     ctx.beginPath();
  //     ctx.lineWidth = '2';
  //     ctx.strokeStyle = 'red';
  //     ctx.rect(this.x + this.offsetX / 2, this.y + this.offsetY / 2 , this.width - this.offsetX, this.height - this.offsetY);
  //     ctx.stroke();
  //   }
  // }
}
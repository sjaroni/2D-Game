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
  offset = {
    right: 10,
    left: 10,
    top: 10,
    bottom: 10,
};

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
    if(this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof ThrowableObject || this instanceof Bottle){
      ctx.beginPath();
      ctx.lineWidth = '2';
      ctx.strokeStyle = 'white';    
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
  
   drawInnerFrame(ctx){
      if(this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle){
       ctx.beginPath();
       ctx.lineWidth = '2';
       ctx.strokeStyle = 'red';
       ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
       ctx.stroke();
     }
   }
}
class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 170;
  width = 100;
  height = 150;

  otherDirection = false;
  text;

  offset = {
    right: 10,
    left: 10,
    top: 10,
    bottom: 10,
  };

  /**
   * Load image from path
   * @param {string} path 
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Load images from array
   * @param {string} arr
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draw images on canvas
   * @param {object} ctx 
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draw text on canvas
   * @param {object} ctx 
   */
  drawText(ctx) {
    ctx.font = '40px zabars';
    ctx.fillStyle = 'white';
    ctx.fillText(this.text, this.textX, this.textY);
  }

  /**
   * Draw frames for debugging
   * @param {object} ctx 
   */
  drawFrame(ctx) {
    if (this.isInstanceOf()) this.drawOuterWhiteFrame(ctx);
  }

  /**
   * Draw frames for debugging
   * @param {object} ctx 
   */
  drawInnerFrame(ctx) {
    if (this.isInstanceOf()) this.drawInnerRedFrame(ctx);
  }

  /**
   * Check if object is Instance of the following values
   * @returns true/false
   */
  isInstanceOf() {
    return (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof ChickenSmall ||
      this instanceof Coin ||
      this instanceof Endboss ||
      this instanceof ThrowableObject ||
      this instanceof Bottle
    );
  }

  /**
   * Draw frame on images
   * @param {object} ctx 
   */
  drawOuterWhiteFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'white';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

  /**
   * Draw frame with offset
   * @param {object} ctx 
   */
  drawInnerRedFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'red';
    ctx.rect(
      this.x + this.offset.left,
      this.y + this.offset.top,
      this.width - this.offset.right - this.offset.left,
      this.height - this.offset.bottom - this.offset.top,
    );
    ctx.stroke();
  }
}

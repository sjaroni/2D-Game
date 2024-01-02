class MovableObject extends DrawableObject {
  speed = 0.15;
  speedY = 0;
  acceleration = 2.5;
  lastHit = 0;
  energy = 100;
  yPosition = 180;

  /**
   * Check object-position
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Move object
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Move object
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Check if character object is above ground
   * @returns true/false
   */
  isAboveGroundCharacter() {
    if (this.y < 180) return true;
    else return false;
  }

  /**
   * Check if throwable object is above ground
   * @returns true/false
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) return true;
    else return this.y < this.yPosition;
  }

  /**
   * Object was been hit
   * @param {number} deduction
   */
  hit(deduction) {
    this.energy -= deduction;
    if (this.energy < 0) this.energy = 0;
    else this.lastHit = new Date().getTime();
  }

  /**
   * Object is dead
   * @returns true/false
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Object is hurt
   * @returns true/false
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Check if character is colliding with object
   * @param {object} mo
   * @returns true/false
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Check if character jumps on object
   * @param {object} mo
   * @returns true/false
   */
  isCollidingFromTop(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top
    );
  }

  /**
   * Checks if the object is to the left or right of the character's perspectiv
   * @param {object} mo
   * @returns
   */
  checkCharacterPosition(mo) {
    if (this.x - this.offset.left < mo.x) return true;
    else return false;
  }

  /**
   * Image-Animation function
   * @param {string} images
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Stop animation-interval
   * @param {number} intervalId
   */
  stopAnimation(intervalId) {
    setTimeout(() => clearInterval(intervalId), 300);
  }

  /**
   * Jump-function
   */
  jump() {
    if (this instanceof Character) playSound(JUMP_SOUND);
    this.speedY = 30;
  }

  /**
   * Hide-Object after timeout
   */
  hideObject() {
    setTimeout(() => (this.y += 600), 2000);
  }
}

class Chicken extends MovableObject {
  y = 345;
  width = 80;
  height = 80;

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  IMAGES_DEAD = [
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 400 + Math.random() * OBJECT_LEVEL_END;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  /**
   * Start animation and intervals
   */
  animate() {
    const intervalIdWalking = setInterval(() => this.moveChicken(), 1000 / 60);

    const intervalId = setInterval(
      () => this.playChicken(intervalId, intervalIdWalking),
      200,
    );
  }

  /**
   * Check if chicken is moving
   */
  moveChicken() {
    if (!this.otherDirection) this.moveLeft();
    else this.moveRight();
  }

  /**
   * /**
   * Check which animation is active
   * @param {number} intervalId
   * @param {number} intervalIdWalking
   */
  playChicken(intervalId, intervalIdWalking) {
    if (this.isDead()) this.chickenIsDead(intervalId, intervalIdWalking);
    else this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Play animation dead
   * @param {number} intervalId
   * @param {number} intervalIdWalking
   */
  chickenIsDead(intervalId, intervalIdWalking) {
    playSound(CHICKEN_SOUND);
    this.playAnimation(this.IMAGES_DEAD);
    this.stopAnimation(intervalIdWalking);
    this.stopAnimation(intervalId);
    this.hideObject();
  }
}

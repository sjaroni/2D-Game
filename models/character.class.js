class Character extends MovableObject {
  width = 125;
  height = 250;
  speed = 10;
  y = 180;

  iAmIdle = 0;

  cameraStart = 100;
  cameraSteps = 5;
  cameraLeft = 100;
  cameraRight = 495;

  offset = {
    top: 120,
    bottom: 10,
    left: 30,
    right: 35,
  };

  world;

  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  IMAGES_LONGIDLE = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];

  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ];

  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
  ];

  constructor() {
    super().loadImage(this.IMAGES_IDLE[1]);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONGIDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  /**
   * Start animation and intervals
   */
  animate() {
    setInterval(() => this.moveCharacter(), 1000 / 60);
    const intervalId = setInterval(() => this.playCharacter(intervalId), 50);
    setInterval(() => this.checkCameraPosition(), 1000 / 60);
  }

  /**
   * Check if character is moving
   */
  moveCharacter() {
    pauseSound(WALKING_SOUND);

    if (this.canMoveRight()) this.moveRight();
    if (this.canMoveLeft()) this.moveLeft();
    if (this.world.keyboard.KEYD) this.stopIdle();
    if (this.canJump()) this.jump();
    if (this.iAmIdle == 300) this.playIdleAnimation(300);
    this.iAmIdle++;
  }

  /**
   * Check if character can move
   * @returns true/false
   */
  canMoveRight() {
    return this.world.keyboard.ARROWRIGHT && this.x < CHARACTER_LEVEL_END;
  }

  /**
   * move Character right
   */
  moveRight() {
    super.moveRight();
    playSound(WALKING_SOUND);
    this.otherDirection = false;
    this.stopIdle();
  }

  /**
   * Check if character can move
   * @returns true/false
   */
  canMoveLeft() {
    return this.world.keyboard.ARROWLEFT && this.x > 0;
  }

  /**
   * move Character left
   */
  moveLeft() {
    super.moveLeft();
    playSound(WALKING_SOUND);
    this.otherDirection = true;
    this.stopIdle();
  }

  /**
   * Check if character jumps
   * @returns true/false
   */
  canJump() {
    return this.world.keyboard.ARROWUP && !this.isAboveGround();
  }

  /**
   * Character jumps
   */
  jump() {
    super.jump();
    this.stopIdle();
  }

  /**
   * Check camera direction
   */
  checkCameraPosition() {
    if (this.otherDirection) this.moveCameraLeft();
    else this.moveCameraRight();
  }

  /**
   * move Camera left
   */
  moveCameraLeft() {
    if (this.isCharacterAtStart()) this.characterAtStart();
    else {
      this.cameraStart = Math.min(
        this.cameraStart + this.cameraSteps,
        this.cameraRight,
      );
    }
    this.world.camera_x = -this.x + this.cameraStart;
  }

  /**
   * Check if character is on startposition
   * @returns true/false
   */
  isCharacterAtStart() {
    return this.x < 50;
  }

  /**
   * character is at startposition
   */
  characterAtStart() {
    this.cameraStart = Math.max(
      this.cameraStart - this.cameraSteps * 3,
      this.cameraLeft,
    );
  }

  /**
   * move Camera right
   */
  moveCameraRight() {
    this.cameraStart = Math.max(
      this.cameraStart - this.cameraSteps,
      this.cameraLeft,
    );
    this.world.camera_x = -this.x + this.cameraStart;
  }

  /**
   * Check which animation is active
   * @param {number} intervalId
   */
  playCharacter(intervalId) {
    if (this.isDead()) this.characterIsDead(intervalId);
    else if (this.isHurt()) this.characterIsHurt();
    else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
    else if (this.characterMoves()) this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Play animation dead
   * @param {number} intervalId
   */
  characterIsDead(intervalId) {
    this.playAnimation(this.IMAGES_DEAD);
    this.stopAnimation(intervalId);
    this.stopIdle();
    this.loadImage(this.IMAGES_DEAD[5]);
    playSound(DEAD_SOUND);
    GAME_IS_OVER = true;
  }

  /**
   * Play animation hurt
   */
  characterIsHurt() {
    this.playAnimation(this.IMAGES_HURT);
    playSound(HURT_SOUND);
    this.stopIdle();
  }

  /**
   * Is character currently moving?
   * @returns true/false
   */
  characterMoves() {
    return this.world.keyboard.ARROWRIGHT || this.world.keyboard.ARROWLEFT;
  }

  /**
   * Play animation idle
   * @param {number} counter
   */
  playIdleAnimation(counter) {
    const intervalIdle = setInterval(() => {
      this.playAnimation(this.IMAGES_IDLE);
      counter++;
      if (counter == 320) this.playLongIdleAnimation(intervalIdle);
    }, 200);
  }

  /**
   * Stop idle animation
   */
  stopIdle() {
    this.iAmIdle = 0;
  }

  /**
   * Play animation sleeping (long idle)
   * @param {number} intervalIdle
   */
  playLongIdleAnimation(intervalIdle) {
    this.stopAnimation(intervalIdle);
    const intervalLongIdle = setInterval(() => {
      this.playAnimation(this.IMAGES_LONGIDLE);

      if (this.isBtnClicked()) {
        this.stopAnimation(intervalLongIdle);
        this.iAmIdle = 0;
        this.loadImage(this.IMAGES_WALKING[1]);
      }
    }, 100);
  }

  /**
   * Check if button is clicked
   * @returns true/false
   */
  isBtnClicked() {
    return (
      this.world.keyboard.ARROWLEFT ||
      this.world.keyboard.ARROWRIGHT ||
      this.world.keyboard.ARROWUP ||
      this.world.keyboard.KEYD
    );
  }
}

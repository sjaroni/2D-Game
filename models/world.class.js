class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  collectedCoins = 0;
  collectedBottles = 0;
  nextThrow = 0;
  nextHit = 0;

  statusIcons = new StatusIcons();
  statusBarBottle = new StatusBarBottle();
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarEndboss = new StatusBarEndboss();
  statusBarEndbossIcon = new EndbossIcon();
  bottleText = new BottleText();

  coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin()];
  bottles = [
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
  ];

  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  /**
   * Start animation and intervals
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.reachedEndboss();
      this.gameIsOver();
    }, 50);
  }

  /**
   * Check all collisions or collectings
   */
  checkCollisions() {
    this.checkCollisionsEnemies();
    this.checkCollectingCoin();
    this.checkCollectingBottle();
    this.addNewBottle();
  }

  /**
   * Check collisions with enemies
   */
  checkCollisionsEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (this.isOtherDirectionToEnemy(enemy)) enemy.otherDirection = true;
      else enemy.otherDirection = false;

      if (this.isCharacterCollidingEnemy(enemy)) this.characterDamage();
      else if (this.isCharacterJumpingOnEnemy(enemy)) enemy.hit(100);

      if (this.throwableObjects.length !== 0) {
        this.bottleIsColliding(enemy);
        this.endbossNextHit(enemy);
      }
    });
  }

  /**
   * Check if character is colliding enemy
   * @param {object} enemy
   * @returns true/false
   */
  isCharacterCollidingEnemy(enemy) {
    return (
      this.character.isColliding(enemy) &&
      enemy.energy != 0 &&
      this.character.energy > 0 &&
      !this.character.isAboveGroundCharacter()
    );
  }

  /**
   * Check if character is jumping on enemy
   * @param {object} enemy
   * @returns true/false
   */
  isCharacterJumpingOnEnemy(enemy) {
    return (      
      (enemy instanceof Chicken || enemy instanceof ChickenSmall) &&
      this.character.isCollidingFromTop(enemy) &&
      this.character.isAboveGroundCharacter() && !this.character.isHurt()
    );
  }

  /**
   * Bottle collides with enemy
   * @param {object} enemy
   */
  bottleIsColliding(enemy) {
    if (this.throwableObjects[0].isColliding(enemy)) {
      this.throwableObjects[0].speed = 0;
      this.throwableObjects[0].bottleSplash();

      if (enemy instanceof Chicken || enemy instanceof ChickenSmall)
        enemy.hit(100);
      if (enemy instanceof Endboss && this.nextHit == 0) {
        enemy.hit(20);
        this.statusBarEndboss.setPercentage(enemy.energy);
        this.nextHit = 50;
      }
    }
  }

  /**
   * Allow next hit on endboss
   * @param {object} enemy
   */
  endbossNextHit(enemy) {
    if (enemy instanceof Endboss) {
      if (this.nextHit < 1) this.nextHit = 0;
      else this.nextHit--;
    }
  }

  /**
   * Character Damage
   */
  characterDamage() {    
    console.log('aua');
    this.character.hit(2);
    this.statusBarHealth.setPercentage(this.character.energy);
  }

  /**
   * Add new bottle-objects
   */
  addNewBottle() {
    if (this.outOfBottles()) {
      this.bottles.push(new Bottle());
      let side;
      if (this.newBottleOnRightSide()) side = 'right';
      else side = 'left';

      ADD_NEW_BOTTLE = true;
      this.bottleText.animate(side);
    }
  }

  /**
   * Out of bottles?
   * @returns true/false
   */
  outOfBottles() {
    return this.collectedBottles == 0 && this.bottles.length == 0;
  }

  /**
   * Check on which side a new bottle arrived
   * @returns true/false
   */
  newBottleOnRightSide() {
    return this.character.x < world.bottles[0].x;
  }

  /**
   * Check position character and current enemy
   * @param {object} enemy
   * @returns true/false
   */
  isOtherDirectionToEnemy(enemy) {
    return !this.character.checkCharacterPosition(enemy);
  }

  /**
   * Check colliding a coin
   */
  checkCollectingCoin() {
    this.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        let coinIndex = getIndexOf(coin.x, coin.y, this.coins);
        this.coins.splice(coinIndex, 1);
        this.collectedCoins++;
        this.statusBarCoin.collected('Coins');
        playSound(COLLECT_SOUND);
      }
    });
  }

  /**
   * Check colliding a bottle
   */
  checkCollectingBottle() {
    this.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        let bottleIndex = getIndexOf(bottle.x, bottle.y, this.bottles);
        this.bottles.splice(bottleIndex, 1);
        this.collectedBottles++;
        this.statusBarBottle.collected('Bottles');
        playSound(COLLECT_SOUND);
      }
    });
  }

  /**
   * Check throwing a bottle
   */
  checkThrowObjects() {
    let offsetBottle;
    if (this.character.otherDirection == true) offsetBottle = -10;
    else offsetBottle = 100;

    if (this.canThrowBottle()) this.throwBottle(offsetBottle);

    if (this.nextThrow < 1) {
      this.nextThrow = 0;
      this.throwableObjects = [];
    } else this.nextThrow--;
  }

  /**
   * Check if able to throw a new bottle
   * @returns true/false
   */
  canThrowBottle() {
    return (
      this.keyboard.KEYD && this.collectedBottles > 0 && this.nextThrow == 0
    );
  }

  /**
   * Throw bottle
   * @param {number} offsetBottle
   */
  throwBottle(offsetBottle) {
    let bottle = new ThrowableObject(
      this.character.x + offsetBottle,
      this.character.y + 100,
      this.character.otherDirection,
    );

    this.nextThrow = 40;
    playSound(THROW_SOUND);

    this.throwableObjects.push(bottle);
    this.collectedBottles--;
    this.statusBarBottle.collected('Bottles');
  }

  /**
   * Check distance to endboss
   */
  reachedEndboss() {
    let enemies = world.level.enemies;
    let endboss = enemies[enemies.length - 1];

    if (this.isEndbossReached(endboss)) this.endbossReached(endboss);
    else if (this.isEndbossLeft(endboss)) this.endbossLeft();
  }

  /**
   * Check if character reached endboss
   * @param {object} endboss
   * @returns true/false
   */
  isEndbossReached(endboss) {
    return (
      endboss.x - this.character.x <= 570 &&
      endboss.x &&
      !ENDBOSS_REACHED &&
      endboss.energy > 0
    );
  }

  /**
   * endboss reached
   * @param {object} endboss
   */
  endbossReached(endboss) {
    ENDBOSS_REACHED = true;
    this.endboss_reached();
    if (!ENDBOSS_FIRST_CONTACT) playSound(ALARM_SOUND);

    if (!ENDBOSS_FIRST_CONTACT) {
      endboss.startInterval();
      ENDBOSS_FIRST_CONTACT = true;
    }
  }

  /**
   * Check if character leaves endboss
   * @param {object} endboss
   * @returns true/false
   */
  isEndbossLeft(endboss) {
    return (
      endboss.x - this.character.x > 570 &&
      ENDBOSS_REACHED &&
      endboss.energy > 0
    );
  }

  /**
   * endboss left
   */
  endbossLeft() {
    ENDBOSS_REACHED = false;
    this.endboss_left();
  }

  /**
   * Draw objects on canvas
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.bottles);
    this.addObjectsToMap(this.level.enemies);

    this.ctx.translate(-this.camera_x, 0);

    // -- Space for fixed objects -- //
    if (ADD_NEW_BOTTLE) {
      this.addTextToMap(this.bottleText);
    }

    if (!ENDBOSS_IS_DEAD) {
      this.addToMap(this.statusBarBottle);
      this.addTextToMap(this.statusBarBottle);

      this.addToMap(this.statusBarHealth);
      this.addTextToMap(this.statusBarHealth);

      this.addToMap(this.statusBarCoin);
      this.addTextToMap(this.statusBarCoin);

      if (ENDBOSS_REACHED) {
        this.addToMap(this.statusBarEndboss);
        this.addToMap(this.statusBarEndbossIcon);
      }
    }
    // -- End Space for fixed objects -- //

    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adding objects to map
   * @param {object} objects
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Add object to map
   * @param {object} objects
   */
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    if (DRAWALLFRAMES) {
      mo.drawFrame(this.ctx);
      mo.drawInnerFrame(this.ctx);
    }
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
   * Add text on canvas
   * @param {object} mo
   */
  addTextToMap(mo) {
    mo.drawText(this.ctx);
  }

  /**
   * Reflect image
   * @param {object} mo
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Reflect image back to normal
   * @param {object} mo
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Reached/leave endboss
   */
  endboss_reached() {
    document.getElementById('canvas').classList.add('alarm');
  }

  endboss_left() {
    document.getElementById('canvas').classList.remove('alarm');
  }

  /**
   * Game over function
   */
  gameIsOver() {
    setInterval(() => {
      if (GAME_IS_OVER) {
        this.switchElementView();
        if (ENDBOSS_IS_DEAD){
          document.getElementById('start-endscreen').src = WINSCREEN;          
        } else {
          document.getElementById('start-endscreen').src = LOSTSCREEN;
          playSound(LOST_SOUND);
        }        
        stopGame();
        this.hideAllObjects();        
      }
    }, 6000);
  }

  /**
   * Switch visibility
   */
  switchElementView() {
    document.getElementById('canvas').classList.remove('alarm');
    document.getElementById('start-endscreen').classList.remove('d-none');
    document.getElementById('restartBtn').classList.remove('d-none');
    document.getElementById('panel').classList.add('d-none');
    document.getElementById('gameSettings').classList.add('d-none');
  }

  /**
   * Hide all objects
   */
  hideAllObjects() {
    this.character.y += 600;
    this.bottles.forEach((bottle) => (bottle.y += 600));
    this.coins.forEach((coin) => (coin.y += 600));
    this.level.enemies.forEach((enemy) => (enemy.y += 600));
    this.hideStatusBars();
  }

  /**
   * Hide all status-bars
   */
  hideStatusBars() {
    world.statusBarBottle.y += 600;
    world.statusBarBottle.textY += 600;
    world.statusBarHealth.y += 600;
    world.statusBarHealth.textY += 600;
    world.statusBarCoin.y += 600;
    world.statusBarCoin.textY += 600;
    world.statusBarEndboss += 600;
    world.statusBarEndbossIcon += 600;
  }
}

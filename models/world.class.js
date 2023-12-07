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

  coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin()];
  bottles = [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()];

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

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.reachedEndboss();
    }, 50);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      
      if((!this.character.checkCharacterPosition(enemy))){
        enemy.otherDirection = true;
       } else{
        enemy.otherDirection = false;
      }      

      if (this.character.isColliding(enemy) && enemy.energy != 0 && this.character.energy > 0 && this.character.isAboveGroundCharacter() == false) {
        this.character.hit(1);
        this.statusBarHealth.setPercentage(this.character.energy);
      } else {
        if ((enemy instanceof Chicken || enemy instanceof ChickenSmall) && this.character.isCollidingFromTop(enemy) && this.character.isAboveGroundCharacter()) {
          enemy.hit(100);
        }
      }
      
      if (this.throwableObjects.length !== 0){
        if(this.throwableObjects[0].isColliding(enemy)){          
          if(enemy instanceof Chicken || enemy instanceof ChickenSmall){
            enemy.hit(100);
          }
          if(enemy instanceof Endboss && this.nextHit == 0){
            enemy.hit(20);
            this.statusBarEndboss.setPercentage(enemy.energy);
            this.nextHit = 10;
          }
        }

        if(enemy instanceof Endboss){
          if(this.nextHit < 1){
            this.nextHit = 0;          
          } else{          
            this.nextHit--;
          }
        }
      }

      if(this.collectedBottles == 0 && this.bottles.length == 0){
        this.bottles.push(new Bottle());
      }

    });

    this.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        let coinIndex = getIndexOf(coin.x, coin.y, this.coins);
        this.coins.splice(coinIndex, 1);
        this.collectedCoins++;
        this.statusBarCoin.collected('Coins');
        this.soundCollected();
      }
    });

    this.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        let bottleIndex = getIndexOf(bottle.x, bottle.y, this.bottles);
        this.bottles.splice(bottleIndex, 1);
        this.collectedBottles++;
        this.statusBarBottle.collected('Bottles');
        this.soundCollected();
      }
    });

  }

  checkThrowObjects() {
    let offsetBottle;
    if (this.character.otherDirection == true) {
      offsetBottle = -10;
    } else {
      offsetBottle = 100;
    }
    
    if (this.keyboard.KEYD && this.collectedBottles > 0 && this.nextThrow == 0) {
      let bottle = new ThrowableObject(
        this.character.x + offsetBottle,
        this.character.y + 100,
        this.character.otherDirection
      );

      this.nextThrow = 30;

      if(SOUND_ON){
        let throw_sound = new Audio('audio/throw.mp3');
        throw_sound.play();
      }

      this.throwableObjects.push(bottle);
      this.collectedBottles--;
      this.statusBarBottle.collected('Bottles');
    }
    if(this.nextThrow < 1){
      this.nextThrow = 0;
      this.throwableObjects = [];
    } else{
      this.nextThrow--;      
    }
  }

  reachedEndboss(){
    let enemies = world.level.enemies;    
    let endboss = enemies[enemies.length - 1];

    if(endboss.x - this.character.x <= 570 && !ENDBOSS_REACHED && endboss.energy > 0){
      ENDBOSS_REACHED = true;
      this.endboss_reached();
      if(SOUND_ON && !ENDBOSS_FIRST_CONTACT){
        let alarm_sound = new Audio('audio/alarm.mp3');
        alarm_sound.play();
      }
      
      if(!ENDBOSS_FIRST_CONTACT){
        endboss.startInterval();
        ENDBOSS_FIRST_CONTACT = true;
      }

    } else if(endboss.x - this.character.x > 570 && ENDBOSS_REACHED && endboss.energy > 0){
      ENDBOSS_REACHED = false;
      this.endboss_left();
      endboss.endboss_sound.pause();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.bottles);
    
    this.ctx.translate(-this.camera_x, 0); // Kamera zurücksetzen
    
    // -- Space for fixed objects -- //
    this.addToMap(this.statusBarBottle);
    this.addTextToMap(this.statusBarBottle);
    
    this.addToMap(this.statusBarHealth);
    this.addTextToMap(this.statusBarHealth);
    
    this.addToMap(this.statusBarCoin);
    this.addTextToMap(this.statusBarCoin);
    
    if(ENDBOSS_REACHED){
      this.addToMap(this.statusBarEndboss);
      this.addToMap(this.statusBarEndbossIcon);
    }
    // -- End Space for fixed objects -- //

    this.ctx.translate(this.camera_x, 0); // Kamera wieder setzen
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    // Draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    
    if(DRAWALLFRAMES){
      mo.drawFrame(this.ctx);
      mo.drawInnerFrame(this.ctx);
    }

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  addTextToMap(mo) {
    mo.drawText(this.ctx);
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  soundCollected(){
    if(SOUND_ON){
      let collect_sound = new Audio('audio/collect.mp3');
      collect_sound.play();
    }
  }

  endboss_reached(){    
    document.getElementById('canvas').classList.add('alarm');
  }
  endboss_left(){    
    document.getElementById('canvas').classList.remove('alarm');
  }

}

class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  
  backgroundWidth = 719;
  backgroundRepeat = 8;
  maxBackgroundWidth = this.backgroundWidth * this.backgroundRepeat;
  
  statusBar = new StatusBar();  
  coins = [
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin()
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

  setWorld(){
    this.character.world = this;    
  }

  run(){
    setInterval(() => {      
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  checkCollisions(){
    this.level.enemies.forEach((enemy) => {        
      if(this.character.isColliding(enemy) && this.character.energy > 0) {          
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
      }
      );
    
    this.coins.forEach((coin) => {
       if(this.character.isColliding(coin)){
         //this.coin.collected();         
         console.log('gesammelt');
       }
    });
  }

  checkThrowObjects(){
    if(this.keyboard.KEYD){      
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.coins);    

    this.ctx.translate(-this.camera_x, 0); // Kamera zurücksetzen
    // -- Space for fixed objects -- //    
    
    this.addToMap(this.statusBar);
    // -- Space for fixed objects -- //    
    this.ctx.translate(this.camera_x, 0); // Kamera wieder setzen    
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach(o => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if(mo.otherDirection){
      this.flipImage(mo);
    }
    
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if(mo.otherDirection){
       this.flipImageBack(mo);
    }
  }

  flipImage(mo){
    this.ctx.save();      
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }
  
  flipImageBack(mo){
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}

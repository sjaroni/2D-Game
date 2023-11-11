class World {
  character = new Character();
  enemies = level1.enemies;
  clouds = level1.clouds;  
  backgroundObjects = level1.backgroundObjects;

  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    //this.updateBackgroundObjects(); 
    // this.backgroundObjects = [
    //   new BackgroundObject('img/5_background/layers/air.png', -719*2),
    //   new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -719*2),
    //   new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719*2),
    //   new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719*2),      
    // ];
    this.draw();
    this.setWorld();
  }

  setWorld(){
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.enemies);

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
      this.ctx.save();      
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    if(mo.otherDirection){
       mo.x = mo.x * -1;
       this.ctx.restore();
    }
  }

  updateBackgroundObjects(){
    //for (let i = -100, j = 0; i <= 100; i++, j++) {
    for (let i = 0, j = 0; i <= 100; i++, j++) {
      // Jeder 2. Durchlauf soll den Bildnamen ändern
      const imageNameSuffix = j % 2 === 0 ? '1.png' : '2.png';      
      // Iteriere über jedes BackgroundObject in der Liste
      for (const obj of this.backgroundObjects) {
        // Ändere den Bildnamen und die Position entsprechend        
        obj.setImagePath = `img/5_background/layers/1_first_layer/${imageNameSuffix}`;
        obj.setPositionX = 719 * i;

        console.log(setImagePath);

      }
    }
  }

}

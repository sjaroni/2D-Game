class Character extends MovableObject{  

  width = 130;
  height = 260;
  speed = 10;

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png'
  ];

  world;

  constructor(){
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate(){
    
    setInterval(() => {
      if(this.world.character.world.keyboard.ARROWRIGHT && this.x < this.world.level.level_end_x){
        this.x += this.speed;
        this.otherDirection = false;
      }

      if(this.world.character.world.keyboard.ARROWLEFT  && this.x > 0){
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x + 100;

    }, 1000 / 60);
    
    setInterval(() => {

      if(this.world.keyboard.ARROWRIGHT || this.world.keyboard.ARROWLEFT){
        // Walk animation
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;      
      }

    }, 50);
  }


  jump(){

  }

}
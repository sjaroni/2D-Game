class Character extends MovableObject{  

  width = 130;
  height = 260;
  speed = 10;
  y = 80;

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png'
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
  'img/2_character_pepe/3_jump/J-39.png'
]

  world;
  walking_sound = new Audio('audio/running.mp3');

  constructor(){
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.applyGravity();
    this.animate();
  }

  animate(){
    
    setInterval(() => {
      this.walking_sound.pause();
      if(this.world.keyboard.ARROWRIGHT && this.x < this.world.level.level_end_x){
        this.moveRight();
      }
      
      if(this.world.keyboard.ARROWLEFT  && this.x > 0){
        this.x -= this.speed;
        this.otherDirection = true;
        this.walking_sound.play();
      }

      if(this.world.keyboard.ARROWUP && !this.isAboveGround()){
        this.jump();
      }

      this.world.camera_x = -this.x + 100;

    }, 1000 / 60);
    
    setInterval(() => {

      if(this.isAboveGround()){
        this.playAnimation(this.IMAGES_JUMPING);
      }


      if(this.world.keyboard.ARROWRIGHT || this.world.keyboard.ARROWLEFT){
        // Walk animation
        this.playAnimation(this.IMAGES_WALKING);
      }

    }, 50);
  }


  jump(){

  }

}
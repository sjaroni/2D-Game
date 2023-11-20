class Character extends MovableObject{  

  width = 130;
  height = 260;
  speed = 10;
  y = 180;
  energy = 100;
  iAmIdle = 0;

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
    'img/2_character_pepe/1_idle/idle/I-10.png'
  ]

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
    'img/2_character_pepe/1_idle/long_idle/I-20.png'
  ]

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
  ];

  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png'
  ];

  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png'
  ];

  world;
  walking_sound = new Audio('audio/running.mp3');

  constructor(){    
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

  animate(){
    
    setInterval(() => {
      this.walking_sound.pause();
      if(this.world.keyboard.ARROWRIGHT && this.x < this.world.level.level_end_x){
        this.moveRight();
        //this.walking_sound.play();
        this.otherDirection = false;
        this.stopIdle();
      }
      
      if(this.world.keyboard.ARROWLEFT  && this.x > 0){
        this.moveLeft();
        //this.walking_sound.play();
        this.otherDirection = true;
        this.stopIdle();
      }
      
      if(this.world.keyboard.SPACE && !this.isAboveGround()){
        this.jump();
        this.stopIdle();
      }      

      if(this.iAmIdle == 300){
         this.playIdleAnimation(300);
      }

      this.world.camera_x = -this.x + 100;
      this.iAmIdle++;      

    }, 1000 / 60); 
    
    const intervalId = setInterval(() => {

      if(this.isDead()){
        this.playAnimation(this.IMAGES_DEAD);
        this.stopAnimation(intervalId);
        this.stopIdle();
      } else if(this.isHurt()){
        this.playAnimation(this.IMAGES_HURT);
        this.stopIdle();
      } else if(this.isAboveGround()){
        this.playAnimation(this.IMAGES_JUMPING);
      } else if(this.world.keyboard.ARROWRIGHT || this.world.keyboard.ARROWLEFT){
        this.playAnimation(this.IMAGES_WALKING);        
      }
    }, 50);
  }

  stopAnimation(intervalId){
    setTimeout(() => {
      clearInterval(intervalId);
    }, 300);
  }

  playIdleAnimation(counter){
    const intervalIdle = setInterval(() => {
      this.playAnimation(this.IMAGES_IDLE);
      counter++;
      if(counter == 320)
      {
        this.playLongIdleAnimation(intervalIdle);        
      }
    }, 200);
  }

  stopIdle(){
    this.iAmIdle = 0;
  }

  playLongIdleAnimation(intervalIdle){
    clearInterval(intervalIdle);    
    const intervalLongIdle = setInterval(() => {
      this.playAnimation(this.IMAGES_LONGIDLE);

      if(this.world.keyboard.ARROWLEFT || this.world.keyboard.ARROWRIGHT || this.world.keyboard.SPACE || this.world.keyboard.KEYD){      
        clearInterval(intervalLongIdle);
        this.iAmIdle = 0;
        if(this.world.keyboard.KEYD){
          this.loadImage(this.IMAGES_IDLE[1]);
        }
      }

    }, 200);
  }
}
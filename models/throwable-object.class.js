class ThrowableObject extends MovableObject {
  
  IMAGES_THROW = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  ];

  IMAGES_SPLASH = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
  ];

  offset = {
    top: 15,
    right: 40,
    bottom: 25,
    left: 20,
  };

  throwIntervalId;
  glass_sound = new Audio('audio/glass.mp3');

  constructor(x, y, otherDirection) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.IMAGES_THROW);
    this.loadImages(this.IMAGES_SPLASH);

    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;

    this.height = 60;
    this.width = 50;
    this.throw();
  }
  
  throw() {
    this.speedY = 30;
    this.applyGravity();

    this.throwIntervalId = setInterval(() => {    
      if(this.y < 380){
        this.playAnimation(this.IMAGES_THROW);
        if (this.otherDirection == false) {        
            this.x += 10;
          } else {                
            this.x -= 10;
          }
      } else {
        this.bottleSplash();        
      }
    }, 1000 / 25);
  }

  bottleSplash(){
    this.stopAnimation(this.throwIntervalId);    
    if(SOUND_ON){
      this.glass_sound.play();
    }
    this.speed = 0
    this.speedY = 0;    

    setInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH);    
    }, 50);
  }
}

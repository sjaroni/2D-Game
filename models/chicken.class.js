class Chicken extends MovableObject{
 
   y = 345;
   width = 80;
   height = 80;

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];
  
  IMAGES_DEAD = [
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
  ]

  chicken_sound = new Audio('audio/chicken.mp3');

  constructor(){

    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);    

    this.x = 200 + Math.random() * this.maxBackgroundWidth;
    this.speed = 0.15 + Math.random() * 0.25;

    this.x = 620;
    //this.animate();
  }

  animate(){    

    const intervalIdWalking = setInterval(() => {
      if(!this.otherDirection){
        this.moveLeft();
      } else {
        this.moveRight();
      }
    }, 1000 / 60);
    
    const intervalId = setInterval(() => {
      if (this.isDead()) {
        this.chicken_sound.play();
        this.playAnimation(this.IMAGES_DEAD);
        this.stopAnimation(intervalIdWalking);
        this.stopAnimation(intervalId);
        this.hideObject();
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }  
}
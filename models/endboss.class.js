class Endboss extends MovableObject {
  y = 55;
  offset = {
    top: 70,
    bottom: 40,
    left: 30,
    right: 35,
  };
  width = 250;
  height = 400;
  speed = 12;
  initIntervalWalking = 0;
  initIntervalAlert = 0;
  initIntervalAttack = 0;
  reloadCounter = 0;
  end = 0;

  intervalWalking;
  intervalAlert;
  intervalAttack;
  intervalAfterHurt;

  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ];

  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ];

  endboss_sound = new Audio('audio/endboss.mp3');
  hurt_sound = new Audio('audio/chicken.mp3');
  win_sound = new Audio('audio/win.mp3');

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 5500;    
    this.speed = this.speed + Math.random() * 0.25;
    this.intervalNum = 1;
    this.animate();
  }

  startInterval() {
    switch (this.intervalNum) {
      case 1:
        this.startWalkingInterval();
        break;
      case 2:
        this.startAlertInterval();
        break;
      case 3:
        this.startAttackInterval();
        break;
      default:
        this.intervalNum = 1;
        this.startInterval();
        break;
    }
  }

  startWalkingInterval() {
    if (this.energy > 0) {
      if (SOUND_ON) {
        this.endboss_sound.play();
      }
      this.intervalWalking = setInterval(() => {
        if (!this.otherDirection) {
          this.moveLeft();
        } else {
          this.moveRight();
        }

        this.playAnimation(this.IMAGES_WALKING);
        this.initIntervalAttack = 0;
        if (this.initIntervalWalking == 5) {
          
          this.stopAnimation(this.intervalWalking);
          this.intervalNum = 2;
          this.startInterval();
        }
        this.initIntervalWalking++;
      }, 50);
    }
  }

  startAlertInterval() {
    if (this.energy > 0) {
      this.intervalAlert = setInterval(() => {
        this.playAnimation(this.IMAGES_ALERT);
        this.initIntervalWalking = 0;
        if (this.initIntervalAlert == 5) {          
          this.stopAnimation(this.intervalAlert);
          this.intervalNum = 3;
          this.startInterval();
        }
        this.initIntervalAlert++;
      }, 400);
    }
  }

  startAttackInterval() {
    if (this.energy > 0) {
      this.intervalAttack = setInterval(() => {
        this.playAnimation(this.IMAGES_ATTACK);
        this.initIntervalAlert = 0;
        if (this.initIntervalAttack == 6) {
          this.stopAnimation(this.intervalAttack);
          this.intervalNum = 1;
          this.startInterval();
        }
        this.initIntervalAttack++;
      }, 400);
    }
  }

  animate() {
    let intervalId = setInterval(() => {
      if (this.isDead() && this.energy == 0) {
        this.end++;
        this.endbossIsDead(intervalId);
        this.hideObject();
      } else if (this.isHurt() && this.reloadCounter <= 0) {
        this.endbossIsHurt(intervalId);
      }
    }, 50);
  }

  reloadAnimations(intervalId) {
    setTimeout(() => {
      this.stopAnimation(intervalId);      
      this.stopAnimation(this.intervalWalking);
      this.stopAnimation(this.intervalAlert);
      this.stopAnimation(this.intervalAttack);
      this.reloadCounter = 0;
      this.startInterval();
      this.animate();
    }, 200);
  }

  endbossIsDead(intervalId) {
    if (this.end == 1) {
      this.stopAnimation(intervalId);

      let lastInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_DEAD);
      }, 400);

      setTimeout(() => {
        if (SOUND_ON) {
          this.endboss_sound.pause();
          this.hurt_sound.play();
          this.win_sound.play();
        }

        this.stopAnimation(this.intervalWalking);
        this.stopAnimation(this.intervalAlert);
        this.stopAnimation(this.intervalAttack);
        
        setTimeout(() => {
          this.stopAnimation(lastInterval);
          this.y = 100;
          this.loadImage(this.IMAGES_DEAD[2]);
          ENDBOSS_IS_DEAD = true;
          GAME_IS_OVER = true;  
        }, 1200);
        
      }, 300);
    }
  }

  endbossIsHurt(intervalId) {
    
    let endbossIsHurtInterval = setInterval(() => {
          this.playAnimation(this.IMAGES_HURT);
    }, 200);

    if (SOUND_ON) {
      this.endboss_sound.pause();
      this.hurt_sound.play();
    }

    this.reloadCounter++;

    setTimeout(() => {
      
      this.stopAnimation(endbossIsHurtInterval);
      this.intervalAfterHurt = setInterval(() => {
       this.playAnimation(this.IMAGES_WALKING);
        if (!this.otherDirection) {
          this.moveLeft();
        } else {
          this.moveRight();
        }
      }, 100);
    }, 800);

    this.stopAnimation(this.intervalWalking);
    this.stopAnimation(this.intervalAlert);
    this.stopAnimation(this.initIntervalAttack);

    setTimeout(() => {
      this.stopAnimation(this.intervalAfterHurt);
      this.reloadAnimations(intervalId);
    }, 2200);
  }
}

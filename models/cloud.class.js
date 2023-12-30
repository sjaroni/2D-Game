class Cloud extends MovableObject {
  x = 0;
  y = 20;
  height = 250;
  width = 500;

  constructor() {
    super().loadImage('img/5_background/layers/4_clouds/1.png');
    this.x = 0 + Math.random() * MAXBACKGROUNDWITH;
    this.animate();
  }

  /**
   * Start animation and intervals
   */
  animate() {
    setInterval(() => this.moveLeft(), 1000 / 25);
  }
}

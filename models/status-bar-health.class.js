class StatusBarHealth extends StatusIcons {
  x = 90;
  y = 20;
  textX = 150;
  width = 71;
  height = 69;

  IMAGES = ['img/7_statusbars/3_icons/icon_health.png'];

  constructor() {
    super().loadImage(this.IMAGES[0]);
    this.setPercentage();
  }

  setPercentage(percentage) {
    if(percentage === undefined){
      this.text = 5;
    }
    else{
      this.text = this.resolveImageIndex(percentage);
    }
  }

  resolveImageIndex(percentage) {
    if (percentage <= 100 && percentage > 80) {
      return 5;
    } else if (percentage <= 80 && percentage > 60) {
      return 4;
    } else if (percentage <= 60 && percentage > 40) {
      return 3;
    } else if (percentage <= 40 && percentage > 20) {
      return 2;
    } else if (percentage <= 20 && percentage > 0) {
      return 1;
    } else if (percentage === 0) {
      return 0;
    }
  }
}

class StatusBarCoin extends StatusIcons {
  text = 0;
  x = 150;
  y = 0;
  textX = 235;
  width = 120;
  height = 120;

  IMAGES = ['img/8_coin/coin_2.png'];

  constructor() {
    super().loadImage(this.IMAGES[0]);
  }
}

class BottleText extends StatusIcons {
  textX = 170;
  textY = 160;

  counter = 0;
  intervalTextId;

  constructor() {
    super();
    this.hideInfo();
  }

  animate(side) {
    this.intervalTextId = setInterval(() => {
      this.text = `New Bottle on your ${side}`;
      this.counter++;
    }, 25);
  }

  hideInfo() {
    setInterval(() => {
      if (this.counter == 120) {
        ADD_NEW_BOTTLE = false;
        clearInterval(this.intervalTextId);
        this.counter = 0;
      }
    }, 25);
  }
}

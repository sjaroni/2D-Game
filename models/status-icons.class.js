class StatusIcons extends DrawableObject {
  text = 0;
  x;
  y = 10;
  textX;
  textY = 70;
  width;
  height;
  percentage = 100;

  constructor() {
    super();
  }

  collected(item) {
    let itemName = `collected${item}`;
    this.text = world[itemName];
  }
}

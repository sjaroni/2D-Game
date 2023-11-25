class StatusIcons extends DrawableObject {

  text = 0;
  x;
  y = 10;
  textX;
  textY = 70;
  width;
  height;
  
  collect_sound = new Audio('audio/collect.mp3');

  constructor(){
    super();
  }

  collected(item){
    let itemName = `collected${item}`;
    this.text = world[itemName];
    this.collect_sound.play();
  }
}
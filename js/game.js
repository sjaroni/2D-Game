let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas);
  
  console.log('My Character is', world.character);
}

window.addEventListener('keydown', (e) => {

  //console.log(e.code.toUpperCase());
  let key = e.code.toUpperCase();
  this.keyboard[key];
});
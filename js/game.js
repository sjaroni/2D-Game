let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  
  console.log('My Character is', world.character);
}

window.addEventListener('keydown', (e) => {  
  let key = e.code.toUpperCase();
  keyboard[key] = true;
  keyboard.setDirectionTrue(key);
});

window.addEventListener('keyup', (e) => {  
   keyboard.setDirectionFalse();
});
let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);  
  //TODO - entfernen
  console.log('My Character is', world.character);  
}

function stopGame() {
  for (let i = 0; i < 9999; i++) window.clearInterval(i);
}

window.addEventListener('keydown', (e) => {  
  let key = e.code.toUpperCase();
  keyboard[key] = true;
  keyboard.setDirectionTrue(key);
});

window.addEventListener('keyup', (e) => {  
  keyboard.setDirectionFalse();
});

function getIndexOf(x, y, array) {
  for (let i = 0; i < array.length; i++) {
      if (array[i].x === x && array[i].y === y) {
          return i;
      }
  }
  return -1;
}

// Enable / Mute all sounds
// SOUND_ON = false
// 
function checkSound(SOUND_ON){
  if (SOUND_ON) {
    music_sound = new Audio('audio/music.mp3');    
    music_sound.loop=true;
    this.music_sound.play();
  } else {
    this.music_sound.pause();
  }
}

// Touchbuttons
// live-call am 24.11 17:??
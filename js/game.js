let canvas;
let world;
let keyboard = new Keyboard();

function init() {

  // startGame = document.getElementById('start_endscreen');  
  // startGame.classList.add('d-none');

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
// MUSIC_ON = false
// 
function checkMusic(MUSIC_ON){
  if (MUSIC_ON) {
    music_sound = new Audio('audio/music.mp3');    
    music_sound.loop=true;
    this.music_sound.play();
  } else {
    this.music_sound.pause();
  }
}

function toggleSound() {    
  SOUND_ON = !SOUND_ON
}

// Touchbuttons
// live-call am 24.11 17:??

function fullscreen(){
  let fullscreen = document.getElementById('fullscreen');
  enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
     if(element.requestFullscreen){
      element.requestFullscreen();
     } else if(element.msRequestFullscreen){
      element.msRequestFullscreen();
     } else if(element.webkitRequestFullscreen){
      element.webkitRequestFullscreen();
     }
}

function exitFullscreen(){
  if(document.exitFullscreen){
    document.exitFullscreen();
  } else if(document.webkitExitFullscreen){
    document.webkitExitFullscreen();
  }
}

/**
 * Show infobox if Site is in Landscape-Mode
 */
function checkViewPort() {
  if (screen.availHeight > screen.availWidth) {

    if(screen.availWidth < 480){
      body = document.body;      
      body.innerHTML = "";
      body.innerHTML = /*html*/`
        <div id="portrait">
    <img id="portraitImg" src="../assets/img/favicon.png">
    <div id="portraitText">Sorry! This game is built to be used in landscape mode.</div>
  </div>
       `;
    }

  }else{
    location.reload();
  }
}
//window.onresize = checkViewPort;